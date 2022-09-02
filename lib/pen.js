export const selectPen = (pens, penID) => {
  const pen = pens.find((item) => item.id === penID)
  return pen || pens[0]
}

export const checkPen = (pen) => {
  if (!pen) return false

  // Check if hast a steps array with steps
  if (!pen.steps || !pen.steps.length) return false

  // Check if all steps have css
  for (let i = 0; i < pen.steps.length; i++) {
    if (!pen.steps[i].css) return false
    if (pen.steps[i].css === '') return false
  }

  // Check if pen has colors
  if (!pen.colors || !pen.colors.c1 || !pen.colors.c2 || !pen.colors.c3) return false

  return true
}

export const voPen = (state) => {
  const initiaPenVO = {
    name: '',
    html: '',
    css: '',
    info: '',
    color2: '',
    color3: '',
    firstStep: true,
    lastStep: false,
  }

  const penVO = !state?.loaded
    ? initiaPenVO
    : {
        name: state.pen.name,
        html: state.pen.html,
        css: state.pen.steps[state.step].css,
        stepInfo: state.pen.steps[state.step].info,
        color2: state?.pen?.colors?.c2,
        color3: state?.pen?.colors?.c3,
        firstStep: state.step === 0,
        lastStep: state.step === state.pen?.steps?.length - 1,
      }

  return penVO
}
