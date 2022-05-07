import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 컴포넌트
import GalleryHeader from "../components/Gallery/GalleryHeader";
import PhotoAlbumList from "../components/Gallery/PhotoAlbumList";
import PhotoList from "../components/Gallery/PhotoList";

const PhotoListPage = () => {
  return (
    <>
      <PhotoListPageWrap className="res-pageWrap">
        <GalleryHeader />
        <PhotoList />
      </PhotoListPageWrap>
    </>
  );
};

const PhotoListPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default PhotoListPage;
