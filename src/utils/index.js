/* global window, navigator */

export const isTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;
