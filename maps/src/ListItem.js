import React, { Component } from 'react';

class ListItem extends Component {

	constructor(props) {
		super(props)
		this.onClickClose = this.onClickClose.bind(this)
		this.onClickDone = this.onClickDone.bind(this)
	}

	onClickClose() {
		var index = parseInt(this.props.index, 10)
		this.props.removeItem(index)
	}

	onClickDone() {
		var index = parseInt(this.props.index, 10)
		this.props.markDone(index)
	}

	render () {

		return (
			<li className="list-group-item">
				<div>
					<span className="glypicon glypicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
					{this.props.item.value}
					<button type="button" className="close" onClick={this.onClickClose}>&times;</button>
				</div>
			</li>
		)
	}
}

export default ListItem