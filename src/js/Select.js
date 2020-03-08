import React from "react";

export class Select extends React.Component {
	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
	}

	change(e) {
    let id = parseInt(e.target.value);

    // Set new id and reset current step
    this.setState({ id: id, current_step: 0 });
    this.props.load(id);
  }

	render() {
		return (
			<select onChange={this.change}>
        <option value="0">Google</option>
        <option value="1">LG</option>
        <option value="2">Heart</option>
      </select>
		);
	}
}
