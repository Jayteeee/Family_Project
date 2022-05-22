import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 리덕스
import { missionActions } from "../../redux/modules/mission";
import { useDispatch } from "react-redux";

// 엘리먼트
import { Text } from "../../elements";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { BadgeModal } from "../../shared/modal/component/MissionModal";

const MissionStatusBox = ({ missionStatus, familyId }) => {
  const dispatch = useDispatch();
  // 배지 목록 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const getBadgeList = () => {
    dispatch(missionActions.getBadgeListDB(familyId));
  };
  return (
    <>
      <MissionStatusWrap>
        <TwoStatusBox>
          <StatusBox>
            <Text className="missionStatusTitle" size="16px" fontWeight="400">
              전체 미션 수
            </Text>
            <div className="res-stausMiddleBox" style={{ padding: "30px" }} />
            <Text
              className="res-missionStatus"
              size="40px"
              color="#6371F7"
              fontWeight="600"
            >
              {missionStatus?.totalMission ? missionStatus?.totalMission : 0}
            </Text>
          </StatusBox>
          <StatusBox>
            <Text className="missionStatusTitle" size="16px" fontWeight="400">
              완료 미션 수
            </Text>

            <Text
              className="res-missionStatus"
              size="40px"
              color="#6371F7"
              fontWeight="600"
            >
              0
              {missionStatus?.completedMission
                ? missionStatus?.completedMission
                : 0}
            </Text>
          </StatusBox>
        </TwoStatusBox>
        <TwoStatusBox>
          <StatusBox>
            <Text className="missionStatusTitle" size="16px" fontWeight="400">
              미션 달성률
            </Text>

            <Text
              className="res-missionStatus"
              size="40px"
              color="#6371F7"
              fontWeight="600"
            >
              {missionStatus?.completePercentage
                ? missionStatus?.completePercentage
                : 0}
              %
            </Text>
          </StatusBox>
          <StatusBox
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleModal();
              getBadgeList();
            }}
          >
            <Text className="missionStatusTitle" size="16px" fontWeight="400">
              보유 뱃지 수
            </Text>
            <Text
              className="res-missionStatus"
              size="40px"
              color="#6371F7"
              fontWeight="600"
            >
              0{missionStatus?.totalBadge ? missionStatus?.totalBadge : 0}
            </Text>
          </StatusBox>
        </TwoStatusBox>
      </MissionStatusWrap>
      {/* 배지 목록 모달 */}
      <ModalPortal>
        {modalOn && (
          <BadgeModal onClose={handleModal} familyId={familyId}></BadgeModal>
        )}
      </ModalPortal>
    </>
  );
};

const MissionStatusWrap = styled.div`
  display: flex;
  text-align: left;
  border-radius: 12px;
  border: none;
  background: transparent;
  margin: 10px 30px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
    margin: 0 14px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    flex-direction: column !important;
    margin: 0 14px !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    flex-direction: column !important;
    margin: 0 6px !important;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const TwoStatusBox = styled.div`
  display: flex;
  width: 100%;
  background: transparent;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    display: flex;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const StatusBox = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  background: #fff;
  /* align-items: center; */
  margin: 10px 10px;
  padding: 24px;
  width: 100%;
  height: 96px;
  border-radius: 12px;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  &:hover {
    background: #f8f8f8;
  }

  .missionStatusTitle {
    display: flex;
    align-items: baseline;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* padding: 0px 20px !important;
    height: 8rem !important;
    margin: 10px 9px; */
    height: 60px;
    padding: 16px;
    .missionStatusTitle {
      font-size: 15px !important;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .missionStatusTitle {
      font-size: 10px !important;
    }
  }
`;

export default MissionStatusBox;
