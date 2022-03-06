export default function mapPen(pen, steps_data) {
  function id() {
    if (!pen.id) {
      console.error('Error: id', pen.id)
      return false
    }
    return pen.id
  }

  function slug() {
    if (!pen.slug) {
      console.error('Error: slug', pen.slug)
      return false
    }

    return pen.slug
  }

  function name() {
    if (!pen.name) {
      console.error('Error: name', pen.name)
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
      console.error('Error: totalSteps', pen.total_steps)
      return false
    }

    return pen.total_steps
  }

  function steps() {
    if(steps_data.length > 0) {
      return steps_data
    }

    if (pen.steps.length === 0) {
      console.error('Error: steps', pen.steps)
      return []
    }

    return pen.steps
  }

  function doneCode() {
    if (steps_data.length === 0) {
      return ''
    }

    return steps_data[steps_data.length - 1].code
  }

  function html() {
    if (!pen.html) {
      console.error('Error: html', pen.html)
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
    slug: slug(),
    name: name(),
    info: info(),
    step: step(),
    totalSteps: totalSteps(),
    steps: steps(),
    doneCode: doneCode(),
    html: html(),
    bg: bg(),
    zoom: zoom(),
  }
}
