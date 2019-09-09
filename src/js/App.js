import React from "react"
import { Code } from "./Code"
import loadPen from './services/load_pen'
import loadPenInfo from './services/load_pen_info'
import loadCSSfiles  from './services/load_css_files'

export class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      steps: [],
      current_step: 0
    }

    this.load(0)

    this.load = this.load.bind(this)
    this.change = this.change.bind(this)
    this.edit = this.edit.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.reset = this.reset.bind(this)
  }

  change(e) {
    let id = parseInt(e.target.value)

    // Set new id and reset current step
    this.setState({ id: id, current_step: 0 })
    this.load(id)
  }

  // Load pen
  load(id = 0) {

    // Load app info.json
    loadPen(id)
      // Load first pen info.json
      .then(loadPenInfo)
      // Load css files
      .then(loadCSSfiles) // TODO: We need use sync/await
      .then(loadCSSfiles) // 1
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles)
      .then(loadCSSfiles) // 15

      // Save pen in the State
      .then(pen => this.savePenInState(pen, this))
  }

  // Save pen into State
  savePenInState(pen, obj) {
    obj.setState({
      name: pen.name,
      title: pen.title,
      steps: pen.steps,
      steps_descriptions: pen.steps,
      total_steps: pen.total_steps
    })
  }

  // Update the current step into the state with the user changes
  edit(newStyles) {
    let edited = this.state.steps
    edited[this.state.current_step] = newStyles
    this.setState({ steps: edited })
  }

  // Reset current step
  reset() {
    fetch(`pens/${this.state.name}/${this.state.current_step + 1}.css`)
      .then((r) => r.text())
      .then(text => {
        this.state.steps[this.state.current_step] = text
        this.setState({ steps: this.state.steps })
      })
  }

  // Go Next step
  next() {
    if (this.state.current_step < this.state.total_steps - 1) {
      this.setState({ current_step: ++this.state.current_step })
    }
  }

  // Go Prev step
  prev() {
    if (this.state.current_step > 0) {
      this.setState({ current_step: --this.state.current_step })
    }
  }

  render() {
    return (
      <div id="App" className="app">
        <aside className="sidebar open">
          <div className="controls">
            <select onChange={this.change}>
              <option value="0">Google</option>
              <option value="1">LG</option>
              <option value="2">Heart</option>
            </select>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.prev}>Prev</button>
            <div className="step">{this.state.current_step + 1}</div>
            <button onClick={this.next}>Next</button>
          </div>

          <Code edit={this.edit} css={this.state.steps[this.state.current_step]} />
        </aside>

        <div className="playground">
          <header className="header">{this.state.title}</header>
          <div className="pen">

            <div className="heart">
              <div className="heart-body"></div>
            </div>

            <div className="LG-logo">
              <div className="L_and_eye"></div>
              <div className="G"></div>
            </div>

            <div className="google"></div>

          </div>
        </div>
        <style>{this.state.steps[this.state.current_step]}</style>
      </div>
    );
  }
}
