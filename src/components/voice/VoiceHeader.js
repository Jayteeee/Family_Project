import React, { useRef, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { FiPlus } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import { MdCheck, MdError, MdErrorOutline } from "react-icons/md";

// 리덕스
import { useDispatch } from "react-redux";
import { voiceActions } from "../../redux/modules/voice";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import AddVoiceModal from "../../shared/modal/component/voiceModal/AddVoiceModal";

const VoiceHeader = ({
  voiceAlbumId,
  familyId,
  PracticeEdit,
  isEdit,
  voiceAlbumName,
  CompletedEdit,
}) => {
  // 음성 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const [toolTipOn, setToolTipOn] = useState(false);

  return (
    <>
      <VoiceHeaderBox>
        <div
          style={{
            position: "relative",

            padding: "0 22px 0 0",
          }}
        >
          {voiceAlbumId ? (
            <Text
              size="40px"
              fontWeight="600"
              margin="10px 0 0 0"
              className="voiceHeaderBox"
            >
              {voiceAlbumName}
            </Text>
          ) : (
            <Text
              size="40px"
              fontWeight="600"
              margin="10px 0 0 0"
              className="voiceHeaderBox"
            >
              음성 메시지
            </Text>
          )}
          <InfoBox
            onMouseOver={() => setToolTipOn(true)}
            onMouseOut={() => setToolTipOn(false)}
          >
            <MdErrorOutline />
            {toolTipOn ? (
              <ToolTip>
                <Text C>현재 애플제품에서 서비스가 지원되지 않아요!</Text>
                <div className="triangle" />
              </ToolTip>
            ) : null}
          </InfoBox>
        </div>

        {!isEdit ? (
          <BtnWrap>
            <VoiceBtn className="addBtn">
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
                    onClick={() => {
                      setModalOn(true);
                    }}
                  >
                    <FiPlus />
                    음성 추가
                  </label>
                </Button>
              </label>
            </VoiceBtn>
            <VoiceBtn>
              <Button
                M
                borderRadius="8px"
                borderColor="transparent"
                bg="#6371F7"
                color="#fff"
                width="159px"
                height="56px"
                hover="#3245F5"
                margin="10px 0 0 24px"
                onClick={PracticeEdit}
                className="editBtn"
              >
                <EditBtnText>
                  <FaPen />
                  음성 편집
                </EditBtnText>
              </Button>
            </VoiceBtn>
          </BtnWrap>
        ) : (
          <BtnWrap>
            <VoiceBtn>
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
                onClick={() => {
                  CompletedEdit();
                }}
                className="editBtn"
              >
                <CompletedEditBtnText>
                  <MdCheck />
                  편집 완료
                </CompletedEditBtnText>
              </Button>
            </VoiceBtn>
          </BtnWrap>
        )}
      </VoiceHeaderBox>
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

const VoiceHeaderBox = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
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
    .voiceHeaderBox {
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

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    .addBtn {
      display: none;
    }
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .editBtn {
      height: 35px;
      width: 140px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const VoiceBtn = styled.label`
  text-align: right;
  flex-grow: 1;

  svg {
    font-size: 20px;
    margin-right: 5px;
  }
`;

const EditBtnText = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 1px;
  svg {
    font-size: 15px;
    margin-right: 7px;
  }

  // Small (Tablet)
  @media only screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 17px;
    svg {
      font-size: 13px;
      margin-right: 7px;
    }
  }
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
    background: #6371f7;
    color: #fff;
    border: none;
  }

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    margin-top: 10px;
    width: 160px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 80px;
    padding: 12px 12px;
    margin-left: 16px;
    height: 40px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    height: 40px;
    width: 80px;
    margin-left: 8px;
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
    background: #6371f7;
    color: #fff;
    border: none;
  }

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    margin-top: 10px;
    width: 160px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 80px;
    padding: 12px 12px;
    margin-left: 16px;
    height: 40px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    height: 40px;
    width: 80px;
    margin-left: 8px;
  }
`;

const EditCompletedBtn = styled.div`
  width: 143px;
  height: 48px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-left: 24px;
  border: none;
  background: #6371f7;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: black;
    color: #fff;
    border: none;
  }

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    margin-top: 10px;
    width: 160px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const CompletedEditBtnText = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 1px;
  svg {
    font-size: 20px;
    margin-right: 5px;
  }

  // Small (Tablet)
  @media only screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 17px;
    svg {
      font-size: 18px;
      margin-right: 7px;
    }
  }
`;

const InfoBox = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  top: 5px;
  svg {
    width: 100%;
    height: 100%;
    color: rgba(168, 168, 168, 1);
    :hover {
      color: rgba(66, 66, 66, 1);
    }
  }
`;

const ToolTip = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  left: 22px;
  top: 12px;
  color: rgba(117, 117, 117, 1);
  background-color: rgba(99, 113, 247, 1);
  border-radius: 2px;
  padding: 10px 20px;
  z-index: 999;
  P {
    color: white;
  }
  svg {
    margin-left: 18px;
    color: white;
    cursor: pointer;
  }
  /* .triangle {
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    border-right: 8px solid rgba(99, 113, 247, 1);
    position: absolute;
    left: -5%;
  } */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* bottom: 90px;
    left: unset;
    right: 10px;
    .triangle {
      border-bottom: unset;
      border-top: 8px solid rgba(99, 113, 247, 1);
      left: unset;
      right: 20%;
      top: 95%;
    } */
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

export default VoiceHeader;
