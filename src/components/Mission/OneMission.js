import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDeleteForever,
} from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { CircleImage, RactangleImage, Text } from "../../elements";

// 이미지
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";
import checkImg from "../../shared/images/checkImg.png";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeleteMissionModal } from "../../shared/modal/component/MissionModal";
import AlertModal from "../../shared/modal/component/AlertModal";

// 컴포넌트
import { missionActions } from "../../redux/modules/mission";

const OneMission = (props) => {
  const dispatch = useDispatch();

  const {
    missionId,
    missionTitle,
    completedAt,
    familyMissionChk,
    missionMemberList,
    familyId,
    myMissionChk,
  } = props;

  const newCompletedAt = dayjs(completedAt).format("MM월 DD일");

  const userId = useSelector((state) => state.user.user.user?.userId);

  const checkedItemHandler = (missionId, missionChk) => {
    if (!familyMissionChk) {
      let completedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

      dispatch(
        missionActions.checkMissionDB(
          missionId,
          missionChk,
          familyMissionChk,
          completedAt,
          familyId,
          userId
        )
      );
      dispatch(missionActions.getMissionStatusDB(familyId));
    } else {
      handleAlert();
    }
  };

  // 알림 모달
  const [alertOn, setAlertOn] = useState(false);

  const handleAlert = () => {
    setAlertOn(!alertOn);
  };

  // 미션 제거하기 모달
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  return (
    <>
      <MissionBox key={missionId}>
        <MissionTitle>
          {myMissionChk ? (
            <MdCheckBox
              style={{
                fontSize: "24px",
                color: "#757575",
                width: "32px",
                height: "32px",
              }}
              onClick={() => {
                checkedItemHandler.bind(this, missionId, false)();
              }}
              className="missionChkBox"
            />
          ) : (
            <MdCheckBoxOutlineBlank
              style={{
                fontSize: "24px",
                color: "#757575",
                width: "32px",
                height: "32px",
              }}
              onClick={() => {
                checkedItemHandler.bind(this, missionId, true)();
              }}
              className="missionChkBox"
            />
          )}
          <MissionTitleBox>
            <Text
              size="20px"
              margin="0"
              width="100%"
              height="60px"
              className="missionTitle"
            >
              {missionTitle}
            </Text>
          </MissionTitleBox>
          <div
            style={{
              flexGrow: "1",
            }}
          >
            {familyMissionChk ? (
              <CompletedMission>달성완료</CompletedMission>
            ) : (
              <UncompletedMission>미완료</UncompletedMission>
            )}
          </div>
          {!familyMissionChk && (
            <MissionDeleteWrap
              onClick={handleDeleteModal}
              id={missionId}
              className="deleteMissionBtn"
            >
              <MissionDeleteBtn>
                <MdDeleteForever style={{ fontSize: "30px" }} />
              </MissionDeleteBtn>
            </MissionDeleteWrap>
          )}
        </MissionTitle>
        <MissionMemberWrap>
          <MissionMemberBox className="res-missionMember">
            {missionMemberList ? (
              missionMemberList.map((f, i) => {
                return (
                  <ProfileBox key={i}>
                    <RactangleImage
                      S
                      borderRadius="12px"
                      size="32px"
                      src={
                        f.profileImg === "Profile01"
                          ? Profile01
                          : f.profileImg === "Profile02"
                          ? Profile02
                          : f.profileImg === "Profile03"
                          ? Profile03
                          : f.profileImg === "Profile04"
                          ? Profile04
                          : f.profileImg === "Profile05"
                          ? Profile05
                          : f.profileImg
                          ? f.profileImg
                          : Profile01
                      }
                      margin="0 10px 0 0"
                      className="CicleImage"
                    />
                    {f.myMissionChk && (
                      <CompletedCicle>
                        <CircleImage S size="20px" src={checkImg} />
                      </CompletedCicle>
                    )}
                  </ProfileBox>
                );
              })
            ) : (
              <div>미션 진행자 없습니다</div>
            )}
          </MissionMemberBox>
          {familyMissionChk && (
            <CompletedAtBox>{newCompletedAt} 달성</CompletedAtBox>
          )}
        </MissionMemberWrap>
      </MissionBox>
      {/* 미션 제거하기 모달 */}
      <ModalPortal>
        {deleteModalOn && (
          <DeleteMissionModal
            onClose={handleDeleteModal}
            familyId={familyId}
            missionId={missionId}
          ></DeleteMissionModal>
        )}
      </ModalPortal>
      {/* 달성 완료 알람 */}
      <ModalPortal>
        {alertOn && (
          <AlertModal
            onClose={handleAlert}
            content={"이미 달성된 미션이에요!"}
          ></AlertModal>
        )}
      </ModalPortal>
    </>
  );
};

const MissionBox = styled.div`
  text-align: left;

  &:hover {
    .deleteMissionBtn {
      display: flex;
    }
  }
`;

const MissionTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 8px;
  height: 48px;
  background-color: #f9f9ff;
  border-radius: 8px;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 55px;
    font-size: 10px;
    .missionChkBox {
      max-width: 30px;
      max-height: 30px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .missionChkBox {
      max-width: 20px;
      max-height: 20px;
    }
  }
`;

const MissionTitleBox = styled.div`
  padding: 5px 0;
  margin-left: 15px;
  .missionTitle {
    word-break: normal;
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    & p {
      font-size: 15px;
    }
  }
`;

const MissionMemberWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 15px 55px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const ProfileBox = styled.div`
  position: relative;
`;

const CompletedCicle = styled.div`
  width: 12px;
  height: 13px;
  border-radius: 12px;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 13px;
  right: 11px;
`;

const CompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 76px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background: #6371f7;
  color: white;

  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: 35px;
  }
`;

const UncompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 76px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background: #f9f9ff;
  border: 1px solid #6371f7;
  color: #6371f7;

  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: 35px;
  }
`;

const CompletedAtBox = styled.div`
  text-align: right;
  flex-grow: 1;
  font-size: 12px;
  color: #a8a8a8;
`;

const MissionDeleteWrap = styled.div`
  float: right;
  justify-content: right;
  align-items: center;
  display: none;
`;

const MissionDeleteBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: 20px;
  height: 30px;
  align-items: center;
  border: none;
  border-radius: 6px;
  color: #c2c2c2;
  margin-left: 5px;
  &:hover {
    background: #fff;
    color: #757575;
  }
`;

export default OneMission;
