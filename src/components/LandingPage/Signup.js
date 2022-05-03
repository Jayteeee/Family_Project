import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input } from "../../elements";
import { userActions } from "../../redux/modules/user";

//회원가입
const Signup = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({});

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = () => {
    // 프론트 유효성검사 더 강화해야함
    if (!inputs.userId || !inputs.password || !inputs.nickname) {
      alert("빈값이 있네요~");
      return;
    }

    const { userId, nickname, password, passwordCheck } = inputs;

    dispatch(userActions.signUpDB(inputs));
  };

  return (
    <>
      <div>
        <SignUpWrap>
          <strong>회원가입</strong>
          <Input
            M
            id="userId"
            placeholder="name@work-userId.com"
            onChange={handleChange}
            value={inputs.userId || ""}
            margin="10px auto"
          />

          <Input
            M
            id="nickname"
            placeholder="Nickname"
            onChange={handleChange}
            value={inputs.nickname || ""}
            margin="10px auto"
          />
          <Input
            M
            id="password"
            type="password"
            placeholder="Please enter your password"
            onChange={handleChange}
            value={inputs.password || ""}
            margin="10px auto"
          />
          <Input
            M
            id="passwordCheck"
            type="password"
            placeholder="Please enter your password"
            onChange={handleChange}
            value={inputs.passwordCheck || ""}
            margin="10px auto"
          />
          <Button L onClick={handleSubmit} margin="10px auto 0">
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
  width: 20rem;
  padding: 10px 2em;
  margin: auto;
`;

export default Signup;
