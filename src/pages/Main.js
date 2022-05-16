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
  HomePage,
  MissionPage,
  CalendarPage,
  GalleryPage,
  PhotoListPage,
  VoiceMsgPage,
  VoiceListPage,
  DetailPhotoPage,
} from "./index";

// import FirstPage from "./FirstPage";

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

  const { user } = useSelector((state) => state?.user?.user);
  console.log("메인유저정보: ", user);

  // familyId 변경될때마다 리랜더링
  useEffect(() => {
    dispatch(familyActions.getFamilyDB());
  }, [familyId]);

  // div로 만든 Dropdown
  const [currentValue, setCurrentValue] = useState(NowFamilyTitle);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    setShowOptions(showOptions);
    // 선택한 value값
    setCurrentValue(e.target.getAttribute("value"));
    // 선택한 id값
    const familyId = e.target.getAttribute("id");
    history.push(`/family/${familyId}`);
  };

  const onClose = () => {
    setShowOptions(false);
  };

  return (
    <>
      {/* <MainContext.Provider value={NowFamily}>
        <Header bg={bg} />
      </MainContext.Provider> */}
      <MainWrap
        className="res-mainWrap"
        onClick={(e) => {
          onClose();
          e.stopPropagation();
        }}
      >
        <MainContext.Provider value={NowFamily}>
          <Header bg={bg} user={user} />
        </MainContext.Provider>
        <ContentWrap>
          <SidbarWrap className="res-selectWrap">
            <SelectBox
              onClick={(e) => {
                setShowOptions((prev) => !prev);
                e.stopPropagation();
              }}
              className="res-selectBox"
            >
              {/* 가족 타이틀 수정시 label에 바로 적용 안되는 문제 있음 */}
              <Label className="res-label">
                {currentValue
                  ? currentValue
                  : NowFamilyTitle
                  ? NowFamilyTitle
                  : "Family Title"}
                <TiArrowSortedDown
                // style={{
                //   margin: "0 15px",
                //   textAlign: "center",
                //   fontSize: "16px",
                // }}
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
            <SidebarLeft className="res-sidbar">
              <SidebarMenu NowFamilyId={NowFamilyId} />
            </SidebarLeft>
          </SidbarWrap>
          <PageWrap>
            <Switch>
              {/* <Route path="/family" exact component={FirstPage} /> */}
              <Route path="/family/:familyId/" exact component={HomePage} />
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
          <SidebarBottom className="res-sidbar">
            <SidebarMenu NowFamilyId={NowFamilyId} />
          </SidebarBottom>
        </ContentWrap>
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
  height: 100%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
    font-size: 15px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    flex-direction: column !important;
    font-size: 15px !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
    font-size: 15px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    flex-direction: column !important;
    font-size: 15px !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const SidbarWrap = styled.div`
  /* border: none;
  overflow-y: hidden; */
  /* flex-basis: 160px; */
  flex-grow: 0;
  flex-shrink: 0;
  /* background-color: #f0f0ff; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* display: none; */
    /* padding: 0 !important;
    border-radius: 0 !important;
    margin: 0 !important; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const SidebarLeft = styled.nav`
  width: 220px;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  vertical-align: top;
  border: none;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 839px) {
    display: none;
    /* width: 100% !important;
    height: 80px !important;
    bottom: 0px !important;
    border-radius: 0px !important;
    position: absolute !important;
    display: flex !important; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  align-self: center;
  border: none;
  text-align: left;
  cursor: pointer;
  svg {
    margin-left: 10px;
  }
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    cursor: pointer !important;
    width: 100% !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    cursor: pointer !important;
    width: 100% !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    svg {
      margin-left: 5px;
    }
  }
`;

const Label = styled.div`
  display: flex;
  /* font-size: 24px; */
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
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    font-size: 20px !important;
    padding: 10px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    font-size: 20px !important;
    padding: 10px !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 15px !important;
    padding: 10px !important;
  }
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
  overflow-y: scroll;
  z-index: 30000;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    top: 44px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    top: 44px !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    top: 37px !important;
  }
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px;
  height: 100%;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #d6d6d6;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    text-align: center;
    font-size: 20px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    text-align: center;
    font-size: 20px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 15px;
  }
`;

const PageWrap = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #f0f0ff;
  overflow-y: scroll;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: calc(94.1vh - 100px);
    text-align: center;
    font-size: 20px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    height: calc(94.1vh - 98px);
    text-align: center;
    font-size: 20px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: calc(100vh - 142px);
    text-align: center;
    font-size: 20px;
    font-size: 15px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    height: calc(100vh - 125px);
    text-align: center;
    font-size: 20px;
    font-size: 15px;
  }
  @media screen and (max-width: 360px) {
    height: calc(100vh - 130px);
    text-align: center;
    font-size: 20px;
    font-size: 15px;
  }
  @media screen and (max-width: 320px) {
    height: calc(100vh - 124px);
    text-align: center;
    font-size: 20px;
    font-size: 15px;
  }
`;

const SidebarBottom = styled.nav`
  width: 100%;
  max-height: 7vh;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  border: none;
  /* background-color: gray; */
  display: none;
  /* justify-content: end;
  align-items: flex-end; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    display: inline-flex;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    display: inline-flex;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  /* // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    max-height: 6vh;
  }
  @media screen and (max-width: 360px) {
    max-height: 7vh;
  }
  @media screen and (max-width: 320px) {
    max-height: 7vh;
  } */
`;

export default Main;
