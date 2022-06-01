import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  homeData: [],
  nowRandomMsg: {},
};

// 액션
const GET_HOME = "GET_HOME";
const GET_RANDUM_MSG = "GET_RANDUM_MSG";
const HOME_MISSION_MEMBER_UPDATE = "HOME_MISSION_MEMBER_UPDATE";

// 액션 생성함수
const getHome = createAction(GET_HOME, (homeData) => ({
  homeData,
}));

const getRandomMsg = createAction(GET_RANDUM_MSG, (randomMsg) => ({
  randomMsg,
}));

const homeProfileUpdate = createAction(
  HOME_MISSION_MEMBER_UPDATE,
  (familyMemberId, familyMemberNickname, userId) => ({
    familyMemberId,
    familyMemberNickname,
    userId,
  })
);

// api 응답 받는 미들웨어
const getHomeDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/main/${familyId}`, { headers: config })
      .then((res) => {
        const homeData = res.data;
        dispatch(getHome(homeData));
        dispatch(getRandomMsg(homeData.randomMsg[0]));
      })
      .catch((err) => {});
  };
};

//리듀서
export default handleActions(
  {
    [GET_HOME]: (state, action) =>
      produce(state, (draft) => {
        draft.homeData = action.payload.homeData;
      }),
    [GET_RANDUM_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.nowRandomMsg = action.payload.randomMsg;
      }),
    [HOME_MISSION_MEMBER_UPDATE]: (state, action) =>
      produce(state, (draft) => {
        const { familyMemberId, familyMemberNickname, userId } = action.payload;

        if (
          draft.homeData.recentMissionUser.familyMemberId === familyMemberId
        ) {
          draft.homeData.recentMissionUser.familyMemberNickname =
            familyMemberNickname;
        }

        if (draft.homeData.recentVoiceFile.userId === userId) {
          draft.homeData.recentVoiceFile.familyMemberNickname =
            familyMemberNickname;
        }
      }),
  },
  initialState
);

export const homeActions = {
  getHome,
  getHomeDB,
  homeProfileUpdate,
};
