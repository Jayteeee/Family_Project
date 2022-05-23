import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";
import { getToken } from "../../shared/Token";
import { homeActions } from "./home";
import { familyActions } from "./family";

const BASE_URL = "https://doremilan.shop";
// const BASE_URL = "http://52.79.130.222";

const initialState = {
  familyMemberList: [],
  familyMemberStatusList: [],
  searchMember: [],
};

// 액션
const GET_FAMILY_MEMBER = "GET_FAMILY_MEMBER";
const GET_FAMILY_MEMBER_STATUS = "GET_FAMILY_MEMBER_STATUS";
const GET_SEARCH_MEMBER = "GET_SEARCH_MEMBER";
const ADD_FAMILY_MEMBER = "ADD_FAMILY_MEMBER";
const EDIT_FAMILY_MEMBER_NICKNAME = "EDIT_FAMILY_MEMBER_NICKNAME";
const EDIT_FAMILY_MEMBER_PROFILE_IMG = "EDIT_FAMILY_MEMBER_PROFILE_IMG";
const EDIT_FAMILY_MEMBER_TODAY_MOOD = "EDIT_FAMILY_MEMBER_TODAY_MOOD";
const DELETE_FAMILY_MEMBER = "DELETE_FAMILY_MEMBER";
const LEAVE_FAMILY = "LEAVE_FAMILY";

// 액션 생성함수
const getFamilyMember = createAction(
  GET_FAMILY_MEMBER,
  (nowFamilyMemberList) => ({
    nowFamilyMemberList,
  })
);
const getFamilyMemberStatus = createAction(
  GET_FAMILY_MEMBER_STATUS,
  (nowFamilyMemberStatusList) => ({
    nowFamilyMemberStatusList,
  })
);
const getSearchMember = createAction(GET_SEARCH_MEMBER, (userEmail) => ({
  userEmail,
}));
const addFamilyMember = createAction(ADD_FAMILY_MEMBER, (newFamilyMember) => ({
  newFamilyMember,
}));
const editFamilyMembeNickname = createAction(
  EDIT_FAMILY_MEMBER_NICKNAME,
  (familyId, familyMemberId, familyMemberNickname) => ({
    familyId,
    familyMemberId,
    familyMemberNickname,
  })
);
const editFamilyMemberProfileImg = createAction(
  EDIT_FAMILY_MEMBER_PROFILE_IMG,
  (newProfileImg, familyMemberId) => ({
    newProfileImg,
    familyMemberId,
  })
);
const editFamilyMemberTodayMood = createAction(
  EDIT_FAMILY_MEMBER_TODAY_MOOD,
  (todayMood, familyMemberId) => ({
    todayMood,
    familyMemberId,
  })
);
const deleteFamilyMember = createAction(
  DELETE_FAMILY_MEMBER,
  (familyId, familyMemberId) => ({
    familyId,
    familyMemberId,
  })
);
const leaveFamily = createAction(LEAVE_FAMILY, (familyId, familyMemberId) => ({
  familyId,
  familyMemberId,
}));

// api 응답 받는 미들웨어
const getFamilyMemberDB = (familyId) => {
  console.log("가족구성원GET용 fmailyId:", familyId);
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/family/${familyId}/familyMember`, {
        headers: config,
      })
      .then((res) => {
        console.log("가족 구성원 GET:", res);
        const { familyMemberList } = res.data;
        console.log(familyMemberList);
        dispatch(getFamilyMember(familyMemberList));
      })
      .catch((error) => {
        console.log("구성원 데이터 안옴", error);
        console.log(error.response);
      });
    // const { nowFamilyMemberList } = DummyData;
    // console.log("현재 멤버 리스트:", nowFamilyMemberList);
    // dispatch(getFamilyMember(nowFamilyMemberList));
  };
};

// 가족구성원 접속상태 받아오는 api
const getFamilyMemberStatusDB = (familyId) => {
  console.log("가족구성원GET용 fmailyId:", familyId);
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/main/${familyId}/connect`, {
        headers: config,
      })
      .then((res) => {
        console.log("가족 구성원 GET:", res);
        const { familyMemberStatusList } = res.data;
        console.log(familyMemberStatusList);
        dispatch(getFamilyMemberStatus(familyMemberStatusList));
      })
      .catch((error) => {
        console.log("구성원 데이터 안옴", error);
        console.log(error.response);
      });
  };
};

const getSearchMemberDB = (email) => {
  return function (dispatch, getState, { history }) {
    console.log("입력한 email :", email);
    const config = { Authorization: `Bearer ${getToken()}` };
    axios
      .get(`${BASE_URL}/family/search?search=${email}`, {
        headers: config,
      })
      .then((res) => {
        console.log("가족 구성원 검색 GET:", res);
        const { userEmail } = res.data;
        console.log(userEmail);
        dispatch(getSearchMember(userEmail));
      })
      .catch((error) => {
        console.log("구성원 검색 데이터 안옴", error);
        console.log(error.response.data.msg);
        dispatch(getSearchMember(error.response.data.msg));
      });

    // let familyMemberList = [
    //   { userId: "abe@gmail.com", userNickname: "홍길동" },
    //   { userId: "abedfgq@gmail.com", userNickname: "홍길동2" },
    //   { userId: "abedfgqdfsaf@gmail.com", userNickname: "홍길동3" },
    // ];

    // dispatch(getSearchMember(familyMemberList));
  };
};

const addFamilyMemberDB = (familyId, familyMemberNickname, selectuserId) => {
  console.log("가족멤버닉네임:", familyMemberNickname, "이메일:", selectuserId);
  return async function (dispatch, getState, { history }) {
    const newFamilyMember = {
      email: `${selectuserId}`,
      familyMemberNickname: `${familyMemberNickname}`,
    };
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(`${BASE_URL}/family/${familyId}`, newFamilyMember, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        console.log(res.msg);
        // const addedFamily = getState().family.familyList.find((f) => f.familyId === familyId)
        // dispatch(addFamilyMember(res.data.familyMember));
        history.push(`/family/${familyId}`);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        window.alert(err.response.data.msg);
      });
  };
};

const editFamilyMemberNicknameDB = (
  familyId,
  familyMemberId,
  familyMemberNickname,
  userId
) => {
  console.log(
    "가족아이디:",
    familyId,
    "가족맴버아이디:",
    familyMemberId,
    "가족맴버호칭:",
    familyMemberNickname,
    "userId",
    userId
  );
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .put(
        `${BASE_URL}/family/${familyId}/${familyMemberId}`,
        { familyMemberNickname },
        {
          headers: config,
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(
          editFamilyMembeNickname(
            familyId,
            familyMemberId,
            familyMemberNickname
          )
        );
        dispatch(
          homeActions.homeProfileUpdate(
            familyMemberId,
            familyMemberNickname,
            userId
          )
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const deleteFamilyMemberDB = (familyId, familyMemberId) => {
  console.log(familyId, familyMemberId);
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/family/familyMember/${familyMemberId}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        // dispatch(familyActions.deleteFamily(familyId));
        dispatch(deleteFamilyMember(familyId, familyMemberId));
        // history.go(0);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const leaveFamilyDB = (familyId, familyMemberId, otherFamilyId) => {
  console.log(familyId, familyMemberId);
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/family/familyMember/${familyMemberId}`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);

        dispatch(deleteFamilyMember(familyId, familyMemberId));
        dispatch(familyActions.deleteFamily(familyId));
        if (otherFamilyId !== undefined) {
          history.replace(`/family/${otherFamilyId}`);
        } else {
          history.replace("/");
        }
        // history.go(0);
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
    [GET_FAMILY_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberList = action.payload.nowFamilyMemberList;
        // console.log(state.familyList);
      }),

    [GET_FAMILY_MEMBER_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberStatusList = action.payload.nowFamilyMemberStatusList;
        // console.log(state.familyList);
      }),

    [GET_SEARCH_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        // 서버에서 받아온 맴버 리스트
        const { userEmail } = action.payload;
        // 멤버 리스트 주입
        draft.searchMember = userEmail;
      }),

    [ADD_FAMILY_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberList.push(action.payload.newFamilyMember);
      }),

    [EDIT_FAMILY_MEMBER_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        const { familyId, familyMemberId, familyMemberNickname } =
          action.payload;
        // 현재 가족
        let nowFamilyMember = draft.familyMemberList.find(
          (l) => l.familyMemberId === familyMemberId
        );

        // // 변경해야할 배열 인덱스
        let index = draft.familyMemberList.findIndex(
          (l) => l.familyMemberId === familyMemberId
        );

        nowFamilyMember = {
          ...nowFamilyMember,
          familyMemberNickname: familyMemberNickname,
        };

        draft.familyMemberList[index] = nowFamilyMember;
      }),

    [EDIT_FAMILY_MEMBER_PROFILE_IMG]: (state, action) =>
      produce(state, (draft) => {
        const { newProfileImg, familyMemberId } = action.payload;
        // 현재 가족
        let nowFamilyMember = draft.familyMemberList.find(
          (l) => l.familyMemberId === familyMemberId
        );

        // // 변경해야할 배열 인덱스
        let index = draft.familyMemberList.findIndex(
          (l) => l.familyMemberId === familyMemberId
        );

        nowFamilyMember = {
          ...nowFamilyMember,
          profileImg: newProfileImg,
        };

        draft.familyMemberList[index] = nowFamilyMember;
      }),

    [EDIT_FAMILY_MEMBER_TODAY_MOOD]: (state, action) =>
      produce(state, (draft) => {
        const { todayMood, familyMemberId } = action.payload;
        // 현재 가족
        let nowFamilyMember = draft.familyMemberList.find(
          (l) => l.familyMemberId === familyMemberId
        );

        // // 변경해야할 배열 인덱스
        let index = draft.familyMemberList.findIndex(
          (l) => l.familyMemberId === familyMemberId
        );

        nowFamilyMember = {
          ...nowFamilyMember,
          todayMood: todayMood,
        };

        draft.familyMemberList[index] = nowFamilyMember;
      }),

    [DELETE_FAMILY_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        const { familyId, familyMemberId } = action.payload;
        let newArr = draft.familyMemberList.filter(
          (l) => l.familyMemberId !== familyMemberId
        );
        console.log(
          state.familyMemberList.filter(
            (l) => l.familyMemberId !== familyMemberId
          )
        );
        draft.familyMemberList = newArr;
      }),

    [LEAVE_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        const { familyId, familyMemberId } = action.payload;
        let newArr = draft.familyMemberList.filter(
          (l) => l.familyMemberId !== familyMemberId
        );
        console.log(
          state.familyMemberList.filter(
            (l) => l.familyMemberId !== familyMemberId
          )
        );
        draft.familyMemberList = newArr;
      }),
  },
  initialState
);

export const familyMemberActions = {
  getFamilyMember,
  getSearchMember,
  addFamilyMember,
  editFamilyMembeNickname,
  editFamilyMemberProfileImg,
  editFamilyMemberTodayMood,
  deleteFamilyMember,
  getFamilyMemberDB,
  getFamilyMemberStatusDB,
  getSearchMemberDB,
  addFamilyMemberDB,
  editFamilyMemberNicknameDB,
  deleteFamilyMemberDB,
  leaveFamilyDB,
};
