import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdRemoveCircleOutline, MdRemoveCircle } from "react-icons/md";

// 엘리먼트
import { Text, Input } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { galleryActions } from "../../redux/modules/gallery";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeletePhotoAlbumModal } from "../../shared/modal/component/Gallery";

// 이미지
import noImage from "../../shared/images/noImage.png";

// 컴포넌트
import GalleryHeader from "./GalleryHeader";

const PhotoAlbumList = ({ NowFamilyId, isEdit, PracticeEdit }) => {
  const dispatch = useDispatch();
  console.log("현재 가족Id:", NowFamilyId);

  // 갤러리 앨범 리스트
  const { photoAlbumList } = useSelector((state) => state.gallery);
  console.log("갤러리 앨범 리스트:", photoAlbumList);

  // const nowPhotoAlbum = `${({ AlbumName }) => `${AlbumName};`}`;

  // console.log(nowPhotoAlbum);
  //  앨범 제목 input
  const [photoAlbumName, setPhotoAlbumName] = useState("");
  const [photoAlbumId, setPhotoAlbumId] = useState("");

  const handleAlbumName = (e) => {
    const { value } = e.target;
    const { id } = e.target;
    setPhotoAlbumName(value);
    setPhotoAlbumId(id);
  };

  console.log(
    "선택한 앨범이름:",
    photoAlbumName,
    "선택한 앨범Id:",
    photoAlbumId
  );

  const EditPhotoAlbum = () => {
    if (photoAlbumName) {
      dispatch(
        galleryActions.editPhotoAlbumDB(
          NowFamilyId,
          photoAlbumId,
          photoAlbumName
        )
      );
    } else {
      alert("앨범 제목을 입력하지 않았습니다.");
    }
  };

  // 앨범 삭제하기 모달
  const [modalOn, setModalOn] = useState(false);
  const DeleteAlbum = (photoAlbumId) => {
    setModalOn(!modalOn);
    setPhotoAlbumId(photoAlbumId);
    console.log(photoAlbumId);
  };
  const handleModal = (e) => {
    setModalOn(!modalOn);
    const deleteBtm = document.getElementById("deleteBtn");
  };

  // GET pohtoList
  const getPhotoList = () => {
    dispatch(galleryActions.getPhotoDB(photoAlbumId));
  };

  useEffect(() => {
    dispatch(galleryActions.getPhotoAlbumDB(NowFamilyId));
  }, []);

  return (
    <>
      <GalleryHeader
        NowFamilyId={NowFamilyId}
        PracticeEdit={PracticeEdit}
        isEdit={isEdit}
        EditPhotoAlbum={EditPhotoAlbum}
      />
      {!isEdit ? (
        <Container>
          {photoAlbumList &&
            photoAlbumList.map((p) => {
              return (
                <Figure
                  key={p.photoAlbumId}
                  onClick={() => {
                    history.push(
                      `/family/${NowFamilyId}/gallery/${p.photoAlbumId}`
                    );
                    getPhotoList();
                  }}
                >
                  <div>
                    <ImageBox
                      // alt="#"
                      src={p.photoFile ? p.photoFile : noImage}
                      onClick={() => {
                        // history.push(`/detail/${p._id}`);
                      }}
                    />
                    <Text size="24px" fontWeight="600">
                      {p.photoAlbumName}
                    </Text>
                  </div>
                </Figure>
              );
            })}
        </Container>
      ) : (
        <Container>
          {photoAlbumList &&
            photoAlbumList.map((p) => {
              return (
                <div key={p.photoAlbumId}>
                  {/* <OnePhotoAlbum {...p} /> */}
                  <EditFigure>
                    <EditImageBox
                      // alt="#"
                      src={p.photoFile ? p.photoFile : noImage}
                      onClick={() => {
                        // history.push(`/detail/${p._id}`);
                      }}
                    />
                    <DeleteIcon
                      onClick={DeleteAlbum.bind(this, p.photoAlbumId)}
                    >
                      <MdRemoveCircle />
                    </DeleteIcon>
                  </EditFigure>
                  <Input
                    text_align="center"
                    size="24px"
                    placeholder={p.photoAlbumName}
                    fontWeight="600"
                    borderColor="transparnt"
                    margin="10px 0"
                    onChange={handleAlbumName}
                    id={p.photoAlbumId}
                  />
                </div>
              );
            })}
        </Container>
      )}
      <ModalPortal>
        {modalOn && (
          <DeletePhotoAlbumModal
            onClose={handleModal}
            photoAlbumId={photoAlbumId}
          ></DeletePhotoAlbumModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  /* display: grid; */
  display: grid;
  /* grid-template-rows: repeat(2, 150px); */
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
  column-count: 4;
  column-gap: 1%;
  padding: 40px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    padding: 24px;
    /* width: 74%; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2%;
    padding: 16px;
  }
`;

const Figure = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
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

export default PhotoAlbumList;
