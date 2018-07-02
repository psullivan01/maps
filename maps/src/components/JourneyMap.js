import React from 'react';
import { Map, TileLayer, Polyline, Popup} from 'react-leaflet';
import '../styles/JourneyMap.css';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

const stamenTonerTiles = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
const mapCenter = [32.7759428, -96.7967532];
const zoomLevel = 4;

function JourneyMap({ coordinates }) {
	return (
		<div>
			<Map center={mapCenter} zoom={zoomLevel}>
				<TileLayer attribution={stamenTonerAttr} url={stamenTonerTiles} />
				<Polyline positions={ coordinates }/>
			</Map>
		</div>
	)
}

export default JourneyMap;

