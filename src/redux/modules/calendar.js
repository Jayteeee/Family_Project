import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";

import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  scheduleList: [
    {
      // Response
      eventCalendarList: [
        {
          eventId: "",
          event: "",
          startDate: "",
          endDate: "",
          color: "",
        },
      ],
    },
  ],
  scheduleOneList: [
    {
      // Response
      event: "",
      startDate: "",
      endDate: "",
      color: "#DFDAGAD",
      familyMemberNickname: "",
      profileImg: "",
    },
  ],
  photoCalendar: [
    {
      // Response
      eventCalendarList: [
        {
          eventId: "asdfasdf434",
          event: "부모님께 연락하기",
          startDate: "2022-04-15 01:30",
          endDate: "2022-04-15 01:30",
          color: "red",
        },
      ],
      photoCalendarList: [
        {
          photoId: "454fdw",
          photoFile: "url",
          createdAt: "YYYY-MM-DD",
        },
      ],
    },
  ],
  photoOneList: [
    // Response 최신순 정렬
    {
      photoId: "454fdw",
      photoFile: "url",
    },
  ],
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
        console.log(res);
        const scheduleList = res.data.eventCalendarList;
        console.log(scheduleList);
        dispatch(getSchedule(scheduleList));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        console.log(error.response);
      });
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
        console.log(res);
        const photoCalendar = res.data.photoCalendarList;
        console.log(photoCalendar);
        dispatch(getPhotoCalendar(photoCalendar));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        console.log(error.response);
      });
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
        console.log(res);
        const scheduleOneList = res.data.event;
        console.log(scheduleOneList);
        dispatch(getOneSchedule(scheduleOneList));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        // console.log(error.response);
      });
  };
};
const getOnePhotoDB = (date, familyId) => {
  console.log(date);
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/calendar/${familyId}/photocalendar/detail/${date}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        const photoOneList = res.data.photoModalList;
        console.log(photoOneList);
        dispatch(getOnePhoto(photoOneList));
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
    console.log(familyId, event, dayjs(date[0]).format("YYYY-MM-DD"), myPic);
    // const dataList = {
    //   event: event,
    //   startDate: dayjs(date[0]).format("YYYY-MM-DD"),
    //   endDate: dayjs(date[1]).format("YYYY-MM-DD"),
    //   color: myPic,
    // };
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
    [GET_PHOTO_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.photoCalendar = action.payload.photoCalendar;
        console.log(state.photoCalendar);
      }),
    [GET_ONE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleOneList = action.payload.scheduleOneList;
        console.log(state.scheduleOneList);
      }),
    [GET_ONE_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.photoOneList = action.payload.photoOneList;
        console.log(state.photoOneList);
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
  getPhotoCalendarDB,
  getOneScheduleDB,
  getOnePhotoDB,
  addScheduleDB,
  editScheduleDB,
  deleteScheduleDB,
};
