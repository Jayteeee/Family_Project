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

const HomeSchedule = ({ familyId, thisMonthEventList }) => {
  return (
    <ScheduleArea>
      {thisMonthEventList
        ? thisMonthEventList.map((x) => (
            <FlexBox1 key={x?.familyId}>
              <TextBox>
                <Text BM>
                  {`${dayjs(x?.startDate)
                    .locale("ko")
                    .format("MM월 DD일, dd")}`}
                </Text>
              </TextBox>
              <FlexBox2>
                <DateColor color={x?.color}></DateColor>
                <Text fontWeight="400" size="15px">
                  {x?.event}
                </Text>
              </FlexBox2>
            </FlexBox1>
          ))
        : null}
    </ScheduleArea>
  );
};

const ScheduleArea = styled.div`
  width: 100%;
  height: 40vh;
  background-color: transparent;
  text-align: start;
  border: none;
  margin: 0 0 0 10px;
  overflow-y: scroll;
  @media only screen and (max-width: 1199px) {
    margin: 24px 0 0 0;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 16px 0 0 0;
  }
  @media only screen and (max-width: 839px) {
    margin: 16px 0 0 0;
  }
`;

const FlexBox1 = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px;
`;

const FlexBox2 = styled.div`
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  width: 35%;
  height: 18px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 2px 20px 0 0;
  color: #757575;
`;

const DateColor = styled.div`
  width: 8px;
  height: 20px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

export default HomeSchedule;
