export const loadFile = (url, callback) => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('text/plain');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
