import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const initialState = {
  socket: {},
};

// 액션
const GET_SOCKET = "GET_SOCKET";
const SET_SOCKET = "SET_SOCKET";
// const SET_ACTION = "SET_ACTION";
// const GET_USER = "GET_USER";

// 액션 생성함수
const getsocket = createAction(GET_SOCKET, (inputs) => ({ inputs }));
const setsocket = createAction(SET_SOCKET, (data) => ({ data }));
// const setaction = createAction(SET_ACTION, (data) => ({ data }));
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
  console.log(data);
  return async function (dispatch, getState, { history }) {
    // 데이터를 어떤 형식으로 주시는지에 따라 배열을 감싸거나 감싸지 않고 바로 사용하기
    // const list = [];
    // list.push(data);
    await dispatch(setsocket(data));
  };
};

// const setActionDB = (data) => {
//   console.log(data);
//   return async function (dispatch, getState, { history }) {
//     await dispatch(setaction(data));
//   };
// };

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
    // [SET_ACTION]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.action = action.payload.data;
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
  // setActionDB,
  // userLogout,
};
