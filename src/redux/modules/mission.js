import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  thisMonthMissionList: [],
  missionMemberList: [],
  pastMissionList: [],
  selectedMemberList: [],
  selectedMemberIdList: [],
  badgeList: [],
  myMissionChk: {},
  missionStatus: {},
};

// 액션
const GET_MISSION = "GET_MISSION";
const GET_PAST_MISSION = "GET_PAST_MISSION";
const GET_MISSION_MEMBER = "GET_MISSION_MEMBER";
const GET_BADGE_LIST = "GET_BADGE_LIST";
const GET_MY_MISSION_CHK = "GET_MY_MISSION_CHK";
const GET_MISSION_STATUS = "GET_MISSION_STATUS";
const ADD_MISSION = "ADD_MISSION";
const ADD_MISSION_MEMBER = "ADD_MISSION_MEMBER";
const CHECK_MISSION = "CHECK_MISSION";
const CHECK_MISSION_MEMBER = "CHECK_MISSION_MEMBER";
const DELETE_MISSION = "DELETE_MISSION";
const RESET_SELECTED_MISSION_MEMBER = "RESET_SELECTED_MISSION_MEMBER";

// 액션 생성함수
const getMission = createAction(GET_MISSION, (thisMonthMissionList) => ({
  thisMonthMissionList,
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
const getMyMissionChk = createAction(GET_MY_MISSION_CHK, (myMissionChk) => ({
  myMissionChk,
}));
const getBadgeList = createAction(GET_BADGE_LIST, (badgeList) => ({
  badgeList,
}));
const getMissionStatus = createAction(
  GET_MISSION_STATUS,
  (missionStatusData) => ({
    missionStatusData,
  })
);
const addMission = createAction(ADD_MISSION, (newMission) => ({
  newMission,
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
  (checkedMissionMember) => ({
    checkedMissionMember,
  })
);
const deleteMission = createAction(DELETE_MISSION, (missionId) => ({
  missionId,
}));
const resetSelectedMissionMember = createAction(
  RESET_SELECTED_MISSION_MEMBER,
  () => ({})
);

const getMissionPage = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const pastMissionList = getState().mission.pastMissionList;
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/mission/${familyId}`, { headers: config })
      .then((res) => {
        const { thisMonthMissionList } = res.data;
        dispatch(getMission(thisMonthMissionList));
      })
      .catch((err) => {});
  };
};

const getPastMissionDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/mission/${familyId}/pastmission`, { headers: config })
      .then((res) => {
        const { familyList } = res.data;
        // dispatch(getFamily(familyList));
      })
      .catch((err) => {});
  };
};

const getMissionMemberDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/mission/${familyId}/familymember`, { headers: config })
      .then((res) => {
        // const {familyList} = res.data
        // console.log(familyList);
        // dispatch(getMissionMember(familyList));
      })
      .catch((err) => {
        // window.alert(err.response.data.msg);
      });
  };
};

const getBadgeListDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/badge/${familyId}`, { headers: config })
      .then((res) => {
        const { badge } = res.data.badgeList;
        // console.log(familyList);
        dispatch(getBadgeList(badge));
      })
      .catch((err) => {
        // window.alert(err.response.data.msg);
      });
    // const badgeList = DummyData.badgePage.badge;
    // dispatch(getBadgeList(badgeList));
  };
};

const getMissionStatusDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/mission/dashboard/${familyId}`, { headers: config })
      .then((res) => {
        const missionStatusData = res.data;
        dispatch(getMissionStatus(missionStatusData));
      })
      .catch((err) => {
        // window.alert(err.response.data.msg);
      });
  };
};

const addMissionDB = (
  familyId,
  missionTitle,
  familyMemberId,
  selectedMemberList,
  onClose
) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/mission/${familyId}`,
        { missionTitle, familyMemberId },
        { headers: config }
      )
      .then((res) => {
        const { createdMember } = res.data;
        const { missionId } = res.data;

        const newMission = {
          familyId: `${familyId}`,
          missionId: missionId,
          missionTitle: `${missionTitle}`, //name -> title 수
          familyMissionChk: false,
          missionMemberList: createdMember,
        };
        dispatch(addMission(newMission));
        dispatch(getMissionStatusDB(familyId));
        dispatch(resetSelectedMissionMember());
        onClose();
      })
      .catch((err) => {
        // window.alert(err.response.data.msg);
      });
  };
};

const checkMissionDB = (
  missionId,
  myMissionChk,
  familyMissionChk,
  completedAt,
  familyId,
  userId,
  missionStatus
) => {
  return async function (dispatch, getState, { history }) {
    let missionChkData = {
      myMissionChk,
      familyMissionChk,
      completedAt,
    };
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(`${BASE_URL}/mission/${familyId}/${missionId}`, missionChkData, {
        headers: config,
      })
      .then((res) => {
        const { data } = res;
        let { myMissionChk } = data;
        const { completedAt } = data;
        const checkedMission = {
          missionId: missionId,
          familyMissionChk: data.familyMissionChk,
          myMissionChk: myMissionChk,
          completedAt: completedAt,
        };
        const checkedMissionMember = {
          missionId: missionId,
          myMissionChk: myMissionChk,
          familyMissionChk: familyMissionChk,
          userId: userId,
        };
        dispatch(checkMissionMember(checkedMissionMember));
        dispatch(checkMission(checkedMission));
        dispatch(getMissionStatusDB(familyId));
        // dispatch(missionStatusUpdate(missionStatus));
        // history.go(0);
      })
      .catch((err) => {
        window.alert(err.response.data.msg);
      });
  };
};

const deleteMissionDB = (familyId, missionId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/mission/${missionId}`, {
        headers: config,
      })
      .then((res) => {
        dispatch(deleteMission(missionId));
        dispatch(getMissionStatusDB(familyId));
        // dispatch(missionStatusUpdate(missionStatus));
        // history.go(0);
      })
      .catch((err) => {});
  };
};

// 리듀서
export default handleActions(
  {
    [GET_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.thisMonthMissionList = action.payload.thisMonthMissionList;
      }),
    [GET_PAST_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.pastMissionList = action.payload.pastMissionList;
      }),
    [GET_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.missionMemberList = action.payload.familyMemberList;
      }),
    [GET_BADGE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.badgeList = action.payload.badgeList;
      }),
    [GET_MY_MISSION_CHK]: (state, action) =>
      produce(state, (draft) => {
        draft.myMissionChk = action.payload.myMissionChk;
      }),
    [GET_MISSION_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.missionStatus = action.payload.missionStatusData;
      }),
    [ADD_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.thisMonthMissionList.unshift(action.payload.newMission);
      }),
    [ADD_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedMemberList = action.payload.selectedMemberList;
        draft.selectedMemberIdList = action.payload.selectedMemberIdList;
      }),
    [CHECK_MISSION]: (state, action) =>
      produce(state, (draft) => {
        const { missionId, familyMissionChk, myMissionChk, completedAt } =
          action.payload.missionChkData;

        let thisMonthMissionList = draft.thisMonthMissionList.filter(
          (m) => m.missionId === missionId
        )[0];

        let missionIdx = draft.thisMonthMissionList.findIndex(
          (m) => m.missionId === missionId
        );

        thisMonthMissionList = {
          ...thisMonthMissionList,
          familyMissionChk: familyMissionChk,
          myMissionChk: myMissionChk,
          completedAt: completedAt,
        };
        // 선택한 미션 주입
        draft.thisMonthMissionList[missionIdx] = thisMonthMissionList;
      }),
    [CHECK_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        const { missionId, myMissionChk, familyMissionChk, userId } =
          action.payload.checkedMissionMember;

        let thisMonthMissionList = state.thisMonthMissionList.filter(
          (m) => m.missionId === missionId
        )[0];

        let missionIdx = state.thisMonthMissionList.findIndex(
          (m) => m.missionId === missionId
        );
        let checkedMissionMember =
          thisMonthMissionList.missionMemberList.filter(
            (f) => f.userId === userId
          )[0];
        let memberIdx = thisMonthMissionList.missionMemberList.findIndex(
          (f) => f.userId === userId
        );

        checkedMissionMember = {
          ...checkedMissionMember,
          myMissionChk: myMissionChk,
        };
        // 선택한 미션 멤버 주입
        draft.thisMonthMissionList[missionIdx].missionMemberList[memberIdx] =
          checkedMissionMember;
      }),
    [DELETE_MISSION]: (state, action) =>
      produce(state, (draft) => {
        const { missionId } = action.payload;

        let thisMonthMissionList = draft.thisMonthMissionList.filter(
          (m) => m.missionId !== missionId
        );

        draft.thisMonthMissionList = thisMonthMissionList;
      }),
    [RESET_SELECTED_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedMemberIdList = [];
        draft.selectedMemberList = [];
      }),
  },
  initialState
);

export const missionActions = {
  getMissionPage,
  getPastMissionDB,
  getMissionMemberDB,
  getBadgeListDB,
  getMissionStatusDB,
  addMissionDB,
  addMissionMember,
  checkMissionDB,
  deleteMissionDB,
};
