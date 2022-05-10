import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import image from "./modules/image";
import Family from "./modules/family";
import Mission from "./modules/mission";
import Calendar from "./modules/calendar";
import Gallery from "./modules/gallery";
import Detailphoto from "./modules/detailphoto";
import FamilyMember from "./modules/familymember";
import Voice from "./modules/voice";

export const history = createBrowserHistory();

// 리듀서 router 안에 history 넣기
const rootReducer = combineReducers({
  user: User,
  Image: image,
  family: Family,
  mission: Mission,
  calendar: Calendar,
  gallery: Gallery,
  detailPhoto: Detailphoto,
  familymember: FamilyMember,
  voice: Voice,

  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];

// 개발 환경일때, redux-logger 사용할 수 있게하기
const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
