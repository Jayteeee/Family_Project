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
          <StatusBox>
            <div>
              <Text size="15px">우리 가족 전체 미션 수</Text>
              <hr />
              <Text size="25px" color="#8C98F8" fontWeight="600">
                {missionStatus?.totalMission ? missionStatus?.totalMission : 0}
              </Text>
            </div>
          </StatusBox>
          <StatusBox>
            <div>
              <Text size="15px">현재 달성 완료된 미션 수</Text>
              <hr />
              <Text size="25px" color="#8C98F8" fontWeight="600">
                0
                {missionStatus?.completedMission
                  ? missionStatus?.completedMission
                  : 0}
              </Text>
            </div>
          </StatusBox>
        </TwoStatusBox>
        <TwoStatusBox className="res-twoStatusBox">
          <StatusBox>
            <div>
              <Text size="15px">이번 주 달성률</Text>
              <hr />
              <Text size="25px" color="#8C98F8" fontWeight="600">
                {missionStatus?.completePercentage
                  ? missionStatus?.completePercentage
                  : 0}
                %
              </Text>
            </div>
          </StatusBox>
          <StatusBox>
            <div>
              <Text size="15px">우리 가족 보유 뱃지 수</Text>
              <hr />
              <Text size="25px" color="#8C98F8" fontWeight="600">
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
  cursor: pointer;
  text-align: left;
  border-radius: 20px;
  border: none;
  background: transparent;
  margin: 10px 10px;
  &:hover {
    background: #f8f8f8;
  }
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
  padding: 20px;
  width: 100%;
  height: 8rem;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
  & > div > hr {
    border: none;
    height: 10px;
  }
`;

export default MissionStatusBox;
