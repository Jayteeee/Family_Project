import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";

const HomeCalendar = ({ thisMonthEventList }) => {
  const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <Container>
        <Calendar
          onChange={setValue} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => dayjs(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];
            let events = "";
            if (thisMonthEventList) {
              events = thisMonthEventList.filter(
                (x) => x.startDate === dayjs(date).format("YYYY-MM-DD")
              );
            }
            if (events.length !== 0) {
              html.push(
                events.map((x) => {
                  return (
                    <div className="division">
                      <div
                        className="dot"
                        date={dayjs(date).format("YYYY-MM-DD")}
                        style={{ backgroundColor: x.color }}
                      ></div>
                      <div
                        className="event"
                        date={dayjs(date).format("YYYY-MM-DD")}
                      >
                        {x.event}
                      </div>
                    </div>
                  );
                })
              );
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div className="mdot">{html}</div>
              </>
            );
          }}
        ></Calendar>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border: none;
    padding: 24px;
    @media only screen and (max-width: 839px) {
      padding: 0px;
    }
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__navigation button {
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
  }

  abbr[title] {
    text-decoration: none;
    font-size: 14px;
  }
  abbr {
    padding: 8px;
    border-radius: 12px;
    font-size: 16px;
  }

  .react-calendar__tile {
    width: 100%;
    height: 100%;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    @media only screen and (max-width: 839px) {
      margin: 0px;
    }
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: transparent;
    color: #000;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    & > abbr {
      background: #8c98f8;
      color: #fff;
      font-weight: 400;
    }
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
  }
  .mdot {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    overflow: auto;
  }
  .division {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    margin: 2px 0;
  }
  .dot {
    height: 14px;
    width: 4px;
    margin-right: 2px;
  }
  .event {
    width: 100%;
    height: 14px;
    overflow: auto;
  }
`;

export default HomeCalendar;