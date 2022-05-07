import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 컴포넌트
import GalleryHeader from "../components/Gallery/GalleryHeader";
import PhotoAlbumList from "../components/Gallery/PhotoAlbumList";

const GalleryPage = (props) => {
  const { familyId } = props.match?.params;
  console.log("현재 갤러리페이지 패밀리 아이디:", familyId);
  return (
    <>
      <GalleryPageWrap className="res-pageWrap">
        <GalleryHeader NowFamilyId={familyId} />
        <PhotoAlbumList NowFamilyId={familyId} />
      </GalleryPageWrap>
    </>
  );
};

const GalleryPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default GalleryPage;
