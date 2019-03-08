import React from "react";
import { Code } from "./Code"

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      totalSteps: this.props.totalSteps,
      steps: this.getStyles()
    }

    this.editStep = this.editStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

    // Update the current step into the state with the user changes
  editStep(newStyles) {
    this.state.steps[this.state.currentStep] = newStyles;
    this.setState({
      steps: this.state.steps
    });
  }

  // Read styles form html into site
  getStyles() {
    let $initStylesNode = document.getElementById('init-styles');
    let steps = [];

    if($initStylesNode) {
      steps = $initStylesNode.textContent.split('/*-*/');

      // Clean node
      document.getElementById("body").removeChild($initStylesNode)
    } else {
      console.log('Initial styles node not found.')
    }
    return steps;
  }

  nextStep(){
    if(this.state.currentStep < this.state.totalSteps) {
      this.setState({currentStep: ++this.state.currentStep})
    }
  }

  prevStep() {
    if(this.state.currentStep > 0) {
      this.setState({currentStep: --this.state.currentStep})
    }
  }

  render() {
    return (
      <div id="App" className="app">
        <aside className="sidebar open">
          <div className="controls">
            <button onClick={this.prevStep}>Prev</button>
            <div className="step">{this.state.currentStep+1}</div>
            <button onClick={this.nextStep}>Next</button>
          </div>

          <Code editStep={this.editStep} css={this.state.steps[this.state.currentStep]} />
        </aside>        

        <div className="playground">
          <div className="heart">
            <div className="heart-body"></div>
          </div>
        </div>        
        <style>{this.state.steps[this.state.currentStep]}</style>
      </div>
    );
  }
}