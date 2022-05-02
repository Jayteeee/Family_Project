import React from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import { DummyData } from "../../shared/DummyData";

const PhotoCalendar = () => {
  const [value, setValue] = React.useState(new Date());
  const [mark, setMark] = React.useState([
    { key: value },
    { createdAt: "2022-11-11" },
  ]);
  const [style, setStyle] = React.useState("");
  const list = DummyData.photoCalendarPage.photoCalendarList;

  const docs = document.getElementsByClassName("highlight");

  for (let i = 0; i < docs.length; i++) {
    if (style !== "") {
      docs[i].style.backgroundImage = `url(${list[i].photoFile})`;
    }
  }

  // let { url = "afefa", color = "red" } = props;

  // console.log(props);

  // url =
  //   "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg";

  // color = "red";

  React.useEffect(() => {
    setMark(list);
  }, []);

  return (
    <div>
      <Container>
        <Calendar
          calendarType="US"
          onChange={setValue}
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          navigationLabel={null}
          formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="mx-auto w-full text-sm border-b"
          tileClassName={({ date, view }) => {
            if (
              mark.find(
                (x) => x.createdAt === moment(date).format("YYYY-MM-DD")
              )
            ) {
              setStyle(true);
              return "highlight";
              // html.push(<div className="dot"></div>);
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            // return (
            //   <>
            //     <div className="flex justify-center items-center absoluteDiv">
            //       {html}
            //     </div>
            //   </>
            // );
          }}
        />
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 40vw;
  max-width: 90%;
  height: 60vh;
  margin: 30px auto;

  .react-calendar {
    width: 100%;
    max-width: 100%;
    height: 100%;
    padding: 3%;
    background-color: transparent;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5em;
  }
  abbr[title] {
    text-decoration: none;
    font-size: 14px;
  }
  abbr {
    font-size: 16px;
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
  .react-calendar__tile {
    max-width: 100%;
    width: 5em;
    height: 5em;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
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
  .highlight {
    border-radius: 50px;
  }
`;

export default PhotoCalendar;
