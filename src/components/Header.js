import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { IoMdNotifications } from "react-icons/io";

// 리덕스
import { useDispatch } from "react-redux";

// 엘리먼트
import { CircleImage } from "../elements";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import { ProfileModal } from "../shared/modal/component";

const Header = (props) => {
  const { bg } = props;

  console.log(bg);
  const [modalOn, setModalOn] = useState(false);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <div>
        <HeaderWarp>
          <RogoBox>도란도란</RogoBox>
          <HeaderRightBox>
            <IoMdNotifications
              style={{
                marginRight: "20px",
                fontSize: "25px",
                color: "#d6d6d6",
              }}
            />
            <ProfileBox onClick={handleModal}>
              <CircleImage XS />
              <span style={{ marginLeft: "10px" }}>닉네임</span>
            </ProfileBox>
          </HeaderRightBox>
        </HeaderWarp>
      </div>
      {/* 프로필 모달 */}
      <ModalPortal>
        {modalOn && <ProfileModal onClose={handleModal}></ProfileModal>}
      </ModalPortal>
    </>
  );
};

const HeaderWarp = styled.header`
  height: 44px;
  /* background: red; */
  ${(props) => (props.bg ? `background: ${props.bg};` : "")};

  color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 203;
  text-align: center;
  border-bottom: 1px solid #d6d6d6;
`;

const RogoBox = styled.div`
  padding-left: 10px;
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
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
