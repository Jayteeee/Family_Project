import React, { useState, useRef, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiVipCrownFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userActions } from "../../../../redux/modules/user";
import { familyMemberActions } from "../../../../redux/modules/familymember";

// 모달
import { ModalPortal } from "../../portals";
import AlertModal from "../AlertModal";
import LeaveFamilyModal from "./LeaveFamilyModal";
import {
  AddFamilyModal,
  EditFamilyModal,
  DeleteFamilyModal,
  LogoutModal,
} from "./index";

// 엘리먼트
import { RactangleImage, Text, Input } from "../../../../elements";

// 이미지
import Profile01 from "../../../images/Profile01.svg";
import Profile02 from "../../../images/Profile02.svg";
import Profile03 from "../../../images/Profile03.svg";
import Profile04 from "../../../images/Profile04.svg";
import Profile05 from "../../../images/Profile05.svg";

const ProfileModal = ({ onClose, user }) => {
  const dispatch = useDispatch();

  const params = useParams();

  const { familyList } = useSelector((state) => state.family);

  const { familyMemberList } = useSelector((state) => state.familymember);

  const NowFamilyId = params.familyId;

  const familyHost = familyList?.find((h) => h?.familyId === NowFamilyId);

  const myFamilyMemberNickname = familyMemberList?.find(
    (m) => m?.userId === user.userId
  )?.familyMemberNickname;

  const myFamiyMemberId = familyMemberList?.find(
    (m) => m?.userId === user.userId
  )?.familyMemberId;

  const myProfileImg = familyMemberList?.find(
    (m) => m?.userId === user.userId
  )?.profileImg;

  const myTodayMood = familyMemberList?.find(
    (m) => m?.userId === user.userId
  )?.todayMood;

  // 오늘의 기분 수정
  const editTodayMood = () => {
    const selectBox = document.getElementById("selectList");
    const selectTodayMood = selectBox.options[selectBox.selectedIndex].value;
    dispatch(userActions.editTodayMoodDB(selectTodayMood, myFamiyMemberId));
    handleTodayMoodAlert();
  };

  // 프로필 이미지 수정
  const profileImgInput = useRef();
  const onImgInputBtnClick = () => {
    const file = profileImgInput.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("photoFile", file);
    }

    dispatch(userActions.editProfileImgDB(formData, myFamiyMemberId));
  };

  // 가족 구성원 호칭 수정
  const [editFamilyMembeNickname, setEditFamilyMembeNickname] = useState(false);

  const hadleEditFamilyMembeNickname = () => {
    setEditFamilyMembeNickname(!editFamilyMembeNickname);
  };

  const [changeMemberNickname, setChangeMemberNickname] = useState(
    myFamilyMemberNickname
  );

  const handleMemberNicknameChange = (e) => {
    const { value } = e.target;
    setChangeMemberNickname(value);
  };

  const EditFamilyMemberNickname = () => {
    myFamilyMemberNickname === changeMemberNickname
      ? handleUnEditAlert()
      : changeMemberNickname === ""
      ? handleEmptyFamilyMemberName()
      : handleEditAlert();
  };

  // 알림 모달
  const [editAlertOn, setEditAlertOn] = useState(false);
  const [unEditAlertOn, setUnEditAlertOn] = useState(false);
  const [emptyFamilyMemberName, setEmptyFamilyMemberName] = useState(false);

  const handleEditAlert = () => {
    setEditAlertOn(!editAlertOn);
    dispatch(
      familyMemberActions.editFamilyMemberNicknameDB(
        NowFamilyId,
        myFamiyMemberId,
        changeMemberNickname,
        user.userId
      )
    );
  };

  const handleUnEditAlert = () => {
    setUnEditAlertOn(!unEditAlertOn);
  };

  const handleEmptyFamilyMemberName = () => {
    setEmptyFamilyMemberName(!emptyFamilyMemberName);
  };

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

  // 가족 나가기
  const [leaveFamilyModal, setLeaveFamilyModal] = useState(false);

  const handleLeaveFamilyModal = (familyMemberId) => {
    setLeaveFamilyModal(!leaveFamilyModal);
  };

  // 로그아웃 모달
  const [logoutModal, setlogoutModal] = useState(false);

  const handleLogoutModal = () => {
    setlogoutModal(!logoutModal);
    document.getElementById("profileMenu").style.display = "none";
  };

  // 오늘의 기분 알람
  const [todayMoodAlert, setTodayMoodAlert] = useState(false);

  const handleTodayMoodAlert = () => {
    setTodayMoodAlert(!todayMoodAlert);
  };

  const Kakao = window.Kakao;

  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "도란도란",
        description:
          "몸은 멀리 떨어져 있어도 마음은 가까울 수 있도록, 도란도란과 함께 우리 가족만의 이야기를 만들어 보아요.",
        imageUrl:
          "https://family-8.s3.ap-northeast-2.amazonaws.com/photo/1654063453815blob",
        link: {
          mobileWebUrl: "https://www.dorandorans.com/",
          webUrl: "https://www.dorandorans.com/",
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: "https://www.dorandorans.com/",
          },
        },
      ],
    });
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
            <ContentBox>
              <UserInfo>
                <ProfileArea>
                  <RactangleImage
                    S
                    src={
                      myProfileImg === "Profile01"
                        ? Profile01
                        : myProfileImg === "Profile02"
                        ? Profile02
                        : myProfileImg === "Profile03"
                        ? Profile03
                        : myProfileImg === "Profile04"
                        ? Profile04
                        : myProfileImg === "Profile05"
                        ? Profile05
                        : myProfileImg
                        ? myProfileImg
                        : Profile01
                    }
                    size="80px"
                    borderRadius="28px"
                  />
                  <EditBtn
                    className="input-file-button"
                    htmlFor="input-profile-file"
                  >
                    <FaPen />
                  </EditBtn>
                  <input
                    ref={profileImgInput}
                    type="file"
                    id="input-profile-file"
                    accept="image/*"
                    onChange={onImgInputBtnClick}
                    style={{ display: "none" }}
                  />
                </ProfileArea>
                <Usertitle>
                  <UserNickname>
                    {!editFamilyMembeNickname ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "8px 0",
                        }}
                      >
                        {familyHost?.familyHost === user?.id ? (
                          <HostSign>
                            <RiVipCrownFill />
                          </HostSign>
                        ) : null}
                        <Text size="18px" fontWeight="600">
                          {myFamilyMemberNickname}
                        </Text>
                        <EditNicknameBtn onClick={hadleEditFamilyMembeNickname}>
                          <FaPen />
                        </EditNicknameBtn>
                      </div>
                    ) : (
                      <InputWrap>
                        {familyHost?.familyHost === user?.id ? (
                          <HostSign>
                            <RiVipCrownFill />
                          </HostSign>
                        ) : null}
                        <Input
                          id="changeTitle"
                          className="myInput"
                          padding="16px 10px"
                          height="20px"
                          width="100%"
                          maxLength="8"
                          onChange={handleMemberNicknameChange}
                          value={changeMemberNickname}
                          style={{
                            borderRadius: "12px",
                            borderColor: "#E5E5E5",
                          }}
                        />
                        <SaveBtn
                          // onClick={hadleEditFamilyMembeNickname}
                          onClick={EditFamilyMemberNickname}
                        >
                          저장
                        </SaveBtn>
                      </InputWrap>
                    )}
                  </UserNickname>
                  <Text
                    size="12px"
                    fontWeight="400"
                    color="#757575"
                    margin="5px 0 0 0"
                  >
                    {user?.email}
                  </Text>
                  <UserMood>
                    <TodayMood>
                      <Text size="10px" fontWeight="600" color="#757575">
                        오늘의 기분
                      </Text>
                    </TodayMood>
                    <SelectBox>
                      <SelectButton
                        name="mood"
                        id="selectList"
                        onChange={editTodayMood}
                      >
                        <option
                          value="default"
                          style={{ border: "1px solid gray" }}
                        >
                          {myTodayMood === "good" ? (
                            <p>🙂&ensp;좋아요</p>
                          ) : myTodayMood === "love" ? (
                            <p>🥰&ensp;사랑해요</p>
                          ) : myTodayMood === "nice" ? (
                            <p>😎&ensp;멋져요</p>
                          ) : myTodayMood === "sad" ? (
                            <p>😥&ensp;슬퍼요</p>
                          ) : myTodayMood === "head" ? (
                            <p>🤯&ensp;머리아파요</p>
                          ) : myTodayMood === "angry" ? (
                            <p>😡&ensp;화나요</p>
                          ) : myTodayMood === "sleepy" ? (
                            <p>😴&ensp;졸려요</p>
                          ) : (
                            <p>🙂&ensp;좋아요</p>
                          )}
                        </option>
                        <hr />
                        <option value="good">🙂&ensp;좋아요</option>
                        <option value="love">🥰&ensp;사랑해요</option>
                        <option value="nice">😎&ensp;멋져요</option>
                        <option value="sad">😥&ensp;슬퍼요</option>
                        <option value="head">🤯&ensp;머리아파요</option>
                        <option value="angry">😡&ensp;화나요</option>
                        <option value="sleepy">😴&ensp;졸려요</option>
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
              {familyHost?.familyHost === user?.id && (
                <>
                  <MenuBox onClick={handleEditFamilyModal}>
                    <Text size="15px" fontWeight="700">
                      가족 추가하기
                    </Text>
                  </MenuBox>
                  <MenuBox onClick={handleDeleteFamilyModal}>
                    <Text size="15px" fontWeight="700">
                      가족 삭제하기
                    </Text>
                  </MenuBox>
                </>
              )}
              {familyHost?.familyHost !== user?.id && (
                <MenuBox onClick={handleLeaveFamilyModal}>
                  <Text size="15px" fontWeight="700">
                    가족 나가기
                  </Text>
                </MenuBox>
              )}
              <MenuBox onClick={shareKakao}>
                <Text size="15px" fontWeight="700">
                  카카오톡 공유하기
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
            </ContentBox>
          </Content>
        </Background>
        {/* 가족 구성원 호칭 수정 알림 */}
        <ModalPortal>
          {editAlertOn && (
            <AlertModal
              onClose={handleEditAlert}
              content={"가족 구성원 호칭이 변경되었어요."}
            />
          )}
        </ModalPortal>
        <ModalPortal>
          {unEditAlertOn && (
            <AlertModal
              onClose={handleUnEditAlert}
              content={"이전과 동일한 호칭이에요."}
            />
          )}
        </ModalPortal>
        <ModalPortal>
          {emptyFamilyMemberName && (
            <AlertModal
              onClose={handleEmptyFamilyMemberName}
              content={"가족 구성원 호칭을 입력해주세요."}
            />
          )}
        </ModalPortal>
        {/* 오늘의 기분 수정 알람 */}
        <ModalPortal>
          {todayMoodAlert && (
            <AlertModal
              onClose={handleTodayMoodAlert}
              todayMoodClose={onClose}
              content={"오늘의 기분이 변경되었어요!"}
            />
          )}
        </ModalPortal>
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
        <ModalPortal>
          {leaveFamilyModal && (
            <LeaveFamilyModal
              onClose={handleLeaveFamilyModal}
              familyId={NowFamilyId}
              familyMemberId={myFamiyMemberId}
              familyList={familyList}
            />
          )}
        </ModalPortal>
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
  max-height: 430px;
  max-width: 350px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  overflow: scroll;
  margin: 70px 36px;
  padding: 24px;
  display: flex;
  justify-content: center;
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 205;
    height: 400px;
    max-width: 420px;
    width: 100%;
    border-radius: 0 0 24px 24px;
    background-color: #fff;
    margin: 0;
    right: 0;
    position: relative;
    overflow: scroll;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const ContentBox = styled.div`
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  max-width: 278px;
  max-height: 112px;
  padding: 16px 0;
  width: 100%;
  margin: 0 auto;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  width: 100%;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 38px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
  .myInput {
    :focus {
      box-shadow: none;
      outline: none !important;
      border-color: #6371f7 !important;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      height: 23px;
    }
  }
`;

const SaveBtn = styled.div`
  width: 30px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  opacity: 0.4;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
  position: relative;
`;

const EditBtn = styled.label`
  cursor: pointer;
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  top: 55px;
  left: 60px;
  background-color: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    display: flex;
    color: #757575;
    padding: 7%;
    margin: 10% auto;
  }
  &:hover {
    background: #dbdbdb;
  }
`;

const Usertitle = styled.div`
  width: 65%;
  text-align: left;
`;

const UserNickname = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  height: 37px;
`;

const HostSign = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #6371f7;
  margin-right: 8px;
  & > svg {
    color: white;
    padding: 15%;
  }
`;

const EditNicknameBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 90px;
  left: 80px;
  background-color: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  margin-left: 5px;
  & > svg {
    color: #757575;
    font-size: 10px;
  }
  cursor: pointer;
  &:hover {
    background: #dbdbdb;
  }
`;

const UserMood = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  max-height: 30px;
`;
const TodayMood = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 50%;
`;

const Line = styled.hr`
  margin: 16px 0;
  border: 1px solid #dbdbdb;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 30px;
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
  border-radius: 4px;
  background-color: #f5f5f5;
  &:hover {
    background: #dbdbdb;
  }
`;

export default ProfileModal;
