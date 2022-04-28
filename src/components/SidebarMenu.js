import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import { RactangleImage } from "../elements/index";

const SidebarMenu = (props) => {
  const {
    NowFamilyId,
    NowMissionId,
    NowEventId,
    NowPhotoAlbumId,
    NowVoiceAlbumId,
  } = props;
  console.log(props);

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
            history.push(`/family/${NowFamilyId}/mission/${NowMissionId}`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span> 미션</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/calendar/${NowEventId}`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span>캘린더</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/gallery/${NowPhotoAlbumId}`);
          }}
        >
          <RactangleImage XS className="res-menuIcon" />
          <span>갤러리</span>
        </Menu>
        <Menu
          className="res-menu"
          onClick={() => {
            history.push(`/family/${NowFamilyId}/voiceMsg/${NowVoiceAlbumId}`);
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
  // justify-content: center;
  justify-item: center;
  &:hover {
    background: #d6d6d6;
  }
`;

export default SidebarMenu;
