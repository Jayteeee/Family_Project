import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { DummyData } from "../shared/DummyData";
import ScheduleCalendar from "../components/Calendar/ScheduleCalendar";
import PhotoCalendar from "../components/Calendar/PhotoCalendar";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import AddScheduleModal from "../shared/modal/component/calendar/AddScheduleModal";

const CalendarPage = (props) => {
  const [mark, setMark] = React.useState([
    {
      color: "yellow",
      endDate: "Wed May 18 2022 23:59:59 GMT+0900 (한국 표준시)",
      event: "제목 추가",
      startDate: "Wed May 11 2022 00:00:00 GMT+0900 (한국 표준시)",
    },
  ]);
  const [status, setStatus] = React.useState(true);

  // const events = DummyData.eventCalendarList; //더미데이터

  const list = useSelector((state) => state.calendar.scheduleList);

  const [modalOn, setModalOn] = React.useState(false);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  React.useEffect(() => {
    setMark(list);
  }, []);

  return (
    <Container>
      <Box>
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
      </Box>
      <FlexBox>
        {status === true ? <ScheduleCalendar /> : <PhotoCalendar />}
        <ScheduleArea>
          {dayjs(new Date()).format("MM") ===
          list.find((x) => dayjs(x.startDate).format("MM")) ? (
            <div className="text-gray-500 mt-4">
              {list.map((x) => dayjs(x.startDate)).format("MM월 DD일 ")}
              {list.map((x) => dayjs(x.event))}
            </div>
          ) : null}
        </ScheduleArea>
      </FlexBox>
      <CreateButton onClick={handleModal}>+</CreateButton>
      <ModalPortal>
        {modalOn && <AddScheduleModal onClose={handleModal}></AddScheduleModal>}
      </ModalPortal>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;
`;

const Box = styled.div`
  position: absolute;
  left: 36.5%;
  top: 18%;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10em;
  padding: 1px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 12px;
`;

const Option = styled.div`
  width: 50%;
  border-radius: 8px;
  padding: 5px;
  margin: 2px;
  font-size: 12px;
  cursor: pointer;
  ${({ value }) =>
    value ? "background-color: white;" : "background-color: transparent;"};
`;

const FlexBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const ScheduleArea = styled.div`
  width: 30vw;
  max-width: 90%;
  height: 30vh;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 3rem 0;
  text-align: start;
`;

const CreateButton = styled.div`
  width: 52px;
  height: 52px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 80px;
  right: 30px;
  border-radius: 100%;
  background-color: black;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

export default CalendarPage;
