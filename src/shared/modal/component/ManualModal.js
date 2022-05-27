import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 모달
import { ModalPortal } from "../portals";

// 엘리먼트
import { Text } from "../../../elements";

// 컴포넌트
import ManualSlider from "../../../components/Home/ManualSlider";

const ManualModal = (props) => {
  const { onClose, content } = props;

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
          <ManualSlider />
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
  justify-content: center;
  z-index: 205;
  max-height: 1000px;
  max-width: 1000px;
  height: 80%;
  width: 100%;
  border-radius: 2%;
  position: relative;
  overflow: scroll;
  background-color: transparent;
  @media only screen and (max-width: 839px) {
    width: 80%;
    height: 70%;
  }
`;

export default ManualModal;
