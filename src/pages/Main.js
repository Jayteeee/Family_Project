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

  const NowFamily = familyList.filter((f) => f.familyId == familyId);
  // 현재 가족 familyId
  const NowFamilyId = NowFamily[0]?.familyId;

  const NowFamilyTitle = NowFamily[0]?.familyTitle;

  const { user } = useSelector((state) => state?.user?.user);

  // familyId 변경될때마다 리랜더링
  useEffect(() => {
    dispatch(familyActions.getFamilyDB());
  }, [familyId]);

  const Kakao = window.Kakao;
  useEffect(() => {
    Kakao.init("4b621ae60c3e6f222daf7684e293818e");
  }, []);

  // 소켓 부분

  const socket = useSelector((state) => state.socket.socket);

  const handleSocket = (e) => {
    const familyId = e.target.getAttribute("id");
    socket?.emit("leaveRoom", { NowFamilyId });
    socket?.emit("movingRoom", { familyId });
  };

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

  // 사이드바 매뉴 색상
  const handleMenuColor = () => {
    sessionStorage.setItem("homeMenuColor", "colorChage");
    sessionStorage.removeItem("missionMenuColor");
    sessionStorage.removeItem("calendarMenuColor");
    sessionStorage.removeItem("galleryMenuColor");
    sessionStorage.removeItem("voiceMenuColor");
  };

  const onClose = () => {
    setShowOptions(false);
  };

  const Kakao = window.Kakao;

  useEffect(() => {
    Kakao.init("4b621ae60c3e6f222daf7684e293818e");
  }, []);

  return (
    <>
      <MainWrap
        className="res-mainWrap"
        onClick={(e) => {
          onClose();
          e.stopPropagation();
        }}
      >
        <MainContext.Provider value={NowFamily}>
          <Header
            bg={bg}
            user={user}
            familyId={familyId}
            // myFamilyMemberNickname={myFamilyMemberNickname}
          />
        </MainContext.Provider>
        <ContentWrap>
          <SidbarWrap className="res-selectWrap">
            <SelectBox
              onClick={(e) => {
                setShowOptions((prev) => !prev);
                e.stopPropagation();
              }}
              className="res-selectBox"
              on
            >
              {/* 가족 타이틀 수정시 label에 바로 적용 안되는 문제 있음 */}
              <Label className="res-label">
                {NowFamilyTitle ? NowFamilyTitle : "Family Title"}
                <TiArrowSortedDown />
              </Label>
              <SelectOptions
                className="res-selectOptions"
                show={showOptions}
                id="optionList"
                onClick={handleMenuColor}
              >
                <div style={{ padding: "10px" }}>
                  {familyList.map((f, i) => {
                    return (
                      <Option
                        key={f.familyId}
                        id={f.familyId}
                        value={f.familyTitle}
                        onClick={(e) => {
                          handleOnChangeSelectValue(e);
                          handleSocket(e);
                        }}
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
              <Route
                path="/family/:familyId/"
                exact
                component={HomePage}
                user={user}
              />
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
  max-width: 100%;
  display: flex;
  flex-direction: column !important;

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
  flex-grow: 0;
  flex-shrink: 0;

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
  font-size: 24px;
  font-weight: 600;
  width: 100%;

  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
  padding: 55px 55px 55px 20px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    border-bottom: 1px solid #dbdbdb;
    font-weight: 400;
    font-size: 20px !important;
    padding: 10px 0 10px 20px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    font-size: 20px !important;
    padding: 10px 0 10px 20px !important;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    font-size: 15px !important;
    padding: 10px 0 10px 15px !important;
  }
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  text-align: left;
  top: 100px;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  background-color: #fff;
  color: black;
  border-radius: 16px;
  overflow-y: scroll;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);
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
  padding: 10px;
  height: 100%;
  transition: background-color 0.2s ease-in;
  border-radius: 10px;
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
  background-color: #f5f6fe;
  overflow-y: scroll;
  width: 100%;

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
  max-height: 8.2vh;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  border-top: 1px solid #dbdbdb;
  background-color: #fff;
  display: none;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    display: inline-flex;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* display: inline-flex; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

export default Main;
