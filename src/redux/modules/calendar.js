import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import dayjs from "dayjs";

import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  scheduleList: [
    {
      eventCalendarList: [],
    },
  ],
  scheduleOneList: [],
  photoCalendar: [
    {
      eventCalendarList: [],
      photoCalendarList: [],
    },
  ],
  photoOneList: [],
};

// 액션
const GET_SCHEDULE = "GET_SCHEDULE";
const GET_PHOTO_CALENDAR = "GET_PHOTO_CALENDAR";
const GET_ONE_SCHEDULE = "GET_ONE_SCHEDULE";
const GET_ONE_PHOTO = "GET_ONE_PHOTO";
const ADD_SCHEDULE = "ADD_SCHEDULE";
const EDIT_SCHEDULE = "EDIT_SCHEDULE";
const DELETE_SCHEDULE = "DELETE_SCHEDULE";

// 액션 생성함수
const getSchedule = createAction(GET_SCHEDULE, (scheduleList) => ({
  scheduleList,
}));
const getPhotoCalendar = createAction(GET_PHOTO_CALENDAR, (photoCalendar) => ({
  photoCalendar,
}));
const getOneSchedule = createAction(GET_ONE_SCHEDULE, (scheduleOneList) => ({
  scheduleOneList,
}));
const getOnePhoto = createAction(GET_ONE_PHOTO, (photoOneList) => ({
  photoOneList,
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
      .get(`${BASE_URL}/calendar/${familyId}/eventcalendar/${date}`, {
        headers: config,
      })
      .then((res) => {
        const scheduleList = res.data.eventCalendarList;
        dispatch(getSchedule(scheduleList));
      })
      .catch((error) => {});
  };
};
const getPhotoCalendarDB = (familyId, date) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/calendar/${familyId}/photocalendar/${date}`, {
        headers: config,
      })
      .then((res) => {
        const photoCalendar = res.data.photoCalendarList;
        dispatch(getPhotoCalendar(photoCalendar));
      })
      .catch((error) => {});
  };
};

const getOneScheduleDB = (date, familyId, eventId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(
        `${BASE_URL}/calendar/${familyId}/eventcalendar/detail/${eventId}/${date}`,
        {
          headers: config,
        }
      )
      .then((res) => {
        const scheduleOneList = res.data.event;
        dispatch(getOneSchedule(scheduleOneList));
      })
      .catch((error) => {});
  };
};
const getOnePhotoDB = (date, familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/calendar/${familyId}/photocalendar/detail/${date}`, {
        headers: config,
      })
      .then((res) => {
        const photoOneList = res.data.photoModalList;
        dispatch(getOnePhoto(photoOneList));
      })
      .catch((error) => {});
  };
};

const addScheduleDB = (familyId, event, myPic, date) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(
        `${BASE_URL}/calendar/${familyId}`,
        {
          data: {
            event: event,
            startDate: dayjs(date[0]).format("YYYY-MM-DD"),
            endDate: dayjs(date[1]).format("YYYY-MM-DD"),
            color: myPic,
          },
        },
        { headers: config }
      )
      .then((res) => {
        const newSchedule = {
          event: event, // 일정명
          startDate: date[0], // 시작 날짜
          endDate: date[1], // 종료 날짜
          color: myPic, // 색깔,
        };
        dispatch(addSchedule(newSchedule));
      })
      .catch((err) => {});
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
        const newSchedule = {
          event: res.data.event, // 일정명
          startDate: res.data.startDate, // 시작 날짜
          endDate: res.data.endDate, // 종료 날짜
          color: res.data.color, // 색깔
          eventId: eventId, // 고유값
        };
        dispatch(editSchedule(newSchedule));
      })
      .catch((err) => {});
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
        // window.alert(res.msg)
        alert("삭제!");
        dispatch(deleteSchedule(eventId));
        history.go(0);
      })
      .catch((err) => {});
  };
};

//리듀서;
export default handleActions(
  {
    [GET_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = action.payload.scheduleList;
      }),
    [GET_PHOTO_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.photoCalendar = action.payload.photoCalendar;
      }),
    [GET_ONE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleOneList = action.payload.scheduleOneList;
      }),
    [GET_ONE_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.photoOneList = action.payload.photoOneList;
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
  getPhotoCalendarDB,
  getOneScheduleDB,
  getOnePhotoDB,
  addScheduleDB,
  editScheduleDB,
  deleteScheduleDB,
};
