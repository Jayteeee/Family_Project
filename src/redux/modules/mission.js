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
  nowMissionData: [],
  missionMemberList: [],
  pastMissionList: [],
  selectedMemberList: [],
  selectedMemberIdList: [],
  badgeList: [],
};

// 액션
const GET_MISSION = "GET_MISSION";
const GET_PAST_MISSION = "GET_PAST_MISSION";
const GET_MISSION_MEMBER = "GET_MISSION_MEMBER";
const GET_BADGE_LIST = "GET_BADGE_LIST";
const ADD_MISSION = "ADD_MISSION";
const ADD_MISSION_MEMBER = "ADD_MISSION_MEMBER";
const CHECK_MISSION = "CHECK_MISSION";
const CHECK_MISSION_MEMBER = "CHECK_MISSION_MEMBER";
const MISSION_STATUS_UPDATE = "MISSION_UPDATE";
const DELETE_MISSION = "DELETE_MISSION";

// 액션 생성함수
const getMission = createAction(GET_MISSION, (nowMissionData) => ({
  nowMissionData,
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
const getBadgeList = createAction(GET_BADGE_LIST, (badgeList) => ({
  badgeList,
}));
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
const deleteMission = createAction(DELETE_MISSION, (missionId) => ({
  missionId,
}));

const getMissionPage = (familyId) => {
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
    const nowMissionData = DummyData.missionPage;
    console.log("이번달 미션 데이터:", nowMissionData);

    dispatch(getMission(nowMissionData));
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

const getBadgeListDB = (familyId) => {
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
    const badgeList = DummyData.badgePage.badge;
    dispatch(getBadgeList(badgeList));
  };
};

const addMissionDB = (
  familyId,
  missionTitle,
  familyIdList,
  selectedMemberList
) => {
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
    const newMission = {
      familyId: `${familyId}`,
      missionId: `asd33dsddf${missionTitle}`,
      missionTitle: `${missionTitle}`, //name -> title 수
      missionChk: false,
      completedAt: "YYYY-MM-DD",
      selectedMemberList: { ...selectedMemberList },
      missionMemberList: [
        {
          familyMemberId: "1234213",
          familyMemberNicname: "아빠",
          memberMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "2342fag4",
          familyMemberNicname: "엄마",
          memberMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "68defs231a",
          familyMemberNicname: "자녀",
          memberMissionChk: false,
          profileImg: false,
        },
      ],
    };

    console.log("새로운 미션:", newMission);
    dispatch(addMission(newMission));
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

const deleteMissionDB = (familyId, missionId) => {
  return async function (dispatch, getState, { history }) {
    console.log(missionId);
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
    [GET_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.nowMissionData = action.payload.nowMissionData;
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
    [ADD_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.nowMissionData.thisMonthMissionList.push(
          action.payload.newMission
        );
      }),

    [ADD_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedMemberList = action.payload.selectedMemberList;
        draft.selectedMemberIdList = action.payload.selectedMemberIdList;
      }),
    [CHECK_MISSION]: (state, action) =>
      produce(state, (draft) => {
        const { checkedMissionId, familyMissionChk } =
          action.payload.missionChkData;

        console.log(checkedMissionId, familyMissionChk);

        let thisMonthMissionList =
          draft.nowMissionData.thisMonthMissionList.filter(
            (m) => m.missionId === checkedMissionId
          )[0];

        let missionIdx = draft.nowMissionData.thisMonthMissionList.findIndex(
          (m) => m.missionId === checkedMissionId
        );

        console.log(missionIdx);
        console.log("선택한 미션:", thisMonthMissionList);

        thisMonthMissionList = {
          ...thisMonthMissionList,
          familyMissionChk: familyMissionChk,
        };

        console.log(thisMonthMissionList);
        // 선택한 미션 주입
        draft.nowMissionData.thisMonthMissionList[missionIdx] =
          thisMonthMissionList;
      }),
    [CHECK_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        const {
          checkedMissionId,
          myMissionChk,
          familyMissionChk,
          familyMemberId,
        } = action.payload.missionChkData;

        console.log(
          checkedMissionId,
          myMissionChk,
          familyMissionChk,
          familyMemberId
        );

        let thisMonthMissionList =
          draft.nowMissionData.thisMonthMissionList.filter(
            (m) => m.missionId === checkedMissionId
          )[0];

        let missionIdx = draft.nowMissionData.thisMonthMissionList.findIndex(
          (m) => m.missionId === checkedMissionId
        );
        let checkedMissionMember = thisMonthMissionList.missionMemberList.find(
          (f) => f.familyMemberId === familyMemberId
        );
        let memberIdx = thisMonthMissionList.missionMemberList.findIndex(
          (f) => f.familyMemberId === familyMemberId
        );

        console.log(missionIdx, memberIdx);
        console.log(
          "선택한 미션:",
          thisMonthMissionList,
          "선택한 미션멤버:",
          checkedMissionMember
        );

        checkedMissionMember = {
          ...checkedMissionMember,
          myMissionChk: myMissionChk,
        };
        // 선택한 미션 멤버 주입
        draft.nowMissionData.thisMonthMissionList[missionIdx].missionMemberList[
          memberIdx
        ] = checkedMissionMember;
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

export const missionActions = {
  getMissionPage,
  getPastMissionDB,
  getMissionMemberDB,
  getBadgeListDB,
  addMissionDB,
  addMissionMember,
  checkMissionDB,
  deleteMissionDB,
};
