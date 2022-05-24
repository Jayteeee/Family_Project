import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Input, Button, Text } from "../../elements";

// 리덕스
import { familyActions } from "../../redux/modules/family";
import { useDispatch, useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import AlertModal from "../../shared/modal/component/AlertModal";

const CreateFamily = (props) => {
  const dispatch = useDispatch();

  // 가족 이름 input
  const [familyTitle, setfamilyTitle] = useState("");

  const handleAddFamily = (e) => {
    const { value } = e.target;
    setfamilyTitle(value);
  };

  // 유효성 검사
  const [checkFamilyTitle, setCheckFamilyTitle] = useState(false);
  const [emptyFamilyTitle, setemptyFamilyTitle] = useState(false);

  const handleAlertCheck = () => {
    setCheckFamilyTitle(!checkFamilyTitle);
  };

  const handleAlertempty = () => {
    setemptyFamilyTitle(!emptyFamilyTitle);
  };

  // 가족 생성 함수
  const addFamily = () => {
    const nameCheck = (familyTitle) => {
      let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{1,8}$/;

      return _reg.test(familyTitle);
    };

    // 가족 이름 공란인지 체크
    if (familyTitle === "") {
      handleAlertempty();
      return;
    }

    // 가족이름 글자 수 체크
    if (!nameCheck(familyTitle)) {
      handleAlertCheck();
      return;
    }

    // socket?.emit("join", familyTitle, userId);
    dispatch(familyActions.addFamilyDB(familyTitle));
  };

  return (
    <>
      <Container>
        <Text S3>가족 생성하기</Text>
        <Explanation>
          <Text B1>
            첫 시작으로 우리 가족만의 공간을 만들어주세요.
            <br />
            가족 이름은 언제든 수정이 가능해요.
          </Text>
        </Explanation>
        <InputBox>
          <Input
            type="text"
            id="changeName"
            className="myInput"
            placeholder="가족 이름을 입력해주세요"
            margin="0 0 8px 0"
            padding="16px"
            height="56px"
            style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
            onChange={handleAddFamily}
            value={familyTitle}
          />
        </InputBox>
        <Box>
          <Button
            L
            onClick={(e) => {
              e.stopPropagation();
              addFamily();
            }}
            color="#fff"
            borderColor="#fff"
            borderRadius="12px"
            margin="24px 0 0 0"
          >
            저장
          </Button>
        </Box>
      </Container>
      <ModalPortal>
        {checkFamilyTitle && (
          <AlertModal
            onClose={handleAlertCheck}
            content={
              "가족 이름은 1-8자,숫자,영어,한글만 가능하며 특수문자는 불가능합니다."
            }
          />
        )}
      </ModalPortal>
      <ModalPortal>
        {emptyFamilyTitle && (
          <AlertModal
            onClose={handleAlertempty}
            content={"가족 이름을 입력해주세요."}
          ></AlertModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  .myInput {
    :focus {
      box-shadow: none;
      outline: none !important;
      border-color: #6371f7 !important;
    }
  }
`;

const Box = styled.div`
  button {
    background-color: rgba(99, 113, 247, 1);
    :hover {
      background: rgba(50, 69, 245, 1);
    }
  }
`;

const InputBox = styled.div`
  margin-top: 11px;
`;

const Explanation = styled.div`
  margin: 24px 0;
`;

export default CreateFamily;
