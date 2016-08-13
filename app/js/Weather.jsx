import React from 'react'
import { render } from 'react-dom';
import { Row, Col } from 'antd';
import L from 'leaflet';
L.TileLayer.MVTSource =require('./../../node_modules/leaflet-mapbox-vector-tile/src/MVTSource');
var weatherEcharts = require('./../libs/weatherEcharts');
var basemap = require('./../libs/basemap.js').basemap;
import './../less/weather.less'
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

const Weather = React.createClass({
    componentWillMount:function () {

    },
    componentDidMount:function () {
        var i =0;
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
            onClick: function(e) {

                var latlng = e.latlng;
                console.log(e);
                i++;
                console.log(i);
                // if (latlng.lat) {
                //     var ttdk = weatherEcharts(latlng.lng, latlng.lat, "1");
                //     document.getElementById('tempContent').innerHTML = ttdk[4].substr(0, 2);
                //     document.getElementById('wetContent').innerHTML = ttdk[2].substr(0, 2);
                //     document.getElementById('windvContent').innerHTML = ttdk[6].substr(0, 2);
                //     document.getElementById('winddContent').innerHTML = ttdk[7].substr(0, 2);
                //     var tt = weatherEcharts(latlng.lng, latlng.lat, "2");
                // }
                // if (Latlng.lat) {
                //     e.forEach(function(evt, index) {
                //         // if (evt && that.valueChina[evt.layer.name][1]) {
                //         that.map.setView([latlng.lat, latlng.lng]);
                //         var corpzuowu = evt.properties['作物'] == 'null' ? '' : evt.properties['作物'] || evt.properties['16种植作物'] || '';
                //         var pop = L.popup.GagoPopup({
                //             name: '',
                //             propArr: [
                //                 ['原地号', evt.properties['原地号'] == 'null' ? "" : evt.properties['原地号']],
                //                 ['管理区', evt.properties['管理区'] == 'null' ? "" : evt.properties['管理区']],
                //                 ['种植作物', corpzuowu]
                //             ]
                //         }).setLatLng(latlng).openOn(that.map);
                //         // }
                //     });
                // }
            }

        });
    },
    render() {

        return (
            <div>
                <div id="map" style={{height:400}}></div>
                <div className="section-gutter">
                    <Row gutter={15} className="gutter-row">
                        <Col className="gutter-col" span={6}>
                            <div className="gutter-box">
                                <div>温度</div>
                                <div className="box-content" id="temp"><span id="tempContent">--</span>°C</div>
                                <div>时间:实时</div>
                            </div>
                        </Col>
                        <Col className="gutter-col" span={6}>
                            <div className="gutter-box">
                                <div>湿度</div>
                                <div className="box-content" id="wet"><span id="wetContent">--</span>%</div>
                                <div>时间:实时</div>
                            </div>
                        </Col>
                        <Col className="gutter-col" span={6}>
                            <div className="gutter-box">
                                <div>风级</div>
                                <div className="box-content" id="windv"><span id="windvContent">--</span></div>
                                <div>时间:实时</div>
                            </div>
                        </Col>
                        <Col className="gutter-col" span={6}>
                            <div className="gutter-box">
                                <div>风向</div>
                                <div className="box-content" id="windd"><span id="winddContent">--</span></div>
                                <div>时间:实时</div>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={15} className="gutter-row">
                        <Col className="gutter-col" span={8}>
                            <div className="gutter-box">
                                <div>未来二周、三周</div>
                                <div>
                                    预计8月中旬东北地区主要有两个降水过程，主要降雨时段在14日前后和18日前后，累积雨量有20～40毫米，部分地区有50～80毫米。
                                </div>
                            </div>
                        </Col>
                        <Col className="gutter-col" span={8}>
                            <div className="gutter-box">
                                <div>月季预报</div>
                                <div>８～10月气温比常年略高，初霜正常。</div>
                                <div>８～10月降水较常年略多。</div>
                            </div>
                        </Col>
                        <Col className="gutter-col" span={8}>
                            <div className="gutter-box">
                                <div>年际预测</div>
                                <div>今冬至明春降水与常年持平，气温较常年略高。</div>
                            </div>
                        </Col>
                    </Row>
                    <Row><div id="main" style={{height:100}}></div></Row>
                    <Row><div id="main1" style={{height:100}}></div></Row>
                    <Row><div id="main2" style={{height:100}}></div></Row>
                </div>
            </div>

        )
    }
})

export default Weather
