import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input } from "../elements";
import { userActions } from "../redux/modules/user";

//회원가입
const SignUp = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({});

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = () => {
    // 프론트 유효성검사 더 강화해야함
    if (!inputs.email || !inputs.password || !inputs.nickname) {
      alert("빈값이 있네요~");
      return;
    }

    const { email, nickname, password, passwordCheck } = inputs;

    dispatch(userActions.signUpDB(inputs));
  };

  return (
    <>
      <div>
        <SignUpWrap>
          <Input
            id="email"
            placeholder="name@work-email.com"
            onChange={handleChange}
            value={inputs.email}
          />

          <Input
            id="nickname"
            placeholder="Nickname"
            onChange={handleChange}
            value={inputs.nickname}
          />
          <Input
            id="password"
            type="password"
            placeholder="Please enter your password"
            onChange={handleChange}
            value={inputs.password}
          />
          <Input
            id="passwordCheck"
            type="password"
            placeholder="Please enter your password"
            onChange={handleChange}
            value={inputs.passwordCheck}
          />
          <Button L onClick={handleSubmit}>
            회원가입
          </Button>
        </SignUpWrap>
      </div>
    </>
  );
};

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: auto;
`;

export default SignUp;
