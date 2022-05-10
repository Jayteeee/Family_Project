import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { DummyData } from "../../shared/DummyData";
import dayjs from "dayjs";
import { getToken } from "../../shared/Token";

const BASE_URL = "https://doremilan.shop";

const initialState = {
  familyMemberList: [],
  searchMemberList: [],
};

// 액션
const GET_FAMILY_MEMBER = "GET_FAMILY_MEMBER";
const GET_SEARCH_MEMBER = "GET_SEARCH_MEMBER";
const ADD_FAMILY_MEMBER = "ADD_FAMILY_MEMBER";
const EDIT_FAMILY_MEMBER_NICKNAME = "EDIT_FAMILY_MEMBER";
const DELETE_FAMILY_MEMBER = "DELETE_FAMILY_MEMBER";

// 액션 생성함수
const getFamilyMember = createAction(
  GET_FAMILY_MEMBER,
  (nowFamilyMemberList) => ({
    nowFamilyMemberList,
  })
);
const getSearchMember = createAction(GET_SEARCH_MEMBER, (searchMemberList) => ({
  searchMemberList,
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
const deleteFamilyMember = createAction(
  DELETE_FAMILY_MEMBER,
  (familyId, familyMemberId) => ({
    familyId,
    familyMemberId,
  })
);

// api 응답 받는 미들웨어
const getFamilyMemberDB = (familyId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/family/${familyId}/familyMember`, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        const { familyMemberList } = res.data;
        console.log(familyMemberList);
        // dispatch(getSearchMember(familyMemberList));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        console.log(error.response);
      });
    // const { nowFamilyMemberList } = DummyData;
    // console.log("현재 멤버 리스트:", nowFamilyMemberList);
    // dispatch(getFamilyMember(nowFamilyMemberList));
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
        console.log(res);
        const { searchKeyword } = res.data;
        console.log(searchKeyword);
        dispatch(getSearchMember(searchKeyword));
      })
      .catch((error) => {
        console.log("패밀리 데이터 안옴", error);
        console.log(error.response);
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
      familyMemberNickname: `${familyMemberNickname}`,
      familyMemberId: `${selectuserId}`,
    };
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .post(`${BASE_URL}/family/${familyId}`, newFamilyMember, {
        headers: config,
      })
      .then((res) => {
        console.log(res);
        console.log(res.msg);
        dispatch(addFamilyMember(newFamilyMember));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const editFamilyMemberNicknameDB = (
  familyId,
  familyMemberId,
  familyMemberNickname
) => {
  console.log(
    "가족아이디:",
    familyId,
    "가족맴버아이디:",
    familyMemberId,
    "가족맴버호칭:",
    familyMemberNickname
  );
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .put(
    //     `${BASE_URL}/family/${familyId}/${familyMemberId}`,
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
    dispatch(
      editFamilyMembeNickname(familyId, familyMemberId, familyMemberNickname)
    );
  };
};

const deleteFamilyMemberDB = (familyId, familyMemberId) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${getToken()}` };
    // await axios
    //   .delete(`${BASE_URL}/family/${familyId}/${familyMemberId}`, {
    //     headers: config,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     // window.alert(res.msg)
    //     alert("삭제!");
    dispatch(deleteFamilyMember(familyId, familyMemberId));
    // history.go(0);
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
    [GET_FAMILY_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.familyMemberList = action.payload.nowFamilyMemberList;
        // console.log(state.familyList);
      }),

    [GET_SEARCH_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        // 서버에서 받아온 맴버 리스트
        const { searchMemberList } = action.payload;
        // 멤버 리스트 주입
        draft.searchMemberList = searchMemberList;
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

        // console.log(state,fam)

        // let nowFamilMemberList = d
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

    [DELETE_FAMILY_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        const { famliyId, familyMemberId } = action.payload;
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
  deleteFamilyMember,
  getFamilyMemberDB,
  getSearchMemberDB,
  addFamilyMemberDB,
  editFamilyMemberNicknameDB,
  deleteFamilyMemberDB,
};
