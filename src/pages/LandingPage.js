import React from "react";
import styled from "styled-components";
import {
  Description,
  Login,
  Signup,
  LoginBarMenu,
} from "../components/LandingPage";

const LandingPage = (props) => {
  const [isClient, setIsClient] = React.useState(false);

  return (
    <Container>
      <Box>
        <div>
          <Description />
        </div>
        <Question className="res-login">
          <div>
            {isClient === false ? (
              <div>
                <Login />
                <MsgBox>
                  <p>아직 회원이 아니신가요?</p>
                  <span onClick={() => setIsClient(true)}>회원가입</span>
                </MsgBox>
              </div>
            ) : (
              <div>
                <Signup />
                <MsgBox>
                  <p>회원이신가요?</p>
                  <span onClick={() => setIsClient(false)}>로그인</span>
                </MsgBox>
              </div>
            )}
          </div>
        </Question>
        <LoginBar className="res-loginbar">
          <LoginBarMenu />
        </LoginBar>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
  & > span {
    cursor: pointer;
  }
`;

const Question = styled.div`
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const LoginBar = styled.nav`
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  vertical-align: top;
  border-right: 1px solid rgba(29, 28, 29, 0.13);
`;

export default LandingPage;
