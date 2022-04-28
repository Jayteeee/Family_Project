import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

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

  // div로 만든 Dropdown
  const [currentValue, setCurrentValue] = useState("가족");
  const [showOptions, setShowOptions] = useState(false);

  console.log(showOptions);
  const handleOnChangeSelectValue = (e) => {
    // 선택한 value값
    setCurrentValue(e.target.getAttribute("value"));
    // 선택한 id값
    const familyId = e.target.getAttribute("id");
    history.push(`/family/${familyId}`);
  };

  return (
    <>
      <Header />
      <MainWrap className="res-mainWrap">
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <FamilySelectBox className="res-selectBox">
            <SelectBox
              onClick={() => setShowOptions((prev) => !prev)}
              className="res-select"
            >
              <Label>{currentValue}</Label>
              <SelectOptions show={showOptions} id="optionList">
                {familyList.map((f, i) => {
                  return (
                    <Option
                      key={f.familyId}
                      id={f.familyId}
                      value={f.familyTitle}
                      onClick={handleOnChangeSelectValue}
                    >
                      {f.familyTitle}
                    </Option>
                  );
                })}
              </SelectOptions>
            </SelectBox>
          </FamilySelectBox>
          <Sidebar className="res-sidbar">
            <SidebarMenu
              NowFamilyId={NowFamilyId}
              NowMissionId={NowMissionId}
              NowEventId={NowEventId}
              NowPhotoAlbumId={NowPhotoAlbumId}
              NowVoiceAlbumId={NowVoiceAlbumId}
            />
          </Sidebar>
        </div>
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

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  border: 1px solid #d6d6d6;
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    left: 10px;
    color: gray;
    font-size: 20px;
    // text-align: center;
  }
`;
const Label = styled.label`
  font-size: 15px;
  text-align: center;
`;
const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 50px;
  left: 0;
  width: 100%;
  overflow: hidden;
  // height: 100%;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  height: 100%;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

const Sidebar = styled.nav`
  width: 200px;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  vertical-align: top;
  border-right: 1px solid rgba(29, 28, 29, 0.13);
`;

const FamilySelectBox = styled.div`
  padding: 50px 20px 10px 20px;
  border-right: 1px solid rgba(29, 28, 29, 0.13);
`;

const PageWrap = styled.div`
  flex: 1;
`;

export default Main;