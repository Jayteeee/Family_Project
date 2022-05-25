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
  console.log("사이드바에 적용할 Id값: ", NowFamilyId);

  // 사이드바 색상 변경
  const handleHomeMenuColor = () => {
    localStorage.setItem("homeMenuColor", "colorChage");
    localStorage.setItem("missionMenuColor", false);
    localStorage.setItem("calendarMenuColor", false);
    localStorage.setItem("galleryMenuColor", false);
    localStorage.setItem("voiceMenuColor", false);
  };

  const handleMissionMenuColor = () => {
    localStorage.setItem("homeMenuColor", false);
    localStorage.setItem("missionMenuColor", "colorChage");
    localStorage.setItem("calendarMenuColor", false);
    localStorage.setItem("galleryMenuColor", false);
    localStorage.setItem("voiceMenuColor", false);
  };

  const handleCalendarMenuColor = () => {
    localStorage.setItem("homeMenuColor", false);
    localStorage.setItem("missionMenuColor", false);
    localStorage.setItem("calendarMenuColor", "colorChage");
    localStorage.setItem("galleryMenuColor", false);
    localStorage.setItem("voiceMenuColor", false);
  };

  const handleGalleryMenuColor = () => {
    localStorage.setItem("homeMenuColor", false);
    localStorage.setItem("missionMenuColor", false);
    localStorage.setItem("calendarMenuColor", false);
    localStorage.setItem("galleryMenuColor", "colorChage");
    localStorage.setItem("voiceMenuColor", false);
  };

  const handleVoiceMenuColor = () => {
    localStorage.setItem("homeMenuColor", false);
    localStorage.setItem("missionMenuColor", false);
    localStorage.setItem("calendarMenuColor", false);
    localStorage.setItem("galleryMenuColor", false);
    localStorage.setItem("voiceMenuColor", "colorChage");
  };

  console.log(localStorage.getItem("homeMenuColor"));

  const [toolTipOn, setToolTipOn] = useState(false);

  return (
    <>
      <SidebarMenuWrap className="res-menuWrap">
        {localStorage.getItem("homeMenuColor") === "colorChage" ? (
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
        {localStorage.getItem("missionMenuColor") === "colorChage" ? (
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
        {localStorage.getItem("calendarMenuColor") === "colorChage" ? (
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
        {localStorage.getItem("galleryMenuColor") === "colorChage" ? (
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
        {localStorage.getItem("voiceMenuColor") === "colorChage" ? (
          <MenuBox
            className="res-menuBox"
            onClick={() => {
              history.push(`/family/${NowFamilyId}/voiceMsg/`);
              handleVoiceMenuColor();
            }}
            onMouseOver={() => setToolTipOn(true)}
            onMouseOut={() => setToolTipOn(false)}
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
            onMouseOver={() => setToolTipOn(true)}
            onMouseOut={() => setToolTipOn(false)}
            color="#c2c2c2"
          >
            <IconBox src={offVoiceIcon} />
            <Menus className="Sidebarmenus">음성 메시지</Menus>
          </MenuBox>
        )}
        {toolTipOn ? (
          <ToolTip>
            <Text C>현재 애플제품은 서비스가 지원되지 않아요!</Text>
            <div className="triangle" />
          </ToolTip>
        ) : null}
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
    background: #d6d6d6;
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

const ToolTip = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 10px;
  color: rgba(117, 117, 117, 1);
  background-color: rgba(99, 113, 247, 1);
  border-radius: 2px;
  padding: 10px 20px;
  z-index: 999;
  P {
    color: white;
  }
  svg {
    margin-left: 18px;
    color: white;
    cursor: pointer;
  }
  .triangle {
    border-bottom: 8px solid rgba(99, 113, 247, 1);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    position: absolute;
    left: 20%;
    top: -7px;
  }
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    bottom: 90px;
    left: unset;
    right: 10px;
    .triangle {
      border-bottom: unset;
      border-top: 8px solid rgba(99, 113, 247, 1);
      left: unset;
      right: 20%;
      top: 95%;
    }
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
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;

  ${({ src }) => `background-image: url(${src});`};

  background-position: center;
  background-size: cover;
`;

export default SidebarMenu;
