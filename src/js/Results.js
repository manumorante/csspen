import React from "react";
import { Style } from "react-style-tag";

export class Results extends React.Component {
  constructor(props) {
    super(props);
    this.step = this.props.step;
    this.itemStyles = this.getStyles();
  }

  // Read styles form html into site
  getStyles() {
    let css = document.getElementById('init-styles').textContent;
    return css.split('/*-*/');
  }

  render() {
    return (
      <div className="result">
        <div className="result-body"></div>
        <Style>{`${this.itemStyles[this.step]}`}</Style>
      </div>
    );
  }
}