import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { RactangleImage, Text, CircleImage } from "../../elements";

// 이미지
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";
import checkImg from "../../shared/images/checkImg.png";

const HomeMission = ({
  recentMission,
  recentMissionUser,
  recentMissionMembers,
}) => {
  return (
    <>
      <Container>
        <Figure>
          <ContantBox>
            <Text className="recentMissionTitle">
              {recentMission?.missionTitle}
            </Text>
            <Text className="missionUser">
              {recentMission?.missionTitle
                ? `${recentMissionUser?.familyMemberNickname}님이 제안했어요!`
                : "미션을 생성하고 수행해보세요!"}
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: "auto",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {recentMissionMembers &&
                recentMissionMembers.map((f) => {
                  return (
                    <ProfileBox key={f.familyMemberId}>
                      <Profile>
                        <RactangleImage
                          S
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
                          size="56px"
                          borderRadius="20px"
                          borderColor="none"
                          className="proFileImage"
                        />

                        {f.myMissionChk && (
                          <CompletedCicle>
                            <CircleImage S size="24px" src={checkImg} />
                          </CompletedCicle>
                        )}
                      </Profile>
                    </ProfileBox>
                  );
                })}
            </div>
          </ContantBox>
        </Figure>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Figure = styled.div`
  break-inside: avoid;
  width: 100%;
`;

const ContantBox = styled.div`
  width: 100%;
  margin-bottom: 8%;
  background-color: #fff;
  .recentMissionTitle {
    font-size: 28px;
    font-weight: 600;
    padding: 1%;
    word-break: normal;
  }
  .missionUser {
    font-size: 16px;
    color: #757575;
    padding: 2%;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5% 2% 2% 2%;
`;

const Profile = styled.div`
  position: relative;
  & > p {
    white-space: nowrap;
  }
  width: 100%;
`;

const CompletedCicle = styled.div`
  width: 12px;
  height: 13px;
  border-radius: 12px;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 34px;
  right: 6px;
`;

export default HomeMission;
