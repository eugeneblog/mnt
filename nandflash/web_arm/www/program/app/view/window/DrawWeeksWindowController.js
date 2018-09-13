Ext.define('program.view.window.DrawWeeksWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-drawweekswindow',
    nextHandler: function (button) {
        $(".week").hide();
        var me = this.view
        me.fireEvent("divDataToJson")
        var store = Ext.data.StoreManager.lookup('drawWindowStore');
        store.setData(me.dwPars.drawWindowData)
        Ext.getCmp("drawWindow_previous").show()
    },
    PreviousHandler: function (button) {
        var me = this.view;
        var __this = this;
        $(".week").remove();
        Ext.getCmp("drawWindow_next").show();
        var gridjson = __this.gridDataToJson();
        me.fireEvent("dwParsInit");
        me.fireEvent("jsonToDivData", gridjson);

    },
    OkHandler: function () {
        var __this = this;
        var me = this.view;
        var viewModel = me.viewModel;
        viewModel.data["modify"]["0"] = false;
        __this.savePublish();
        me.close();
    },

    modifyHandler: function () {
        var __this = this;
        var me = this.view;
        var viewModel = me.viewModel;
        viewModel.data["modify"]["0"] = true;
        __this.savePublish();
        me.close();
    },

    savePublish: function () {
        var __this = this;
        var me = this.view;

        if (me.layout.activeItem.xtype == "gridpanel") {
            me.fireEvent("PreviousHandler");
        } else {
            me.fireEvent("nextHandler");
        }

        var oJson = __this.divDataToJson()

        console.log(oJson)

        Ext.Ajax.request({
            url: "resources/test1.php?par=changevaluenopublish&nodename=" + me.sDevNodeName + "&type=Weekly_Schedule",
            params: {
                value: Ext.encode(oJson.weekly)
            },
            success: function (response) {
                var text = response.responseText;
                delayToast("Status", "Changes saved successfully .", 1000);
            }
        });

        var instance = me.sDevNodeName.substr(0, 4);

        if (me.sDevName != getNetNumberValue()) {
            devPublish(instance + ".8.*", me.sDevNodeName + "\r\nWeekly_Schedule\r\n" + (Ext.encode(oJson.pubweekly)).replaceAll("\\s*|\t|\r|\n", ""));
        }

    },
    weekDivAddEvent: function (div) {
        var me = this.view
        div.hover(
            function () {
                var tmStart = new Date(div.attr("startTime"))
                var tmEnd = new Date(div.attr("endTime"))
                console.log(div.attr("startTime"))
                console.log(div.attr("endTime"))
                Ext.create('Ext.tip.ToolTip', {
                    target: div.attr("id"),
                    float: true,
                    trackMouse: true,
                    showDelay: 0,
                    hideDelay: 100,
                    dissmissDelay: 30000,
                    html: "StartTime:" + tmStart.toTimeString() + "<br>EndTime:&nbsp;" + tmEnd.toTimeString()
                });
            },
            function () {
            }
        );
        div.contextmenu(function (e) {
            e.stopPropagation()
            Ext.create('Ext.menu.Menu', {
                width: 100,
                plain: true,
                x: e.pageX,
                y: e.pageY,
                autoShow: true,
                floating: true,  // usually you want this set to True (default)
                items: [
                    {
                        text: "Copy Time",
                        handler: function () {
                            me.copydiv = div;

                        }
                    }, {
                        text: 'Delete Time',
                        handler: function () {
                            div.remove()
                        }
                    }
                ]
            });
            return false;
        })

        Ext.create("Ext.resizer.Resizer", {
            target: div[0],
            handles: 'n,s',
            maxHeight: me.dwPars.bMaxHeight,
            minHeight: 1,
            //constrainTo:th.id,
            pinned: true,
            listeners: {
                resize: function (th, width, height, e, eOpts) {
                    console.log(th)
                    var dayDiv = th.el.dom;
                    var classList = dayDiv.className.split(' ');
                    dayDiv.className = classList.map(function (v, index) {
                        if (v.substr(0, 3) == 'old') {
                            return 'new' + v.substr(3, v.length);
                        } else {
                            return v;
                        }
                    }).join(' ')

                    var tmStart = me.getTimeByLocation(parseInt(div.css("Top")) - me.dwPars.bMarginTop);
                    var tmEnd = me.getTimeByLocation(parseInt(div.css("Top")) - me.dwPars.bMarginTop + parseInt(div.css("height")))
                    div.attr("startTime", tmStart).attr("endTime", tmEnd)
                    var top = th.el.getTop(true)
                    if (top < me.dwPars.bMarginTop) {
                        th.el.setTop(me.dwPars.bMarginTop + "px")
                    }
                    var bt = height + top;
                    if (bt > me.dwPars.bMarginTopHeight) {
                        var cha = bt - me.dwPars.bMarginTopHeight;
                        th.el.setTop(top - cha);

                    }
                }
            }
        })
    },

    weekDivResetPosition: function (banimate) {
        var me = this.view;
        var WeekArrJson = me.dwPars.WeekArrJson;
        var oCanvas = me.dwPars.oCanvas;
        var oneDay = me.dwPars.oneDay;
        var bMarginTop = me.dwPars.bMarginTop;
        var ShowWeekArr = me.dwPars.ShowWeekArr;
        var WeekArr = me.dwPars.WeekArr;
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

    },
    /**
     * @Deprecated
     * 这个方法已经过时 新的方法 {@link divDataToJson}
     * @return {{weekly: {Weekly_Schedule: {}}, pubweekly: {Weekly_Schedule: {}}}}
     */
    getDivData: function () {
        var me = this;
        var weekly = {
            "Weekly_Schedule": {}
        }
        var pubweekly = {
            "Weekly_Schedule": []
        }
        me.dwPars.drawWindowData = []
        var WeekArr = me.dwPars.WeekArr

        for (var i = 0; i < WeekArr.length; i++) {
            //console.log(this.up("window").el.dom.getElementsByClassName(WeekArr[i]))
            var dayTimeArr = document.querySelectorAll("." + WeekArr[i]);
            var newWeeks = document.querySelectorAll(".new" + WeekArr[i]);
            var oldWeeks = document.querySelectorAll(".old" + WeekArr[i]);

            var isPubWeek = !(oldWeeks.length == me.dwPars.WeekArrJson[i].oldCount)
            if (newWeeks.length > 0) {
                isPubWeek = true;
            }
            console.info(isPubWeek)
            weekly.Weekly_Schedule[WeekArr[i]] = []
            var pubTimeArr = []
            pubweekly.Weekly_Schedule.push({
                day: i + 1,
                value: pubTimeArr
            })
            if (dayTimeArr.length > 0) {
                //pubweekly.Weekly_Schedule[WeekArr[i]] = []
                for (var j = 0; j < dayTimeArr.length; j++) {
                    console.log(dayTimeArr)
                    var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
                    var endtime = new Date($(dayTimeArr[j]).attr("endtime"));
                    var sH = starttime.getHours()
                    var sM = starttime.getMinutes()
                    var sS = starttime.getSeconds()
                    var eH = endtime.getHours()
                    var eM = endtime.getMinutes()
                    var eS = endtime.getSeconds()
                    //将grid数据装入
                    me.dwPars.drawWindowData.push({
                        divId: dayTimeArr[j].id,
                        SortWeek: (i + 1) + "_" + WeekArr[i],
                        Week: WeekArr[i],
                        StartTime: sH + ":" + sM + ":" + sS,
                        EndTime: eH + ":" + eM + ":" + eS
                    })

                    if (isPubWeek) {
                        pubTimeArr.push(
                            {
                                time: {
                                    "hour": sH,
                                    "minute": sM,
                                    "second": sS,
                                    "hundredths": 1
                                },
                                value: true
                            }, {
                                time: {
                                    "hour": eH,
                                    "minute": eM,
                                    "second": eS,
                                    "hundredths": 1
                                },
                                value: false
                            }
                        )
                    }

                    weekly.Weekly_Schedule[WeekArr[i]].push(
                        {
                            time: {
                                "hour": sH,
                                "minute": sM,
                                "second": sS,
                                "hundredths": 1
                            },
                            value: true
                        }, {
                            time: {
                                "hour": eH,
                                "minute": eM,
                                "second": eS,
                                "hundredths": 1
                            },
                            value: false
                        }
                    )
                }
            }

            if (pubTimeArr.length == 0) {
                pubweekly.Weekly_Schedule.pop()
            }
        }

        //console.log(pubweekly)
        //console.log(Ext.encode(pubweekly))
        console.log(Ext.encode(weekly))

        return {weekly: weekly, pubweekly: weekly};

    },
    /**
     * 表格数据转换成JSON
     * @return {{Weekly_Schedule: {}}}
     */
    gridDataToJson: function () {
        var me = this.view;
        var store = Ext.data.StoreManager.lookup('drawWindowStore');
        var WeekArr = me.dwPars.WeekArr;
        var weekly = {
            "Weekly_Schedule": {}
        }
        for (var i = 0; i < WeekArr.length; i++) {
            var dayArr = [];
            var days = store.queryRecords('Week', WeekArr[i]);
            for (var j = 0; j < days.length; j++) {
                console.log(days[j])
                var dayData = days[j].data;
                var times = dayData.time.split(":");
                var obj = {
                    dirty: days[j].dirty,
                    "time": {
                        "hour": Number(times[0]),
                        "minute": Number(times[1]),
                        "second": Number(times[2]),
                        "hundredths": 1
                    },
                    "value": dayData.value
                };
                dayArr.push(obj);
            }
            weekly["Weekly_Schedule"][WeekArr[i]] = dayArr;
        }
        console.log(weekly)
        return weekly;
    },
    /**
     * 这个方法用来将 div 转成 数据
     * @return {{weekly: {Weekly_Schedule: {}}, pubweekly: {Weekly_Schedule: {}}}}
     */
    divDataToJson: function () {
        var me = this.view;
        var viewModel = me.viewModel;
        //console.log(viewModel)

        var isModify = viewModel.data["modify"]["0"]
        var weekly = {
            "Weekly_Schedule": {}
        }
        var pubweekly = {
            "Weekly_Schedule": []
        }
        me.dwPars.drawWindowData = [];
        var showWeekArr = me.dwPars.WeekArr;
        //var showWeekArr = me.dwPars.ShowWeekArr;
        console.log(showWeekArr)
        for (var i = 0; i < showWeekArr.length; i++) {
            //console.log(this.up("window").el.dom.getElementsByClassName(showWeekArr[i]))
            var iNumber = i;
            /*if (iNumber > showWeekArr.length) {
             iNumber=0;
             }*/
            var dayTimeArr = document.querySelectorAll("." + showWeekArr[iNumber]);
            weekly.Weekly_Schedule[showWeekArr[iNumber]] = [];

            var pubTimeArr = [];

            pubweekly.Weekly_Schedule.push({
                day: iNumber + 1,
                value: pubTimeArr
            })

            if (dayTimeArr.length > 0) {
                for (var j = 0; j < dayTimeArr.length; j++) {
                    var starttime = new Date($(dayTimeArr[j]).attr("starttime"));
                    var endtime = new Date($(dayTimeArr[j]).attr("endtime"));
                    var sH = starttime.getHours();
                    var sM = starttime.getMinutes();
                    var sS = starttime.getSeconds();
                    var eH = endtime.getHours();
                    var eM = endtime.getMinutes();
                    var eS = endtime.getSeconds();
                    //var weekhide = true;
                    var isOldDay = dayTimeArr[j].className.includes("old")

                    var isWeekHide = dayTimeArr[j].className.indexOf('weekhide') >= 0;
                    //将grid数据装入
                    me.dwPars.drawWindowData.push({
                        Week: showWeekArr[iNumber],
                        hours: sH,
                        minutes: sM,
                        seconds: sS,
                        time: sH + ":" + sM + ":" + sS,
                        value: !isWeekHide
                    });
                    me.dwPars.drawWindowData.push({
                        Week: showWeekArr[iNumber],
                        hours: eH,
                        minutes: eM,
                        seconds: eS,
                        time: eH + ":" + eM + ":" + eS,
                        value: false
                    });


                    pubTimeArr.push(
                        {
                            time: {
                                "hour": sH,
                                "minute": sM,
                                "second": sS,
                                "hundredths": 1
                            },
                            value: true
                        }, {
                            time: {
                                "hour": eH,
                                "minute": eM,
                                "second": eS,
                                "hundredths": 1
                            },
                            value: false
                        }
                    )


                    if (isModify & isOldDay) {
                        pubTimeArr.pop();
                        pubTimeArr.pop();
                    }

                    weekly.Weekly_Schedule[showWeekArr[iNumber]].push(
                        {
                            time: {
                                "hour": sH,
                                "minute": sM,
                                "second": sS,
                                "hundredths": 1
                            },
                            value: !isWeekHide
                        }, {
                            time: {
                                "hour": eH,
                                "minute": eM,
                                "second": eS,
                                "hundredths": 1
                            },
                            value: false
                        }
                    )

                }

            }

        }

        //console.log(pubweekly)
        //console.log(Ext.encode(pubweekly))
        //console.log(me.dwPars.drawWindowData)
        //console.log(Ext.encode(weekly))
        for (var i = 0; i < showWeekArr.length; i++) {
            var hArr = weekly.Weekly_Schedule[showWeekArr[i]];
            if (hArr.length > 0) {
                var hArr = hArr.sort(function (a, b) {
                    var d1 = new Date(1970, 1, 1, a.time.hour, a.time.minute, a.time.second).getTime();
                    var d2 = new Date(1970, 1, 1, b.time.hour, b.time.minute, b.time.second).getTime();
                    return d1 - d2;
                })
                weekly.Weekly_Schedule[showWeekArr[i]] = hArr
            }
        }
        return {weekly: weekly, pubweekly: pubweekly};
    },
    /**
     * 这个方法用来将数据转换成变成div
     * 传入一个数据自动清理之前的div
     * @param  {JSON} d JSON数据
     */
    jsonToDivData: function (d) {
        console.log(d)
        var me = this.view;
        var __this = this;
        var WeekArr = me.dwPars.WeekArr;
        for (var i = 0; i < WeekArr.length; i++) {
            var dweek = d['Weekly_Schedule'][WeekArr[i]];
            if (dweek) {
                var startTimes = dweek.filter(function (v) {
                    return v.value;
                }).sort(sortDate)
                var endTimes = dweek.filter(function (v) {
                    return !v.value
                }).sort(sortDate)
                console.log(startTimes)
                console.log(endTimes)
                var j = 0;
                var weekstr = WeekArr[i];
                for (; j < startTimes.length; j++) {

                    var isoldWeek = "old" + weekstr;

                    if (!!startTimes[j] & !!endTimes[j]) {
                        if (startTimes[j].dirty || endTimes[j].dirty) {
                            isoldWeek = "new" + weekstr;
                        }
                    }
                    me.addDayDiv(dataToDate(startTimes[j]), dataToDate(endTimes[j]), [weekstr, isoldWeek])
                }
                //on 减去 off 的时间剩余的off时间
                var hideTimes = endTimes.slice(startTimes.length, endTimes.length);
                for (j = 0; j < hideTimes.length; j += 2) {

                    var isoldWeek = "old" + weekstr;
                    if (!!startTimes[j] & !!endTimes[j]) {
                        if (startTimes[j].dirty || endTimes[j].dirty) {
                            isoldWeek = "new" + weekstr;
                        }
                    }
                    me.addDayDiv(dataToDate(hideTimes[j]), dataToDate(hideTimes[j + 1]), [weekstr, "weekhide", isoldWeek])
                }
            }
        }
        function dataToDate(data) {
            if (data) {
                return new Date(1970, 1, 1, data.time.hour, data.time.minute, data.time.second);
            } else {
                return false;
            }
        }

        __this.weekDivResetPosition(true);
        function sortDate(d1, d2) {
            var a1 = dataToDate(d1);
            var a2 = dataToDate(d2);
            return a1.getTime() > a2.getTime();
        }


    },

    drawWindowAddDiv: function (d) {
        this.jsonToDivData(d);
        /*return
         var me = this;
         var WeekArr = me.dwPars.WeekArr
         var dw = me.dwPars.dw;
         for (var i = 0; i < WeekArr.length; i++) {
         var dweek = d['Weekly_Schedule'][WeekArr[i]];
         if (dweek) {
         for (var j = 0; j < dweek.length; j += 2) {

         var div = me.dwPars.div()
         div.addClass(WeekArr[i])
         div.addClass("old" + WeekArr[i]);
         me.dwPars.WeekArrJson[i].oldCount = dweek.length / 2
         var starttime = new Date(1970, 1, 1, dweek[j].time.hour, dweek[j].time.minute, dweek[j].time.second)
         var endtime = new Date(1970, 1, 1, dweek[j + 1].time.hour, dweek[j + 1].time.minute, dweek[j + 1].time.second)
         div.attr("starttime", starttime)
         div.attr("endtime", endtime)
         div.addClass(WeekArr[i])
         $(dw.el.dom).append(div)
         me.controller.weekDivAddEvent.call(me, div)
         }
         }
         }
         me.controller.weekDivResetPosition.call(me, true)

         console.log(d)*/
    },
    /**
     * 这个方法用来 初始化
     */
    dwParsInit: function (canvasLength) {
        var me = this.view;
        var __this = this;
        if (me.el.dom.querySelectorAll("canvas").length < 5) {
            return;
        }

        me.dwPars = (function () {
            var drawWindowData = []
            var WeekArr = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            var ShowWeekArr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            var WeekArrJson = [
                {name: "monday", left: "", oldCount: 0},
                {name: "tuesday", left: "", oldCount: 0},
                {name: "wednesday", left: "", oldCount: 0},
                {name: "thursday", left: "", oldCount: 0},
                {name: "friday", left: "", oldCount: 0},
                {name: "saturday", left: "", oldCount: 0},
                {name: "sunday", left: "", oldCount: 0}];
            var dw = me;
            var oCanvas = $(dw.el.dom.querySelectorAll("canvas")[4]);
            var oneDay = 86400000;
            var bWidth = 100;
            var winOffsetLeft = dw.el.getLeft(true);
            var winOffsetTop = dw.el.getTop(true);
            var bMarginLeft = oCanvas.offset().left - winOffsetLeft;
            var bMaxWidth = oCanvas.attr("width");
            var interval = (bMaxWidth - bWidth * WeekArr.length) / 7;
            var bMarginTop = oCanvas.offset().top - winOffsetTop - 6;
            var startPoint = bMarginLeft + interval / 2 - 6;
            var posLeftArr = [];
            posLeftArr.push(startPoint)

            WeekArrJson[0]['left'] = startPoint;
            var __startPoint = startPoint;
            for (var i = 0; i < 7; i++) {

                var weekleft = Math.ceil(startPoint += bWidth + interval);
                posLeftArr.push(weekleft)
                if (i < 6) {
                    WeekArrJson[i + 1]['left'] = weekleft;
                }
            }
            posLeftArr.push(posLeftArr.shift())
            console.log(posLeftArr)
            for (var i = 0; i < WeekArrJson.length; i++) {
                WeekArrJson[i].left = posLeftArr[i]
            }
            WeekArrJson[6].left = __startPoint

            console.log(WeekArrJson)
            var bMaxHeight = oCanvas.attr("height");
            var bMarginTopHeight = parseInt(bMarginTop) + parseInt(bMaxHeight);

            function newDiv() {
                var div = $("<div></div>")
                div.css("width", "100px")
                    .css("height", "20px")
                    .css("backgroundColor", "rgba(91,164,60,1)")
                    .css("zIndex", "9")
                    .css("position", "absolute")
                    .addClass("week")
                    .attr("id", "bar" + Math.floor(Math.random() * 100000000000000))
                return div;
            }

            var e = {
                ShowWeekArr: ShowWeekArr,
                WeekArrJson: WeekArrJson,
                dw: dw,
                oCanvas: oCanvas,
                oneDay: oneDay,
                bWidth: bWidth,
                winOffsetLeft: winOffsetLeft,
                winOffsetTop: winOffsetTop,
                bMarginLeft: bMarginLeft,
                bMaxWidth: bMaxWidth,
                interval: interval,
                bMarginTop: bMarginTop,
                startPoint: startPoint,
                posLeftArr: posLeftArr,
                bMaxHeight: bMaxHeight,
                bMarginTopHeight: bMarginTopHeight,
                div: newDiv,
                WeekArr: WeekArr,
                drawWindowData: drawWindowData
            }
            console.log(e)
            return e;
        })()
    },
    boxready: function () {
        var me = this.view;
        var __this = this;
        var canIntval = setInterval(isCanvasRender, 1)

        function isCanvasRender() {
            var canvasLength = me.el.dom.querySelectorAll("canvas").length;
            if (canvasLength > 4) {
                //me.controller.dwParsInit.call(me)
                //me.fireEvent("dwParsInit")
                __this.dwParsInit(canvasLength)
                clearInterval(canIntval)
                Ext.MessageBox.progress('Message', {msg: 'Server Ready ...'});
                var count = 0;
                var interval_0 = setInterval(function () {
                    Ext.MessageBox.updateProgress(count / 9, 'Loading,please wait... ');
                    count++
                    if (count == 10) {
                        clearInterval(interval_0)
                        Ext.MessageBox.close();
                        myAjax("resources/test1.php?par=getvalue&nodename=" + me.sDevNodeName + "&type=Weekly_Schedule", function (response) {
                            try {
                                var text = Ext.decode(response.responseText);

                                if (text) {
                                    __this.jsonToDivData(text)
                                }
                            } catch (e) {
                                Ext.Msg.alert('Error', 'load data failure .');
                                throw e;
                            }
                        })
                    }
                }, 100)
            }
        }
    },
    insertWeek: function () {
        var me = this.view;
        var gridPanel = this.view.down("gridpanel")

        var win = Ext.create('Ext.window.Window', {
                title: "insert",
                autoShow: true,
                buttons: [
                    {
                        text: "Ok", handler: function () {
                        var wm0 = Ext.createByAlias("WeekModel");
                        var wm1 = Ext.createByAlias("WeekModel");

                        var form = win.down("form")
                        var values = form.getValues()
                        wm0.set("Week", values.Week)
                        wm0.set("time", values.startTime)
                        wm0.set("value", values.startActivation)
                        wm1.set("Week", values.Week)
                        wm1.set("time", values.endTime)
                        wm1.set("value", values.endActivation)
                        console.log(wm0, wm1)
                        //gridPanel.store.add([wm0, wm1])
                        gridPanel.store.add(wm0)
                        delayToast("Massage", "Insert Ok .")
                    }
                    },
                    {
                        text: "Close", handler: function () {
                        win.close();
                    }
                    }
                ],
                items: {
                    xtype: "form",
                    defaults: {
                        margin: 10,
                        editable: false

                    },
                    scrollable: "y",
                    listeners: {
                        boxready: function (form) {
                            //var mm = Ext.createByAlias("MonitorModel")
                            //form.loadRecord(mm)
                        }
                    },
                    items: [
                        {
                            xtype: "combo",
                            name: "Week",
                            store: me.dwPars.WeekArr,
                            allowBlank: false,
                            fieldLabel: "week",
                            value: "monday",
                        },
                        {
                            xtype: 'spinnerfield',
                            name: "startTime",
                            fieldLabel: "start time",
                            allowBlank: false,
                            validator: My.isTime,
                            value: "0:0:1",
                            onSpinUp: My.onSpinUp,
                            onSpinDown: My.onSpinDown,
                            editable: true
                        },
                        {
                            xtype: 'combo',
                            name: "startActivation",
                            fieldLabel: "activation",
                            store: Ext.create("Ext.data.Store", {
                                fields: ['name', 'value'],
                                data: [
                                    {name: "on", value: true},
                                    {name: "off", value: false}
                                ]
                            }),
                            displayField: 'name',
                            valueField: 'value',
                            autoSelect: true,
                            listeners: {
                                render: function (field) {
                                    console.log(field)
                                    field.setValue(field.store.getAt(1))
                                }
                            }
                        },
                        {
                            xtype: 'spinnerfield',
                            name: "endTime",
                            fieldLabel: "end time",
                            allowBlank: false,
                            validator: My.isTime,
                            value: "23:59:59",
                            onSpinUp: My.onSpinUp,
                            onSpinDown: My.onSpinDown,
                            editable: true,
                            hidden: true
                        },
                        {
                            xtype: 'combo',
                            name: "endActivation",
                            fieldLabel: "activation",
                            store: Ext.create("Ext.data.Store", {
                                fields: ['name', 'value'],
                                data: [
                                    {name: "on", value: true},
                                    {name: "off", value: false}
                                ]
                            }),
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                render: function (field) {
                                    console.log(field)
                                    field.setValue(field.store.getAt(1))
                                }
                            },
                            hidden: true

                        }
                    ]
                }
            })
            ;


    }
});

function testNumAdd() {
    var num = 50;
    var all = 0;
    for (var i = 0; i < 652; i++) {
        num += 50
        all += num;
    }
    //10676500/50/18/60/24 每只50经验 一分钟18  8天完成
    console.log(all)
}