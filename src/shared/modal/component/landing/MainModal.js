import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const MainModal = ({ onClose }, props) => {
  const [isClient, setIsClient] = React.useState(false);

  return (
    <ModalPortal>
      <Background
        className="flex-column-end"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          className="res-modal"
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ContentBox>
            <Box>
              <label>{isClient ? `회원가입 하기` : `로그인 하기`}</label>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                ✖
              </div>
            </Box>
            {isClient === false ? (
              <div>
                <LoginModal />
                <MsgBox>
                  <p>아직 회원이 아니신가요?</p>
                  <span onClick={() => setIsClient(true)}>회원가입</span>
                </MsgBox>
              </div>
            ) : (
              <div>
                <SignupModal />
                <MsgBox>
                  <p>회원이신가요?</p>
                  <span onClick={() => setIsClient(false)}>로그인</span>
                </MsgBox>
              </div>
            )}
          </ContentBox>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  bottom: 0px;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  z-index: 205;
  width: 420px;
  max-width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 40px 0px;

  position: relative;
  overflow: scroll;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
  & > span {
    cursor: pointer;
  }
`;

export default MainModal;
