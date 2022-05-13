import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";
import { CgCrown } from "react-icons/cg";

// 리덕스
import { useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";
import {
  AddFamilyModal,
  EditFamilyModal,
  DeleteFamilyModal,
  LogoutModal,
} from "./index";

// 엘리먼트
import { CircleImage, RactangleImage, Text } from "../../../../elements";

// 이미지
import profileImg from "../../../images/profileImg.png";

const ProfileModal = ({ onClose }) => {
  const userInfo = useSelector((state) => state.user.user.user);
  console.log("유저정보: ", userInfo);

  const familyTitle = useSelector((state) => state.family);
  console.log("패밀리 타이틀: ", familyTitle);

  console.log(onClose);
  // 가족 생성하기 모달
  const [addFamilyModal, setaddFamilyModal] = useState(false);

  const handleAddFamilyModal = () => {
    setaddFamilyModal(!addFamilyModal);
    document.getElementById("profileMenu").style.display = "none";
  };
  // 가족 수정하기 모달
  const [editFamilyModal, setEditFamilyModal] = useState(false);

  const handleEditFamilyModal = () => {
    setEditFamilyModal(!editFamilyModal);
    document.getElementById("profileMenu").style.display = "none";
  };
  // 가족 제거하기 모달
  const [deleteFamilyModal, setDeleteFamilyModal] = useState(false);

  const handleDeleteFamilyModal = () => {
    setDeleteFamilyModal(!deleteFamilyModal);
    document.getElementById("profileMenu").style.display = "none";
  };
  // 로그아웃 모달
  const [logoutModal, setlogoutModal] = useState(false);

  const handleLogoutModal = () => {
    setlogoutModal(!logoutModal);
    document.getElementById("profileMenu").style.display = "none";
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
            id="profileMenu"
          >
            {/* 여기부터 실제 모달에 보여지는 컨텐츠 들입니다 */}
            {/* <TopDiv>
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
            </TopDiv> */}
            <BottomDiv>
              <UserInfo>
                <ProfileArea>
                  <RactangleImage
                    S
                    src={userInfo.profileImg ? userInfo.profileImg : profileImg}
                    size="60px"
                  />
                </ProfileArea>
                <Usertitle>
                  <UserNickname>
                    <HostSign>{/* <Crown /> */}</HostSign>
                    <Text size="15px">{userInfo.nickname}</Text>
                  </UserNickname>
                  <Text size="14px" fontWeight="700">
                    {userInfo?.email}
                  </Text>
                  <UserMood>
                    <TodayMood>오늘의 기분</TodayMood>
                    <SelectButton>
                      <option>🙂좋아요</option>
                      <option>🥰사랑해요</option>
                      <option>😎멋져요</option>
                      <option>😥슬퍼요</option>
                      <option>🤯머리아파요</option>
                      <option>😡화나요</option>
                      <option>😴졸려요</option>
                    </SelectButton>
                  </UserMood>
                </Usertitle>
              </UserInfo>
              <Line />
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
              <MenuBox onClick={handleDeleteFamilyModal}>
                <Text size="15px" fontWeight="700">
                  가족 제거하기
                </Text>
              </MenuBox>
              <Line />
              <MenuBox onClick={handleLogoutModal} className="logout">
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
      {/* 가족 제거하기 모달 */}
      <ModalPortal>
        {deleteFamilyModal && (
          <DeleteFamilyModal onClose={handleDeleteFamilyModal} />
        )}
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
  max-height: 378px;
  max-width: 326px;
  width: 100%;
  border-radius: 16px;
  /* border: 1px solid #d6d6d6; */
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  overflow: scroll;
  margin: 70px 36px;
  padding: 24px;
`;

const TopDiv = styled.div`
  height: 70px;
  align-items: center;
`;

const BottomDiv = styled.div`
  /* margin: 20px; */
`;

const Line = styled.hr`
  margin: 16px 0;
  color: #dbdbdb;
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
  align-items: center;
  justify-content: center;
  border: none;
  max-width: 278px;
  max-height: 112px;
  padding: 16px;
  width: 100%;
  /* &:hover {
    background: #e5e5e5;
  } */
`;

const ProfileArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  border-radius: 28px;
  margin-right: 16px;
`;

const UserNickname = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const HostSign = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #6f5fce;
  margin-right: 8px;
  & > svg {
    color: white;
    fill: white;
  }
`;

const Usertitle = styled.div`
  width: 75%;
  text-align: left;
`;

const UserMood = styled.div`
  display: flex;
  width: 100%;
  max-width: 146px;
  max-height: 24px;
`;
const TodayMood = styled.div`
  margin-right: 8px;
`;
const SelectButton = styled.select`
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  padding: 0 4px;
`;

const MenuBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  margin: 8px 0px;
  .logout {
    background-color: #f5f5f5;
  }
  &:hover {
    background: #f6f6f6;
  }
`;

export default ProfileModal;
