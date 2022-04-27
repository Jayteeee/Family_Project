const CLIENT_ID = "feb7f7070e81af19ab03bc3ac9737781";
const REDIRECT_URI = "https://localhost:3000/client/callback";

// 프런트엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

// 백엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:5000/kakao/code";

export const KakaoPath = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
