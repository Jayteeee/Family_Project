import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel } from "react-icons/md";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../../../../redux/modules/family";
import { familyMemberActions } from "../../../../redux/modules/familymember";

// 모달
import { ModalPortal } from "../../portals";
import {
  AddMemberModal,
  EditFamilyTitleModal,
  EditMemberNameModal,
  DeleteMemberModal,
} from "./index";

// 엘리먼트
import { CircleImage, Input, Text } from "../../../../elements";

// 이미지
import profileImg from "../../../images/profileImg.png";

const EditFamilyModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const { familyTitle, familyId } = useContext(MainContext)[0];

  console.log("현재 가족 이름:", familyTitle, "현재 가족 아이디:", familyId);

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
    handleEditFamilyTitleModal();
  };

  const familyMemberList = useSelector(
    (state) => state.familymember.familyMemberList
  );

  console.log("가족 맴버 리스트:", familyMemberList);

  // 가족 타이틀 수정하기 모달
  const [editFamilyTitleModal, setEditFamilyTitleModal] = useState(false);
  const [showBorder, setShowBorder] = React.useState(false);

  const handleEditFamilyTitleModal = () => {
    setEditFamilyTitleModal(!editFamilyTitleModal);
    //  document.getElementById("profileMenu").style.display = "none";
  };
  // 가족 구성원 추가하기 모달
  const [addMemberModal, setAddMemberModal] = useState(false);

  const handleAddMemberModal = () => {
    setAddMemberModal(!addMemberModal);
    //  document.getElementById("profileMenu").style.display = "none";
  };
  // 가족 구성원 호칭 수정하기 모달
  const [editMemberNameModal, setEditMemberNameModal] = useState(false);
  const [familyMemberId, setfamilyMemberId] = useState("");
  const [familyMemberNickname, setfamilyMemberNickname] = useState("");

  const handleEditMemberNameModal = (e) => {
    setEditMemberNameModal(!editMemberNameModal);
    setfamilyMemberId(e?.target.getAttribute("id"));
    setfamilyMemberNickname(e?.target.getAttribute("value"));
    //  document.getElementById("profileMenu").style.display = "none";
  };
  console.log(
    "선택한 구성원 아이디:",
    familyMemberId,
    "선택한 구성원 호칭",
    familyMemberNickname
  );

  // 가족 구성원 제거하기 모달
  const [deleteMemberModal, setDeleteMemberModal] = useState(false);

  const handleDeleteMemberModal = (familyMemberId) => {
    setDeleteMemberModal(!deleteMemberModal);
    setfamilyMemberId(familyMemberId);
  };

  useEffect(
    () => {
      dispatch(familyMemberActions.getFamilyMemberDB(familyId));
    },
    [
      // familyMemberList.length
    ]
  );

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
                <Text S3>가족 수정하기</Text>
              </TitleBox>
              <SettingBox>
                <Text C>가족 이름</Text>
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
                  </InputBox>
                  <ModalBtn onClick={editFamilyTitle}>저장</ModalBtn>
                </InsertWrap>
              </SettingBox>
              <MemberBox>
                <Text C>가족 구성원</Text>
                {familyMemberList.map((f, i) => {
                  return (
                    <div
                      style={{ display: "flex", margin: "4px 0" }}
                      key={f.familyMemberId}
                    >
                      <ProfileWrap>
                        <ProfileBox>
                          <CircleImage
                            S
                            src={f.profileImg ? f.profileImg : profileImg}
                          />
                        </ProfileBox>
                        <MemberListBox>{f.familyMemberNickname}</MemberListBox>
                      </ProfileWrap>
                      <ModalBtn
                        onClick={handleEditMemberNameModal}
                        value={f.familyMemberNickname}
                        id={f.familyMemberId}
                      >
                        수정
                      </ModalBtn>
                      {/* 가족 구성원 호칭 수정하기 모달 */}

                      <ModalBtn
                        onClick={handleDeleteMemberModal.bind(
                          this,
                          f.familyMemberId
                        )}
                        value={f.familyMemberNickname}
                        id={f.familyMemberId}
                      >
                        제거
                      </ModalBtn>
                    </div>
                  );
                })}
              </MemberBox>
              <BtnBox>
                <SaveBtn onClick={handleAddMemberModal}>추가</SaveBtn>
              </BtnBox>
            </SettingWrap>
          </Content>
        </Background>
      </ModalPortal>
      <ModalPortal>
        {/* 가족 타이틀 수정하기 모달 */}
        {editFamilyTitleModal && (
          <EditFamilyTitleModal onClose={handleEditFamilyTitleModal} />
        )}
      </ModalPortal>
      {/* 가족 구성원 수정하기 모달 */}
      <ModalPortal>
        {editMemberNameModal && (
          <EditMemberNameModal
            onClose={handleEditMemberNameModal}
            familyId={familyId}
            familyMemberId={familyMemberId}
            familyMemberNickname={familyMemberNickname}
          />
        )}
      </ModalPortal>
      {/* 가족 구성원 제거하기 모달 */}
      <ModalPortal>
        {deleteMemberModal && (
          <DeleteMemberModal
            onClose={handleDeleteMemberModal}
            familyId={familyId}
            familyMemberId={familyMemberId}
            familyMemberNickname={familyMemberNickname}
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
  max-width: 420px;
  /* width: 100%; */
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  /* overflow: scroll; */
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

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 4px 16px;
  border: ${({ show }) => (show ? `2px solid #6f5fce` : `2px solid #E5E5E5`)};
  border-radius: 12px;
`;

const InsertWrap = styled.div`
  display: flex;
  margin-top: 4px;
`;

const InsertBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > input:focus {
    box-shadow: none;
  }
  & > input:focus-visible {
    outline: none;
  }
`;

const ResetBox = styled.div`
  width: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    display: ${({ show }) => (show ? null : "none")};
    width: 100%;
    height: 100%;
    color: #757575;
  }
`;

const MemberBox = styled.div`
  margin: 24px 0;
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const MemberListBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 4px;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
`;

const ModalBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  margin: 13px 8px 13px 16px;
  border: none;
  cursor: pointer;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const SaveBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  background-color: #6f5fce;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

export default EditFamilyModal;
