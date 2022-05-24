import React, { useEffect } from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { GetScheduleListModal } from "../../shared/modal/component/calendar";

const ScheduleCalendar = ({ familyId, list }) => {
  const [value, setValue] = React.useState(new Date());
  const [event, setEvent] = React.useState([]);
  const [schedule, setSchedule] = React.useState();
  const [modalOn, setModalOn] = React.useState(false);
  const [day, setDay] = React.useState("");

  console.log("list:", list);
  console.log("일정:", schedule);
  console.log("day,", day);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
    console.log("모달 온오프:", modalOn);
  };

  // 시작날짜와 마지막 날짜 받아서 배열 안에 모든 날짜 넣어주는 함수

  function getDatesStartToEnd(startDate, endDate) {
    let regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(startDate) && regex.test(endDate)))
      return "Not Date Format";
    let result = [];
    let curDate = new Date(startDate);

    while (curDate <= new Date(endDate)) {
      result.push({
        startDate1: curDate.toISOString().split("T")[0],
        endDate: endDate,
      });
      curDate.setDate(curDate.getDate() + 1);
    }

    console.log(result);
    const newEvent = list
      .filter((x, i) => {
        return x?.startDate !== x.endDate;
      })
      .filter(
        (x) =>
          x?.startDate === result[0]?.startDate1 &&
          x?.endDate === result[result.length - 1]?.endDate
      );
    console.log(newEvent);

    if (newEvent) {
      for (let i = 0; i < result.length; i++) {
        // result.push(...newEvent[i]);
        Object.assign(result[i], newEvent);
      }
    }
    console.log(result);
    // if (newEvent && newEvent.length > 1) {
    //   for (let i = 0; i < result.length; i++) {
    //     for (let x = 0; x < newEvent.length; x++) {
    //       Object.assign(result[i], newEvent[x]);
    //     }
    //   }
    // }

    return result;
  }

  let longEvents = [];
  if (list) {
    longEvents = list.filter((x) => x.startDate !== x.endDate);
  }
  console.log("longEvents, ", longEvents);

  let longList = [];

  longEvents.filter((x) =>
    longList.push(getDatesStartToEnd(x?.startDate, x?.endDate))
  );

  console.log("longList, ", longList);

  let newList = [];
  for (let i = 0; i < longList.length; i++) {
    newList.push(...longList[i]);
  }
  console.log(newList);

  return (
    <div>
      <Container>
        <Calendar
          onChange={setValue} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => dayjs(date).format("D")} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          next2Label={null}
          prev2Label={null}
          onClickDay={(value, event) => {
            let schedule = list.filter(
              (x) => x?.startDate === dayjs(value).format("YYYY-MM-DD")
            );
            // test();
            if (schedule.length !== 0) {
              handleModal();
              setDay(value);
              setEvent(event);
              setSchedule(schedule);
            }
          }}
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];

            let shortEvents = [];
            let newLongEvents = [];

            if (newList) {
              newLongEvents = newList?.filter(
                (x) => x?.startDate1 === dayjs(date).format("YYYY-MM-DD")
              );
            }

            if (list) {
              shortEvents = list.filter((x) =>
                x?.startDate === x?.endDate
                  ? x?.startDate === dayjs(date).format("YYYY-MM-DD")
                  : null
              );
            }
            if (newLongEvents.length >= 1 && shortEvents.length >= 1) {
              html.push(
                newLongEvents.map((x, i) => {
                  console.log(x);
                  return (
                    // <div className="long" key={i}>
                    <div className="division" key={`long1_${i}`}>
                      <div
                        className="range"
                        date={dayjs(date).format("YYYY-MM-DD")}
                        style={{
                          backgroundColor: x[0]?.color,
                          width: "100%",
                          color: "#fff",
                        }}
                      >
                        <span>{x[0].event}</span>
                      </div>
                    </div>
                    // </div>
                  );
                })
              );
            }
            if (newLongEvents.length === 1 && shortEvents.length === 0) {
              html.push(
                // newLongEvents
                // .map((x, i) => {
                //   console.log(newLongEvents);
                //   console.log(x);
                //   return (
                //     // <div className="long" key={i}>
                <div className="division">
                  <div
                    className="range"
                    date={dayjs(date).format("YYYY-MM-DD")}
                    style={{
                      backgroundColor: newLongEvents[0][0]?.color,
                      width: "100%",
                      color: "#fff",
                    }}
                  >
                    <span>{newLongEvents[0][0]?.event}</span>
                  </div>
                </div>
                // </div>
                //   );
                // })
              );
            }
            if (newLongEvents.length >= 2 && shortEvents.length === 0) {
              html.push(
                // newLongEvents
                // .map((x, i) => {
                //   console.log(newLongEvents);
                //   console.log(x);
                //   return (
                //     // <div className="long" key={i}>
                <div className="longDivision">
                  <div
                    className="range"
                    date={dayjs(date).format("YYYY-MM-DD")}
                    style={{
                      backgroundColor: newLongEvents[0][0]?.color,
                      width: "100%",
                      color: "#fff",
                    }}
                  >
                    <span>{newLongEvents[0][0]?.event}</span>
                  </div>
                  <p style={{ display: "block", marginTop: "10px" }}>
                    <span>{`+ ${newLongEvents.length - 1}개 더보기`}</span>
                  </p>
                </div>
                // </div>
                //   );
                // })
              );
            }

            if (newLongEvents.length === 0 && shortEvents.length === 1) {
              html.push(
                shortEvents.map((x, i) => {
                  return (
                    <div className="division" key={i}>
                      <div
                        className="dot"
                        date={dayjs(date).format("YYYY-MM-DD")}
                        style={{ backgroundColor: x.color }}
                      ></div>
                      <div
                        className="event"
                        date={dayjs(date).format("YYYY-MM-DD")}
                      >
                        <span>{x.event}</span>
                      </div>
                    </div>
                  );
                })
              );
            }

            if (newLongEvents.length !== 0 && shortEvents.length !== 0) {
              html.push(
                <div className="showList">
                  <span>
                    {`+ ${
                      newLongEvents.length + shortEvents.length - 1
                    }개 더보기`}
                  </span>
                </div>
              );
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div className="mdot">{html}</div>
                {/* {html} */}
              </>
            );
          }}
        ></Calendar>
        <ModalPortal>
          {modalOn && (
            <GetScheduleListModal
              onClose={handleModal}
              date={day}
              event={event}
              familyId={familyId}
              schedule={schedule}
            ></GetScheduleListModal>
          )}
        </ModalPortal>
      </Container>
    </div>
  );
};

const Container = styled.div`
  overflow: scroll;
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    color: #222;
    border: none;
    padding: 24px;
    border-radius: 20px;

    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      padding: 0px;
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      padding: 0px;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
  }

  .react-calendar__month-view__days {
    margin-top: 36px;
    @media screen and (max-width: 599px) {
      margin-top: 19px;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
  }

  .react-calendar__navigation {
    position: absolute;
    display: flex;
    top: 130px;
    left: 0px;
    font-weight: 600;
    font-size: 15px;
    @media only screen and (max-width: 1199px) {
      padding: 35px 0;
      top: 20px;
      left: unset;
      right: 0;
      height: 44px;
      margin-right: 20px;
    }
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      top: 16px;
      right: 0;
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      top: 26px;
      right: 0;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      top: 7px;
      margin-right: 0;
      /* width: 220px; */
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
  }

  .react-calendar__navigation button {
    color: #000;
    min-width: 90px;
    background: none;
    font-size: 24px;
    font-weight: 600;
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      min-width: 40px;
      font-size: 20px;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
      font-size: 20px;
      min-width: 30px;
    }
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
    font-size: 24px;
  }

  abbr[title] {
    text-decoration: none;
    font-size: 20px;
    color: #757575;
    font-weight: 400;
  }
  abbr {
    padding: 8px;
    border-radius: 12px;
    font-size: 16px;
  }

  .react-calendar__tile {
    width: 100%;
    height: 104px;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    padding: 0;
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      margin: 0px;
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      margin: 0px;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      height: 70px;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow: auto;
  }

  .showList {
    margin-top: 10px;

    @media screen and (max-width: 599px) {
      display: flex !important;
      margin: 10px auto 0;
      width: 8px;
      height: 8px;
      background-color: rgba(255, 220, 101, 1);
      border-radius: 50%;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
    span {
      @media screen and (max-width: 599px) {
        display: none;
      }
      // XXSmall (Mobile)
      @media screen and (max-width: 375px) {
      }
    }
  }
  /* .long {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow: auto;
  } */
  /* .short {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow: auto;
  } */

  .division {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 2px 0;
  }
  .longDivision {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 2px 0;
    p {
      @media screen and (max-width: 599px) {
        display: flex !important;
        margin: auto;
        width: 8px;
        height: 8px;
        background-color: rgba(255, 220, 101, 1);
        border-radius: 50%;
      }
      // XXSmall (Mobile)
      @media screen and (max-width: 375px) {
      }
      span {
        @media screen and (max-width: 599px) {
          display: none;
        }
        // XXSmall (Mobile)
        @media screen and (max-width: 375px) {
        }
      }
    }
  }
  .range {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 599px) {
      width: 100%;
      height: 5px;
      span {
        display: none;
      }
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
  }
  .dot {
    height: 14px;
    width: 4px;
    margin-right: 2px;
  }
  .event {
    display: flex;
    width: 100%;
    height: 14px;
    overflow: auto;
    align-items: flex-start;
    justify-content: flex-start;
    @media screen and (max-width: 1024px) {
      /* margin: 0px; */
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      /* margin: 0px; */
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      display: none;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
  }
`;

export default ScheduleCalendar;
