const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API;
const REDIRECT_URI = "https://doremilan.shop/auth/kakao/callback";

export const KakaoPath = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
