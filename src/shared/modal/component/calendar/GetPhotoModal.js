import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Input, Button } from "../../../../elements";
import PhotoSlider from "../../../../components/Calendar/PhotoSlider";

const GetPhotoModal = ({ onClose, day }) => {
  const dispatch = useDispatch();
  const [normal, setNormal] = React.useState(false);

  const list = useSelector((state) => state.calendar.scheduleList);

  const theDay = list.find((x) => x.startDate == day);
  console.log(theDay);

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
          <PhotoSlider day={theDay} />

          <ButtonBox>
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
  padding: 20px 0px;

  position: relative;
  overflow: scroll;
`;

const ButtonBox = styled.div`
  display: flex;
  padding: 0 5rem;
`;

export default GetPhotoModal;
