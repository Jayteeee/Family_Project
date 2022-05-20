import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Input, Text } from "../../elements";
import { userActions } from "../../redux/modules/user";

//회원가입
const Signup = ({ checkClient }) => {
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
      let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

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
        "닉네임은 2-15자,숫자,영어,한글만 가능하며 특수문자는 불가능합니다."
      );
      return;
    }

    if (!pwdCheck(inputs.password)) {
      alert(
        "비밀번호는 8~20 영문 대소문자, 최소 1개의 숫자 혹은 특수 문자를 포함해야합니다."
      );
      return;
    }

    const { email, nickname, password, passwordCheck } = inputs;

    dispatch(userActions.signUpDB(inputs));
  };

  return (
    <>
      <div>
        <SignUpWrap>
          <Text S3>회원가입</Text>
          <Box>
            <InputBox>
              <Input
                M
                id="email"
                className="myInput"
                placeholder="name@naver.com"
                onChange={handleChange}
                value={inputs.email || ""}
                margin="0 0 8px 0"
                padding="16px"
                height="56px"
                style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
              />
            </InputBox>
            <InputBox>
              <Input
                M
                id="nickname"
                className="myInput"
                placeholder="닉네임을 입력해주세요."
                onChange={handleChange}
                value={inputs.nickname || ""}
                margin="0 0 8px 0"
                padding="16px"
                height="56px"
                style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
              />
            </InputBox>
            <InputBox>
              <Input
                M
                id="password"
                className="myInput"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handleChange}
                value={inputs.password || ""}
                margin="0 0 8px 0"
                padding="16px"
                height="56px"
                style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
              />
            </InputBox>
            <InputBox>
              <Input
                M
                id="passwordCheck"
                className="myInput"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                onChange={handleChange}
                value={inputs.passwordCheck || ""}
                margin="0 0 8px 0"
                padding="16px"
                height="56px"
                style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
              />
            </InputBox>
          </Box>
          <Box>
            <Button
              L
              id="myBtn"
              onClick={handleSubmit}
              color="#fff"
              borderColor="#fff"
              borderRadius="12px"
              style={{ backgroundColor: "#6371F7", opacity: "0.4" }}
            >
              회원가입
            </Button>
            <MsgBox>
              <span onClick={() => checkClient(true)}>로그인으로 돌아가기</span>
            </MsgBox>
          </Box>
        </SignUpWrap>
      </div>
    </>
  );
};

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  #myBtn {
    :hover {
      opacity: 1 !important;
    }
  }
  .myInput {
    :focus {
      box-shadow: none;
      outline: none !important;
      border-color: #6371f7 !important;
    }
  }
`;
const Box = styled.div`
  margin: 24px 0 0;
`;
const InputBox = styled.div`
  margin-top: 11px;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
  & > span {
    cursor: pointer;
  }
`;

export default Signup;
