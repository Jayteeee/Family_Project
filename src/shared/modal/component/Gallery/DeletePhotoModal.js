import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdClose } from "react-icons/md";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch } from "react-redux";
import { galleryActions } from "../../../../redux/modules/gallery";

// 엘리먼트
import { Button, Text } from "../../../../elements";

const DeletePhotoModal = ({
  onClose,
  photoId,
  NowFamilyId,
  PhotoAlbumName,
  photoAlbumId,
}) => {
  const dispatch = useDispatch();

  const deletePhoto = () => {
    dispatch(
      galleryActions.deletePhotoDB(
        photoId,
        NowFamilyId,
        PhotoAlbumName,
        photoAlbumId
      )
    );
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
          >
            <Text size="18px" fontWeight="400" margin="0 0 5px 0">
              모든 구성원에게 동일하게 삭제되며
            </Text>
            <Text size="18px" fontWeight="400">
              삭제된 사진은 다시 복구할 수 없어요.
            </Text>
            <ButtonWrap>
              <Button
                M
                onClick={onClose}
                borderColor="transparent"
                bg="#DBDBDB"
                color="#757575"
                width="100%"
                height="56px"
                margin="30px 0 0 0"
                fontSize="18px"
                fontWeight="600"
                borderRadius="8px"
                className="cancelBtn"
              >
                취소
              </Button>
              <Button
                M
                onClick={deletePhoto}
                borderColor="transparent"
                bg="#6371F7"
                color="white"
                width="100%"
                height="56px"
                margin="30px 0 0 10px"
                fontSize="18px"
                fontWeight="600"
                borderRadius="8px"
              >
                삭제
              </Button>
            </ButtonWrap>
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  max-height: 100%;
  max-width: 450px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 30px 24px 10px 24px;
  overflow: scroll;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  justify-content: center;
  .cancelBtn {
    background-color: rgba(219, 219, 219, 1);
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default DeletePhotoModal;
