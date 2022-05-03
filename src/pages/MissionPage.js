import React, { useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../redux/modules/mission";

// 컴포넌트
import MissionHeader from "../components/Mission/MissionHeader";
import MissionStatusBox from "../components/Mission/MissionStatusBox";
import MissionList from "../components/Mission/MissionList";

const MissionPage = (props) => {
  const dispatch = useDispatch();

  const { familyId } = props.match?.params;
  console.log("현재 미션페이지 패밀리 아이디:", familyId);

  const nowMissionData = useSelector((state) => state.mission.nowMissionData);
  console.log("현재 미션 데이터: ", nowMissionData);

  const missionStatus = nowMissionData.missionBox;
  console.log("미션 현황:", missionStatus);

  const { monthMissionList } = nowMissionData;
  console.log("이번달 미션리스트:", monthMissionList);

  const { pastMissionList } = nowMissionData;
  console.log("이번달 미션리스트:", pastMissionList);

  useEffect(() => {
    dispatch(missionActions.getMissionPage(familyId));
  }, []);

  return (
    <>
      <MissionPageWrap className="res-missionPageWrap">
        <MissionHeader />
        <MissionStatusBox missionStatus={missionStatus} />
        <MissionList
          monthMissionList={monthMissionList}
          pastMissionList={pastMissionList}
        />
      </MissionPageWrap>
    </>
  );
};

const MissionPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default MissionPage;
