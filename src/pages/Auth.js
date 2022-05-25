import { useEffect } from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken, insertToken, removeToken } from "../shared/Token";

// const initialState = {
//   user: {},
//   isLogin: false,
// };

// //액션
// const KAKAO_LOG_IN = "KAKAO_LOG_IN";

// //액션 생성함수
// const kakaoLogin = createAction(KAKAO_LOG_IN, (user) => ({ user }));

const Auth = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const history = useHistory();
  const dispatch = useDispatch();

  const kakaoLoginDB = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
    });
    // return function () {
    // access token 가져오기
    try {
      // access token 가져오기
      const res = await axios.get(
        `https://doremilan.shop/auth/kakao?code=${code}`,
        payload
      );

      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      // window.Kakao.Auth.setAccessToken(res.data.access_token);
      insertToken(res.data.token);
      history.replace("/");
      history.go(0);
    } catch (err) {}
    // };

    // await axios
    //   .get(`https://doremilan.shop/auth/kakao?code=${code}`, payload)
    //   .then((res) => {
    //     // Kakao Javascript SDK 초기화
    //     window.Kakao.init(REST_API_KEY);
    //     // access token 설정
    //     window.Kakao.Auth.setAccessToken(res.data.access_token);

    //     console.log(res);
    //     // const familyId = res.data.familyList[0]?.familyId;
    //     // insertToken(res.data.token);
    //     // dispatch(kakaoLogin(res.data));
    //     // res.data.familyList.length !== 0
    //     //   ? history.push(`/family/${familyId}`)
    //     //   : history.go(0);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    // };
  };

  useEffect(() => {
    kakaoLoginDB();
  }, []);

  return null;
};

// export default handleActions(
//   {
//     [LOG_IN]: (state, action) =>
//       produce(state, (draft) => {
//         draft.user = action.payload.user;
//         draft.isLogin = true;
//       }),
//     [LOG_OUT]: (state) =>
//       produce(state, (draft) => {
//         removeToken();
//         draft.user = null;
//         draft.isLogin = false;
//       }),
//     [GET_USER]: (state, action) =>
//       produce(state, (draft) => {
//         draft.user = action.payload.user;
//         draft.isLogin = true;
//       }),
//   },
//   initialState
// );

export default Auth;
