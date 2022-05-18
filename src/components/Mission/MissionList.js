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

  // 미션 제거하기 모달
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  // 남은 날짜 구하기
  let endMonth = dayjs().daysInMonth();

  let nowDay = endMonth - dayjs(new Date()).format("D");

  return (
    <>
      <MissionListWrap className="res-missionListWrap">
        {status ? (
          <div
            className="res-selectMissionList-1"
            style={{ width: "100%", textAlign: "left", display: "none" }}
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
              <DayBox
                style={{
                  textAlign: "left",
                  marginBottom: "15px",
                  marginLeft: "25px",
                }}
              >
                <Text size="24px" fontWeight="700">
                  D-{nowDay}
                </Text>
              </DayBox>
              <div>
                {monthMissionList ? (
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
                  <Text margin="0 10px">리스트 없음.</Text>
                )}
              </div>
            </MissionListBox>
          </div>
        ) : (
          <div
            style={{ width: "100%", textAlign: "left", display: "none" }}
            className="res-pastMissionList"
          >
            <MissionListBox className="res-missinoListBox">
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
              <PastMissionList pastMissionList={pastMissionList} />
            </MissionListBox>
          </div>
        )}
        {/* 웹으로 볼 때 나타나는 이번달 미션 뷰 */}
        <div
          className="res-selectMissionList-2"
          style={{ width: "100%", textAlign: "left" }}
        >
          <Text margin="0 25px" fontWeight="700" size="24px">
            이번 달 미션
          </Text>
          <MissionListBox className="res-missinoListBox">
            <DayBox style={{ textAlign: "left", marginBottom: "20px" }}>
              <Text size="24px" fontWeight="700">
                D-{nowDay}
              </Text>
            </DayBox>
            <div>
              {monthMissionList ? (
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
                <Text margin="0 10px">리스트 없음.</Text>
              )}
            </div>
          </MissionListBox>
        </div>
        <div
          className="res-wepPastMissionList"
          style={{ width: "100%", textAlign: "left" }}
        >
          <Text margin="0 25px" fontWeight="700" size="24px">
            지난 미션
          </Text>
          <MissionListBox>
            <PastMissionList pastMissionList={pastMissionList} />
          </MissionListBox>
        </div>
      </MissionListWrap>
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
  margin: 20px 10px;
  padding: 45px 20px 45px 45px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 3px 0px #d6d6d6;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin-top: 0px !important;
    padding-left: 20px !important;
    padding-right: 0;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin: 20px 9px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-top: 0px !important;
    padding-left: 10px !important;
  }
`;

const DayBox = styled.div`
  & > p {
    font-size: 15px;
  }
`;

// 미션 토글용 CSS
const MissionSelect = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 200px;
  padding: 1px;
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

export default MissionList;
