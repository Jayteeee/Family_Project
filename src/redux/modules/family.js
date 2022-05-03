import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";

// import { getToken } from "../../shared/Token";

const BASE_URL = "";

const initialState = {
  familyList: [],
};

// 액션
const GET_FAMILY = "GET_FAMILY";
const ADD_FAMILY = "ADD_FAMILY";
const EDIT_FAMILY_NAME = "EDIT_FAMILY";
const DELETE_FAMILY = "DELETE_FAMILY";

// 액션 생성함수
const getFamily = createAction(GET_FAMILY, (familyList) => ({
  familyList,
}));
const addFamily = createAction(ADD_FAMILY, (newFamily) => ({
  newFamily,
}));
const editFamilyName = createAction(
  EDIT_FAMILY_NAME,
  (familyId, familyTitle) => ({
    familyId,
    familyTitle,
  })
);
const deleteFamily = createAction(DELETE_FAMILY, (familyId) => ({
  familyId,
}));

// api 응답 받는 미들웨어
const getFamilyDB = () => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/familylist/`, { headers: config })
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
    dispatch(getFamily(DummyData.familyList));
  };
};

const addFamilyDB = (familyTitle) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .post(`${BASE_URL}/family`, {familyTitle}, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.msg);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });

    const newFamily = {
      familyId: `${familyTitle}`,
      familyTitle: `${familyTitle}`, // 가족 이름
      // familyImg: "url",
      // familyHost: "홍길동",
      // createdAt: "2022-05-18 00:51",
      // userId: "user3@gamil.com",
      // userNickname: "홍길동",
      // profileImg: "url",
      // todayMood: "이모지", // 이모지 사용
      // missionStatus: "끈끈해요(75%)",
      // randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
    };

    dispatch(addFamily(newFamily));
  };
};

const editFamilyNameDB = (familyId, familyTitle) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .put(
    //     `${BASE_URL}/family/${familyId}`,
    //     { familyTitle },
    //     {
    //       headers: config,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(editFamilyName(familyId, familyTitle));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
    dispatch(editFamilyName(familyId, familyTitle));
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
    dispatch(deleteFamily(familyId));
    history.go(0);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
  };
};

//리듀서;
export default handleActions(
  {
    [GET_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        draft.familyList = action.payload.familyList;
        // console.log(state.familyList);
      }),
    [ADD_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        draft.familyList.push(action.payload.newFamily);
      }),
    [EDIT_FAMILY_NAME]: (state, action) =>
      produce(state, (draft) => {
        const { familyId, familyTitle } = action.payload;
        // 현재 가족
        let nowFamily = draft.familyList.find((l) => l.familyId === familyId);
        // 변경해야할 배열 인덱스
        let index = draft.familyList.findIndex((l) => l.familyId === familyId);

        nowFamily = { ...nowFamily, familyTitle: familyTitle };

        draft.familyList[index] = nowFamily;
      }),
    [DELETE_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        const { familyId } = action.payload;
        let newArr = draft.familyList.filter((l) => l.familyId !== familyId);
        console.log(state.familyList.filter((l) => l.familyId !== familyId));
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
