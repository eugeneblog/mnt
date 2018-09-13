/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('program.view.main.Main', {

    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.plugin.Viewport',
        'program.view.main.MainController',
        'program.view.main.MainModel',
        "program.view.main.toolbar.TopToolbar",
        "program.view.tab.BasicTabs",
        "program.view.tab.FramedTabs",
        //"program.view.Viewport",
        "Ext.chart.*",
        "Ext.window.*",
        "Ext.data.*",
        "program.view.massage.ProgressBarWin",
        "program.view.window.ShowDevices"
    ],
    style: {
        //background: "rgb(21,127,214)"
    },
    xtype: 'app-main',
    //layout: "border",
    bind: {
        //title:"<div style='z-index:0;top:0px;width:100%;line-height:50px;background:rgb(130,177,52);padding:0 0 0 5px;font-size: 20px;color:white;'><img style='height:20px;' src='{img}'/>     {name}</div>"
    },
    layout: {
        type: 'border',
        align: 'stretch'
    },
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    title: "<div style='z-index:0;top:0px;width:100%;line-height:35px;padding:0 0 0 5px;margin:0;font-size: 20px;color:white;' class='smartiologo'><img style='height:30px;' src='resources/img/PNG/SmartIO.png'/>    SmartIO </div>",

    tbar: [
        {
            xtype: "basic-toolbar",
            padding: 0
        }
    ],
    listeners: {
        render: "boxready"
    },
    items: [

        {
            xtype: "basic-tabs",
            region: "west",
            width: 190,
            resizable: true,
            title: 'Projects',
            collapsible: true,
            split: true
        },
        Ext.create("program.view.tab.FramedTabs", {
            region: "center",
            height: "200%",
            width: "200%",
        })
    ]
});




function isTime(val) {
    var vals = val.split(":")
    if (vals.length != 3) {
        return "This field error";
    }
    if (!(vals[0] >= 0 & vals[0] <= 23 & vals[1] >= 0 & vals[1] <= 59 & vals[2] >= 0 & vals[2] <= 59)) {
        return "This field error";
    }
    for (var i = 0; i < vals.length; i++) {
        if (isNaN(vals[i]) || (vals[i] + "") == "-0") {
            return "This field error";
        }
    }
    return true;
}

function isBarCollsion(x1, y1, x2, y2, w, h) {
    console.log(arguments)
    if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
        return true;
    }
    return false;
}

function myAjax(url, success, params) {
    Ext.Ajax.request({
        url: url || "resources/test1.php",
        method: "GET",
        async: false,
        params: params || {},
        success: success
    });
}
My.getDevsByDevName = function (ip, port, devname) {
    /*
     根据 前四位 数字 获取数据库中的keys
     */
    var store = null;
    console.log(arguments)
    if (!ip & !port) {
        return store;
    }
    Ext.Ajax.request({
        url:"resources/test1.php",
        async:false,
        params:{
            par: "getDevsByDevName",
            ip: ip,
            port: port,
            devname: devname
        },
        success:function(response){
            var data = response.responseText;
            try {
                var ojson = Ext.decode(data)
                if (ojson["success"]) {
                    Ext.Msg.alert("info", ojson.info);
                    return store;
                } else {
                    store = Ext.create("Ext.data.Store", {
                        fields: ['name', 'value', 'Present_Value','update'],
                        data: ojson
                    })
                }
            } catch (e) {
            }
        }
    })


    return store;

}



var testwin = null
var teststore = null;

var isDebug = false;