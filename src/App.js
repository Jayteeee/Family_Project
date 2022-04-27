import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/modules/user";
import { getToken } from "./shared/token";

function App() {
  const dispatch = useDispatch();
  let token = getToken();
  React.useEffect(() => {
    if (token) {
      dispatch(userActions.getUserInfo(token));
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </ConnectedRouter>
  );
}
export default App;
