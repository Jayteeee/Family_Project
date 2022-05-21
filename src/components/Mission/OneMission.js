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
// import profileImg from "../../shared/images/profileImg.png";
import Profile01 from "../../shared/images/Profile01.png";
import Profile02 from "../../shared/images/Profile02.png";
import Profile03 from "../../shared/images/Profile03.png";
import Profile04 from "../../shared/images/Profile04.png";
import Profile05 from "../../shared/images/Profile05.png";

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
    myMissionChk,
    missionStatus,
  } = props;

  // console.log("받아온 나의미션리스트:", monthMissionList);

  // console.log("나의 패밀리멤버ID:", myFamilyMemberId);

  // console.log(missionId);

  // console.log(props);

  // console.log("미션 달성여부:", familyMissionChk);

  const newCompletedAt = dayjs(completedAt).format("MM월 DD일");
  // console.log("달성 날짜:", newCompletedAt);

  const userId = useSelector((state) => state.user.user.user?.userId);

  // console.log("userId:", userId);

  // 미션 체크
  // const [check, setCheck] = useState(false);

  // const handleCheck = () => {
  //   setCheck(!check);
  // };

  // console.log("check:", check);

  const checkedItemHandler = (missionId, missionChk) => {
    console.log(missionChk);

    let completedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

    dispatch(
      missionActions.checkMissionDB(
        missionId,
        missionChk,
        familyMissionChk,
        completedAt,
        familyId,
        userId
        // missionStatus
      )
    );
    dispatch(missionActions.getMissionStatusDB(familyId));
  };

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

  return (
    <>
      <MissionBox key={missionId}>
        <MissionTitle>
          {!familyMissionChk ? (
            myMissionChk ? (
              <MdCheckBox
                style={{ fontSize: "35px" }}
                onClick={() => {
                  checkedItemHandler.bind(this, missionId, false)();
                }}
              />
            ) : (
              // <div></div>
              <MdCheckBoxOutlineBlank
                style={{ fontSize: "35px", color: "gray" }}
                onClick={() => {
                  checkedItemHandler.bind(this, missionId, true)();
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
                  <ProfileBox key={i}>
                    <CircleImage
                      XS
                      // src={f.profileImg ? f.profileImg : profileImg}
                      src={
                        f.profileImg === "Profile01"
                          ? Profile01
                          : f.profileImg === "Profile02"
                          ? Profile02
                          : f.profileImg === "Profile03"
                          ? Profile03
                          : f.profileImg === "Profile04"
                          ? Profile04
                          : f.profileImg === "Profile05"
                          ? Profile05
                          : f.profileImg
                          ? f.profileImg
                          : Profile01
                      }
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
  background: #6371f7;
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
