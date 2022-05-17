import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdClose } from "react-icons/md";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch } from "react-redux";

// 엘리먼트
import { Button, Text, Input } from "../../../../elements";
import { voiceActions } from "../../../../redux/modules/voice";
import albumCover1 from "../../../images/albumCover1.jpg";
import albumCover2 from "../../../images/albumCover2.jpg";
import albumCover3 from "../../../images/albumCover3.jpg";
import albumCover4 from "../../../images/albumCover4.jpg";

const AddVoiceAlbumModal = ({ onClose, familyId }) => {
  const dispatch = useDispatch();

  // 현재 familyId
  console.log("현재 familyId:", familyId);
  console.log(familyId);

  //  앨범 제목 input
  const [voiceAlbumName, setVoiceAlbumName] = useState("");
  const [showBorder, setShowBorder] = useState(false);
  const [showBorder2, setShowBorder2] = useState(false);
  const [voiceAlbumCover, setPreview] = useState(albumCover1);
  const [coverName, setCoverName] = useState("albumCover1");

  const handleAlbumTitle = (e) => {
    const { value } = e.target;
    setVoiceAlbumName(value);
  };

  console.log("앨범 이름:", voiceAlbumName);

  const resetAlbunName = () => {
    setVoiceAlbumName("");
  };
  const resetPreview = () => {
    setPreview(albumCover1);
  };

  const addVoiceAlbum = () => {
    if (voiceAlbumName) {
      dispatch(
        voiceActions.addVoiceAlbumDB(familyId, voiceAlbumName, coverName)
      );
      onClose();
    } else {
      alert("앨범 제목을 입력하지 않았습니다.");
    }
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
              setShowBorder2(false);
            }}
          >
            <AddVoiceAlbumWrap>
              <AddVoiceAlbumTitleBox>
                <AddVoiceAlbumHeader>
                  <Text size="18px" fontWeight="600">
                    새 폴더 만들기
                  </Text>
                  <CancelBtn
                    className="flex-row"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <MdClose />
                  </CancelBtn>
                </AddVoiceAlbumHeader>
                <hr />
                <InputBox show={showBorder}>
                  <InsertBox>
                    <Text B2 color="#757575">
                      새 폴더명
                    </Text>
                    <Input
                      id="albumName"
                      size="24px"
                      onChange={handleAlbumTitle}
                      value={voiceAlbumName}
                      style={{
                        border: "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBorder(true);
                        setShowBorder2(false);
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
                <ThumbBox show={showBorder2}>
                  <InsertBox2
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBorder(false);
                      setShowBorder2(true);
                    }}
                  >
                    <FolderName>
                      <Text size="14px">새 폴더 썸네일</Text>
                    </FolderName>
                    <AlbumCover>
                      <Preview>
                        <img
                          alt="#"
                          value="albumCover1"
                          src={voiceAlbumCover}
                        />
                      </Preview>
                      <ImageBox>
                        <img
                          alt="#"
                          value="albumCover1"
                          src={albumCover1}
                          onClick={() => {
                            setPreview(albumCover1);
                            setCoverName("albumCover1");
                          }}
                        />
                        <img
                          alt="#"
                          value="albumCover2"
                          src={albumCover2}
                          onClick={() => {
                            setPreview(albumCover2);
                            setCoverName("albumCover2");
                          }}
                        />
                        <img
                          alt="#"
                          value="albumCover3"
                          src={albumCover3}
                          onClick={() => {
                            setPreview(albumCover3);
                            setCoverName("albumCover3");
                          }}
                        />
                        <img
                          alt="#"
                          value="albumCover4"
                          src={albumCover4}
                          onClick={() => {
                            setPreview(albumCover4);
                            setCoverName("albumCover4");
                          }}
                        />
                      </ImageBox>
                    </AlbumCover>
                  </InsertBox2>
                  <ResetBox
                    show={showBorder2}
                    onClick={(e) => {
                      e.stopPropagation();
                      resetPreview();
                    }}
                  >
                    <MdCancel />
                  </ResetBox>
                </ThumbBox>
              </AddVoiceAlbumTitleBox>

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
                  onClick={addVoiceAlbum}
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
                  저장
                </Button>
              </ButtonWrap>
            </AddVoiceAlbumWrap>
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
  height: 582px;
  max-width: 475px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 24px;
  position: relative;
  overflow: scroll;
`;

const AddVoiceAlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const AddVoiceAlbumTitleBox = styled.div`
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

const AddVoiceAlbumHeader = styled.div`
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
  border: ${({ show }) => (show ? `2px solid #8c98f8` : `2px solid #E5E5E5`)};
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

const ThumbBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 266px;
  margin-top: 30px;
  padding: 0 16px;
  border: ${({ show }) => (show ? `2px solid #8c98f8` : `2px solid #E5E5E5`)};
  border-radius: 8px;
`;

const InsertBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const FolderName = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: start;
  margin: -30px 0 30px;
  width: 100%;
`;

const AlbumCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.div`
  width: 182px;
  max-width: 182px;
  height: 182px;
  max-height: 182px;
  margin-right: 16px;
  & > img {
    width: 100%;
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 118px;
  & > img {
    width: 55px;
    margin: auto;
    cursor: pointer;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
`;
export default AddVoiceAlbumModal;
