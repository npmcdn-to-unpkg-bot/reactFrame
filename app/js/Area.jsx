import React from 'react'
import { render } from 'react-dom';
import L from 'leaflet';
L.TileLayer.MVTSource =require('./../../node_modules/leaflet-mapbox-vector-tile/src/MVTSource');
var basemap = require('./../libs/basemap.js').basemap;
var cropColors = {
    '马铃薯': 'rgba(158,133,93,0.6)',
    '玉米': 'rgba(196,196,0,0.6)',
    '大豆': 'rgba(60,179,113,0.6)',
    '小麦': 'rgba(254,153,41,0.6)',
    '黄豆': 'rgba(60,179,113,0.6)',
    '杂粮': 'rgba(174,174,174,0.6)',
    '其他': 'rgba(116,58,58,0.6)',
    '空值': 'rgba(128,128,128,0.3)'
};
var cropBorderColors={
    '马铃薯': '#9E855D',
    '玉米': '#C4C400',
    '大豆': '#3CB371',
    '小麦': '#fe9929',
    '黄豆': '#3CB371',
    '杂粮': '#aeaeae',
    '其他': '#743A3A',
    '空值': 'grey'
};

const Area = React.createClass({
    getInitialState: function() {
        return {
            heightStyle:{
                height:"auto"
            }
        };
    },
    componentWillMount:function () {
        var mapHeight = document.documentElement.clientHeight - 40;
        this.setState({
            heightStyle:{
                height:mapHeight + 'px'
            },
        })
    },
    componentDidMount:function () {
        var that = this;
        var test = new basemap();
        this.map = test.gagomap({ id: 'map', maxZoom: 18, minZoom: 8, center: [48.3015, 125.40], zoom: 10 }); //初始化map
        var base = test.addbasemap(); //添加底图
        var layers = test.addtillLayer({
            url: 'http://123.56.205.244:8027/farmland/tile/{z}/{x}/{y}',
            getID: 'codeid',
            style: function(feature) {
                var style = {};
                var corpname
                if (feature.properties['作物']) {
                    corpname = feature.properties['作物'];
                } else if (feature.properties['16种植作物']) {
                    corpname = feature.properties['16种植作物'];
                } else if (feature.properties['2016种植作']) {
                    corpname = feature.properties['2016种植作'];
                }
                if (corpname != 'null') {
                    style.color = cropColors[corpname];
                    style.fillOpacity = 0;
                    // style.opacity=0;
                    style.outline = {
                        color: cropBorderColors[corpname],
                        size: 2
                    };
                    style.selected = {
                        color: 'rgba(0,0,255,0.2)',
                        outline: {
                            color: 'rgba(0,0,255,1)',
                            size: 2
                        }
                    };
                    return style;

                } else {
                    style.color = cropColors['空值'];
                    style.fillOpacity = 0;
                    // style.opacity=0;
                    style.outline = {
                        color: cropBorderColors['空值'],
                        size: 1
                    };
                    style.selected = {
                        color: 'rgba(0,0,255,0.2)',
                        outline: {
                            color: 'rgba(0,0,255,1)',
                            size: 2
                        }
                    };
                    return style;
                }
            },
            onClick: function(evtArr, latlng) {
                if (latlng.lat) {
                    evtArr.forEach(function(evt, index) {
                        // if (evt && that.valueChina[evt.layer.name][1]) {
                        that.map.setView([latlng.lat, latlng.lng]);
                        var corpzuowu = evt.properties['作物'] == 'null' ? '' : evt.properties['作物'] || evt.properties['16种植作物'] || '';
                        var pop = L.popup.GagoPopup({
                            name: '',
                            propArr: [
                                ['原地号', evt.properties['原地号'] == 'null' ? "" : evt.properties['原地号']],
                                ['管理区', evt.properties['管理区'] == 'null' ? "" : evt.properties['管理区']],
                                ['种植作物', corpzuowu]
                            ]
                        }).setLatLng(latlng).openOn(that.map);
                        // }
                    });
                }
            }

        });

    },
    render() {

        return (
            <div id="map" style={this.state.heightStyle}></div>
        )
    }
})

export default Area
