import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/Token";
import { familyMemberActions } from "./familymember";
import { detailPhotoActions } from "./detailphoto";
import { missionActions } from "./mission";

const BASE_URL = "https://doremilan.shop";
// const BASE_URL = "http://52.79.130.222";

const initialState = {
  user: {},
  isLogin: false,
};

// 액션
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const EDIT_PROFILE_IMG = "EDIT_PROFILE_IMG";
const DELETE_USER_FAMILY = "DELETE_USER_FAMILY";
// const EDIT_TODAY_MOOD = "EDIT_TODAY_MOOD";

// 액션 생성함수
const login = createAction(LOG_IN, (userData) => ({ userData }));
const logOut = createAction(LOG_OUT);
const getUser = createAction(GET_USER, (user) => ({ user }));
const editProfileImg = createAction(EDIT_PROFILE_IMG, (profileImg) => ({
  profileImg,
}));
const deleteUserFamily = createAction(DELETE_USER_FAMILY, (familyId) => ({
  familyId,
}));
// const editTodayMood = createAction(EDIT_TODAY_MOOD, (todayMood) => ({
//   todayMood,
// }));

// 미들웨어
const userLogout = () => {
  return async function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace("/");
    // history.go(0);
  };
};

// 여기부터 api 응답 받는 미들웨어
// /auth/signup
const signUpDB = (inputs) => {
  return async function (dispatch, getState, { history }) {
    const { email, password, passwordCheck, nickname } = inputs;

    await axios
      .post(`${BASE_URL}/auth/signup`, inputs)
      .then((res) => {
        alert(res.data.msg);
        history.go(0);
      })
      .catch((err) => {
        // alert(err.data.msg);
      });
  };
};

// /user/login
const loginDB = (inputs) => {
  return async function (dispatch, getState, { history }) {
    // axios
    await axios
      .post(`${BASE_URL}/auth/login`, inputs)
      .then((res) => {
        const token = res.data.logIntoken;
        const { userInfo } = res.data;
        const familyId = res.data.familyList[0]?.familyId;
        insertToken(token);
        const { familyList } = res.data;

        // 소켓 부분

        const socket = getState().socket.socket;

        socket?.emit("join", res.data.userInfo.id);

        // 로그인시 들어오는 데이터 GET_USER시 들어오는 데이터와 똑같이 맞추기 위함.
        let userData = { familyList, user: userInfo };

        dispatch(login(userData));

        res.data.familyList.length !== 0
          ? history.push(`/family/${familyId}`)
          : history.go(0);

        dispatch(familyMemberActions.getFamilyMemberDB(familyId));
      })
      .catch((err) => {
        alert("로그인 정보를 확인해주세요.");
      });
  };
};

// /user/me
const getUserInfo = (token) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${token}` };
    await axios
      .get(`${BASE_URL}/user/me`, { headers: config })
      .then((res) => {
        const user = res.data;
        dispatch(getUser(user));
        localStorage.setItem("isLogin", token);
      })
      .catch((err) => {});
  };
};

const editTodayMoodDB = (todayMood, myFamiyMemberId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .put(
        `${BASE_URL}/user/myProfile/todaymood`,
        { todayMood },
        {
          headers: config,
        }
      )
      .then((res) => {
        const { todayMood } = res.data;

        dispatch(
          familyMemberActions.editFamilyMemberTodayMood(
            todayMood,
            myFamiyMemberId
          )
        );
      })
      .catch((err) => {
        alert("새로고침 해주세요.");
      });
  };
};

const editProfileImgDB = (formData, myFamiyMemberId) => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .put(`${BASE_URL}/user/myProfile`, formData, {
        headers: config,
      })
      .then((res) => {
        const newProfileImg = res.data.photoFile;

        dispatch(
          familyMemberActions.editFamilyMemberProfileImg(
            newProfileImg,
            myFamiyMemberId
          )
        );

        dispatch(editProfileImg(newProfileImg));
        // dispatch(
        //   missionActions.editMissionMemberProfileImg(
        //     newProfileImg,
        //     myFamiyMemberId
        //   )
        // );
        window.alert("프로필 이미지가 수정되었습니다.");
      })
      .catch((err) => {});
  };
};

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.userData;

        draft.isLogin = true;
      }),
    [LOG_OUT]: (state) =>
      produce(state, (draft) => {
        removeToken();
        draft.user = null;
        draft.isLogin = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [EDIT_PROFILE_IMG]: (state, action) =>
      produce(state, (draft) => {
        const { profileImg } = action.payload;
        draft.user.user.profileImg = profileImg;
      }),
    [DELETE_USER_FAMILY]: (state, action) =>
      produce(state, (draft) => {
        const { familyId } = action.payload;
        let newArr = draft.user.familyList.filter(
          (l) => l.familyId !== familyId
        );
        draft.user.familyList = newArr;
      }),
  },
  initialState
);

export const userActions = {
  signUpDB,
  loginDB,
  getUserInfo,
  userLogout,
  editProfileImgDB,
  editTodayMoodDB,
  deleteUserFamily,
};
