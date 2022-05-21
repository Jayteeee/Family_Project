import "./App.css";
import React, { useEffect, useState } from "react";

// 라우터
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// 소켓
import { io } from "socket.io-client";

// 리덕스
import { history } from "./redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/modules/user";
import { socketActions } from "./redux/modules/socket";

// 페이지
import { Main, LandingPage, Auth } from "./pages/index";

// 토큰
import { getToken } from "./shared/Token";

function App() {
  const dispatch = useDispatch();
  let token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(userActions.getUserInfo(token));
    }
  }, []);

  // 소켓
  const ENDPOINT = "http://52.79.130.222/";
  const userId = useSelector((state) => state?.user?.user?.user?.userId);
  console.log(userId);

  const socket = io.connect(ENDPOINT, {
    transports: ["websocket"],
    forceNew: true,
  });

  console.log("소켓연결, ", socket);

  useEffect(() => {
    dispatch(socketActions.getSocketDB(socket));
  }, []);

  useEffect(() => {
    if (token) {
      socket?.emit("newUser", userId);
      socket?.emit("join", userId);
      console.log(userId);
    }
  }, [socket, userId]);

  useEffect(() => {
    if (token) {
      socket?.on("getNotification", (data) => {
        dispatch(socketActions.setSocketDB(data));
        console.log(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (token) {
      socket?.emit("getMyAlert", { userId: userId, type: "초대" });
      socket?.on("newInviteDB", (data) => {
        console.log("newInviteDB, ", data);
        dispatch(socketActions.setSocketDB(data));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (token) {
      socket?.emit("getFamilyNoti", { userId: userId });
      socket?.on("getFamilyNoti", (data) => {
        console.log("getFamilyNoti, ", data);
        dispatch(socketActions.setSocketDB(data));
      });
    }
  }, [socket]);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/family/:familyId" component={Main} />
          <Route path="/" exact component={LandingPage} />
          <Route path="/auth/kakao/callback" exact component={Auth} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}
export default App;
