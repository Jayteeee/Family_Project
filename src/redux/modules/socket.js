import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const initialState = {
  socket: {},
};

// 액션
const GET_SOCKET = "GET_SOCKET";
const SET_SOCKET = "SET_SOCKET";
// const LOG_OUT = "LOG_OUT";
// const GET_USER = "GET_USER";

// 액션 생성함수
const getsocket = createAction(GET_SOCKET, (inputs) => ({ inputs }));
const setsocket = createAction(SET_SOCKET, (data) => ({ data }));
// const logOut = createAction(LOG_OUT);
// const getUser = createAction(GET_USER, (user) => ({ user }));

// 미들웨어
// const userLogout = () => {
//   return async function (dispatch, getState, { history }) {
//     dispatch(logOut());
//     history.replace("/");
//   };
// };

// NewUser
const getSocketDB = (inputs) => {
  return async function (dispatch) {
    dispatch(getsocket(inputs));
  };
};

// // /user/me
const setSocketDB = (data) => {
  return async function (dispatch, getState, { history }) {
    dispatch(setsocket(data));
  };
};

// 리듀서
export default handleActions(
  {
    [GET_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = action.payload.inputs;
      }),
    [SET_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.sender = action.payload.data;
      }),
    // [LOG_OUT]: (state) =>
    //   produce(state, (draft) => {
    //     removeToken();
    //     draft.user = null;
    //     draft.isLogin = false;
    //   }),
    // [GET_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.user = action.payload.user;
    //     draft.isLogin = true;
    //   }),
  },
  initialState
);

export const socketActions = {
  // signUpDB,
  getSocketDB,
  setSocketDB,
  // userLogout,
};
