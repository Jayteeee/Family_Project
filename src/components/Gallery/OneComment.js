import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import dayjs from "dayjs";

// 엘리먼트
import { RactangleImage, Text } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { detailPhotoActions } from "../../redux/modules/detailphoto";

// 이미지
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";

const OneComment = ({ _id, userInfo, comment, createdAt, commentId }) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user.user?.user);

  const deleteComment = (commentId) => {
    dispatch(detailPhotoActions.deleteCommentDB(commentId));
  };

  return (
    <>
      <OneCommentBox key={_id}>
        <CommentContentWrap>
          <CommentProfile>
            <div>
              <RactangleImage
                S
                size="24px"
                borderRadius="8.4px"
                src={
                  userInfo?.profileImg === "Profile01"
                    ? Profile01
                    : userInfo?.profileImg === "Profile02"
                    ? Profile02
                    : userInfo?.profileImg === "Profile03"
                    ? Profile03
                    : userInfo?.profileImg === "Profile04"
                    ? Profile04
                    : userInfo?.profileImg === "Profile05"
                    ? Profile05
                    : userInfo?.profileImg
                    ? userInfo?.profileImg
                    : Profile01
                }
              />
            </div>
            <Text size="15px" padding="0 10px 0 10px" fontWeight="600">
              {userInfo.familyMemberNickname}
            </Text>
            {userInfo?.userId === userId && (
              <CancelBtn onClick={deleteComment.bind(this, commentId)}>
                <MdClose />
              </CancelBtn>
            )}
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
  padding: 10px;
  width: 100%;
`;

const CommentContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  position: relative;
`;

const CommentContent = styled.div`
  display: flex;
  text-align: left;
  width: 100%;
  padding: 5px 10px 10px 35px;
`;

const CommentTime = styled.div`
  text-align: left;
  padding-left: 35px;
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
