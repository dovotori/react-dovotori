import { UI_MENU_IS_OPENED } from "../constants/actionsTypes";

function setMenu(flag) {
  return { type: UI_MENU_IS_OPENED, flag };
}

export default {
  setMenu
};
