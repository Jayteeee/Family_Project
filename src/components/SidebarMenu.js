import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdHome,
  MdVerified,
  MdEvent,
  MdPhotoLibrary,
  MdOutlineVoicemail,
  MdClear,
} from "react-icons/md";

// 리덕스
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { scheduleActions } from "../redux/modules/calendar";

// 엘리먼트
// 엘리먼트
import { Text, CircleImage, RactangleImage } from "../elements";

// 이미지
import onHomeIcon from "../shared/images/onHomeIcon.svg";
import onMissionIcon from "../shared/images/onMissionIcon.svg";
import onCalendarIcon from "../shared/images/onCalendarIcon.svg";
import onGalleryIcon from "../shared/images/onGalleryIcon.svg";
import onVoiceIcon from "../shared/images/onVoiceIcon.svg";
import offHomeIcon from "../shared/images/offHomeIcon.svg";
import offMissionIcon from "../shared/images/offMissionIcon.svg";
import offCalendarIcon from "../shared/images/offCalendarIcon.svg";
import offGalleryIcon from "../shared/images/offGalleryIcon.svg";
import offVoiceIcon from "../shared/images/offVoiceIcon.svg";

const SidebarMenu = (familyId) => {
  const dispatch = useDispatch();
  const { NowFamilyId } = familyId;

  // 사이드바 색상 변경
  const handleHomeMenuColor = () => {
    sessionStorage.setItem("homeMenuColor", "colorChage");
    sessionStorage.setItem("missionMenuColor", false);
    sessionStorage.setItem("calendarMenuColor", false);
    sessionStorage.setItem("galleryMenuColor", false);
    sessionStorage.setItem("voiceMenuColor", false);
  };

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

  return (
    <>
      <SidebarMenuWrap className="res-menuWrap">
        {sessionStorage.getItem("homeMenuColor") === "colorChage" ? (
          <MenuBox
            className="homeMenu"
            onClick={() => {
              history.replace(`/family/${NowFamilyId}`);
              handleHomeMenuColor();
            }}
            color="#6371F7"
          >
            <IconBox src={onHomeIcon} />
            {/* <MdHome style={{ fontSize: "24px" }} /> */}
            <Menus className="Sidebarmenus">홈</Menus>
          </MenuBox>
        ) : (
          <MenuBox
            className="homeMenu"
            onClick={() => {
              history.replace(`/family/${NowFamilyId}`);
              handleHomeMenuColor();
            }}
            color="#c2c2c2"
          >
            <IconBox src={offHomeIcon} />
            {/* <MdHome style={{ fontSize: "24px" }} /> */}
            <Menus className="Sidebarmenus">홈</Menus>
          </MenuBox>
        )}
        {sessionStorage.getItem("missionMenuColor") === "colorChage" ? (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/mission/`);
              handleMissionMenuColor();
            }}
            color="#6371F7"
          >
            <IconBox src={onMissionIcon} />
            <Menus className="Sidebarmenus"> 미션</Menus>
          </MenuBox>
        ) : (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/mission/`);
              handleMissionMenuColor();
            }}
            color="#c2c2c2"
          >
            <IconBox src={offMissionIcon} />
            <Menus className="Sidebarmenus"> 미션</Menus>
          </MenuBox>
        )}
        {sessionStorage.getItem("calendarMenuColor") === "colorChage" ? (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/calendar/`);
              handleCalendarMenuColor();
            }}
            color="#6371F7"
          >
            <IconBox src={onCalendarIcon} />
            <Menus className="Sidebarmenus">캘린더</Menus>
          </MenuBox>
        ) : (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/calendar/`);
              handleCalendarMenuColor();
            }}
            color="#c2c2c2"
          >
            <IconBox src={offCalendarIcon} />
            <Menus className="Sidebarmenus">캘린더</Menus>
          </MenuBox>
        )}
        {sessionStorage.getItem("galleryMenuColor") === "colorChage" ? (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/gallery/`);
              handleGalleryMenuColor();
            }}
            color="#6371F7"
          >
            <IconBox src={onGalleryIcon} />
            <Menus className="Sidebarmenus">갤러리</Menus>
          </MenuBox>
        ) : (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/gallery/`);
              handleGalleryMenuColor();
            }}
            color="#c2c2c2"
          >
            <IconBox src={offGalleryIcon} />
            <Menus className="Sidebarmenus">갤러리</Menus>
          </MenuBox>
        )}
        {sessionStorage.getItem("voiceMenuColor") === "colorChage" ? (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/voiceMsg/`);
              handleVoiceMenuColor();
            }}
            color="#6371F7"
          >
            <IconBox src={onVoiceIcon} />
            <Menus className="Sidebarmenus">음성 메시지</Menus>
          </MenuBox>
        ) : (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/voiceMsg/`);
              handleVoiceMenuColor();
            }}
            color="#c2c2c2"
          >
            <IconBox src={offVoiceIcon} />
            <Menus className="Sidebarmenus">음성 메시지</Menus>
          </MenuBox>
        )}
      </SidebarMenuWrap>
    </>
  );
};

const SidebarMenuWrap = styled.div`
  height: 60vh;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    display: flex !important;
    margin-top: 0px !important;
    font-size: 15px !important;
    text-align: center !important;
    border-radius: 0px !important;
    width: 100% !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    display: flex !important;
    margin-top: 0px !important;
    font-size: 15px !important;
    text-align: center !important;
    border-radius: 0px !important;
    width: 100% !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 10px !important;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 20px 20px;
  font-size: 20px;
  font-weight: 500;
  color: #c2c2c2;
  ${({ color }) => `color: ${color}`};
  cursor: pointer;

  .homeMenu {
    color: #6371f7 !important;
  }

  &:hover {
    background: #f6f6f6;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    justify-content: center !important;
    flex-direction: column !important;
    border-radius: 0px !important;
    font-size: 15px !important;
    width: 100% !important;
    padding: 0 !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    justify-content: center !important;
    flex-direction: column !important;
    border-radius: 0px !important;
    font-size: 15px !important;
    width: 100% !important;
    padding: 0 !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 10px !important;
    svg {
      font-size: 17px !important;
    }
  }
`;

const Menus = styled.span`
  margin-left: 10px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 2px 0 !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin: 2px 0 !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;

  ${({ src }) => `background-image: url(${src});`};

  background-position: center;
  background-size: cover;
`;

export default SidebarMenu;
