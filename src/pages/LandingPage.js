import React from "react";
import styled from "styled-components";
import { Description, Login, Signup } from "../components/LandingPage";

const LandingPage = () => {
  const [isClient, setIsClient] = React.useState(false);

  return (
    <Container>
      <Box>
        <div>
          <Description />
        </div>
        <div style={{ backgroundColor: "green" }}>
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
        </div>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  background: yellow;
  height: 100%;
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
  & > span {
    cursor: pointer;
  }
`;

export default LandingPage;
