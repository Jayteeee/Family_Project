import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/modules/user";
import { Button } from "../../elements";
import kakaoImg from "../../shared/images/kakao_login_large_narrow.png";
import { KakaoPath } from "../../shared/KakaoPath";

const Login = () => {
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

  const logOut = () => {
    dispatch(userActions.userLogout());
  };

  return (
    <LoginWrap>
      <strong>로그인</strong>
      {/* <label>아이디</label> */}
      <input
        id="userId"
        type="text"
        onChange={handleChange}
        value={inputs.userId}
        placeholder="아이디"
      ></input>
      {/* <label>비밀번호</label> */}
      <input
        id="password"
        type="password"
        onChange={handleChange}
        value={inputs.password}
        placeholder="비밀번호"
      ></input>
      <br />
      <Button L onClick={login}>
        로그인 하기
      </Button>
      {/* <Button L onClick={logOut}>
        로그아웃 하기
      </Button> */}
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
  padding: 2em;
  margin: auto;
  border: 1px solid black;
  background-color: red;
  & > a {
    & > img {
      width: 16em;
    }
  }
`;

export default Login;
