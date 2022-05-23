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
import AlertModal from "../../shared/modal/component/AlertModal";
import { AddVoiceAlbumModal } from "../../shared/modal/component/voiceModal";

// 이미지
import emptyVoice from "../../shared/images/emptyVoice.svg";
import albumCover1 from "../../shared/images/albumCover1.svg";
import albumCover2 from "../../shared/images/albumCover2.svg";
import albumCover3 from "../../shared/images/albumCover3.svg";
import albumCover4 from "../../shared/images/albumCover4.svg";
import emptyContent from "../../shared/images/emptyContent.svg";

// 컴포넌트
import VoiceAlbumHeader from "./VoiceAlbumHeader";

const VoiceAlbum = ({ familyId }) => {
  const dispatch = useDispatch();
  console.log("현재 가족Id:", familyId);

  // 음성 앨범 리스트
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

  const handleVoiceAlbumId = (voiceAlbumId) => {
    // const { value } = e.target;
    // const { id } = e.target;
    // setVoiceAlbumName(value);
    setVoiceAlbumId(voiceAlbumId);
    setModalOn(!modalOn);
  };

  console.log(
    "선택한 앨범이름:",
    voiceAlbumName,
    "선택한 앨범Id:",
    voiceAlbumId
  );

  const EditVoiceAlbum = () => {
    dispatch(
      voiceActions.editVoiceAlbumDB(familyId, voiceAlbumId, voiceAlbumName)
    );
  };

  // 앨범 삭제하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

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
      receiverFamily: familyId,
      category: "음성메시지",
      type,
    });
  };

  const [isEdit, setIsEdit] = useState(false);

  const PracticeEdit = () => {
    if (voiceAlbumList.length !== 0) {
      setIsEdit(!isEdit);
    } else {
      handleAlert();
    }
  };

  const CompletedEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleAlert = () => {
    setAlertOn(!alertOn);
  };

  // 알림 모달
  const [alertOn, setAlertOn] = useState(false);

  // 앨범 추가하기 모달
  const [addAlbumModalOn, setAddAlbumModalOn] = useState(false);

  const addAlbumHandleModal = () => {
    setAddAlbumModalOn(!addAlbumModalOn);
  };

  return (
    <>
      <VoiceAlbumHeader
        familyId={familyId}
        PracticeEdit={PracticeEdit}
        CompletedEdit={CompletedEdit}
        isEdit={isEdit}
        EditVoiceAlbum={EditVoiceAlbum}
      />
      {!isEdit ? (
        <>
          {voiceAlbumList.length !== 0 ? (
            <Container>
              {voiceAlbumList.length !== 0 &&
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
                              : emptyVoice
                          }
                        />
                        <Text
                          size="24px"
                          fontWeight="600"
                          margin="5% 0 0 0"
                          className="albumName"
                        >
                          {v.voiceAlbumName}
                        </Text>
                      </div>
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
                  <EmptyContentImg src={emptyContent} />
                  <Text>아직 앨범이 없어요.</Text>
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
                          : emptyVoice
                      }
                      onClick={(e) => {
                        handleAlbumName(e);
                      }}
                      id={v.voiceAlbumId}
                    />
                    <DeleteIcon
                      onClick={() => {
                        handleVoiceAlbumId.bind(this, v.voiceAlbumId)();
                        handleNotification("앨범 삭제");
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
      {/* 앨범추가 모달 */}
      <ModalPortal>
        {addAlbumModalOn && (
          <AddVoiceAlbumModal
            onClose={addAlbumHandleModal}
            familyId={familyId}
          ></AddVoiceAlbumModal>
        )}
      </ModalPortal>
      {/* 앨범 편집 알람 */}
      <ModalPortal>
        {alertOn && (
          <AlertModal
            onClose={handleAlert}
            content={"아직 앨범이 없어요."}
          ></AlertModal>
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
  filter: brightness(70%);

  &:hover {
    border-radius: 13px;
    cursor: pointer;
    transform: scale(1.02);
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;

const EditImageBox = styled.div`
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
    padding: 16px;
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

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 50%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: 50%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 55%;
  }
`;

const NoneContentItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 10% 20% 0 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  & > p {
    font-size: 24px;
    font-weight: 600;
    position: absolute;
    top: 100px;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    & > p {
      font-size: 30px;
      font-weight: 600;
      position: absolute;
      top: 55px;
    }
    padding: 10% 15% 0 15%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    & > p {
      font-size: 20px;
      font-weight: 600;
      position: absolute;
      top: 50px;
    }
    padding: 10% 15% 0 15%;
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    & > p {
      font-size: 15px;
      font-weight: 600;
      position: absolute;
      top: 70px;
    }
    padding: 10% 15% 0 15%;
  }

  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    & > p {
      font-size: 15px;
      font-weight: 600;
      position: absolute;
      top: 50px;
    }
    padding: 10% 15% 0 15%;
  }
`;

const EmptyContentImg = styled.div`
  width: 100%;

  padding: 22.2%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
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

export default VoiceAlbum;
