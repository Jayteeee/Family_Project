import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdRemoveCircleOutline,
  MdRemoveCircle,
  MdArrowUpward,
  MdOutlineFavorite,
} from "react-icons/md";

// 엘리먼트
import { Button, CircleImage, Text, Input } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { detailPhotoActions } from "../../redux/modules/detailphoto";
import { history } from "../../redux/configureStore";

// 이미지
import noImage from "../../shared/images/noImage.png";
import profileImg from "../../shared/images/profileImg.png";
import { useParams } from "react-router-dom";
import PhotoHeader from "./PhotoHeader";

const DetailPhoto = ({
  photoAlbumId,
  NowFamilyId,
  isEdit,
  PracticeEdit,
  photoId,
  photoAlbumName,
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

  const { likeMember } = detailPhotoData;

  console.log("좋아요 맴버:", likeMember);

  // 앨범 삭제하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(detailPhotoActions.getDetailPhotoDB(photoId));
  }, []);

  const params = useParams;

  return (
    <>
      <PhotoHeader
        NowFamilyId={NowFamilyId}
        photoAlbumId={photoAlbumId}
        PracticeEdit={PracticeEdit}
        isEdit={isEdit}
      />
      {!isEdit ? (
        <Container>
          <ContentBox>
            <ImageBox
              alt="#"
              src={detailPhoto?.photoFile ? detailPhoto.photoFile : noImage}
              onClick={() => {
                // history.push(`/detail/${p._id}`);
              }}
            />

            <CommentBox>
              <CommentHeder>
                <Text>아빠 정태</Text>
              </CommentHeder>
              <CommentListBox>
                <Text size="15px">아직 작성된 댓글이 없어요.</Text>
              </CommentListBox>
              <LikeMemberBox>
                <div style={{ position: "relative" }}>
                  <CircleImage
                    XS
                    src={profileImg ? profileImg : profileImg}
                    margin="0 5px 0 0"
                  />
                  {/* {myMissionChk ?  */}
                  <MdOutlineFavorite />
                  {/* : <UncompletedCicle />} */}
                  <div>
                    <MdOutlineFavorite />
                  </div>
                </div>
              </LikeMemberBox>
              <CommentFooter>
                <CircleImage XS margin="0 10px 0 0" />
                <Comment>
                  <Input
                    text_align="left"
                    size="13px"
                    height="24px"
                    placeholder="댓글을 달아보세요"
                    bg="#F5F5F5"
                    borderColor="transparnt"
                    margin="10px 0"
                    padding="0 0 0 10px"
                    // onChange={handleAlbumName}
                    // id={p.photoAlbumId}
                  />
                  <MdArrowUpward />
                  {/* <UnLike>
                    <MdArrowUpward />
                  </UnLike> */}
                </Comment>
              </CommentFooter>
            </CommentBox>
          </ContentBox>
        </Container>
      ) : (
        <Container>
          return (
          <EditFigure>
            {/* <div>
                  <EditImageBox
                    alt="#"
                    src={p.photoFile ? p.photoFile : noImage}
                    onClick={() => {
                      // history.push(`/detail/${p._id}`);
                    }}
                  />
                  <DeleteIcon onClick={handleModal}>
                    <MdRemoveCircle />
                  </DeleteIcon>
                </div> */}
          </EditFigure>
          );
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  /* column-count: 2; */
  /* column-gap: 1%; */
  /* padding: 40px; */
  /* grid-template-rows: repeat(1, 300px);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "main main aside";
  background-color: #fff; */

  width: 100%;
  /* height: 1001px; */
  /* margin: 24px; */
  padding: 24px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* column-count: 3; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* column-count: 3;
    padding: 24px; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* column-count: 2;
    padding: 16px; */
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* height: 600px; */
  height: 100%;
  background-color: #fff;
`;

const ImageBox = styled.img`
  width: 100%;
  /* height: 100%; */
  /* height: 1001px; */
  background-size: cover;
`;

const CommentBox = styled.div`
  /* background-size: cover; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 50%;
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
`;
const CommentListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;
const LikeMemberBox = styled.div`
  display: flex;
  align-items: center;
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
    /* margin: 14px 10px; */
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

export default DetailPhoto;
