import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";

// import { getToken } from "../../shared/Token";

const BASE_URL = "";

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
const addPhoto = createAction(ADD_PHOTO, (photo) => ({
  photo,
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
const deletePhoto = createAction(DELETE_PHOTO, (photoAlbumId, photoId) => ({
  photoAlbumId,
  photoId,
}));

// api 응답 받는 미들웨어
const getPhotoAlbumDB = () => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/photoAlbum/${familyId}`, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {photoAlbumList} = res.data
    //     console.log(familyList);
    //     dispatch(getFamily(familyList));
    //   })
    //   .catch((error) => {
    //     console.log("갤러리 앨범 데이터 안옴", error);
    //     console.log(error.response);
    //   });

    dispatch(getPhotoAlbum(DummyData.photoAlbumList));
  };
};

const getPhotoDB = () => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/photoAlbum/${familyId}`, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {photoAlbumList} = res.data
    //     console.log(familyList);
    //     dispatch(getFamily(familyList));
    //   })
    //   .catch((error) => {
    //     console.log("갤러리 앨범 데이터 안옴", error);
    //     console.log(error.response);
    //   });

    dispatch(getPhoto(DummyData.photoAlbumList));
  };
};

const addPhotoAlbumDB = (familyId, photoAlbumName) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .post(`${BASE_URL}/${familyId}`, {familyTitle}, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     const {photoAlbumId} = res
    //     console.log(res.msg);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });

    const newPhotoAlbum = {
      photoAlbumId: `${familyId}`,
      photoAlbumName: `${photoAlbumName}`,
    };

    dispatch(addPhotoAlbum(newPhotoAlbum));
  };
};

const addPhotoDB = (familyTitle) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .post(`${BASE_URL}/family`, {familyTitle}, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.msg);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });

    const newFamily = {
      familyId: `${familyTitle}`,
      familyTitle: `${familyTitle}`, // 가족 이름
      // familyImg: "url",
      // familyHost: "홍길동",
      // createdAt: "2022-05-18 00:51",
      // userId: "user3@gamil.com",
      // userNickname: "홍길동",
      // profileImg: "url",
      // todayMood: "이모지", // 이모지 사용
      // missionStatus: "끈끈해요(75%)",
      // randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
    };

    dispatch(addPhoto(newFamily));
  };
};

const editPhotoAlbumDB = (familyId, photoAlbumId, photoAlbumName) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .put(
    //     `${BASE_URL}/photoAlbum/${photoAlbumId}`,
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
    dispatch(editPhotoAlbum(photoAlbumId, photoAlbumName));
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

const deletePhotoAlbumDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .delete(`${BASE_URL}/family/${familyId}`, {
    //     headers: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // window.alert(res.msg)
    //     alert("삭제!");
    dispatch(deletePhotoAlbum(familyId));
    history.go(0);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
  };
};

const deletePhotoDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .delete(`${BASE_URL}/family/${familyId}`, {
    //     headers: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // window.alert(res.msg)
    //     alert("삭제!");
    dispatch(deletePhotoAlbum(familyId));
    history.go(0);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
  };
};

//리듀서;
export default handleActions(
  {
    [GET_PHOTO_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        draft.photoAlbumList = action.payload.photoAlbumList;
        // console.log(state.familyList);
      }),
    [GET_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.photoList = action.payload.familyList;
        // console.log(state.familyList);
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
    [DELETE_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        const { familyId } = action.payload;
        let newArr = draft.photoAlbumList.filter(
          (l) => l.familyId !== familyId
        );
        console.log(
          state.photoAlbumList.filter((l) => l.familyId !== familyId)
        );
        draft.photoAlbumList = newArr;
      }),
    [DELETE_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        const { familyId } = action.payload;
        let newArr = draft.photoList.filter((l) => l.familyId !== familyId);
        console.log(state.photoList.filter((l) => l.familyId !== familyId));
        draft.photoList = newArr;
      }),
  },
  initialState
);

export const galleryActions = {
  getPhotoAlbumDB,
  addPhotoAlbumDB,
  editPhotoAlbumDB,
  deletePhotoAlbumDB,
};
