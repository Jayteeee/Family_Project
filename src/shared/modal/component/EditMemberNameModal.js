import React, { useState, useContext, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyMemberActions } from "../../../redux/modules/familymember";

// 모달
import { ModalPortal } from "../portals";

// 엘리먼트
import { Button, Input, Text } from "../../../elements";

const EditMemberNameModal = (props) => {
  const { onClose, familyId, familyMemberId, familyMemberNickname } = props;
  console.log(props);
  const dispatch = useDispatch();

  //   가족 구셩원 호칭 변경 input
  const [changeMemberNickname, setChangeMemberNickname] =
    useState(familyMemberNickname);

  const handleMemberNicknameChange = (e) => {
    const { value } = e.target;
    setChangeMemberNickname(value);
  };

  const EditFamilyMemberNickname = () => {
    dispatch(
      familyMemberActions.editFamilyMemberNicknameDB(
        familyId,
        familyMemberId,
        changeMemberNickname
      )
    );
    onClose();
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
        >
          <SettingBox>
            <Text htmlFor="changeTitle">가족이름 수정하기</Text>
            <div style={{ display: "flex" }}>
              <Input
                id="changeTitle"
                size="15px"
                padding="0 20px 0 20px"
                onChange={handleMemberNicknameChange}
                value={changeMemberNickname}
              />
              <ModalBtn onClick={EditFamilyMemberNickname}>수정</ModalBtn>
            </div>
          </SettingBox>
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

const SettingBox = styled.div`
  margin: 10px 0;
`;

const ModalBtn = styled.button`
  border: 1px solid gray;
  background: #fff;
  border-radius: 4px;
  margin-top: 5px;
  padding: 10px;
  width: 15%;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

export default EditMemberNameModal;
