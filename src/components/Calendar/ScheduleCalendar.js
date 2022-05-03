import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";
import { DummyData } from "../../shared/DummyData";
import { useSelector } from "react-redux";

const ScheduleCalendar = () => {
  const [value, setValue] = React.useState(new Date());
  const [mark, setMark] = React.useState([{}]);
  // const events = DummyData.eventCalendarList;
  const list = useSelector((state) => state.calendar.scheduleList);
  console.log(list);

  const docs = document.getElementsByClassName("dot");

  const reCheck = () => {
    if (mark !== "") {
      for (let i = 0; i < docs.length; i++) {
        docs[i].style.backgroundColor = mark[i].color;
      }
    }
  };

  React.useEffect(() => {
    setMark(list);
  }, [list]);

  return (
    <div>
      <Container>
        <Calendar
          onChange={setValue} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => dayjs(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="mx-auto w-full text-sm border-b"
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (
              mark.find(
                (x) =>
                  dayjs(x.startDate).format("YYYY-MM-DD") ===
                  dayjs(date).format("YYYY-MM-DD")
              )
            ) {
              html.push(<div className="dot"></div>);
              reCheck();
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  {html}
                </div>
              </>
            );
          }}
        />
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 30vw;
  max-width: 90%;
  margin: 3rem auto;

  .react-calendar {
    width: 100%;
    max-width: 100%;
    height: 100%;
    background-color: transparent;
    color: #222;
    padding: 20% 3% 3%;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5em;
  }

  .react-calendar__navigation {
    position: absolute;
    display: flex;
    height: 44px;
    top: 5rem;
    left: 28rem;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
    font-size: 14px;
  }
  abbr {
    font-size: 16px;
  }

  .react-calendar__tile {
    max-width: 100%;
    width: 5em;
    height: 5em;
    background: none;
    text-align: center;
    border-radius: 100% !important;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .dot {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    position: absolute;
    display: inline;
  }
`;

export default ScheduleCalendar;
