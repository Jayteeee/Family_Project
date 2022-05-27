import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdPersonAdd } from "react-icons/md";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../../../../redux/modules/family";
import { familyMemberActions } from "../../../../redux/modules/familymember";

// 모달
import { ModalPortal } from "../../portals";
import { AddMemberModal } from "./index";
import AlertModal from "../AlertModal";

// 엘리먼트
import { Input, Text } from "../../../../elements";

// 이미지

// 컴포넌트
import EditOneFamilyMember from "./EditOneFamilyMember";

const EditFamilyModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const { familyTitle, familyId } = useContext(MainContext)[0];

  // 가족 타이틀 수정 input
  const [changeTitle, setChangeTitle] = useState(familyTitle);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setChangeTitle(value);
  };

  const reset = () => {
    setChangeTitle("");
  };

  const editFamilyTitle = () => {
    dispatch(familyActions.editFamilyNameDB(familyId, changeTitle));
    handleAlert();
  };

  const familyMemberList = useSelector(
    (state) => state?.familymember?.familyMemberList
  );

  // 가족 이름 수정하기 Input
  const [showBorder, setShowBorder] = useState(false);

  // 가족 이름 수정하기 알림 모달
  const [alertOn, setAlertOn] = useState(false);

  const handleAlert = () => {
    setAlertOn(!alertOn);
  };

  // 가족 구성원 추가하기 모달
  const [addMemberModal, setAddMemberModal] = useState(false);

  const handleAddMemberModal = () => {
    setAddMemberModal(!addMemberModal);
  };

  useEffect(() => {
    dispatch(familyMemberActions.getFamilyMemberDB(familyId));
  }, []);

  return (
    <>
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
              setShowBorder(false);
            }}
          >
            <SettingWrap>
              <TitleBox>
                <Text S3>가족 추가하기</Text>
              </TitleBox>
              <SettingBox>
                <Text C color="#757575">
                  가족 이름
                </Text>
                <InsertWrap>
                  <InputBox
                    show={showBorder}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBorder(true);
                    }}
                  >
                    <InsertBox>
                      <Input
                        id="changeTitle"
                        size="18px"
                        onChange={handleTitleChange}
                        value={changeTitle}
                        maxLength="8"
                        style={{
                          border: "none",
                        }}
                      />
                      <ResetBox
                        show={showBorder}
                        onClick={(e) => {
                          e.stopPropagation();
                          reset();
                        }}
                      >
                        <MdCancel />
                      </ResetBox>
                    </InsertBox>
                    <EditBtn onClick={editFamilyTitle}>저장</EditBtn>
                  </InputBox>
                  {/* <ModalBtn onClick={editFamilyTitle}>저장</ModalBtn> */}
                </InsertWrap>
              </SettingBox>
              <MemberBox>
                <Text C color="#757575">
                  가족 구성원
                </Text>
                {familyMemberList.map((f, i) => {
                  return <EditOneFamilyMember {...f} key={f.familyMemberId} />;
                })}
              </MemberBox>
              <AddBtnBox>
                <AddBtn onClick={handleAddMemberModal}>
                  <MdPersonAdd />
                </AddBtn>
              </AddBtnBox>
              <SaveBtn
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                저장
              </SaveBtn>
            </SettingWrap>
          </Content>
        </Background>
      </ModalPortal>
      <ModalPortal>
        {/* 가족 타이틀 수정하기 알림 모달 */}
        {alertOn && (
          <AlertModal
            onClose={handleAlert}
            content={"가족 이름이 변경되었어요."}
          />
        )}
      </ModalPortal>
      {/* 가족 구성원 추가하기 모달 */}
      <ModalPortal>
        {addMemberModal && <AddMemberModal onClose={handleAddMemberModal} />}
      </ModalPortal>
    </>
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
  max-width: 376px;
  border-radius: 8px;
  background-color: #fff;
  position: relative;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    max-width: 376px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    max-width: 350px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingWrap = styled.div`
  text-align: start;
  padding: 24px;
  width: 40rem;
`;

const SettingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
`;

const InsertWrap = styled.div`
  display: flex;
  margin-top: 4px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 4px 4px 4px 16px;
  border: ${({ show }) => (show ? `2px solid #6371F7` : `2px solid #E5E5E5`)};
  border-radius: 12px;
`;

const InsertBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  & > input:focus {
    box-shadow: none;
  }
  & > input:focus-visible {
    outline: none;
  }
`;

const ResetBox = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    display: ${({ show }) => (show ? null : "none")};
    width: 100%;
    height: 100%;
    color: #757575;
  }
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

const EditBtn = styled.div`
  width: 49px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

const MemberBox = styled.div`
  margin: 30px 0 16px 0;
`;

const AddBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  color: #757575;
  border-radius: 8px;
  background-color: #f5f5f5;
  svg {
    font-size: 24px;
  }
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
  }
`;

const SaveBtn = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #6371f7;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  border-radius: 12px;
  margin-top: 24px;
  cursor: pointer;
  &:hover {
    background-color: #3245f5;
  }
`;

export default EditFamilyModal;
