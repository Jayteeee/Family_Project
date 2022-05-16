import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdRemoveCircleOutline, MdRemoveCircle } from "react-icons/md";

// 엘리먼트
import { Text } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../redux/modules/gallery";
import { history } from "../../redux/configureStore";

// 이미지
import noImage from "../../shared/images/noImage.png";

// 컴포넌트
import PhotoHeader from "./PhotoHeader";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeletePhotoModal } from "../../shared/modal/component/Gallery";

const PhotoList = ({
  photoAlbumId,
  photoAlbumName,
  NowFamilyId,
  PracticeEdit,
  isEdit,
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user);

  console.log("접속한Id", userId);

  console.log("선택한 앨범Id:", photoAlbumId);

  const { photoList } = useSelector((state) => state.gallery);

  console.log("선택한 앨범 사진리스트:", photoList);

  // 앨범 삭제하기 모달
  const [modalOn, setModalOn] = useState(false);

  const [photoId, setPhotoId] = useState("");
  const DeletePhoto = (photoId) => {
    setModalOn(!modalOn);
    setPhotoId(photoId);
    console.log(photoAlbumId);
  };

  console.log("사진ID:", photoId);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(galleryActions.getPhotoDB(photoAlbumId));
  }, [photoList.length]);

  return (
    <>
      <PhotoHeader
        NowFamilyId={NowFamilyId}
        photoAlbumId={photoAlbumId}
        PracticeEdit={PracticeEdit}
        photoAlbumName={photoAlbumName}
        isEdit={isEdit}
      />
      {!isEdit ? (
        <Container>
          {photoList.map((p) => {
            return (
              <Figure key={p?.photoId}>
                <div>
                  <ImageBox
                    src={p?.photoFile ? p?.photoFile : noImage}
                    onClick={() => {
                      history.push(
                        `/family/${NowFamilyId}/gallery/${photoAlbumName}/${photoAlbumId}/${p.photoId}/`
                      );
                      // getPhotoList();
                    }}
                  />
                </div>
              </Figure>
            );
          })}
        </Container>
      ) : (
        <Container>
          {photoList.map((p) => {
            return (
              <EditFigure key={p?.photoId}>
                <div>
                  <EditImageBox
                    src={p.photoFile ? p.photoFile : noImage}
                    onClick={() => {
                      // history.push(`/detail/${p._id}`);
                    }}
                  />
                  <DeleteIcon onClick={DeletePhoto.bind(this, p?.photoId)}>
                    <MdRemoveCircle />
                  </DeleteIcon>
                </div>
              </EditFigure>
            );
          })}
        </Container>
      )}
      <ModalPortal>
        {modalOn && (
          <DeletePhotoModal
            onClose={handleModal}
            photoId={photoId}
          ></DeletePhotoModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  column-count: 4;
  column-gap: 1%;
  padding: 40px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    column-count: 3;
    column-gap: 2%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    column-count: 3;
    column-gap: 2%;
    padding: 24px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    column-count: 3;
    column-gap: 2%;
    padding: 24px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    column-count: 2;
    column-gap: 3%;
    padding: 16px;
  }
`;

const Figure = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  /* margin-bottom: 2%; */
  break-inside: avoid;
  &:hover {
    border-radius: 13px;
    cursor: pointer;
    transform: scale(1.02);
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;

const ImageBox = styled.img`
  grid-row: 1 / -1;
  grid-column: 1;
  width: 100%;
  margin-top: 2%;
  border-radius: 13px;
`;

const EditFigure = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  /* margin-bottom: 2%; */
  break-inside: avoid;
  filter: brightness(70%);

  &:hover {
    border-radius: 13px;
    cursor: pointer;
    transform: scale(1.02);
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;

const EditImageBox = styled.img`
  grid-row: 1 / -1;
  grid-column: 1;
  width: 100%;
  margin-top: 2%;
  border-radius: 13px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
  svg {
    width: 33.3px;
    height: 33.3px;
    margin: 14px 10px;
    color: white;
    position: absolute;
    &:hover {
      color: rgba(29, 28, 29, 1);
    }
  }
`;

export default PhotoList;
