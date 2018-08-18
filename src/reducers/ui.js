// import initialState from "../store/initialState";
import { UI_MENU_IS_OPENED } from "../constants/actionsTypes";

const initialState = {
  menuIsOpened: false
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case UI_MENU_IS_OPENED:
      return {
        ...state,
        menuIsOpened: action.flag
      };
    default:
      return state;
  }
}
