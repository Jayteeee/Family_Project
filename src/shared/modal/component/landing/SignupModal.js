import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch } from "react-redux";

// 엘리먼트
import { Input, Button } from "../../../../elements";
import { userActions } from "../../../../redux/modules/user";

const SignupModal = () => {
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
    <SignUpWrap>
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
  );
};

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 2em 0 0;
  margin: auto;
`;
export default SignupModal;
