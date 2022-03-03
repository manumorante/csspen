export default function mapPen(pen) {
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
    if (!pen.steps) {
      console.error('Error: steps', pen.steps)
      return false
    }

    return pen.steps
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
    html: html(),
    bg: bg(),
    zoom: zoom(),
  }
}
