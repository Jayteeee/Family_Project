import React from "react";
import styled from "styled-components";
// import { history } from "../redux/configureStore";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import MainModal from "../../shared/modal/component/landing/MainModal";

const LoginBarMenu = () => {
  const [modalOn, setModalOn] = React.useState(false);

  // 토글
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <LoginbarMenuWrap className="res-menuWrap">
        <Menu
          className="res-menu"
          onClick={() => {
            handleModal();
          }}
        >
          <span>로그인 하기</span>
        </Menu>
      </LoginbarMenuWrap>
      <ModalPortal>
        {modalOn && <MainModal onClose={handleModal}></MainModal>}
      </ModalPortal>
    </>
  );
};

const LoginbarMenuWrap = styled.div`
  height: calc(82vh - 10px);
  overflow-y: auto;
  margin-top: 10px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 15px;
  cursor: pointer;
`;

export default LoginBarMenu;
