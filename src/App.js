import "./App.css";
import React, { useEffect } from "react";

// 라우터
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// 리덕스
import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/modules/user";

// 페이지
import { Main, Login, Signup } from "./pages/index";

// 토근
import { getToken } from "./shared/Token";

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
        </Switch>
      </ConnectedRouter>
    </div>
  );
}
export default App;
