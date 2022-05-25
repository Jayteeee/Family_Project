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
import L_Mission_previous from "../../shared/images/L_Mission_previous.svg";
import L_Mission from "../../shared/images/L_Mission.svg";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { AddMissionModal } from "../../shared/modal/component/MissionModal";

// 컴포넌트
import PastMissionList from "./PastMissionList";
import { missionActions } from "../../redux/modules/mission";
import OneMission from "./OneMission";

const MissionList = ({
  monthMissionList,
  pastMissionList,
  familyId,
  missionStatus,
}) => {
  const dispatch = useDispatch();

  console.log(monthMissionList);

  // 이번달 미션, 지난 미션토클
  const [status, setStatus] = useState(true);

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
  console.log(pastMissionList);

  // 미션 제거하기 모달
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  // 남은 날짜 구하기
  let endMonth = dayjs().daysInMonth();

  let nowDay = endMonth - dayjs(new Date()).format("D");

  // 미션 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <MissionListWrap className="res-missionListWrap">
        {status ? (
          <div
            className="res-selectMissionList-1"
            style={{
              width: "100%",
              textAlign: "left",
              display: "none",
            }}
          >
            <Text
              id="fsadf"
              className="res-monthMissionTitle"
              margin="0 10px"
              fontWeight="700"
              size="24px"
            >
              이번 달 미션
            </Text>
            <MissionListBox className="res-missinoListBox">
              <div style={{ display: "flex" }}>
                <MissionSelect className="res-missionSelect">
                  <Option
                    value={status}
                    onClick={() => {
                      setStatus(true);
                    }}
                  >
                    <Text size="15px">이번 달 미션</Text>
                  </Option>
                  <Option
                    value={!status}
                    onClick={() => {
                      setStatus(false);
                    }}
                  >
                    <Text size="15px">지난 미션</Text>
                  </Option>
                </MissionSelect>
              </div>
              {monthMissionList?.length !== 0 && (
                <DayBox
                  style={{
                    textAlign: "left",
                    marginBottom: "15px",
                  }}
                >
                  <Text size="16px" fontWeight="400">
                    D-{nowDay}
                  </Text>
                </DayBox>
              )}
              <div>
                {monthMissionList?.length !== 0 ? (
                  monthMissionList.map((m, i) => {
                    return (
                      <OneMission
                        key={m.missionId}
                        {...m}
                        familyId={familyId}
                        monthMissionList={monthMissionList}
                        missionStatus={missionStatus}
                      />
                    );
                  })
                ) : (
                  <NoneMissionWrap>
                    <NoneMissionBox>
                      <EmptyContentImg src={L_Mission} />
                    </NoneMissionBox>
                  </NoneMissionWrap>
                )}
              </div>
              <FloatingButton onClick={handleModal}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "400",
                    marginBottom: "1px",
                    width: "100%",
                    height: "99%",
                    cursor: "pointer",
                  }}
                >
                  +
                </div>
              </FloatingButton>
            </MissionListBox>
          </div>
        ) : (
          <div
            style={{ width: "100%", textAlign: "left", display: "none" }}
            className="res-pastMissionList"
          >
            <MissionListBox className="res-missinoListBox">
              <div style={{ display: "flex" }}>
                <MissionSelect className="res-missionSelect">
                  <Option
                    value={status}
                    onClick={() => {
                      setStatus(true);
                    }}
                  >
                    <Text size="15px">이번 달 미션</Text>
                  </Option>
                  <Option
                    value={!status}
                    onClick={() => {
                      setStatus(false);
                    }}
                  >
                    <Text size="15px">지난 미션</Text>
                  </Option>
                </MissionSelect>
              </div>
              {pastMissionList?.length !== 0 ? (
                <PastMissionList pastMissionList={pastMissionList} />
              ) : (
                <NoneMissionWrap>
                  <NoneMissionBox>
                    <EmptyContentImg src={L_Mission_previous} />
                  </NoneMissionBox>
                </NoneMissionWrap>
              )}
            </MissionListBox>
          </div>
        )}
        {/* 웹으로 볼 때 나타나는 이번달 미션 뷰 */}
        <div
          className="res-selectMissionList-2"
          style={{ width: "100%", textAlign: "left" }}
        >
          <Text margin="0 10px" fontWeight="600" size="24px">
            이번 달 미션
          </Text>
          <MissionListBox className="res-missinoListBox">
            {monthMissionList?.length !== 0 && (
              <DayBox style={{ textAlign: "left", marginBottom: "20px" }}>
                <Text size="16px" fontWeight="400">
                  D-{nowDay}
                </Text>
              </DayBox>
            )}
            <div>
              {monthMissionList?.length !== 0 ? (
                monthMissionList.map((m, i) => {
                  return (
                    <OneMission
                      key={m.missionId}
                      {...m}
                      familyId={familyId}
                      monthMissionList={monthMissionList}
                      missionStatus={missionStatus}
                    />
                  );
                })
              ) : (
                <NoneMissionWrap>
                  <NoneMissionBox>
                    <EmptyContentImg src={L_Mission} />
                  </NoneMissionBox>
                </NoneMissionWrap>
              )}
            </div>
          </MissionListBox>
        </div>
        <div
          className="res-wepPastMissionList"
          style={{ width: "100%", height: "100%", textAlign: "left" }}
        >
          <Text margin="0 10px" fontWeight="700" size="24px">
            지난 미션
          </Text>
          <MissionListBox>
            {pastMissionList?.length !== 0 ? (
              <PastMissionList pastMissionList={pastMissionList} />
            ) : (
              <NoneMissionWrap>
                <NoneMissionBox>
                  <EmptyContentImg src={L_Mission_previous} />
                </NoneMissionBox>
              </NoneMissionWrap>
            )}
          </MissionListBox>
        </div>
      </MissionListWrap>
      {/* 미션 추가 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddMissionModal
            onClose={handleModal}
            familyId={familyId}
          ></AddMissionModal>
        )}
      </ModalPortal>
    </>
  );
};

const MissionListWrap = styled.div`
  display: flex;
  margin: 20px 30px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 16px 14px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 16px 8px !important;
  }
`;

const MissionListBox = styled.div`
  background: #fff;
  min-height: 480px;
  margin: 20px 10px;
  padding: 20px;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin-top: 0px !important;
    padding-left: 20px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    min-height: 480px;
    padding: 16px;
    /* margin: 20px 9px; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-top: 0px !important;
  }
`;

const DayBox = styled.div`
  & > p {
    font-size: 15px;
  }
`;

const NoneMissionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 380px;
  margin-top: 5%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    margin-top: 5%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin-top: 7%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin-top: 0;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 350px;
  }
`;

const NoneMissionBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    padding: 1rem 1rem;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 1rem 12rem;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 1rem 4rem;
  }

  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 1rem 3.5rem;
  }
`;

const EmptyContentImg = styled.div`
  width: 100%;
  padding: 30%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 70%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    padding: 80%;
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 100%;
  }

  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 100%;
  }
`;

// 미션 토글용 CSS
const MissionSelect = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 200px;
  padding-left: 1px;
  margin: 10px auto 30px auto;
  background-color: #a8a8a8;
  border-radius: 20px;
  display: none;
`;

const Option = styled.div`
  width: 50%;
  border-radius: 20px;
  padding: 5px;
  margin: 2px;
  cursor: pointer;
  ${({ value }) =>
    value ? "background-color: white;" : "background-color: transparent;"};
`;

// 플로팅 버튼
const FloatingButton = styled.div`
  display: none;
  @media only screen and (max-width: 1199px) {
  }
  @media screen and (max-width: 1024px) {
    width: 70px;
    height: 70px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 140px;
    right: 30px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    width: 70px;
    height: 70px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 120px;
    right: 35px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 60px;
    height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 95px;
    right: 25px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 50px;
    height: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 80px;
    right: 25px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
`;

export default MissionList;
