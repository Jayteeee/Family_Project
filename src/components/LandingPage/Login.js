import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/modules/user";
import { Button, Input, Text } from "../../elements";
import kakaoImg from "../../shared/images/kakao_login_large_wide.png";
import { KakaoPath } from "../../shared/KakaoPath";

const Login = ({ checkClient }) => {
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
      <Text S3>로그인</Text>
      <Box>
        <InputBox>
          <Input
            M
            id="email"
            className="myInput"
            type="text"
            onChange={handleChange}
            onBlur={handleChange}
            value={inputs.email}
            placeholder="아이디"
            margin="0 0 8px 0"
            padding="16px"
            height="56px"
            style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
          ></Input>
        </InputBox>
        <InputBox>
          <Input
            M
            id="password"
            className="myInput"
            type="password"
            onChange={handleChange}
            onBlur={handleChange}
            value={inputs.password}
            placeholder="비밀번호"
            margin="0 0 8px 0"
            padding="16px"
            height="56px"
            style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
          ></Input>
        </InputBox>
      </Box>
      <Box>
        <Button
          id="myBtn"
          L
          onClick={() => {
            if (!inputs.email || !inputs.password) {
              alert("아이디, 비밀번호를 입력해주세요!");
              return;
            }
            login();
          }}
          color="#fff"
          borderColor="#fff"
          borderRadius="12px"
          style={{ backgroundColor: "#6F5FCE", opacity: "0.4" }}
        >
          로그인
        </Button>
        <MsgBox>
          <span onClick={() => checkClient(false)}>회원가입</span>
        </MsgBox>
      </Box>
      <Box>
        <div className="line">또는</div>
      </Box>
      <Box>
        <a href="https://doremilan.shop/auth/kakao">
          <img alt="카카오로그인" src={kakaoImg} />
        </a>
      </Box>
    </LoginWrap>
  );
};
const LoginWrap = styled.div`
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
      border-color: #6f5fce !important;
    }
  }
`;

const Box = styled.div`
  margin: 24px 0 0;
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 14px;
    margin: 8px 0px;
  }
  .line::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px 0 0;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  .line::after {
    content: "";
    flex-grow: 1;
    margin: 0px 0 0 16px;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  & > a {
    & > img {
      width: 100%;
    }
  }
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

export default Login;
