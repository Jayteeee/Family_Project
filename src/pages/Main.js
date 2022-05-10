import React, { createContext, useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

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
  // FirstPage,
  FamilyPage,
  MissionPage,
  CalendarPage,
  GalleryPage,
  PhotoListPage,
  VoiceMsgPage,
  VoiceListPage,
  DetailPhotoPage,
} from "./index";

// 컴포넌트
import SidebarMenu from "../components/SidebarMenu";
import Header from "../components/Header";

export const MainContext = createContext();

const Main = (props) => {
  const bg = "black";

  const dispatch = useDispatch();

  const familyId = props.match?.params.familyId;

  // familList
  const familyList = useSelector((state) => state.family.familyList);
  console.log("전체 familyList: ", familyList);

  const NowFamily = familyList.filter((f) => f.familyId == familyId);
  console.log("현재 가족 ", NowFamily);

  // 현재 가족 familyId
  const NowFamilyId = NowFamily[0]?.familyId;
  console.log("현재 familyId: ", NowFamilyId);

  const NowFamilyTitle = NowFamily[0]?.familyTitle;
  console.log("현재 familyTitle: ", NowFamilyTitle);

  // familyId 변경될때마다 리랜더링
  useEffect(() => {
    dispatch(familyActions.getFamilyDB());
  }, [familyId]);

  // div로 만든 Dropdown
  const [currentValue, setCurrentValue] = useState(NowFamilyTitle);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    // 선택한 value값
    setCurrentValue(e.target.getAttribute("value"));
    // 선택한 id값
    const familyId = e.target.getAttribute("id");
    history.push(`/family/${familyId}`);
  };

  return (
    <>
      {/* <MainContext.Provider value={NowFamily}>
        <Header bg={bg} />
      </MainContext.Provider> */}
      <MainWrap className="res-mainWrap">
        <MainContext.Provider value={NowFamily}>
          <Header bg={bg} />
        </MainContext.Provider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <SidbarWrap className="res-selectWrap">
            <SelectBox
              onClick={() => setShowOptions((prev) => !prev)}
              className="res-selectBox"
            >
              {/* 가족 타이틀 수정시 label에 바로 적용 안되는 문제 있음 */}
              <Label className="res-label">
                {currentValue ? currentValue : "Family title"}
                <TiArrowSortedDown
                  style={{
                    margin: "0 15px",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                />
              </Label>
              <SelectOptions
                className="res-selectOptions"
                show={showOptions}
                id="optionList"
              >
                <div style={{ padding: "10px" }}>
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
                </div>
              </SelectOptions>
            </SelectBox>
            <Sidebar className="res-sidbar">
              <SidebarMenu NowFamilyId={NowFamilyId} />
            </Sidebar>
          </SidbarWrap>
          <PageWrap>
            <Switch>
              {/* <Route path="/family" exact component={FirstPage} /> */}
              <Route path="/family/:familyId/" exact component={FamilyPage} />
              <Route
                path="/family/:familyId/mission"
                exact
                component={MissionPage}
              />
              <Route
                path="/family/:familyId/calendar"
                exact
                component={CalendarPage}
              />
              <Route
                path="/family/:familyId/gallery"
                exact
                component={GalleryPage}
              />
              <Route
                path="/family/:familyId/gallery/:photoAlbumName/:photoAlbumId"
                exact
                component={PhotoListPage}
              />
              <Route
                path="/family/:familyId/gallery/:photoAlbumName/:photoAlbumId/:photoId"
                exact
                component={DetailPhotoPage}
              />
              <Route
                path="/family/:familyId/voiceMsg"
                exact
                component={VoiceMsgPage}
              />
              <Route
                path="/family/:familyId/voiceMsg/:voiceAlbumId"
                exact
                component={VoiceListPage}
              />
            </Switch>
          </PageWrap>
        </div>
      </MainWrap>
    </>
  );
};

const MainWrap = styled.div`
  /* display: flex; */
  /* height: calc(100vh - 44px); */
  /* color: #282828;
  background: #f9f9ff; */
  max-width: 100%;
  /* padding: 20px; */
  display: flex;
  /* flex-wrap: nowrap; */
  /* gap: 1em; */
  flex-direction: column !important;
`;

const SidbarWrap = styled.div`
  /* border: none;
  overflow-y: hidden; */
  /* flex-basis: 160px; */
  flex-grow: 0;
  flex-shrink: 0;
  /* background-color: #f0f0ff; */
  @media only screen and (max-width: 839px) {
    display: none;
  }
`;

const Sidebar = styled.nav`
  width: 296px;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  vertical-align: top;
  border: none;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  align-self: center;
  border: none;
  text-align: left;
  cursor: pointer;
`;

const Label = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  justify-content: center;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #d6d6d6;
  }
  padding: 40px 40px 40px 10px;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  text-align: left;
  top: 80px;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  background-color: #222222;
  color: #fefefe;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px;
  height: 100%;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #d6d6d6;
  }
`;

const PageWrap = styled.div`
  /* flex: 1;
  height: calc(100vh - 44px); */

  /* flex-basis: 680px; */
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #f0f0ff;
`;

export default Main;
