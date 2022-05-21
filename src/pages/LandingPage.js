import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Description,
  Login,
  Signup,
  CreateFamily,
} from "../components/LandingPage";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const [isClient, setIsClient] = React.useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  const isLogin = useSelector((state) => state.user.isLogin);
  // const isMember = useSelector((state) => state.user?.user?.familyList);
  const isMember = useSelector((state) => state.family?.familyList);
  // const isLikeFamilyList = useSelector(
  //   (state) => state.user?.user.familyListUnique
  // );

  if (isLogin && isMember?.length !== 0) {
    history.replace(`/family/${isMember[0]?.familyId}`);
  }

  return (
    <Container>
      <Box>
        <DesBox>
          <LogoBox>
            <Logo>로고</Logo>
          </LogoBox>
          <Description />
        </DesBox>
        {!isLogin ? (
          <Question>
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
          <Question>
            <Content>
              <CreateFamily />
            </Content>
          </Question>
        )}
      </Box>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(111, 95, 206, 0.1);
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  @media only screen and (max-width: 839px) {
    height: fit-content;
    overflow-y: auto;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 71.25%;
  @media only screen and (max-width: 1199px) {
    width: 50%;
  }
  @media only screen and (max-width: 839px) {
    width: 100%;
  }
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
`;
const Logo = styled.div`
  width: 258px;
  height: 80px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 160px 80px 24px;
  height: 100%;
  @media only screen and (max-width: 839px) {
    margin: 40px 24px;
  }
`;

const Question = styled.div`
  height: 100%;
  width: 28.75%;
  background-color: #fff;
  @media only screen and (max-width: 1199px) {
    width: 50%;
  }
  @media only screen and (max-width: 839px) {
    width: 100%;
    height: auto;
    bottom: 0;
  }
`;

export default LandingPage;
