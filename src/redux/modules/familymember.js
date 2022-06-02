import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getToken } from "../../shared/Token";
import { homeActions } from "./home";
import { familyActions } from "./family";

const BASE_URL = "https://doremilan.shop";

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
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/family/${familyId}/familyMember`, {
        headers: config,
      })
      .then((res) => {
        const { familyMemberList } = res.data;
        dispatch(getFamilyMember(familyMemberList));
      })
      .catch((error) => {});
  };
};

// 가족구성원 접속상태 받아오는 api
const getFamilyMemberStatusDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/main/${familyId}/connect`, {
        headers: config,
      })
      .then((res) => {
        const { familyMemberStatusList } = res.data;
        dispatch(getFamilyMemberStatus(familyMemberStatusList));
      })
      .catch((error) => {});
  };
};

const getSearchMemberDB = (email) => {
  return function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    axios
      .get(`${BASE_URL}/family/search?search=${email}`, {
        headers: config,
      })
      .then((res) => {
        const { userEmail } = res.data;
        dispatch(getSearchMember(userEmail));
      })
      .catch((error) => {
        dispatch(getSearchMember(error.response.data.msg));
      });
  };
};

const addFamilyMemberDB = (familyId, familyMemberNickname, selectuserId) => {
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
        history.push(`/family/${familyId}`);
      })
      .catch((err) => {
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
      .catch((err) => {});
  };
};

const deleteFamilyMemberDB = (familyId, familyMemberId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/family/familyMember/${familyMemberId}`, {
        headers: config,
      })
      .then((res) => {
        dispatch(deleteFamilyMember(familyId, familyMemberId));
      })
      .catch((err) => {});
  };
};

const leaveFamilyDB = (familyId, familyMemberId, otherFamilyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .delete(`${BASE_URL}/family/familyMember/${familyMemberId}`, {
        headers: config,
      })
      .then((res) => {
        dispatch(deleteFamilyMember(familyId, familyMemberId));
        dispatch(familyActions.deleteFamily(familyId));
        if (otherFamilyId !== undefined) {
          history.replace(`/family/${otherFamilyId}`);
        } else {
          history.replace("/");
        }
      })
      .catch((err) => {});
  };
};

//리듀서;
export default handleActions(
  {
    [GET_FAMILY_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberList = action.payload.nowFamilyMemberList;
      }),

    [GET_FAMILY_MEMBER_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberStatusList = action.payload.nowFamilyMemberStatusList;
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
        draft.familyMemberList = newArr;
      }),

    [LEAVE_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        const { familyMemberId } = action.payload;
        let newArr = draft.familyMemberList.filter(
          (l) => l.familyMemberId !== familyMemberId
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
