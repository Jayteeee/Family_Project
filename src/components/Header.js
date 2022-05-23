import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { IoMdNotifications } from "react-icons/io";
import { MdClear, MdNotificationsNone } from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyMemberActions } from "../redux/modules/familymember";
import { socketActions } from "../redux/modules/socket";

// 엘리먼트
import { CircleImage, RactangleImage } from "../elements";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import { ProfileModal } from "../shared/modal/component/ProfileModal";

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

  console.log(bg);
  console.log("유저정보: ", user);

  const socket = useSelector((state) => state?.socket?.socket);
  const alert = useSelector((state) => state?.socket?.alert);
  // const familyNoti = useSelector((state) => state?.socket?.familyNoti?.findAlertDB);
  console.log(alert);

  // 프로필 수정 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
    dispatch(familyMemberActions.getFamilyMemberDB(familyId));
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

  return (
    <>
      <div>
        <HeaderWarp>
          <RogoBox src={homeRogo} />
          <HeaderRightBox>
            <NotiBox>
              <MdNotificationsNone
                style={{
                  marginRight: "20px",
                  fontSize: "20px",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={handleNoti}
              />
              {alert.length !== 0 ? (
                <NotiCount>{alert?.length}</NotiCount>
              ) : null}
            </NotiBox>
            {notiOn ? (
              <>
                <NotiMsgBox>
                  <span className="triangle"></span>
                  {alert.length !== 0 ? (
                    alert.map((x, i) => {
                      return (
                        <div key={x.alertId}>
                          <NotiHead>
                            <Category>{x?.category}</Category>
                            <MdClear
                              onClick={() => {
                                deleteAlert(x.alertId);
                              }}
                            />
                          </NotiHead>
                          <NotiMsg>
                            {x?.type === "좋아요"
                              ? `${x?.senderName} 님이 ${x?.type}를 누르셨습니다.`
                              : x?.type === "댓글"
                              ? `${x?.senderName} 님이 ${x?.type}을 등록하셨습니다.`
                              : x?.type === "초대"
                              ? `${x?.nickname} 님이 가족 구성원${x?.type}를 하셨습니다.`
                              : null}
                          </NotiMsg>
                          <NotiFooter>
                            <div>{x.createdAt}</div>
                          </NotiFooter>
                          {x?.type === "초대" ? (
                            <ButtonBox>
                              <YesBtn
                                onClick={() => {
                                  addFamilyMember(
                                    x.familyId,
                                    x.familyMemberNickname,
                                    x.selectEmail,
                                    x.userId
                                  );
                                }}
                              >
                                승낙
                              </YesBtn>
                              <NoBtn
                                onClick={() => {
                                  deleteAlert(x.alertId);
                                }}
                              >
                                거절
                              </NoBtn>
                            </ButtonBox>
                          ) : null}

                          {alert.length - 1 === i ? null : <Line></Line>}
                        </div>
                      );
                    })
                  ) : (
                    <div> 알림이 없습니다. </div>
                  )}
                </NotiMsgBox>
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

const NotiBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    &:hover {
      filter: brightness(50%);
    }
  }
`;

const NotiMsgBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 300;
  top: 50px;
  right: 50px;
  max-width: 282px;
  max-height: 405px;
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 2px 6px 12px rgba(0, 0, 0, 0.12);
  overflow: auto;
  .triangle {
    border-bottom: 10px solid white;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    position: absolute;
    right: 30px;
    top: -10px;
  }
`;

const NotiHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
  & > svg {
    cursor: pointer;
  }
`;

const Category = styled.div`
  color: rgba(99, 113, 247, 1);
  font-weight: 600;
  font-size: 12px;
`;

const NotiMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  word-break: keep-all;
  margin-bottom: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const YesBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  margin: 0 4px 0 0;
  padding: 2px 16px;
  background-color: rgba(99, 113, 247, 1);
  cursor: pointer;
`;

const NoBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
  font-size: 10px;
  border-radius: 4px;
  border: 1px solid rgba(194, 194, 194, 1);
  padding: 2px 16px;
  cursor: pointer;
`;

const NotiFooter = styled.div`
  display: flex;
  align-items: center;
  & > div {
    color: rgba(117, 117, 117, 1);
    font-size: 12px;
  }
`;

const Line = styled.hr`
  margin: 16px 0;
  border: 1px solid #dbdbdb;
`;

const NotiCount = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  padding: 5px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: -3px;
  left: 12px;
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
