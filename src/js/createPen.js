  /**
   *
   * @param {string} newID - ID of the pen to load
   * @param {array} pens - List of pens
   * @returns {object} - Pen object
   */
   export default function createPen (newID, pens) {
    const newPen = pens.find(item => item.id === newID)

    if(!newPen) {
      console.log('createPen() - Pent not found')
      return false
    }

    const { id, name, info, html, bg, steps } = newPen

    return { id, name, info, html, bg, steps }
  }
