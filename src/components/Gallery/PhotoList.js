import React, { useRef, useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../redux/modules/gallery";
import { history } from "../../redux/configureStore";

// 이미지
import emptyPhoto from "../../shared/images/emptyPhoto.svg";
import L_photo from "../../shared/images/L_photo.svg";
import S_photo from "../../shared/images/S_photo.svg";

// 컴포넌트
import PhotoHeader from "./PhotoHeader";

const PhotoList = ({
  photoAlbumId,
  photoAlbumName,
  NowFamilyId,
  PracticeEdit,
  isEdit,
}) => {
  const dispatch = useDispatch();

  const { photoList } = useSelector((state) => state.gallery);

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

  // 사진 추가
  const photoImgInput = useRef();

  const onImgInputBtnClick = () => {
    const file = photoImgInput.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("photoFile", file);
    }

    dispatch(galleryActions.addPhotoDB(NowFamilyId, photoAlbumId, formData));
  };

  const [pageNum, setPageNum] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setPageNum((prevState) => prevState + 1);
      dispatch(galleryActions.getPhotoDB(photoAlbumId, pageNum));
    }
  }, [inView]);

  return (
    <>
      <PhotoHeader
        NowFamilyId={NowFamilyId}
        photoAlbumId={photoAlbumId}
        PracticeEdit={PracticeEdit}
        photoAlbumName={photoAlbumName}
        isEdit={isEdit}
      />
      <>
        {photoList.length !== 0 ? (
          <Container>
            {photoList.map((p, i) => {
              return (
                <Figure key={p?.photoId}>
                  <div>
                    <ImageBox
                      src={p?.photoFile ? p?.photoFile : emptyPhoto}
                      onClick={() => {
                        history.push(
                          `/family/${NowFamilyId}/gallery/${photoAlbumName}/${photoAlbumId}/${p.photoId}/`
                        );
                        // history.go(0);
                      }}
                      // id="photoImage"
                    />
                  </div>
                </Figure>
              );
            })}
            <FloatingButton>
              <label
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
                className="input-file-button"
                htmlFor="input-file"
              >
                +
              </label>
            </FloatingButton>
            <input
              ref={photoImgInput}
              type="file"
              id="input-file"
              accept="image/*"
              onChange={() => {
                onImgInputBtnClick();
                handleNotification("사진 등록");
              }}
              style={{ display: "none" }}
            />
          </Container>
        ) : (
          <NoneContentWrap>
            <NoneContentBox>
              <NoneContentItem>
                <EmptyContentImg src={L_photo} S_photo={S_photo} />
              </NoneContentItem>
            </NoneContentBox>
            <FloatingButton>
              <label
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
                className="input-file-button"
                htmlFor="input-file"
              >
                +
              </label>
            </FloatingButton>
            <input
              ref={photoImgInput}
              type="file"
              id="input-file"
              accept="image/*"
              onChange={() => {
                onImgInputBtnClick();
                handleNotification("사진 등록");
              }}
              style={{ display: "none" }}
            />
          </NoneContentWrap>
        )}
        {photoList.length !== 0 ? (
          <div
            ref={ref}
            style={{
              display: "flex",
              alignItems: "flex-end",
              background: "transparent",
              width: "30px",
              minHeight: "30px",
            }}
          ></div>
        ) : (
          <div
            ref={ref}
            style={{
              background: "transparent",
              width: "30px",
              minHeight: "30px",
              position: "absolute",
            }}
          ></div>
        )}
      </>
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
const NoneContentWrap = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 20px 40px 40px;
  padding: 20px;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 40px 24px;
    padding-left: 20px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin: 28px 16px;
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

export default PhotoList;
