import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
var basemap = require('./../../libs/basemap.js').basemap;


const MapModule = React.createClass({
    componentDidMount:function() {
        var that = this;
        var test = new basemap();
        this.map = test.gagomap({ id: 'map', maxZoom: 18, minZoom: 8, center: [48.3015, 125.40], zoom: 10 }); //初始化map
        var base = test.addbasemap(); //添加底图
    },
    render() {
        return (
            <div id="map" style={{height:800}}></div>
        )
    }
})

export default MapModule
