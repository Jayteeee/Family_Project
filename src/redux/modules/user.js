import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import jwt from "jwt-decode";

// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/Token";

// const BASE_URL = "https://doremilan.shop";
const BASE_URL = "http://52.79.130.222";

const initialState = {
  user: {},
  isLogin: false,
};

// 액션
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// 액션 생성함수
const login = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT);
const getUser = createAction(GET_USER, (user) => ({ user }));

// 미들웨어
const userLogout = () => {
  return async function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace("/");
    history.go(0);
  };
};

// 여기부터 api 응답 받는 미들웨어
// /auth/signup
const signUpDB = (inputs) => {
  return async function (dispatch, getState, { history }) {
    const { email, password, passwordCheck, nickname } = inputs;

    await axios
      .post(`${BASE_URL}/auth/signup`, inputs)
      .then((res) => {
        console.log(res);
        alert(res.data.msg);
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.data.msg);
      });
  };
};

// /user/login
const loginDB = (inputs) => {
  return async function (dispatch, getState, { history }) {
    // axios
    await axios
      .post(`${BASE_URL}/auth/login`, inputs)
      .then((res) => {
        console.log(res);
        const token = res.data.logIntoken;
        const user = res.data;
        console.log(user);
        const familyId = res.data.familyList[0]?.familyId;
        insertToken(token);
        dispatch(login(user));
        res.data.familyList.length !== 0
          ? history.push(`/family/${familyId}`)
          : history.go(0);
      })
      .catch((err) => {
        console.log(err);
        alert("로그인 정보를 확인해주세요.");
      });
  };
};

// /user/me
const getUserInfo = (token) => {
  return async function (dispatch, getState, { history }) {
    const dUser = jwt(token);
    console.log(dUser);
    const config = { Authorization: `Bearer ${token}` };
    await axios
      .get(`${BASE_URL}/user/me`, { headers: config })
      .then((res) => {
        console.log("유저정보:", res.data);
        const user = res.data;
        dispatch(getUser(user));
        localStorage.setItem("isLogin", token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user.user = action.payload.user.userInfo;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state) =>
      produce(state, (draft) => {
        removeToken();
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  initialState
);

export const userActions = {
  signUpDB,
  loginDB,
  getUserInfo,
  userLogout,
};
