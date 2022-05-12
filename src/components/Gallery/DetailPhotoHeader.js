import React, { useRef, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";

// 리덕스
import { useDispatch } from "react-redux";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { galleryActions } from "../../redux/modules/gallery";

const DetailPhotoHeader = ({
  NowFamilyId,
  PracticeEdit,
  isEdit,
  photoAlbumId,
  photoAlbumName,
}) => {
  const dispatch = useDispatch();

  const photoImgInput = useRef();
  console.log("포토앨범 이름:", photoAlbumName);

  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="700"
          margin="10px 0 0 0"
          className="res-galleryHeaderBox"
        >
          {photoAlbumName}
        </Text>
        {!isEdit ? <BtnWrap></BtnWrap> : <BtnWrap></BtnWrap>}
      </GalleryHeaderBox>
      {/* 앨범추가 모달 */}
      {/* <ModalPortal>
        {modalOn && (
          <AddPhotoAlbumModal
            onClose={handleModal}
            familyId={NowFamilyId}
          ></AddPhotoAlbumModal>
        )}
      </ModalPortal> */}
    </>
  );
};

const GalleryHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
  width: 100%;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 40px;
`;

const AddPhotoBtn = styled.label`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  /* padding: 12px 24px; */
  /* margin-left: 24px; */
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #8c98f8;
    color: #fff;
    border: none;
  }
`;

const PhotoAlbumBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: 1px solid black;
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #8c98f8;
    color: #fff;
    border: none;
  }
`;

const EditCompletedBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: none;
  background: #8c98f8;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: black;
    color: #fff;
    border: none;
  }
`;

export default DetailPhotoHeader;
