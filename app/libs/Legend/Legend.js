/**
 * 垂直图例
 **/
L.Control.VerticalLegend = L.Control.extend({
    options: {
        position: 'topleft',
        layers: [], // 图层和对应的属性,

        // 暴露的函数方法
        /**
         * 图例点击
         * @param legendName 图例名称
         * @param legendShowState 图例显示状态
         */
        legendClick: function(legendName, legendShowState) {}
    },

    /**
     * 三个动态添加的元素
     */
    legendItem: {},
    legendList: {},
    toolbar: {},

    /**
     * 所有的geoJson图层
     */
    geoJsonLayers: {},

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'info legend leaflet-control');
        container.setAttribute('id', 'lendwy')
            // button = L.DomUtil.create('button', 'tlbtn', container),
            // img = L.DomUtil.create('img', '', button);
        this.toolbar = L.DomUtil.create('div', 'tl-toolbar', container);

        var topheader = L.DomUtil.create('div', 'topheaderL', this.toolbar),
            nameTitle = L.DomUtil.create('div', 'name', topheader),
            shadowdiv = L.DomUtil.create('div', 'shadowdivL', this.toolbar);
        this.legendList = L.DomUtil.create('ul', 'legend-list', shadowdiv);

        nameTitle.innerHTML = '图例';

        // 根据options初始化
        this.init(map);

        return container;
    },

    /**
     * 根据options赋值
     */
    init: function(map) {
        /**
         * options.layers = {[
         *     {
         *         layerName: '图层名称',
         *         geoJsonUrl: 'geoJson url',
         *         color: '#ddd',
         *         styleFunction: styleFunction,
         *         onEachFeature: onEachFeature
         *     },
         *     ...
         * ]}
         */
        var that = this;
        // 获取所有图层json url 和对应的显示名称
        this.options.layers.forEach(function(item, index) {
            // 显示图例
            var itemLi = L.DomUtil.create('li', '', that.legendList),
                itemA = L.DomUtil.create('a', 'iconfont'),
                itemP = L.DomUtil.create('p', 'legend-title'); // 图例项目的文字
            itemLi.setAttribute('layer-name', item.layerName);
            itemLi.setAttribute('status', '');
            itemA.title = item.layerName;
            // itemA.style['pointer-events'] = 'none';
            itemP.innerHTML = item.layerName;
            // itemP.style['pointer-events'] = 'none';

            // 根据参数判断是否有icon, 没有就判断是否有type, 如果还没有就给个默认图标
            if (item.icon) {
                itemA.style.backgroundImage = "url(" + item.icon + ")";
            } else {
                // 如果有指定类型, 给每个图例选项一个默认图标
                // console.log(item.color);
                if (item.type) {
                    switch (item.type) {
                        case 'Point':
                            itemA.innerHTML = '<div style="width: 20px;height: 20px; border: 1px solid ' + item.color + ' ; background-color: ' + item.color + '"></div>';
                            break;
                        case 'Polyline':
                            itemA.innerHTML = '<div style="width: 20px;height: 20px; border: 1px solid ' + item.color + ' ; background-color: ' + item.color + '"></div>;';
                            break;
                        case 'Polygon':
                            itemA.innerHTML = '<div style="width: 20px;height: 20px; border: 1px solid ' + item.color + ' ; background-color: ' + item.color + '"></div>';
                            break;
                        default:
                            break;
                    }
                } else {
                    itemA.innerHTML = '<div style="width: 20px;height: 20px; background-color: #aaa;"></div>;';
                }

                // 设置颜色
                itemA.style['color'] = item.color;
            }

            itemLi.innerHTML = itemA.outerHTML + itemP.outerHTML;

            // 图例点击事件
            var legendItemClick = function(event) {
                //console.log(event);
                //return;
                event = event ? event : window.event;
                var obj = this;

                // console.log(event);

                var legendName = obj.getAttribute('layer-name'),
                    legendShowState = obj.getAttribute('status');

                // console.log(legendShowState);

                // // 如果图例已经处于选中状态
                // if (!legendShowState) {
                //     for (var i = 0;i < obj.parentNode.getElementsByTagName('div').length; i++){
                //         obj.parentNode.getElementsByTagName('div')[i].style.backgroundColor = '#343a43';
                //     }
                //
                //     // 添加图层
                //     obj.setAttribute('status', '1');
                //     obj.getElementsByTagName('div')[0].style.backgroundColor = item.color;
                //
                // } else {
                //     obj.setAttribute('status', '');
                //     obj.getElementsByTagName('div')[0].style.backgroundColor = item.color;
                //
                // }

                // 调用自定义回调函数
                that.options.legendClick(legendName, legendShowState);
            };

            itemLi.onclick = legendItemClick;

            // 添加点击事件
            //L.DomEvent.on(itemLi, 'click', legendItemClick, this);

        });
    }

});


L.control.VerticalLegend = function(option) {
    return new L.Control.VerticalLegend(option);
};
/**
 * 水平图例
 **/
L.Control.HorizonLegend = L.Control.extend({
    options: {
        position: 'topleft',
        layers: [], // 图层和对应的属性,

        // 暴露的函数方法
        /**
         * 图例点击
         * @param legendName 图例名称
         * @param legendShowState 图例显示状态
         */
        legendClick: function(legendName, legendShowState) {}
    },

    /**
     * 三个动态添加的元素
     */
    legendItem: {},
    legendList: {},
    toolbar: {},

    /**
     * 所有的geoJson图层
     */
    geoJsonLayers: {},

    onAdd: function(map) {
        this.container = L.DomUtil.create('div', 'tin-legend');
        this.container.setAttribute('id', 'tinLegend')

        this.divconten = L.DomUtil.create('div', 'tin-legend-labels', this.container);

        this.legendList = L.DomUtil.create('ul', 'tin-div', this.divconten);
        this.init(map);
        return this.container;
    },

    /**
     * 根据options赋值
     */
    init: function(map) {
        /*$('.tin-legend-labels li').width(100 / tinColors.length + '%');

        tinColors.forEach(function(color, index) {
            // legend
            var legend = document.getElementById('tinLegend');
            var bar = document.createElement('div');
            bar.className = 'tin-legend-bar';
            bar.title = color[0];
            bar.style.width = 100 / tinColors.length + '%';
            bar.style.backgroundColor = color[1];
            legend.insertBefore(bar, legend.firstChild);
        });*/

        var that = this;
        that.options.layers.forEach(function(item, index) {
           // console.log(item);
            var itemLi = L.DomUtil.create('li', '', that.legendList);
            itemLi.style.width=100 / that.options.layers.length + '%';
            itemLi.innerHTML=item[2];
           // var legend = document.getElementById('tinLegend');
            var bar = document.createElement('div');
            bar.className = 'tin-legend-bar';
            bar.title = item[0];
            bar.style.width = 100 / that.options.layers.length + '%';
            bar.style.backgroundColor = item[1];
             that.container.insertBefore(bar, that.divconten);
        });
    }

});
L.control.HorizonLegend = function(option) {
    return new L.Control.HorizonLegend(option);
};
//map init hook
L.Map.mergeOptions({
    GagoLegend: false
});

L.Map.addInitHook(function() {
    if (this.options.GagoLegend) {
        this.GagoLegend = new L.Control.GagoLegend();
        this.addControl(this.GagoLegend);
    }
});
