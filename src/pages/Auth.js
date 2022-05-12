import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
  const REDIRECT_URI = "https://doremilan.shop/auth/kakao/callback";
  const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const history = useHistory();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      // code: code,
      // client_secret: CLIENT_SECRET,
    });
    console.log("여기까지 오나?");
    try {
      // access token 가져오기
      const res = await axios.get(
        `https://doremilan.shop/auth/kakao/callback?code=${code}`,
        payload
      );
      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      console.log(res);
      history.replace("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};

export default Auth;
