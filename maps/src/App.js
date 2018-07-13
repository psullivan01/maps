import React, { Component } from 'react';
import './styles/App.css';
import List from './components/List.js'
import ListFormHeader from './components/ListFormHeader.js'
import ListForm from './components/ListForm.js'
import MyMap from './components/MyMap.js'
import ToggleMarker from './components/ToggleMarker.js'
import LayerDropdown from './components/LayerDropdown.js'

var listItems = []
var coordinates = []

class App extends Component {

  constructor(props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.addCoordinates = this.addCoordinates.bind(this)
    this.onRadioChange = this.onRadioChange.bind(this)
    this.getDropdown = this.getDropdown.bind(this)

    this.state = {
      options: [],
      search: '',
      lat: [],
      long: [],
      listItems: listItems,
      coordinates: coordinates,
      markers: 'on',
      tileLayer: 'traditional'
    }
  }

  addItem(listItem) {
    if (listItems.length) {
      var listLength = listItems.length
      var lastItem = listItems.slice(listLength - 1, listLength)

      listItems.push({
        index: lastItem[0].index + 1,
        value: listItem.newItemValue
      })
    } else {
      listItems.push({
        index: 0,
        value: listItem.newItemValue,
      })
    }

    this.setState({listItems: listItems})
  }

  addCoordinates(latLng) {
    if (coordinates.length) {
      var coordinatesLength = coordinates.length;
      var lastCoordinate = coordinates.slice(coordinatesLength - 1, coordinatesLength);

      coordinates.push({
        index: lastCoordinate[0].index + 1,
        value: latLng
      }) 
    } else {
      coordinates.push({
        index: 0,
        value: latLng
      })
    }

    this.setState({ coordinates: coordinates })
  }

  removeItem(itemIndex) {
    listItems.splice(itemIndex, 1)
    coordinates.splice(itemIndex, 1)
    this.setState({
      listItems: listItems,
      coordinates: coordinates
    })

  }

  onRadioChange(event) {
    this.setState({
      markers: event.currentTarget.value
    })
  }

  getDropdown(event) {
    this.setState({
      tileLayer: event.target.value
    })
  }

  render() {

    console.log(this.state)

    return (
      <div className="App">
        <MyMap 
          coordinates={this.state.coordinates} 
          markers={this.state.markers} 
          tileLayer={this.state.tileLayer}
        /> 
        <ListFormHeader />
        <List items={this.state.listItems} removeItem={this.removeItem} />
        <ListForm addItem={this.addItem} addCoordinates={this.addCoordinates} />
        <ToggleMarker onRadioChange={this.onRadioChange} markers={this.state.markers}/>
        <LayerDropdown getDropdown={this.getDropdown} />
      </div>
    );
  }
}

export default App;

