import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { AddVoiceAlbumModal } from "../../shared/modal/component/voiceModal";

const VoiceAlbumHeader = ({
  familyId,
  PracticeEdit,
  isEdit,
  EditVoiceAlbum,
}) => {
  console.log("현재 가족Id:", familyId);
  console.log(familyId);

  // 앨범 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <AlbumHeaderBox>
        <Text
          size="40px"
          fontWeight="700"
          margin="10px 0 0 0"
          className="res-galleryHeaderBox"
        >
          음성메시지
        </Text>
        {!isEdit ? (
          <BtnWrap>
            <VoiceAlbumBtn
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={handleModal}
            >
              <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>
              추가
            </VoiceAlbumBtn>
            <VoiceAlbumBtn
              onClick={PracticeEdit}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>
              편집
            </VoiceAlbumBtn>
          </BtnWrap>
        ) : (
          <BtnWrap>
            <EditCompletedBtn
              onClick={() => {
                EditVoiceAlbum();
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
      </AlbumHeaderBox>
      {/* 앨범추가 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddVoiceAlbumModal
            onClose={handleModal}
            familyId={familyId}
          ></AddVoiceAlbumModal>
        )}
      </ModalPortal>
    </>
  );
};
// 반응형 시 헤더가 문제
const AlbumHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
  width: 100%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* grid-template-columns: repeat(3, 1fr);
    column-gap: 2%; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    padding: 24px;
    width: 74%; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* grid-template-columns: repeat(2, 1fr);
    column-gap: 2%;
    padding: 16px; */
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 40px;
`;

const VoiceAlbumBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: 1px solid black;
  font-weight: 600;
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

export default VoiceAlbumHeader;