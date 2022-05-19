import React, { useRef, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";

// 리덕스
import { useDispatch } from "react-redux";
import { galleryActions } from "../../redux/modules/gallery";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";

const PhotoHeader = ({ NowFamilyId, photoAlbumId, photoAlbumName }) => {
  const dispatch = useDispatch();

  const photoImgInput = useRef();
  console.log("포토앨범 이름:", photoAlbumName);

  const onImgInputBtnClick = () => {
    const file = photoImgInput.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("photoFile", file);
    }
    console.log("이미지파일", file);

    dispatch(galleryActions.addPhotoDB(NowFamilyId, photoAlbumId, formData));
  };

  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="700"
          margin="10px 0 0 0"
          className="photoHeaderBox"
        >
          {photoAlbumName}
        </Text>
        <BtnWrap>
          <AddPhotoBtn className="input-file-button" htmlFor="input-file">
            <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>
            사진 추가
          </AddPhotoBtn>
          <input
            ref={photoImgInput}
            type="file"
            id="input-file"
            accept="image/*"
            onChange={onImgInputBtnClick}
            style={{ display: "none" }}
          />
        </BtnWrap>
      </GalleryHeaderBox>
    </>
  );
};

const GalleryHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  margin: 19px 20px 10px 20px;
  padding: 16px 20px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .photoHeaderBox {
      font-size: 30px;
    }
    padding: 0;
    margin: 21px 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
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
    background: #6371f7;
    color: #fff;
    border: none;
  }

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    margin-top: 10px;
    width: 160px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 120px;
    padding: 12px 12px;
    margin-left: 16px;
    height: 40px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

export default PhotoHeader;
