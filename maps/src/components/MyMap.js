import React, { Component } from 'react';
import L from 'leaflet';
import curve from 'leaflet-curve';

const stamenTonerTiles = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
const mapCenter = [32.7759428, -96.7967532];
const zoomLevel = 4;

class MyMap extends Component {

    createCurves() {
        let initialCoords = []

        for (let x=0; x<this.props.coordinates.length; x++) {
            if (x===0 || x%2 > 0) {
                initialCoords.push(this.props.coordinates[x])
            }
        }
        
        for (let i=0; i<initialCoords.length - 1; i++) {
            let latlngs = []

            let latlng1 = [initialCoords[i][0], initialCoords[i][1]],
                latlng2 = [initialCoords[i+1][0], initialCoords[i+1][1]];
            
            var offsetX = latlng2[1] - latlng1[1],
                offsetY = latlng2[0] - latlng1[0];
            
            var r = Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ),
                theta = Math.atan2(offsetY, offsetX);
            
            var thetaOffset = (3.14/10);
            
            var r2 = (r/2)/(Math.cos(thetaOffset)),
                theta2 = theta + thetaOffset;
            
            var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
                midpointY = (r2 * Math.sin(theta2)) + latlng1[0];
            
            var midpointLatLng = [midpointY, midpointX];
            
            latlngs.push(latlng1, midpointLatLng, latlng2);

            let pathOptions = {
                color: 'blue',
                weight: 2
            }

            this.curvedPath = L.curve(
                [
                    'M', latlng1,
                    'Q', midpointLatLng,
                        latlng2
                ], pathOptions).addTo(this.map);
        }
    }

    componentDidMount() {

        this.map = L.map('map', {
            center: mapCenter,
            zoom: zoomLevel,
            layers: [
                L.tileLayer(stamenTonerTiles, {
                    attribution: stamenTonerAttr
                }),
            ]
        });
    }

    componentDidUpdate() {
        console.log('*********', this.props.coordinates)
        this.createCurves()
    }

    render() {
        return <div id="map"></div>
    }
}

export default MyMap;