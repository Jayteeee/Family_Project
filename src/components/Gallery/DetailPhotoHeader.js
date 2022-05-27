import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Text } from "../../elements/index";

// 모달

const DetailPhotoHeader = ({ photoAlbumName }) => {
  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="600"
          margin="10px 0 0 0"
          className="photoHeaderBox"
        >
          {photoAlbumName}
        </Text>
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

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    display: none;
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
`;

export default DetailPhotoHeader;
