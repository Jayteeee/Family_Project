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
import { AddPhotoAlbumModal } from "../../shared/modal/component/Gallery";

// 이미지
import emptyPhoto from "../../shared/images/emptyPhoto.svg";
import L_album from "../../shared/images/L_album.svg";

// 컴포넌트
import GalleryHeader from "./GalleryHeader";

const PhotoAlbumList = ({
  NowFamilyId,
  isEdit,
  PracticeEdit,
  CompletedEdit,
}) => {
  const dispatch = useDispatch();

  // 갤러리 앨범 리스트
  const { photoAlbumList } = useSelector((state) => state.gallery);

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

  const EditPhotoAlbum = () => {
    // if (photoAlbumName) {
    dispatch(
      galleryActions.editPhotoAlbumDB(NowFamilyId, photoAlbumId, photoAlbumName)
    );
    // } else {
    //   alert("앨범 제목을 입력하지 않았습니다.");
    // }
  };

  // 앨범 삭제하기 모달
  const [modalOn, setModalOn] = useState(false);
  const DeleteAlbum = (photoAlbumId, photoAlbumName) => {
    // setModalOn(!modalOn);
    setPhotoAlbumId(photoAlbumId);
    setPhotoAlbumName(photoAlbumName);
    handleModal();
  };
  const handleModal = (e) => {
    setModalOn(!modalOn);
    const deleteBtn = document.getElementById("deleteBtn");
  };

  useEffect(() => {
    dispatch(galleryActions.getPhotoAlbumDB(NowFamilyId));
  }, []);

  // socket 부분

  let socket = useSelector((state) => state.socket?.socket);

  const nowUserNickname = useSelector(
    (state) => state.user.user.user?.nickname
  );

  const nowUserId = useSelector((state) => state.user.user.user?.userId);

  const handleNotification = (type) => {
    socket.emit("sendFamilyNoti", {
      userId: nowUserId,
      senderName: nowUserNickname,
      receiverFamily: NowFamilyId,
      category: "갤러리",
      type,
    });
  };

  // 앨범 추가하기 모달
  const [addAlbumModalOn, setAddAlbumModalOn] = useState(false);

  const addAlbumHandleModal = () => {
    setAddAlbumModalOn(!addAlbumModalOn);
  };

  return (
    <>
      <GalleryHeader
        NowFamilyId={NowFamilyId}
        PracticeEdit={PracticeEdit}
        isEdit={isEdit}
        EditPhotoAlbum={EditPhotoAlbum}
        CompletedEdit={CompletedEdit}
      />
      {!isEdit ? (
        <>
          {photoAlbumList.length !== 0 ? (
            <Container>
              {photoAlbumList.length !== 0 &&
                photoAlbumList.map((p, i) => {
                  return (
                    <Figure
                      key={i}
                      onClick={() => {
                        history.push(
                          `/family/${NowFamilyId}/gallery/${p.photoAlbumName}/${p.photoAlbumId}`
                        );
                      }}
                    >
                      <ImageBox
                        src={p.randomPhoto ? p.randomPhoto : emptyPhoto}
                      />
                      <Text
                        size="24px"
                        fontWeight="600"
                        margin="5% 0 0 0"
                        className="albumName"
                      >
                        {p.photoAlbumName}
                      </Text>
                    </Figure>
                  );
                })}
              <FloatingButton onClick={addAlbumHandleModal}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "400",
                    marginBottom: "1px",
                    width: "100%",
                    height: "99%",
                    cursor: "pointer",
                  }}
                >
                  +
                </div>
              </FloatingButton>
            </Container>
          ) : (
            <NoneContentWrap>
              <NoneContentBox>
                <NoneContentItem>
                  <EmptyContentImg src={L_album} />
                </NoneContentItem>
              </NoneContentBox>
              <FloatingButton onClick={addAlbumHandleModal}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "400",
                    marginBottom: "1px",
                    width: "100%",
                    height: "99%",
                    cursor: "pointer",
                  }}
                >
                  +
                </div>
              </FloatingButton>
            </NoneContentWrap>
          )}
        </>
      ) : (
        <Container>
          {photoAlbumList &&
            photoAlbumList.map((p) => {
              return (
                <div key={p.photoAlbumId}>
                  <EditFigure>
                    <EditImageBox
                      src={p.randomPhoto ? p.randomPhoto : emptyPhoto}
                    />
                    <DeleteIcon
                      onClick={() => {
                        DeleteAlbum.bind(
                          this,
                          p.photoAlbumId,
                          p.photoAlbumName
                        )();
                        handleNotification("앨범 삭제");
                      }}
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
            photoAlbumName={photoAlbumName}
          ></DeletePhotoAlbumModal>
        )}
      </ModalPortal>
      {/* 앨범추가 모달 */}
      <ModalPortal>
        {addAlbumModalOn && (
          <AddPhotoAlbumModal
            onClose={addAlbumHandleModal}
            familyId={NowFamilyId}
          ></AddPhotoAlbumModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: none;
  gap: 20px 10px;
  column-count: 4;
  column-gap: 1%;
  padding: 40px;
  /* position: relative; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    padding: 24px;
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
    column-gap: 4%;
    padding: 16px;
  }
`;

const Figure = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  grid-template-rows: 1fr auto;
  /* margin-bottom: 2%; */
  break-inside: avoid;
  width: 100%;
  height: 100%;
  /* width: 300px;
  min-height: 300px; */

  &:hover {
    border-radius: 13px;
    cursor: pointer;
    transform: scale(1.02);
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .albumName {
      font-size: 20px;
    }
  }
`;

const ImageBox = styled.div`
  grid-row: 1 / -1;
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 13px;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
`;

const EditFigure = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  /* margin-bottom: 2%; */
  break-inside: avoid;

  &:hover {
    border-radius: 13px;
    cursor: pointer;
    transform: scale(1.02);
    transition: all 300ms ease-in;
  }
  position: relative;
`;

const EditImageBox = styled.div`
  grid-row: 1 / -1;
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: brightness(60%);
  width: 100%;
  padding-bottom: 100%;
  border-radius: 13px;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
  svg {
    width: 33.3px;
    height: 33.3px;
    margin: 14px 10px;
    color: #fff;
    position: absolute;
    &:hover {
      color: rgba(29, 28, 29, 1);
    }
  }
`;

const NoneContentWrap = styled.div`
  background: #fff;
  display: flex;
  /* min-height: 880px; */
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 20px 40px 40px;
  padding: 20px;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* min-height: 680px; */
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 40px 24px;
    /* margin-top: 0px !important; */
    padding-left: 20px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* min-height: 480px; */

    margin: 28px 16px;
    /* margin: 20px 9px; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-top: 0px !important;
  }
`;

const NoneContentBox = styled.div`
  width: 100%;
  height: 90%;
`;

const NoneContentItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 13rem;
  display: flex;
  align-items: center;
  justify-content: center;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    padding: 1rem 5rem;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 1rem 7rem;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 1rem 4rem;
  }

  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 1rem 3.5rem;
  }
`;

const EmptyContentImg = styled.div`
  width: 100%;
  padding: 30%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 70%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    padding: 80%;
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 100%;
  }

  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 100%;
  }
`;

// 플로팅 버튼
const FloatingButton = styled.div`
  display: none;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    width: 70px;
    height: 70px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 140px;
    right: 30px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    width: 70px;
    height: 70px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 120px;
    right: 35px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 60px;
    height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 95px;
    right: 25px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 50px;
    height: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 80px;
    right: 25px;
    border-radius: 100%;
    background-color: #6371f7;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
`;

export default PhotoAlbumList;
