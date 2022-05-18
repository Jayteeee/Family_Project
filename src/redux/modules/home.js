import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";
// const BASE_URL = "http://52.79.130.222";

const initialState = {
  homeData: [],
  nowRandomMsg: {},
};

// 액션
const GET_HOME = "GET_HOME";
const GET_RANDUM_MSG = "GET_RANDUM_MSG";
const GET_FAMILY_MEMBER_LIST = "GET_FAMILY_MEMBER_LIST";

// 액션 생성함수
const getHome = createAction(GET_HOME, (homeData) => ({
  homeData,
}));
const getRandomMsg = createAction(GET_RANDUM_MSG, (randomMsg) => ({
  randomMsg,
}));
const getFamilyMemberList = createAction(
  GET_FAMILY_MEMBER_LIST,
  (familyMemberList) => ({
    familyMemberList,
  })
);

// api 응답 받는 미들웨어
const getHomeDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/main/${familyId}`, { headers: config })
      .then((res) => {
        console.log("홈페이지 데이터 GET:", res);
        const homeData = res.data;
        console.log(homeData);
        dispatch(getHome(homeData));
        dispatch(getRandomMsg(homeData.randomMsg[0]));
        dispatch(getFamilyMemberList(homeData.familyMemberList));
      })
      .catch((err) => {
        console.log("홈페이지 데이터 안옴", err);
        console.log(err.response);
      });
  };
};

//리듀서
export default handleActions(
  {
    [GET_HOME]: (state, action) =>
      produce(state, (draft) => {
        draft.homeData = action.payload.homeData;
        // console.log(state.homeData);
      }),
    [GET_RANDUM_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.nowRandomMsg = action.payload.randomMsg;
        // console.log(state.homeData);
      }),
    [GET_FAMILY_MEMBER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberList = action.payload.familyMemberList;
        // console.log(state.homeData);
      }),
  },
  initialState
);

export const homeActions = {
  getHome,
  getHomeDB,
};
