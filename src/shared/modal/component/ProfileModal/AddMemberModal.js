import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";

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
  // 가족 구성원 추가하기 함수
  const addFamilyMember = () => {
    dispatch(
      familyMemberActions.addFamilyMemberDB(
        familyId,
        familyMemberNickname,
        selectEmail
      )
    );
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
              <Text>가족 구성원 추가하기</Text>
              <form autoComplete="off">
                <Input
                  id="addMember"
                  placeholder="추가하고 싶은 사람의 email을 입력해 주세요"
                  size="15px"
                  padding="0 20px 0 20px"
                  onChange={handleSearchEmail}
                />
              </form>
              {searchMember && (
                <SearchBox>
                  <SearchUserIdBox
                    value={searchMember}
                    onClick={handleSelectEmail}
                  >
                    {searchMember}
                  </SearchUserIdBox>
                </SearchBox>
              )}
              <Input
                id="changeTitle"
                placeholder="가족의 호칭을 입력해 주세요"
                size="18px"
                padding="0 20px 0 20px"
                onChange={handleMemberNickName}
              />
              <Button onClick={addFamilyMember}>추가하기</Button>
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
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  /* overflow: scroll; */
`;

const SettingWrap = styled.div`
  text-align: start;
  padding: 30px;
`;

const AddMemberBox = styled.div`
  margin: 10px 0;

  * & > input::placeholder {
    font-size: 16px;
  }
`;

const SearchBox = styled.div`
  border: 1px solid gray;
  border-radius: 4px;
  margin-top: 5px;
  padding: 20px;
`;

const SearchUserIdBox = styled.div`
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

export default AddMemberModal;
