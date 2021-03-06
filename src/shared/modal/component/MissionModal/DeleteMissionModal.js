import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdClose } from "react-icons/md";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../../../../redux/modules/mission";

// 엘리먼트
import { Button, Text } from "../../../../elements";

const DeleteMissionModal = ({
  onClose,
  modalPosition,
  familyId,
  missionId,
}) => {
  const dispatch = useDispatch();
  // 미션 삭제 함수
  const deleteMission = () => {
    dispatch(missionActions.deleteMissionDB(familyId, missionId));
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
      category: "미션",
      type,
    });
  };

  return (
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
          <DeletePhotoAlbumWrap>
            <DeletePhothAlbumHeader>
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
            </DeletePhothAlbumHeader>
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
                className="cancelBtn"
              >
                취소
              </Button>
              <Button
                M
                onClick={() => {
                  deleteMission();
                  handleNotification("미션삭제");
                }}
                borderColor="transparent"
                bg="#6371F7"
                color="white"
                width="96px"
                height="56px"
                margin="30px 0 0 10px"
                fontSize="18px"
                fontWeight="600"
                borderRadius="8px"
                className="deleteBtn"
              >
                삭제
              </Button>
            </ButtonWrap>
          </DeletePhotoAlbumWrap>
        </Content>
      </Background>
      {/* <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
            deleteMission();
          }}
          X={modalPosition[0]}
          Y={modalPosition[1]}
        >
          삭제하기
        </Content>
      </Background> */}
    </ModalPortal>
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

const DeletePhotoAlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const DeletePhothAlbumHeader = styled.div`
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
  .deleteBtn {
    background-color: #6371f7;
    cursor: pointer;
    &:hover {
      background-color: #3245f5;
    }
  }
  .cancelBtn {
    background-color: rgba(219, 219, 219, 1);
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default DeleteMissionModal;
