import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  nowPhotoDetail: [],
};

// 액션
const GET_DETAIL_PHOTO = "GET_DETAIL_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";
const ADD_LIKE = "ADD_LIKE";
const ADD_LIKE_MEMBER = "ADD_LIKE_MEMBER";
const DELETE_COMMENT = "DELETE_COMMENT";
const DELETE_LIKE = "DELETE_LIKE";

// 액션 생성함수
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
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const deleteLike = createAction(DELETE_LIKE, (newLikeChk, userId) => ({
  newLikeChk,
  userId,
}));

const getDetailPhotoDB = (familyId, photoId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/photo/${familyId}/detail/${photoId}`, {
        headers: config,
      })
      .then((res) => {
        const detailPhoto = res.data;
        dispatch(getDetailPhoto(detailPhoto));
        console.log(detailPhoto.detailPhoto.photoFile);
      })
      .catch((error) => {});
  };
};

const addCommentDB = (familyId, photoAlbumId, photoId, comment) => {
  return async function (dispatch, getState, { history }) {
    if (!comment) return;
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/comment/${familyId}/${photoAlbumId}/${photoId}`,
        { comment },
        { headers: config }
      )
      .then((res) => {
        let { createdComment } = res.data;
        dispatch(addComment(createdComment));
      })
      .catch((err) => {});
  };
};

const addLikeDB = (familyId, photoId, likeChk, userId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/like/${familyId}/${photoId}`,
        { likeChk },
        { headers: config }
      )
      .then((res) => {
        let newLikeChk = res.data.likeChk;
        if (newLikeChk) {
          dispatch(addLike(newLikeChk));
        } else {
          dispatch(deleteLike(newLikeChk, userId));
        }
      })
      .catch((err) => {});
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
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {});
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
        const { likeChk } = action.payload;
        draft.nowPhotoDetail.likeMemberList.push(likeChk);
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const { commentId } = action.payload;

        let newArr = draft.nowPhotoDetail.commentList.filter(
          (c) => c.commentId !== commentId
        );
        draft.nowPhotoDetail.commentList = newArr;
      }),

    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const { userId } = action.payload;

        let newArr = draft.nowPhotoDetail.likeMemberList.filter(
          (l) => l.userId !== userId
        );
        draft.nowPhotoDetail.likeMemberList = newArr;
        draft.nowPhotoDetail.likeChk = false;
      }),
  },
  initialState
);

export const detailPhotoActions = {
  getDetailPhotoDB,
  addCommentDB,
  addLikeDB,
  addLikeMember,
  deleteCommentDB,
};
