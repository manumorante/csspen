import React from "react";
import { Button } from "./Button";
import { Select } from "./Select";

export class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="controls">
        <Select load={this.props.load}></Select>
        <Button action={this.props.reset} label="Reset"></Button>
        <Button action={this.props.prev} label="Prev"></Button>
        <div className="step">{this.props.current_step + 1}</div>
        <Button action={this.props.next} label="Next"></Button>
      </div>
    );
  }
}
