import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import moment from "moment";
// import { getToken } from "../../shared/Token";

const BASE_URL = "";

const initialState = {
  familyList: [],
};

// 액션
const GET_FAMILY = "GET_FAMILY";
const ADD_FAMILY = "ADD_FAMILY";
const EDIT_FAMILY_TITLE = "EDIT_FAMILY_TITLE";
const DELETE_FAMILY = "DELETE_FAMILY";

// 미션 추가부분 액션
const ADD_MISSION = "ADD_MISSION";
const EDIT_MISSION = "EDIT_MISSION";
const DELETE_MISSION = "DELETE_MISSION";

// 액션 생성함수
const getFamily = createAction(GET_FAMILY, (familyList) => ({
  familyList,
}));
const addFamily = createAction(ADD_FAMILY, (newFamily) => ({
  newFamily,
}));
const editFamilyTitle = createAction(
  EDIT_FAMILY_TITLE,
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
    dispatch(getFamily(DummyData.familyList));
  };
};

const addFamilyDB = (newFamily) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // const { nickname } = getState().user.user;
    // const inputs = { familyName, nickname };
    // await axios
    //   .post(`${BASE_URL}/family`, newFamily, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     dispatch(addFamily(res.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });
    const newFamilyTitle = "가족3";

    const newFamily = {
      familyId: "123456787asd",
      familyTitle: `${newFamilyTitle}`, // 가족 이름
      familyImg: "url",
      familyHost: "홍길동",
      createdAt: "2022-05-18 00:51",
      email: "user3@gamil.com",
      userNickname: "홍길동",
      profileImg: "url",
      todayMood: "이모지", // 이모지 사용
      missionStatus: "끈끈해요(75%)",
      randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
    };

    dispatch(addFamily(newFamily));
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
        // console.log(state.familyList);
      }),
    [ADD_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        draft.familyList.push(action.payload.newFamily);
      }),
    [EDIT_FAMILY_TITLE]: (state, action) =>
      produce(state, (draft) => {
        const { famliyId, famliyTitle } = action.payload;
        draft.channelList.forEach((l) => {
          if (l.famliyId === famliyId) {
            l.famliyName = famliyTitle;
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
  editFamilyTitle,
  deleteFamily,
  getFamilyDB,
  addFamilyDB,
  editFamilyNameDB,
  deleteFamilyDB,
};
