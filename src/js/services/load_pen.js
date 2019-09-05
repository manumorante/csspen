/**
 *
 * Load app info and
 * return frst pen json
 */
const loadPen = (id = 0) => {
  return fetch('pens/info.json')
    .then(r => r.text())
    .then((text) => {
      return {'name': JSON.parse(text).pens[id]}
    })
};

export default loadPen;
