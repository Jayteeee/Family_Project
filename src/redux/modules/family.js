import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { Dummy } from "../../shared/DummyData";
import moment from "moment";
// import { getToken } from "../../shared/token";

const BASE_URL = "";

const initialState = {
  familyList: [],
};

// 액션
const GET_FAMILY = "GET_FAMILY";
const ADD_FAMILY = "ADD_FAMILY";
const EDIT_FAMILY_NAME = "EDIT_FAMILY_NAME";
const DELETE_FAMILY = "DELETE_FAMILY";

// 액션 생성함수
const getFamily = createAction(GET_FAMILY, (familyList) => ({
  familyList,
}));
const addFamily = createAction(ADD_FAMILY, (family) => ({
  family,
}));
const editFamilyName = createAction(
  EDIT_FAMILY_NAME,
  (familyId, familyName) => ({
    familyId,
    familyName,
  })
);
const deleteFamily = createAction(DELETE_FAMILY, (familyId) => ({
  familyId,
}));

// api 응답 받는 미들웨어
const getFamilyDB = () => {
  return async function (dispatch, getState, { history }) {
    // const { email } = getState().user.user;
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/family/${email}`, { headers: config })
    //   .then((res) => {
    //     // console.log(res)
    //     // console.log(channel);
    //     // console.log(Dummy);
    //     // dispatch(getChannel(Dummy));
    //     dispatch(getChannel(channel));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 데이터 안옴", error);
    //     console.log(error.response);
    //   });
    dispatch(getFamily(Dummy));
  };
};

const addFamilyDB = (familyName) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // const { nickname } = getState().user.user;
    // const inputs = { familyName, nickname };
    // await axios
    //   .post(`${BASE_URL}/family/family`, inputs, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     dispatch(addChannel(res.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
  };
};

const editFamilyNameDB = (familyId, familyName) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .patch(
    //     `${BASE_URL}/family/${familyId}`,
    //     { familyName },
    //     {
    //       headers: config,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(editFamilyName(familyId, familyName));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
  };
};

const deleteFamilyDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .delete(`${BASE_URL}/family/${familyId}`, {
    //     headers: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // window.alert(res.msg)
    //     alert("삭제!");
    //     dispatch(deleteFamily(familyId));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
    // history.replace("/");
  };
};

//리듀서;
export default handleActions(
  {
    [GET_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        draft.familyList = action.payload.familyList;
        console.log(state.familyList);
      }),
    [ADD_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        draft.familyList.push(action.payload.family);
      }),
    [EDIT_FAMILY_NAME]: (state, action) =>
      produce(state, (draft) => {
        const { famliyId, famliyName } = action.payload;
        draft.channelList.forEach((l) => {
          if (l.famliyId === famliyId) {
            l.famliyName = famliyName;
          }
        });
      }),
    [DELETE_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        const { famliyId } = action.payload;
        let newArr = draft.familyList.filter((l) => l.famliyId !== famliyId);
        draft.familyList = newArr;
      }),
  },
  initialState
);

export const familyActions = {
  getFamily,
  addFamily,
  editFamilyName,
  deleteFamily,
  getFamilyDB,
  addFamilyDB,
  editFamilyNameDB,
  deleteFamilyDB,
};
