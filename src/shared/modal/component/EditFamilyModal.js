import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../../../redux/modules/family";
import { familyMemberActions } from "../../../redux/modules/familymember";

// 모달
import { ModalPortal } from "../portals";
import {
  AddMemberModal,
  EditMemberNameModal,
  DeleteMemberModal,
} from "./index";

// 엘리먼트
import { CircleImage, Input, Text } from "../../../elements";

const EditFamilyModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const { familyTitle, familyId } = useContext(MainContext)[0];

  console.log("현재 가족 이름:", familyTitle, "현재 가족 아이디:", familyId);

  // 가족 타이틀 변경 input
  const [changeTitle, setChangeTitle] = useState(familyTitle);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setChangeTitle(value);
  };

  const changeFamilyName = () => {
    dispatch(familyActions.editFamilyNameDB(familyId, changeTitle));
  };

  const familyMemberList = useSelector(
    (state) => state.familymember.familyMemberList
  );

  console.log("가족 맴버 리스트:", familyMemberList);

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

  const handleDeleteMemberModal = (e) => {
    setDeleteMemberModal(!deleteMemberModal);
    setfamilyMemberId(e?.target.getAttribute("id"));
  };

  useEffect(() => {
    dispatch(familyMemberActions.getFamilyMemberDB());
  }, [familyMemberList.length]);

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
            }}
          >
            <SettingWrap>
              <SettingBox>
                <Text htmlFor="changeTitle">가족이름 수정하기</Text>
                <div style={{ display: "flex" }}>
                  <Input
                    id="changeTitle"
                    size="15px"
                    padding="0 20px 0 20px"
                    onChange={handleTitleChange}
                    value={changeTitle}
                  />
                  <ModalBtn onClick={changeFamilyName}>수정</ModalBtn>
                </div>
              </SettingBox>
              <MemberBox>
                <Text htmlFor="addFamilyMember">현재 가족 구성원</Text>
                {familyMemberList.map((f, i) => {
                  return (
                    <div style={{ display: "flex" }} key={f.familyMemberId}>
                      <MemberListBox>
                        <CircleImage
                          S
                          src={f.userInfo.profileImg}
                          margin="0 10px"
                        />
                        {f.familyMemberNickname}
                      </MemberListBox>
                      <ModalBtn
                        onClick={handleEditMemberNameModal}
                        value={f.familyMemberNickname}
                        id={f.familyMemberId}
                      >
                        수정
                      </ModalBtn>
                      {/* 가족 구성원 호칭 수정하기 모달 */}

                      <ModalBtn
                        onClick={handleDeleteMemberModal}
                        value={f.familyMemberNickname}
                        id={f.familyMemberId}
                      >
                        제거
                      </ModalBtn>
                    </div>
                  );
                })}
                <ModalBtn onClick={handleAddMemberModal}>추가</ModalBtn>
              </MemberBox>
            </SettingWrap>
          </Content>
        </Background>
      </ModalPortal>
      {/* 가족 구성원 수정하기 모달 */}
      <ModalPortal>
        {addMemberModal && <AddMemberModal onClose={handleAddMemberModal} />}
      </ModalPortal>
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
      <ModalPortal>
        {deleteMemberModal && (
          <DeleteMemberModal
            onClose={handleDeleteMemberModal}
            familyId={familyId}
            familyMemberId={familyMemberId}
          />
        )}
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

const SettingWrap = styled.div`
  text-align: start;
  padding: 30px;
  width: 40rem;
`;

const SettingBox = styled.div`
  margin: 10px 0;
`;

const MemberBox = styled.div`
  margin: 10px 0;
`;

const MemberListBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 4px;
  margin-top: 5px;
  padding: 10px;
  width: 70%;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const ModalBtn = styled.button`
  border: 1px solid gray;
  background: #fff;
  border-radius: 4px;
  margin-top: 5px;
  padding: 10px;
  width: 15%;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

export default EditFamilyModal;
