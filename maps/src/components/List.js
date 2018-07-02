import React, { Component } from 'react';
import ListItem from './ListItem.js'
import '../styles/List.css'

class List extends Component {

	render () {
		var items = this.props.items.map((item, index) => {
			return (
				<ListItem key={index} item={item} index={index} removeItem={this.props.removeItem} />
			)
		})
		return (
			<ul className="list-group"> {items} </ul>
		)
	}
}

export default List