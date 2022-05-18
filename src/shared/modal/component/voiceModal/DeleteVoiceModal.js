import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdClose } from "react-icons/md";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { Button, Text } from "../../../../elements";
import { voiceActions } from "../../../../redux/modules/voice";

const DeleteVoiceModal = ({ onClose, voiceFileId, familyId }) => {
  const dispatch = useDispatch();

  const deleteVoiceFile = () => {
    dispatch(voiceActions.deleteVoiceDB(voiceFileId));
    onClose();
  };

  console.log("음성메시지ID", voiceFileId);

  // socket 부분

  let socket = useSelector((state) => state.socket?.socket);

  const nowUserNickname = useSelector(
    (state) => state.user.user.user?.nickname
  );

  const handleNotification = (type) => {
    socket.emit("sendFamilyNoti", {
      senderName: nowUserNickname,
      receiverFamily: familyId,
      category: "음성메시지",
      type,
    });
  };

  return (
    <>
      <ModalPortal>
        <Background
          className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          >
            <DeleteVoiceFileWrap>
              <DeleteVoiceFileHeader>
                <Text size="18px" fontWeight="600">
                  정말 삭제하시겠습니까?
                </Text>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <MdClose />
                </CancelBtn>
              </DeleteVoiceFileHeader>
              <ButtonWrap>
                <Button
                  M
                  onClick={onClose}
                  borderColor="transparent"
                  bg="#DBDBDB"
                  color="#757575"
                  width="96px"
                  height="56px"
                  margin="30px 0 0 0"
                  fontSize="18px"
                  fontWeight="600"
                  borderRadius="8px"
                >
                  취소
                </Button>
                <Button
                  M
                  onClick={() => {
                    deleteVoiceFile();
                    handleNotification("음성메시지 삭제");
                  }}
                  borderColor="transparent"
                  bg="#8C98F8"
                  color="white"
                  width="96px"
                  height="56px"
                  margin="30px 0 0 10px"
                  fontSize="18px"
                  fontWeight="600"
                  borderRadius="8px"
                >
                  삭제
                </Button>
              </ButtonWrap>
            </DeleteVoiceFileWrap>
          </Content>
        </Background>
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 200px;
  max-width: 450px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 24px;
  position: relative;
  overflow: scroll;
`;

const DeleteVoiceFileWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const DeleteVoiceFileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 15px;
  margin-top: 15px;

  color: #5c5c5c;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
  svg {
    width: 24px;
    height: 24px;
    color: black;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
`;
export default DeleteVoiceModal;
