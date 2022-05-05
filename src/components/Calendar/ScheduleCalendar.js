import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../../redux/modules/calendar";
// 모달
import { ModalPortal } from "../../shared/modal/portals";
import GetScheduleModal from "../../shared/modal/component/calendar/GetScheduleModal";

const ScheduleCalendar = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.calendar.scheduleList);
  const [value, setValue] = React.useState(new Date());
  const [event, setEvent] = React.useState([]);
  const [modalOn, setModalOn] = React.useState(false);
  const [day, setDay] = React.useState("");

  console.log(event);

  // const search = list.map((x) => x.startDate == )

  const docs = document.getElementsByClassName("dot");
  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const reCheck = () => {
    if (docs.length > 0) {
      for (let i = 0; i < docs.length; i++) {
        const index = Array.from(docs).findIndex(
          (x) => x.getAttribute("date") == list[i]?.startDate
        );
        if (index != -1) {
          docs[index].style.backgroundColor = list[i]?.color;
          console.log(docs[index].childNodes);
        }
      }
    }
  };

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
          next2Label={null}
          prev2Label={null}
          onClickDay={(value, event) => {
            if (
              list.find((x) => x.startDate == dayjs(value).format("YYYY-MM-DD"))
            ) {
              handleModal();
              setDay(value);
              setEvent(event);
            }
          }}
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화

            const me = list.findIndex(
              (x) => x.startDate == dayjs(date).format("YYYY-MM-DD")
            );
            console.log(me);
            let html = [];
            // 현재 날짜가 post 작성한 날짜 배열(list)에 있다면, dot div 추가
            if (
              list.find((x) => x.startDate == dayjs(date).format("YYYY-MM-DD"))
            ) {
              html.push(
                <div
                  className="dot"
                  date={dayjs(date).format("YYYY-MM-DD")}
                ></div>
              );
              console.log("성공");
              reCheck();
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div className="mdot">{html}</div>
              </>
            );
          }}
        />
      </Container>
      <ModalPortal>
        {modalOn && (
          <GetScheduleModal
            onClose={handleModal}
            day={day}
            event={event}
          ></GetScheduleModal>
        )}
      </ModalPortal>
    </div>
  );
};

const Container = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    padding: 20% 3% 3%;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15),
      0px 0px 24px rgba(0, 0, 0, 0.05);
  }

  .react-calendar__navigation {
    position: absolute;
    display: flex;
    height: 30px;
    top: 216px;
    left: 336px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }

  .react-calendar__navigation button {
    color: #000;
    min-width: 44px;
    background: none;
    font-size: 24px;
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
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .mdot {
    display: block;
    justify-content: start;
    align-items: flex-start;
  }
  .dot {
    height: 14px;
    width: 4px;
    position: absolute;
  }
`;

export default ScheduleCalendar;
