import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Button, CircleImage, Text } from "../../elements";

// 이미지
// import profileImg from "../../shared/images/profileImg.png";
import Profile01 from "../../shared/images/Profile01.png";
import Profile02 from "../../shared/images/Profile02.png";
import Profile03 from "../../shared/images/Profile03.png";
import Profile04 from "../../shared/images/Profile04.png";
import Profile05 from "../../shared/images/Profile05.png";

const PastMissionList = ({ pastMissionList }) => {
  return (
    <>
      <div>
        {pastMissionList ? (
          pastMissionList.map((m, i) => {
            return (
              <MissionBox key={m.missionId}>
                <MissionTitle>
                  <div
                    style={{
                      width: "67%",
                      borderBottom: "2px solid #F5F5F5",
                      padding: "5px 0",
                      margin: "0 20px",
                    }}
                    className="res-missionTitle"
                  >
                    <Text
                      size="16px"
                      padding="0 0 1px 0"
                      margin="0"
                      width="100%"
                      height="60px"
                    >
                      {m.missionTitle}
                    </Text>
                  </div>
                  <div>{m.missionChk}</div>
                  <div
                    style={{
                      display: "flex",
                      width: "120px",
                      justifyContent: "center",
                      marginRight: "4px",
                    }}
                  >
                    {m.familyMissionChk ? (
                      <CompletedMission>달성완료</CompletedMission>
                    ) : (
                      <UncompletedMission>미완료</UncompletedMission>
                    )}
                  </div>
                </MissionTitle>
                <MissionMemberBox className="res-missionMemberBox">
                  <div
                    style={{ display: "flex", margin: "0 20px" }}
                    className="res-pastMissionMember"
                  >
                    {m.missionMemberList ? (
                      m.missionMemberList.map((f, i) => {
                        return (
                          <div
                            key={f.familyMemberId}
                            style={{ position: "relative" }}
                          >
                            <CircleImage
                              XS
                              // src={f.profileImg ? f.profileImg : profileImg}
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
                              size="24px"
                            />
                            {f.myMissionChk ? (
                              <CompletedCicle />
                            ) : (
                              <UncompletedCicle />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div>미션 진행자 없습니다</div>
                    )}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      flexGrow: "1",
                      fontSize: "16px",
                      color: "#A8A8A8",
                      marginRight: "8%",
                    }}
                    className="res-missionCompletedAt"
                  >
                    {m.completedAt} 달성
                  </div>
                </MissionMemberBox>
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
  padding: 0 0 0 25px;
`;

const MissionTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 0;
  height: 60px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 10px 0;
`;

const UncompletedCicle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: none;
  background-color: #8f8f8f;
  position: absolute;
  top: 13px;
  right: 7px;
`;

const CompletedCicle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: none;
  background-color: #f4cc4d;
  position: absolute;
  top: 13px;
  right: 7px;
`;

const CompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 100px;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 21px;
  background: #6371f7;
  color: white;
`;

const UncompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 85px;
  height: 42px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 21px;
  background: #f5f5f5;
  color: #757575;
`;

export default PastMissionList;
