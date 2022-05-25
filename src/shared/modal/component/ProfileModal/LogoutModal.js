import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 페이지
import { userActions } from "../../../../redux/modules/user";

// 엘리먼트
import { Button, Text } from "../../../../elements";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(userActions.userLogout());
  };

  // 로그아웃 시 localgost 정리
  const DeleteLocalhost = () => {
    localStorage.clear();
  };

  //소켓부분
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user?.user?.userId);

  const socketExit = () => {
    socket.emit("imOut", { userId: userId });
    socket.disconnect();
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
          <Text>정말 로그아웃 하시겠습니까?</Text>
          <br />
          <Button
            L
            onClick={() => {
              logOut();
              DeleteLocalhost();
              socketExit();
            }}
            className="logOutBtn"
          >
            로그아웃
          </Button>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 200px;
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  padding: 24px;

  position: relative;
  overflow: scroll;
  .logOutBtn {
    color: #fff;
    width: 100%;
    border-radius: 12px;
    border: none;
    background: #6371f7;
    :hover {
      background: #3245f5;
    }
  }
`;

export default LogoutModal;
