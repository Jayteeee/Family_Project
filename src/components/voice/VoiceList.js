import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { voiceActions } from "../../redux/modules/voice";

// 컴포넌트
import VoiceHeader from "../../components/voice/VoiceHeader";
import Audio from "./Audio";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import AlertModal from "../../shared/modal/component/AlertModal";
import AddVoiceModal from "../../shared/modal/component/voiceModal/AddVoiceModal";

// 엘리먼트
import { Text } from "../../elements";

// 이미지
import L_voicemail from "../../shared/images/L_voicemail.svg";
import S_voicemail from "../../shared/images/S_voicemail.svg";

const VoiceList = ({ voiceAlbumId, familyId }) => {
  const dispatch = useDispatch();

  const voiceAlbumName = useSelector(
    (state) => state.voice.voiceList.voiceAlbumName
  );

  const voiceList = useSelector((state) => state.voice?.voiceFileList);

  const [isEdit, setIsEdit] = useState(false);

  const PracticeEdit = () => {
    if (voiceList?.length !== 0) {
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

  // 음성 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(voiceActions.getVoiceListDB(voiceAlbumId));
  }, [voiceList?.length]);
  return (
    <>
      <VoiceHeader
        voiceAlbumId={voiceAlbumId}
        familyId={familyId}
        PracticeEdit={PracticeEdit}
        CompletedEdit={CompletedEdit}
        isEdit={isEdit}
        voiceAlbumName={voiceAlbumName}
      />
      {!isEdit ? (
        <>
          {voiceList.length !== 0 ? (
            <div>
              {voiceList?.map((v) => {
                return (
                  <Audio
                    key={v.voiceFileId}
                    voiceAlbumId={voiceAlbumId}
                    familyId={familyId}
                    isEdit={isEdit}
                    PracticeEdit={PracticeEdit}
                    voiceList={v}
                  ></Audio>
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
                  onClick={() => {
                    setModalOn(true);
                  }}
                >
                  +
                </label>
              </FloatingButton>
            </div>
          ) : (
            <NoneContentWrap>
              <NoneContentBox>
                <NoneContentItem>
                  <EmptyContentImg
                    src={L_voicemail}
                    S_voicemail={S_voicemail}
                  />
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
                  onClick={() => {
                    setModalOn(true);
                  }}
                >
                  +
                </label>
              </FloatingButton>
            </NoneContentWrap>
          )}
        </>
      ) : (
        <div>
          {voiceList?.map((v) => {
            return (
              <Audio
                key={v.voiceFileId}
                voiceAlbumId={voiceAlbumId}
                familyId={familyId}
                isEdit={isEdit}
                PracticeEdit={PracticeEdit}
                voiceList={v}
              ></Audio>
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
              onClick={() => {
                setModalOn(true);
              }}
            >
              +
            </label>
          </FloatingButton>
        </div>
      )}
      {/* 앨범 편집 알람 */}
      <ModalPortal>
        {alertOn && (
          <AlertModal
            onClose={handleAlert}
            content={"아직 음성 메시지가 없어요."}
          ></AlertModal>
        )}
      </ModalPortal>
      {/* 음성추가 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddVoiceModal
            onClose={handleModal}
            familyId={familyId}
            voiceAlbumId={voiceAlbumId}
          ></AddVoiceModal>
        )}
      </ModalPortal>
    </>
  );
};

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

export default VoiceList;
