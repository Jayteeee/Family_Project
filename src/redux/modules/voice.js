import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import dayjs from "dayjs";
import { history } from "../configureStore";
import axios from "axios";
import { getToken } from "../../shared/Token";

import { DummyData } from "../../shared/DummyData";

const BASE_URL = "https://doremilan.shop";
// const BASE_URL = "http://52.79.130.222";

const initialState = {
  nowVoiceData: [
    {
      voiceAlbumList: [
        {
          voiceAlbumId: "123456787",
          voiceAlbumName: "일상",
          voiceAlbumCover: "albumcover1",
        },
      ],
    },
  ],
  voiceList: [
    {
      voiceAlbumName: "일상",
      voiceFileList: [
        {
          voiceFileId: "asdfadsf",
          voiceFileTitle: "잔소리1",
          voiceFile: "url",
          voicePlayTime: "mm:ss",
          createdAt: "2022-04-15 00:51",
          familyMemberNickname: "자녀",
          profileImg: "url",
        },
      ],
    },
  ],
  voiceFileList: [],
};

// 액션
const GET_VOICE = "GET_VOICE";
const GET_VOICE_LIST = "GET_VOICE_LIST";
const ADD_VOICE = "ADD_VOICE";
const ADD_VOICE_ALBUM = "ADD_VOICE_ALBUM";
const EDIT_VOICE_ALBUM = "EDIT_VOICE_ALBUM";
const DELETE_VOICE_ALBUM = "DELETE_VOICE_ALBUM";
const DELETE_VOICE = "DELETE_VOICE";

// 액션 생성함수
const getVoice = createAction(GET_VOICE, (nowVoiceData) => ({
  nowVoiceData,
}));
const getVoiceList = createAction(
  GET_VOICE_LIST,
  (voiceList, voiceFileList) => ({
    voiceList,
    voiceFileList,
  })
);
const addVoiceAlbum = createAction(ADD_VOICE_ALBUM, (newVoiceAlbum) => ({
  newVoiceAlbum,
}));
const addVoice = createAction(ADD_VOICE, (newVoice) => ({
  newVoice,
}));
const editVoiceAlbum = createAction(
  EDIT_VOICE_ALBUM,
  (voiceAlbumId, voiceAlbumName) => ({
    voiceAlbumId,
    voiceAlbumName,
  })
);
const deleteVoiceAlbum = createAction(DELETE_VOICE_ALBUM, (voiceAlbumId) => ({
  voiceAlbumId,
}));
const deleteVoice = createAction(DELETE_VOICE, (voiceFileId) => ({
  voiceFileId,
}));

const getVoicePage = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/voiceAlbum/${familyId}`, { headers: config })
      .then((res) => {
        const nowVoiceData = res.data.voiceAlbumList;
        dispatch(getVoice(nowVoiceData));
      })
      .catch((error) => {});
  };
};

const getVoiceListDB = (voiceAlbumId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/voiceFile/${voiceAlbumId}`, { headers: config })
      .then((res) => {
        const voiceList = res.data;
        const { voiceFileList } = res.data;
        dispatch(getVoiceList(voiceList, voiceFileList));
      })
      .catch((error) => {});
  };
};

const addVoiceAlbumDB = (familyId, voiceAlbumName, voiceAlbumCover) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/voiceAlbum/${familyId}`,
        { voiceAlbumName, voiceAlbumCover },
        { headers: config }
      )
      .then((res) => {
        alert(res.data.msg);
        const newVoiceAlbum = {
          voiceAlbumId: res.data.voiceAlbumId,
          voiceAlbumCover: voiceAlbumCover,
          voiceAlbumName: voiceAlbumName,
        };
        dispatch(addVoiceAlbum(newVoiceAlbum));
      })
      .catch((err) => {});
  };
};

const addVoiceDB = (
  familyId,
  voiceAlbumId,
  voiceTitle,
  voiceFile,
  voicePlayTime
) => {
  return async function (dispatch, getState, { history }) {
    const config = {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("voiceTitle", voiceTitle);
    formData.append("voiceFile", voiceFile);
    formData.append("voicePlayTime", voicePlayTime);

    await axios
      .post(`${BASE_URL}/voiceFile/${familyId}/${voiceAlbumId}`, formData, {
        headers: config,
      })
      .then((res) => {
        const userInfo = getState().user.user.user;
        const newVoice = {
          familyId: familyId,
          voiceAlbumId: voiceAlbumId,
          voiceTitle: voiceTitle, //name -> title 수정
          voiceFile: voiceFile,
          voicePlayTime: voicePlayTime,
          familyMemberNickname: userInfo.nickname,
          profileImg: userInfo.profileImg,
          createdAt: Date.now(),
        };
        window.alert(res.data.msg);
        dispatch(addVoice(newVoice));
      })
      .catch((err) => {});
  };
};

const editVoiceAlbumDB = (familyId, voiceAlbumId, voiceAlbumName) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .put(
        `${BASE_URL}/voiceAlbum/${voiceAlbumId}`,
        { voiceAlbumName },
        {
          headers: config,
        }
      )
      .then((res) => {
        dispatch(editVoiceAlbum(voiceAlbumId, voiceAlbumName));
      })
      .catch((err) => {});
  };
};

const deleteVoiceAlbumDB = (voiceAlbumId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/voiceAlbum/${voiceAlbumId}`, {
        headers: config,
      })
      .then((res) => {
        alert("앨범삭제완료되었습니다.");
        dispatch(deleteVoiceAlbum(voiceAlbumId));
        // history.go(0);
      })
      .catch((err) => {});
  };
};
const deleteVoiceDB = (voiceFileId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/voiceFile/${voiceFileId}`, {
        headers: config,
      })
      .then((res) => {
        alert("삭제완료되었습니다.");
        dispatch(deleteVoice(voiceFileId));
        // history.go(0);
      })
      .catch((err) => {});
  };
};

// 리듀서
export default handleActions(
  {
    [GET_VOICE]: (state, action) =>
      produce(state, (draft) => {
        draft.nowVoiceData = action.payload.nowVoiceData;
      }),
    [GET_VOICE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.voiceList = action.payload.voiceList;
        draft.voiceFileList = action.payload.voiceFileList;
      }),
    [ADD_VOICE_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        draft.nowVoiceData.push(action.payload.newVoiceAlbum);
      }),
    [ADD_VOICE]: (state, action) =>
      produce(state, (draft) => {
        draft.voiceFileList.push(action.payload.newVoice);
      }),
    [EDIT_VOICE_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        const { voiceAlbumId, voiceAlbumName } = action.payload;
        // 현재 가족
        let nowVoiceAlbum = draft.nowVoiceData.find(
          (l) => l.voiceAlbumId === voiceAlbumId
        );
        // 변경해야할 배열 인덱스
        let index = draft.nowVoiceData.findIndex(
          (l) => l.voiceAlbumId === voiceAlbumId
        );

        nowVoiceAlbum = { ...nowVoiceAlbum, voiceAlbumName: voiceAlbumName };

        draft.nowVoiceData[index] = nowVoiceAlbum;
      }),
    [DELETE_VOICE_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        const { voiceAlbumId } = action.payload;

        let newVoiceAlbumList = draft.nowVoiceData.filter(
          (v) => v.voiceAlbumId !== voiceAlbumId
        );

        draft.nowVoiceData = newVoiceAlbumList;
      }),
    [DELETE_VOICE]: (state, action) =>
      produce(state, (draft) => {
        const { voiceFileId } = action.payload;

        let newVoiceFileList = draft.voiceList.voiceFileList.filter(
          (v) => v.voiceFileId !== voiceFileId
        );
        draft.voiceFileList = newVoiceFileList;
      }),
  },
  initialState
);

export const voiceActions = {
  getVoicePage,
  getVoiceListDB,
  addVoiceAlbumDB,
  addVoiceDB,
  editVoiceAlbumDB,
  deleteVoiceAlbumDB,
  deleteVoiceDB,
};
