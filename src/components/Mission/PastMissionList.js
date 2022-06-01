import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";

// 엘리먼트
import { CircleImage, RactangleImage, Text } from "../../elements";

// 이미지
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";
import checkImg from "../../shared/images/checkImg.png";

const PastMissionList = ({ pastMissionList }) => {
  return (
    <>
      <div>
        {pastMissionList ? (
          pastMissionList.map((m, i) => {
            return (
              <MissionBox key={m.missionId}>
                <MissionTitle>
                  <MissionTitleBox>
                    <Text
                      size="20px"
                      margin="0"
                      width="100%"
                      height="60px"
                      className="missionTitle"
                    >
                      {m.missionTitle}
                    </Text>
                  </MissionTitleBox>
                  <div>{m.missionChk}</div>
                  <div
                    style={{
                      flexGrow: "1",
                    }}
                  >
                    {m.familyMissionChk ? (
                      <CompletedMission>달성완료</CompletedMission>
                    ) : (
                      <UncompletedMission>미완료</UncompletedMission>
                    )}
                  </div>
                </MissionTitle>
                <MissionMemberWrap>
                  <MissionMemberBox className="res-missionMember">
                    {m.missionMemberList ? (
                      m.missionMemberList.map((f, i) => {
                        return (
                          <div
                            key={f.familyMemberId}
                            style={{ position: "relative" }}
                          >
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
                            />
                            {f.myMissionChk && (
                              <CompletedCicle>
                                <CircleImage S size="20px" src={checkImg} />
                              </CompletedCicle>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div>미션 진행자 없습니다</div>
                    )}
                  </MissionMemberBox>
                  {m.familyMissionChk && (
                    <CompletedAtBox>
                      {dayjs(m.completedAt).format("MM월 DD일")} 달성
                    </CompletedAtBox>
                  )}
                </MissionMemberWrap>
              </MissionBox>
            );
          })
        ) : (
          <Text>리스트 없음.</Text>
        )}
      </div>
    </>
  );
};

const MissionBox = styled.div`
  text-align: left;
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
  padding: 10px 10px 15px 22px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  overflow-x: scroll;
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

export default PastMissionList;
