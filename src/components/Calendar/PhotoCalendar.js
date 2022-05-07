import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";
import { DummyData } from "../../shared/DummyData";
// 모달
import { ModalPortal } from "../../shared/modal/portals";
import GetPhotoModal from "../../shared/modal/component/calendar/GetPhotoModal";

const PhotoCalendar = () => {
  const [value, setValue] = React.useState(new Date());
  const [mark, setMark] = React.useState([
    { key: value },
    { createdAt: "2022-11-11" },
  ]);
  const [style, setStyle] = React.useState("");
  const [modalOn, setModalOn] = React.useState(false);
  const [day, setDay] = React.useState("");
  const list = DummyData.photoCalendarPage.photoCalendarList;

  const docs = document.getElementsByClassName("highlight");

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  for (let i = 0; i < docs.length; i++) {
    if (style !== "") {
      docs[i].style.backgroundImage = `url(${list[i].photoFile})`;
    }
  }

  React.useEffect(() => {
    setMark(list);
  }, []);

  return (
    <div>
      <Container>
        <Calendar
          onChange={setValue}
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => dayjs(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="mx-auto w-full text-sm border-b"
          onClickDay={(value, event) => {
            if (
              mark.find((x) => x.createdAt == dayjs(value).format("YYYY-MM-DD"))
            ) {
              handleModal();
              setDay(value);
            }
          }}
          tileClassName={({ date, view }) => {
            if (
              mark.find((x) => x.createdAt === dayjs(date).format("YYYY-MM-DD"))
            ) {
              setStyle(true);
              return "highlight";
            }
          }}
        />
      </Container>
      <ModalPortal>
        {modalOn && (
          <GetPhotoModal onClose={handleModal} day={day}></GetPhotoModal>
        )}
      </ModalPortal>
    </div>
  );
};

const Container = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 100%;
    padding: 20% 3% 3%;
    background-color: #fff;
    color: #222;
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
    align-items: center;
    justify-content: center;
    color: black;
    border-radius: 24px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
  }
  .react-calendar__tile--now {
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
  }
  .highlight {
    border-radius: 24px;
    color: #fff;
  }
`;

export default PhotoCalendar;
