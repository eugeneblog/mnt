Ext.define("program.view.window.DrawWeeksWindow", {
    extend: "Ext.window.Window",
    alias: "drawweekswindow",
    requires: [
        "program.view.window.DrawWeeksWindowController",
        "program.view.window.DrawWeeksWindowModel",
        "program.model.WeekModel"
    ],

    controller: "window-drawweekswindow",
    viewModel: {
        type: "window-drawweekswindow"
    },
    height: 550,
    width: 1024,
    //constrainHeader: true,//禁止移出父窗口
    autoShow: true,
    layout: 'card',
    resizable: false,
    group: new Ext.grid.feature.Grouping({
        groupHeaderTpl: '{name}{renderedGroupValue} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true
    }),
    tbar: [
        {
            ui:"default",
            cls:"phoneButton",
            scale:"medium",
            text: "Next ->",
            id: "drawWindow_next",
            handler: function (button) {
                var me = this.up('window');
                me.fireEvent("nextHandler");
                var l = me.getLayout();
                button.hide()
                l.setActiveItem(1)
            }
        },
        {
            ui:"default",
            cls:"phoneButton",

            scale:"medium",
            text: "<- Previous",
            id: "drawWindow_previous",
            hidden: true,
            handler: function (button) {
                var me = this.up('window');
                var l = me.getLayout();
                button.hide();
                l.setActiveItem(0);
                me.fireEvent("PreviousHandler");
            }
        },

        {
            text: "divDataToJson", hidden: true, handler: function () {
            var me = this.up("window");
            me.fireEvent("divDataToJson")
        }
        }, {
            text: "gridDataToJson", hidden: true, handler: "gridDataToJson"
        },
        "->",
        {
            ui:"default",
            cls:"phoneButton",

            scale:"medium",
            text: "Save",
            handler: function(){
                Ext.Ajax.request({
                    url: "resources/test1.php",
                    params: {
                        par: "save"
                    },
                    success: function (response) {
                        //var lastTime = new Date(response.responseText-0).toLocaleString()+""
                        delayToast("Massage", response.responseText, 10);
                    }
                })
            }
        },
        {
            ui:"default",
            cls:"phoneButton",

            scale:"medium",
            text: "Ok",

            handler: "OkHandler"
        },
        {
            xtype: "segmentedbutton",
            bind: "{modify}",
            allowMultiple: true,
            items: [{
                ui:"default",
                cls:"phoneButton",

                text: "Modify",
                scale:"medium",
                handler: "modifyHandler",
                value: true,
                tooltip: "publish modify"
            }]
        }

    ],

    initComponent: function () {
        var me = this;
        me.title = me.sDevNodeName + " Property"

        me.callParent();
    },
    addDayDiv: function (starttime, endtime,  classList) {
        var me = this;
        var div = me.dwPars.div();
        var dw = me.dwPars.dw;
        //var starttime = dataToDate(starttime);
        //var endtime = dataToDate(endtime);
        if (starttime & endtime) {
            div.attr("starttime", starttime);
            div.attr("endtime", endtime);
            for (var i = 0; i < classList.length; i++) {
                div.addClass(classList[i]);
            }
            //div.addClass(week)
            //div.addClass("old" + week)
            //div.addClass(className)
            console.log(div)
            $(dw.el.dom).append(div)
            me.controller.weekDivAddEvent(div)
        }

    },
    items: [

        {
            xtype: 'chart',
            width: 1000,
            height: 800,
            padding: '10 0 0 0',
            store: {
                fields: ['time', 'open', 'high', 'low', 'close'],
                data: [
                    {
                        'time': "Sunday",
                        'close': 2736000000
                    },
                    {
                        'time': "Monday",
                        'close': 2730000000
                    }, {
                        'time': "Tuesday",
                        'close': 2730000000
                    }, {
                        'time': "Wednesday",
                        'close': 2726000000
                    }, {
                        'time': "Thursday",
                        'close': 2730000000
                    }, {
                        'time': "Friday",
                        'close': 2730000000
                    }, {
                        'time': "Saturday",
                        'close': 2730000000
                    }
                ]
            },

            axes: [{
                type: 'category',

                position: 'top',
                title: {
                    text: 'Week',
                    fontSize: 15
                },
                fields: 'time'
            }, {
                type: 'numeric',
                position: 'left',
                fields: 'open',
                grid: true,
                minimum: 2649600000,
                maximum: 2736000000,
                renderer: function (label, value, lastLabel) {
                    var chaTime = (2736000000 - value) + 2649600000;
                    var time = new Date(chaTime)
                    var hours = time.getHours();
                    var min = time.getMinutes();
                    var sec = time.getSeconds();
                    //return new Date(label).toLocaleTimeString();
                    return hours + ":" + min + ":" + sec;
                },
                title: {
                    text: 'Date',
                    fontSize: 15
                },
                style: {
                    axisLine: false
                }
            }],
            series: [
                {
                    type: 'bar',
                    xField: 'time',
                    id: "bar_Sec",
                    listeners: {
                        itemclick: function (series, item, event, eOpts) {
                            console.log(arguments)
                        }
                    },
                    style: {
                        width: 100
                        //margin:40
                    },
                    yField: ["close"],
                    style: {
                        fill: "steelblue"
                    }
                }
            ]
        },
        {
            xtype: "gridpanel",
            margin: 5,
            store: Ext.create('Ext.data.Store', {
                storeId: "drawWindowStore",
                groupField: 'SortWeek',
                //groupDir:"DESC",
                sortOnLoad: true,
                //fields: ["divId", 'Week', 'StartTime', 'EndTime', "level"],
                model: Ext.createByAlias("WeekModel"),
                sorters: [{
                    property: 'level',
                    direction: 'ASC'
                }, {
                    property: "timesort"
                }/*{
                 sortFn:function () {
                 console.log(arguments)
                 }
                 }*/]
            }),
            listeners: {
                boxready: function (grid) {
                }
            },
            /*features: new Ext.grid.feature.Grouping({

             groupHeaderTpl: "."||'{name}{renderedGroupValue} &nbsp;&nbsp;({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
             hideGroupedHeader: true,
             startCollapsed: true
             }),*/

            tbar: [{
                text: 'Expand All',
                hidden: true,
                handler: function () {
                    var me = this.up("gridpanel")
                    me.features[0].expandAll()
                }
            },
                {
                text: 'Collapse All',
                hidden: true,
                handler: function () {

                    var me = this.up("gridpanel")
                    me.features[0].collapseAll()
                }
            },
                {
                text: "Insert",
                handler: "insertWeek"
            }
            ],
            columnLines: true,
            rowLines: true,
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 1,
                listeners: {
                    /*edit: function (edit, context, eOpts) {
                     var me = context.grid.up("window");
                     console.log(arguments)
                     var aStarttime = context.newValues.StartTime.split(":");
                     var aEndtime = context.newValues.EndTime.split(":");
                     var starttime = new Date(1970, 1, 1, aStarttime[0], aStarttime[1], aStarttime[2]);
                     var endtime = new Date(1970, 1, 1, aEndtime[0], aEndtime[1], aEndtime[2]);
                     if (starttime > endtime) {
                     me.dwPars.drawWindowData[context.rowIdx].StartTime = context.originalValues.StartTime
                     me.dwPars.drawWindowData[context.rowIdx].EndTime = context.originalValues.EndTime
                     context.store.store.loadData(me.dwPars.drawWindowData)
                     Ext.Msg.alert('Error', 'Start time is not greater than end time .');
                     return false;
                     }
                     console.log($("#" + context.originalValues.divId))
                     $("#" + context.originalValues.divId).attr("starttime", starttime).attr("endtime", endtime)
                     //return false
                     }*/
                }
            },
            selModel: 'rowmodel',
            columns: [
                {
                    text: 'Week',
                    dataIndex: 'Week',
                    flex: 1
                },
                {
                    text: 'time', dataIndex: 'time', flex: 1
                    , editor: {
                    xtype: 'spinnerfield',
                    allowBlank: false,
                    validator: My.isTime,
                    onSpinUp: My.onSpinUp,
                    onSpinDown: My.onSpinDown
                }
                },
                {
                    text: "activation", dataIndex: 'value',
                    renderer: function (v) {
                        if (v) {
                            return 'on';
                        } else {
                            return 'off';
                        }
                    },
                    editor: {
                        xtype: 'combo',
                        store: Ext.create("Ext.data.Store", {
                            fields: ['name', 'value'],
                            data: [
                                {name: "on", value: true},
                                {name: "off", value: false}
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'value',
                    }
                },
                /*{
                 text: 'divId', dataIndex: 'divId', hidden: true
                 },
                 {
                 text: 'Week',
                 dataIndex: 'Week',
                 flex: 1
                 },
                 {
                 text: 'Start time', dataIndex: 'StartTime', flex: 1, editor: {
                 xtype: 'spinnerfield',
                 allowBlank: false,
                 validator: My.isTime,
                 onSpinUp: function () {
                 var oldValue = this.getValue().split(":");
                 var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                 time += 10000;
                 var newTime = new Date(time)
                 var H = newTime.getHours()
                 var M = newTime.getMinutes()
                 var S = newTime.getSeconds()
                 //if(newTime>2649600000&newTime<2736000000)
                 this.setValue(H + ":" + M + ":" + S);
                 },
                 onSpinDown: function () {
                 var oldValue = this.getValue().split(":");
                 var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                 time -= 10000;
                 var newTime = new Date(time)
                 var H = newTime.getHours()
                 var M = newTime.getMinutes()
                 var S = newTime.getSeconds()
                 this.setValue(H + ":" + M + ":" + S);
                 }
                 }
                 },
                 {
                 text: 'End time', dataIndex: 'EndTime', flex: 1
                 , editor: {
                 xtype: 'spinnerfield',
                 allowBlank: false,
                 validator: My.isTime,
                 onSpinUp: function () {
                 var oldValue = this.getValue().split(":");
                 var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                 time += 10000;
                 var newTime = new Date(time)
                 var H = newTime.getHours()
                 var M = newTime.getMinutes()
                 var S = newTime.getSeconds()
                 //if(newTime>2649600000&newTime<2736000000)
                 this.setValue(H + ":" + M + ":" + S);
                 },
                 onSpinDown: function () {
                 var oldValue = this.getValue().split(":");
                 var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
                 time -= 10000;
                 var newTime = new Date(time)
                 var H = newTime.getHours()
                 var M = newTime.getMinutes()
                 var S = newTime.getSeconds()
                 this.setValue(H + ":" + M + ":" + S);
                 }
                 }
                 }*/
            ]
        }
    ],
    listeners: {
        move: function (me) {
            me.fireEvent("dwParsInit");
        },
        nextHandler: "nextHandler",
        PreviousHandler: "PreviousHandler",
        dwParsInit: "dwParsInit",
        jsonToDivData: "jsonToDivData",
        boxready: "boxready",
        weekDivAddEvent: "weekDivAddEvent",
        weekDivResetPosition: "weekDivResetPosition",
        divDataToJson: "divDataToJson",
        el: {
            contextmenu: function (win, el, eOpts) {
                var me = Ext.getCmp(this.id);
                //柱子间隔 27  宽100  高625
                if (el.tagName != "CANVAS") {
                    return;
                }
                ;
                if (win.pageY < 100) {
                    return;
                }
                //console.log(me.el.getTop(true))
                var WeekArrJson = me.dwPars.WeekArrJson;
                var pageLeft = win.pageX - me.el.getLeft(true);
                for (var i = 0; i < WeekArrJson.length; i++) {
                    console.log(WeekArrJson[i].left, pageLeft)
                    if (WeekArrJson[i].left < pageLeft & WeekArrJson[i].left + 100 > pageLeft) {
                        Ext.create('Ext.menu.Menu', {
                            width: 100,
                            plain: true,
                            x: win.pageX + 5,
                            y: win.pageY + 5,
                            autoShow: true,
                            floating: true,  // usually you want this set to True (default)
                            items: [{
                                text: 'Add Time',
                                handler: function () {
                                    me.addNewBar(win)
                                }
                            }, {
                                text: "Paste Time",
                                disabled: true,
                                handler: function () {
                                    me.addNewBar(win, me.copydiv);
                                },
                                listeners: {
                                    boxready: function (menu) {
                                        console.log(me.copydiv)
                                        if (me.copydiv) {
                                            menu.setDisabled(false);
                                        }
                                    }
                                }
                            }, "-", {
                                text: "Time Value",
                                disabled: true
                            }
                            ]
                        });
                        break;
                    }

                }


                win.stopEvent();
            }
        }
    },
    addNewBar: function (eve, copydiv) {
        var win = this;
        var ShowWeekArr = win.dwPars.ShowWeekArr;
        var WeekArr = win.dwPars.WeekArrJson
        var dw = win.dwPars.dw;
        var bWidth = win.dwPars.bWidth;
        var winOffsetLeft = win.dwPars.winOffsetLeft
        var winOffsetTop = win.dwPars.winOffsetTop
        var posLeftArr = win.dwPars.posLeftArr;
        var bMarginTop = win.dwPars.bMarginTop
        var bMaxHeight = win.dwPars.bMaxHeight
        var bLeft;
        var div = win.dwPars.div()
            .css("top", eve.pageY - winOffsetTop + "px");
        //div.addClass("new")
        for (var i = 0; i < posLeftArr.length; i++) {
            if (isBarCollsion(eve.pageX, eve.pageY, posLeftArr[i] + winOffsetLeft, bMarginTop, bWidth, bMaxHeight)) {
                bLeft = posLeftArr[i];
                console.log(WeekArr[i])
                if (!WeekArr[i]) {
                    WeekArr[i] = WeekArr[6];
                }
                div.addClass(WeekArr[i].name);
                div.addClass("new" + WeekArr[i].name);
            }
        }
        if (bLeft) {
            $(dw.el.dom).append(div)
        } else {
            div.remove()
        }
        $(dw.el.dom).append(div)

        win.fireEvent("weekDivAddEvent", div);

        var tmStart = win.getTimeByLocation(parseInt(div.css("Top")) - bMarginTop);
        var tmEnd = win.getTimeByLocation(parseInt(div.css("Top")) - bMarginTop + parseInt(div.css("height")))
        if (copydiv) {
            div.attr("startTime", copydiv.attr("startTime")).attr("endTime", copydiv.attr("endTime"));
        } else {
            div.attr("startTime", tmStart).attr("endTime", tmEnd)
        }
        win.fireEvent("weekDivResetPosition", false);
    },
    getTimeByLocation: function (weizhi) {
        var me = this;
        var time = new Date(me.dwPars.oneDay * (weizhi / me.dwPars.bMaxHeight) + 2649600000);
        return time;
    },
    /* weekDivResetPosition: function (banimate) {
     var me = this;
     var WeekArrJson = me.dwPars.WeekArrJson
     var oCanvas = me.dwPars.oCanvas
     var oneDay = me.dwPars.oneDay;
     var bMarginTop = me.dwPars.bMarginTop;
     WeekArr = me.dwPars.WeekArr;
     for (var i = 0; i < WeekArr.length; i++) {
     var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
     if (dayTimeArr.length > 0) {
     for (var j = 0; j < dayTimeArr.length; j++) {
     var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
     var divStartPageY = parseInt(oCanvas.css("height")) * ((starttime - 2649600000) / oneDay);
     //$(dayTimeArr[j]).css("top", divStartPageY + bMarginTop)
     var endtime = new Date($(dayTimeArr[j]).attr("endtime"));
     var divEndPageY = parseInt(oCanvas.css("height")) * ((endtime - 2649600000) / oneDay);
     //$(dayTimeArr[j]).css("height", divEndPageY - divStartPageY + "px");
     $(dayTimeArr[j]).animate({
     top: divStartPageY + bMarginTop,
     height: divEndPageY - divStartPageY
     }, 1000)
     }
     }
     }
     var aWeeks = $(".week");
     for (var i = 0; i < aWeeks.length; i++) {
     for (var j = 0; j < WeekArrJson.length; j++) {
     if ($(aWeeks[i]).hasClass(WeekArrJson[j].name)) {
     if (banimate) {
     $(aWeeks[i]).css("left", me.dwPars.dw.el.getWidth() / 2.5);
     function randomlingdao() {
     for (var i = 0; i < 10; i++) {
     var a = (Math.random() * 2.5);
     if (a > 2 & a < 2.5) {
     return a
     }
     }
     return 2;
     }

     $(aWeeks[i]).animate({
     left: WeekArrJson[j].left
     }, 1000)
     }
     else {
     $(aWeeks[i]).css("left", WeekArrJson[j].left);
     }
     }
     }
     }

     }*/
});