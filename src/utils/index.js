/* global window, navigator */

export const isTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.MaxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

export const getTeaserPath = slug => `/assets/img/teasers/${slug}.png`;

export const getProjectImagePath = (slug, idx) =>
  `/assets/img/${slug}/${slug}-${idx}.jpg`;
