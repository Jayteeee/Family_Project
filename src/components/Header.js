import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";

import styled from "styled-components";
import { CircleImage, Text } from "../elements";

import { ModalPortal } from "../shared/modal/portals";
import ProFileModal from "../shared/modal/component/ProFileModal";

const Header = () => {
  // 로그아웃 추가
  const [modalOn, setModalOn] = useState(false);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <div>
        <HeaderWarp>
          <RogoBox>로고</RogoBox>
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

      <ModalPortal>
        {modalOn && (
          <ProFileModal onClose={handleModal}>
            <UserInfo>
              <div
                className="flex-row"
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <Text size="15px" fontWeight="700">
                  아이디: abcd@gmail.com
                </Text>
              </div>
              <Text size="15px">닉네임: 홍길동</Text>
            </UserInfo>
            <FamilyEdit>
              <Text size="15px" fontWeight="700">
                가족 수정
              </Text>
            </FamilyEdit>
          </ProFileModal>
        )}
      </ModalPortal>
    </>
  );
};

const HeaderWarp = styled.header`
  height: 44px;
  background: #fff;
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

const UserInfo = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: #fff;
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

const FamilyEdit = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

export default Header;
