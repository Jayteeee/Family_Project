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
          className="detailPhotoHeaderBox"
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
    .detailPhotoHeaderBox {
      font-size: 30px;
      margin-top: 15px;
    }
    padding: 0;
    margin: 18px 16px;
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

export default DetailPhotoHeader;
