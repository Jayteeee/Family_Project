import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import GetPhotoModal from "../../shared/modal/component/calendar/GetPhotoModal";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../redux/modules/calendar";
import { ViewDaySharp } from "@material-ui/icons";

const PhotoCalendar = (props) => {
  const familyId = props.familyId;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(new Date());
  const [style, setStyle] = React.useState("");
  const [modalOn, setModalOn] = React.useState(false);
  const [day, setDay] = React.useState("");
  const list = useSelector((state) => state.calendar.photoCalendar);

  const docs = document.getElementsByClassName("highlight");
  console.log(docs);

  const thisMonth = document.getElementsByClassName(
    "react-calendar__navigation__label__labelText"
  )[0]?.childNodes[0]?.data;

  const arr = { thisMonth };

  const YYYY = Object.values(arr)[0]?.split(" ")[0]?.split("년")[0];
  const MM = Object.values(arr)[0]?.split(" ")[1]?.split("월")[0];
  const date = `${MM < 10 ? `${YYYY}-0${MM}` : `${YYYY}-${MM}`}`;

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  for (let i = 0; i < docs.length; i++) {
    if (style !== "") {
      docs[i].firstChild.style.backgroundImage = `url(${list[i]?.photoFile})`;
    }
  }

  React.useEffect(() => {
    dispatch(scheduleActions.getPhotoCalendarDB(familyId, date));
  }, [thisMonth]);

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
          formatDay={(locale, date) => dayjs(date).format("D")} // 날'일' 제외하고 숫자만 보이도록 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          onClickDay={(value, event) => {
            // const PList = ""
            // list?
            // {PList = list.filter((x) => dayjs(x.createdAt).format("YYYY-MM-DD") ===
            // dayjs(value).format("YYYY-MM-DD"))}: null
            if (
              list.find(
                (x) =>
                  dayjs(x.createdAt).format("YYYY-MM-DD") ===
                  dayjs(value).format("YYYY-MM-DD")
              )
            ) {
              handleModal();
              setDay(value);
            }
          }}
          tileClassName={({ date, view }) => {
            if (
              list.find(
                (x) =>
                  dayjs(x.createdAt).format("YYYY-MM-DD") ===
                  dayjs(date).format("YYYY-MM-DD")
              )
            ) {
              setStyle(true);
              return "highlight";
            }
          }}
        />
      </Container>
      <ModalPortal>
        {modalOn && (
          <GetPhotoModal
            onClose={handleModal}
            date={day}
            familyId={familyId}
          ></GetPhotoModal>
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
    border: none;
    padding: 24px;
    border-radius: 20px;
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      padding: 0px;
    }
    @media only screen and (max-width: 839px) {
      padding: 0px;
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
      top: 40px;
      left: unset;
      right: 0;
      height: 44px;
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
      top: 5px;
      margin-right: 0;
      /* width: 220px; */
    }
    // XXSmall (Mobile)
    @media screen and (max-width: 375px) {
      top: 4px;
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
    box-sizing: border-box;
    width: 100%;
    height: 104px;
    background: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0;
    @media only screen and (max-width: 1199px) {
    }
    // Medium (Tablet)
    @media screen and (max-width: 1024px) {
      /* align-items: flex-start; */
    }
    @media only screen and (max-width: 839px) {
      /* align-items: flex-start; */
    }
    // XSmall (Mobile)
    @media screen and (max-width: 599px) {
      height: 70px;
    }
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: transparent;
    color: #000;
    background-size: cover;
    background-position: center;
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
  .highlight {
    abbr {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 24px;
      color: #fff;
      background-size: cover;
      background-position: center;
      width: 80%;
      height: 80%;
      @media only screen and (max-width: 1199px) {
      }
      // Medium (Tablet)
      @media screen and (max-width: 1024px) {
        border-radius: 8px;
      }
      @media only screen and (max-width: 839px) {
        border-radius: 8px;
      }
      // XSmall (Mobile)
      @media screen and (max-width: 599px) {
        height: 48px;
      }
    }
  }
`;

export default PhotoCalendar;
