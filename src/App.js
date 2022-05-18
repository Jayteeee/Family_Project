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

  // useEffect(() => {
  // setSocket(
  //   io.connect(`http://52.79.130.222`, {
  //     cors: { origin: "http://52.79.130.222" },
  //   })
  // );
  // dispatch(
  // socketActions.getSocketDB(
  // io.connect(`http://52.79.130.222`, {
  //   cors: { origin: "http://52.79.130.222" },
  // })
  // socket
  // )
  // );
  // }, []);

  // let socket = io.connect(ENDPOINT, {
  //   transports: ["websocket"],
  //   forceNew: true,
  // });

  const ENDPOINT = "http://52.79.130.222";
  const user = useSelector((state) => state?.user?.user?.user?.userId);

  // const [user, setUser] = useState("");
  const [socket, setSocket] = useState(
    io.connect(ENDPOINT, {
      transports: ["websocket"],
      forceNew: true,
    })
  );

  console.log("소켓연결, ", socket);

  useEffect(() => {
    dispatch(socketActions.getSocketDB(socket));
  }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", user);
  //   socket?.emit("join", "hi");
  // }, [socket, user]);

  // useEffect(() => {
  //   socket?.on("getNotification", (data) => {
  //     dispatch(socketActions.setSocketDB(data));
  //   });
  // }, [socket]);

  useEffect(() => {
    if (token) {
      socket?.emit("newUser", user);
      socket?.emit("join", "hi");
      socket?.on("getNotification", (data) => {
        dispatch(socketActions.setSocketDB(data));
      });
    }
  }, [socket, user]);

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
