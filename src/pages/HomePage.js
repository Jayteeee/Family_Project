import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Button, RactangleImage, Text } from "../elements";

// 컴포넌트
import {
  HomeBadge,
  HomeCalendar,
  HomeMission,
  HomeMissionStatus,
  HomePhoto,
  HomeSchedule,
  HomeVoice,
} from "../components/Home";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../redux/modules/home";

// 이미지
import profileImg from "../shared/images/profileImg.png";

const HomePage = (props) => {
  const dispatch = useDispatch();

  const { familyId } = props.match.params;
  console.log("홈페이지 familyId:", familyId);

  const { homeData } = useSelector((state) => state?.home);
  console.log("홈페이지 데이터:", homeData);

  const { nowRandomMsg } = useSelector((state) => state?.home);
  console.log("현재 랜덤메시지:", nowRandomMsg);

  const { familyMemberList } = useSelector((state) => state?.home);
  console.log("가족구성원 리스트:", familyMemberList);

  const { randomBadge } = homeData;
  console.log("랜덤 배지:", randomBadge);

  const { recentPhoto } = homeData;
  console.log("최근 사진:", recentPhoto);

  const { recentVoiceFile } = homeData;
  console.log("최근 음성메시지:", recentVoiceFile);

  const { thisMonthEventList } = homeData;
  console.log("현재 일정:", thisMonthEventList);

  const { recentMission } = homeData;
  console.log("최근 미션:", recentMission);

  const { completePercentage } = homeData;
  console.log("미션 달성률:", completePercentage);

  useEffect(() => {
    dispatch(homeActions.getHomeDB(familyId));
  }, []);

  return (
    <>
      <HomePageWrap>
        <Header>
          <Text size="2.5rem" fontWeight="600">
            {nowRandomMsg.randomMsg}
          </Text>
        </Header>
        <ContentsWrap>
          <MiddleBox>
            <MiddleLeftBox>
              <MiddleLeftTopBox>
                <MiddleLeftTodayMood>
                  <Text fontWeight="600">오늘의 기분</Text>
                  <ProfileWrap>
                    {familyMemberList.map((f) => {
                      return (
                        <ProfileBox key={f.familyMemberId}>
                          <div
                            style={{
                              position: "relative",
                              width: "75px",
                              marginRight: "2vw",
                            }}
                          >
                            <RactangleImage
                              S
                              src={f.profileImg ? f.profileImg : profileImg}
                              size="70px"
                              borderRadius="16px"
                              borderColor="gray"
                            />
                            <Text
                              margin="15px 0 0 0"
                              size="15px"
                              fontWeight="600"
                            >
                              {f.familyMemberNickname}
                            </Text>
                            <TodayMood>💙 </TodayMood>
                          </div>
                        </ProfileBox>
                      );
                    })}
                  </ProfileWrap>
                </MiddleLeftTodayMood>
              </MiddleLeftTopBox>
              <MiddleLeftBottomBox>
                <MiddleLeftMission>
                  <div
                    style={{
                      height: "10%",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Text fontWeight="600"> 이번 달 미션 달성률</Text>
                  </div>
                  <HomeMissionStatus
                    completePercentage={completePercentage}
                    familyId={familyId}
                  />
                </MiddleLeftMission>
              </MiddleLeftBottomBox>
            </MiddleLeftBox>
            <MiddleRightBox>
              <MiddleRightCalendar>
                <div
                  style={{
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <Text fontWeight="600"> 가족 일정</Text>
                </div>

                <TotalCalendar>
                  <CalendarArea>
                    <HomeCalendar
                      thisMonthEventList={thisMonthEventList}
                      familyId={familyId}
                    />
                  </CalendarArea>
                  <ScheduleArea>
                    <HomeSchedule
                      thisMonthEventList={thisMonthEventList}
                      familyId={familyId}
                    />
                  </ScheduleArea>
                </TotalCalendar>
              </MiddleRightCalendar>
            </MiddleRightBox>
          </MiddleBox>
          <BottomBox>
            <BottomLeftBox>
              <BottomLeftMission>
                <div
                  style={{
                    marginBottom: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text fontWeight="600"> 진행중인 미션</Text>
                </div>
                <HomeMission
                  recentMission={recentMission}
                  familyId={familyId}
                />
              </BottomLeftMission>
              <BottomLeftBadge>
                <div
                  style={{
                    marginBottom: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text fontWeight="600"> 달성 배지</Text>
                </div>
                <HomeBadge randomBadge={randomBadge} familyId={familyId} />
              </BottomLeftBadge>
            </BottomLeftBox>
            <BottomRightBox>
              <BottomRightPhoto>
                <div
                  style={{
                    marginBottom: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text fontWeight="600">최근 등록된 사진</Text>
                </div>
                <HomePhoto recentPhoto={recentPhoto} familyId={familyId} />
              </BottomRightPhoto>
              <BottomRightVoice>
                <div
                  style={{
                    marginBottom: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text fontWeight="600">최근 등록된 음성메시지</Text>
                </div>
                <HomeVoice
                  recentVoiceFile={recentVoiceFile}
                  familyId={familyId}
                />
              </BottomRightVoice>
            </BottomRightBox>
          </BottomBox>
        </ContentsWrap>
      </HomePageWrap>
    </>
  );
};

const HomePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: calc(100vh - 100px);
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: calc(100vh - 100px);
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: calc(100vh - 130px);
    /* column-count: 1;
    padding: 8px; */
  }
`;

const Header = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  align-items: center;
  margin-left: 40px;
  /* background-color: aqua; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    display: block;
    padding: 15px;
    margin: 24px 0;
    & > p {
      font-size: 2rem;
    }
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  /* background-color: aquamarine; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* width: 1000px; */
    height: 100%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding: 4px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    padding: 4px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const MiddleBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: row;
  padding: 0 20px 10px 20px;

  /* background-color: beige; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    flex-direction: column;
    height: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const MiddleLeftBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 10px 0 0;
  /* background-color: antiquewhite; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
    height: 700px;
    padding: 0;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const MiddleLeftTopBox = styled.div`
  width: 100%;
  height: 50%;
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
  padding-bottom: 10px;
  /* background-color: blueviolet; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 50%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const MiddleLeftTodayMood = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 2.5%;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
`;
const ProfileWrap = styled.div`
  height: 100%;
  padding-left: 5px;
  display: flex;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const TodayMood = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 17px;
  padding: 0 4px 0 0;
  border-radius: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 45px;
  right: 0px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
`;
const MiddleLeftBottomBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  /* background-color: burlywood; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 50%;
    display: block;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const MiddleLeftMission = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 2.5% 2.5% 1% 2.5%;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
`;
const MiddleRightBox = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 10px;
  /* background-color: azure; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
    padding-left: 0;
    margin-top: 20px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const MiddleRightCalendar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 5px 15px 0 15px;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
`;
const TotalCalendar = styled.div`
  display: flex;
  justify-content: center;
`;
const CalendarArea = styled.div`
  width: 60%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 55%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const ScheduleArea = styled.div`
  width: 40%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 45%;
    margin-left: 20px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomBox = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: row;
  padding: 10px 20px 20px 20px;
  /* background-color: bisque; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* flex-direction: column; */
    display: block;
    width: 100%;
    height: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomLeftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  /* background-color: blue; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    padding-right: 0;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomLeftMission = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    margin-right: 0;
    height: 95%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomLeftBadge = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 95%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomRightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  /* background-color: brown; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    padding-left: 0;
    /* margin-top: 20px; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomRightPhoto = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    margin-right: 0;
    height: 95%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const BottomRightVoice = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 95%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const VoiceArea = styled.div`
  /* width: 100%;
  height: 100%; */
`;
export default HomePage;
