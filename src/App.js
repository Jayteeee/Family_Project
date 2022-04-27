import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { history } from "./redux/configureStore";
import "./App.css";
import { Main } from "./pages";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" axact component={Main} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
