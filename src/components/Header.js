import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { IoMdNotifications } from "react-icons/io";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { CircleImage } from "../elements";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import { ProfileModal } from "../shared/modal/component/ProfileModal";

// 이미지
import profileImg from "../shared/images/profileImg.png";

const Header = (props) => {
  const { bg, user } = props;

  console.log(bg);
  console.log("유저정보: ", user);

  // const { user } = useSelector((state) => state?.user.user);

  // 프로필 수정 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // 알림 모달
  const [notiOn, setNotiOn] = useState(false);

  const handleNoti = () => {
    setNotiOn(!notiOn);
  };

  return (
    <>
      <div>
        <HeaderWarp>
          <RogoBox>도란도란</RogoBox>
          <HeaderRightBox>
            <NotiBox>
              <IoMdNotifications
                style={{
                  marginRight: "20px",
                  fontSize: "25px",
                  color: "#d6d6d6",
                  cursor: "pointer",
                }}
                onClick={handleNoti}
              />
              <NotiCount>2</NotiCount>
            </NotiBox>
            {notiOn ? (
              <NotiMsgBox>
                <NotiMsg>홍길동 님이 좋아요를 누르셨습니다.</NotiMsg>
              </NotiMsgBox>
            ) : null}
            <ProfileBox onClick={handleModal}>
              <CircleImage
                XS
                src={user?.profileImg ? user?.profileImg : profileImg}
              />
              <span style={{ marginLeft: "10px" }}>{user?.nickname}</span>
            </ProfileBox>
          </HeaderRightBox>
        </HeaderWarp>
      </div>
      {/* 프로필 모달 */}
      <ModalPortal>
        {modalOn && (
          <ProfileModal onClose={handleModal} user={user}></ProfileModal>
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
`;

const RogoBox = styled.div`
  padding-left: 10px;
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;

const NotiBox = styled.div`
  position: relative;
`;

const NotiMsgBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 300;
  top: 40px;
  right: 140px;
  max-width: 282px;
  max-height: 405px;
  background-color: white;
`;

const NotiMsg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
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
  &:hover {
    background: #d6d6d6;
  }
  padding: 10px;
`;

export default Header;
