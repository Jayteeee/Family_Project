import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
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
    completedAt,
    familyMissionChk,
    missionMemberList,
    familyId,
    myFamilyMemberId,
    monthMissionList,
  } = props;

  const missionChk = useSelector((state) => state.mission.myMissionChk);
  console.log("받아온 나의미션체크:", missionChk);

  // const userId = useSelector((state) => state.user.user.user);
  console.log("나의 패밀리멤버ID:", myFamilyMemberId);

  console.log(missionId);

  console.log(props);

  console.log("미션 달성여부:", familyMissionChk);

  const newCompletedAt = dayjs(completedAt).format("MM월 DD일");
  console.log("달성 날짜:", newCompletedAt);

  const myMissionData = missionMemberList.filter(
    (m) => m.familyMemberId === myFamilyMemberId
  );

  console.log("나의 미션 데이터:", myMissionData);

  const myMissionId = myMissionData[0]?.missionId;
  console.log("나의 미션ID:", myMissionId);

  const myMissionChk = myMissionData[0]?.myMissionChk;
  console.log("나의미션체크:", myMissionChk);

  console.log(myFamilyMemberId);
  // 미션 체크
  const [check, setCheck] = useState(false);

  const checkedItemHandler = (missionId) => {
    // setChack(!check);
    let completedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // let misiionId = target.value;
    dispatch(
      missionActions.checkMissionDB(
        missionId,
        myMissionChk,
        familyMissionChk,
        completedAt,
        familyId,
        myFamilyMemberId
      )
    );
  };

  console.log(missionId);

  // 미션 제거하기 모달
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  // const [modalPosition, setModalPosition] = useState();

  const handleDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  // 삭제 버튼 위차찾는 함수
  // const handleModalPosition = (e) => {
  //   console.log(e);
  //   // 배열의 각 div를 특정해주기 위해 각각 존재하는 missionId값을 넣어줍니다.
  //   const element = document.getElementById(missionId);
  //   // let x = element.offsetTop + element.offsetHeight;
  //   // let y = element.offsetLeft + element.offsetWidth;
  //   // let x = e.clientX;
  //   // let y = e.clientY;
  //   let x = e.screenX;
  //   let y = e.screenY;
  //   // element.style.display = "none";
  //   console.log("좌표:", x, y);
  //   setModalPosition([x, y]);
  //   console.log(element.offsetTop);
  // };
  // console.log(modalPosition);

  useEffect(() => {
    dispatch(missionActions.getMissionPage(familyId));
    dispatch(missionActions.getPastMissionDB(familyId));
    dispatch(missionActions.getBadgeListDB(familyId));
    // dispatch(userActions.getUserInfo());
  }, [myMissionChk]);

  return (
    <>
      <MissionBox key={missionId}>
        <MissionTitle>
          {!familyMissionChk ? (
            myMissionChk || check ? (
              <MdCheckBox
                style={{ fontSize: "35px" }}
                onClick={() => {
                  setCheck(false);
                  checkedItemHandler.bind(this, missionId)();
                }}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                style={{ fontSize: "35px", color: "gray" }}
                onClick={() => {
                  setCheck(true);
                  checkedItemHandler.bind(this, missionId)();
                }}
              />
            )
          ) : (
            <div style={{ width: "35px", height: "35px" }} />
          )}
          <MissionTitleBox
            style={{
              width: "67%",
              borderBottom: "2px solid #F5F5F5",
              padding: "5px 0",
              margin: "0 3%",
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
          </MissionTitleBox>
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
          {!familyMissionChk ? (
            <MissionDeleteWrap
              onClick={
                // handleModalPosition(e);
                handleDeleteModal
              }
              id={missionId}
            >
              <MissionDeleteBtn>
                <CgMoreVerticalAlt style={{ fontSize: "30px" }} />
              </MissionDeleteBtn>
            </MissionDeleteWrap>
          ) : (
            <div
              style={{
                width: "3vw",
                display: "flex",
                float: "right",
                justifyContent: "right ",
                alignItems: "center",
              }}
              onClick={
                // handleModalPosition(e);
                handleDeleteModal
              }
              id={missionId}
            >
              <UnMissionDeleteBtn></UnMissionDeleteBtn>
            </div>
          )}
        </MissionTitle>
        <MissionMemberWrap>
          <MissionMemberBox className="res-missionMember">
            {missionMemberList ? (
              missionMemberList.map((f, i) => {
                return (
                  <ProfileBox key={f.familyMemberId}>
                    <CircleImage
                      XS
                      src={f.profileImg ? f.profileImg : profileImg}
                      margin="0 10px 0 0"
                      size="24px"
                      className="CicleImage"
                    />
                    {f.myMissionChk ? <CompletedCicle /> : <UncompletedCicle />}
                  </ProfileBox>
                );
              })
            ) : (
              <div>미션 진행자 없습니다</div>
            )}
          </MissionMemberBox>
          {familyMissionChk && (
            <CompletedAtBox>{newCompletedAt} 달성</CompletedAtBox>
          )}
        </MissionMemberWrap>
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
  /* padding: 0 0 0 25px; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const MissionTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 0;
  height: 60px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 55px;
    font-size: 10px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MissionTitleBox = styled.div`
  width: 67%;
  border-bottom: 2px solid #f5f5f5;
  padding: 5px 0;
  margin: 0 3%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    & p {
      font-size: 14px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MissionMemberWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 10px 10px;
  width: 100%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 0 12px 10px 0 !important;
    margin: 0 -35px 0 0 !important;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 0 0px 0 0 !important;
    margin: 0 0 0 0 !important;
  }
`;

const MissionMemberBox = styled.div`
  display: flex;
  margin: 0 6.5%;
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 0 5.8% !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0 11% !important;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const ProfileBox = styled.div`
  position: relative;
  width: 100%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .CicleImage {
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .CicleImage {
    }
  }
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

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
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

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
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

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: 35px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
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

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: 35px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const CompletedAtBox = styled.div`
  text-align: right;
  flex-grow: 1;
  font-size: 16px;
  color: #a8a8a8;
  margin-right: 8%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin-right: 10%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin-right: 6.5%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-right: 1.5%;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    margin-right: 5%;
  }
`;

const MissionDeleteWrap = styled.div`
  width: 3vw;
  display: flex;
  float: right;
  justify-content: right;
  align-items: center;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin-left: 1%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-left: 1%;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    margin-left: 2%;
  }
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

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const UnMissionDeleteBtn = styled.div`
  display: flex;
  width: 30px;
  height: 40px;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: #757575;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

export default OneMission;
