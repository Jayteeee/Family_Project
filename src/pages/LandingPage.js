import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Description,
  Login,
  Signup,
  LoginBarMenu,
  CreateFamily,
} from "../components/LandingPage";

const LandingPage = () => {
  const [isClient, setIsClient] = React.useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <Container>
      <Box>
        <DesBox>
          <Description />
        </DesBox>
        {!isLogin ? (
          <Question className="res-login">
            <Content>
              {!isClient ? (
                <div>
                  <Login checkClient={checkClient} />
                </div>
              ) : (
                <div>
                  <Signup checkClient={checkClient} />
                </div>
              )}
            </Content>
          </Question>
        ) : (
          <Question className="res-login">
            <Content>
              <CreateFamily />
            </Content>
          </Question>
        )}
        <LoginBar className="res-loginbar">
          <LoginBarMenu />
        </LoginBar>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  background-color: #6f5fce;
  /* opacity: 0.1; */
  height: 100%;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const DesBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 71.25%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 160px 80px 24px;
  height: 100%;
`;

const Question = styled.div`
  height: 100%;
  width: 28.75%;
  background-color: #fff;
`;

const LoginBar = styled.nav`
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  vertical-align: top;
  border-right: 1px solid rgba(29, 28, 29, 0.13);
`;

export default LandingPage;
