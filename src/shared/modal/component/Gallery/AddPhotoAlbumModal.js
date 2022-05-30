import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdClose } from "react-icons/md";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { Button, Text, Input } from "../../../../elements";
import { galleryActions } from "../../../../redux/modules/gallery";

const AddPhotoAlbumModal = ({ onClose, familyId }) => {
  const dispatch = useDispatch();

  // 현재 familyId

  //  앨범 제목 input
  const [photoAlbumName, setPhotoAlbumName] = useState("");
  const [showBorder, setShowBorder] = useState(false);

  const handleAlbumTitle = (e) => {
    const { value } = e.target;
    setPhotoAlbumName(value);
  };

  const resetAlbunName = () => {
    setPhotoAlbumName("");
  };

  const addPhotoAlbum = () => {
    if (photoAlbumName) {
      dispatch(galleryActions.addPhotoAlbumDB(familyId, photoAlbumName));
      onClose();
    } else {
      alert("앨범 제목을 입력하지 않았습니다.");
    }
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
      category: "갤러리",
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
            // history.replace()
          }}
        >
          <Content
            // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
            onClick={(e) => {
              e.stopPropagation();
              setShowBorder(false);
            }}
          >
            <AddPhotoAlbumWrap>
              <AddPhotoAlbumTitleBox>
                <AddPhothAlbumHeader>
                  <Text size="18px" fontWeight="600">
                    새 앨범 만들기
                  </Text>
                  <CancelBtn
                    className="flex-row"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <MdClose />
                  </CancelBtn>
                </AddPhothAlbumHeader>
                <hr />
                <InputBox show={showBorder}>
                  <InsertBox>
                    <Text B2 color="#757575">
                      새 앨범명
                    </Text>
                    <Input
                      id="albumName"
                      size="24px"
                      onChange={handleAlbumTitle}
                      value={photoAlbumName}
                      style={{
                        border: "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBorder(true);
                      }}
                    />
                  </InsertBox>
                  <ResetBox
                    show={showBorder}
                    onClick={(e) => {
                      e.stopPropagation();
                      resetAlbunName();
                    }}
                  >
                    <MdCancel />
                  </ResetBox>
                </InputBox>
                <Text size="14px" margin="24px 10px">
                  앨범 생성 후 사진을 넣어주세요.
                </Text>
              </AddPhotoAlbumTitleBox>

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
                    addPhotoAlbum();
                    handleNotification("앨범생성");
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
                >
                  저장
                </Button>
              </ButtonWrap>
            </AddPhotoAlbumWrap>
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
  height: 348px;
  max-width: 475px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 24px;
  position: relative;
  overflow: scroll;
`;

const AddPhotoAlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const AddPhotoAlbumTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-size: 18px;
  width: 100%;
  margin-top: 3px;
  * & > hr {
    border: none;
    padding: 24px 0;
  }
`;

const AddPhothAlbumHeader = styled.div`
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

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 76px;
  padding: 0 16px;
  border: ${({ show }) => (show ? `2px solid #6371F7` : `2px solid #E5E5E5`)};
  border-radius: 8px;
`;

const InsertBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  & > input:focus {
    box-shadow: none;
  }
  & > input:focus-visible {
    outline: none;
  }
`;

const ResetBox = styled.div`
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    display: ${({ show }) => (show ? null : "none")};
    width: 100%;
    height: 100%;
    color: #757575;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  .cancelBtn {
    background-color: rgba(219, 219, 219, 1);
    cursor: pointer;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
export default AddPhotoAlbumModal;
