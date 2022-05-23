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
  const familyId = props.match.params.familyId;

  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("schedule");
  const [modalOn, setModalOn] = React.useState(false);

  // let list = [];
  const list = useSelector((state) => state.calendar.scheduleList);

  const thisMonth = document.getElementsByClassName(
    "react-calendar__navigation__label__labelText"
  )[0]?.childNodes[0]?.data;

  const arr = { thisMonth };

  let scheduleList = list.map((x) =>
    dayjs(x?.startDate).format("YYYY년 M월") === thisMonth ? x : null
  );

  const YYYY = Object.values(arr)[0]?.split(" ")[0]?.split("년")[0];
  const MM = Object.values(arr)[0]?.split(" ")[1]?.split("월")[0];
  const date = `${MM < 10 ? `${YYYY}-0${MM}` : `${YYYY}-${MM}`}`;

  console.log("보내는 날짜:", date);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  React.useEffect(() => {
    dispatch(scheduleActions.getScheduleDB(familyId, date));
  }, [list.length, thisMonth]);

  return (
    <Container>
      <Title>
        <Text H1 className="calendarTitle">
          캘린더
        </Text>
        <AddButton onClick={handleModal}>
          <span
            style={{
              fontSize: "25px",
              margin: "0px 5px 4px 0",
              fontWeight: "600",
            }}
          >
            +
          </span>
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
              {status === "schedule" ? (
                <ScheduleCalendar familyId={familyId} list={list} />
              ) : (
                <PhotoCalendar familyId={familyId} list={list} />
              )}
            </CalendarArea>
          </SBox>
          <ScheduleArea>
            <Text S1 className="scheduleTitle">
              이번 달 일정
            </Text>
            {scheduleList
              ? scheduleList.map((x, i) => (
                  <FlexBox1 key={i}>
                    <TextBox>
                      <Text BM>
                        {`${dayjs(x?.startDate)
                          .locale("ko")
                          .format("MM월 DD일, dd")}`}
                      </Text>
                    </TextBox>
                    <FlexBox2>
                      <DateColor color={x?.color}></DateColor>
                      <Text S3 className="scheduleText">
                        {x?.event}
                      </Text>
                    </FlexBox2>
                  </FlexBox1>
                ))
              : null}
          </ScheduleArea>
        </FlexBox>
        <CreateButton onClick={handleModal}>
          {" "}
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              fontWeight: "400",
              marginBottom: "1px",
              width: "100%",
              height: "99%",
              cursor: "pointer",
            }}
          >
            +
          </div>
        </CreateButton>
        <ModalPortal>
          {modalOn && (
            <AddScheduleModal
              onClose={handleModal}
              familyId={familyId}
            ></AddScheduleModal>
          )}
        </ModalPortal>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 40px;
  display: flex;
  height: calc(100vh - 40px);
  flex-direction: column;
  overflow-y: scroll;

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    padding: 40px;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 24px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
    padding: 24px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1px;

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    padding: 40px;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 23px 16px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
    padding: 23px 16px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .calendarTitle {
      font-size: 30px;
    }
    padding: 10px 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6371f7;
  border-color: transparent;
  color: white;
  border-radius: 8px;
  padding: 16px 32px;
  width: 159px;
  height: 56px;
  @media only screen and (max-width: 1199px) {
    display: none;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
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
      ? "background-color: #6371F7;"
      : "background-color: transparent;"};
  ${({ value }) => (value === "schedule" ? "color: white;" : "color: #757575")};
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
  ${({ value }) => (value === "memory" ? "color: white;" : "color: #757575")};
  & > div {
    position: static;
    width: 52px;
    height: 18px;
  }
`;

const ScheduleArea = styled.div`
  /* position: relative; */
  width: 100%;
  max-height: 800px;
  overflow-y: scroll;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  margin-top: 100px;
  margin-left: 10px;
  padding: 24px;
  background-color: #fff;
  text-align: start;
  .scheduleTitle {
    font-size: 24px;
    font-weight: 600;
  }
  @media only screen and (max-width: 1199px) {
    margin: 24px 0 0 0;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 16px 0 0 0;
  }
  @media only screen and (max-width: 839px) {
    margin: 16px 0 0 0;
    .scheduleTitle {
      font-size: 20px;
    }
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
  align-items: center;
  margin: 24px;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 24px 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const FlexBox2 = styled.div`
  display: flex;
  align-items: center;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .scheduleText {
      font-size: 15px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const TextBox = styled.div`
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 24px 0 0;
  color: #757575;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0 20px 0 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const SBox = styled.div`
  width: 100%;
  /* height: 890px; */
  height: 800px;
  margin-top: 100px;
  margin-right: 10px;
  background-color: #fff;
  color: #222;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  @media only screen and (max-width: 1199px) {
    margin: 50px 0 0 0;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 20px 0 0 0;
  }
  @media only screen and (max-width: 839px) {
    margin: 20px 0 0 0;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 550px;
    padding: 0 10px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const Wrap = styled.div`
  margin: 28px auto;
  width: 208px;
  height: 42px;
`;

const CalendarArea = styled.div``;

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
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) {
    width: 70px;
    height: 70px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 140px;
    right: 30px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    width: 70px;
    height: 70px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 120px;
    right: 35px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 60px;
    height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 95px;
    right: 25px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 50px;
    height: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 80px;
    right: 25px;
    border-radius: 100%;
    background-color: #6371f7;
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
