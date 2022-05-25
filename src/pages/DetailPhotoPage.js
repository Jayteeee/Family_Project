import React, { useState } from "react";
import { useSelector } from "react-redux";

// 라이브러리, 패키지
import styled from "styled-components";
import DetailPhoto from "../components/Gallery/DetailPhoto";

// 리덕스
import { history } from "../redux/configureStore";

// 컴포넌트
import PhotoHeader from "../components/Gallery/PhotoHeader";
import PhotoList from "../components/Gallery/PhotoList";

const PhotoDetalilPage = (props) => {
  const { photoId } = props.match.params;

  const { photoAlbumId } = props.match.params;

  const { familyId } = props.match?.params;

  const { photoAlbumList } = useSelector((state) => state.gallery);

  const photoAlbumName = photoAlbumList.filter(
    (p) => p.photoAlbumId === photoAlbumId
  );

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
      <PhotoDetailPageWrap className="res-pageWrap">
        <DetailPhoto
          photoAlbumId={photoAlbumId}
          NowFamilyId={familyId}
          PracticeEdit={PracticeEdit}
          isEdit={isEdit}
          photoAlbumName={photoAlbumName}
          photoId={photoId}
        />
      </PhotoDetailPageWrap>
    </>
  );
};

const PhotoDetailPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
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

export default PhotoDetalilPage;
