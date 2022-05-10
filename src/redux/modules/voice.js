import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import dayjs from "dayjs";
import { history } from "../configureStore";
import axios from "axios";
import { getToken } from "../../shared/Token";
// import { familyActions } from "./family";

import { DummyData } from "../../shared/DummyData";

const BASE_URL = "https://doremilan.shop";

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
    { voiceAlbumName: "일상" },
    {
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
  missionMemberList: [],
  pastMissionList: [],
  selectedMemberList: [],
  selectedMemberIdList: [],
};

// 액션
const GET_VOICE = "GET_VOICE";
const GET_VOICE_LIST = "GET_VOICE_LIST";
const ADD_VOICE = "ADD_VOICE";
const ADD_MISSION_MEMBER = "ADD_MISSION_MEMBER";
const CHECK_MISSION = "CHECK_MISSION";
const CHECK_MISSION_MEMBER = "CHECK_MISSION_MEMBER";
const MISSION_STATUS_UPDATE = "MISSION_UPDATE";
const EDIT_VOICE_ALBUM = "EDIT_VOICE_ALBUM";
const DELETE_MISSION = "DELETE_MISSION";

// 액션 생성함수
const getVoice = createAction(GET_VOICE, (nowVoiceData) => ({
  nowVoiceData,
}));
const getVoiceList = createAction(GET_VOICE_LIST, (voiceList) => ({
  voiceList,
}));
const addVoice = createAction(ADD_VOICE, (newVoice) => ({
  newVoice,
}));
const addMissionMember = createAction(
  ADD_MISSION_MEMBER,
  (selectedMemberList, selectedMemberIdList) => ({
    selectedMemberList,
    selectedMemberIdList,
  })
);
const checkMission = createAction(CHECK_MISSION, (missionChkData) => ({
  missionChkData,
}));
const checkMissionMember = createAction(
  CHECK_MISSION_MEMBER,
  (missionChkData) => ({
    missionChkData,
  })
);
const missionStatusUpdate = createAction(
  MISSION_STATUS_UPDATE,
  (missionStatus) => ({
    missionStatus,
  })
);
const editVoiceAlbum = createAction(
  EDIT_VOICE_ALBUM,
  (voiceAlbumId, voiceAlbumName) => ({
    voiceAlbumId,
    voiceAlbumName,
  })
);
const deleteMission = createAction(DELETE_MISSION, (missionId) => ({
  missionId,
}));

const getVoicePage = (familyId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/voiceAlbum/${familyId}`, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     const nowVoiceData = res.data;
    //     dispatch(getVoice(nowVoiceData));
    //   })
    //   .catch((error) => {
    //     console.log("음성 데이터 안옴", error);
    //     console.log(error.response);
    //   });

    const nowVoiceData = DummyData.voiceAlbumList;
    dispatch(getVoice(nowVoiceData));
  };
};

const getVoiceListDB = (voiceAlbumId) => {
  return async function (dispatch, getState, { history }) {
    //   const config = { Authorization: `Bearer ${getToken()}` };
    //   await axios
    //     .get(`${BASE_URL}/voiceFile/${voiceAlbumId}`, { headers: config })
    //     .then((res) => {
    //       console.log(res);
    //       const voiceList = res.data;
    //       console.log(voiceList);
    //       dispatch(getVoiceList(voiceList));
    //     })
    //     .catch((error) => {
    //       console.log("음성 파일 데이터 안옴", error);
    //       console.log(error.response);
    //     });

    const voiceList = DummyData.voiceFilePage;
    console.log(voiceList);
    dispatch(getVoiceList(voiceList));
  };
};

const addVoiceDB = (familyId, voiceTitle, audioUrl, sound, count) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .post(
    //     `${BASE_URL}/mission /${familyId}`,
    //     { missionTitle, familyIdList },
    //     { headers: config }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.msg);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
    const newVoice = {
      familyId: `${familyId}`,
      voiceAlbumId: `asd33dsddf${voiceTitle}`,
      voiceTitle: `${voiceTitle}`, //name -> title 수정
      voiceFile: `${audioUrl}`,
      voiceFile2: `${sound}`,
      voicePlayTime: `${count}`,
    };

    console.log("새로운 음성메시지:", newVoice);
    dispatch(addVoice(newVoice));
  };
};

const checkMissionDB = (
  checkedMissionId,
  myMissionChk,
  familyMissionChk,
  completedAt,
  familyId
) => {
  return async function (dispatch, getState, { history }) {
    let missionChkData = {
      checkedMissionId,
      myMissionChk,
      familyMissionChk,
      completedAt,
    };

    console.log(missionChkData);
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .post(
    //     `${BASE_URL}/missionChk/${missionId}`,
    //     missionChkData,
    //     { headers: config }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.msg);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
    const { familyMemberId } = getState().user.user;
    console.log("가족구성원Id:", familyMemberId);

    const checkedMission = {
      checkedMissionId,
      familyMissionChk: familyMissionChk,
    };
    const checkedMissionMember = {
      checkedMissionId,
      myMissionChk: myMissionChk,
      familyMissionChk: familyMissionChk,
      familyMemberId,
    };
    console.log(checkedMission);

    dispatch(checkMission(checkedMission));
    dispatch(checkMissionMember(checkedMissionMember));
  };
};

const editVoiceAlbumDB = (familyId, voiceAlbumId, voiceAlbumName) => {
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
    dispatch(editVoiceAlbum(voiceAlbumId, voiceAlbumName));
  };
};

const deleteMissionDB = (familyId, missionId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .delete(`${BASE_URL}/${familyId}/${missionId}`, {
    //     headers: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // window.alert(res.msg)
    //     alert("삭제!");
    let missionStatus = {
      totalMission: 10,
      completedMission: 3,
      completePercentage: "30",
      totalBadge: 5,
    };
    dispatch(deleteMission(missionId));
    dispatch(missionStatusUpdate(missionStatus));
    // history.go(0);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
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
      }),
    [ADD_VOICE]: (state, action) =>
      produce(state, (draft) => {
        draft.nowVoiceData.push(action.payload.newVoice);
      }),

    [ADD_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedMemberList = action.payload.selectedMemberList;
        draft.selectedMemberIdList = action.payload.selectedMemberIdList;
      }),
    [EDIT_VOICE_ALBUM]: (state, action) =>
      produce(state, (draft) => {
        const { voiceAlbumId, voiceAlbumName } = action.payload;
        // 현재 가족
        let nowVoiceAlbum = draft.voiceAlbumList.find(
          (l) => l.voiceAlbumId === voiceAlbumId
        );
        // 변경해야할 배열 인덱스
        let index = draft.voiceAlbumList.findIndex(
          (l) => l.voiceAlbumId === voiceAlbumId
        );

        nowVoiceAlbum = { ...nowVoiceAlbum, voiceAlbumName: voiceAlbumName };

        draft.voiceAlbumList[index] = nowVoiceAlbum;
      }),
    [MISSION_STATUS_UPDATE]: (state, action) =>
      produce(state, (draft) => {
        const { missionStatus } = action.payload;
        draft.nowMissionData.missionBox = missionStatus;
      }),
    [DELETE_MISSION]: (state, action) =>
      produce(state, (draft) => {
        const { missionId } = action.payload;

        let thisMonthMissionList =
          draft.nowMissionData.thisMonthMissionList.filter(
            (m) => m.missionId !== missionId
          );

        draft.nowMissionData.thisMonthMissionList = thisMonthMissionList;
      }),
  },
  initialState
);

export const voiceActions = {
  getVoicePage,
  getVoiceListDB,
  addVoiceDB,
  addMissionMember,
  checkMissionDB,
  editVoiceAlbumDB,
  deleteMissionDB,
};
