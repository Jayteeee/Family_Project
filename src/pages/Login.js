import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";
import { Button } from "../elements";

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
      <label>아이디</label>
      <input
        id="email"
        type="text"
        onChange={handleChange}
        value={inputs.email}
      ></input>
      <label>비밀번호</label>
      <input
        id="password"
        type="password"
        onChange={handleChange}
        value={inputs.password}
      ></input>
      <br />
      <Button onClick={login}>로그인 하기</Button>
      <Button onClick={logOut}>로그아웃 하기</Button>
    </LoginWrap>
  );
};
const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 4% auto;
`;
export default Login;
