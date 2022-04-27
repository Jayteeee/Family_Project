import React, { useEffect, useState } from "react";

// 라우터
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

// 페이지 및 컴포넌트
import Header from "../components/Header";
import FamilyPage from "./FamilyPage";
import Mission from "../components/Mission";

const Main = (props) => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/family/:familyId" exact component={FamilyPage} />
        <Route path="/family/:familyId/mission/" exact component={Mission} />
      </Switch>
    </>
  );
};

export default Main;
