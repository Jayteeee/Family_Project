import React from "react";

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

  return (
    <>
      <SidebarMenuWrap className="res-menuWrap">
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.replace(`/family/${NowFamilyId}`);
          }}
        >
          <MdHome style={{ fontSize: "24px" }} />
          <Menus className="res-menus">홈</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/mission/`);
          }}
        >
          <MdVerified style={{ fontSize: "24px" }} />
          <Menus className="res-menus"> 미션</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/calendar/`);
          }}
        >
          <MdEvent style={{ fontSize: "24px" }} />
          <Menus className="res-menus">캘린더</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/gallery/`);
          }}
        >
          <MdPhotoLibrary style={{ fontSize: "24px" }} />
          <Menus className="res-menus">갤러리</Menus>
        </MenuBox>
        <MenuBox
          className="res-menuBox"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/voiceMsg/`);
          }}
        >
          <MdOutlineVoicemail style={{ fontSize: "24px" }} />
          <Menus className="res-menus">음성메세지</Menus>
        </MenuBox>
      </SidebarMenuWrap>
    </>
  );
};

const SidebarMenuWrap = styled.div`
  height: 60vh;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 20px 40px;
  font-size: 20px;
  font-weight: 500;
  color: #8f8f8f;
  cursor: pointer;
  &:hover {
    background: #d6d6d6;
  }
`;

const Menus = styled.span`
  margin-left: 10px;
`;

export default SidebarMenu;
