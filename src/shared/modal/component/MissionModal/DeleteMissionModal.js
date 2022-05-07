import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch } from "react-redux";
import { missionActions } from "../../../../redux/modules/mission";

const DeleteMissionModal = ({
  onClose,
  modalPosition,
  familyId,
  missionId,
}) => {
  const dispatch = useDispatch();
  // 미션 삭제 함수
  const deleteMission = () => {
    dispatch(missionActions.deleteMissionDB(familyId, missionId));
  };

  console.log(modalPosition[0]);

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
            deleteMission();
          }}
          X={modalPosition[0]}
          Y={modalPosition[1]}
        >
          삭제하기
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
  height: 30px;
  width: 30px;
  text-align: center;
  background-color: transparent;
  position: absolute;
  ${({ X }) => ` top: ${X}px`};
  ${({ Y }) => `left: ${Y}px`};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  z-index: 205;
  width: 108px;
  height: 49px;
  border-radius: 4px;
  border: none;
  background-color: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 10px rgba(0, 0, 0, 0.25);
  font-size: 16px;
`;

export default DeleteMissionModal;
