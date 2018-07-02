import React, { Component } from 'react';

class GenerateButton extends Component {

	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(event) {
		event.preventDefault()
		this.props.executeGet()
	}

	render () {
		return (
			<form onSubmit={this.onSubmit} className="form-inline">
				<button type="submit" className="btn btn-default">Generate Map</button>
			</form>
		)
	}
}

export default GenerateButton