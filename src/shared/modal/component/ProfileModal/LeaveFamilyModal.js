import React, { useState, useContext, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../../../redux/configureStore";

// 모달
import { ModalPortal } from "../../portals";

// 엘리먼트
import { Button, Text } from "../../../../elements";
import { familyMemberActions } from "../../../../redux/modules/familymember";

const LeaveFamilyModal = (props) => {
  const {
    onClose,
    familyId,
    familyMemberId,
    // familyList
  } = props;
  const dispatch = useDispatch();

  const familyList = useSelector((state) => state?.familyList);

  const otherFamilyId = familyList?.find(
    (f) => f?.familyId !== familyId
  )?.familyId;

  const deleteMember = () => {
    dispatch(
      familyMemberActions.leaveFamilyDB(familyId, familyMemberId, otherFamilyId)
    );
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
          id="deleteFamilyMember"
        >
          <DeleteMemberBox>
            <Text S3 className="deleteMemberText">
              한번 나간 가족은 다시 복구할 수 없어요.
              <br />
              정말 나가실 건가요?
            </Text>
            <ButtonWrap>
              <Button
                L
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                color="rgba(117, 117, 117, 1)"
                borderColor="rgba(219, 219, 219, 1)"
                borderRadius="12px"
                style={{ backgroundColor: "rgba(219, 219, 219, 1)" }}
                className="deleteBtn"
              >
                취소
              </Button>
              <Button
                L
                onClick={deleteMember}
                color="#fff"
                borderColor="#fff"
                borderRadius="12px"
                style={{ backgroundColor: "#6371F7" }}
                margin="0 0 0 10px"
                className="deleteBtn"
              >
                나가기
              </Button>
            </ButtonWrap>
          </DeleteMemberBox>
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
  border-radius: 20px;
  background-color: #fff;

  position: relative;
  overflow: scroll;
`;

const DeleteMemberBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .deleteMemberText {
      font-size: 18px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  margin-top: 36px;
  .deleteBtn {
    height: 56px;
    width: 221px;
    cursor: pointer;
    &:hover {
      filter: brightness(70%);
    }
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    .deleteBtn {
      padding: 16px 20px;
      height: 100%;
      width: 100%;
    }
    margin-top: 30px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .deleteBtn {
      padding: 8px 20px;
    }
    margin-top: 30px;
  }
`;

export default LeaveFamilyModal;
