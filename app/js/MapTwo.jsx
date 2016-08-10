import React from 'react'
import { render } from 'react-dom';
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import './../less/maptwo.less';
const MapTwo = React.createClass({
    componentDidMount:function () {
        const position = [51.505, -0.09];
        const map = L.map('map').setView(position, 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(position).addTo(map)
            .bindPopup('A pretty CSS3 popup. <br> Easily customizable.');
    },

    render() {
        return (
            <div id="map" style={{height:400}}></div>
        )
    }
})

export default MapTwo
