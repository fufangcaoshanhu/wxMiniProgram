var wxCharts = require("../../utils/wxcharts.js");
var app = getApp();
Page({
    data :{
        lineChart : null,
        windowWidth : 320,
        list:["0时","4时","8时","12时","16时","20时"],
        title:["成本","利润"],
        datas:[]
    },
    touchHandler: function (e) {
        this.data.lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },    
    createData: function () {
        var data = [];
        for (var i = 0; i < 6; i++) {
            data.push(Math.floor(Math.random()*(20-10))+10);
        }
        return data;
    },
    updateData: function () {
        var data1 = this.createData();
        var data2 = this.createData();
        this.setData({
            datas:[data1,data2]
        });
        var series = [{
            name: '成本',
            data: data1,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        },
        {
            name: '利润',
            data: data2,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        }
    ];
        this.data.lineChart.updateData({
            categories: this.data.list,
            series: series
        });
    },
    onLoad: function (e) {
        try {
            this.setData({
                windowWidth : wx.getSystemInfoSync().windowWidth
            });
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        this.setData({
            datas :[this.createData(),this.createData()]
        });
        this.data.lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: this.data.list,
            animation: true,
            series: [{
                name: '成本',
                data: this.data.datas[0],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '利润',
                data: this.data.datas[1],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '成交金额 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: this.data.windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    }
});