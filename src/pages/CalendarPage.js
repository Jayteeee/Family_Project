import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { MdAdd } from "react-icons/md";

// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../redux/modules/calendar";

// 컴포넌트
import ScheduleCalendar from "../components/Calendar/ScheduleCalendar";
import PhotoCalendar from "../components/Calendar/PhotoCalendar";

//엘리먼트
import { Text, Button } from "../elements";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import AddScheduleModal from "../shared/modal/component/calendar/AddScheduleModal";

const CalendarPage = (props) => {
  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("schedule");
  const [modalOn, setModalOn] = React.useState(false);

  const list = useSelector((state) => state.calendar.scheduleList);

  const thisMonth = document.getElementsByClassName(
    "react-calendar__navigation__label__labelText"
  )[0]?.childNodes[0].data;

  const scheduleList = list.map((x) =>
    dayjs(x.startDate).format("YYYY년 M월") === thisMonth ? x : null
  );

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  React.useEffect(() => {
    dispatch(scheduleActions.getScheduleDB());
  }, []);

  return (
    <Container>
      <Title>
        <Text H1>캘린더</Text>
        <AddButton onClick={handleModal}>
          <PButton>
            <MdAdd />
          </PButton>
          <Text BL>일정 추가</Text>
        </AddButton>
      </Title>
      <div>
        <FlexBox center>
          <SBox>
            <Wrap>
              <Select>
                <Option1
                  value={status}
                  onClick={() => {
                    setStatus("schedule");
                  }}
                >
                  <div>
                    <Text BM>일정 보기</Text>
                  </div>
                </Option1>
                <Option2
                  value={status}
                  onClick={() => {
                    setStatus("memory");
                  }}
                >
                  <div>
                    <Text BM>추억 보기</Text>
                  </div>
                </Option2>
              </Select>
            </Wrap>
            <CalendarArea>
              {status === "schedule" ? <ScheduleCalendar /> : <PhotoCalendar />}
            </CalendarArea>
          </SBox>
          <ScheduleArea>
            <Text S1>이번 달 일정</Text>
            {scheduleList.map((x) => (
              <FlexBox1>
                <TextBox>
                  <Text BM key={x?.fakeId}>
                    {`${dayjs(x?.startDate)
                      .locale("ko")
                      .format("MM월 DD일, dd")}`}
                  </Text>
                </TextBox>
                <FlexBox2>
                  <DateColor color={x?.color}></DateColor>
                  <Text S3> {x?.event}</Text>
                </FlexBox2>
              </FlexBox1>
            ))}
          </ScheduleArea>
        </FlexBox>
        <CreateButton onClick={handleModal}>+</CreateButton>
        <ModalPortal>
          {modalOn && (
            <AddScheduleModal onClose={handleModal}></AddScheduleModal>
          )}
        </ModalPortal>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 40px;
  display: flex;
  height: calc(100vh - 70px);
  flex-direction: column;
  overflow-y: scroll;
  @media only screen and (max-width: 1199px) {
    margin: 60px 40px;
  }
  @media only screen and (max-width: 839px) {
    margin: 60px 24px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8c98f8;
  border-color: transparent;
  color: white;
  border-radius: 8px;
  padding: 16px 32px;
  width: 159px;
  height: 56px;
  @media only screen and (max-width: 1199px) {
    display: none;
  }
`;

const PButton = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 9px;
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const Select = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 20px;
`;

const Option1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  width: 100%;
  height: 34px;
  left: 4px;
  top: 4px;
  border-radius: 21px;
  ${({ value }) =>
    value === "schedule"
      ? "background-color: #8C98F8;"
      : "background-color: transparent;"};
  ${({ value }) =>
    value === "schedule" ? "color: white;" : "color: #757575;"};
  & > div {
    position: static;
    width: 52px;
    height: 18px;
  }
`;
const Option2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  width: 100%;
  height: 34px;
  left: 4px;
  top: 4px;
  border-radius: 21px;
  ${({ value }) =>
    value === "memory"
      ? "background-color: #F4CC4D;"
      : "background-color: transparent;"};
  ${({ value }) => (value === "memory" ? "color: white;" : "color: #757575;")};
  & > div {
    position: static;
    width: 52px;
    height: 18px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.center ? `center` : `flex-start`)};
  @media only screen and (max-width: 1199px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const FlexBox1 = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 24px;
`;

const FlexBox2 = styled.div`
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 24px 0 0;
  color: #757575;
`;

const SBox = styled.div`
  width: 100%;
  height: 890px;
  margin-top: 110px;
  margin-right: 12px;
  background-color: #fff;
  color: #222;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  @media only screen and (max-width: 1199px) {
    margin: 50px 0 0 0;
  }
  @media only screen and (max-width: 839px) {
    margin: 20px 0 0 0;
  }
`;

const Wrap = styled.div`
  margin: 28px auto;
  width: 208px;
  height: 42px;
`;

const CalendarArea = styled.div``;

const ScheduleArea = styled.div`
  width: 100%;
  height: 912px;
  border-radius: 20px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  margin-top: 110px;
  margin-right: 12px;
  padding: 24px;
  background-color: #fff;
  text-align: start;
  @media only screen and (max-width: 1199px) {
    margin: 24px 0 0 0;
  }
  @media only screen and (max-width: 839px) {
    margin: 16px 0 0 0;
  }
`;

const CreateButton = styled.div`
  display: none;
  @media only screen and (max-width: 1199px) {
    width: 52px;
    height: 52px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 80px;
    right: 20px;
    border-radius: 100%;
    background-color: #8c98f8;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
`;

const DateColor = styled.div`
  width: 8px;
  height: 24px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

export default CalendarPage;
