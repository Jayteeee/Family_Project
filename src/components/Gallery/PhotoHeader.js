import React, { useRef, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { FiPlus } from "react-icons/fi";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../redux/modules/gallery";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";

const PhotoHeader = ({ NowFamilyId, photoAlbumId, photoAlbumName }) => {
  const dispatch = useDispatch();

  const photoImgInput = useRef();
  console.log("포토앨범 이름:", photoAlbumName);

  const onImgInputBtnClick = () => {
    const file = photoImgInput.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("photoFile", file);
    }
    console.log("이미지파일", file);

    dispatch(galleryActions.addPhotoDB(NowFamilyId, photoAlbumId, formData));
  };

  // socket 부분
  const socket = useSelector((state) => state.socket.socket);
  const nowUserNickname = useSelector(
    (state) => state?.user?.user?.user?.nickname
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

  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="600"
          margin="10px 0 0 0"
          className="photoHeaderBox"
        >
          {photoAlbumName}
        </Text>
        <BtnWrap>
          <PhotoBtn>
            <label
              style={{
                width: "100%",
                height: "100%",
                background: "gray",
              }}
            >
              <Button
                M
                borderRadius="8px"
                borderColor="transparent"
                bg="#6371F7"
                color="#fff"
                width="159px"
                height="56px"
                hover="#3245F5"
                margin="10px 0 0 0"
                className="addPhotoBtn"
              >
                <label
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                    marginBottom: "1px",
                    width: "100%",
                    height: "99%",
                    cursor: "pointer",
                  }}
                  className="input-file-button"
                  htmlFor="input-file"
                >
                  <FiPlus />
                  사진 추가
                </label>
              </Button>
            </label>
          </PhotoBtn>
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
        </BtnWrap>
      </GalleryHeaderBox>
    </>
  );
};

const GalleryHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  margin: 15px 20px 10px 20px;
  padding: 16px 20px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 10px 10px 10px 10px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin: 20px 10px 10px 10px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 10px;
    margin: 10px 6px 5px 6px;
    .photoHeaderBox {
      font-size: 30px;
    }
    .addPhotoBtn {
      display: none;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const PhotoBtn = styled.label`
  text-align: right;
  flex-grow: 1;

  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

export default PhotoHeader;
