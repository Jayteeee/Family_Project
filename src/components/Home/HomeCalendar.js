import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";

// 리덕스
import { history } from "../../redux/configureStore";

const HomeCalendar = ({ thisMonthEventList, familyId }) => {
  const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <Container>
        <div>
          <Calendar
            className="homeCalendar"
            onChange={setValue} // useState로 포커스 변경 시 현재 날짜 받아오기
            formatDay={(locale, date) => dayjs(date).format("D")} // 날'일' 제외하고 숫자만 보이도록 설정
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
              // console.log(events);
              if (events.length !== 0) {
                html.push(
                  events.map((x) => {
                    return (
                      <div
                        className="dot"
                        date={dayjs(date).format("YYYY-MM-DD")}
                        style={{ backgroundColor: x.color }}
                        key={x.eventId}
                      ></div>
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
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 100%;
  .homeCalendar {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border: none;
    padding: 12px 40px;
    overflow-y: scroll;
    border-radius: 16px;
    border: 1px solid #dbdbdb;

    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      padding: 24px 24px 12px 24px;
      height: 100%;
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      padding: 24px 24px 12px 24px;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      height: 100%;
      padding: 20px 10px;
      abbr {
        padding: 4px;
      }
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
      padding: 10px 10px;
      abbr {
        padding: 4px;
      }
    }
  }
  .react-calendar {
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
    color: #757575;
  }
  abbr {
    padding: 8px;
    border-radius: 12px;
    font-size: 14px;
  }

  .react-calendar__tile {
    width: 100%;
    height: 60px;

    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;

    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      margin: 0px;
      height: 75px;
    }
    @media only screen and (max-width: 839px) {
      margin: 0px;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      height: 55px;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
      height: 45px;
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
      background: #6371f7;
      color: #fff;
      font-weight: 400;
    }
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
  }
  .mdot {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  .dot {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10px;
    width: 10px;
    top: 3px;
    border-radius: 50%;
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      /* margin: 0px;
      height: 60px; */
    }
    @media only screen and (max-width: 839px) {
      height: 6px;
      width: 6px;
    }
  }
`;

export default HomeCalendar;
