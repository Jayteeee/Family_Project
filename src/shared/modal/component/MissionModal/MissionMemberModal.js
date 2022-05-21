import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../../../../redux/modules/mission";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import {
  Button,
  CircleImage,
  RactangleImage,
  Text,
} from "../../../../elements";

// 이미지
// import profileImg from "../../../images/profileImg.png";
import Profile01 from "../../../images/Profile01.png";
import Profile02 from "../../../images/Profile02.png";
import Profile03 from "../../../images/Profile03.png";
import Profile04 from "../../../images/Profile04.png";
import Profile05 from "../../../images/Profile05.png";

const MissionMemberModal = ({ onClose, familyMemberList }) => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const selectedMemberId = [...checkedItems];
  const selectedMemberIdList = [];
  const selectedMember = [
    selectedMemberId.map((f, i) => {
      selectedMemberIdList.push({ familyMemberId: f });
    }),
  ];

  console.log("체크된 가족구성원Id:", selectedMemberId);
  console.log("가족구성원리스트:", familyMemberList);
  console.log(
    "체크된 가족구성원Id 리스트(딕셔너리 형태):",
    selectedMemberIdList
  );

  let selectedMemberList = familyMemberList.filter((l) =>
    selectedMemberIdList.some((f) => l.familyMemberId === f.familyMemberId)
  );

  console.log("체크된 가족구성원정보:", selectedMemberList);

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.value, target.checked);
    console.log(target.parentNode, target.value, target.checked, target.id);
  };

  const checkedItemHandler = (box, familyMemberId, isChecked) => {
    if (isChecked) {
      checkedItems.add(familyMemberId);
      setCheckedItems(checkedItems);
      // box.style.backgroundColor = "#8F8F8F";
      box.style.borderRadius = "25px";
      // box.style.width = "56px";
      // box.style.height = "56px";
      box.style.border = "3px solid #F4CC4D";
      box.style.backgroundColor = "#F4CC4D";
    } else if (!isChecked && checkedItems.has(familyMemberId)) {
      checkedItems.delete(familyMemberId);
      setCheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
      box.style.border = "none";
    }
    return checkedItems;
  };

  const AddMissionMember = () => {
    dispatch(
      missionActions.addMissionMember(selectedMemberList, selectedMemberIdList)
    );
    onClose();
  };
  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AddMissionWrap>
            <CancelBtn
              className="flex-row"
              onClick={() => {
                onClose();
              }}
            >
              <RiArrowLeftSLine size={24} />
            </CancelBtn>
            <Text size="22px" fontWeight="600" className="addMemberHeader1">
              참여 구성원 추가하기
            </Text>
            <br />
            <Text className="addMemberHeader2">
              이번달 목표를 함께할 가족을 정해 보세요
            </Text>
            <br />
            <br />
            <br />
            <FamilyMemberTitle>
              <Text>가족 구성원</Text>
            </FamilyMemberTitle>
            <FamilyMemberBox>
              {familyMemberList ? (
                <AddFamilyMemberBtnBox>
                  {familyMemberList.map((f, l) => {
                    return (
                      <MissionMemberWrap key={f.familyMemberId}>
                        <MissionMemberBox>
                          <label>
                            <input
                              type="checkbox"
                              value={f.familyMemberId}
                              id={f.familyMemberNickname}
                              onChange={(e) => checkHandler(e)}
                            />
                            <RactangleImage
                              S
                              size="65px"
                              // src={f?.profileImg ? f?.profileImg : profileImg}
                              src={
                                f?.profileImg === "Profile01"
                                  ? Profile01
                                  : f?.profileImg === "Profile02"
                                  ? Profile02
                                  : f?.profileImg === "Profile03"
                                  ? Profile03
                                  : f?.profileImg === "Profile04"
                                  ? Profile04
                                  : f?.profileImg === "Profile05"
                                  ? Profile05
                                  : f?.profileImg
                                  ? f?.profileImg
                                  : Profile01
                              }
                              className="missionProfileImage"
                              borderRadius="23px"
                            />
                          </label>
                        </MissionMemberBox>
                        <Text size="12px" margin="10px 0 0 0">
                          {f.familyMemberNickname}
                        </Text>
                      </MissionMemberWrap>
                    );
                  })}
                </AddFamilyMemberBtnBox>
              ) : (
                <AddFamilyMemberBtnBox>
                  <MissionMemberBox>
                    <Text>가족 구성원이 없습니다.</Text>
                  </MissionMemberBox>
                </AddFamilyMemberBtnBox>
              )}
            </FamilyMemberBox>
            <Button
              M
              onClick={AddMissionMember}
              borderColor="transparent"
              bg="#6371F7"
              color="white"
              width="110px"
              height="53px"
              margin="30px 0 0 0"
              fontSize="16px"
              borderRadius="4px"
            >
              추가 하기
            </Button>
          </AddMissionWrap>
        </Content>
      </Background>
    </ModalPortal>
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 36rem;
  max-width: 430px;
  width: 100%;
  border-radius: 25px;
  background-color: #fff;

  position: relative;
  /* overflow: scroll; */
`;

const AddMissionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .addMemberHeader1 {
      font-size: 20px;
    }
    .addMemberHeader2 {
      font-size: 14px;
    }
  }
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  text-align: left;
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 15px;
  margin-top: 15px;
  color: #5c5c5c;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const FamilyMemberTitle = styled.div`
  margin-top: 5px;
  display: flex;
  margin-right: auto;
  font-size: 18px;
`;

const FamilyMemberBox = styled.div`
  background-color: #fff;
  width: 100%;
  max-height: 250px;
  padding: 20px 25px;
  margin: 20px 0;
  border: 2px solid #dbdbdb;
  border-radius: 20px;
  display: flex;
  /* flex-wrap: wrap; */
  overflow-y: scroll;
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 0 25px 20px 25px;
  }
`;

const MissionMemberWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 70px;
  margin: 7px;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .missionProfileImage {
      width: 60px;
      height: 60px;
      border-radius: 21px;
    }
    & > p {
      font-size: 10px;
      margin: 0 !important;
    }
    margin-right: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 60px;
    .missionProfileImage {
      width: 50px;
      height: 50px;
      border-radius: 21px;
    }
    & > p {
      font-size: 10px;
      margin: 0 !important;
    }
    margin-right: 0;
  }
`;

const MissionMemberBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 70px;
  height: 70px;
  border-radius: 25px;

  &:visited {
    background: red;
    * & > div {
      background: red;
    }
  }
  &:hover {
    background-color: #ffdc9b;
  }
  /* &:active {
    background: red;
  } */
  * & > label > input {
    display: none;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 70px;
    height: 70px;
    border-radius: 21px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 60px;
    height: 60px;
    border-radius: 21px;
  }
`;

const AddFamilyMemberBtnBox = styled.div`
  display: flex;
  /* overflow-y: scroll; */
  flex-wrap: wrap;
`;

export default MissionMemberModal;
