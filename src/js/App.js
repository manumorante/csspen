import React from "react";
import { Code } from "./Code"

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      steps: this.props.steps
    }
    this.pen = this.getStyles();
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  // Read styles form html into site
  getStyles() {
    let $initStylesNode = document.getElementById('init-styles');
    let cssText ='';

    if($initStylesNode) {
      cssText = $initStylesNode.textContent.split('/*-*/');
      document.getElementById("body").removeChild($initStylesNode)
    } else {
      console.log('Initial styles node not found.')
    }
    return cssText;
  }

  nextStep(){
    if(this.state.step < this.state.steps) {
      this.setState({step: ++this.state.step})
    }
  }

  prevStep() {
    if(this.state.step > 0) {
      this.setState({step: --this.state.step})
    }
  }

  render() {
    return (
      <div id="App" className="app">
        <aside className="sidebar open">
          <div className="controls">
            <button onClick={this.prevStep}>Prev</button>
            <div className="step">{this.state.step+1}</div>
            <button onClick={this.nextStep}>Next</button>
          </div>

          <Code css={this.pen[this.state.step]} />
        </aside>        

        <div className="playground">
          <div className="heart">
            <div className="heart-body"></div>
          </div>
        </div>        
        <style>{this.pen[this.state.step]}</style>
      </div>
    );
  }
}