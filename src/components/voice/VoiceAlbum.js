import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdRemoveCircleOutline, MdRemoveCircle } from "react-icons/md";

// 엘리먼트
import { Text, Input } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { voiceActions } from "../../redux/modules/voice";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeleteVoiceAlbumModal } from "../../shared/modal/component/voiceModal";

// 이미지
import noImage from "../../shared/images/noImage.png";
import albumCover1 from "../../shared/images/albumCover1.png";
import albumCover2 from "../../shared/images/albumCover2.jpg";
import albumCover3 from "../../shared/images/albumCover3.webp";
import albumCover4 from "../../shared/images/albumCover4.png";

// 컴포넌트
import VoiceAlbumHeader from "./VoiceAlbumHeader";

const VoiceAlbum = ({ PracticeEdit, isEdit, familyId }) => {
  const dispatch = useDispatch();
  console.log("현재 가족Id:", familyId);

  // 갤러리 앨범 리스트
  const voiceAlbumList = useSelector((state) => state.voice.nowVoiceData);
  console.log("음성 앨범 리스트:", voiceAlbumList);

  // const nowPhotoAlbum = `${({ AlbumName }) => `${AlbumName};`}`;

  // console.log(nowPhotoAlbum);
  //  앨범 제목 input
  const [voiceAlbumName, setVoiceAlbumName] = useState("");
  const [voiceAlbumId, setVoiceAlbumId] = useState("");

  const handleAlbumName = (e) => {
    const { value } = e.target;
    const { id } = e.target;
    setVoiceAlbumName(value);
    setVoiceAlbumId(id);
  };

  console.log(
    "선택한 앨범이름:",
    voiceAlbumName,
    "선택한 앨범Id:",
    voiceAlbumId
  );

  const EditVoiceAlbum = () => {
    if (voiceAlbumName) {
      dispatch(
        voiceActions.editVoiceAlbumDB(familyId, voiceAlbumId, voiceAlbumName)
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

  return (
    <>
      <VoiceAlbumHeader
        familyId={familyId}
        PracticeEdit={PracticeEdit}
        isEdit={isEdit}
        EditVoiceAlbum={EditVoiceAlbum}
      />
      {!isEdit ? (
        <Container>
          {voiceAlbumList &&
            voiceAlbumList.map((v, i) => {
              return (
                <Figure
                  key={i}
                  onClick={() => {
                    console.log(familyId);
                    history.push(
                      `/family/${familyId}/voiceMsg/${v.voiceAlbumId}`
                    );
                  }}
                  voiceAlbumId={voiceAlbumId}
                  familyId={familyId}
                  isEdit={isEdit}
                  PracticeEdit={PracticeEdit}
                >
                  <div>
                    <ImageBox
                      // alt="#"
                      src={
                        v.voiceAlbumCover == "albumCover1"
                          ? albumCover1
                          : v.voiceAlbumCover == "albumCover2"
                          ? albumCover2
                          : v.voiceAlbumCover == "albumCover3"
                          ? albumCover3
                          : v.voiceAlbumCover == "albumCover4"
                          ? albumCover4
                          : noImage
                      }
                    />
                    <Text size="24px" fontWeight="600">
                      {v.voiceAlbumName}
                    </Text>
                  </div>
                </Figure>
              );
            })}
        </Container>
      ) : (
        <Container>
          {voiceAlbumList &&
            voiceAlbumList.map((v) => {
              return (
                <div key={v.voiceAlbumId}>
                  <EditFigure>
                    <EditImageBox
                      // alt="#"
                      src={
                        v.voiceAlbumCover == "albumCover1"
                          ? albumCover1
                          : v.voiceAlbumCover == "albumCover2"
                          ? albumCover2
                          : v.voiceAlbumCover == "albumCover3"
                          ? albumCover3
                          : v.voiceAlbumCover == "albumCover4"
                          ? albumCover4
                          : noImage
                      }
                      onClick={(e) => {
                        handleAlbumName(e);
                      }}
                      id={v.voiceAlbumId}
                    />
                    <DeleteIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModal();
                      }}
                    >
                      <MdRemoveCircle />
                    </DeleteIcon>
                  </EditFigure>
                  <Input
                    text_align="center"
                    size="24px"
                    placeholder={v.voiceAlbumName}
                    fontWeight="600"
                    borderColor="transparnt"
                    margin="10px 0"
                    onChange={handleAlbumName}
                    id={v.voiceAlbumId}
                  />
                </div>
              );
            })}
        </Container>
      )}
      <ModalPortal>
        {modalOn && (
          <DeleteVoiceAlbumModal
            onClose={handleModal}
            voiceAlbumId={voiceAlbumId}
          ></DeleteVoiceAlbumModal>
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

export default VoiceAlbum;
