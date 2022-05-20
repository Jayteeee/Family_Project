import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import dayjs from "dayjs";

// 엘리먼트
import { Button, CircleImage, RactangleImage, Text } from "../elements";

// 컴포넌트
import {
  HomeBadge,
  HomeCalendar,
  HomeMission,
  HomeMissionStatus,
  HomeSchedule,
  HomeVoice,
} from "../components/Home";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../redux/modules/home";
import { missionActions } from "../redux/modules/mission";
import { history } from "../redux/configureStore";
import { familyMemberActions } from "../redux/modules/familymember";

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
import noImage from "../shared/images/noImage.png";

const HomePage = (props) => {
  const dispatch = useDispatch();

  console.log(props);

  const { familyId } = props.match.params;
  console.log("홈페이지 familyId:", familyId);

  const { homeData } = useSelector((state) => state?.home);
  console.log("홈페이지 데이터:", homeData);

  const { nowRandomMsg } = useSelector((state) => state?.home);
  console.log("현재 랜덤메시지:", nowRandomMsg);

  const { familyMemberList } = useSelector((state) => state?.familymember);
  console.log("가족구성원 리스트:", familyMemberList);

  const { randomBadge } = homeData;
  console.log("랜덤 배지:", randomBadge);

  const { recentPhoto } = homeData;
  console.log("최근 사진:", recentPhoto);

  const { recentVoiceFile } = homeData;
  console.log("최근 음성메시지:", recentVoiceFile);

  const { voiceAlbumInfo } = homeData;
  console.log("음성 메시지 앨범 정보", voiceAlbumInfo);

  const { thisMonthEventList } = homeData;
  console.log("현재 일정:", thisMonthEventList);

  const { recentMission } = homeData;
  console.log("최근 미션:", recentMission);

  const { recentMissionUser } = homeData;
  console.log("최근 미션등록 유저:", recentMissionUser);

  const { recentMissionMembers } = homeData;
  console.log("최근 미션 맴버리스트:", recentMissionMembers);

  // const { completePercentage } = homeData;
  // console.log("미션 달성률:", completePercentage);

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

  // 캘린더 높이 조절
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState("false");

  const handleOpen = () => {
    setOpen(!open);
  };

  const openCalendar = () => {
    setHeight("100%");
  };
  console.log(height);

  const closeCalendar = () => {
    setHeight(false);
  };

  useEffect(() => {
    dispatch(homeActions.getHomeDB(familyId));
    dispatch(familyMemberActions.getFamilyMemberDB(familyId));
  }, [familyId]);

  return (
    <>
      <HomePageWrap>
        <div style={{ height: "200%" }}>
          <Header>
            <Text size="2.5rem" fontWeight="600">
              {nowRandomMsg.randomMsg}
            </Text>
          </Header>
          <ContentsWrap>
            <MiddleBox height={height}>
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
                                    f.todayMood === "good"
                                      ? smilingEmoji
                                      : f.todayMood === "love"
                                      ? heartsSmileEmoji
                                      : f.todayMood === "nice"
                                      ? sunglassesEmoji
                                      : f.todayMood === "sad"
                                      ? cryingEmoji
                                      : f.todayMood === "head"
                                      ? explodingEmoji
                                      : f.todayMood === "angry"
                                      ? angryEmoji
                                      : f.todayMood === "sleepy"
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
                    <HomeMissionStatus familyId={familyId} />
                  </MiddleLeftMission>
                </MiddleLeftBottomBox>
              </MiddleLeftBox>
              <MiddleRightBox height={height}>
                <MiddleRightCalendar height={height}>
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
                {!open ? (
                  <div
                    onClick={() => {
                      openCalendar();
                      handleOpen();
                    }}
                    className="calendarBtnBox"
                  >
                    <Text className="calendarOpenBtn">펼쳐보기</Text>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      closeCalendar();
                      handleOpen();
                    }}
                    className="calendarBtnBox"
                  >
                    <Text className="calendarCloseBtn">닫기</Text>
                  </div>
                )}
              </MiddleRightBox>
            </MiddleBox>
            <div>
              <Container>
                <Figure>
                  <ContentsBox>
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
                      <HomeMission
                        recentMission={recentMission}
                        recentMissionUser={recentMissionUser}
                        recentMissionMembers={recentMissionMembers}
                      />
                    </BottomLeftMission>
                  </ContentsBox>
                </Figure>
                <Figure>
                  <ContentsBox>
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
                      <HomeBadge
                        randomBadge={randomBadge}
                        familyId={familyId}
                      />
                    </BottomLeftBadge>
                  </ContentsBox>
                </Figure>
                <Figure>
                  <ContentsBox>
                    <BottomRightPhoto
                      src={
                        recentPhoto?.photoFile
                          ? recentPhoto?.photoFile
                          : noImage
                      }
                    >
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
                      {/* <HomePhoto recentPhoto={recentPhoto} familyId={familyId} /> */}
                    </BottomRightPhoto>
                  </ContentsBox>
                </Figure>
                <Figure>
                  <ContentsBox>
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
                      <HomeVoice
                        recentVoiceFile={recentVoiceFile}
                        voiceAlbumInfo={voiceAlbumInfo}
                      />
                    </BottomRightVoice>
                  </ContentsBox>
                </Figure>
              </Container>
            </div>
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
    padding: 15px;
    margin: 24px 0;
    height: 3%;
    & > p {
      font-size: 2rem;
    }
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 30px 0;
    /* height: 7%; */
    & > p {
      font-size: 30px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    /* height: 7%; */
    & > p {
      font-size: 23px;
    }
  }
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
    /* height: 100%; */
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
    padding: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MiddleBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  padding: 0 20px 10px 20px;

  /* background-color: beige; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    flex-direction: column;
    /* height: 50%; */
    height: 100%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 0 16px 10px 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
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
    max-height: 30rem;
    padding: 0;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;
const MiddleLeftTopBox = styled.div`
  width: 100%;
  height: 50%;
  padding-bottom: 10px;
  /* background-color: blueviolet; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    height: 15rem;
    /* overflow-x: scroll; */
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
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

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
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
  overflow-x: scroll;
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
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  /* padding: 0 4px 0 0; */
  border-radius: 20px;
  border: none;
  background-color: #fff;
  position: absolute;
  bottom: 32px;
  right: -10px;
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
  /* background-color: #fff; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* height: 50%; */
    /* display: block; */
    height: 15rem;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
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
    padding: 16px !important;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MiddleRightBox = styled.div`
  position: relative;
  width: 50%;
  /* height: 100%; */
  padding-left: 10px;
  /* background-color: azure; */

  .calendarOpenBtn {
    display: none;
  }
  .calendarCloseBtn {
    display: none;
  }
  .calendarBtnBox {
    display: none;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
    padding-left: 0;
    margin-top: 20px;
    /* display: block; */
    flex-wrap: wrap;
    ${({ height }) => (height ? `height: ${height};` : "height: 50rem;")};

    .calendarOpenBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background: #fff;
      font-size: 15px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #dbdbdb;
    }
    .calendarCloseBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background: #fff;
      font-size: 15px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #dbdbdb;
    }
    .calendarBtnBox {
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 24px;
      background: #fff;
      border-radius: 20px;
    }
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    min-height: 60rem;
    ${({ height }) => (height ? `height: ${height};` : "max-height: 70rem;")};
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    min-height: 40rem;
    ${({ height }) => (height ? `height: ${height};` : "max-height: 70rem;")};
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    min-height: 30rem;
    ${({ height }) => (height ? `height: ${height};` : "max-height: 45rem;")};
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    ${({ height }) => (height ? `height: ${height};` : "max-height: 40rem;")};
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
  overflow-y: hidden;

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
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    border-radius: 20px;
    padding-bottom: 0;
    flex-wrap: wrap;
    /* margin-bottom: 5%; */
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin-bottom: 5%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin-bottom: 5%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 16px;
    margin: 0 0 20px 0;
    /* overflow-y: scroll; */
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    margin: 0 0 300px 0;
  }
`;

const TotalCalendar = styled.div`
  display: flex;
  justify-content: center;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    flex-wrap: wrap;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const CalendarArea = styled.div`
  width: 55%;
  /* overflow-y: scroll; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const ScheduleArea = styled.div`
  display: flex;
  width: 45%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    overflow: scroll;
  }
`;

const Container = styled.div`
  /* height: 30%; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
  column-count: 4;
  column-gap: 1.6%;
  padding: 1% 20px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2%;
    /* padding: 24px; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2%;
    padding: 24px;
    /* width: 74%; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    grid-template-columns: repeat(1, 1fr);
    column-gap: 4%;
    padding: 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const Figure = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  grid-template-rows: 1fr auto;
  /* margin-bottom: 2%; */
  break-inside: avoid;
  width: 100%;
  /* height: 100%; */
  /* width: 300px;
  min-height: 300px; */

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .albumName {
      font-size: 20px;
    }
  }
`;

const ContentsBox = styled.div`
  position: relative;
  grid-row: 1 / -1;
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 100%;
  /* background-color: gray; */
  background-position: center;
  background-size: cover;
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

const PhotoTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 5%;
  & > svg {
    padding: 2px;
    color: #fff;
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

const BottomLeftMission = styled.div`
  width: 100%;
  height: 100%;
  /* margin-left: 10px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;

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
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BottomLeftBadge = styled.div`
  width: 100%;
  height: 100%;
  /* margin-left: 10px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;

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
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BottomRightPhoto = styled.div`
  width: 100%;
  height: 100%;
  /* margin-left: 10px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;

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
    /* margin-right: 0;
    height: 95%; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BottomRightVoice = styled.div`
  width: 100%;
  height: 100%;
  /* margin-left: 10px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;

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
    height: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

export default HomePage;
