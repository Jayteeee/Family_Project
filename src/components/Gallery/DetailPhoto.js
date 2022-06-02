import React, { useState, useEffect, useRef } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdRemoveCircle,
  MdArrowUpward,
  MdOutlineFavorite,
  MdFavoriteBorder,
  MdDeleteForever,
} from "react-icons/md";
import { RiArrowLeftSLine } from "react-icons/ri";
import dayjs from "dayjs";

// 엘리먼트
import { Text, RactangleImage } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { detailPhotoActions } from "../../redux/modules/detailphoto";
import { history } from "../../redux/configureStore";

// 이미지
import noImage from "../../shared/images/noImage.png";
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";

// 컴포넌트
import DetailPhotoHeader from "./DetailPhotoHeader";
import OneComment from "./OneComment";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeletePhotoModal } from "../../shared/modal/component/Gallery";
import { familyMemberActions } from "../../redux/modules/familymember";

const DetailPhoto = ({
  photoAlbumId,
  NowFamilyId,
  isEdit,
  PracticeEdit,
  photoId,
}) => {
  const dispatch = useDispatch();

  const detailPhotoData = useSelector(
    (state) => state.detailPhoto.nowPhotoDetail
  );

  const { detailPhoto } = detailPhotoData;

  const { commentList } = detailPhotoData;

  const { likeMemberList } = detailPhotoData;

  const { PhotoAlbumName } = detailPhotoData;

  const nowUserId = useSelector((state) => state.user.user.user?.userId);

  let createdAt = dayjs(new Date(detailPhoto?.createdAt)).format(
    "YYYY년 M월 DD일"
  );

  const { familyMemberList } = useSelector((state) => state.familymember);
  const nowUserNickname = familyMemberList?.find(
    (m) => m?.userId === nowUserId
  )?.familyMemberNickname;

  const [comment, setComment] = useState("");

  const submitComment = () => {
    dispatch(
      detailPhotoActions.addCommentDB(
        NowFamilyId,
        photoAlbumId,
        photoId,
        comment
      )
    );
    setComment("");
  };

  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const userId = useSelector((state) => state.user.user.user?.userId);

  const userProfile = useSelector((state) => state.user.user.user?.profileImg);

  const addlike = () => {
    dispatch(
      detailPhotoActions.addLikeDB(
        NowFamilyId,
        photoId,
        detailPhotoData.likeChk,
        userId
      )
    );
  };

  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(detailPhotoActions.getDetailPhotoDB(NowFamilyId, photoId));
    dispatch(familyMemberActions.getFamilyMemberDB(NowFamilyId));
    setHeight(ref.current.clientHeight);
  }, [detailPhotoData.likeChk, userProfile]);

  // socket 부분

  let socket = useSelector((state) => state.socket.socket);

  const handleLikeNoti = (type) => {
    socket.emit("sendLikeNoti", {
      photoId: photoId,
      senderName: nowUserNickname,
      senderId: nowUserId,
      receiverId: detailPhoto.userId,
      type,
      category: "갤러리",
      likeChk: !detailPhotoData.likeChk,
    });
  };

  const handleCommentNoti = (type) => {
    socket.emit("sendCommentNoti", {
      photoId: photoId,
      senderName: nowUserNickname,
      senderId: nowUserId,
      receiverId: detailPhoto.userId,
      type,
      category: "갤러리",
    });
  };

  // 스크롤
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [height, setHeight] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const imageHeight = () => {
    const image = document.getElementById("photoImage");
    // console.log(image.height);
    // console.log(image);
    setImgHeight(image.height);
  };
  const ref = useRef(null);
  console.log("사진 높이:", height);
  console.log("사진 높이2:", imgHeight);
  console.log("ref:", ref.current);

  // useEffect(() => {
  //   setHeight(ref.current.clientHeight);
  //   imageHeight();
  // }, [detailPhoto?.photoFile]);

  return (
    <>
      <div className="detailPhotoHeader">
        <DetailPhotoHeader
          NowFamilyId={NowFamilyId}
          photoAlbumId={photoAlbumId}
          PracticeEdit={PracticeEdit}
          photoAlbumName={PhotoAlbumName}
          isEdit={isEdit}
        />
      </div>
      {!isEdit ? (
        <Container>
          <ContentBox>
            <ImageContentBox>
              <ContentBoxHeader>
                <BackBtn
                  onClick={() => {
                    history.push(
                      `/family/${NowFamilyId}/gallery/${PhotoAlbumName}/${photoAlbumId}`
                    );
                  }}
                >
                  <RiArrowLeftSLine />
                </BackBtn>
                {!detailPhotoData.likeChk ? (
                  <UnLikeBtn
                    onClick={() => {
                      handleLike();
                      addlike();
                      handleLikeNoti("좋아요");
                    }}
                  >
                    <MdFavoriteBorder />
                  </UnLikeBtn>
                ) : (
                  <LikeBtn
                    onClick={() => {
                      handleLike();
                      addlike();
                      handleLikeNoti("좋아요");
                    }}
                  >
                    <MdOutlineFavorite />
                  </LikeBtn>
                )}
              </ContentBoxHeader>
              <div>
                {/* <ImageWrap
                  style={{
                    position: "relative",
                  }}
                  img={noImage}
                > */}
                <ImageBox
                  id="photoImage"
                  ref={ref}
                  src={detailPhoto?.photoFile ? detailPhoto.photoFile : noImage}
                  onClick={() => {}}
                />
                {/* </ImageWrap> */}
              </div>
              <ContentBoxFooter />
            </ImageContentBox>
            <CommentBox>
              <CommentHeder userChk={nowUserId === detailPhoto?.userId}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#757575",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <RactangleImage
                    S
                    size="24px"
                    borderRadius="8.4px"
                    src={
                      detailPhoto?.userInfo.profileImg === "Profile01"
                        ? Profile01
                        : detailPhoto?.userInfo.profileImg === "Profile02"
                        ? Profile02
                        : detailPhoto?.userInfo.profileImg === "Profile03"
                        ? Profile03
                        : detailPhoto?.userInfo.profileImg === "Profile04"
                        ? Profile04
                        : detailPhoto?.userInfo.profileImg === "Profile05"
                        ? Profile05
                        : detailPhoto?.userInfo.profileImg
                        ? detailPhoto?.userInfo.profileImg
                        : Profile01
                    }
                  />
                  <Text size="15px" padding="0 10px 0 10px" fontWeight="600">
                    {detailPhoto?.userInfo.familyMemberNickname}
                  </Text>
                </div>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#757575",
                    marginRight: "10px",
                  }}
                  className="photoCreatedAt"
                >
                  {createdAt}
                </p>
                {nowUserId === detailPhoto?.userId && (
                  <PhotoDeleteBtn
                    onClick={() => {
                      handleModal();
                    }}
                    className="photoDeleteBtn"
                  >
                    <MdDeleteForever style={{ fontSize: "30px" }} />
                  </PhotoDeleteBtn>
                )}
              </CommentHeder>
              <CommentListBox height={height}>
                {commentList?.length ? (
                  commentList.map((c) => {
                    return <OneComment {...c} key={c._id} />;
                  })
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text size="15px">아직 작성된 댓글이 없어요.</Text>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CommentListBox>
              <LikeMemberBox>
                {likeMemberList &&
                  likeMemberList.map((l, i) => {
                    return (
                      <div style={{ position: "relative" }} key={i}>
                        <RactangleImage
                          S
                          size="24px"
                          borderRadius="8.4px"
                          src={
                            l.profileImg === "Profile01"
                              ? Profile01
                              : l.profileImg === "Profile02"
                              ? Profile02
                              : l.profileImg === "Profile03"
                              ? Profile03
                              : l.profileImg === "Profile04"
                              ? Profile04
                              : l.profileImg === "Profile05"
                              ? Profile05
                              : l.profileImg
                              ? l.profileImg
                              : Profile01
                          }
                          margin="0 5px 0 0"
                        />
                        <MdOutlineFavorite />
                        <div>
                          <MdOutlineFavorite />
                        </div>
                      </div>
                    );
                  })}
              </LikeMemberBox>
              <CommentFooter>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    height: "30px",
                  }}
                >
                  <RactangleImage
                    S
                    size="24px"
                    borderRadius="8.4px"
                    margin="0 10px 0 0"
                    src={
                      userProfile === "Profile01"
                        ? Profile01
                        : userProfile === "Profile02"
                        ? Profile02
                        : userProfile === "Profile03"
                        ? Profile03
                        : userProfile === "Profile04"
                        ? Profile04
                        : userProfile === "Profile05"
                        ? Profile05
                        : userProfile
                        ? userProfile
                        : Profile01
                    }
                  />
                </div>
                <Comment>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CommentTextarea
                      placeholder="댓글을 달아보세요."
                      value={comment}
                      onChange={(e) => {
                        const { value } = e.target;
                        setComment(value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") submitComment();
                      }}
                    ></CommentTextarea>
                    <MdArrowUpward
                      style={{
                        background: `${comment ? "#6371F7" : ""}`,
                        color: `${comment ? "#FFF" : ""}`,
                      }}
                      disabled={!comment}
                      onClick={() => {
                        submitComment();
                        scrollToBottom();
                        handleCommentNoti("댓글");
                      }}
                    />
                  </div>
                </Comment>
              </CommentFooter>
            </CommentBox>
          </ContentBox>
        </Container>
      ) : (
        <Container>
          <EditFigure>
            <div>
              <EditImageBox
                alt="#"
                src={detailPhoto?.photoFile ? detailPhoto.photoFile : noImage}
              />
              <DeleteIcon onClick={handleModal}>
                <MdRemoveCircle />
              </DeleteIcon>
            </div>
          </EditFigure>
        </Container>
      )}
      <ModalPortal>
        {modalOn && (
          <DeletePhotoModal
            onClose={handleModal}
            photoId={photoId}
            NowFamilyId={NowFamilyId}
            PhotoAlbumName={PhotoAlbumName}
            photoAlbumId={photoAlbumId}
          ></DeletePhotoModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  padding: 40px;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 0px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    border-radius: 0;
    box-shadow: none;
  }
`;

const ImageContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const ContentBoxHeader = styled.div`
  width: 100%;
  height: 46px;
  padding: 10px;
  position: relative;
  top: 0;
`;

const ImageWrap = styled.div`
  width: 100%;
`;

const ImageBox = styled.img`
  width: 100%;
  /* background-size: cover;
  object-fit: cover; */

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ContentBoxFooter = styled.div`
  width: 100%;
  height: 46px;
  border: none;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: auto;
  height: 100%;
  width: 35%;

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    border: none;
    flex-direction: column;
    width: 100%;
  }
`;

const CommentHeder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  min-height: 45px;
  max-height: 45px;
  padding-left: 10px;
  border-bottom: 1px solid #dbdbdb;
  position: relative;
  ${({ userChk }) =>
    userChk
      ? `  &:hover {
    .photoDeleteBtn {
      display: flex;
    }
    .photoCreatedAt {
      margin-right: 30px !important;
    }
  }`
      : `  &:hover {
    .photoDeleteBtn {
      display: none;
    }
    `};
`;

const PhotoDeleteBtn = styled.div`
  cursor: pointer;
  right: 0;
  width: 20px;
  height: 30px;
  align-items: center;
  border: none;
  border-radius: 6px;
  margin-right: 5px;
  color: #c2c2c2;
  display: none;
  position: absolute;
  &:hover {
    background: #f5f5f5;
    color: #757575;
  }
`;

const CommentListBox = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  ${({ height }) => `height: ${height}px;`};
  /* height: 604px; */

  overflow-y: scroll;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 35vh;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 30vh;
  }
`;

const LikeMemberBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  width: 100%;
  height: 10%;
  min-height: 45px;
  max-height: 45px;
  padding-left: 10px;
  border-top: 1px solid #dbdbdb;
  svg {
    font-size: 12px;
    border-radius: 12px;
    border: none;
    position: absolute;
    top: 12px;
    right: 2px;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
  width: 100%;
  height: 10%;
  min-height: 50px;
  max-height: 50px;
  padding: 10px;
  position: relative;
  svg {
    width: 23px;
    height: 23px;
    color: black;
    background-color: white;
    border-radius: 4px;
    padding: 3px;
    position: absolute;
    right: 0;
    margin-right: 15px;

    &:hover {
      filter: brightness(70%);
    }
  }

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    min-height: 65px;
    max-height: 65px;
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  height: 30px;
  width: 100%;
  padding: 10px 35px 10px 0;
  border-radius: 8px;
`;

const CommentTextarea = styled.textarea`
  &:focus {
    box-shadow: none;
    outline: none !important;
    border-color: #6371f7 !important;
  }
  width: 100%;
  height: 24px;
  padding: 5px 0 0 10px;
  margin: 10px 0;
  text-align: left;
  background-color: #f5f5f5;
  font-size: 12px;
  ${({ border }) => (border ? `border: ${border};` : "border: none")};
  border: 2px solid transparnt;
  border-radius: 4px;
  resize: none;
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
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
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

const UnLikeBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  text-align: left;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  color: #5c5c5c;
  margin: 13px;
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

const LikeBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  text-align: left;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  color: #5c5c5c;
  margin: 13px;
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

const BackBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  text-align: left;
  position: absolute;
  left: 0;
  top: 0;
  margin: 7px;
  align-items: center;
  color: #5c5c5c;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
  svg {
    width: 30px;
    height: 30px;
    color: black;
  }
`;

export default DetailPhoto;
