import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Text, Button } from "../../../../elements";

const ScheduleAlertModal = (props) => {
  const { onClose } = props;

  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          //   onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
            // onClose();
          }}
          id="EditFamilyTitle"
        >
          <EditScheduleBox>
            <Text className="alertText">
              일정제목은 1-8자,숫자,영어,한글만 가능하며 특수문자는
              불가능합니다.
            </Text>
          </EditScheduleBox>
          <Button
            L
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            hover="#3245F5"
            color="#fff"
            borderRadius="12px"
            margin="24px 0 0 0"
            className="addMemberAlertBtn"
          >
            확인
          </Button>
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
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 205;
  min-height: 160px;
  max-width: 320px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 16px 24px;

  position: relative;
  overflow: scroll;
  margin: 24px;
  .addMemberAlertBtn {
    background: #6371f7;
    border: none;
    width: 100px;
    height: 50px;
    :hover {
      background: #3245f5;
    }
  }
`;

const EditScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  .alertText {
    word-break: keep-all;
  }
`;

export default ScheduleAlertModal;
