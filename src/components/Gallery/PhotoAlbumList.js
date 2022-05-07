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

  const handleModal = () => {
    setModalOn(!modalOn);
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
      <MissionStatusWrap>
        <Content>
          {!isEdit ? (
            <Flexbox>
              {photoAlbumList ? (
                photoAlbumList.map((l, i) => {
                  return (
                    <AlbumImageWrap
                      key={l.photoAlbumId}
                      onClick={() => {
                        history.push(
                          `/family/${NowFamilyId}/gallery/${l.photoAlbumId}`
                        );
                      }}
                    >
                      <Items noImage={noImage}>
                        <AlbumImageBox />
                      </Items>
                      <Text size="24px" fontWeight="600">
                        {l.photoAlbumName}
                      </Text>
                    </AlbumImageWrap>
                  );
                })
              ) : (
                <div>
                  <AlbumImageWrap>
                    <Items noImage={noImage}>
                      <AlbumImageBox />
                    </Items>
                    <div>앨범</div>
                  </AlbumImageWrap>
                </div>
              )}
            </Flexbox>
          ) : (
            <Flexbox>
              {photoAlbumList ? (
                photoAlbumList.map((l, i) => {
                  return (
                    <AlbumImageWrap key={l.photoAlbumId}>
                      <Items noImage={noImage}>
                        <EditAlbumImageBox></EditAlbumImageBox>
                        <DeleteIcon onClick={handleModal}>
                          <MdRemoveCircle />
                        </DeleteIcon>
                      </Items>
                      <Input
                        text_align="center"
                        size="24px"
                        placeholder={l.photoAlbumName}
                        fontWeight="600"
                        borderColor="transparnt"
                        onChange={handleAlbumName}
                        id={l.photoAlbumId}
                      />
                    </AlbumImageWrap>
                  );
                })
              ) : (
                <div>
                  <AlbumImageWrap>
                    <Items noImage={noImage}>
                      <EditAlbumImageBox />
                    </Items>
                    <div>앨범</div>
                  </AlbumImageWrap>
                </div>
              )}
            </Flexbox>
          )}
        </Content>
      </MissionStatusWrap>
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

const MissionStatusWrap = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  border: none;
  background: transparent;
  margin: 0px 40px;
`;

const Content = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;

const AlbumImageWrap = styled.div`
  /* display: flex; */

  @media screen and (max-width: 839px) {
    flex-basis: auto;
    flex-shrink: 0;
    flex-grow: 1;
  }
`;
const Items = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 1;
  margin: 20px 0px 20px 0px;
  border-radius: 24px;
  border: none;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
  position: relative;
  background-color: transparent;
  ${({ noImage }) => `  background-image: url(${noImage})`};
  background-size: cover;
  &:hover {
    opacity: 0.5;
  }
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const AlbumImageBox = styled.div`
  display: block;
  width: 370px;
  padding-bottom: 100%;
  padding-right: 100%;
  border-radius: 24px;
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
`;

const EditAlbumImageBox = styled.div`
  display: block;
  width: 370px;
  padding-bottom: 100%;
  padding-right: 100%;
  border-radius: 24px;
  position: relative;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
  svg {
    width: 33.3px;
    height: 33.3px;
    margin: 10px;
    color: white;
    position: absolute;
    &:hover {
      color: rgba(29, 28, 29, 1);
    }
  }
`;

export default PhotoAlbumList;
