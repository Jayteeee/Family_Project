import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdClose } from "react-icons/md";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, Text } from "../../../../elements";

const CompleteMissionModal = ({ onClose, familyId, missionId }) => {
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
        >
          <CompletePhotoAlbumWrap>
            <CompletePhothAlbumHeader>
              <Text size="18px" fontWeight="600">
                미션체크가 완료되었습니다.
                <br />
                <br />
                마지막 미션 달성자의 경우,
                <br />
                이후 체크 수정을 할 수 없습니다.
              </Text>
            </CompletePhothAlbumHeader>
            <ButtonWrap>
              <Button
                M
                onClick={() => {
                  onclose();
                }}
                borderColor="transparent"
                bg="#6371F7"
                color="white"
                width="96px"
                height="56px"
                margin="30px 0 0 10px"
                fontSize="18px"
                fontWeight="600"
                borderRadius="8px"
                className="completeBtn"
              >
                확인
              </Button>
            </ButtonWrap>
          </CompletePhotoAlbumWrap>
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 240px;
  max-width: 450px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 24px;
  position: relative;
  overflow: scroll;
`;

const CompletePhotoAlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const CompletePhothAlbumHeader = styled.div`
  & > p {
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  .completeBtn {
    background-color: #6371f7;
    cursor: pointer;
    &:hover {
      background-color: #3245f5;
    }
  }
`;

export default CompleteMissionModal;
