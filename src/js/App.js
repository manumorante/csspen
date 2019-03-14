import React from "react";
import { Code } from "./Code"

import loadPens from './services/load_pens';

export class App extends React.Component {
  constructor(props) {
    super(props);

    // Public pens directory
    this.dir = './pens/';

    // JSON data file
    this.infoPath = `${this.dir}/info.json`;

    // Pen folder
    this.pen_path = '';
    this.steps_array = [];

    this.state = {
      steps: [],
      current_step: 0
      // steps: pen.steps
      // pen_original: pen_original
    }

    // Init
    loadPens(this.infoPath).then((pensArray) => {
      this.setState({ info: pensArray });

      const path = pensArray[0];

      // Define the pen path
      this.pen_path = `${this.dir}/${path}`;

      // Call tbe pen number 1
      this.getPen(path).then((pen) => {
        // Update state
        this.setState({
          current_step: 0,
          title: pen.title,
          total_steps: pen.steps.length
        });

        // Start to read each css file
        this.getCSSfile(0);
      });
    });

    this.getCSSfile = this.getCSSfile.bind(this);
    this.editStep = this.editStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.resetStep = this.resetStep.bind(this);
    this.resetAllSteps = this.resetAllSteps.bind(this);
  }

  // Get pen
  getPen(path) {
    return fetch(`${this.pen_path}/info.json`)
      .then((r) => r.text())
      .then(text => JSON.parse(text))
  }

  // Get css file (and call to read the next one)
  getCSSfile(n) {
    fetch(`${this.pen_path}/${n + 1}.css`)
      .then((r) => r.text())
      .then(text => {
        this.steps_array[n] = text;

        // When array is loaded
        if (this.state.total_steps == n + 1) {
          // Update state
          this.setState({
            steps: this.steps_array,
            steps_original: this.steps_array
          });
        } else {
          // Call again to get the next css file
          this.getCSSfile(++n)
        }
      })
  }

  // Update the current step into the state with the user changes
  editStep(newStyles) {
    let edited = this.state.steps;
    edited[this.state.current_step] = newStyles;
    this.setState({ steps: edited });
  }

  // Reset step
  resetStep() { 
    fetch(`${this.pen_path}/${this.state.current_step + 1}.css`)
      .then((r) => r.text())
      .then(text => {
        this.state.steps[this.state.current_step] = text;
        this.setState({ steps: this.state.steps });
      })
  }

  // Reste all steps
  resetAllSteps() {
    this.getCSSfile(0);
  }

  nextStep() {
    if (this.state.current_step < this.state.total_steps - 1) {
      this.setState({ current_step: ++this.state.current_step })
    }
  }

  prevStep() {
    if (this.state.current_step > 0) {
      this.setState({ current_step: --this.state.current_step })
    }
  }

  render() {
    return (
      <div id="App" className="app">
        <aside className="sidebar open">
          <div className="controls">
            <button onClick={this.resetStep}>Reset</button>
            <button onClick={this.resetAllSteps}>Reset all</button>
            <button onClick={this.prevStep}>Prev</button>
            <div className="step">{this.state.current_step + 1}</div>
            <button onClick={this.nextStep}>Next</button>
          </div>

          <Code editStep={this.editStep} css={this.state.steps[this.state.current_step]} />
        </aside>

        <div className="playground">
          <header className="header">{this.state.title}</header>
          <div className="pen">
            <div className="heart">
              <div className="heart-body"></div>
            </div>
          </div>
        </div>
        <style>{this.state.steps[this.state.current_step]}</style>
      </div>
    );
  }
}