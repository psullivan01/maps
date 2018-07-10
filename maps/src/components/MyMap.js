import React, { Component } from 'react';
import L from 'leaflet';
import curve from 'leaflet-curve';
import '../styles/JourneyMap.css';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import 'leaflet-rotatedmarker';

const stamenTonerTiles = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
const mapCenter = [32.7759428, -96.7967532];
const zoomLevel = 4;

class MyMap extends Component {

    toRad(coord) {
        return coord * Math.PI / 180;
    }

    toDeg(rads) {
        return rads * 180 / Math.PI;
    }

    getBearing(lat1, lng1, lat2, lng2) {
        let initial = 210;

        let dLat = this.toRad(lat2 - lat1),
            dLng = this.toRad(lng2 - lng1);

        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        let y = Math.sin(dLng) * Math.cos(lat2),
            x = (Math.cos(lat1) * Math.sin(lat2)) - (Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng));

        let bearing = this.toDeg(Math.atan2(y, x));

        if (bearing < 0) {
            bearing = 360 - Math.abs(bearing);
        }

        return initial - bearing;
    }

    addMarkers() {
        var markers = []

        for (let m=0; m<this.props.coordinates.length; m++) {
            L.marker([this.props.coordinates[m].value.lat, this.props.coordinates[m].value.lng]).addTo(this.map);
        }

    }

    createCurves() {
        var initialCoords = []
        var curves = []
        var icons = []
        var markers = []

        for (let x=0; x<this.props.coordinates.length; x++) {
            initialCoords.push([
                this.props.coordinates[x].value.lat,
                this.props.coordinates[x].value.lng
            ]) 
        }
        
        for (let i=0; i<initialCoords.length - 1; i++) {

            let latlngs = []

            let latlng1 = [initialCoords[i][0], initialCoords[i][1]],
                latlng2 = [initialCoords[i+1][0], initialCoords[i+1][1]];
            
            let offsetX = latlng2[1] - latlng1[1],
                offsetY = latlng2[0] - latlng1[0];
            
            let r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ),
                theta = Math.atan2(offsetY, offsetX);
            
            let thetaOffset = (3.14/10);
            
            let r2 = (r/2)/(Math.cos(thetaOffset)),
                theta2 = theta + thetaOffset;
            
            let midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
                midpointY = (r2 * Math.sin(theta2)) + latlng1[0];
            
            let midpointLatLng = [midpointY, midpointX];
            
            latlngs.push(latlng1, midpointLatLng, latlng2);

            let pathOptions = {
                color: '#1e90ff',
                weight: 2,
                dashArray: '7, 5'
            }

            curves.push(L.curve(
                [
                    'M', latlng1,
                    'Q', midpointLatLng,
                        latlng2
                ], pathOptions))

            let bearing = this.getBearing(latlng1[0], latlng1[1], latlng2[0], latlng2[1]);

            // console.log(this.curvedPath.getPath(), '*bearing*', bearing);

            // find bezier extrema
            let t = .5,
                exLat = ((1 - t) * (1 - t) * latlng1[0]) + (2 * (1 - t) * t * midpointLatLng[0]) + ( t * t * latlng2[0]),
                exLng = ((1 - t) * (1 - t) * latlng1[1]) + (2 * (1 - t) * t * midpointLatLng[1]) + ( t * t * latlng2[1]);
            
            var planeIcon = L.icon({
                iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Plane_icon.svg',
                iconSize: [10, 10],
            })

            icons.push(L.marker([exLat, exLng], {icon: planeIcon}));
        }

        for (var y=0; y<curves.length; y++) {
            this.map.addLayer(curves[y]);
            this.map.addLayer(icons[y]);
        }

    }

    componentDidMount() {
        this.map = L.map('map', {
            center: mapCenter,
            zoom: zoomLevel,
            attributionControl: false,
            layers: [
                L.tileLayer(stamenTonerTiles, {
                    attribution: stamenTonerAttr
                }),
            ]
        });
    }

    componentDidUpdate() {

        var mapLayer = L.tileLayer(stamenTonerTiles, {
            attribution: stamenTonerAttr
        })

        this.map.eachLayer((layer)=>{
            if (!layer._url) {
                this.map.removeLayer(layer)
            }
        })

        this.addMarkers();
        this.createCurves();
    }

    render() {
        return ( 
            <div id="outer">
                <div id="inner">
                    <div id="map">
                        <div id="legend">My Map</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyMap;