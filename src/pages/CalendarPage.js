import React from "react";
import styled from "styled-components";
import moment from "moment";
import { DummyData } from "../shared/DummyData";
import ScheduleCalendar from "../components/Calendar/ScheduleCalendar";
import PhotoCalendar from "../components/Calendar/PhotoCalendar";
import { Link } from "react-router-dom";

const CalendarPage = (props) => {
  const [mark, setMark] = React.useState([]);
  const [status, setStatus] = React.useState(true);
  const eventCalendarList = DummyData.eventCalendarList;
  const events = eventCalendarList[0];

  React.useEffect(() => {
    setMark(eventCalendarList);
  }, []);

  return (
    <Container>
      <div>
        <Select>
          <Option
            value={status}
            onClick={() => {
              setStatus(true);
            }}
          >
            <p>일정 보기</p>
          </Option>
          <Option
            value={!status}
            onClick={() => {
              setStatus(false);
            }}
          >
            <p>추억 보기</p>
          </Option>
        </Select>
      </div>
      {status === true ? <ScheduleCalendar /> : <PhotoCalendar />}
      <ScheduleArea>
        {moment(new Date()).format("MM") ===
        moment(events.startDate).format("MM") ? (
          <div className="text-gray-500 mt-4">
            {moment(events.startDate).format("MM월 DD일 ")}
            {events.event}
          </div>
        ) : null}
      </ScheduleArea>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  padding: 1px;
  margin: auto;
  background-color: gray;
  border-radius: 20px;
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

const ScheduleArea = styled.div`
  width: 40vw;
  max-width: 90%;
  height: 20vh;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px auto;
  text-align: start;
`;

export default CalendarPage;
