import React from "react";
import styled from "styled-components";
import { ModalPortal } from "../portals";
import { IoCloseOutline } from "react-icons/io5";
// import { Button } from "../../../elements";

const ProFileModal = ({ onClose, children }) => {
  return (
    <ModalPortal>
      {/* 백그라운드는 모달 뒤의 기존 뷰들을 의미합니다 */}
      <Background
        // className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* 여기부터 실제 모달에 보여지는 컨텐츠 들입니다 */}
          <TopDiv>
            <TitleWrap className="flex-row">
              <div style={{ width: "100%", justifyContent: "start" }}>
                <h1
                  style={{
                    textAlign: "left",
                    fontSize: "22px",
                    lineHeight: "1.36365",
                  }}
                >
                  프로필 수정
                </h1>
              </div>
              <CancelBtn
                className="flex-row"
                onClick={() => {
                  onClose();
                }}
              >
                <IoCloseOutline size={24} />
              </CancelBtn>
            </TitleWrap>
          </TopDiv>
          <ModalBody>{children}</ModalBody>
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
`;

const Content = styled.div`
  z-index: 205;
  height: 380px;
  max-width: 300px;
  width: 100%;
  border-radius: 0px;
  border: 1px solid #d6d6d6;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  overflow: scroll;
  margin: 40px;
`;

const TopDiv = styled.div`
  height: 70px;
`;

const CancelBtn = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;

  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const ModalBody = styled.div`
  // padding: 10px 10px;
  margin: 0;
  height: calc(100% - 104px);
  border-top: 1px solid #d6d6d6; ;
`;

const TitleWrap = styled.div`
  min-height: 0;
  padding-bottom: 0;
  padding: 20px 20px 0;
`;

export default ProFileModal;
