import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../../../../redux/modules/mission";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, CircleImage, Text } from "../../../../elements";

// 이미지
import profileImg from "../../../images/profileImg.png";

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
      box.style.backgroundColor = "#8F8F8F";
      box.style.borderRadius = "30px";
      box.style.width = "56px";
      box.style.height = "56px";
    } else if (!isChecked && checkedItems.has(familyMemberId)) {
      checkedItems.delete(familyMemberId);
      setCheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
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
            <Text size="22px" fontWeight="600">
              참여 구성원 추가하기
            </Text>
            <br />
            <Text>이번달 목표를 함께할 가족을 정해 보세요</Text>
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
                      <MissionMemberWrap>
                        <MissionMemberBox key={f.familyMemberId}>
                          <label>
                            <input
                              type="checkbox"
                              value={f.familyMemberId}
                              id={f.familyMemberNickname}
                              onChange={(e) => checkHandler(e)}
                            />
                            <CircleImage
                              M
                              size="50px"
                              src={
                                f?.profileImg == null
                                  ? f?.profileImg
                                  : profileImg
                              }
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
              bg="#8C98F8"
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
  height: 35rem;
  max-width: 430px;
  width: 100%;
  border-radius: 25px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

const AddMissionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
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
  padding: 20px 25px;
  margin: 20px 0;
  border: 2px solid #dbdbdb;
  border-radius: 20px;
`;

const MissionMemberWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 20px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 56px;
  height: 56px;
  border-radius: 30px;
  padding-right: 0.2px;
  &:visited {
    background: red;
    * & > div {
      background: red;
    }
  }
  &:hover {
    background-color: #a8a8a8;
  }
  /* &:active {
    background: red;
  } */
  * & > label > input {
    display: none;
  }
`;

const AddFamilyMemberBtnBox = styled.div`
  display: flex;
  margin-top: 15px;
`;

export default MissionMemberModal;
