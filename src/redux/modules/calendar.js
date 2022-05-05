import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";

// import { getToken } from "../../shared/Token";

const BASE_URL = "";

const initialState = {
  scheduleList: [],
};

// 액션
const GET_SCHEDULE = "GET_SCHEDULE";
const GET_ONE_SCHEDULE = "GET_ONE_SCHEDULE";
const ADD_SCHEDULE = "ADD_SCHEDULE";
const EDIT_SCHEDULE = "EDIT_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";

// 액션 생성함수
const getSchedule = createAction(GET_SCHEDULE, (scheduleList) => ({
  scheduleList,
}));
const getOneSchedule = createAction(GET_ONE_SCHEDULE, (scheduleList) => ({
  scheduleList,
}));
const addSchedule = createAction(ADD_SCHEDULE, (newSchedule) => ({
  newSchedule,
}));
const editSchedule = createAction(EDIT_SCHEDULE, (newSchedule) => ({
  newSchedule,
}));
const deleteSchedule = createAction(DELETE_SCHEDULE, (fakeId) => ({
  fakeId,
}));

// api 응답 받는 미들웨어
const getScheduleDB = () => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/schedulelist/, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {scheduleList} = res.data
    //     console.log(scheduleList);
    //     dispatch(getSchedule(scheduleList));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 데이터 안옴", error);
    //     console.log(error.response);
    //   });
    dispatch(getSchedule(DummyData.eventCalendarList));
  };
};
const getOneScheduleDB = (day) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .get(`${BASE_URL}/schedulelist/, { headers: config })
    //   .then((res) => {
    //     console.log(res)
    //     const {scheduleList} = res.data
    //     console.log(scheduleList);
    //     dispatch(getSchedule(scheduleList));
    //   })
    //   .catch((error) => {
    //     console.log("패밀리 데이터 안옴", error);
    //     console.log(error.response);
    //   });
    let scheduleList = [];
    DummyData.eventModalList.map((x) => {
      if (x.startDate == day) {
        scheduleList.push(x);
      }
    });

    dispatch(getOneSchedule(scheduleList));
  };
};

const addScheduleDB = (event, myPic, date) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .post(`${BASE_URL}/schedule`, {scheduleTitle}, { headers: config })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.msg);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });

    const newSchedule = {
      event: `${event}`, // 일정명
      startDate: `${date[0]}`, // 시작 날짜
      endDate: `${date[1]}`, // 종료 날짜
      color: `${myPic}`, // 색깔
      fakeId: `${`${new Date().getMinutes()}-${new Date().getSeconds()}`}`,
    };

    dispatch(addSchedule(newSchedule));
    console.log(newSchedule);
  };
};

const editScheduleDB = (event, myPic, date, fakeId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .put(
    //     `${BASE_URL}/schedule/${scheduleId}`,
    //     { scheduleTitle },
    //     {
    //       headers: config,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(editScheduleName(scheduleId, scheduleTitle));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err.response);
    //   });

    const newSchedule = {
      event: `${event}`, // 일정명
      startDate: `${date[0]}`, // 시작 날짜
      endDate: `${date[1]}`, // 종료 날짜
      color: `${myPic}`, // 색깔
      fakeId: `${fakeId}`, // 고유값
    };
    dispatch(editSchedule(newSchedule));
    console.log(newSchedule);
  };
};
const deleteScheduleDB = (fakeId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .delete(`${BASE_URL}/schedule/${scheduleId}`, {
    //     headers: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // window.alert(res.msg)
    //     alert("삭제!");
    dispatch(deleteSchedule(fakeId));
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
    [GET_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = action.payload.scheduleList;
        console.log(state.scheduleList);
      }),
    [GET_ONE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleOneList = action.payload.scheduleList;
        console.log(state.scheduleList);
      }),
    [ADD_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList.push(action.payload.newSchedule);
      }),
    [EDIT_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const fakeId = action.payload.newSchedule.fakeId;
        // 변경해야할 배열 인덱스
        let index = draft.scheduleList.findIndex((l) => l.fakeId == fakeId);

        draft.scheduleList[index] = action.payload.newSchedule;
      }),
    [DELETE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { fakeId } = action.payload;
        let newArr = draft.scheduleList.filter((l) => l.fakeId !== fakeId);
        console.log(state.scheduleList.filter((l) => l.fakeId !== fakeId));
        draft.scheduleList = newArr;
      }),
  },
  initialState
);

export const scheduleActions = {
  getSchedule,
  addSchedule,
  editSchedule,
  deleteSchedule,
  getScheduleDB,
  getOneScheduleDB,
  addScheduleDB,
  editScheduleDB,
  deleteScheduleDB,
};
