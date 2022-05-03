import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import moment from "moment";
import { history } from "../configureStore";
// import axios from "axios";
// import { familyActions } from "./family";
// import { getToken } from "../../shared/token";

import { DummyData } from "../../shared/DummyData";

const BASE_URL = "";

const initialState = {
  nowMissionData: {},
};

// 액션
const GET_MISSION = "GET_MISSION";
const ADD_MISSION = "ADD_MISSION";
const EDIT_MISSION = "EDIT_MISSION";
const DELETE_MISSION = "DELETE_MISSION";

// 액션 생성함수
const getMission = createAction(GET_MISSION, (nowMissionData) => ({
  nowMissionData,
}));
const addMission = createAction(ADD_MISSION, (mission) => ({
  mission,
}));
const editMission = createAction(EDIT_MISSION, (mission) => ({
  mission,
}));
const deleteMission = createAction(DELETE_MISSION, (missionId) => ({
  missionId,
}));

const getMissionPage = (familyId) => {
  return function (dispatch, getState, { history }) {
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

    const nowMissionData = DummyData.missionPage;

    console.log("현재 미션 데이터:", nowMissionData);
    dispatch(getMission(nowMissionData));
  };
};

const addMissionDB = () => {
  return async function (dispatch, getState, { history }) {};
};

const editMissionDB = () => {
  return async function (dispatch, getState, { history }) {};
};

const deleteMissionDB = () => {
  return async function (dispatch, getState, { history }) {};
};

// 리듀서
export default handleActions(
  {
    [GET_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.nowMissionData = action.payload.nowMissionData;
      }),
    [ADD_MISSION]: (state, action) =>
      produce(state, (draft) => {
        draft.oneChannel.contentList.push(action.payload.nowMission);
      }),
    [EDIT_MISSION]: (state, action) =>
      produce(state, (draft) => {
        // const { content } = action.payload;
        // let newArr = draft.oneChannel.contentList.filter(
        //   (c) => c.contentId !== content.contentId
        // );
        // newArr = [...newArr, content].sort(
        //   (a, b) =>
        //     new moment(a.createdAt).format("YYYYMMDDHHmm") -
        //     new moment(b.createdAt).format("YYYYMMDDHHmm")
        // );
        // draft.oneChannel.contentList = newArr;
      }),
    [DELETE_MISSION]: (state, action) =>
      produce(state, (draft) => {
        const { contentId } = action.payload;

        let newArr = draft.oneChannel.contentList.filter(
          (c) => c.contentId !== contentId
        );

        draft.oneChannel.contentList = newArr;
      }),
  },
  initialState
);

export const missionActions = {
  getMissionPage,
  addMissionDB,
  editMissionDB,
  deleteMissionDB,
};
