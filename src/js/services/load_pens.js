const loadPens = (infoPath) => {
  return fetch(infoPath)
    .then(r => r.text())
    .then(text => JSON.parse(text).pens)
};

// Equivalent ------------------
// const loadPens = infoPath => fetch(infoPath)
//   .then(r => r.text())
//   .then(text => JSON.parse(text).pens);

export default loadPens;
