import React, { useState, useContext } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch } from "react-redux";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Input, Button } from "../../../../elements";
import { familyActions } from "../../../../redux/modules/family";

const AddFamilyModal = ({ onClose }) => {
  const dispatch = useDispatch();

  console.log(onClose);

  const NowFamilyTitle = useContext(MainContext)[0].familyTitle;

  console.log("현재 가족 이름: ", NowFamilyTitle);

  // 가족 이름 input
  const [familyTitle, setfamilyTitle] = useState("");

  const handleAddFamily = (e, max) => {
    if (e.value.length > max) {
      e.value = e.value.substr(0, max);
      const { value } = e.target;
      setfamilyTitle(value);
    }
    // const { value } = e.target;
    // setfamilyTitle(value);
  };

  console.log(familyTitle);

  // 가족 생성 함수
  const addFamily = () => {
    dispatch(familyActions.addFamilyDB(familyTitle));
  };

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
          <div style={{ textAlign: "start" }}>
            <label htmlFor="changeName">가족 생성하기</label>
            <div style={{ margin: "8px 0 20px" }}>
              <div>
                <Input
                  type="text"
                  id="changeName"
                  placeholder="가족 이름을 입력해주세요"
                  size="18px"
                  padding="0 36px 0 36px"
                  margin="0 0 20px"
                  onChange={handleAddFamily}
                  maxlength="8"
                  oninput="handleAddFamily(this, 8)"
                  value={familyTitle}
                />
              </div>
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
                onClose();
                addFamily();
              }}
            >
              가족 생성
            </Button>
          </div>
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
  height: 280px;
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

export default AddFamilyModal;
