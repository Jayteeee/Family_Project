import React, { useState, useContext, useEffect } from "react";
import { MissionContext } from "../../../../pages/MissionPage";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";

// 모달
import { ModalPortal } from "../../portals";
import { MissionMemberModal } from "./index";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../../../../redux/modules/mission";
import { history } from "../../../../redux/configureStore";

// 엘리먼트
import { Button, CircleImage, Text, Input } from "../../../../elements";

// 이미지
import profileImg from "../../../images/profileImg.png";
import { familyMemberActions } from "../../../../redux/modules/familymember";

const AddMissionModal = ({ onClose }) => {
  const dispatch = useDispatch();

  // 현재 familyId
  const familyId = useContext(MissionContext);
  console.log("현재 familyId:", familyId);

  //  미션 제목 input
  const [missionTitle, setMissionTitle] = useState("");

  const handleMissionTitle = (e) => {
    const { value } = e.target;
    setMissionTitle(value);
  };

  // console.log("미션 제목:", missionTitle);

  // 참여 구성원 추가하기 모달
  const [AddMissionMemberModal, setAddMissionMemberModal] = useState(false);

  const handleMissionMemberModal = () => {
    setAddMissionMemberModal(!AddMissionMemberModal);
  };
  // 가족 구성원 리스트
  const familyMemberList = useSelector(
    (state) => state?.familymember?.familyMemberList
  );
  // 선택한 미션 구성원 리스트
  const selectedMemberList = useSelector(
    (state) => state.mission?.selectedMemberList
  );
  // 선택한 미션 구성원 Id 리스트
  const selectedMemeberIdList = useSelector(
    (state) => state.mission.selectedMemberIdList
  );

  console.log("선택한 미션 구성원 리스트:", selectedMemberList);
  console.log("선택된 미션 구성원 Id 리스트", selectedMemeberIdList);

  const AddMission = () => {
    if (missionTitle) {
      dispatch(
        missionActions.addMissionDB(
          familyId,
          missionTitle,
          selectedMemeberIdList,
          selectedMemberList
        )
      );
      onClose();
    } else {
      alert("미션 제목을 입력하지 않았습니다.");
    }
  };

  useEffect(() => {
    // dispatch(missionActions.getMissionMemberDB());
    dispatch(familyMemberActions.getFamilyMemberDB(familyId));
  }, []);

  return (
    <>
      <ModalPortal>
        <Background
          className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
            // history.replace()
          }}
        >
          <Content
            // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AddMissionWrap>
              <AddMissionHeader>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <RiArrowLeftSLine size={24} />
                </CancelBtn>
                <Text size="24px" fontWeight="600" className="missionHeader1">
                  미션추가하기
                </Text>
                <br />
                <Text className="missionHeader2">
                  이번달 우리 가족의 새로운 목표를 설정해 보세요
                </Text>
                <br />
                <br />
              </AddMissionHeader>
              <MissionTitleBox>
                미션 제목
                <Input
                  placeholder="ex) 가족 사진 찍기"
                  padding="15px"
                  margin="16px 0 0 0"
                  onChange={handleMissionTitle}
                  borderRadius="20px"
                  borderColor="#DBDBDB"
                />
              </MissionTitleBox>
              <FamilyMemberTitle>
                <Text>참여 구성원</Text>
              </FamilyMemberTitle>
              <FamilyMemberBox>
                {selectedMemberList ? (
                  <AddFamilyMemberBtnBox>
                    {selectedMemberList.map((f, l) => {
                      return (
                        <MissionMemberBox key={f.familyMemberId}>
                          <CircleImage
                            M
                            size="50px"
                            src={
                              f?.profileImg == null ? f?.profileImg : profileImg
                            }
                            className="circleImage"
                          />
                          <Text
                            size="12px"
                            margin="10px 0 0 0"
                            className="memberNickname"
                          >
                            {f.familyMemberNickname}
                          </Text>
                        </MissionMemberBox>
                      );
                    })}
                    <AddCicleBtn onClick={handleMissionMemberModal}>
                      +
                    </AddCicleBtn>
                  </AddFamilyMemberBtnBox>
                ) : (
                  <AddFamilyMemberBtnBox>
                    <MissionMemberBox>
                      <Text>가족 구성원이 없습니다.</Text>
                      <AddCicleBtn onClick={handleMissionMemberModal}>
                        +
                      </AddCicleBtn>
                    </MissionMemberBox>
                  </AddFamilyMemberBtnBox>
                )}
              </FamilyMemberBox>
              <div>
                <Button
                  M
                  onClick={AddMission}
                  borderColor="transparent"
                  bg="#8C98F8"
                  color="white"
                  width="110px"
                  height="53px"
                  margin="30px 0 0 0"
                  fontSize="16px"
                  borderRadius="4px"
                >
                  저장하기
                </Button>
              </div>
            </AddMissionWrap>
          </Content>
        </Background>
      </ModalPortal>
      {/* 참여 구성원 추가하기 모달 */}
      <ModalPortal>
        {AddMissionMemberModal && (
          <MissionMemberModal
            onClose={handleMissionMemberModal}
            familyMemberList={familyMemberList}
          />
        )}
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 80%;
  max-width: 470px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 14px;
  position: relative;
  overflow: scroll;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 50%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: 60%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 88%;
    padding: 0px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const AddMissionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
  width: 100%;
  background-color: #fff;
  height: 100%;
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

const AddMissionHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-top: 40px;
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .missionHeader1 {
      font-size: 20px;
    }
    .missionHeader2 {
      font-size: 14px;
    }
  }
`;

const MissionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  font-size: 18px;
  width: 100%;
  margin-top: 3px;
`;
const FamilyMemberTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  font-size: 18px;
  margin-top: 20px;
`;
const FamilyMemberBox = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 5px 20px;
  height: 36%;
  border: 2px solid #dbdbdb;
  border-radius: 20px;
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-top: 20px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MissionMemberBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 20px;

  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 50px;
    .circleImage {
      width: 35px;
      height: 35px;
    }
    .memberNickname {
      font-size: 10px;
    }
    margin-right: 5px;
  }
`;

const AddFamilyMemberBtnBox = styled.div`
  display: flex;
  margin-top: 15px;
`;

const AddCicleBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 46px;
  background-color: #f6f6f6;
  /* margin-left: 10px; */
  cursor: pointer;
  &:hover {
    background-color: #d6d6d6;
  }
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 35px;
    height: 35px;
    margin-left: 8px;
  }
`;
export default AddMissionModal;
