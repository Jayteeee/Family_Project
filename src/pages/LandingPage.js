import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Description,
  Login,
  Signup,
  CreateFamily,
} from "../components/LandingPage";
import { useHistory } from "react-router-dom";

// 엘리먼트
import { Text } from "../elements";

// 이미지
import logo from "../shared/images/Footer_logo.svg";
import mail from "../shared/images/Footer_mail.svg";
import insta from "../shared/images/Footer_insta.svg";
import help from "../shared/images/Footer_help.svg";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import EventModal from "../shared/modal/component/EventModal";

const LandingPage = () => {
  const history = useHistory();
  const [isClient, setIsClient] = React.useState(false);
  const checkClient = () => {
    setIsClient(!isClient);
  };
  const isLogin = useSelector((state) => state.user.isLogin);
  const isMember = useSelector((state) => state.user?.user?.familyList);

  if (isLogin && isMember?.length !== 0) {
    history.replace(`/family/${isMember[0]?.familyId}`);
  }

  const [modalOn, setModalOn] = useState(false);

  const HAS_VISITED_BEFORE = localStorage.getItem("hasVisitedBefore");
  // console.log(HAS_VISITED_BEFORE);
  // console.log(new Date());

  useEffect(() => {
    const handleModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }

      if (!HAS_VISITED_BEFORE) {
        setModalOn(true);
      }
    };
    window.setTimeout(handleModal, 2000);
  }, [HAS_VISITED_BEFORE]);

  const handleClose = () => {
    setModalOn(false);
  };
  const dayClose = () => {
    let expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem("hasVisitedBefore", expires);
    setModalOn(false);
  };
  return (
    <Container>
      <UpperBox>
        <DesBox>
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
      </UpperBox>
      <LowerBox>
        <Left>
          <LogoBox>
            <img alt="도란도란로고" src={logo} />
          </LogoBox>
          <CreaterBox>
            <Team>
              <Text B2 color="rgba(117, 117, 117, 1)">
                이메일: doranee@gmail.com | 인스타그램: @dorandoran_official
              </Text>
              <Text B2 color="rgba(117, 117, 117, 1)">
                만든 사람들: DESIGNER 윤혜원 ∙ 정주현 | FRONTEND 김정태 ∙ 이덕행
                | BACKEND 성영호 ∙ 서현우 ∙ 이미란
              </Text>
            </Team>
            <Text B2 color="rgba(117, 117, 117, 1)">
              ©Dorandoran. All rights Reserved.
            </Text>
          </CreaterBox>
        </Left>
        <IconBox>
          <a href="mailto:doranee99@gamil.com">
            <img alt="이메일" src={mail} />
          </a>
          <a href="https://www.instagram.com/dorandoran.official/">
            <img alt="인스타그램" src={insta} />
          </a>
          <a href="#">
            <img alt="설문조사" src={help} />
          </a>
        </IconBox>
      </LowerBox>
      {/* 이벤트 모달 */}
      <ModalPortal>
        {modalOn && (
          <EventModal onClose={handleClose} dayClose={dayClose}></EventModal>
        )}
      </ModalPortal>
    </Container>
  );
};

const Container = styled.div`
  background-color: #eff1fe;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  @media only screen and (max-width: 839px) {
    height: fit-content;
    overflow-y: auto;
  }
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 89%;
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 160px 80px 24px;
  height: 100%;
  @media only screen and (max-width: 1199px) {
    margin: 0 80px;
    justify-content: center;
  }
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

const LowerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 40px;
  width: 100%;
  height: 11%;
  border-top: 1px solid rgba(219, 219, 219, 1);
  @media screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

const LogoBox = styled.div`
  margin-right: 40px;
  @media screen and (max-width: 599px) {
    margin-bottom: 20px;
  }
`;
const CreaterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media screen and (max-width: 599px) {
    margin-bottom: 20px;
  }
`;
const Team = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  margin-bottom: 8px;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    margin: 0 15px;
  }
  @media screen and (max-width: 839px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export default LandingPage;
