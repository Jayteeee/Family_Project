import React, { useState, useEffect, useRef } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdRemoveCircleOutline,
  MdRemoveCircle,
  MdArrowUpward,
  MdOutlineFavorite,
  MdCancel,
  MdClose,
} from "react-icons/md";
import dayjs from "dayjs";

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

const OneComment = ({
  _id,
  userInfo,
  comment,
  createdAt,
  commentId,
  profileImg,
}) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.user);

  console.log(userId);

  const deleteComment = (commentId) => {
    console.log(commentId);
    dispatch(detailPhotoActions.deleteCommentDB(commentId));
  };

  return (
    <>
      <OneCommentBox key={_id}>
        <CommentContentWrap>
          <CommentProfile>
            <div>
              <CircleImage XS src={profileImg ? profileImg : profileImg} />
            </div>
            <Text size="15px" padding="0 10px 0 10px" fontWeight="600">
              {userInfo.familyMemberNickname}
            </Text>
            <CancelBtn onClick={deleteComment.bind(this, commentId)}>
              <MdClose />
            </CancelBtn>
          </CommentProfile>

          <CommentContent>
            <Text size="15px">{comment}</Text>
          </CommentContent>
        </CommentContentWrap>
        <CommentTime>
          <Text size="12px" color="#757575">
            {new dayjs(createdAt).format("YYYY년 M월 DD일")}
          </Text>
        </CommentTime>
      </OneCommentBox>
    </>
  );
};

const OneCommentBox = styled.div`
  /* align-items: center; */

  padding: 10px;
  border-bottom: 1px solid #dbdbdb;
`;

const CommentContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  /* flex-basis: 0;
  flex-grow: 1; */
  position: relative;
`;

const CommentContent = styled.div`
  display: flex;
  text-align: left;
  width: 100%;
  padding: 5px 10px 10px 32px;
`;

const CommentTime = styled.div`
  text-align: left;
  padding-left: 32px;
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
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

export default OneComment;
