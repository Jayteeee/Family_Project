import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { MdOutlineClear, MdCancel, MdDone } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";

// 리덕스
import { useDispatch } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Input, Button, Text } from "../../../../elements";
import { scheduleActions } from "../../../../redux/modules/calendar";

const AddScheduleModal = ({ onClose }, props) => {
  const dispatch = useDispatch();
  const [event, setEvent] = React.useState("");
  const [selec, setSelec] = React.useState(false);
  const [date, onChange] = React.useState([]);
  const [myPic, setMyPic] = React.useState("#CE5F5F");
  const [showOptions, setShowOptions] = React.useState(false);
  const [showBorder, setShowBorder] = React.useState(false);

  const handleAddSchedule = (e) => {
    const { value } = e.target;
    setEvent(value);
  };

  const addSchedule = () => {
    dispatch(scheduleActions.addScheduleDB(event, myPic, date));
  };

  const reset = () => {
    setEvent("");
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
            setShowBorder(false);
          }}
        >
          <ContentBox>
            <XButton>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <MdOutlineClear />
              </div>
            </XButton>
            <InnerBox>
              <TitleBox>
                <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
                  <Label>
                    <Preview value={myPic}></Preview>
                    <TiArrowSortedDown />
                  </Label>
                </SelectBox>
                <SelectOptions
                  show={showOptions}
                  onClick={() => {
                    setShowOptions((prev) => !prev);
                  }}
                >
                  <div>
                    <Color
                      value="#CE5F5F"
                      onClick={() => setMyPic("#CE5F5F")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#CE5F5F" />
                    </Color>
                    <Color
                      value="#EA7B46"
                      onClick={() => setMyPic("#EA7B46")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#EA7B46" />
                    </Color>
                    <Color
                      value="#F4CC4D"
                      onClick={() => setMyPic("#F4CC4D")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#F4CC4D" />
                    </Color>
                    <Color
                      value="#5FCE89"
                      onClick={() => setMyPic("#5FCE89")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#5FCE89" />
                    </Color>
                    <Color
                      value="#5FB3CE"
                      onClick={() => setMyPic("#5FB3CE")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#5FB3CE" />
                    </Color>
                    <Color
                      value="#8C98F8"
                      onClick={() => setMyPic("#8C98F8")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#8C98F8" />
                    </Color>
                    <Color
                      value="#C588F6"
                      onClick={() => setMyPic("#C588F6")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#C588F6" />
                    </Color>
                    <Color
                      value="#F688EB"
                      onClick={() => setMyPic("#F688EB")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#F688EB" />
                    </Color>
                    <Color
                      value="#C2C2C2"
                      onClick={() => setMyPic("#C2C2C2")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#C2C2C2" />
                    </Color>
                    <Color
                      value="#424242"
                      onClick={() => setMyPic("#424242")}
                      mypic={myPic}
                    >
                      <MdDone mypic={myPic} value="#424242" />
                    </Color>
                  </div>
                </SelectOptions>

                <InputBox
                  show={showBorder}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBorder(true);
                  }}
                >
                  <InsertBox>
                    <Text B2>제목</Text>
                    <Input
                      id="changeName"
                      size="18px"
                      onChange={handleAddSchedule}
                      value={event}
                      style={{
                        border: "none",
                      }}
                    />
                  </InsertBox>
                  <ResetBox
                    show={showBorder}
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                  >
                    <MdCancel />
                  </ResetBox>
                </InputBox>
              </TitleBox>
              <CommonBox>
                <Box
                  onClick={(e) => {
                    setSelec(!selec);
                  }}
                >
                  <Text B2 style={{ marginBottom: "6px" }}>
                    시작일{" "}
                  </Text>
                  <Text S15>
                    {dayjs(date[0]).locale("ko").format(`MM월DD일 dddd`)}
                  </Text>
                </Box>
                <p style={{ margin: "20px 16px", fontSize: "24px" }}>-</p>
                <Box>
                  <Text B2 style={{ marginBottom: "6px" }}>
                    종료일{" "}
                  </Text>
                  <Text S15>
                    {dayjs(date[1]).locale("ko").format(`MM월DD일 dddd`)}
                  </Text>
                </Box>
              </CommonBox>
              {selec ? (
                <CalendarBox>
                  <Calendar
                    showNeighboringMonth={false}
                    formatDay={(locale, date) => dayjs(date).format("DD")}
                    selectRange={true}
                    returnValue="range"
                    onChange={onChange}
                  ></Calendar>
                </CalendarBox>
              ) : null}
            </InnerBox>
            <ButtonBox>
              <Text
                BL
                style={{
                  minWidth: "96px",
                  height: "56px",
                  width: "96px",
                  backgroundColor: "#8C98F8",
                  color: "white",
                  margin: "40px 0 0 0",
                  borderRadius: "8px",
                  alignText: "center",
                  padding: "16px 32px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  addSchedule();
                }}
              >
                저장
              </Text>
            </ButtonBox>
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
    color: #222;
    padding: 3%;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15),
      0px 0px 40px rgba(0, 0, 0, 0.25);
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
const SelectBox = styled.div`
  width: 80px;
  height: 100%;
  padding: 24px 12px;
  margin: auto 24px auto 0px;
  align-items: center;
  cursor: pointer;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const Label = styled.div`
  display: flex;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SelectOptions = styled.ul`
  position: fixed;
  list-style: none;
  text-align: left;
  overflow: hidden;
  width: 80px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 40px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 12px;
  }
`;

const Preview = styled.div`
  width: 100%;
  margin-right: 8px;
  border-radius: 4px;
  height: 24px;
  ${({ value }) =>
    value ? `background-color: ${value};` : "background-color: gray;"}
  cursor: pointer;
`;

const Color = styled.li`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  list-style: none;
  ${({ value }) =>
    value ? `background-color: ${value};` : "background-color: gray;"}
  margin: 5px 10px 5px 0;
  cursor: pointer;
  & > svg {
    color: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    ${({ mypic, value }) => (mypic === value ? null : `display: none;`)}
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  z-index: 205;
  max-width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 24px;
  position: relative;
  overflow: scroll;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  border: ${({ show }) => (show ? `2px solid #8c98f8` : `2px solid #E5E5E5`)};
  border-radius: 8px;
`;

const InsertBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  & > input:focus {
    box-shadow: none;
  }
  & > input:focus-visible {
    outline: none;
  }
`;

const ResetBox = styled.div`
  width: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    display: ${({ show }) => (show ? null : "none")};
    width: 100%;
    height: 100%;
    color: #757575;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const XButton = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: end;
  cursor: pointer;
  svg {
    width: 100%;
    height: 40%;
  }
`;

const InnerBox = styled.div`
  padding: 0 40px;
  @media only screen and (max-width: 839px) {
    padding: 0;
  }
`;

const CommonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  border: 1px solid gray;
  border: none;
  border-radius: 8px;
`;

const CalendarBox = styled.div`
  position: fixed;
  margin: 16px 8px;
`;

const TitleBox = styled.div`
  display: flex;
  margin: 14px 0px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
`;
export default AddScheduleModal;
