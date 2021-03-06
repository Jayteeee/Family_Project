import React, { useState, useContext } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";
import AlertModal from "../AlertModal";

// 엘리먼트
import { Input, Button, Text } from "../../../../elements";
import { familyActions } from "../../../../redux/modules/family";

const AddFamilyModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const NowFamilyTitle = useContext(MainContext)[0]?.familyTitle;

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

  // 소켓 부분
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state?.user?.user?.user?.userId);

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
      let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{1,10}$/;

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

    dispatch(familyActions.addFamilyDB(familyTitle));
    socket?.emit("join", familyTitle, userId);
    onClose();
  };

  return (
    <>
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
                <AddFamilyInput
                  type="text"
                  id="changeName"
                  className="myInput"
                  placeholder="가족 이름을 입력해주세요."
                  onChange={handleAddFamily}
                  value={familyTitle}
                  maxLength="10"
                />
              </InputBox>
              <Button
                L
                onClick={(e) => {
                  e.stopPropagation();
                  // onClose();
                  addFamily();
                }}
                hover="#3245F5"
                color="#fff"
                borderRadius="12px"
                margin="24px 0 0 0"
                className="addFamilyBtn"
              >
                저장
              </Button>
            </Container>
          </Content>
        </Background>
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
      </ModalPortal>
    </>
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

const AddFamilyInput = styled.input`
  &:focus {
    box-shadow: none;
    outline: none !important;
    border-color: #6371f7 !important;
    /* box-shadow: 0 0 0 0px #6371f7, 0 0 0 2px #6371f7; */
  }

  width: 100%;
  height: 56px;
  padding: 16px;
  margin: 0 0 8px 0;
  background-color: #fff;
  border: 2px solid #dbdbdb;
  border-radius: 12px;
`;

const Container = styled.div`
  margin: 24px;
  .addFamilyBtn {
    background: #6371f7;
    border: none;
    :hover {
      background: #3245f5;
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
