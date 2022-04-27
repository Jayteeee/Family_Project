import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
// import Select from "react-select";
import styled from "styled-components";

// 라우터
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyActions } from "../redux/modules/family";
import { history } from "../redux/configureStore";

// 페이지 및 컴포넌트
import SidebarMenu from "../components/SidebarMenu";
import Mission from "../components/Mission";

const FamilyPage = (props) => {
  // familyId를 params로 받아와서 sidebarMenu로 넘겨줌
  const familyId = props.match?.params.familyId;
  console.log(familyId);

  const dispatch = useDispatch();

  // familList
  const family = useSelector((state) => state.family.familyList);
  console.log(family);

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
      <MainWrap>
        <Sidebar className="res-none">
          <FamilySelect name="가족" id="selectBox" onChange={seletOption}>
            <option value="default">가족</option>
            {family.map((f, i) => {
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
          <SidebarMenu familyId={familyId} />
        </Sidebar>
        {/* 미션 페이지 뷰 안보임 */}
        <PageWrap>
          <Switch>
            <Route
              path="/family/:familyId/mission/"
              exact
              component={Mission}
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

export default FamilyPage;
