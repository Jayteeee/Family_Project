import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiVipCrownFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

// 리덕스
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// 모달
import { ModalPortal } from "../../portals";
import {
  AddFamilyModal,
  EditFamilyModal,
  DeleteFamilyModal,
  LogoutModal,
} from "./index";

// 엘리먼트
import { RactangleImage, Text } from "../../../../elements";

// 이미지
import profileImg from "../../../images/profileImg.jpeg";

const ProfileModal = ({ onClose, user }) => {
  const params = useParams();

  const userInfo = useSelector((state) => state.user.user.user);
  console.log("유저정보: ", userInfo);

  const { familyList } = useSelector((state) => state.family);
  console.log("패밀리 리스트: ", familyList);

  const NowFamilyId = params.familyId;
  console.log("현재 가족: ", NowFamilyId);

  const familyHost = familyList?.find((h) => h?.familyId === NowFamilyId);

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
            <BottomDiv>
              <UserInfo>
                <ProfileArea>
                  <RactangleImage
                    S
                    src={user.profileImg ? user.profileImg : profileImg}
                    size="60px"
                    style={{ position: "relative" }}
                  />
                  <EditBtn>
                    <FaPen />
                  </EditBtn>
                </ProfileArea>
                <Usertitle>
                  <UserNickname>
                    {familyHost?.familyHost === user.id ? (
                      <HostSign>
                        <RiVipCrownFill />
                      </HostSign>
                    ) : null}

                    <Text size="18px" fontWeight="600">
                      {user.nickname}
                    </Text>
                  </UserNickname>
                  <Text size="12px" fontWeight="400" color="#757575">
                    {user?.email}
                  </Text>
                  <UserMood>
                    <TodayMood>
                      <Text size="10px" fontWeight="600" color="#757575">
                        오늘의 기분
                      </Text>
                    </TodayMood>
                    <SelectBox>
                      <SelectButton name="mood">
                        <option value="good">🙂좋아요</option>
                        <option value="love">🥰사랑해요</option>
                        <option value="nice">😎멋져요</option>
                        <option value="sad">😥슬퍼요</option>
                        <option value="head">🤯머리아파요</option>
                        <option value="angry">😡화나요</option>
                        <option value="sleepy">😴졸려요</option>
                      </SelectButton>
                    </SelectBox>
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
              <LogoutBox onClick={handleLogoutModal}>
                <p
                  style={{ size: "15px", fontWeight: "700", color: "#8F8F8F" }}
                >
                  로그아웃
                </p>
              </LogoutBox>
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
          <DeleteFamilyModal
            onClose={handleDeleteFamilyModal}
            familyList={familyList}
          />
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

const EditBtn = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 90px;
  left: 80px;
  background-color: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  & > svg {
    display: flex;
    color: #757575;
    padding: 15%;
    margin: 10% auto;
  }
`;

const UserNickname = styled.div`
  display: flex;
  align-items: center;
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
    padding: 15%;
  }
`;

const Usertitle = styled.div`
  width: 75%;
  text-align: left;
`;

const UserMood = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  max-height: 30px;
`;
const TodayMood = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  width: 50%;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const SelectButton = styled.select`
  width: 100%;
  height: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  padding: 4px;
  & > option {
    border-radius: 20px !important;
  }
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
  &:hover {
    background: #f6f6f6;
  }
`;

const LogoutBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  margin: 8px 0px;
  background-color: #f5f5f5;
  &:hover {
    background: #dbdbdb;
  }
`;

export default ProfileModal;
