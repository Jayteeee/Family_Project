import React, { useState, useContext, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyMemberActions } from "../../../../redux/modules/familymember";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, Input, Text } from "../../../../elements";

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
            <Text S3>가족 구성원 이름 수정하기</Text>
            <Main>
              <Input
                id="changeTitle"
                className="myInput"
                margin="0 0 8px 0"
                padding="16px"
                height="56px"
                onChange={handleMemberNicknameChange}
                value={changeMemberNickname}
                style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
              />
            </Main>
            <Button
              L
              id="myBtn"
              onClick={EditFamilyMemberNickname}
              color="#fff"
              borderColor="#fff"
              borderRadius="12px"
              style={{ backgroundColor: "#6F5FCE", opacity: "0.4" }}
            >
              수정
            </Button>
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
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
  #myBtn {
    :hover {
      opacity: 1 !important;
    }
  }
  .myInput {
    :focus {
      box-shadow: none;
      border-color: #6f5fce !important;
    }
  }
`;

const SettingBox = styled.div`
  margin: 24px;
`;

const Main = styled.div`
  margin: 24px 0;
`;

export default EditMemberNameModal;
