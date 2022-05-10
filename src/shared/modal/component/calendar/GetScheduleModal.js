import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import {
  MdOutlineClear,
  MdOutlineCreate,
  MdDeleteOutline,
} from "react-icons/md";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../../../redux/modules/calendar";

// 모달
import { ModalPortal } from "../../portals";
import EditScheduleModal from "./EditScheduleModal";

// 엘리먼트
import { Text, Button, CircleImage } from "../../../../elements";

const GetScheduleModal = ({ onClose, day, event, familyId }) => {
  const dispatch = useDispatch();
  const [normal, setNormal] = React.useState(false);

  const list = useSelector((state) => state.calendar.scheduleOneList);

  const deleteSchedule = () => {
    dispatch(scheduleActions.deleteScheduleDB(list.eventId));
  };

  React.useEffect(() => {
    dispatch(
      scheduleActions.getOneScheduleDB(
        dayjs(day).format("YYYY-MM-DD"),
        familyId
      )
    );
  }, []);

  return (
    <ModalPortal>
      <Background
        none={normal}
        positionSet={event}
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
          <CheckBox none={normal}>
            <ButtonBox>
              <Buttons
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSchedule();
                }}
              >
                <MdDeleteOutline />
              </Buttons>
              <Buttons
                onClick={(e) => {
                  e.stopPropagation();
                  setNormal(true);
                }}
              >
                <MdOutlineCreate />
              </Buttons>
              <Buttons
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <MdOutlineClear />
              </Buttons>
            </ButtonBox>
            <SBox>
              <Stitle>
                <ColorBox color={list.color}></ColorBox>
                <Text S1 style={{ marginLeft: "1rem" }}>
                  {list.event}
                </Text>
              </Stitle>
              <Sday>
                <Text B1>{`${dayjs(list.startDate)
                  .locale("ko")
                  .format(`MM월 DD일, dddd`)} - ${dayjs(list.endDate)
                  .locale("ko")
                  .format(`MM월 DD일, dddd`)}`}</Text>
              </Sday>
              <SUser>
                <CircleImage
                  XS
                  src={list.profileImg}
                  margin="0px 8px 0px 0px"
                  alt="profileImage"
                ></CircleImage>
                <Text B3>{`${list.familyMemberNickname}`}</Text>
              </SUser>
            </SBox>
          </CheckBox>
          <CheckBox none={!normal}>
            <EditScheduleModal
              onClose={onClose}
              day={list.startDate}
              eventId={list.eventId}
            />
          </CheckBox>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 206;
  position: ${(props) => (props.none ? "fixed" : "absolute")};
  left: ${(props) =>
    props.none
      ? 0
      : `${
          props.positionSet.target.offsetLeft +
          props.positionSet.target.offsetWidth
        }px`};
  top: ${(props) =>
    props.none
      ? 0
      : `${
          props.positionSet.target.offsetTop +
          props.positionSet.target.offsetHeight
        }px`};
  width: ${(props) => (props.none ? `100%` : null)};
  height: ${(props) => (props.none ? `100%` : null)};
  text-align: center;
  background-color: ${(props) => (props.none ? `rgba(0, 0, 0, 0.5)` : null)};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 40px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => (props.none ? null : "20%")};
  @media only screen and (max-width: 839px) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 205;
  max-width: 100%;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`;

const CheckBox = styled.div`
  ${(props) => (props.none ? `display: none` : null)}
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  margin-top: 16px;
`;

const Stitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 24px;
`;

const Sday = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 66px;
`;

const SUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 66px;
`;

const ColorBox = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Buttons = styled.div`
  width: 24px;
  height: 24px;
  margin: 16px 12px;
  font-size: 18px;
  cursor: pointer;
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export default GetScheduleModal;
