import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";

// 엘리먼트
import { Button, CircleImage, RactangleImage, Text } from "../elements";

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
import { missionActions } from "../redux/modules/mission";
import { history } from "../redux/configureStore";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import { ProfileModal } from "../shared/modal/component/ProfileModal";
import { BadgeModal } from "../shared/modal/component/MissionModal";

// 이미지
import smilingEmoji from "../shared/images/smilingEmoji.png";
import heartsSmileEmoji from "../shared/images/heartsSmileEmoji.png";
import sunglassesEmoji from "../shared/images/sunglassesEmoji.png";
import cryingEmoji from "../shared/images/cryingEmoji.png";
import explodingEmoji from "../shared/images/explodingEmoji.png";
import angryEmoji from "../shared/images/angryEmoji.png";
import sleepingEmoji from "../shared/images/sleepingEmoji.png";
import profileImg from "../shared/images/profileImg.png";

const HomePage = (props) => {
  const dispatch = useDispatch();

  console.log(props);

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

  // 프로필 수정 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const { user } = useSelector((state) => state?.user?.user);
  console.log("홈유저정보: ", user);

  // 배지 목록 모달
  const [badgemodalOn, setBadgeModalOn] = useState(false);

  const handleBadgeModal = () => {
    setBadgeModalOn(!badgemodalOn);
  };

  const getBadgeList = () => {
    dispatch(missionActions.getBadgeListDB(familyId));
  };

  useEffect(() => {
    dispatch(homeActions.getHomeDB(familyId));
  }, [familyId]);

  return (
    <>
      <HomePageWrap>
        <div style={{ height: "100%" }}>
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
                    <MiddleTitleBox>
                      <Text fontWeight="600" className="todayMoodTitle">
                        오늘의 기분
                      </Text>
                      <MdKeyboardArrowRight onClick={handleModal} />
                    </MiddleTitleBox>
                    <ProfileWrap>
                      {familyMemberList.map((f) => {
                        return (
                          <ProfileBox key={f.familyMemberId}>
                            <Profile>
                              <RactangleImage
                                S
                                src={f.profileImg ? f.profileImg : profileImg}
                                size="80px"
                                borderRadius="28px"
                                borderColor="none"
                                className="proFileImage"
                              />
                              <Text
                                margin="15px 0 0 0"
                                size="15px"
                                fontWeight="600"
                              >
                                {f.familyMemberNickname}
                              </Text>
                              <TodayMoodBox>
                                <TodayMood
                                  src={
                                    f.todayMood === "smilingEmoji"
                                      ? smilingEmoji
                                      : f.todayMood === "heartsSmileEmoji"
                                      ? heartsSmileEmoji
                                      : f.todayMood === "sunglassesEmoji"
                                      ? sunglassesEmoji
                                      : f.todayMood === "cryingEmoji"
                                      ? cryingEmoji
                                      : f.todayMood === "explodingEmoji"
                                      ? explodingEmoji
                                      : f.todayMood === "angryEmoji"
                                      ? angryEmoji
                                      : f.todayMood === "sleepingEmoji"
                                      ? sleepingEmoji
                                      : smilingEmoji
                                  }
                                />
                              </TodayMoodBox>
                            </Profile>
                          </ProfileBox>
                        );
                      })}
                    </ProfileWrap>
                  </MiddleLeftTodayMood>
                </MiddleLeftTopBox>
                <MiddleLeftBottomBox>
                  <MiddleLeftMission>
                    <MiddleTitleBox>
                      <Text fontWeight="600" className="missionStatusTitle">
                        이번 달 미션 달성률
                      </Text>
                      <MdKeyboardArrowRight
                        onClick={() => {
                          history.push(`/family/${familyId}/mission/`);
                        }}
                      />
                    </MiddleTitleBox>
                    <HomeMissionStatus
                      completePercentage={completePercentage}
                    />
                  </MiddleLeftMission>
                </MiddleLeftBottomBox>
              </MiddleLeftBox>
              <MiddleRightBox>
                <MiddleRightCalendar>
                  <MiddleTitleBox>
                    <Text fontWeight="600" className="calendarTitle">
                      캘린더
                    </Text>
                    <MdKeyboardArrowRight
                      onClick={() => {
                        history.push(`/family/${familyId}/calendar/`);
                      }}
                    />
                  </MiddleTitleBox>
                  <TotalCalendar>
                    <CalendarArea>
                      <HomeCalendar thisMonthEventList={thisMonthEventList} />
                    </CalendarArea>
                    <ScheduleArea>
                      <HomeSchedule thisMonthEventList={thisMonthEventList} />
                    </ScheduleArea>
                  </TotalCalendar>
                </MiddleRightCalendar>
              </MiddleRightBox>
            </MiddleBox>
            <BottomBox>
              <BottomLeftBox>
                <BottomLeftMission>
                  <TitleBox>
                    <Text fontWeight="600" className="missionTitle">
                      오늘의 미션
                    </Text>
                    <MdKeyboardArrowRight
                      onClick={() => {
                        history.push(`/family/${familyId}/mission/`);
                      }}
                    />
                  </TitleBox>
                  <HomeMission recentMission={recentMission} />
                </BottomLeftMission>
                <BottomLeftBadge>
                  <TitleBox>
                    <Text fontWeight="600" className="badgeTitle">
                      달성 배지
                    </Text>
                    <MdKeyboardArrowRight
                      onClick={() => {
                        getBadgeList();
                        handleBadgeModal();
                      }}
                    />
                  </TitleBox>
                  <HomeBadge randomBadge={randomBadge} familyId={familyId} />
                </BottomLeftBadge>
              </BottomLeftBox>
              <BottomRightBox>
                <BottomRightPhoto>
                  <TitleBox>
                    <Text fontWeight="600" className="photoTitle">
                      최근 사진
                    </Text>
                    <MdKeyboardArrowRight
                      onClick={() => {
                        history.push(`/family/${familyId}/gallery/`);
                      }}
                    />
                  </TitleBox>
                  <HomePhoto recentPhoto={recentPhoto} familyId={familyId} />
                </BottomRightPhoto>
                <BottomRightVoice>
                  <TitleBox>
                    <Text fontWeight="600" className="voiceTitle">
                      최근 음성메시지
                    </Text>
                    <MdKeyboardArrowRight
                      onClick={() => {
                        history.push(`/family/${familyId}/voiceMsg/`);
                      }}
                    />
                  </TitleBox>
                  <HomeVoice recentVoiceFile={recentVoiceFile} />
                </BottomRightVoice>
              </BottomRightBox>
            </BottomBox>
          </ContentsWrap>
        </div>
      </HomePageWrap>
      {/* 프로필 모달 */}
      <ModalPortal>
        {modalOn && (
          <ProfileModal onClose={handleModal} user={user}></ProfileModal>
        )}
      </ModalPortal>
      {/* 배지 목록 모달 */}
      <ModalPortal>
        {badgemodalOn && (
          <BadgeModal
            onClose={handleBadgeModal}
            familyId={familyId}
          ></BadgeModal>
        )}
      </ModalPortal>
    </>
  );
};

const HomePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
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
  .todayMoodTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 80px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }
`;
const MiddleTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.5%;
  /* padding: 0 5%; */
  & > svg {
    padding: 2px;
    color: #757575;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
      color: black;
    }
  }
`;
const ProfileWrap = styled.div`
  /* height: 100%; */
  /* padding-left: 5px; */
  display: flex;
  width: 100%;
  margin-top: 24px;
  padding: 0 10px;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 30px;
`;
const Profile = styled.div`
  position: relative;
  /* width: 80px; */
  & > p {
    white-space: nowrap;
  }
  width: 100%;
`;
const TodayMoodBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 37px;
  font-size: 17px;
  /* padding: 0 4px 0 0; */
  border-radius: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  bottom: 32px;
  right: -10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
`;
const TodayMood = styled.div`
  width: 27px;
  height: 27px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
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
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 2.5%;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  & > svg {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 16px;
    margin-top: 22px;
    font-size: 24px;
    color: #757575;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
      color: black;
    }
  }

  .missionStatusTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 123px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }
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
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 2.5%;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  & > svg {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 16px;
    margin-top: 22px;
    font-size: 24px;
    color: #757575;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
      color: black;
    }
  }

  .calendarTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 53px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }
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
  height: 100%;
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

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 5%;
  & > svg {
    padding: 2px;
    color: #757575;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
      color: black;
    }
  }
`;

const BottomLeftBox = styled.div`
  width: 100%;
  height: 140%;
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
  height: 90%;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  .missionTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 80px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }

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
  height: 90%;
  margin-left: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  .badgeTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 68px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }

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
  height: 140%;
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
  height: 90%;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  .photoTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 68px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }

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
  height: 90%;
  margin-left: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  .voiceTitle {
    display: flex;
    font-size: 14px;
    background-color: #f5f5f5;
    width: 105px;
    height: 34px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
  }

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
