import React, { useRef, useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import imageCompression from "browser-image-compression";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../redux/modules/gallery";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import AddPhotoModal from "../../shared/modal/component/Gallery/AddPhotoModal";

// 컴포넌트
import WhiteSpinner from "../WhiteSpinner";

const PhotoHeader = ({ NowFamilyId, photoAlbumId, photoAlbumName }) => {
  const dispatch = useDispatch();

  const photoImgInput = useRef();

  const [formData, setFormData] = useState("");
  const [addPhotoModal, setAddPhotoModa] = useState(false);

  const onImgInputBtnClick = () => {
    setLoading(true);
    const file = photoImgInput.current.files[0];
    actionImgCompress(file);
  };

  const actionImgCompress = async (fileSrc) => {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      // 압축 결과
      const compressedFile = await imageCompression(fileSrc, options);
      const formData = new FormData();
      if (compressedFile) {
        formData.append("photoFile", compressedFile);
      }

      setFormData(formData);

      handleAddPhotoModal();
      setLoading(false);
    } catch (error) {}
  };

  const handleAddPhotoModal = () => {
    setAddPhotoModa(!addPhotoModal);
  };

  const addPhoto = () => {
    dispatch(galleryActions.addPhotoDB(NowFamilyId, photoAlbumId, formData));
    handleAddPhotoModal();
  };

  // 사진 업로드 스피너
  const [loading, setLoading] = useState(false);

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
                {loading ? (
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "600",
                      marginBottom: "1px",
                      width: "100%",
                      height: "99%",
                    }}
                  >
                    <WhiteSpinner />
                  </div>
                ) : (
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
                )}
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
            }}
            style={{ display: "none" }}
          />
        </BtnWrap>
      </GalleryHeaderBox>
      {!loading && (
        <ModalPortal>
          {addPhotoModal && (
            <AddPhotoModal onClose={handleAddPhotoModal} addPhoto={addPhoto} />
          )}
        </ModalPortal>
      )}
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
    .addPhotoBtn {
      display: none;
    }
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
