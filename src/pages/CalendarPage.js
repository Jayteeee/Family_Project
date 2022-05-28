import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FiPlus } from "react-icons/fi";

// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../redux/modules/calendar";
import { history } from "../redux/configureStore";

// 이미지
import emptyPhoto from "../shared/images/emptyPhoto.svg";
import emptyContent from "../shared/images/M_calendar.svg";

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

  // const thisMonth = document.getElementsByClassName(
  //   "react-calendar__navigation__label__labelText"
  // )[0]?.childNodes[0]?.data;

  const [thisMonth, setThisMonth] = useState();

  const target = document.getElementsByClassName(
    "react-calendar__navigation__label__labelText"
  )[0];

  const options = {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    characterData: true,
  };

  const observer = new MutationObserver((mutationList, observer) => {
    setThisMonth(mutationList[0]?.target.data);
  });

  const arr = { thisMonth };

  let scheduleList = list.map((x) =>
    dayjs(x?.startDate).format("YYYY년 M월") === thisMonth ? x : null
  );

  const YYYY = Object.values(arr)[0]?.split(" ")[0]?.split("년")[0];
  const MM = Object.values(arr)[0]?.split(" ")[1]?.split("월")[0];
  const date = `${MM < 10 ? `${YYYY}-0${MM}` : `${YYYY}-${MM}`}`;

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  React.useEffect(() => {
    dispatch(scheduleActions.getScheduleDB(familyId, date));
  }, [thisMonth]);

  React.useEffect(() => {
    setThisMonth(
      document.getElementsByClassName(
        "react-calendar__navigation__label__labelText"
      )[0]?.childNodes[0]?.data
    );
    setTimeout(() => {
      observer.observe(target, options);
    }, 50);
  }, [observer]);

  // 토큰 없을 시 랜딩페이지로
  if (!sessionStorage.getItem("token")) {
    history.replace("/");
    localStorage.clear();
  }

  return (
    <Container>
      <Title>
        <Text H1 className="calendarTitle">
          캘린더
        </Text>
        <AddButton onClick={handleModal}>
          <Text BL>
            <FiPlus />
            일정 추가
          </Text>
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
            {scheduleList?.length !== 0 ? (
              scheduleList.map((x, i) => (
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
            ) : (
              <NoneContentBox>
                <NoneContentItem>
                  <EmptyContentImg src={emptyContent} />
                </NoneContentItem>
              </NoneContentBox>
            )}
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
  /* margin-top: 5px; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 16px 7px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin: 26px 6px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 7px 0;
    .calendarTitle {
      font-size: 30px;
    }
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
  width: 159px;
  height: 56px;
  margin-top: 1px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    font-size: 20px;
    margin-right: 5px;
  }
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
      ? "background-color: #ffdc65;"
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
    margin: 12px 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const FlexBox2 = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: flex-start;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .scheduleText {
      font-size: 12px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const TextBox = styled.div`
  height: 18px;
  width: 88px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 24px 0 0;
  color: #757575;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0 16px 0 0;
    width: 20%;
    p {
      font-size: 10px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 30%;
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
const NoneContentBox = styled.div`
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

const NoneContentItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyContentImg = styled.div`
  width: 100%;
  height: 100%;
  padding: 40%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 35%;
  }
`;

export default CalendarPage;
