import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";

// 컴포넌트
import PhotoHeader from "../components/Gallery/PhotoHeader";
import PhotoList from "../components/Gallery/PhotoList";

const PhotoListPage = (props) => {
  const { photoAlbumId } = props.match.params;

  const { photoAlbumName } = props.match.params;

  const { familyId } = props.match?.params;

  const [isEdit, setIsEdit] = useState(false);

  const PracticeEdit = () => {
    setIsEdit(!isEdit);
  };

  // 토큰 없을 시 랜딩페이지로
  if (!sessionStorage.getItem("token")) {
    history.replace("/");
    localStorage.clear();
  }

  return (
    <>
      <PhotoListPageWrap className="res-pageWrap">
        <PhotoList
          photoAlbumId={photoAlbumId}
          photoAlbumName={photoAlbumName}
          NowFamilyId={familyId}
          PracticeEdit={PracticeEdit}
          isEdit={isEdit}
        />
      </PhotoListPageWrap>
    </>
  );
};

const PhotoListPageWrap = styled.div`
  max-width: 100%;
  height: calc(100vh - 40px);
  /* padding-bottom: 40px; */
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border: none;

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

export default PhotoListPage;
