import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import {
  MdHome,
  MdVerified,
  MdEvent,
  MdPhotoLibrary,
  MdOutlineVoicemail,
} from "react-icons/md";

// 리덕스
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { scheduleActions } from "../redux/modules/calendar";

// 엘리먼트
import { RactangleImage } from "../elements/index";

const SidebarMenu = (familyId) => {
  const dispatch = useDispatch();
  const { NowFamilyId } = familyId;
  console.log("사이드바에 적용할 Id값: ", NowFamilyId);

  const [homeMenuColor, setHomeMenuColor] = useState("#familyId");
  const [missionMenuColor, setMissionMenuColor] = useState("#c2c2c2");
  const [calendarMenuColor, setCalendarMenuColor] = useState("#c2c2c2");
  const [galleryMenuColor, setGalleryMenuColor] = useState("#c2c2c2");
  const [voiceMenuColor, setVoiceMenuColor] = useState("#c2c2c2");
  const [newfamilyId, setnewfamilyId] = useState("familyId");

  const handleHomeMenuColor = () => {
    localStorage.setItem("homeMenuColor", "#6371F7");
    localStorage.setItem("missionMenuColor", "#c2c2c2");
    localStorage.setItem("calendarMenuColor", "#c2c2c2");
    localStorage.setItem("galleryMenuColor", "#c2c2c2");
    localStorage.setItem("voiceMenuColor", "#c2c2c2");
  };

  console.log(localStorage.getItem("homeMenuColor"));

  const handleMissionMenuColor = () => {
    localStorage.setItem("homeMenuColor", "#c2c2c2");
    localStorage.setItem("missionMenuColor", "#6371F7");
    localStorage.setItem("calendarMenuColor", "#c2c2c2");
    localStorage.setItem("galleryMenuColor", "#c2c2c2");
    localStorage.setItem("voiceMenuColor", "#c2c2c2");
  };

  const handleCalendarMenuColor = () => {
    localStorage.setItem("homeMenuColor", "#c2c2c2");
    localStorage.setItem("missionMenuColor", "#c2c2c2");
    localStorage.setItem("calendarMenuColor", "#6371F7");
    localStorage.setItem("galleryMenuColor", "#c2c2c2");
    localStorage.setItem("voiceMenuColor", "#c2c2c2");
  };

  const handleGalleryMenuColor = () => {
    localStorage.setItem("homeMenuColor", "#c2c2c2");
    localStorage.setItem("missionMenuColor", "#c2c2c2");
    localStorage.setItem("calendarMenuColor", "#c2c2c2");
    localStorage.setItem("galleryMenuColor", "#6371F7");
    localStorage.setItem("voiceMenuColor", "#c2c2c2");
  };

  const handleVoiceMenuColor = () => {
    localStorage.setItem("homeMenuColor", "#c2c2c2");
    localStorage.setItem("missionMenuColor", "#c2c2c2");
    localStorage.setItem("calendarMenuColor", "#c2c2c2");
    localStorage.setItem("galleryMenuColor", "#c2c2c2");
    localStorage.setItem("voiceMenuColor", "#6371F7");
  };

  return (
    <>
      <SidebarMenuWrap className="res-menuWrap">
        <MenuBox
          className="homeMenu"
          onClick={() => {
            history.replace(`/family/${NowFamilyId}`);
            handleHomeMenuColor();
          }}
          color={localStorage.getItem("homeMenuColor")}
        >
          <MdHome style={{ fontSize: "24px" }} />
          <Menus className="Sidebarmenus">홈</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/mission/`);
            handleMissionMenuColor();
          }}
          color={localStorage.getItem("missionMenuColor")}
        >
          <MdVerified style={{ fontSize: "24px" }} />
          <Menus className="Sidebarmenus"> 미션</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/calendar/`);
            handleCalendarMenuColor();
          }}
          color={localStorage.getItem("calendarMenuColor")}
        >
          <MdEvent style={{ fontSize: "24px" }} />
          <Menus className="Sidebarmenus">캘린더</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/gallery/`);
            handleGalleryMenuColor();
          }}
          color={localStorage.getItem("galleryMenuColor")}
        >
          <MdPhotoLibrary style={{ fontSize: "24px" }} />
          <Menus className="Sidebarmenus">갤러리</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/voiceMsg/`);
            handleVoiceMenuColor();
          }}
          color={localStorage.getItem("voiceMenuColor")}
        >
          <MdOutlineVoicemail style={{ fontSize: "24px" }} />
          <Menus className="Sidebarmenus">음성메시지</Menus>
        </MenuBox>
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

export default SidebarMenu;
