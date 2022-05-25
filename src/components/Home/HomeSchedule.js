import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../../redux/modules/calendar";

//엘리먼트
import { Text, Button } from "../../elements";

//이미지
import M_calendar from "../../shared/images/M_calendar.svg";

const HomeSchedule = ({ thisMonthEventList }) => {
  return (
    <ScheduleArea>
      {thisMonthEventList?.length !== 0 ? (
        thisMonthEventList?.map((x) => (
          <FlexBox1 key={x?.eventId}>
            <TextBox>
              <Text BM className="homeScheduleDate">
                {`${dayjs(x?.startDate).locale("ko").format("MM월 DD일, dd")}`}
              </Text>
            </TextBox>
            <FlexBox2>
              <DateColor color={x?.color}></DateColor>
              <Text fontWeight="400" size="15px" className="homeScheduleText">
                {x?.event}
              </Text>
            </FlexBox2>
          </FlexBox1>
        ))
      ) : (
        <NoneContentBox>
          <EmptyContentImg src={M_calendar} />
        </NoneContentBox>
      )}
    </ScheduleArea>
  );
};

const ScheduleArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  text-align: start;
  border: none;
  margin: 0 0 0 10px;
  overflow-y: scroll;

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    margin: 24px 0 50px 0;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 0;
    height: 30vh;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .homeScheduleDate {
      font-size: 10px;
    }
    .homeScheduleText {
      font-size: 12px;
    }
  }
`;

const FlexBox1 = styled.div`
  display: flex;
  width: 100%;
  /* flex-wrap: wrap; */
  /* display: flex; */
  align-items: flex-start;
  margin: 20px 20px 0 20px;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 15px 15px 0 15px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    margin: 10px 10px 0 10px;
  }
`;

const FlexBox2 = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
`;

const TextBox = styled.div`
  width: 31%;
  height: 18px;
  /* display: flex; */
  align-items: center;
  /* justify-content: center; */
  margin: 2px 20px 0 0;
  color: #757575;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 2px 0 0 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    margin: 0;
    width: 27%;
  }
`;

const DateColor = styled.div`
  width: 8px;
  height: 20px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;
const NoneContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

const EmptyContentImg = styled.div`
  width: 70%;
  height: 70%;
  margin: auto;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
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
    width: 100%;
    height: 100%;
  }
`;

export default HomeSchedule;
