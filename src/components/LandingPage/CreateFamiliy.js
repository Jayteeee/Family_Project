import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Input, Button, Text } from "../../elements";
import { familyActions } from "../../redux/modules/family";

const CreateFamily = (props) => {
  const dispatch = useDispatch();

  // 가족 이름 input
  const [familyTitle, setfamilyTitle] = useState("");

  const handleAddFamily = (e) => {
    const { value } = e.target;
    setfamilyTitle(value);
  };

  // const socket = useSelector((state) => state.socket.socket);
  // const userId = useSelector((state) => state?.user?.user?.user?.userId);

  // 가족 생성 함수
  const addFamily = () => {
    if (familyTitle === "") {
      alert("가족 이름을 입력해주세요");
      return;
    }
    // socket?.emit("join", familyTitle, userId);
    dispatch(familyActions.addFamilyDB(familyTitle));
  };

  return (
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

      <Button
        L
        id="myBtn"
        onClick={(e) => {
          e.stopPropagation();
          addFamily();
        }}
        color="#fff"
        borderColor="#fff"
        borderRadius="12px"
        margin="24px 0 0 0"
        style={{ backgroundColor: "#6371F7", opacity: "0.4" }}
      >
        저장
      </Button>
    </Container>
  );
};

const Container = styled.div`
  #myBtn {
    :hover {
      opacity: 1 !important;
    }
  }
  .myInput {
    :focus {
      box-shadow: none;
      outline: none !important;
      border-color: #6371f7 !important;
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
