import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";
// 라이브러리, 패키지
import styled from "styled-components";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
// 모달
import { ModalPortal } from "../../portals";
import AlertModal from "../AlertModal";
import AddMemberAlertModal from "./AddMemberAlertModal";
// 엘리먼트
import { Button, Input, Text } from "../../../../elements";
import { familyMemberActions } from "../../../../redux/modules/familymember";
const AddMemberModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { familyTitle, familyId } = useContext(MainContext)[0];
  // 가족 구성원 추가하기 관련 코드
  const [searchEmail, setsearchEmail] = useState(""); // 검색한 userId
  const [selectEmail, setSelectEmail] = useState("");
  const [familyMemberNickname, setfamilyMemberNickname] = useState("");
  const searchMember = useSelector(
    (state) => state?.familymember?.searchMember
  );

  console.log(searchMember);
  const myNickname = useSelector((state) => state?.user?.user?.user?.nickname);
  const familyMemberList = useSelector(
    (state) => state.familymember.familyMemberList
  );
  // 검색한 userId 주입
  const handleSearchEmail = (e) => {
    setSelectEmail(e.target.value);
    setsearchEmail(e.target.value);
    dispatch(familyMemberActions.getSearchMemberDB(e.target.value));
  };
  // 선택한 userId input value에 주입
  const handleSelectEmail = (e) => {
    document.getElementById("addMember").value = e.target.getAttribute("value");
    setSelectEmail(e.target.getAttribute("value"));
  };
  // input에 입력한 호칭 주입
  const handleMemberNickName = (e) => {
    const { value } = e.target;
    setfamilyMemberNickname(value);
  };
  // 동알한 가족구성원 있는지 체크
  const familyMemberChk = familyMemberList.find((f) => f.email === selectEmail);
  // 동알한 가족구성원이름 있는지 체크
  const familyMemberNicknameChk = familyMemberList.find(
    (f) => f.familyMemberNickname === familyMemberNickname
  );
  // 소켓 부분
  const socket = useSelector((state) => state.socket.socket);
  // 가족 초대하기 알람 모달
  const [addMemberModalOn, setAddMemberModalOn] = useState(false);
  const addMemberHandleModal = () => {
    setAddMemberModalOn(!addMemberModalOn);
  };
  // 가족 초대하기 중복 알람 모달
  const [checkMemberModalOn, setCheckMemberModalOn] = useState(false);
  const checkMemberHandleModal = () => {
    setCheckMemberModalOn(!checkMemberModalOn);
  };
  // 가족 초대하기 이름중복 알람 모달
  const [checkMemberNicknameModalOn, setCheckMemberNicknameModalOn] =
    useState(false);
  const checkMemberNicknameHandleModal = () => {
    setCheckMemberNicknameModalOn(!checkMemberNicknameModalOn);
  };
  // 가족 초대하기 이름공백 알람 모달
  const [checkNicknameNullModalOn, setCheckNicknameNullModalOn] =
    useState(false);
  const checkNicknameNullHandleModal = () => {
    setCheckNicknameNullModalOn(!checkNicknameNullModalOn);
  };
  const addFamilyMemberSocket = () => {
    socket?.emit("inviteMember", {
      familyId: familyId,
      selectEmail: selectEmail,
      familyMemberNickname: familyMemberNickname,
      nickname: myNickname,
      type: "초대",
    });
    addMemberHandleModal();
  };
  // 가족 구성원 추가하기 함수
  const addFamilyMember = () => {
    familyMemberChk !== undefined
      ? checkMemberHandleModal()
      : familyMemberNicknameChk !== undefined
      ? checkMemberNicknameHandleModal()
      : familyMemberNickname === "" || selectEmail === ""
      ? checkNicknameNullHandleModal()
      : addFamilyMemberSocket();
    // if (    familyMemberChk !== undefined) {
    //   checkMemberHandleModal()
    // } else { if(familyMemberNicknameChk !== undefined) {(socket?.emit("inviteMember", {
    //   familyId: familyId,
    //   selectEmail: selectEmail,
    //   familyMemberNickname: familyMemberNickname,
    //   nickname: myNickname,
    //   type: "초대",
    // })
    // addMemberHandleModal()}}
  };
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
                <Text S3>구성원 초대하기</Text>
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
                  maxLength="8"
                  style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                />
              </Main>
              <Button
                L
                id="myBtn"
                className="addMemberBtn"
                onClick={addFamilyMember}
                color="#fff"
                borderColor="#fff"
                borderRadius="12px"
                style={{ backgroundColor: "#6371F7" }}
              >
                초대
              </Button>
            </AddMemberBox>
          </SettingWrap>
        </Content>
      </Background>
      {/* 가족 구성원 초대 모달 */}
      <ModalPortal>
        {addMemberModalOn && (
          <AddMemberAlertModal
            onClose={addMemberHandleModal}
            onCloseAddMember={onClose}
            content={`${familyMemberNickname}님에게 초대 메시지를 보냈어요!`}
          ></AddMemberAlertModal>
        )}
      </ModalPortal>
      {/* 가족 구성원 초대 중복 체크 모달 */}
      <ModalPortal>
        {checkMemberModalOn && (
          <AlertModal
            onClose={checkMemberHandleModal}
            content={"동일한 가족 구성원이 있어요!"}
          ></AlertModal>
        )}
      </ModalPortal>
      {/* 가족 구성원 초대 이름중복 체크 모달 */}
      <ModalPortal>
        {checkMemberNicknameModalOn && (
          <AlertModal
            onClose={checkMemberNicknameHandleModal}
            content={"동일한 가족 구성원 이름이 있어요!"}
          ></AlertModal>
        )}
      </ModalPortal>
      {/* 가족 구성원 초대 이름공백 체크 모달 */}
      <ModalPortal>
        {checkNicknameNullModalOn && (
          <AlertModal
            onClose={checkNicknameNullHandleModal}
            content={"가족 구성원 이메일과 이름을 확인해주세요!"}
          ></AlertModal>
        )}
      </ModalPortal>
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
  .addMemberBtn {
    :hover {
      background: #3245f5 !important;
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
