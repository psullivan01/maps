import React, { Component } from 'react'

class LayerDropdown extends Component {
    render() {
        return (
            <div>
                <h4>Change Map Backgound</h4>
                <hr />
                <select onChange={(event) => this.props.getDropdown(event)}>
                    <option value="traditional">Traditional</option>>
                    <option value="watercolor">Watercolor</option>
                    <option value="terrain">Terrain</option>
                </select>
            </div>
        );
    }
}

export default LayerDropdown