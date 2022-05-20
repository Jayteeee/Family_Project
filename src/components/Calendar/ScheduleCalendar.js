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
      result.push({ startDate1: curDate.toISOString().split("T")[0] });
      curDate.setDate(curDate.getDate() + 1);
    }

    const newEvent = list
      .filter((x, i) => {
        return x.startDate !== x.endDate;
      })
      .find((x) => x.startDate === result[0].startDate1);

    if (newEvent) {
      for (let i = 0; i < result.length; i++) {
        Object.assign(result[i], newEvent);
      }
    }

    return result;
  }

  let longEvents = [];
  if (list) {
    longEvents = list.filter((x) => x.startDate !== x.endDate);
  }
  console.log(longEvents);

  let longList = [];

  longEvents.filter((x) =>
    longList.push(getDatesStartToEnd(x.startDate, x.endDate))
  );
  console.log(longList);

  // function merge(...arr) {
  //   return arr.reduce((acc, val) => {
  //     return { ...acc, ...val };
  //   }, {});
  // }

  const newnewList = longList[0]?.concat(longList[1]);
  console.log(newnewList);

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
          next2Label={null}
          prev2Label={null}
          onClickDay={(value, event) => {
            let schedule = list.filter(
              (x) => x.startDate === dayjs(value).format("YYYY-MM-DD")
            );
            // test();
            if (schedule.length !== 0) {
              handleModal();
              setDay(value);
              setEvent(event);
              setSchedule(schedule);
            }

            // if (
            //   list.find((x) => x.startDate == dayjs(value).format("YYYY-MM-DD"))
            // ) {
            //   handleModal();
            //   setDay(value);
            //   setEvent(event);
            // }
          }}
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];

            let shortEvents = [];
            let newLongEvents = [];

            if (list) {
              newLongEvents = newnewList?.filter(
                (x) => x.startDate1 === dayjs(date).format("YYYY-MM-DD")
              );
            }

            if (list) {
              shortEvents = list.filter((x) =>
                x.startDate === x.endDate
                  ? x.startDate === dayjs(date).format("YYYY-MM-DD")
                  : null
              );
            }

            if (longList.length !== 0) {
              html.push(
                newLongEvents.map((x, i) => {
                  return (
                    <div className="long" key={i}>
                      <div className="division">
                        <div
                          className="range"
                          date={dayjs(date).format("YYYY-MM-DD")}
                          style={{
                            backgroundColor: x.color,
                            width: "100%",
                            color: "#fff",
                          }}
                        >
                          {x.event}
                        </div>
                      </div>
                    </div>
                  );
                })
              );
            }

            if (shortEvents.length !== 0) {
              html.push(
                shortEvents.map((x, i) => {
                  return (
                    <div className="short" key={i}>
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
                    </div>
                  );
                })
              );
            }

            // if (events.length !== 0) {
            //   html.push(
            //     events.map((x, i) => {
            //       return x.startDate === x.endDate ? (
            //         <div className="division" key={i}>
            //           <div
            //             className="dot"
            //             date={dayjs(date).format("YYYY-MM-DD")}
            //             style={{ backgroundColor: x.color }}
            //           ></div>
            //           <div
            //             className="event"
            //             date={dayjs(date).format("YYYY-MM-DD")}
            //           >
            //             {x.event}
            //           </div>
            //         </div>
            //       ) : (
            //         <div className="division">
            //           <div
            //             className="range"
            //             date={dayjs(date).format("YYYY-MM-DD")}
            //             style={{
            //               backgroundColor: x.color,
            //               width: "100%",
            //               color: "#fff",
            //             }}
            //           >
            //             {x.event}
            //           </div>
            //         </div>
            //       );
            //     })
            //   );
            // }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                {/* <div className="mdot">{html}</div> */}
                {html}
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
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
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

  .react-calendar__navigation {
    position: absolute;
    display: flex;
    top: 120px;
    left: 25px;
    font-weight: 600;
    font-size: 15px;
    @media only screen and (max-width: 1199px) {
      padding: 35px 0;
      top: 40px;
      left: unset;
      right: 0;
      height: 44px;
      width: 207px;
      margin-right: 20px;
    }
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      top: 20px;
      right: 0;
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      top: 20px;
      right: 0;
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      top: 0px;
      margin-right: 0;
      width: 220px;
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
      top: 4px;
    }
  }

  .react-calendar__navigation button {
    color: #000;
    min-width: 44px;
    background: none;
    font-size: 24px;
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
      font-size: 20px;
    }
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
    font-size: 24px;
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
  .long {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow: auto;
  }
  .short {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    overflow: auto;
    @media screen and (max-width: 1024px) {
      /* margin: 0px; */
    }
    // Small (Tablet)
    @media only screen and (max-width: 839px) {
      /* margin: 0px; */
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      /* display: flex; */
      /* flex-direction: row; */
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
    }
  }
  .division {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 2px 0;
  }
  .range {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
