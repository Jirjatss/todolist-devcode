import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import activityReducer from "./activityReducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  activity: activityReducer,
});

export default rootReducer;
