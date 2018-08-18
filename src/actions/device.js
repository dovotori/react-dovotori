import { DEVICE_IS_TOUCH } from "../constants/actionTypes";

function deviceIsTouch(flag) {
  return { type: DEVICE_IS_TOUCH, flag };
}

export default {
  deviceIsTouch
};
