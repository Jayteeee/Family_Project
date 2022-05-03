import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useSelector } from "react-redux";

// 리덕스
import { useDispatch } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";
import EditScheduleModal from "./EditScheduleModal";

// 엘리먼트
import { Input, Button } from "../../../../elements";

const GetScheduleModal = ({ onClose, day }) => {
  const dispatch = useDispatch();
  const [normal, setNormal] = React.useState(false);

  const list = useSelector((state) => state.calendar.scheduleList);
  const theDay = list.find((x) => x.startDate == day);

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
          <CheckBox none={normal}>
            <SBox>
              <Stitle>
                <ColorBox color={theDay.color}></ColorBox>
                <Title>{theDay.event}</Title>
              </Stitle>
              <Sday>
                <p>{`${dayjs(theDay.startDate)
                  .locale("ko")
                  .format(`MM월 DD일 dddd`)} - ${dayjs(theDay.endDate)
                  .locale("ko")
                  .format(`MM월 DD일 dddd`)}`}</p>
              </Sday>
            </SBox>
            <ButtonBox>
              <Button
                style={{ minWidth: "80px" }}
                height="36px"
                fontSize="15px"
                bg="white"
                color="black"
                margin="0.3rem"
                onClick={(e) => {
                  e.stopPropagation();
                  setNormal(true);
                }}
              >
                수정/삭제
              </Button>
              <Button
                style={{ minWidth: "80px" }}
                height="36px"
                fontSize="15px"
                bg="black"
                color="white"
                margin="0.3rem"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                확인
              </Button>
            </ButtonBox>
          </CheckBox>
          <CheckBox none={!normal}>
            <EditScheduleModal onClose={onClose} day={theDay} />
          </CheckBox>
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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

const CheckBox = styled.div`
  ${(props) => (props.none ? `display: none` : null)}
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
`;

const Sday = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 4.5rem;
`;

const ColorBox = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const Title = styled.div`
  margin-left: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  padding: 2rem 5rem 0;
`;

export default GetScheduleModal;
