import React, { useState, useContext, useEffect } from "react";
import { MainContext } from "../../../../pages/Main";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCancel, MdPersonRemove } from "react-icons/md";

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
import AlertModal from "../AlertModal";

// 이미지
// import profileImg from "../../../images/profileImg.png";

const EditOneFamilyMember = ({
  profileImg,
  familyMemberId,
  familyMemberNickname,
  userId,
  showBorder,
}) => {
  console.log(showBorder);
  const dispatch = useDispatch();

  const { familyTitle, familyId } = useContext(MainContext)[0];

  console.log("현재 가족 이름:", familyTitle, "현재 가족 아이디:", familyId);

  const familyMemberList = useSelector(
    (state) => state.familymember.familyMemberList
  );

  console.log("가족 맴버 리스트:", familyMemberList);

  // 가족 구성원 호칭 수정하기 모달
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState("");

  // 가족 구성원 제거하기 모달
  const [deleteMemberModal, setDeleteMemberModal] = useState(false);

  const handleDeleteMemberModal = (familyMemberId) => {
    setDeleteMemberModal(!deleteMemberModal);
    setSelectedFamilyMemberId(familyMemberId);
  };

  const [changeMemberNickname, setChangeMemberNickname] =
    useState(familyMemberNickname);

  const handleMemberNicknameChange = (e) => {
    const { value } = e.target;
    setChangeMemberNickname(value);
  };

  const EditFamilyMemberNickname = () => {
    dispatch(
      familyMemberActions.editFamilyMemberNicknameDB(
        familyId,
        familyMemberId,
        changeMemberNickname,
        userId
      )
    );
    handleAlert();
  };

  // 알림 모달
  const [alertOn, setAlertOn] = useState(false);

  const handleAlert = () => {
    setAlertOn(!alertOn);
  };

  return (
    <FamilyMemberBox
      style={{}}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ProfileWrap>
        <ProfileBox>
          <CircleImage S src={profileImg ? profileImg : null} size="40px" />
        </ProfileBox>
        <InputWrap>
          <Input
            id="changeTitle"
            className="myInput"
            padding="16px"
            height="44px"
            width="100%"
            onChange={handleMemberNicknameChange}
            value={changeMemberNickname}
            style={{
              borderRadius: "12px",
              borderColor: "#E5E5E5",
            }}
          />
          <EditBtn onClick={EditFamilyMemberNickname}>저장</EditBtn>
        </InputWrap>
      </ProfileWrap>
      <DeleteBtn
        onClick={handleDeleteMemberModal.bind(this, familyMemberId)}
        value={familyMemberNickname}
        id={familyMemberId}
      >
        <MdPersonRemove />
      </DeleteBtn>
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
      <ModalPortal>
        {alertOn && (
          <AlertModal
            onClose={handleAlert}
            content={"가족 구성원 호칭이 변경되었어요."}
          />
        )}
      </ModalPortal>
    </FamilyMemberBox>
  );
};

const FamilyMemberBox = styled.div`
  display: flex;
  margin: 10px 0 16px 0;
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

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  .myInput {
    :focus {
      box-shadow: none;
      outline: none !important;
      border-color: #6371f7 !important;
    }
  }
`;

const EditBtn = styled.div`
  width: 39px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 13px;
  opacity: 0.4;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  margin: 5px 5px 5px 5px;
  border: none;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #757575;
  }
  opacity: 0.4;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export default EditOneFamilyMember;
