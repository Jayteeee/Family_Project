import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../../../redux/modules/calendar";

// 모달
import { ModalPortal } from "../../portals";
import { GetScheduleModal, EditScheduleModal } from "./index";

// 엘리먼트
import { Text, Button, CircleImage } from "../../../../elements";

const GetScheduleListModal = ({ onClose, date, event, familyId, schedule }) => {
  const dispatch = useDispatch();
  const [modalOn, setModalOn] = React.useState(false);
  const [eventId, setEventId] = React.useState();

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const handleList = (x) => {
    dispatch(
      scheduleActions.getOneScheduleDB(
        dayjs(x.date).format("YYYY-MM-DD"),
        familyId,
        x.eventId
      )
    );
    setTimeout(() => {
      handleModal();
    }, 50);
  };

  return (
    <ModalPortal>
      <Background
        // none={normal}
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
          {schedule.map((x) => {
            return (
              <SBox
                key={`${x.eventId}++`}
                onClick={() => {
                  setEventId(x.eventId);
                  // handleModal();
                  handleList(x);
                }}
              >
                <Stitle>
                  <ColorBox color={x.color}></ColorBox>
                  <Text S1 style={{ marginLeft: "1rem" }}>
                    {x.event}
                  </Text>
                </Stitle>
              </SBox>
            );
          })}
        </Content>
      </Background>
      {modalOn && (
        <GetScheduleModal
          onClose={handleModal}
          date={date}
          event={event}
          familyId={familyId}
          eventId={eventId}
        ></GetScheduleModal>
      )}
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 40px rgba(0, 0, 0, 0.25);

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
  z-index: 207;
  max-width: 100%;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  overflow: scroll;
  padding: 12px;
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  cursor: pointer;
`;

const Stitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ColorBox = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

export default GetScheduleListModal;
