import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { AddPhotoAlbumModal } from "../../shared/modal/component/Gallery";

const GalleryHeader = ({ NowFamilyId }) => {
  console.log("현재 가족Id:", NowFamilyId);
  // 미션 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="700"
          margin="10px 0 0 0"
          className="res-galleryHeaderBox"
        >
          갤러리
        </Text>
        <BtnWrap>
          <PhotoAlbumBtn
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleModal}
          >
            <span style={{ fontSize: "25px", margin: "2px 5px 0px 0" }}>+</span>
            앨범 추가
          </PhotoAlbumBtn>
          <PhotoAlbumBtn
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "25px", margin: "2px 5px 0px 0" }}>+</span>
            앨범 편집
          </PhotoAlbumBtn>
        </BtnWrap>
      </GalleryHeaderBox>
      {/* 앨범추가 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddPhotoAlbumModal
            onClose={handleModal}
            familyId={NowFamilyId}
          ></AddPhotoAlbumModal>
        )}
      </ModalPortal>
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

const PhotoAlbumBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: 1px solid black;
  &:hover {
    background: #8c98f8;
    color: #fff;
    border: none;
  }
`;

export default GalleryHeader;
