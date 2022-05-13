import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../../../../redux/modules/family";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, Text } from "../../../../elements";

const DeleteFamilyModal = ({ onClose, familyList }) => {
  const dispatch = useDispatch();

  const { familyId } = useContext(MainContext)[0];

  const family = useContext(MainContext);

  console.log(family);

  console.log(familyId);

  const otherFamilyId = familyList.find(
    (f) => f.familyId !== familyId
  ).familyId;

  console.log("다른 패밀리아이디:", otherFamilyId);

  const deleteFamily = () => {
    dispatch(familyActions.deleteFamilyDB(familyId, otherFamilyId));
    // document.getElementById("deleteFamily").style.display = "none";
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
          id="deleteFamily"
        >
          <DeleteFamilyBox>
            <Text>정말 가족을 삭제하시겠습니까?</Text>
            <Button onClick={deleteFamily}>삭제하기</Button>
          </DeleteFamilyBox>
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

const DeleteFamilyBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default DeleteFamilyModal;
