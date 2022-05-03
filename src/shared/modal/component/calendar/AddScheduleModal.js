import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";
import "dayjs/locale/ko";

// 리덕스
import { useDispatch } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Input, Button } from "../../../../elements";
import { scheduleActions } from "../../../../redux/modules/calendar";

const AddScheduleModal = ({ onClose }, props) => {
  const dispatch = useDispatch();

  const [event, setEvent] = React.useState("");
  const [selec, setSelec] = React.useState(false);
  const [oneDay, setOneDay] = React.useState(false);
  const [date, onChange] = React.useState([]);
  const [myPic, setMyPic] = React.useState("gray");

  const handleAddSchedule = (e) => {
    const { value } = e.target;
    setEvent(value);
  };

  const addSchedule = () => {
    dispatch(scheduleActions.addScheduleDB(event, myPic, date));
  };

  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ContentBox>
            <div>
              <Box>
                <label htmlFor="changeName">일정 추가하기</label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                >
                  ✖
                </div>
              </Box>

              <Input
                id="changeName"
                placeholder="제목 추가"
                size="18px"
                padding="0 36px 0 36px"
                onChange={handleAddSchedule}
                value={event}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                }}
              />
              <CommonBox>
                <Box>
                  <span>당일</span>
                  <Select oneDay={oneDay}>
                    <Option
                      value={!oneDay}
                      onClick={() => {
                        setOneDay(false);
                      }}
                    >
                      <p></p>
                    </Option>
                    <Option
                      value={oneDay}
                      onClick={() => {
                        setOneDay(true);
                      }}
                    >
                      <p></p>
                    </Option>
                  </Select>
                </Box>
                <Box>
                  <div>
                    <span>시작일 </span>
                    <span>
                      {dayjs(date[0]).locale("ko").format(`MM월DD일 dddd`)}
                    </span>
                  </div>
                  <span
                    onClick={() => {
                      setSelec(!selec);
                    }}
                  >
                    📅
                  </span>
                </Box>
                <Box>
                  <div>
                    <span>종료일 </span>
                    <span>
                      {dayjs(date[1]).locale("ko").format(`MM월DD일 dddd`)}
                    </span>
                  </div>
                  <span
                    onClick={() => {
                      setSelec(!selec);
                    }}
                  >
                    📅
                  </span>
                </Box>
              </CommonBox>
              {selec ? (
                <Calendar
                  showNeighboringMonth={false}
                  formatDay={(locale, date) => dayjs(date).format("DD")}
                  selectRange={oneDay ? false : true}
                  returnValue="range"
                  onChange={onChange}
                ></Calendar>
              ) : null}

              <CommonBox>
                <Up>
                  <Color
                    value="red"
                    onClick={() => setMyPic("red")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="orange"
                    onClick={() => setMyPic("orange")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="yellow"
                    onClick={() => setMyPic("yellow")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="green"
                    onClick={() => setMyPic("green")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="blue"
                    onClick={() => setMyPic("blue")}
                    mypic={myPic}
                  ></Color>
                </Up>
                <Down>
                  <Color
                    value="darkblue"
                    onClick={() => setMyPic("darkblue")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="purple"
                    onClick={() => setMyPic("purple")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="black"
                    onClick={() => setMyPic("black")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="brown"
                    onClick={() => setMyPic("brown")}
                    mypic={myPic}
                  ></Color>
                  <Color
                    value="gray"
                    onClick={() => setMyPic("gray")}
                    mypic={myPic}
                  ></Color>
                </Down>
              </CommonBox>
            </div>

            <Button
              style={{ minWidth: "80px" }}
              height="36px"
              fontSize="15px"
              bg="black"
              color="white"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
                addSchedule();
              }}
            >
              추가하기
            </Button>
          </ContentBox>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  .react-calendar {
    background-color: transparent;
    color: #222;
    padding: 3%;
    border: none;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5em;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }

  .react-calendar__tile {
    max-width: 80%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #6f48eb33;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
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
  .react-calendar__tile--active {
    background: #6f48eb33;
    color: #6f48eb;
    font-weight: bold;
  }
`;

const Select = styled.div`
  width: 2em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  background-color: gray;
  border-radius: 20px;
  ${({ oneDay }) =>
    oneDay ? `background-color:gray` : `background-color:#bebaba`};
`;

const Option = styled.div`
  border-radius: 20px;
  padding: 5px;
  margin: 1px;
  cursor: pointer;
  ${({ value }) =>
    value ? "background-color: white;" : "background-color: transparent;"};
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  z-index: 205;
  width: 420px;
  max-width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 40px 0px;

  position: relative;
  overflow: scroll;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
`;

const CommonBox = styled.div`
  border: 1px solid gray;
  margin: 1em auto;
  padding: 0.5em;
  border: none;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const Up = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em auto;
`;
const Down = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em auto;
`;
const Color = styled.div`
  width: 2em;
  height: 2em;
  ${({ value }) =>
    value ? `background-color: ${value};` : "background-color: gray;"}
  margin: auto;
  cursor: pointer;
  ${({ mypic, value }) =>
    mypic === value
      ? `border: 2px solid black ;`
      : `border: 2px solid transparent;`}
`;

export default AddScheduleModal;
