export class PenEntity {
  static create({ id, name, info, html, bg, steps }) {
    return new PenEntity({
      id, name, info, html, bg, steps
    })
  }

  constructor({ id, name, info, html, bg, steps }) {
    super()
    this._id = id
    this._name = name
    this._info = info
    this._html = html
    this._bg = bg
    this._steps = steps
  }

  id()    { return this._id }
  name()  { return this._name }
  info()  { return this._info }
  html()  { return this._html }
  bg()    { return this._bg }
  steps() { return this._steps }

  toJSON() {
    return {
      id:    this.id(),
      name:  this.name(),
      info:  this.info(),
      html:  this.html(),
      bg:    this.bg(),
      steps: this.steps(),
    }
  }
}
