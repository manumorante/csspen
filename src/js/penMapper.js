export function penMapper({ pen, steps }) {
  // Objects validation
  if (!pen) {
    console.error(`penMapper() pen(${pen})`)
    return false
  }

  if (!steps) {
    console.error(`penMapper() steps(${steps})`)
    return false
  }

  if (steps.length <= 0) {
    console.error(`penMapper() steps.length(${steps.length})`)
    return false
  }

  // Props validations and mapping
  function id() {
    if (!pen.id) {
      console.error(`penMapper() id(${pen.id}`)
      return false
    }
    return pen.id
  }

  function name() {
    if (!pen.name) {
      console.error(`penMapper() name(${pen.name}`)
      return false
    }

    return pen.name
  }

  function info() {
    if (!pen.info) {
      return 'Step 1'
    }

    return pen.info
  }

  function step() {
    return 1
  }

  function totalSteps() {
    if (!pen.total_steps) {
      console.error(`penMapper() totalSteps(${pen.total_steps}`)
      return false
    }

    return pen.total_steps
  }

  function html() {
    if (!pen.html) {
      console.error(`penMapper() html(${pen.html}`)
      return false
    }

    return pen.html
  }

  function bg() {
    if (!pen.bg) {
      return '#000'
    }

    return pen.bg
  }

  function zoom() {
    if (!pen.zoom) {
      return 1
    }

    return pen.zoom
  }

  return {
    id: id(),
    name: name(),
    info: info(),
    step: step(),
    totalSteps: totalSteps(),
    steps: steps,
    html: html(),
    bg: bg(),
    zoom: zoom(),
  }
}
