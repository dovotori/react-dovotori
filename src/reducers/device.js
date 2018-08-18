import { DEVICE_IS_TOUCH } from "../constants/actionsTypes";

const initialState = {
  isTouch: false
};

export default function device(state = initialState, action) {
  switch (action.type) {
    case DEVICE_IS_TOUCH:
      return {
        ...state,
        isTouch: action.flag
      };
    default:
      return state;
  }
}
