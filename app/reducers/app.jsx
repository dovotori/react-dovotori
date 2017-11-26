// import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
import { entities } from '../actions';

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case entities.DETECT_TOUCH:
      return [
        ...state,
        {
          device: { isTouch: action.flag },
        },
      ];
    default:
      return state;
  }
}
