import React, { useState, useEffect, useRef } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdRemoveCircleOutline,
  MdRemoveCircle,
  MdArrowUpward,
  MdOutlineFavorite,
  MdFavoriteBorder,
  MdClose,
} from "react-icons/md";
import { RiArrowLeftSLine } from "react-icons/ri";
import { CgMoreVerticalAlt } from "react-icons/cg";

// 엘리먼트
import { Button, CircleImage, Text, Input } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { detailPhotoActions } from "../../redux/modules/detailphoto";
import { history } from "../../redux/configureStore";

// 이미지
import noImage from "../../shared/images/noImage.png";
import profileImg from "../../shared/images/profileImg.png";

// 컴포넌트
import PhotoHeader from "./PhotoHeader";
import DetailPhotoHeader from "./DetailPhotoHeader";
import OneComment from "./OneComment";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeletePhotoModal } from "../../shared/modal/component/Gallery";

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
  console.log("상세 이미지 데이터:", detailPhotoData);

  const { detailPhoto } = detailPhotoData;
  console.log("상세 이미지:", detailPhoto);

  const { commentList } = detailPhotoData;
  console.log("코멘트리스트:", commentList);

  const { likeMemberList } = detailPhotoData;
  console.log("좋아요 맴버:", likeMemberList);

  const { PhotoAlbumName } = detailPhotoData;
  console.log("포토앨범이름:", PhotoAlbumName);

  const nowUserId = useSelector((state) => state.user.user.user?.userId);
  console.log("현재 userID:", nowUserId);

  const [comment, setComment] = useState("");

  console.log("댓글내용:", comment);
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

  console.log("좋아요", like);
  console.log(detailPhotoData.likeChk);

  const nowLikeMember = {
    familyMemberNickname: detailPhoto?.userInfo.familyMemberNickname,
    profileImg: detailPhoto?.userInfo.profileImg,
  };

  const [likeMember, setLikeMember] = useState(nowLikeMember);

  console.log("좋아요 누른 유저:", likeMember);

  const addlike = () => {
    dispatch(
      detailPhotoActions.addLikeDB(
        NowFamilyId,
        photoId,
        detailPhotoData.likeChk
      )
    );

    if (like) {
      dispatch(detailPhotoActions.addLikeMember(likeMember));
    } else {
      dispatch(detailPhotoActions.addLikeMember(false));
    }
  };

  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(detailPhotoActions.getDetailPhotoDB(photoId));
  }, []);

  return (
    <>
      <DetailPhotoHeader
        NowFamilyId={NowFamilyId}
        photoAlbumId={photoAlbumId}
        PracticeEdit={PracticeEdit}
        photoAlbumName={PhotoAlbumName}
        isEdit={isEdit}
      />
      {!isEdit ? (
        <Container>
          <ContentBox>
            <ImageWrap
              style={{
                // width: "100%",
                // height: "100%",
                position: "relative",
              }}
              img={noImage}
            >
              <ImageBox
                id="image"
                src={detailPhoto?.photoFile ? detailPhoto.photoFile : noImage}
                onClick={() => {
                  // history.push(`/detail/${p._id}`);
                }}
              />
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
                  }}
                >
                  <MdFavoriteBorder />
                </UnLikeBtn>
              ) : (
                <LikeBtn
                  onClick={() => {
                    handleLike();
                    addlike();
                  }}
                >
                  <MdOutlineFavorite />
                </LikeBtn>
              )}
            </ImageWrap>
            <CommentBox>
              <CommentHeder>
                <div>
                  <CircleImage
                    XS
                    src={
                      detailPhoto?.userInfo.profileImg
                        ? detailPhoto?.userInfo.profileImg
                        : profileImg
                    }
                  />
                </div>
                <Text size="15px" padding="0 10px 0 10px" fontWeight="600">
                  {detailPhoto?.userInfo.familyMemberNickname}
                </Text>
                <PhotoDeleteBtn
                  onClick={() => {
                    // handleModalPosition(e);
                    handleModal();
                  }}
                >
                  {nowUserId === detailPhoto?.userId && (
                    <CgMoreVerticalAlt style={{ fontSize: "30px" }} />
                  )}
                </PhotoDeleteBtn>
              </CommentHeder>
              <CommentListBox>
                {commentList?.length ? (
                  commentList.map((c) => {
                    return <OneComment {...c} key={c._id} />;
                  })
                ) : (
                  <Text size="15px">아직 작성된 댓글이 없어요.</Text>
                )}
              </CommentListBox>
              <LikeMemberBox>
                {likeMemberList &&
                  likeMemberList.map((l, i) => {
                    return (
                      <div style={{ position: "relative" }} key={i}>
                        <CircleImage
                          XS
                          src={l.profileImg ? l.profileImg : profileImg}
                          margin="0 5px 0 0"
                        />
                        {/* {myMissionChk ?  */}
                        <MdOutlineFavorite />
                        {/* : <UncompletedCicle />} */}
                        <div>
                          <MdOutlineFavorite />
                        </div>
                      </div>
                    );
                  })}
              </LikeMemberBox>
              <CommentFooter>
                <CircleImage XS margin="0 10px 0 0" />
                <Comment>
                  {/* <Input
                    // type="textarea"
                    text_align="left"
                    size="12px"
                    height="24px"
                    placeholder="댓글을 달아보세요"
                    bg="#F5F5F5"
                    borderColor="transparnt"
                    margin="10px 0"
                    padding="0 0 0 10px"
                    // onChange={handleAlbumName}
                    // id={p.photoAlbumId}
                  /> */}
                  <CommentTextarea
                    placeholder="댓글을 달아보세요"
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
                      background: `${comment ? "#8c98f8" : ""}`,
                      color: `${comment ? "#FFF" : ""}`,
                    }}
                    disabled={!comment}
                    onClick={submitComment}
                  />
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
  /* width: 100%; */
  padding: 24px;
  /* height: 100%; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: #fff;
  /* position: relative; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    flex-direction: column;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const ImageWrap = styled.div`
  width: 100%;
`;

const ImageBox = styled.img`
  width: 100%;
  background-size: cover;
  height: 100%;
  // Medium (Desktop)
  object-fit: cover;
  @media screen and (max-width: 1199px) {
    flex-direction: column;
    width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: auto;
  border: 1px solid #dbdbdb;
  height: 100%;
  width: 35%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    flex-direction: column;
    width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const CommentHeder = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  min-height: 45px;
  max-height: 45px;
  padding-left: 10px;
  border-bottom: 1px solid #dbdbdb;
  position: relative;
`;

const PhotoDeleteBtn = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  right: 0;
  width: 30px;
  height: 40px;
  align-items: center;
  border: none;
  border-radius: 10px;
  margin-right: 5px;
  color: #757575;
  &:hover {
    background: #f5f5f5;
    color: black;
  }
`;

const CommentListBox = styled.div`
  height: 60vh;
  overflow-y: scroll;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 35vh;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
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

const UnLike = styled.div`
  svg {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    border: none;
    background-color: #f4cc4d;
    position: absolute;
    top: 12px;
    right: 2px;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dbdbdb;
  width: 100%;
  height: 10%;
  min-height: 45px;
  max-height: 45px;
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
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  height: 30px;
  width: 95%;
  padding: 10px 35px 10px 0;
  border-radius: 8px;
`;

const CommentTextarea = styled.textarea`
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0px #8c98f8, 0 0 0 2px #8c98f8;
  }
  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: 24px;
  padding: 5px 0 0 10px;
  margin: 10px 0;
  text-align: left;
  background-color: #f5f5f5;
  font-size: 12px;
  ${({ border }) => (border ? `border: ${border};` : "border: none")};
  border: 2px solid transparnt;
  border-radius: 4px;
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
  margin: 10px;
  padding: 2px;
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
  margin: 10px;
  padding: 2px;
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
  width: 20px;
  height: 20px;
  border-radius: 4px;
  text-align: left;
  position: absolute;
  left: 0;
  top: 0;
  margin: 10px;
  align-items: center;
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

export default DetailPhoto;
