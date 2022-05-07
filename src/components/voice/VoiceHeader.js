import React, { useState } from "react";
// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// 엘리먼트
import { Text, Button } from "../../elements/index";
// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { AddVoiceModal } from "../../shared/modal/component/voiceModal";

const VoiceHeader = () => {
  const params = useParams();
  const voiceAlbumId = params.voiceAlbumId;
  const voiceAlbumTitle = useSelector(
    (state) => state.voice?.voiceList?.voiceAlbumName
  );
  console.log(voiceAlbumTitle);
  // 미션 추가하기 모달
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };
  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="700"
          margin="10px 0 0 0"
          className="res-galleryHeaderBox"
        >
          {voiceAlbumId ? voiceAlbumTitle : "음성메시지"}
        </Text>
        <AddPhotoAlbumBtn>
          <Button
            M
            borderRadius="8px"
            borderColor="transparent"
            bg="#8C98F8"
            color="#fff"
            width="159px"
            height="56px"
            hover="#6971B2"
            onClick={handleModal}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "2px 5px 0px 0" }}>
                +
              </span>
              {voiceAlbumId ? "녹음 하기" : "앨범 추가"}
            </div>
          </Button>
        </AddPhotoAlbumBtn>
        <EditPhotoAlbumBtn>
          <Button
            M
            borderRadius="8px"
            borderColor="transparent"
            bg="#8C98F8"
            color="#fff"
            width="159px"
            height="56px"
            hover="#6971B2"
            onClick={handleModal}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "2px 5px 0px 0" }}>
                +
              </span>
              {voiceAlbumId ? "음성 편집" : "앨범 편집"}
            </div>
          </Button>
        </EditPhotoAlbumBtn>
      </GalleryHeaderBox>
      {/* 미션 추가 모달 */}
      <ModalPortal>
        {modalOn && <AddVoiceModal onClose={handleModal}></AddVoiceModal>}
      </ModalPortal>
    </>
  );
};
const GalleryHeaderBox = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
`;
const AddPhotoAlbumBtn = styled.div`
  text-align: right;
  flex-grow: 1;
`;
const EditPhotoAlbumBtn = styled.div`
  text-align: right;
  /* flex-grow: 1; */
`;
export default VoiceHeader;
