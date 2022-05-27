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
  HomeMember,
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
import emptyPhoto from "../shared/images/emptyPhoto.svg";

const HomePage = (props) => {
  const dispatch = useDispatch();

  const { familyId } = props.match.params;

  const { homeData } = useSelector((state) => state?.home);

  const { nowRandomMsg } = useSelector((state) => state?.home);

  const { familyMemberList } = useSelector((state) => state?.familymember);

  const { randomBadge } = homeData;

  const { recentPhoto } = homeData;

  const { recentVoiceFile } = homeData;

  const { voiceAlbumInfo } = homeData;

  const { thisMonthEventList } = homeData;

  const { recentMission } = homeData;

  const { recentMissionUser } = homeData;

  const { recentMissionMembers } = homeData;

  // const { completePercentage } = homeData;
  // console.log("미션 달성률:", completePercentage);

  // 프로필 수정 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const { user } = useSelector((state) => state?.user?.user);
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

  const closeCalendar = () => {
    setHeight(false);
  };

  // 사이드바 색상 변경
  const handleMissionMenuColor = () => {
    sessionStorage.setItem("homeMenuColor", false);
    sessionStorage.setItem("missionMenuColor", "colorChage");
    sessionStorage.setItem("calendarMenuColor", false);
    sessionStorage.setItem("galleryMenuColor", false);
    sessionStorage.setItem("voiceMenuColor", false);
  };

  const handleCalendarMenuColor = () => {
    sessionStorage.setItem("homeMenuColor", false);
    sessionStorage.setItem("missionMenuColor", false);
    sessionStorage.setItem("calendarMenuColor", "colorChage");
    sessionStorage.setItem("galleryMenuColor", false);
    sessionStorage.setItem("voiceMenuColor", false);
  };

  const handleGalleryMenuColor = () => {
    sessionStorage.setItem("homeMenuColor", false);
    sessionStorage.setItem("missionMenuColor", false);
    sessionStorage.setItem("calendarMenuColor", false);
    sessionStorage.setItem("galleryMenuColor", "colorChage");
    sessionStorage.setItem("voiceMenuColor", false);
  };

  const handleVoiceMenuColor = () => {
    sessionStorage.setItem("homeMenuColor", false);
    sessionStorage.setItem("missionMenuColor", false);
    sessionStorage.setItem("calendarMenuColor", false);
    sessionStorage.setItem("galleryMenuColor", false);
    sessionStorage.setItem("voiceMenuColor", "colorChage");
  };

  useEffect(() => {
    dispatch(homeActions.getHomeDB(familyId));
    dispatch(familyMemberActions.getFamilyMemberDB(familyId));
    // setTimeout(() => {
    //   dispatch(familyMemberActions.getFamilyMemberStatusDB(familyId));
    // }, 1000);
  }, [familyId]);

  // 토큰 없을 시 랜딩페이지로
  if (!sessionStorage.getItem("token")) {
    history.replace("/");
    localStorage.clear();
  }

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
                            <HomeMember familyMemberList={f} />
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
                          handleMissionMenuColor();
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
                        handleCalendarMenuColor();
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
                            handleMissionMenuColor();
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
                          : emptyPhoto
                      }
                    >
                      <TitleBox>
                        <Text fontWeight="600" className="photoTitle">
                          최근 사진
                        </Text>
                        <MdKeyboardArrowRight
                          onClick={() => {
                            history.push(`/family/${familyId}/gallery/`);
                            handleGalleryMenuColor();
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
                            handleVoiceMenuColor();
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

  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    width: 100%;
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
  }
`;

const Header = styled.div`
  /* width: 100%; */
  height: 138px;
  display: flex;
  align-items: center;
  text-align: left;
  margin-left: 40px;
  margin-bottom: 16px;
  /* margin-top: 3px; */
  /* background-color: aqua; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    padding: 15px;
    margin: 40px 24px;
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
    padding: 24px;
    margin: 0 0 24px 0;
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
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  padding: 0 0 20px 0;
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
    height: auto;
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
    height: auto;
    padding: 0 16px 0px 16px;
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
    /* height: 15rem; */
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
  border-radius: 12px;
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
  /* margin-bottom: 2.5%; */
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
  border-radius: 12px;
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
    height: 100%;
    padding-left: 0;
    margin-top: 30px;
    /* display: block; */
    flex-wrap: wrap;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin-top: 20px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MiddleRightCalendar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
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
    border-radius: 12px;
    padding-bottom: 0;
    flex-wrap: wrap;
    /* margin-bottom: 5%; */
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    /* margin-bottom: 5%; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* margin-bottom: 5%; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 16px;
    /* margin: 0 0 20px 0; */
    /* overflow-y: scroll; */
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    /* margin: 0 0 300px 0; */
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
  height: 100%;
  /* overflow-y: scroll; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
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

const ScheduleArea = styled.div`
  display: flex;
  width: 45%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 100%;
    padding: 2%;
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
  /* gap: 0px 10px; */
  /* column-count: 4; */
  column-gap: 20px;
  padding: 10px 20px;
  /* background-color: red; */
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    /* padding: 24px; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    /* padding: 24px; */
    /* width: 74%; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    grid-template-columns: repeat(1, 100%);
    column-gap: 20px;
    padding: 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const Figure = styled.div`
  display: grid;
  break-inside: avoid;
  width: 100%;

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* margin: 0; */
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

const BottomLeftMission = styled.div`
  width: 100%;
  height: 100%;
  /* margin-left: 10px; */
  border-radius: 12px;
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
  border-radius: 12px;
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
  border-radius: 12px;

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
    height: 95%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 95%;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BottomRightVoice = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
  margin-bottom: 10px;
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

export default HomePage;
