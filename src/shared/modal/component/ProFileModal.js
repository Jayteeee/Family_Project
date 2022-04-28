import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../../../redux/modules/family";

// 모달
import { ModalPortal } from "../portals";
import { AddFamilyModal, EditFamilyModal, LogoutModal } from "./index";

// 엘리먼트
import { CircleImage, Text } from "../../../elements";

const ProfileModal = ({ onClose, props }) => {
  const userInfo = useSelector((state) => state.user.user);
  console.log("유저정보: ", userInfo);

  const familyId = props;
  console.log(familyId);

  const familyTitle = useSelector((state) => state.family);
  console.log("패밀리 타이틀: ", familyTitle);

  console.log(onClose);
  // 가족 생성하기 모달
  const [addFamilyModal, setaddFamilyModal] = useState(false);

  const handleAddFamilyModal = () => {
    setaddFamilyModal(!addFamilyModal);
  };
  // 가족 수정하기 모달
  const [editFamilyModal, setEditFamilyModal] = useState(false);

  const handleEditFamilyModal = () => {
    setEditFamilyModal(!editFamilyModal);
  };
  // 로그아웃 모달
  const [logoutModal, setlogoutModal] = useState(false);

  const handleLogoutModal = () => {
    setlogoutModal(!logoutModal);
  };

  return (
    <>
      <ModalPortal>
        {/* 백그라운드는 모달 뒤의 기존 뷰들을 의미합니다 */}
        <Background
          // className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Content
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* 여기부터 실제 모달에 보여지는 컨텐츠 들입니다 */}
            <TopDiv>
              <TitleWrap
              // className="flex-row"
              >
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    프로필
                  </h1>
                </div>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <RiArrowLeftSLine size={24} />
                </CancelBtn>
              </TitleWrap>
            </TopDiv>
            <BottomDiv>
              <UserInfo>
                <CircleImage S src={userInfo?.profileImg} />
                <div align="left" style={{ margin: "0 10px" }}>
                  <Text size="15px" fontWeight="700">
                    아이디:
                    {userInfo?.email}
                  </Text>
                  <Text size="15px">닉네임: {userInfo?.nickname}</Text>
                </div>
              </UserInfo>
              <MenuBox onClick={handleAddFamilyModal}>
                <Text size="15px" fontWeight="700">
                  가족 생성하기
                </Text>
              </MenuBox>
              <MenuBox onClick={handleEditFamilyModal}>
                <Text size="15px" fontWeight="700">
                  가족 수정하기
                </Text>
              </MenuBox>
              <MenuBox onClick={handleLogoutModal}>
                <Text size="15px" fontWeight="700">
                  로그아웃
                </Text>
              </MenuBox>
            </BottomDiv>
          </Content>
        </Background>
      </ModalPortal>
      {/* 가족 생성하기 모달 */}
      <ModalPortal>
        {addFamilyModal && <AddFamilyModal onClose={handleAddFamilyModal} />}
      </ModalPortal>
      {/* 가족 수정하기 모달 */}
      <ModalPortal>
        {editFamilyModal && <EditFamilyModal onClose={handleEditFamilyModal} />}
      </ModalPortal>
      {/* 로그아웃 모달 */}
      <ModalPortal>
        {logoutModal && <LogoutModal onClose={handleLogoutModal} />}
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Content = styled.div`
  z-index: 205;
  height: 400px;
  max-width: 350px;
  width: 100%;
  border-radius: 0px;
  border: 1px solid #d6d6d6;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  overflow: scroll;
  margin: 40px;
`;

const TopDiv = styled.div`
  height: 70px;
  align-items: center;
`;

const BottomDiv = styled.div`
  margin: 20px;
`;

const TitleWrap = styled.div`
  display: flex;
  min-height: 0;
  align-items: center;
  padding-bottom: 0;
  padding: 20px 20px 0;
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  textalign: left;
  position: absolute;
  left: 0;
  margin-left: 10px;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const UserInfo = styled.div`
  cursor: pointer;
  display: flex;
  // flex-direction: column;
  align-items: center;
  border: none;
  margin-bottom: 30px;
  background: #f4f4f4;
  width: 100%;
  padding: 16px 20px;
  &:hover {
    background: #e5e5e5;
  }
`;

const MenuBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: start;
  border: none;
  background: #f4f4f4;
  width: 100%;
  padding: 16px 20px;
  margin: 10px 0px;
  &:hover {
    background: #e5e5e5;
  }
`;

export default ProfileModal;
