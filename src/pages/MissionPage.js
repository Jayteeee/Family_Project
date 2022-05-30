import React, { useEffect, createContext } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../redux/modules/mission";
import { history } from "../redux/configureStore";

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

  const familyMemberList = useSelector(
    (state) => state.familymember?.familyMemberList
  );

  const { familyId } = props.match?.params;

  const MissionData = useSelector((state) => state.mission);

  const { missionStatus } = useSelector((state) => state.mission);

  const thisMonthMissionList = MissionData?.thisMonthMissionList;

  const { pastMissionList } = MissionData;

  useEffect(() => {
    dispatch(missionActions.getMissionPage(familyId));
    dispatch(missionActions.getPastMissionDB(familyId));
    dispatch(missionActions.getMissionStatusDB(familyId));
  }, []);

  // 토큰 없을 시 랜딩페이지로
  if (!sessionStorage.getItem("token")) {
    history.replace("/");
    localStorage.clear();
  }

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
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 100%;
  }
`;

export default MissionPage;
