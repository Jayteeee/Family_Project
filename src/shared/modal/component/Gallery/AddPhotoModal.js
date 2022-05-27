import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, Text } from "../../../../elements";

const AddPhotoModal = ({ onClose, addPhoto }) => {
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
            <AddPhotoAlbumWrap>
              <PhotoAlbumTitleBox>
                <Text size="24px" fontWeight="600">
                  사진을 정말 추가할까요?
                </Text>
              </PhotoAlbumTitleBox>
              <ButtonWrap>
                <Button
                  M
                  onClick={onClose}
                  borderColor="transparent"
                  bg="#DBDBDB"
                  color="#757575"
                  width="110px"
                  height="53px"
                  margin="30px 10px 0 0"
                  fontSize="16px"
                  borderRadius="4px"
                  className="cancelBtn"
                >
                  취소
                </Button>
                <Button
                  M
                  onClick={() => {
                    addPhoto();
                  }}
                  borderColor="transparent"
                  bg="#6371F7"
                  color="white"
                  width="110px"
                  height="53px"
                  margin="30px 0 0 0"
                  fontSize="16px"
                  borderRadius="4px"
                >
                  저장
                </Button>
              </ButtonWrap>
            </AddPhotoAlbumWrap>
          </Content>
        </Background>
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
  flex-direction: column;
  /* text-align: center; */
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 200px;
  max-width: 470px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 14px;
  position: relative;
  overflow: scroll;
`;

const AddPhotoAlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const PhotoAlbumTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  font-size: 18px;
  width: 100%;
  margin-top: 3px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  .cancelBtn {
    :hover {
      background-color: black;
      color: #fff;
    }
  }
`;

export default AddPhotoModal;
