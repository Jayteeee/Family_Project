import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Description,
  Login,
  Signup,
  LoginBarMenu,
} from "../components/LandingPage";
import { Input, Button } from "../elements";
import { familyActions } from "../redux/modules/family";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = React.useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);

  // 가족 이름 input
  const [familyTitle, setfamilyTitle] = useState("");

  const handleAddFamily = (e) => {
    const { value } = e.target;
    setfamilyTitle(value);
  };

  console.log(familyTitle);

  // 가족 생성 함수
  const addFamily = () => {
    dispatch(familyActions.addFamilyDB(familyTitle));
  };

  return (
    <Container>
      <Box>
        <div>
          <Description />
        </div>
        {!isLogin ? (
          <Question className="res-login">
            <div>
              {!isClient ? (
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
        ) : (
          <Question className="res-login">
            <div>
              <Content
                // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div style={{ textAlign: "start" }}>
                  <label htmlFor="changeName">가족 생성하기</label>
                  <div style={{ margin: "8px 0 20px" }}>
                    <Input
                      type="text"
                      id="changeName"
                      placeholder="가족 이름을 입력해주세요"
                      size="18px"
                      padding="0 36px 0 36px"
                      margin="0 0 20px"
                      onChange={handleAddFamily}
                      value={familyTitle}
                    />
                  </div>
                  <Button
                    style={{ minWidth: "80px" }}
                    // width="80px"
                    height="36px"
                    fontSize="15px"
                    bg="black"
                    color="white"
                    onClick={(e) => {
                      e.stopPropagation();
                      addFamily();
                    }}
                  >
                    가족 생성
                  </Button>
                </div>
              </Content>
            </div>
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 2em;
  margin: auto;
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
