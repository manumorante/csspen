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
