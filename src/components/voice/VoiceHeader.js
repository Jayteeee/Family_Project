import React, { useRef, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

// 리덕스
import { useDispatch } from "react-redux";
import { voiceActions } from "../../redux/modules/voice";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import AddVoiceModal from "../../shared/modal/component/voiceModal/AddVoiceModal";

const VoiceHeader = ({ NowFamilyId, PracticeEdit, isEdit, voiceAlbumName }) => {
  const params = useParams();
  const voiceAlbumId = params.voiceAlbumId;
  console.log(isEdit);
  const dispatch = useDispatch();

  const photoImgInput = useRef();

  // 미션 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const handleSubmit = () => {
    // 프론트 유효성검사 더 강화해야함

    const file = photoImgInput.current.files[0];
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    console.log("formData:", formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(voiceActions.addPhotoDB(formData));
  };

  return (
    <>
      <VoiceHeaderBox>
        {voiceAlbumId ? (
          <Text
            size="40px"
            fontWeight="700"
            margin="10px 0 0 0"
            className="res-galleryHeaderBox"
          >
            {voiceAlbumName}
          </Text>
        ) : (
          <Text
            size="40px"
            fontWeight="700"
            margin="10px 0 0 0"
            className="res-galleryHeaderBox"
          >
            음성 메시지
          </Text>
        )}
        {!isEdit ? (
          <BtnWrap>
            <AddPhotoBtn
              className="input-file-button"
              for="input-file"
              onClick={() => {
                setModalOn(true);
              }}
            >
              <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>
              추가
            </AddPhotoBtn>
            <PhotoAlbumBtn
              onClick={PracticeEdit}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>
              편집
            </PhotoAlbumBtn>
          </BtnWrap>
        ) : (
          <BtnWrap>
            <EditCompletedBtn
              onClick={() => {
                // EditPhotoAlbum();
                PracticeEdit();
              }}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>
              편집 완료
            </EditCompletedBtn>
          </BtnWrap>
        )}
      </VoiceHeaderBox>
      {/* 앨범추가 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddVoiceModal
            onClose={handleModal}
            familyId={NowFamilyId}
          ></AddVoiceModal>
        )}
      </ModalPortal>
    </>
  );
};

const VoiceHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
  width: 100%;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 40px;
`;

const AddPhotoBtn = styled.label`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  /* padding: 12px 24px; */
  /* margin-left: 24px; */
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #8c98f8;
    color: #fff;
    border: none;
  }
`;

const PhotoAlbumBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: 1px solid black;
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #8c98f8;
    color: #fff;
    border: none;
  }
`;

const EditCompletedBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: none;
  background: #8c98f8;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: black;
    color: #fff;
    border: none;
  }
`;

export default VoiceHeader;
