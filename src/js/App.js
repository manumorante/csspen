import React from "react";
import { Code } from "./Code"

export class App extends React.Component {
  constructor(props) {
    super(props);

    // Load pen
    const pen = this.getPen();
    const pen_original = this.getPen(); // TODO Try to clone object..

    this.state = {
      current_step: 0,
      title: pen.title,
      total_steps: pen.total_steps,
      steps: pen.steps,
      pen_original: pen_original
    }

    this.editStep = this.editStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.resetStep = this.resetStep.bind(this);
    this.resetAllSteps = this.resetAllSteps.bind(this);
  }

  // Read styles form html into site
  getPen() {
    let $pen = document.getElementById('pen');
    let steps = $pen.textContent.split('/*-*/');
    let pen = {
      steps: steps,
      title: $pen.getAttribute('title'),
      total_steps: steps.length - 1
    };

    // Clean node
    // document.getElementById("body").removeChild($pen)

    return pen;
  }

  // Update the current step into the state with the user changes
  editStep(newStyles) {
    let edited = this.state.steps;
    edited[this.state.current_step] = newStyles;
    this.setState({ steps: edited });
  }

  resetStep() {
    this.state.steps[this.state.current_step] = this.state.pen_original.steps[this.state.current_step];
    this.setState({ steps: this.state.steps });
  }

  resetAllSteps() {
    this.state.steps = this.state.pen_original.steps;
    this.setState({ steps: this.state.steps });
  }

  nextStep(){
    if(this.state.current_step < this.state.total_steps) {
      this.setState({current_step: ++this.state.current_step})
    }
  }

  prevStep() {
    if(this.state.current_step > 0) {
      this.setState({current_step: --this.state.current_step})
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
            <div className="step">{this.state.current_step+1}</div>
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