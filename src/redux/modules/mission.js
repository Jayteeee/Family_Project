import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import dayjs from "dayjs";
import { history } from "../configureStore";
import axios from "axios";
// import { familyActions } from "./family";
import { getToken } from "../../shared/Token";

import { DummyData } from "../../shared/DummyData";

// const BASE_URL = "https://doremilan.shop";
const BASE_URL = "http://52.79.130.222";

const initialState = {
  nowMissionData: [],
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
// const EDIT_MISSION_MEMBER_PROFILE_IMG = "EDIT_MISSION_MEMBER_PROFILE_IMG";
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
// const editMissionMemberProfileImg = createAction(
//   EDIT_MISSION_MEMBER_PROFILE_IMG,
//   (profileImg, familyMemberId) => ({
//     profileImg,
//     familyMemberId,
//   })
// );
const checkMission = createAction(CHECK_MISSION, (missionChkData) => ({
  missionChkData,
}));
const checkMissionMember = createAction(
  CHECK_MISSION_MEMBER,
  (checkedMissionMember) => ({
    checkedMissionMember,
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
    const pastMissionList = getState().mission.pastMissionList;
    const config = { Authorization: `Bearer ${getToken()}` };
    console.log("미션페이지 get familyId", familyId);
    await axios
      .get(`${BASE_URL}/mission/${familyId}`, { headers: config })
      .then((res) => {
        console.log("미션 데이터 GET:", res);
        const nowMissionData = res.data;
        console.log(nowMissionData);

        dispatch(getMission(nowMissionData));
      })
      .catch((err) => {
        console.log("미션 데이터 안옴", err);
        // window.alert(err.response.data.msg);
      });

    const nowMissionData = DummyData.missionPage;

    // console.log("현재 미션 데이터:", nowMissionData);

    // const nowMissionData = DummyData.missionPage;
    // console.log("이번달 미션 데이터:", nowMissionData);

    // dispatch(getMission(nowMissionData));
  };
};

const getPastMissionDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/mission/${familyId}/pastmission`, { headers: config })
      .then((res) => {
        console.log("지난 미션 데이터 GET:", res);
        const { familyList } = res.data;
        console.log(familyList);
        // dispatch(getFamily(familyList));
      })
      .catch((err) => {
        console.log("지난 미션 데이터 안옴", err);
        // window.alert(err.response.data.msg);
      });
  };
};

const getMissionMemberDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/mission/${familyId}/familymember`, { headers: config })
      .then((res) => {
        console.log("미션 멤버 GET:", res);
        // const {familyList} = res.data
        // console.log(familyList);
        // dispatch(getMissionMember(familyList));
      })
      .catch((err) => {
        console.log("미션 멤버 데이터 안옴", err);
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
        console.log("배지 데이터 GET:", res);
        const { badge } = res.data.badgeList;
        // console.log(familyList);
        dispatch(getBadgeList(badge));
      })
      .catch((err) => {
        console.log("배지 데이터 안옴", err);
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
        console.log("미션 현황 GET:", res);
        const missionStatusData = res.data;
        dispatch(getMissionStatus(missionStatusData));
      })
      .catch((err) => {
        console.log("미션 현황 데이터 안옴", err);
        // window.alert(err.response.data.msg);
      });
  };
};

const addMissionDB = (
  familyId,
  missionTitle,
  familyMemberId,
  selectedMemberList
) => {
  console.log(missionTitle);
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/mission/${familyId}`,
        { missionTitle, familyMemberId },
        { headers: config }
      )
      .then((res) => {
        console.log("ADD 미션 데이터 ", res);
        const { createdMember } = res.data;
        console.log(createdMember);
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
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.msg);
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
    console.log(familyId);
    console.log(missionId);
    console.log(missionChkData);
    console.log(userId);
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(`${BASE_URL}/mission/${familyId}/${missionId}`, missionChkData, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
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
        console.log(err);
        console.log(err.response);
        window.alert(err.response.data.msg);
      });
  };
};

const deleteMissionDB = (familyId, missionId) => {
  return async function (dispatch, getState, { history }) {
    console.log(missionId);
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/mission/${missionId}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        dispatch(deleteMission(missionId));
        dispatch(getMissionStatusDB(familyId));
        // dispatch(missionStatusUpdate(missionStatus));
        // history.go(0);
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
        draft.nowMissionData.thisMonthMissionList.unshift(
          action.payload.newMission
        );
      }),
    [ADD_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedMemberList = action.payload.selectedMemberList;
        draft.selectedMemberIdList = action.payload.selectedMemberIdList;
      }),
    // [EDIT_MISSION_MEMBER_PROFILE_IMG]: (state, action) =>
    //   produce(state, (draft) => {
    //     const { profileImg, familyMemberId } = action.payload;
    //     // 현재 가족
    //     let nowThisMonthMissionList =
    //       state.nowMissionData.thisMonthMissionList.map(
    //         (f) =>
    //           f.missionMemberList.filter(
    //             (m) => m.familymemberId === familyMemberId
    //           )
    //         // .map((l) => (l.profileImg = profileImg))
    //       );

    //     console.log(nowThisMonthMissionList);
    //     // // // 변경해야할 배열 인덱스
    //     // let index = draft.familyMemberList.findIndex(
    //     //   (l) => l.familyMemberId === familyMemberId
    //     // );

    //     // nowFamilyMember = {
    //     //   ...nowFamilyMember,
    //     //   profileImg: profileImg,
    //     // };

    //     draft.nowMissionData.thisMonthMissionList = nowThisMonthMissionList;
    //   }),
    [CHECK_MISSION]: (state, action) =>
      produce(state, (draft) => {
        const { missionId, familyMissionChk, myMissionChk, completedAt } =
          action.payload.missionChkData;

        console.log(missionId, familyMissionChk);

        let thisMonthMissionList =
          draft.nowMissionData.thisMonthMissionList.filter(
            (m) => m.missionId === missionId
          )[0];

        let missionIdx = draft.nowMissionData.thisMonthMissionList.findIndex(
          (m) => m.missionId === missionId
        );

        console.log(missionIdx);
        console.log("선택한 미션:", thisMonthMissionList);

        thisMonthMissionList = {
          ...thisMonthMissionList,
          familyMissionChk: familyMissionChk,
          myMissionChk: myMissionChk,
          completedAt: completedAt,
        };

        console.log(thisMonthMissionList);
        // 선택한 미션 주입
        draft.nowMissionData.thisMonthMissionList[missionIdx] =
          thisMonthMissionList;
      }),
    [CHECK_MISSION_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        const { missionId, myMissionChk, familyMissionChk, userId } =
          action.payload.checkedMissionMember;

        console.log(missionId, myMissionChk, familyMissionChk, userId);

        let thisMonthMissionList =
          state.nowMissionData.thisMonthMissionList.filter(
            (m) => m.missionId === missionId
          )[0];

        let missionIdx = state.nowMissionData.thisMonthMissionList.findIndex(
          (m) => m.missionId === missionId
        );
        let checkedMissionMember =
          thisMonthMissionList.missionMemberList.filter(
            (f) => f.userId === userId
          )[0];
        let memberIdx = thisMonthMissionList.missionMemberList.findIndex(
          (f) => f.userId === userId
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

        draft.nowMissionData = missionStatus;
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
  getMissionStatusDB,
  addMissionDB,
  addMissionMember,
  // editMissionMemberProfileImg,
  checkMissionDB,
  deleteMissionDB,
};
