import React, { Component } from 'react';
import '../styles/RadiusSlider.css';

class RadiusSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      radius: 100
    }
  }

  radiusSlide(e) {
    this.setState({
      radius: parseInt(e.target.value)
    })
    console.log('slider value: ', this.state)
  }

  render() {
    return (
      <div>
        <h4>Slide to Select Magnifying Glass Radius</h4>
        <div class="slidecontainer">
          <input onChange={(e) => {
            this.props.getRadius(e)
            this.radiusSlide(e)
          }}
            type="range" id="radius" name="radius" min="50" max="250" defaultValue="100"
          />
          <p>Current Radius: {this.state.radius}</p>
        </div>
      </div>
    )
  }
}

export default RadiusSlider