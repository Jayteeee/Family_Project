import React, { useState, useRef, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdPlayArrow, MdOutlinePause } from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { CircleImage, Text } from "../../elements";
import { missionActions } from "../../redux/modules/mission";

// 이미지
import homeMissionStatus from "../../shared/images/homeMissionStatus.png";
import yellowface from "../../shared/images/yellowface.svg";

const HomeMissionStatus = ({ familyId }) => {
  const dispatch = useDispatch();

  const { missionStatus } = useSelector((state) => state.mission);

  const percenTage = missionStatus?.completePercentage;

  let nowMonth = dayjs(new Date()).format("M월");

  useEffect(() => {
    dispatch(missionActions.getMissionStatusDB(familyId));
  }, [familyId]);

  return (
    <>
      <Container>
        <Figure>
          <ContantBox>
            <MiddleTextBox>
              <CircleImage S src={yellowface} size="40px" />
              <CountText>
                {percenTage}%{" "}
                {percenTage === 100
                  ? "우리는 환상의 가족"
                  : 75 <= percenTage && percenTage < 100
                  ? "돌파! 끈끈해요"
                  : 50 <= percenTage && percenTage < 75
                  ? "돌파! 대단해요"
                  : 25 <= percenTage && percenTage < 50
                  ? "돌파! 도전해요"
                  : 0 <= percenTage && percenTage < 25
                  ? "이제 시작해요"
                  : "이제 시작해요"}
              </CountText>
            </MiddleTextBox>
            {!(percenTage === 100) ? (
              <BadgeBar>
                <BadgeBarPercentage badgeCnt={percenTage}></BadgeBarPercentage>
                <BadgeBarBox />
              </BadgeBar>
            ) : (
              <CompletedBadgeBar>
                <p style={{ margin: "1px 0 0 0" }}>성공</p>
              </CompletedBadgeBar>
            )}
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

const MiddleTextBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-direction: right;
  width: 100%;
  margin-bottom: 27px;
  margin-top: 16px;

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
  display: flex;
  align-items: center;
  background: #f7f8ff;
  padding: 8px 16px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  color: #6371f7;
  margin-left: 10px;

  &:after {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(247, 248, 255, 0);
    border-right-color: #f7f8ff;
    border-width: 5px;
    margin-top: -5px;
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
  background-color: #6371f7;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 16px;
  position: absolute;
  top: 0px;
  left: 0;
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
  background-color: #6371f7;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  @media screen and (max-width: 375px) {
    /* width: 130px; */
    height: 20px;
  }
`;

const BadgeBarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  background-color: transparent;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  outline: 3px solid #fff;
  outline-width: 10px;
  @media screen and (max-width: 375px) {
    /* width: 130px; */
    height: 20px;
  }
  /* over border: 3px solid #fff; */
`;

export default HomeMissionStatus;
