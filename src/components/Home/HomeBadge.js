import React, { useState, useRef, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdPlayArrow, MdOutlinePause } from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { history } from "../../redux/configureStore";
import { useDispatch } from "react-redux";
import { missionActions } from "../../redux/modules/mission";

// 엘리먼트
import { Text } from "../../elements";

// 이미지
import noImage from "../../shared/images/noImage.png";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { BadgeModal } from "../../shared/modal/component/MissionModal";

const HomeBadge = ({ randomBadge, familyId }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Figure>
          <ContantBox>
            <div
              style={{
                width: "32%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <BadgeImg
                src={
                  randomBadge?.badgeTitle == "단란한 시작"
                    ? noImage
                    : randomBadge?.badgeTitle == "추억의 발자국"
                    ? noImage
                    : randomBadge?.badgeTitle == "정겨운 목소리"
                    ? noImage
                    : randomBadge?.badgeTitle == "협동의 즐거움"
                    ? noImage
                    : randomBadge?.badgeTitle == "소통의 기쁨"
                    ? noImage
                    : randomBadge?.badgeTitle == "함께하는 나날"
                    ? noImage
                    : noImage
                }
              />
            </div>
            <Text className="homeBadgeTitle">{randomBadge?.badgeTitle}</Text>
          </ContantBox>
        </Figure>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 90%;
  height: 100%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* column-count: 1; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* column-count: 1;
    padding: 24px; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* column-count: 1;
    padding: 8px; */
  }
`;

const Figure = styled.div`
  break-inside: avoid;
  width: 100%;
  height: 100%;
`;
const ContantBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
  /* border-radius: 20px;
  border: 1px solid #c4c4c4; */
  .homeBadgeTitle {
    margin-top: 5%;
    font-size: 16px;
    color: #757575;
  }
`;

const BadgeImg = styled.div`
  width: 100%;
  padding: 100%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
`;

export default HomeBadge;
