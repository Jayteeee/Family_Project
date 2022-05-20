import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";
import { io } from "socket.io-client";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, Input, Text } from "../../../../elements";
import { familyMemberActions } from "../../../../redux/modules/familymember";

const AddMemberModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const { familyTitle, familyId } = useContext(MainContext)[0];

  console.log("현재 가족 이름:", familyTitle, "현재 가족 아이디:", familyId);

  // 가족 구성원 추가하기 관련 코드
  const [searchEmail, setsearchEmail] = useState(""); // 검색한 userId
  const [selectEmail, setSelectEmail] = useState("");
  const [familyMemberNickname, setfamilyMemberNickname] = useState("");

  const searchMember = useSelector(
    (state) => state?.familymember?.searchMember
  );

  console.log("검색한 이메일:", searchEmail);

  console.log("검색한 맴버:", searchMember);
  console.log("선택한 맴버:", selectEmail);

  // 검색한 userId 주입
  const handleSearchEmail = (e) => {
    setsearchEmail(e.target.value);
    dispatch(familyMemberActions.getSearchMemberDB(e.target.value));
  };
  // 선택한 userId input value에 주입
  const handleSelectEmail = (e) => {
    console.log(e.target.getAttribute("value"));
    document.getElementById("addMember").value = e.target.getAttribute("value");
    setSelectEmail(e.target.getAttribute("value"));
  };
  // input에 입력한 호칭 주입
  const handleMemberNickName = (e) => {
    const { value } = e.target;
    setfamilyMemberNickname(value);
  };

  // 소켓 부분
  const ENDPOINT = "http://52.79.130.222/room";

  const [socket, setSocket] = useState(
    io.connect(ENDPOINT, {
      transports: ["websocket"],
      forceNew: true,
      path: "/socket.io",
    })
  );

  // 가족 구성원 추가하기 함수
  const addFamilyMember = () => {
    dispatch(
      familyMemberActions.addFamilyMemberDB(
        familyId,
        familyMemberNickname,
        selectEmail
      )
    );
    socket?.emit("inviteMember", familyId, familyMemberNickname, selectEmail);
    onClose();
  };

  const familyMemberList = useSelector(
    (state) => state.familymember.familyMemberList
  );

  console.log("가족 맴버 리스트:", familyMemberList);

  useEffect(
    () => {
      dispatch(familyMemberActions.getFamilyMemberDB(familyId));
    },
    [
      // searchEmail, familyMemberList.length
    ]
  );

  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingWrap>
            <AddMemberBox>
              <TitleBox>
                <Text S3>구성원 추가하기</Text>
              </TitleBox>
              <Main>
                <form autoComplete="off">
                  <InputBox>
                    <Input
                      type="text"
                      id="addMember"
                      className="myInput"
                      placeholder="구성원의 이메일을 입력하세요"
                      margin="0 0 8px 0"
                      padding="16px"
                      height="56px"
                      onChange={handleSearchEmail}
                      style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                    />
                  </InputBox>
                </form>
                {searchEmail ? (
                  <SearchBox>
                    <SearchUserIdBox
                      value={searchMember}
                      onClick={handleSelectEmail}
                    >
                      {searchMember}
                    </SearchUserIdBox>
                  </SearchBox>
                ) : null}

                <Input
                  type="text"
                  id="changeTitle"
                  className="myInput"
                  placeholder="호칭을 입력하세요"
                  padding="16px"
                  height="56px"
                  onChange={handleMemberNickName}
                  style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                />
              </Main>
              <Button
                L
                id="myBtn"
                onClick={addFamilyMember}
                color="#fff"
                borderColor="#fff"
                borderRadius="12px"
                style={{ backgroundColor: "#6371F7", opacity: "0.4" }}
              >
                추가
              </Button>
            </AddMemberBox>
          </SettingWrap>
        </Content>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 205;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  max-width: 376px;
  width: 100%;
  /* overflow: scroll; */
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

const SettingWrap = styled.div`
  text-align: start;
  width: 100%;
  margin: 24px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddMemberBox = styled.div`
  * & > input::placeholder {
    font-size: 16px;
  }
`;

const Main = styled.div`
  margin: 24px 0;
`;

const InputBox = styled.div`
  margin-top: 11px;
  width: 100%;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 56px;
`;

const SearchUserIdBox = styled.div`
  width: 100%;
  transition: background-color 0.2s ease-in;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
`;

export default AddMemberModal;
