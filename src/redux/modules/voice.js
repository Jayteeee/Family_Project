import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import dayjs from "dayjs";
import { history } from "../configureStore";
// import axios from "axios";
// import { familyActions } from "./family";
// import { getToken } from "../../shared/token";

import { DummyData } from "../../shared/DummyData";

const BASE_URL = "";

const initialState = {
  nowVoiceData: [],
  missionMemberList: [],
  pastMissionList: [],
  selectedMemberList: [],
  selectedMemberIdList: [],
  badgeList: [],
};

// 액션
const GET_VOICE = "GET_VOICE";
const GET_PAST_MISSION = "GET_PAST_MISSION";
const GET_MISSION_MEMBER = "GET_MISSION_MEMBER";
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
const getPastMission = createAction(GET_PAST_MISSION, (pastMissionList) => ({
  pastMissionList,
}));
const getMissionMember = createAction(
  GET_MISSION_MEMBER,
  (familyMemberList) => ({
    familyMemberList,
  })
);
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
    // const pastMissionList = getState().mission.pastMissionList;
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/mission/${familyId}`, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {familyList} = res.data
    //     console.log(familyList);
    //     dispatch(getFamily(familyList));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 데이터 안옴", error);
    //     console.log(error.response);
    //   });

    // const nowMissionData = DummyData.missionPage;

    // console.log("현재 미션 데이터:", nowMissionData);
    // dispatch(getMission(nowMissionData));

    const nowVoiceData = DummyData.voiceAlbumList;

    console.log("음성 데이터:", nowVoiceData);

    dispatch(getVoice(nowVoiceData));
  };
};

const getPastMissionDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/mission/${familyId}/pastmission`, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     const { familyList } = res.data;
    //     console.log(familyList);
    //     // dispatch(getFamily(familyList));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 데이터 안옴", error);
    //     console.log(error.response);
    //   });
    //     // await axios
    //     //   .get(`${BASE_URL}/mission/${familyId}/pastmission`, { headers: config })
    //     //   .then((res) => {
    //     //     console.log(res);
    //     //     const { familyList } = res.data;
    //     //     console.log(familyList);
    //     //     // dispatch(getFamily(familyList));
    //     //   })
    //     //   .catch((error) => {
    //     //     console.log("패밀리 데이터 안옴", error);
    //     //     console.log(error.response);
    //     //   });
    const pastMissionList = DummyData.pastMissionList;
    console.log("지난 미션 데이터:", pastMissionList);
    dispatch(getPastMission(pastMissionList));
  };
};

const getMissionMemberDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/${familyId}`/familymember, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {familyList} = res.data
    //     console.log(familyList);
    //     dispatch(getFamily(familyList));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 멤버 데이터 안옴", error);
    //     console.log(error.response);
    //   });

    const missionMemberData = DummyData.familyMemberList;

    console.log("현재 미션 멤버 데이터:", missionMemberData);
    dispatch(getMissionMember(missionMemberData));
  };
};

const getVoiceListDB = (voiceAlbumId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/badge/:${familyId}`/, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {familyList} = res.data
    //     console.log(familyList);
    //     dispatch(getFamily(familyList));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 멤버 데이터 안옴", error);
    //     console.log(error.response);
    //   });};
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
    [GET_PAST_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.pastMissionList = action.payload.pastMissionList;
      }),
    [GET_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.missionMemberList = action.payload.familyMemberList;
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
  getPastMissionDB,
  getMissionMemberDB,
  getVoiceListDB,
  addVoiceDB,
  addMissionMember,
  checkMissionDB,
  editVoiceAlbumDB,
  deleteMissionDB,
};
