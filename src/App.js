import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/modules/user";
import { getToken } from "./shared/Token";
import Main from "./pages/Main";
import KakaoRedirectHandler from "./shared/kakao/KakaoRedirectHandeler";

function App() {
  const dispatch = useDispatch();
  let token = getToken();
  useEffect(() => {
    if (token) {
      dispatch(userActions.getUserInfo(token));
    }
  }, []);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/family/:familyId" component={Main} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/client/callback" component={KakaoRedirectHandler} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}
export default App;
