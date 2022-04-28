import React, { useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../redux/modules/mission";

// 컴포넌트
import MissionHeader from "../components/Mission/MissionHeader";

const MissionPage = (props) => {
  const dispatch = useDispatch();

  const { familyId, missionId } = props.match?.params;
  console.log("현재 미션페이지 familyId, missionId값: ", familyId, missionId);

  const nowFamily = useSelector((state) => state.family.familyList).find(
    (f) => f.familyId === familyId
  );
  console.log("현재 미션페이지 가족 데이터: ", nowFamily);

  useEffect(() => {
    dispatch(missionActions.getMissionPage(familyId, missionId));
  }, [nowFamily]);

  return (
    <>
      {/* <MissionHeader /> */}
      <div>미션 페이지</div>
    </>
  );
};

export default MissionPage;
