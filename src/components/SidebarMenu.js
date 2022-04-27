import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

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
      <SidebarMenuWrap>
        <Menu
          onClick={() => {
            history.replace(`/family/${NowFamilyId}`);
          }}
        >
          <span>홈</span>
        </Menu>
        <Menu
          onClick={() => {
            history.push(`/family/${NowFamilyId}/mission/${NowMissionId}`);
          }}
        >
          <span>미션</span>
        </Menu>
        <Menu
          onClick={() => {
            history.push(`/family/${NowFamilyId}/calendar/${NowEventId}`);
          }}
        >
          <span>캘린더</span>
        </Menu>
        <Menu
          onClick={() => {
            history.push(`/family/${NowFamilyId}/gallery/${NowPhotoAlbumId}`);
          }}
        >
          <span>갤러리</span>
        </Menu>
        <Menu
          onClick={() => {
            history.push(`/family/${NowFamilyId}/voiceMsg/${NowVoiceAlbumId}`);
          }}
        >
          <span>음성메세지</span>
        </Menu>
      </SidebarMenuWrap>
    </>
  );
};

const SidebarMenuWrap = styled.div`
  height: calc(100vh - 38px);
  overflow-y: auto;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 5px 15px;
  cursor: pointer;
  &:hover {
    background: #d6d6d6;
  }
`;

export default SidebarMenu;
