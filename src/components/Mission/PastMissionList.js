import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Button, CircleImage, Text } from "../../elements";

// 이미지
import profileImg from "../../shared/images/profileImg.png";

const PastMissionList = ({ pastMissionList }) => {
  return (
    <>
      <div style={{ width: "100%", textAlign: "left" }}>
        <Text margin="0 10px" fontWeight="700" size="24px">
          지난 미션
        </Text>
        <MissionListBox>
          <div>
            {pastMissionList ? (
              pastMissionList.map((m, i) => {
                return (
                  <MissionBox key={m.missionId}>
                    <MissionTitle>
                      <MdCheckBox
                        style={{
                          margin: "1px 0 0 0",
                          fontSize: "23px",
                          cursor: "pointer",
                        }}
                      />
                      <Text size="16px" padding="0 0 1px 0" margin="0 10px">
                        {m.missionTitle}
                      </Text>
                      <div
                        style={{
                          textAlign: "right",
                          flexGrow: "1",
                        }}
                      >
                        <Button
                          S
                          width="63px"
                          height="26px"
                          fontSize="12px"
                          bg="black"
                          color="white"
                          padding="0 0 1px 0"
                        >
                          달성 완료
                        </Button>
                      </div>
                    </MissionTitle>
                    <MissionMemberBox>
                      <div style={{ display: "flex" }}>
                        {m.missionMemberList ? (
                          m.missionMemberList.map((f, i) => {
                            return (
                              <div key={f.familyMemberId}>
                                <CircleImage
                                  XS
                                  src={f.profileImg ? f.profileImg : profileImg}
                                  margin="0 3px 0 0"
                                />
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
                        }}
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
        </MissionListBox>
      </div>
    </>
  );
};

const MissionListBox = styled.div`
  background: #fff;
  margin: 10px 10px;
  padding: 20px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
`;

const MissionBox = styled.div`
  text-align: left;
`;

const MissionTitle = styled.div`
  background: #f4f4f4;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export default PastMissionList;
