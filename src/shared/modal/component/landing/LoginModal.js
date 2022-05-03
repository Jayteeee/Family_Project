import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch } from "react-redux";

// 엘리먼트
import { Input, Button } from "../../../../elements";
import { userActions } from "../../../../redux/modules/user";
import kakaoImg from "../../../images/kakao_login_large_narrow.png";
import { KakaoPath } from "../../../../shared/KakaoPath";

const LoginModal = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = React.useState({});

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const login = () => {
    dispatch(userActions.loginDB(inputs));
  };

  return (
    <LoginWrap>
      <Input
        M
        id="userId"
        type="text"
        onChange={handleChange}
        value={inputs.userId}
        placeholder="아이디"
        margin="10px auto"
      ></Input>
      {/* <label>비밀번호</label> */}
      <Input
        M
        id="password"
        type="password"
        onChange={handleChange}
        value={inputs.password}
        placeholder="비밀번호"
        margin="10px auto"
      ></Input>
      <Button L onClick={login} margin="1em auto">
        로그인 하기
      </Button>
      <a href={KakaoPath}>
        <img alt="카카오로그인" src={kakaoImg} />
      </a>
    </LoginWrap>
  );
};
const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 2em 0 0;
  margin: auto;
  & > a {
    & > img {
      width: 20rem;
    }
  }
`;
export default LoginModal;
