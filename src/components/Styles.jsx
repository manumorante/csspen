import React from 'react'

export default function Styles({ pen, step }) {
  let css = ''
  try {
    css = pen.pen_steps[step].code
  } catch (error) {}

  return (
    <style type='text/css' dangerouslySetInnerHTML={{ __html: css }}></style>
  )
}
