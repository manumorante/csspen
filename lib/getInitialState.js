export default function getInitialState(pens, penID) {
  const pen = pens.find((p) => p.id === penID)
  const isMobile = false

  return {
    pens: pens, // List of Pens (complete, with all data).
    pen: pen, // Current Pen (all data).
    autoplay: true, // On/off autoplay at load Pen.
    playing: false,
    step: 0, // Current step.
    writing: false, // When editing CSS or Info step. Disable key controls etc.
    menuClosed: isMobile,
    creator: false, // Mode creator.
    isMobile: isMobile,
    loaded: true, // Pens list and current pen are ready to use.
  }
}
