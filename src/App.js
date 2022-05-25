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

  // // 소켓
  const ENDPOINT = "https://doremilan.shop/";
  const userId = useSelector((state) => state?.user?.user?.user?.userId);

  const socket = io.connect(ENDPOINT, {
    transports: ["websocket"],
    // forceNew: true,
  });

  useEffect(() => {
    dispatch(socketActions.getSocketDB(socket));
  }, []);

  useEffect(() => {
    if (token) {
      socket?.emit("newUser", { userId: userId });
      socket?.emit("join", userId);
      // socket.on("connect", () => {
      //   if (socket.disconnected) {
      //     socket.emit("imOut", { userId: userId });
      //   }
      // });
    }
  }, [socket, userId]);

  useEffect(() => {
    if (token) {
      socket?.emit("getPhotoAlert", { receiverId: userId });
      socket?.on("getNotification", (data) => {
        dispatch(socketActions.setNotiDB(data));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (token) {
      socket?.emit("getMyAlert", { userId: userId, type: "초대" });
      socket?.on("newInviteDB", (data) => {
        dispatch(socketActions.setAlertDB(data));
        return;
      });
    }
  }, [socket]);

  // 가족 모두에게 가는 알림 받는 부분, 아직 구현 전
  // useEffect(() => {
  //   if (token) {
  //     socket?.emit("getFamilyNoti", { userId: userId });
  //     socket?.on("notiReturn", (data) => {
  //       console.log("notiReturn, ", data);
  //       dispatch(socketActions.setFamilyNotiDB(data));
  //     });
  //   }
  // }, [socket]);

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
