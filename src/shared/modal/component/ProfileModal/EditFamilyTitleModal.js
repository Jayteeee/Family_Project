import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Text } from "../../../../elements";

const EditFamilyTitleModal = (props) => {
  const { onClose } = props;

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
            onClose();
          }}
          id="EditFamilyTitle"
        >
          <EditFamilyTitleBox>
            <Text>가족타이틀이 수정되었습니다.</Text>
          </EditFamilyTitleBox>
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
  height: 280px;
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

const EditFamilyTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EditFamilyTitleModal;
