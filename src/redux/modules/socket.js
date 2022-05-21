import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const initialState = {
  socket: {},
};

// 액션
const GET_SOCKET = "GET_SOCKET";
// const SET_NOTI = "SET_NOTI";
const SET_ALERT = "SET_ALERT";
const SET_FAMILY_NOTI = "SET_FAMILY_NOTI";

// 액션 생성함수
const getsocket = createAction(GET_SOCKET, (inputs) => ({ inputs }));
// const setnoti = createAction(SET_NOTI, (data) => ({ data }));
const setalert = createAction(SET_ALERT, (data) => ({ data }));
const setFamilyNoti = createAction(SET_FAMILY_NOTI, (data) => ({ data }));

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

// const setNotiDB = (data) => {
//   console.log(data);
//   return async function (dispatch, getState, { history }) {
//     // 데이터를 어떤 형식으로 주시는지에 따라 배열을 감싸거나 감싸지 않고 바로 사용하기
//     // const list = [];
//     // list.push(data);
//     await dispatch(setnoti(data));
//   };
// };

const setAlertDB = (data) => {
  console.log(data);
  return async function (dispatch, getState, { history }) {
    await dispatch(setalert(data));
  };
};

const setFamilyNotiDB = (data) => {
  console.log(data);
  return async function (dispatch, getState, { history }) {
    await dispatch(setFamilyNoti(data));
  };
};

// 리듀서
export default handleActions(
  {
    [GET_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = action.payload.inputs;
      }),
    // [SET_NOTI]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.alert = action.payload.data;
    //   }),
    [SET_ALERT]: (state, action) =>
      produce(state, (draft) => {
        draft.alert = action.payload.data.findUserAlertDB;
      }),
    [SET_FAMILY_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.alert.push(action.payload.data.findAlertDB);
      }),
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
  // setNotiDB,
  setAlertDB,
  setFamilyNotiDB,
  // userLogout,
};
