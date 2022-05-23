import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { FaPen } from "react-icons/fa";
import { MdCheck } from "react-icons/md";

// 리덕스
import { useSelector } from "react-redux";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { AddPhotoAlbumModal } from "../../shared/modal/component/Gallery";

const GalleryHeader = ({
  NowFamilyId,
  PracticeEdit,
  isEdit,
  EditPhotoAlbum,
  CompletedEdit,
}) => {
  console.log("현재 가족Id:", NowFamilyId);

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
      receiverFamily: NowFamilyId,
      category: "갤러리",
      type,
    });
  };

  return (
    <>
      <GalleryHeaderBox>
        <Text
          size="40px"
          fontWeight="600"
          margin="10px 0 0 0"
          className="galleryHeaderBox"
        >
          갤러리
        </Text>
        {!isEdit ? (
          <BtnWrap>
            <PhotoAlbumBtn>
              <Button
                M
                borderRadius="8px"
                borderColor="transparent"
                bg="#6371F7"
                color="#fff"
                width="159px"
                height="56px"
                hover="#6971b2"
                margin="10px 0 0 0"
                onClick={handleModal}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                    marginBottom: "1px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      margin: "0px 5px 3px 0",
                    }}
                  >
                    +
                  </span>
                  앨범 추가
                </div>
              </Button>
            </PhotoAlbumBtn>
            <PhotoAlbumBtn>
              <Button
                M
                borderRadius="8px"
                borderColor="transparent"
                bg="#6371F7"
                color="#fff"
                width="159px"
                height="56px"
                hover="#6971b2"
                margin="10px 0 0 24px"
                onClick={PracticeEdit}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                    marginBottom: "1px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      margin: "0px 7px 0 0",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FaPen />
                  </span>
                  앨범 편집
                </div>
              </Button>
            </PhotoAlbumBtn>
          </BtnWrap>
        ) : (
          <BtnWrap>
            <PhotoAlbumBtn>
              <Button
                M
                borderRadius="8px"
                borderColor="transparent"
                bg="#6371F7"
                color="#fff"
                width="159px"
                height="56px"
                hover="#6971b2"
                margin="10px 0 0 0"
                onClick={() => {
                  EditPhotoAlbum();
                  CompletedEdit();
                  handleNotification("앨범수정");
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                    marginBottom: "1px",
                  }}
                >
                  <span
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "25px",
                      margin: "0px 5px 0 0",
                    }}
                  >
                    <MdCheck />
                  </span>
                  편집 완료
                </div>
              </Button>
            </PhotoAlbumBtn>
          </BtnWrap>
        )}
      </GalleryHeaderBox>
      {/* 앨범추가 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddPhotoAlbumModal
            onClose={handleModal}
            familyId={NowFamilyId}
          ></AddPhotoAlbumModal>
        )}
      </ModalPortal>
    </>
  );
};
// 반응형 시 헤더가 문제
const GalleryHeaderBox = styled.div`
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
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .galleryHeaderBox {
      font-size: 30px;
    }
    padding: 0;
    margin: 22px 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const PhotoAlbumBtn = styled.div`
  text-align: right;
  flex-grow: 1;
`;

const EditCompletedBtn = styled.div`
  max-width: 143px;
  max-height: 48px;
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

export default GalleryHeader;
