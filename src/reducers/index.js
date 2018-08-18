import { combineReducers } from "redux";
import device from "./device";
import ui from "./ui";
import initialState from "../store/initialState";

function content(state = initialState, action) {
  return state;
}

export default combineReducers({
  content,
  device,
  ui
});
