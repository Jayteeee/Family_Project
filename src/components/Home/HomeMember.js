import React, { useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { RactangleImage, Text } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyMemberActions } from "../../redux/modules/familymember";

// 이미지
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";
import smilingEmoji from "../../shared/images/smile.svg";
import heartsSmileEmoji from "../../shared/images/lovely.svg";
import sunglassesEmoji from "../../shared/images/cool.svg";
import cryingEmoji from "../../shared/images/crying.svg";
import explodingEmoji from "../../shared/images/exploading.svg";
import angryEmoji from "../../shared/images/angry.svg";
import sleepingEmoji from "../../shared/images/sleeping.svg";

const HomeMember = ({ familyMemberList }) => {
  const dispatch = useDispatch();
  console.log(familyMemberList);
  const f = familyMemberList;
  const userId = f.userId;

  const { familyMemberStatusList } = useSelector(
    (state) => state?.familymember
  );

  const status = familyMemberStatusList.find((x) => {
    return x.userId === userId;
  });

  console.log(status);

  console.log("가족구성원 리스트:", familyMemberStatusList);

  useEffect(() => {
    setTimeout(() => {
      dispatch(familyMemberActions.getFamilyMemberStatusDB(f.familyId));
    }, 1000);
  }, []);

  return (
    <>
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
          size="80px"
          borderRadius="28px"
          borderColor="none"
          className="proFileImage"
        />
        <TextBox>
          <Text margin="15px 0 0 0" size="15px" fontWeight="600">
            {f.familyMemberNickname}
          </Text>
        </TextBox>
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
        {status ? (
          <StatusBox>
            <Text C>
              {status?.connected ? `🟢 접속중` : status?.connectedAt}
            </Text>
          </StatusBox>
        ) : (
          <StatusBox>
            <div></div>
          </StatusBox>
        )}
      </Profile>
    </>
  );
};
const Profile = styled.div`
  position: relative;
  /* width: 80px; */
  width: 100%;
`;

const TextBox = styled.div`
  white-space: nowrap;
  margin-top: 20%;
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
  border-radius: 50%;
  border: none;
  background-color: #fff;
  position: absolute;
  bottom: 40%;
  right: -10px;
`;
const TodayMood = styled.div`
  width: 27px;
  height: 27px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;
const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;

export default HomeMember;
