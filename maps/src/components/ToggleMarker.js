import React, { Component } from 'react'
import '../styles/ToggleMarker.css'

class ToggleMarker extends Component {

    render() {
        return (
            <div>
                <br/>
                <fieldset>
                    <legend>Toggle Map Markers</legend>

                    <div>
                        <input type="radio" id="on" name="drone" value="on" onChange={this.props.onRadioChange} checked={this.props.markers === "on"}/>
                        <label for="on">On</label>
                    </div>

                    <div>
                        <input type="radio" id="off" name="drone" value="off" onChange={this.props.onRadioChange} checked={this.props.markers === "off"}/>
                        <label for="off">Off</label>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default ToggleMarker;