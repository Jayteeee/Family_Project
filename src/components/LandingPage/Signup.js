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
          <Input
            id="userId"
            placeholder="name@work-userId.com"
            onChange={handleChange}
            value={inputs.userId || ""}
          />

          <Input
            id="nickname"
            placeholder="Nickname"
            onChange={handleChange}
            value={inputs.nickname || ""}
          />
          <Input
            id="password"
            type="password"
            placeholder="Please enter your password"
            onChange={handleChange}
            value={inputs.password || ""}
          />
          <Input
            id="passwordCheck"
            type="password"
            placeholder="Please enter your password"
            onChange={handleChange}
            value={inputs.passwordCheck || ""}
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
  width: 20rem;
  padding: 2em;
  margin: auto;
  border: 1px solid black;
  background-color: red;
`;

export default Signup;
