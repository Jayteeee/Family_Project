const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API;
const REDIRECT_URI = "http://localhost:5000/kakao/code";

export const KakaoPath = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
