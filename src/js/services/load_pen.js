/**
 * 
 * Load app info and
 * return frst pen json
 */
const loadPen = () => {
  return fetch('pens/info.json')
    .then(r => r.text())
    .then((text) => {
      return {'name': JSON.parse(text).pens[0]}
    })
};

export default loadPen;
