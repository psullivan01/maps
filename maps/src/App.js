import React, { Component } from 'react';
import './styles/App.css';
import axios from 'axios'
import JourneyMap from './components/JourneyMap.js'
import List from './components/List.js'
import ListFormHeader from './components/ListFormHeader.js'
import ListForm from './components/ListForm.js'
import GenerateButton from './components/GenerateButton.js'

const key = 'AIzaSyDEO9bMG0RJLyUr1GK3xiUqD__TN5rdjio'
var listItems = []
listItems.unshift({index: 3, value: "Atlanta, GA"})
listItems.unshift({index: 2, value: "Dallas, TX"})
listItems.unshift({index: 1, value: "New York, NY"})

class App extends Component {

  constructor(props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)

    this.state = {
      options: [],
      search: '',
      lat: [],
      long: [],
      listItems: listItems,
      coordinates: [],
    }
  }

  addItem(listItem) {
    var listLength = listItems.length
    var lastItem = listItems.slice(listLength - 1, listLength)

    listItems.push({
      index: lastItem[0].index + 1,
      value: listItem.newItemValue
    })

    this.setState({listItems: listItems})

  }

  removeItem(itemIndex) {
    listItems.splice(itemIndex, 1)
    this.setState({listItems: listItems})
  }

  executeGet() {
    var myCoordinates = []
    var promises = []

    for (var y=0; y<listItems.length-1; y++) {
      var origin = listItems[y].value
      var destination = listItems[y+1].value
      var url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=' + key
      promises.push(axios.get(url))
    }

    axios.all(promises).then((results)=>{
      results.forEach((response)=>{

        let startLat = response.data.routes[0].legs[0].start_location.lat;
        let startLng = response.data.routes[0].legs[0].start_location.lng;
        let endLat = response.data.routes[0].legs[0].end_location.lat;
        let endLng = response.data.routes[0].legs[0].end_location.lng;

        myCoordinates.push([startLat, startLng], [endLat, endLng]);
      })
      this.setState({coordinates: myCoordinates})
    })
  }

  render() {

    console.log(this.state)

    return (
      <div className="App">
        <JourneyMap coordinates={this.state.coordinates}/>
        <ListFormHeader />
        <List items={this.state.listItems} removeItem={this.removeItem} />
        <ListForm addItem={this.addItem} />
        <br />
        <GenerateButton executeGet={this.executeGet.bind(this)} />

      </div>
    );
  }
}

export default App;
