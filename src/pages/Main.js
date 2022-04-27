import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
// import Select from "react-select";

// 라우터
import { Route, Switch } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../redux/modules/family";
import { history } from "../redux/configureStore";

// 페이지
import {
  FamilyPage,
  MissionPage,
  CalendarPage,
  GalleryPage,
  VoiceMsgPage,
} from "./index";

// 컴포넌트
import SidebarMenu from "../components/SidebarMenu";
import Header from "../components/Header";

const Main = (props) => {
  const dispatch = useDispatch();

  console.log(props);

  const familyId = props.match?.params.familyId;
  console.log(familyId);

  // familList
  const familyList = useSelector((state) => state.family.familyList);
  console.log(familyList);

  const NowFamilyList = familyList.filter((f) => f.familyId == familyId);
  console.log(NowFamilyList);

  // 현재 가족 family, mission, calendar(event), photoAlbum, voiceAlbum 아이디 목록
  // 가족 생성할 시 사이드바 있어야 함
  const NowFamilyId = NowFamilyList[0]?.familyId;
  console.log(NowFamilyId);

  const NowMissionId = NowFamilyList[0]?.sidebar[0].mission[0].missionId;
  console.log(NowMissionId);

  const NowEventId =
    NowFamilyList[0]?.sidebar[0].calendarList[0].eventList[0].eventId;
  console.log(NowEventId);

  const NowPhotoAlbumId =
    NowFamilyList[0]?.sidebar[0].photoAlbumList[0].photoAlbumId;
  console.log(NowPhotoAlbumId);

  const NowVoiceAlbumId =
    NowFamilyList[0]?.sidebar[0].voiceAlbumList[0].voiceAlbumId;
  console.log(NowVoiceAlbumId);

  // familyId 변경될때마다 리랜더링
  useEffect(() => {
    dispatch(familyActions.getFamilyDB());
  }, [familyId]);

  // select 태그 가족페이지 이동
  const seletOption = () => {
    const selectBox = document.getElementById("selectBox");
    const familyId = selectBox.options[selectBox.selectedIndex].value;
    console.log(familyId); // option의 value 값
    console.log(selectBox);
    history.push(`/family/${familyId}`);
  };

  return (
    <>
      <Header />
      <MainWrap>
        <Sidebar className="res-none">
          <FamilySelect name="가족" id="selectBox" onChange={seletOption}>
            {/* <option value="default">가족</option> */}
            {familyList.map((f, i) => {
              return (
                <option key={f.familyId} value={f.familyId}>
                  {f.familyTitle}
                </option>
              );
            })}
          </FamilySelect>
          {/* // 리액트 select 라이브러리 구현중 */}
          {/* <Select
            placeholder="가족"
            id="selectBox"
            onChange={seletOption}
            options={family.map((f, i) => {
              return { value: `${f.familyId}`, label: `${f.familyTitle}` };
            })}
          /> */}
          <SidebarMenu
            NowFamilyId={NowFamilyId}
            NowMissionId={NowMissionId}
            NowEventId={NowEventId}
            NowPhotoAlbumId={NowPhotoAlbumId}
            NowVoiceAlbumId={NowVoiceAlbumId}
          />
        </Sidebar>
        <PageWrap>
          <Switch>
            <Route path="/family/:familyId/" exact component={FamilyPage} />
            <Route
              path="/family/:familyId/mission/:missionId"
              exact
              component={MissionPage}
            />
            <Route
              path="/family/:familyId/calendar/:eventId"
              exact
              component={CalendarPage}
            />
            <Route
              path="/family/:familyId/gallery/:photoAlbumId"
              exact
              component={GalleryPage}
            />
            <Route
              path="/family/:familyId/voiceMsg/:voiceAlbumId"
              exact
              component={VoiceMsgPage}
            />
          </Switch>
        </PageWrap>
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  display: flex;
  height: calc(100vh - 44px);
  color: #282828;
`;

const Sidebar = styled.nav`
  width: 200px;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  vertical-align: top;
  border-right: 1px solid #d6d6d6;
`;

const FamilySelect = styled.select`
  // width: 100%;
  // height: 49px;
  // text-align: left;
  // border: none;
  // border-bottom: 1px solid #d6d6d6;
  // font-weight: 500;
  // font-size: 18px;
  // background: transparent;
  // overflow: hidden;
  // padding: 0 54px 0 16px;
  // margin: 0;
  // cursor: pointer;
  color: black;
`;

const PageWrap = styled.div`
  flex: 1;
`;

export default Main;
