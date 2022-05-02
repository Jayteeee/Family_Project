import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import { RactangleImage } from "../elements/index";

const SidebarMenu = (familyId) => {
  const { NowFamilyId } = familyId;
  console.log("사이드바에 적용할 Id값: ", NowFamilyId);

  return (
    <>
      <SidebarMenuWrap className="res-menuWrap">
        <Menu
          className="res-menu"
          onClick={() => {
            history.replace(`/family/${NowFamilyId}`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span>홈</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/mission/`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span> 미션</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/calendar/`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span>캘린더</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/gallery/`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span>갤러리</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/voiceMsg/`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span>음성메세지</span>
        </Menu>
      </SidebarMenuWrap>
    </>
  );
};

const SidebarMenuWrap = styled.div`
  height: calc(82vh - 10px);
  overflow-y: auto;
  margin-top: 10px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 15px;
  cursor: pointer;
  justify-item: center;
  // justify-content: center;
  &:hover {
    background: #d6d6d6;
  }
`;

export default SidebarMenu;
