import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/modules/user";
import { Button, Input, Text } from "../../elements";
import kakaoImg from "../../shared/images/카카오톡_심볼.svg";

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

  // 사이드바 매뉴 색상
  const handleMenuColor = () => {
    localStorage.setItem("homeMenuColor", "true");
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
            value={inputs.email ? inputs.email : ""}
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
            value={inputs.password ? inputs.password : ""}
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
          L
          onClick={() => {
            if (!inputs.email || !inputs.password) {
              alert("아이디, 비밀번호를 입력해주세요!");
              return;
            }
            login();
            handleMenuColor();
          }}
          color="#fff"
          borderColor="#fff"
          borderRadius="12px"
          height="6vh"
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
      <Box onClick={handleMenuColor}>
        <a href="https://doremilan.shop/auth/kakao">
          <KButton>
            <div>
              <KSymbol>
                <img alt="카카오톡 심볼" src={kakaoImg} />
                카카오로그인
              </KSymbol>
            </div>
          </KButton>
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
  button {
    background-color: rgba(99, 113, 247, 1);
    :hover {
      background: rgba(50, 69, 245, 1);
    }
  }
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
`;

const KButton = styled.p`
  margin: 24px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 6vh;
  padding: 0;
  margin: 0;
  background: white;
  color: black;
  font-weight: 500;
  font-size: 18px;
  border-radius: 12px;
  background-color: #fee500;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const KSymbol = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  font-weight: 600;
  img {
    width: 10%;
    height: 10%;
    background-color: transparent;
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
