/**
 * 
 * Load CSS file
 * Save: step {n}
 */
const loadCSSfiles = (pen) => {
  const n = pen.steps.length + 1;
  return fetch(`pens/${pen.name}/${n}.css`)
    .then(r => r.text())
    .then((css) => {
      pen.steps[n - 1] = css;
      return pen
    })
}

export default loadCSSfiles;
