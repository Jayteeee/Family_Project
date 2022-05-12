import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Button, RactangleImage, Text } from "../elements";

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

  useEffect(() => {
    dispatch(homeActions.getHomeDB(familyId));
  }, []);

  return (
    <>
      <FamilyPageWrap>
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
                          <RactangleImage
                            S
                            src={f.profileImg ? f.profileImg : profileImg}
                            size="60px"
                          />
                          <Text margin="10px 0 0 0">
                            {f.familyMemberNickname}
                          </Text>
                          <TodayMood>💙</TodayMood>
                        </ProfileBox>
                      );
                    })}
                  </ProfileWrap>
                </MiddleLeftTodayMood>
              </MiddleLeftTopBox>
              <MiddleLeftBottomBox>
                <MiddleLeftMission>
                  <Text fontWeight="600">이번 달 미션 달성률</Text>
                </MiddleLeftMission>
              </MiddleLeftBottomBox>
            </MiddleLeftBox>
            <MiddleRightBox>
              <MiddleRightCalendar>
                <Text fontWeight="600">가족 일정</Text>
              </MiddleRightCalendar>
            </MiddleRightBox>
          </MiddleBox>
          <BottomBox>
            <BottomLeftBox>
              <BottomLeftMission></BottomLeftMission>
              <BottomLeftBadge></BottomLeftBadge>
            </BottomLeftBox>
            <BottomRightBox>
              <BottomRightPhoto></BottomRightPhoto>
              <BottomRightVoice></BottomRightVoice>
            </BottomRightBox>
          </BottomBox>
        </ContentsWrap>
      </FamilyPageWrap>
    </>
  );
};

const FamilyPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Header = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  align-items: center;
  background-color: aqua;
`;
const ContentsWrap = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  background-color: aquamarine;
`;
const MiddleBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: row;
  padding: 0 20px 10px 20px;
  background-color: beige;
`;
const MiddleLeftBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 10px 0 0;
  background-color: antiquewhite;
`;
const MiddleLeftTopBox = styled.div`
  width: 100%;
  height: 50%;
  padding-bottom: 10px;
  background-color: blueviolet;
`;
const MiddleLeftTodayMood = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 15px;
  text-align: left;
  background-color: gray;
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
  padding-right: 35px;
  position: relative;
`;
const TodayMood = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  padding: 0 4px 0 0;
  border-radius: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 70px;
  right: 30px;
`;
const MiddleLeftBottomBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  padding-top: 10px;
  flex-direction: column;

  background-color: burlywood;
`;
const MiddleLeftMission = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 15px;
  text-align: left;
  background-color: darkcyan;
`;
const MiddleRightBox = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 10px;
  background-color: azure;
`;
const MiddleRightCalendar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 15px;
  text-align: left;
  background-color: blanchedalmond;
`;
const BottomBox = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: row;
  padding: 10px 20px 20px 20px;
  background-color: bisque;
`;
const BottomLeftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  background-color: blue;
`;
const BottomLeftMission = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 10px;
  border-radius: 20px;
  background-color: cadetblue;
`;
const BottomLeftBadge = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10px;
  border-radius: 20px;
  background-color: chartreuse;
`;
const BottomRightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  background-color: brown;
`;
const BottomRightPhoto = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 10px;
  border-radius: 20px;
  background-color: chocolate;
`;
const BottomRightVoice = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10px;
  border-radius: 20px;
  background-color: coral;
`;
export default HomePage;
