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
    const idCheck = (email) => {
      let _reg =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

      return _reg.test(email);
    };

    const nickCheck = (nickname) => {
      let _reg = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣+]*$/;

      return _reg.test(nickname);
    };

    const pwdCheck = (password) => {
      let _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;

      return _reg.test(password);
    };

    if (!inputs.email || !inputs.password || !inputs.nickname) {
      alert("빈값이 있네요~");
      return;
    }

    if (inputs.password !== inputs.passwordCheck) {
      alert("비밀번호와 비밀번호확인 값이 다릅니다.");
      return;
    }

    if (!idCheck(inputs.email)) {
      alert("아이디는 이메일 양식으로 작성해주세요!");
      return;
    }

    if (!nickCheck(inputs.nickname)) {
      alert(
        "닉네임은 3-15자,숫자,영어,한글만 가능하며 특수문자 및 띄어쓰기는 불가능합니다."
      );
      return;
    }

    if (!pwdCheck(inputs.password)) {
      alert(
        "비밀번호는 8~20 영문 대소문자, 최소 1개의 숫자 혹은 특수 문자를 포함해야합니다."
      );
      return;
    }
    const { userId, nickname, password, passwordCheck } = inputs;

    dispatch(userActions.signUpDB(inputs));
  };

  return (
    <SignUpWrap>
      <Input
        M
        id="email"
        placeholder="name@naver.com"
        onChange={handleChange}
        value={inputs.email || ""}
        margin="10px auto"
      />

      <Input
        M
        id="nickname"
        placeholder="닉네임을 입력해주세요."
        onChange={handleChange}
        value={inputs.nickname || ""}
        margin="10px auto"
      />
      <Input
        M
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleChange}
        value={inputs.password || ""}
        margin="10px auto"
      />
      <Input
        M
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
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
