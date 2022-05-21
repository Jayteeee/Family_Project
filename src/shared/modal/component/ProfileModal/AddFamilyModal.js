import React, { useState, useContext } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";
import { io } from "socket.io-client";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Input, Button, Text } from "../../../../elements";
import { familyActions } from "../../../../redux/modules/family";

const AddFamilyModal = ({ onClose }) => {
  const dispatch = useDispatch();

  console.log(onClose);

  const NowFamilyTitle = useContext(MainContext)[0]?.familyTitle;

  console.log("현재 가족 이름: ", NowFamilyTitle);

  // 가족 이름 input
  const [familyTitle, setfamilyTitle] = useState("");

  const handleAddFamily = (e, max) => {
    // if (e.value.length > max) {
    //   e.value = e.value.substr(0, max);
    //   const { value } = e.target;
    //   setfamilyTitle(value);
    // }
    const { value } = e.target;
    setfamilyTitle(value);
  };

  console.log(familyTitle);

  // 소켓 부분
  const ENDPOINT = "http://52.79.130.222/room";
  const userId = useSelector((state) => state?.user?.user?.user?.userId);

  // const [user, setUser] = useState("");
  const [socket, setSocket] = useState(
    io.connect(ENDPOINT, {
      transports: ["websocket"],
      forceNew: true,
      path: "/socket.io",
    })
  );

  // 가족 생성 함수
  const addFamily = () => {
    dispatch(familyActions.addFamilyDB(familyTitle));
    socket?.emit("join", familyTitle, userId);
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
                maxlength="8"
                oninput="handleAddFamily(this, 8)"
                value={familyTitle}
              />
            </InputBox>
            <Button
              L
              id="myBtn"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
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
`;

const Container = styled.div`
  margin: 24px;
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

export default AddFamilyModal;
