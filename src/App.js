import "./App.css";
import React, { useEffect, useState } from "react";

// 라우터
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// 소켓
import { io, Socket } from "socket.io-client";

// 리덕스
import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/modules/user";

// 페이지
import { Main, LandingPage, Auth } from "./pages/index";

// 토큰
import { getToken } from "./shared/Token";

function App() {
  const dispatch = useDispatch();
  let token = getToken();

  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  console.log(socket);

  useEffect(() => {
    if (token) {
      dispatch(userActions.getUserInfo(token));
    }
  }, []);

  useEffect(() => {
    setSocket(
      io.connect(`http://52.79.130.222`, {
        cors: { origin: "http://52.79.130.222" },
      })
    );
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  // useEffect(() => {
  //   socket?.on("news", (data) => {
  //     console.log(data);
  //   });
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
