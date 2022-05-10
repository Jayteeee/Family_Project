import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import DetailPhoto from "../components/Gallery/DetailPhoto";

// 컴포넌트
import PhotoHeader from "../components/Gallery/PhotoHeader";
import PhotoList from "../components/Gallery/PhotoList";

const PhotoDetalilPage = (props) => {
  const { photoId } = props.match.params;
  console.log("선택한 사진Id:", photoId);

  const { photoAlbumId } = props.match.params;
  console.log("선택한 앨범Id:", photoAlbumId);

  const { photoAlbumName } = props.match.params;
  console.log("선택한 앨범이름:", photoAlbumName);

  const { familyId } = props.match?.params;
  console.log("현재 사진페이지 패밀리 아이디:", familyId);

  const [isEdit, setIsEdit] = useState(false);

  console.log("사진편집모드:", isEdit);

  const PracticeEdit = () => {
    setIsEdit(!isEdit);
  };
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
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default PhotoDetalilPage;
