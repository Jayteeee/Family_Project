import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";

import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";
// const BASE_URL = "http://52.79.130.222";

const initialState = {
  photoAlbumList: [],
  photoList: [],
};

// 액션
const GET_PHOTO_ALBUM = "GET_PHOTO_ALBUM";
const GET_PHOTO = "GET_PHOTO";
const ADD_PHOTO_ALBUM = "ADD_PHOTO_ALBUM";
const ADD_PHOTO = "ADD_PHOTO";
const EDIT_PHOTO_ALBUM = "EDIT_PHOTO_ALBUM";
const EDIT_PHOTO = "EDIT_PHOTO";
const DELETE_PHOTO_ALBUM = "DELETE_PHOTO_ALBUM";
const DELETE_PHOTO = "DELETE_PHOTO";

// 액션 생성함수
const getPhotoAlbum = createAction(GET_PHOTO_ALBUM, (photoAlbumList) => ({
  photoAlbumList,
}));
const getPhoto = createAction(GET_PHOTO, (photoList) => ({
  photoList,
}));
const addPhotoAlbum = createAction(ADD_PHOTO_ALBUM, (newPhotoAlbum) => ({
  newPhotoAlbum,
}));
const addPhoto = createAction(ADD_PHOTO, (newPhoto) => ({
  newPhoto,
}));
const editPhotoAlbum = createAction(
  EDIT_PHOTO_ALBUM,
  (photoAlbumId, photoAlbumName) => ({
    photoAlbumId,
    photoAlbumName,
  })
);
const editPhoto = createAction(EDIT_PHOTO, (familyId, photoAlbumId, photo) => ({
  familyId,
  photoAlbumId,
  photo,
}));

const deletePhotoAlbum = createAction(DELETE_PHOTO_ALBUM, (photoAlbumId) => ({
  photoAlbumId,
}));
const deletePhoto = createAction(DELETE_PHOTO, (photoId) => ({
  photoId,
}));

// api 응답 받는 미들웨어
const getPhotoAlbumDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/photoAlbum/${familyId}`, { headers: config })
      .then((res) => {
        const { photoAlbumList } = res.data;
        dispatch(getPhotoAlbum(photoAlbumList));
      })
      .catch((error) => {});

    // dispatch(getPhotoAlbum(DummyData.photoAlbumList));
  };
};

const getPhotoDB = (photoAlbumId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/photo/${photoAlbumId}`, { headers: config })
      .then((res) => {
        const { photoList } = res.data;
        dispatch(getPhoto(photoList));
      })
      .catch((error) => {});
    // dispatch(getPhoto(DummyData.photoList));
  };
};

const addPhotoAlbumDB = (familyId, photoAlbumName) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/photoAlbum/${familyId}`,
        { photoAlbumName },
        { headers: config }
      )
      .then((res) => {
        const { photoAlbumId } = res.data;
        const newPhotoAlbum = {
          photoAlbumId: `${photoAlbumId}`,
          photoAlbumName: `${photoAlbumName}`,
        };
        window.alert(res.data.msg);
        dispatch(addPhotoAlbum(newPhotoAlbum));
      })
      .catch((err) => {});

    // const newPhotoAlbum = {
    //   photoAlbumId: `${familyId}`,
    //   photoAlbumName: `${photoAlbumName}`,
    // };

    // dispatch(addPhotoAlbum(newPhotoAlbum));
  };
};

const addPhotoDB = (familyId, photoAlbumId, formData) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(`${BASE_URL}/photo/${familyId}/${photoAlbumId}`, formData, {
        headers: config,
      })
      .then((res) => {
        const newPhoto = res.photoFile;
        dispatch(addPhoto(newPhoto));
        window.alert(res.data.msg);
        // history.go(0);
      })
      .catch((err) => {});
  };
};

const editPhotoAlbumDB = (
  familyId,
  photoAlbumId,
  photoAlbumName,
  PracticeEdit
) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .put(
        `${BASE_URL}/photoAlbum/${photoAlbumId}`,
        { photoAlbumName },
        {
          headers: config,
        }
      )
      .then((res) => {
        dispatch(editPhotoAlbum(photoAlbumId, photoAlbumName));
      })
      .catch((err) => {
        PracticeEdit(false);
      });
    // dispatch(editPhotoAlbum(photoAlbumId, photoAlbumName));
  };
};

const editPhotoDB = (familyId, familyTitle) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .put(
    //     `${BASE_URL}/family/${familyId}`,
    //     { familyTitle },
    //     {
    //       headers: config,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(editFamilyName(familyId, familyTitle));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
    dispatch(editPhoto(familyId, familyTitle));
  };
};

const deletePhotoAlbumDB = (photoAlbumId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/photoALbum/${photoAlbumId}`, {
        headers: config,
      })
      .then((res) => {
        dispatch(deletePhotoAlbum(photoAlbumId));
        window.alert(res.data.msg);
        // alert("삭제!");
      })
      .catch((err) => {});
  };
};

const deletePhotoDB = (photoId, NowFamilyId, PhotoAlbumName, photoAlbumId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/photo/${photoId}`, {
        headers: config,
      })
      .then((res) => {
        window.alert(res.data.msg);
        dispatch(deletePhoto(photoId));
        history.push(
          `/family/${NowFamilyId}/gallery/${PhotoAlbumName}/${photoAlbumId}`
        );
        // history.go(0);
      })
      .catch((err) => {});
  };
};

//리듀서;
export default handleActions(
  {
    [GET_PHOTO_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        draft.photoAlbumList = action.payload.photoAlbumList;
      }),
    [GET_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.photoList = action.payload.photoList;
      }),
    [ADD_PHOTO_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        draft.photoAlbumList.push(action.payload.newPhotoAlbum);
      }),
    [ADD_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.photoList.push(action.payload.newFamily);
      }),
    [EDIT_PHOTO_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        const { photoAlbumId, photoAlbumName } = action.payload;
        // 현재 가족
        let nowPhotoAlbum = draft.photoAlbumList.find(
          (l) => l.photoAlbumId === photoAlbumId
        );
        // 변경해야할 배열 인덱스
        let index = draft.photoAlbumList.findIndex(
          (l) => l.photoAlbumId === photoAlbumId
        );

        nowPhotoAlbum = { ...nowPhotoAlbum, photoAlbumName: photoAlbumName };

        draft.photoAlbumList[index] = nowPhotoAlbum;
      }),
    [EDIT_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        const { familyId, familyTitle } = action.payload;
        // 현재 가족
        let nowFamily = draft.photoList.find((l) => l.familyId === familyId);
        // 변경해야할 배열 인덱스
        let index = draft.photoList.findIndex((l) => l.familyId === familyId);

        nowFamily = { ...nowFamily, familyTitle: familyTitle };

        draft.photoList[index] = nowFamily;
      }),
    [DELETE_PHOTO_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        const { photoAlbumId } = action.payload;
        let newArr = draft.photoAlbumList.filter(
          (l) => l.photoAlbumId !== photoAlbumId
        );
        draft.photoAlbumList = newArr;
      }),
    [DELETE_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        const { photoId } = action.payload;
        let newArr = draft.photoList.filter((l) => l.photoId !== photoId);
        draft.photoList = newArr;
      }),
  },
  initialState
);

export const galleryActions = {
  getPhotoAlbumDB,
  getPhotoDB,
  addPhotoAlbumDB,
  addPhotoDB,
  editPhotoAlbumDB,
  deletePhotoAlbumDB,
  deletePhotoDB,
};
