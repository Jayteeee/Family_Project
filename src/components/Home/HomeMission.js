import React, { useState, useRef, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdPlayArrow, MdOutlinePause, MdCheckCircle } from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { history } from "../../redux/configureStore";

// 엘리먼트
import { RactangleImage, Text } from "../../elements";

// 이미지
import noImage from "../../shared/images/noImage.png";
import profileImg from "../../shared/images/profileImg.png";
import missionChkImg from "../../shared/images/missionChkImg.png";

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
              {recentMissionUser?.familyMemberNickname}님이 제안했어요!
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
                          src={f.profileImg ? f.profileImg : profileImg}
                          size="56px"
                          borderRadius="20px"
                          borderColor="none"
                          className="proFileImage"
                        />

                        {f.myMissionChk && (
                          <MissionChkBox src={missionChkImg} />
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
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const Figure = styled.div`
  break-inside: avoid;
  width: 100%;
`;

const ContantBox = styled.div`
  width: 100%;
  background-color: #fff;
  margin-top: 5%;
  .recentMissionTitle {
    font-size: 28px;
    font-weight: 600;
    padding: 1%;
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

const MissionChkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 17px;
  border-radius: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  right: -5px;
  background-color: #6371f7;
  /* box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05); */
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const MissionChk = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default HomeMission;
