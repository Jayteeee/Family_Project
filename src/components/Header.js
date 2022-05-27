import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdClear, MdNotificationsNone } from "react-icons/md";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyMemberActions } from "../redux/modules/familymember";
import { socketActions } from "../redux/modules/socket";
import { history } from "../redux/configureStore";

// 엘리먼트
import { Text, CircleImage, RactangleImage } from "../elements";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import { ProfileModal } from "../shared/modal/component/ProfileModal";
import NotiModal from "../shared/modal/component/NotiModal";
import ManualModal from "../shared/modal/component/ManualModal";

// 이미지
// import profileImg from "../shared/images/profileImg.png";
import homeRogo from "../shared/images/homeRogo.svg";
import Profile01 from "../shared/images/Profile01.svg";
import Profile02 from "../shared/images/Profile02.svg";
import Profile03 from "../shared/images/Profile03.svg";
import Profile04 from "../shared/images/Profile04.svg";
import Profile05 from "../shared/images/Profile05.svg";

const Header = (props) => {
  const {
    bg,
    user,
    familyId,
    // myFamilyMemberNickname
  } = props;
  const dispatch = useDispatch();

  const socket = useSelector((state) => state?.socket?.socket);
  const alert = useSelector((state) => state?.socket?.alert);
  // const familyNoti = useSelector((state) => state?.socket?.familyNoti?.findAlertDB);

  // 프로필 수정 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
    dispatch(familyMemberActions.getFamilyMemberDB(familyId));
  };

  // 매뉴얼 모달
  const [manualOn, setManualOn] = useState(false);
  const handleManual = () => {
    setManualOn(!manualOn);
  };

  // 알림 모달
  const [notiOn, setNotiOn] = useState(false);

  const handleNoti = () => {
    setNotiOn(!notiOn);
  };

  const deleteAlert = (alertId) => {
    socket.emit("deleteAlert", alertId);
    dispatch(socketActions.deleteAlertDB(alertId));
  };

  const addFamilyMember = (
    familyId,
    familyMemberNickname,
    selectEmail,
    userId
  ) => {
    dispatch(
      familyMemberActions.addFamilyMemberDB(
        familyId,
        familyMemberNickname,
        selectEmail
      )
    );

    // 소켓 룸 부분
    // socket?.emit("inviteJoin", {
    //   userId: userId,
    //   familyId: familyId,
    //   familyMemberNickname: familyMemberNickname,
    // });
    setNotiOn(!notiOn);
  };
  const [toolTipOn, setToolTipOn] = useState(true);

  // 사이드바 매뉴 색상
  const handleMenuColor = () => {
    localStorage.setItem("homeMenuColor", "colorChage");
    localStorage.removeItem("missionMenuColor");
    localStorage.removeItem("calendarMenuColor");
    localStorage.removeItem("galleryMenuColor");
    localStorage.removeItem("voiceMenuColor");
  };
  return (
    <>
      <div>
        <HeaderWarp>
          <RogoBox
            src={homeRogo}
            onClick={() => {
              handleMenuColor();
              history.push(`/family/${familyId}/`);
            }}
          />
          <HeaderRightBox>
            <Manual
              onClick={() => {
                handleManual();
              }}
            >
              <Text BM>도란도란 사용법</Text>
            </Manual>
            {manualOn ? <ManualModal onClose={handleManual} /> : null}
            <NotiWrap>
              <Research
                onMouseOver={() => {
                  setToolTipOn(true);
                }}
                onMouseOut={() => {
                  setToolTipOn(false);
                }}
              >
                <a href="https://forms.gle/cKtMucXktf7et7hs9" target="_blank">
                  <Text BM> 설문 참여 </Text>
                </a>
                {toolTipOn ? (
                  <ToolTip>
                    <Text C>
                      지금 설문조사 참여하면 추첨을 통해 배민 상품권을 드려요.
                    </Text>
                    <MdClear
                      onClick={() => {
                        setToolTipOn(false);
                      }}
                    />
                    <div className="triangle" />
                  </ToolTip>
                ) : null}
              </Research>
              <NotiBox
                onClick={handleNoti}
                onBlur={() => {
                  handleNoti();
                }}
              >
                <MdNotificationsNone />
              </NotiBox>
              {alert.length !== 0 ? (
                <NotiCount>{alert?.length}</NotiCount>
              ) : null}
            </NotiWrap>
            {notiOn ? (
              <>
                <NotiModal
                  alert={alert}
                  onClose={handleNoti}
                  deleteAlert={deleteAlert}
                  addFamilyMember={addFamilyMember}
                />
              </>
            ) : null}

            <ProfileBox onClick={handleModal}>
              <RactangleImage
                S
                size="24px"
                borderRadius="8.4px"
                // src={user?.profileImg ? user?.profileImg : profileImg}
                className="headerProfileImg"
                src={
                  user?.profileImg === "Profile01"
                    ? Profile01
                    : user?.profileImg === "Profile02"
                    ? Profile02
                    : user?.profileImg === "Profile03"
                    ? Profile03
                    : user?.profileImg === "Profile04"
                    ? Profile04
                    : user?.profileImg === "Profile05"
                    ? Profile05
                    : user?.profileImg
                    ? user?.profileImg
                    : Profile01
                }
              />
            </ProfileBox>
          </HeaderRightBox>
        </HeaderWarp>
      </div>
      {/* 프로필 모달 */}
      <ModalPortal>
        {modalOn && (
          <ProfileModal
            onClose={handleModal}
            user={user}
            // myFamilyMemberNickname={myFamilyMemberNickname}
          ></ProfileModal>
        )}
      </ModalPortal>
    </>
  );
};

const HeaderWarp = styled.header`
  height: 40px;
  background: #fff;
  color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 203;
  text-align: center;
  border-bottom: 1px solid #dbdbdb;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    border: none;
  }
`;

const RogoBox = styled.div`
  padding-left: 10px;
  width: 87px;
  height: 32px;
  margin-left: 20px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  ${({ src }) => `background-image: url(${src});`};

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-left: 15px;
  }
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

const Manual = styled.div`
  margin-right: 25px;
  p {
    color: rgba(117, 117, 117, 1);
  }
`;

const Research = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(117, 117, 117, 1);
  margin-right: 10px;
  a {
    text-decoration: none;
    color: rgba(117, 117, 117, 1);
  }
`;
const ToolTip = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 40px;
  right: 40px;
  color: rgba(117, 117, 117, 1);
  margin-right: 20px;
  background-color: rgba(99, 113, 247, 1);
  border-radius: 2px;
  padding: 10px 20px;
  z-index: 999;
  P {
    color: white;
  }
  svg {
    margin-left: 18px;
    color: white;
    cursor: pointer;
  }
  .triangle {
    border-bottom: 8px solid rgba(99, 113, 247, 1);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    position: absolute;
    right: 20%;
    top: -7px;
  }
`;

const NotiWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  margin-right: 10px;
  background: #fff;
  &:hover {
    svg {
      filter: brightness(50%);
    }
  }
  cursor: pointer;
  svg {
    font-size: 21px;
    color: #757575;
  }
`;

const NotiCount = styled.div`
  width: 14px;
  height: 14px;
  background-color: red;
  border-radius: 50%;
  padding: 5px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 5px;
  right: 12px;
`;

const ProfileBox = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  .headerProfileImg {
    &:hover {
      filter: brightness(80%);
    }
  }
`;

export default Header;
