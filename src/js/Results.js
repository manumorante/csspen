import React from "react";
// import { Style } from "react-style-tag";

export class Results extends React.Component {
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
    let $initStylesNone = document.getElementById('init-styles');
    let cssText ='';

    if($initStylesNone) {
      cssText = $initStylesNone.textContent.split('/*-*/');
      document.getElementById("body").removeChild($initStylesNone)
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
      <div id="Results">
        <button onClick={this.prevStep}>Prev</button>
        <button onClick={this.nextStep}>Next</button>

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