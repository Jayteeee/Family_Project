import React, { useEffect, createContext } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../redux/modules/mission";

// 컴포넌트
import MissionHeader from "../components/Mission/MissionHeader";
import MissionStatusBox from "../components/Mission/MissionStatusBox";
import MissionList from "../components/Mission/MissionList";
import { userActions } from "../redux/modules/user";
import { familyActions } from "../redux/modules/family";
import { familyMemberActions } from "../redux/modules/familymember";

export const MissionContext = createContext();

const MissionPage = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user.user?.userId);
  console.log("나의 userId:", userId);

  const familyMemberList = useSelector(
    (state) => state.familymember?.familyMemberList
  );
  console.log("가족 구성원:", familyMemberList);

  const { familyId } = props.match?.params;
  console.log("현재 미션페이지 패밀리 아이디:", familyId);

  const MissionData = useSelector((state) => state.mission);
  console.log("현재 미션 데이터: ", MissionData);

  const { missionStatus } = useSelector((state) => state.mission);
  console.log("미션 현황:", missionStatus);

  const thisMonthMissionList = MissionData?.thisMonthMissionList;
  console.log("이번달 미션리스트:", thisMonthMissionList);

  const { pastMissionList } = MissionData;
  console.log("이전 미션리스트:", pastMissionList);

  useEffect(() => {
    dispatch(missionActions.getMissionPage(familyId));
    dispatch(missionActions.getPastMissionDB(familyId));
    dispatch(missionActions.getMissionStatusDB(familyId));
  }, []);

  return (
    <>
      <MissionPageWrap className="res-pageWrap">
        <MissionHeader familyId={familyId} />
        <MissionStatusBox
          missionStatus={missionStatus}
          familyId={familyId}
          thisMonthMissionList={thisMonthMissionList}
        />
        <MissionList
          monthMissionList={thisMonthMissionList}
          pastMissionList={pastMissionList}
          familyId={familyId}
          missionStatus={missionStatus}
        />
      </MissionPageWrap>
    </>
  );
};

const MissionPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default MissionPage;
