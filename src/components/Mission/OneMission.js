import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCheckBox } from "react-icons/md";
import { CgMoreVerticalAlt } from "react-icons/cg";
import dayjs from "dayjs";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { Button, CircleImage, Text } from "../../elements";

// 이미지
import profileImg from "../../shared/images/profileImg.png";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeleteMissionModal } from "../../shared/modal/component/MissionModal";

// 컴포넌트
import { missionActions } from "../../redux/modules/mission";

const OneMission = (props) => {
  const dispatch = useDispatch();

  const {
    missionId,
    missionTitle,
    missionChk,
    completedAt,
    familyMissionChk,
    missionMemberList,
    familyId,
    monthMissionList,
  } = props;

  console.log(props);

  const myFamilyMemberId = useSelector(
    (state) => state.user.user.familyMemberId
  );

  console.log("나의 가족구성원Id:", myFamilyMemberId);

  // user가 속해 있는 mission
  const myMission = monthMissionList.find((m) =>
    m.missionMemberList.filter((f) => f.familyMemberId === myFamilyMemberId)
  );

  console.log("내가 속해있는 미션:", myMission);

  // 미션 체크관련 함수
  const [isChecked, setIsChecked] = useState(false);
  console.log("미션개인체크유무:", isChecked);
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.value, target.checked);
    console.log(target.checked);
  };

  const checkedItemHandler = (missionId, isCheck) => {
    let completedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    dispatch(
      missionActions.checkMissionDB(
        missionId,
        isCheck,
        isCheck,
        completedAt,
        familyId
      )
    );
  };

  console.log(missionId);

  let data = document.getElementsByClassName("checks")[0]?.id;
  // .filter((m) => console.log(m.name));
  console.log("내가 속해있는 미션 체크박스", data);

  // 미션 제거하기 모달
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [modalPosition, setModalPosition] = useState();

  const handleDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };
  // 삭제 버튼 위차찾는 함수
  const handleModalPosition = () => {
    // 배열의 각 div를 특정해주기 위해 각각 존재하는 missionId값을 넣어줍니다.
    const element = document.getElementById(missionId);
    let x = element.offsetTop + element.offsetHeight;
    let y = element.offsetLeft + element.offsetWidth;
    // element.style.display = "none";
    console.log("좌표:", x, y);
    setModalPosition([x, y]);
    console.log(element.offsetTop);
  };

  console.log(modalPosition);
  return (
    <>
      <MissionBox key={missionId}>
        <MissionTitle>
          {/* {missionId === myMission.missionId ? ( */}
          <MissionChkBox>
            <label htmlFor="missionChk" className="checks">
              <input
                type="checkbox"
                value={missionId}
                id="missionChk"
                className="missionChk"
                name={missionId}
                onChange={(e) => checkHandler(e)}
              />
            </label>
          </MissionChkBox>
          {/* ) : (
            <MissionTitle></MissionTitle>
          )} */}
          <div
            style={{
              width: "67%",
              borderBottom: "2px solid #F5F5F5",
              padding: "5px 0",
              margin: "0 20px",
            }}
          >
            <Text
              size="16px"
              padding="0 0 1px 0"
              margin="0"
              width="100%"
              height="60px"
            >
              {missionTitle}
            </Text>
          </div>
          <div>{missionChk}</div>
          <div
            style={{
              display: "flex",
              width: "120px",
              justifyContent: "center",
              marginRight: "4px",
            }}
          >
            {familyMissionChk ? (
              <CompletedMission>달성완료</CompletedMission>
            ) : (
              <UncompletedMission>미완료</UncompletedMission>
            )}
          </div>
          <div
            style={{
              width: "3vw",
              display: "flex",
              float: "right",
              justifyContent: "right ",
              alignItems: "center",
            }}
            onClick={(e) => {
              handleModalPosition();
              handleDeleteModal();
            }}
            id={missionId}
          >
            <MissionDeleteBtn>
              {!familyMissionChk && (
                <CgMoreVerticalAlt style={{ fontSize: "30px" }} />
              )}
            </MissionDeleteBtn>
          </div>
        </MissionTitle>

        <MissionMemberBox className="res-missionMemberBox">
          <div
            style={{ display: "flex", margin: "0 30px" }}
            className="res-missionMember"
          >
            {missionMemberList ? (
              missionMemberList.map((f, i) => {
                return (
                  <div key={f.familyMemberId} style={{ position: "relative" }}>
                    <CircleImage
                      XS
                      src={f.profileImg ? f.profileImg : profileImg}
                      margin="0 10px 0 0"
                      size="24px"
                    />
                    {f.myMissionChk ? <CompletedCicle /> : <UncompletedCicle />}
                  </div>
                );
              })
            ) : (
              <div>미션 진행자 없습니다</div>
            )}
          </div>
          <div
            style={{
              textAlign: "right",
              flexGrow: "1",
              fontSize: "16px",
              color: "#A8A8A8",
              marginRight: "45px",
            }}
          >
            {completedAt} 달성
          </div>
        </MissionMemberBox>
      </MissionBox>
      {/* 미션 제거하기 모달 */}
      <ModalPortal
        style={{
          position: "absolute",
        }}
      >
        {deleteModalOn && (
          <DeleteMissionModal
            style={{
              position: "absolute",
            }}
            onClose={handleDeleteModal}
            modalPosition={modalPosition}
            familyId={familyId}
            missionId={missionId}
          ></DeleteMissionModal>
        )}
      </ModalPortal>
    </>
  );
};

const MissionBox = styled.div`
  text-align: left;
  padding: 0 0 0 25px;
`;

const MissionChkBox = styled.label`
  margin-top: 1px;
`;

const MissionTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 0;
  height: 60px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 10px 10px;
`;

const UncompletedCicle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: none;
  background-color: #8f8f8f;
  position: absolute;
  top: 13px;
  right: 7px;
`;

const CompletedCicle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: none;
  background-color: #f4cc4d;
  position: absolute;
  top: 13px;
  right: 7px;
`;

const CompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 100px;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 21px;
  background: #8c98f8;
  color: white;
`;

const UncompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 85px;
  height: 42px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 21px;
  background: #f5f5f5;
  color: #757575;
`;

const MissionDeleteBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: 30px;
  height: 40px;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: #757575;
  &:hover {
    background: #f5f5f5;
    color: black;
  }
`;

export default OneMission;
