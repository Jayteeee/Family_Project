import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useSelector } from "react-redux";

// 컴포넌트
import GalleryHeader from "../components/Gallery/GalleryHeader";
import PhotoAlbumList from "../components/Gallery/PhotoAlbumList";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import AlertModal from "../shared/modal/component/AlertModal";

const GalleryPage = (props) => {
  const { familyId } = props.match?.params;
  console.log("현재 갤러리페이지 패밀리 아이디:", familyId);

  const { photoAlbumList } = useSelector((state) => state.gallery);
  console.log("갤러리 앨범 리스트:", photoAlbumList);

  const [isEdit, setIsEdit] = useState(false);

  console.log("앨범편집모드:", isEdit);

  const PracticeEdit = () => {
    if (photoAlbumList.length !== 0) {
      setIsEdit(!isEdit);
    } else {
      handleAlert();
    }
  };

  const CompletedEdit = () => {
    setIsEdit(!isEdit);
  };

  // 알림 모달
  const [alertOn, setAlertOn] = useState(false);

  const handleAlert = () => {
    setAlertOn(!alertOn);
  };

  return (
    <>
      <GalleryPageWrap className="res-pageWrap">
        <PhotoAlbumList
          NowFamilyId={familyId}
          PracticeEdit={PracticeEdit}
          CompletedEdit={CompletedEdit}
          isEdit={isEdit}
        />
      </GalleryPageWrap>
      {/* 앨범 편집 알람 */}
      <ModalPortal>
        {alertOn && (
          <AlertModal
            onClose={handleAlert}
            content={"아직 앨범이 없어요."}
          ></AlertModal>
        )}
      </ModalPortal>
    </>
  );
};

const GalleryPageWrap = styled.div`
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

export default GalleryPage;
