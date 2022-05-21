import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import axios from "axios";
// import { channelActions } from "./channel";
import { getToken } from "../../shared/Token";
import { DummyData } from "../../shared/DummyData";

const BASE_URL = "https://doremilan.shop";
// const BASE_URL = "http://52.79.130.222";

const initialState = {
  nowPhotoDetail: [],
};

// 액션
const GET_DETAIL_PHOTO = "GET_DETAIL_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";
const ADD_LIKE = "ADD_LIKE";
const ADD_LIKE_MEMBER = "ADD_LIKE_MEMBER";
const EDIT_DETAIL_PHOTO_PROFILE_IMG = "EDIT_DETAIL_PHOTO_PROFILE_IMG";
const DELETE_COMMENT = "DELETE_COMMENT";

// 액션 생성함수
// 한울 추가: 언더바는 사용해보니 좋은걸 잘 모르겠어서 빼버렸습니다!

const getDetailPhoto = createAction(GET_DETAIL_PHOTO, (nowPhotoDetail) => ({
  nowPhotoDetail,
}));
const addComment = createAction(ADD_COMMENT, (newComment) => ({
  newComment,
}));
const addLike = createAction(ADD_LIKE, (likeChk) => ({
  likeChk,
}));
const addLikeMember = createAction(ADD_LIKE_MEMBER, (likeMember) => ({
  likeMember,
}));
const editDetailPhotoProfileImg = createAction(
  EDIT_DETAIL_PHOTO_PROFILE_IMG,
  (profileImg, familyMemberId) => ({
    profileImg,
    familyMemberId,
  })
);
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));

const getDetailPhotoDB = (photoId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/photo/detail/${photoId}`, { headers: config })
      .then((res) => {
        console.log(res);
        const detailPhoto = res.data;
        console.log(detailPhoto);
        dispatch(getDetailPhoto(detailPhoto));
      })
      .catch((error) => {
        console.log("사진 상세보기 데이터 안옴", error);
        console.log(error.response);
      });
    // dispatch(getDetailPhoto(DummyData.detailPhotoPage));
  };
};

const addCommentDB = (familyId, photoAlbumId, photoId, comment) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;
    console.log("댓글 유저정보", userInfo);
    if (!comment) return;
    const config = { Authorization: `Bearer ${getToken()}` };
    // const { email } = getState().user.user;
    await axios
      .post(
        `${BASE_URL}/comment/${familyId}/${photoAlbumId}/${photoId}`,
        { comment },
        { headers: config }
      )
      .then((res) => {
        console.log(res);
        let { createdComment } = res.data;
        console.log(createdComment);

        // let newDic = {
        //   ...resData,
        //   userId: email,
        //   nickname: resData.userNickname,
        // };
        dispatch(addComment(createdComment));
        // dispatch(channelActions.addComment(channelId, contentId, newDic));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
    // let fakeResponseData = {
    //   comment: comment,
    //   commentId: new Date().getTime() + "",
    //   contentId: contentId,
    //   createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    //   nickname: nickname,
    //   userId: email,
    //   profileImg,
    // };
    // dispatch(addComment(fakeResponseData));
    // // 여기서 채널 액션함수 호출
    // dispatch(channelActions.addComment(channelId, contentId, fakeResponseData));
  };
};

const addLikeDB = (familyId, photoId, likeChk) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    // const { email } = getState().user.user;
    await axios
      .post(
        `${BASE_URL}/like/${familyId}/${photoId}`,
        { likeChk },
        { headers: config }
      )
      .then((res) => {
        console.log(res);
        let newLikeChk = res.data.likeChk;
        console.log(likeChk);
        // let newDic = {
        //   ...resData,
        //   userId: email,
        //   nickname: resData.userNickname,
        // };

        dispatch(addLike(newLikeChk));

        // dispatch(channelActions.addComment(channelId, contentId, newDic));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
    // let fakeResponseData = {
    //   comment: comment,
    //   commentId: new Date().getTime() + "",
    //   contentId: contentId,
    //   createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    //   nickname: nickname,
    //   userId: email,
    //   profileImg,
    // };
    // dispatch(addComment(fakeResponseData));
    // // 여기서 채널 액션함수 호출
    // dispatch(channelActions.addComment(channelId, contentId, fakeResponseData));
  };
};

const deleteCommentDB = (commentId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    // axios
    await axios
      .delete(`${BASE_URL}/comment/${commentId}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_DETAIL_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.nowPhotoDetail = action.payload.nowPhotoDetail;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.nowPhotoDetail.commentList.push(action.payload.newComment);
      }),

    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const { likeChk } = action.payload;

        let nowDetailPhoto = draft.nowPhotoDetail;

        nowDetailPhoto = { ...nowDetailPhoto, likeChk: likeChk };

        draft.nowPhotoDetail = nowDetailPhoto;
      }),

    [ADD_LIKE_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        const { likeMember } = action.payload;
        draft.nowPhotoDetail.likeMemberList.push(likeMember);
      }),

    [EDIT_DETAIL_PHOTO_PROFILE_IMG]: (state, action) =>
      produce(state, (draft) => {
        const { profileImg, familyMemberId } = action.payload;
        // 현재 가족
        let nowLikeMember = draft.nowPhotoDetail.likeMemberList.find(
          (l) => l.familyMemberId === familyMemberId
        );

        // // 변경해야할 배열 인덱스
        let index = draft.nowPhotoDetail.likeMemberList.findIndex(
          (l) => l.familyMemberId === familyMemberId
        );

        nowLikeMember = {
          ...nowLikeMember,
          profileImg: profileImg,
        };

        draft.nowPhotoDetail.likeMemberList[index] = nowLikeMember;
        draft.nowPhotoDetail.detailPhoto.userInfo.profileImg = profileImg;
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const { commentId } = action.payload;

        let newArr = draft.nowPhotoDetail.commentList.filter(
          (c) => c.commentId !== commentId
        );
        draft.nowPhotoDetail.commentList = newArr;
      }),
  },
  initialState
);

export const detailPhotoActions = {
  getDetailPhotoDB,
  addCommentDB,
  addLikeDB,
  addLikeMember,
  editDetailPhotoProfileImg,
  deleteCommentDB,
};
