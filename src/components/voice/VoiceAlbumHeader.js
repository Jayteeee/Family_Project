import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { FaPen } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

// 리덕스
import { useSelector } from "react-redux";

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
  CompletedEdit,
}) => {
  console.log("현재 가족Id:", familyId);
  console.log(familyId);

  // 앨범 추가하기 모달
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

  return (
    <>
      <AlbumHeaderBox>
        <Text
          size="40px"
          fontWeight="600"
          margin="10px 0 0 0"
          className="voiceHeaderBox"
        >
          음성 메시지
        </Text>
        {!isEdit ? (
          <BtnWrap>
            <VoiceAlbumBtn className="addAlbumBtn">
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
                onClick={handleModal}
              >
                <AddBtnText>
                  <FiPlus />
                  폴더 추가
                </AddBtnText>
              </Button>
            </VoiceAlbumBtn>
            <VoiceAlbumBtn>
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
                className="editAlbumBtn"
              >
                <EditBtnText>
                  <FaPen />
                  폴더 편집
                </EditBtnText>
              </Button>
            </VoiceAlbumBtn>
          </BtnWrap>
        ) : (
          <BtnWrap>
            <VoiceAlbumBtn>
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
                  EditVoiceAlbum();
                  CompletedEdit();
                  handleNotification("앨범수정");
                }}
                className="editAlbumBtn"
              >
                <CompletedEditBtnText>
                  <MdCheck />
                  편집 완료
                </CompletedEditBtnText>
              </Button>
            </VoiceAlbumBtn>
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
    .addAlbumBtn {
      display: none;
    }
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .editAlbumBtn {
      height: 35px;
      width: 140px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const VoiceAlbumBtn = styled.div`
  text-align: right;
  flex-grow: 1;
`;

const AddBtnText = styled.div`
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

export default VoiceAlbumHeader;
