import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Text } from "../../elements";

// 모달
import { ModalPortal } from "../../shared/modal/portals";

const MissionStatusBox = ({ missionStatus }) => {
  return (
    <>
      <MissionStatusWrap className="res-missionStatusBox">
        <TwoStatusBox className="res-twoStatusBox">
          <StatusBox className="res-statusBox">
            <div>
              <Text
                className="res-missionStatusTitle"
                size="24px"
                fontWeight="700"
              >
                우리 가족 전체 미션 수
              </Text>
              <div className="res-stausMiddleBox" style={{ padding: "30px" }} />
              <Text
                className="res-missionStatus"
                size="40px"
                color="#8C98F8"
                fontWeight="700"
              >
                {missionStatus?.totalMission ? missionStatus?.totalMission : 0}
              </Text>
            </div>
          </StatusBox>
          <StatusBox className="res-statusBox">
            <div>
              <Text
                className="res-missionStatusTitle"
                size="24px"
                fontWeight="700"
              >
                현재 달성 완료된 미션 수
              </Text>
              <div className="res-stausMiddleBox" style={{ padding: "30px" }} />
              <Text
                className="res-missionStatus"
                size="40px"
                color="#8C98F8"
                fontWeight="700"
              >
                0
                {missionStatus?.completedMission
                  ? missionStatus?.completedMission
                  : 0}
              </Text>
            </div>
          </StatusBox>
        </TwoStatusBox>
        <TwoStatusBox className="res-twoStatusBox">
          <StatusBox className="res-statusBox">
            <div>
              <Text
                className="res-missionStatusTitle"
                size="24px"
                fontWeight="700"
              >
                이번 주 달성률
              </Text>
              <div className="res-stausMiddleBox" style={{ padding: "30px" }} />
              <Text
                className="res-missionStatus"
                size="40px"
                color="#8C98F8"
                fontWeight="700"
              >
                {missionStatus?.completePercentage
                  ? missionStatus?.completePercentage
                  : 0}
                %
              </Text>
            </div>
          </StatusBox>
          <StatusBox className="res-statusBox" style={{ cursor: "pointer" }}>
            <div>
              <Text
                className="res-missionStatusTitle"
                size="24px"
                fontWeight="700"
              >
                우리 가족 보유 뱃지 수
              </Text>
              <div className="res-stausMiddleBox" style={{ padding: "30px" }} />
              <Text
                className="res-missionStatus"
                size="40px"
                color="#8C98F8"
                fontWeight="700"
              >
                0{missionStatus?.totalBadge ? missionStatus?.totalBadge : 0}
              </Text>
            </div>
          </StatusBox>
        </TwoStatusBox>
      </MissionStatusWrap>
    </>
  );
};

const MissionStatusWrap = styled.div`
  display: flex;
  text-align: left;
  border-radius: 20px;
  border: none;
  background: transparent;
  margin: 10px 30px;
`;

const TwoStatusBox = styled.div`
  display: flex;
  width: 100%;
`;

const StatusBox = styled.div`
  display: flex;
  text-align: left;
  background: #fff;
  align-items: center;
  margin: 10px 10px;
  padding: 20px 40px;
  width: 100%;
  height: 13rem;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
  &:hover {
    background: #f8f8f8;
  }
`;

export default MissionStatusBox;
