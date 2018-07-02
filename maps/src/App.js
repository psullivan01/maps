import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import JourneyMap from './JourneyMap.js'
import List from './List.js'
import ListFormHeader from './ListFormHeader.js'
import ListForm from './ListForm.js'
import GenerateButton from './GenerateButton.js'

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
        response.data.routes[0].legs[0].steps.forEach((start_location)=>{
          var lat = start_location.start_location.lat
          var lng = start_location.start_location.lng

          myCoordinates.push([lat, lng])
        })
      })
      console.log(myCoordinates);
      console.log(this);
      this.setState({coordinates: myCoordinates}, ()=>{
        console.log(this.state);
      })

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
