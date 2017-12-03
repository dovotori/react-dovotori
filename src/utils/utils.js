/* global window, navigator */

export const loadFile = (url, callback) => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('text/plain');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState === 4) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
};

export const isTouchDevice = () =>
  'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
