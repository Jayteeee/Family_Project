import React, { useState, useRef, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdPlayArrow, MdOutlinePause } from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { Text } from "../../elements";
import { missionActions } from "../../redux/modules/mission";

const HomeMissionStatus = ({ familyId }) => {
  const dispatch = useDispatch();

  const { missionStatus } = useSelector((state) => state.mission);

  console.log("미션현황:", missionStatus);

  let nowMonth = dayjs(new Date()).format("M월");

  useEffect(() => {
    dispatch(missionActions.getMissionStatusDB(familyId));
  }, []);

  return (
    <>
      <Container>
        <Figure>
          <ContantBox>
            <CountText>대단해요</CountText>
            {!(missionStatus?.completePercentage === 100) ? (
              <BadgeBar>
                <BadgeBarPercentage
                  badgeCnt={missionStatus?.completePercentage}
                ></BadgeBarPercentage>
              </BadgeBar>
            ) : (
              <CompletedBadgeBar>
                <p style={{ margin: "1px 0 0 0" }}>성공</p>
              </CompletedBadgeBar>
            )}
            <BottomTextBox>
              <Text className="nowMission">
                현재 {missionStatus?.completedMission}개 달성
              </Text>
              <Text className="totalMission">
                {nowMonth} 미션 {missionStatus?.totalMission}개
              </Text>
            </BottomTextBox>
          </ContantBox>
        </Figure>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* column-count: 1; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* column-count: 1;
    padding: 24px; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* column-count: 1;
    padding: 8px; */
  }
`;

const Figure = styled.div`
  break-inside: avoid;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContantBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
`;

const BottomTextBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-direction: right;
  width: 100%;

  .nowMission {
    font-size: 12px;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 5px 0;
  }
  .totalMission {
    position: absolute;
    font-size: 12px;
    display: flex;
    width: 100%;
    justify-content: right;
    padding: 5px 0;
  }
`;

const CountText = styled.div`
  position: relative;
  background: #757575;
  padding: 8px 16px;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 600;
  border-radius: 6px;
  color: #fff;
  margin-bottom: 10px;

  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: none;
    border-top-color: #757575;
    border-width: 5px;
    margin-left: -5px;
  }
`;

const BadgeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  background-color: #f5f5f5;
  /* margin-bottom: auto; */
  border: none;
  border-radius: 50px;
  font-size: 16px;
  position: relative;
  z-index: 1;
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 100%;
    height: 20px;
  }
`;

const BadgeBarPercentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ badgeCnt }) => ` width: ${badgeCnt}%`};
  height: 20px;
  background-color: #f4cc4d;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 16px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 2;
  @media screen and (max-width: 375px) {
    height: 20px;
  }
`;

const CompletedBadgeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  background-color: #f4cc4d;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  z-index: 5;
  color: white;
  font-weight: 600;
  @media screen and (max-width: 375px) {
    width: 130px;
    height: 20px;
  }
`;

export default HomeMissionStatus;
