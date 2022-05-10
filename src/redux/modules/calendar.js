import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";

import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  scheduleList: [],
  scheduleOneList: [],
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
const getOneSchedule = createAction(GET_ONE_SCHEDULE, (scheduleOneList) => ({
  scheduleOneList,
}));
const addSchedule = createAction(ADD_SCHEDULE, (newSchedule) => ({
  newSchedule,
}));
const editSchedule = createAction(EDIT_SCHEDULE, (newSchedule) => ({
  newSchedule,
}));
const deleteSchedule = createAction(DELETE_SCHEDULE, (eventId) => ({
  eventId,
}));

// api 응답 받는 미들웨어
const getScheduleDB = (familyId, date) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/${familyId}/eventcalendar/${date}`, { headers: config })
      .then((res) => {
        console.log(res);
        const { scheduleList } = res.data;
        console.log(scheduleList);
        dispatch(getSchedule(scheduleList));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        console.log(error.response);
      });
  };
};
const getOneScheduleDB = (familyId, date) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/${familyId}/eventcalendar/detail/${date}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        const scheduleOneList = res.data;
        console.log(scheduleOneList);
        dispatch(getOneSchedule(scheduleOneList));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        console.log(error.response);
      });
  };
};

const addScheduleDB = (familyId, event, myPic, date) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(`${BASE_URL}/calendar/${familyId}`, {
        data: {
          event: event,
          startDate: date[0],
          endDate: date[1],
          color: myPic,
        },
        headers: config,
      })
      .then((res) => {
        console.log(res);
        const newSchedule = {
          event: event, // 일정명
          startDate: date[0], // 시작 날짜
          endDate: date[1], // 종료 날짜
          color: myPic, // 색깔,
        };
        dispatch(addSchedule(newSchedule));
        console.log(newSchedule);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const editScheduleDB = (event, myPic, date, eventId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .put(
        `${BASE_URL}/calendar/${eventId}`,
        {
          data: {
            event: event, // 일정명
            startDate: date[0], // 시작 날짜
            endDate: date[1], // 종료 날짜
            color: myPic, // 색깔
          },
        },
        {
          headers: config,
        }
      )
      .then((res) => {
        console.log(res);
        const newSchedule = {
          event: res.data.event, // 일정명
          startDate: res.data.startDate, // 시작 날짜
          endDate: res.data.endDate, // 종료 날짜
          color: res.data.color, // 색깔
          eventId: eventId, // 고유값
        };
        dispatch(editSchedule(newSchedule));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};
const deleteScheduleDB = (eventId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/calendar/${eventId}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        // window.alert(res.msg)
        alert("삭제!");
        dispatch(deleteSchedule(eventId));
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
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
        draft.scheduleOneList = action.payload.scheduleOneList;
        console.log(state.scheduleList);
      }),
    [ADD_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList.push(action.payload.newSchedule);
      }),
    [EDIT_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const eventId = action.payload.newSchedule.eventId;
        // 변경해야할 배열 인덱스
        let index = draft.scheduleList.findIndex((l) => l.eventId === eventId);

        draft.scheduleList[index] = action.payload.newSchedule;
      }),
    [DELETE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { eventId } = action.payload;
        let newArr = draft.scheduleList.filter((l) => l.eventId !== eventId);
        console.log(state.scheduleList.filter((l) => l.eventId !== eventId));
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
