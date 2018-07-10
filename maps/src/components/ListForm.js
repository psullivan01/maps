import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

class ListForm extends Component {

	constructor(props) {
		super(props)
		// this.onSubmit = this.onSubmit.bind(this)

		this.state = {
			location: '',
			coordinates: []
		};
	}

	handleChange = location => {
		this.setState({ location });
	}

	handleSelect = location => {
		var newItemValue = location;
		if (newItemValue) {
			this.props.addItem({ newItemValue });
			this.setState({ location: '' });
		}

		geocodeByAddress(location)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.addCoordinates(latLng))
			.then(latLng => console.log('Success', latLng))
			.catch(error => console.error('Error', error));
	}

	render () {
		return (
			<PlacesAutocomplete value={this.state.location} onChange={this.handleChange} onSelect={this.handleSelect}>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div>
					<input
					{...getInputProps({
						placeholder: 'Search Places...',
						className: 'location-search-input',
					})}
					/>
					<div className="autocomplete-dropdown-container">
					{loading && <div>Loading...</div>}
					{suggestions.map(suggestion => {
						const className = suggestion.active
						? 'suggestion-item--active'
						: 'suggestion-item';
						// inline style for demonstration purpose
						const style = suggestion.active
						? { backgroundColor: '#fafafa', cursor: 'pointer' }
						: { backgroundColor: '#ffffff', cursor: 'pointer' };
						return (
						<div
							{...getSuggestionItemProps(suggestion, {
								className,
								style,
							})}
						>
							<span>{suggestion.description}</span>
						</div>
						);
					})}
					</div>
				</div>
				)}
			</PlacesAutocomplete>
		)
	}
}

export default ListForm