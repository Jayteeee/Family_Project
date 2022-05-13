import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 컴포넌트
import GalleryHeader from "../components/Gallery/GalleryHeader";
import PhotoAlbumList from "../components/Gallery/PhotoAlbumList";

const GalleryPage = (props) => {
  const { familyId } = props.match?.params;
  console.log("현재 갤러리페이지 패밀리 아이디:", familyId);

  const [isEdit, setIsEdit] = useState(false);

  console.log("앨범편집모드:", isEdit);

  const PracticeEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <GalleryPageWrap className="res-pageWrap">
        <PhotoAlbumList
          NowFamilyId={familyId}
          PracticeEdit={PracticeEdit}
          isEdit={isEdit}
        />
      </GalleryPageWrap>
    </>
  );
};

const GalleryPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 100%;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
    height: 100%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

export default GalleryPage;
