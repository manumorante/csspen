/**
 * 
 * Load pen info
 * Save: 'title' and 'steps'
 */
const loadPenInfo = (paramPen) => {
  return fetch(`pens/${paramPen.name}/info.json`)
    .then(r => r.text())
    .then((text) => {
      let pen = JSON.parse(text);
      return {
        'name': paramPen.name,
        'title': pen.title,
        'steps': [],
        'total_steps': pen.steps.length,
        'steps_descriptions': pen.steps
      }
    })
}

export default loadPenInfo;
