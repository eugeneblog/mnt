var hideCom;


Ext.define('program.view.grid.TypeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-typegrid',

    render1: function (th) {
        var plant = getCurrentPlant();
        if (!plant) {
            Ext.Msg.alert("Exception", "please choose one plant.")
            //th.close()
            th.destroy()
            return;
        }

        var gridWidth = 90;

        th.getHeader().on({

            click: function () {
                console.log(this.getWidth() == gridWidth)
                var curGridWidth = this.getWidth();
                var setWidth;
                var desWidth=180;
                if (th.title.length * 13 > desWidth) {
                    setWidth = th.title.length * 13
                } else {
                    setWidth = desWidth
                }
                if (this.getWidth() == gridWidth) {
                    th.animate({
                        to: {
                            //width: (th.title.length * 13 < gridWidth ) ? gridWidth : th.title.length * 13
                            width: (curGridWidth < setWidth ) ? setWidth : gridWidth
                            //height: (th.getHeight() == 300) ? 400 : 300,
                        }
                    });
                } else {
                    th.animate({
                        to: {
                            width: gridWidth
                            //height: (th.getHeight() == 300) ? 400 : 300,
                        }
                    });
                }
            }
        })

    },
    boxready: function (panel) {

        panel.store.addListener("beginupdate", function () {
            //console.log("beginupdate")
            setTimeout(function () {

                var containerHeight = Ext.get(panel.body.dom.querySelector(".x-grid-item-container")).getHeight();
                var gridheight = containerHeight + panel.header.getHeight();
                if (panel.getHeight() != gridheight) {
                    panel.setHeight(gridheight);
                }
                currentDrawPanelGridPanelsTrSetId()
            }, 1000)
        })
    },
    girdviewready: function (panel, eO) {


        if (panel.datas.type == 67) {

            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {'name': 'P', 'value': "15"},
                    {'name': 'I', 'value': "0.1"},
                    {'name': 'D', 'value': "0.01"},
                    {'name': 'Extime', 'value': "40"},
                    {'name': 'Max', 'value': "100"},
                    {'name': 'Min', 'value': "0"}
                ], listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        ;


        if (panel.datas.type == 74) {
            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {name: "Empirical coefficient(K)", value: "0.7069"},
                    {name: "Pipe diameter(D)", value: "0.63"}
                ],
                listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        ;


        if (panel.datas.type == 75) {
            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {'name': 'In min', 'value': "0"},
                    {'name': 'In max', 'value': "100"},
                    {'name': 'out min', 'value': "20"},
                    {'name': 'out max', 'value': "400"}
                ],
                listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        ;

        if (panel.datas.type == 80) {
            Ext.create('Ext.data.Store', {
                storeId: "store" + panel.getId(),
                fields: ['name', 'value'],
                data: panel.datas.propertyStore || [
                    {'name': 'time', 'value': "110"},
                ],
                listeners: {
                    update: function (me, record, operation, modifiedFieldNames, details, eOpts) {
                        panel.datas.propertyStore = getStoreDatas(me);
                    }
                }
            });
        }
        if (panel.datas.type == "56") {
            //var typeGirdName = this.getTitle();
            var store = panel.store//Ext.data.StoreManager.lookup("store" + _this.id);

            store.addListener("beginupdate", function () {
                var gridheight = Ext.get(panel.body.dom.querySelector(".x-grid-item-container")).getHeight() + panel.header.getHeight()
                if (panel.getHeight() != gridheight) {
                    panel.setHeight(gridheight)
                }
            })
            var win = Ext.create('Ext.window.Window', {
                title: 'logic Property',
                id: "win" + panel.id,
                width: 420,
                height: 300,
                layout: 'border',
                listeners: {
                    beforeclose: function (th) {
                        win.hide()
                        return false
                    }
                },
                buttons: [
                    {
                        text: "Ok", handler: function (menu) {
                        //Ext.data.StoreManager.lookup("store" + _this.id).commitChanges();
                        //store.commitChanges();
                        delayToast('Status', 'Changes saved successfully.');
                        win.hide();
                    }
                    }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'right',
                    margin: 0,
                    items: [
                        {
                            xtype: "component",
                            html: "Add solts"
                        }, {
                            xtype: "button",
                            text: "+", handler: function () {
                                var store = panel.getStore();
                                if (store.data.length > 9) {
                                    Ext.Msg.alert('Info', 'Cannot add slot.');
                                    return
                                }

                                store.add({
                                    name: "In",
                                    delay: "0",
                                    time: "0",
                                    value: "0",
                                    time1: "0",
                                    time2: "0",
                                    time3: "0",
                                    time4: "0",
                                    time5: "0",
                                    time6: "0",
                                    time7: "0",
                                    time8: "0",
                                    time9: "0"
                                });
                                var grid = win.down("grid");
                                joinRow0(grid)
                            }
                        }, {
                            xtype: "button",
                            text: "-", handler: function () {
                                if (store.data.length <= 2) {
                                    Ext.Msg.alert('Info', 'Cannot delete slot.');
                                    return
                                }

                                store.removeAt(store.data.length - 1)
                                var grid = win.down("grid");
                                joinRow0(grid)
                                //store.commitChanges()
                            }
                        }, {xtype: "component", html: "Add list"}, {
                            xtype: "button",
                            text: "+", handler: function () {
                                var grid = win.down("grid");
                                var columns = grid.getColumns();

                                for (var i = 0; i < columns.length; i++) {
                                    if (columns[i].hidden) {
                                        console.log(columns[i])
                                        columns[i].show()
                                        joinRow0(grid)
                                        return;
                                    }
                                }
                                Ext.Msg.alert('Exception', 'Cannot add list.');
                                //console.log(grid.getViewModel())

                            }
                        }, {
                            xtype: "button",
                            text: "-", handler: function () {
                                var grid = win.down("grid");
                                var columns = grid.getColumns();
                                for (var i = columns.length - 1; i >= 4; i--) {
                                    if (!columns[i].hidden) {
                                        columns[i].hide()
                                        joinRow0(grid)
                                        return
                                    }
                                }
                                Ext.Msg.alert('Exception', 'Cannot delete list.');
                            }
                        }
                    ]
                }],
                items: {  // Let's put an empty grid in just to illustrate fit layout
                    region: "center",
                    xtype: 'logicgridpanel',
                    store: store
                }
            });
        }


        if (!panel.datas.plantId) {
            var plant = getCurrentPlant()
            panel.datas.plantId = plant.id
        }

        currentDrawPanelGridPanelsTrSetId();
        var oHead = panel.getHeader().el.dom;
        oHead.onmousedown = function (e) {

            //console.log(e)
            //panel.data = {x: ( e.x - e.layerX), y: (e.y - e.layerY)}
            panel.data = {x: panel.getX(), y: panel.getY()}
        }
        oHead.oncontextmenu = function (e) {

            panel.add(
                Ext.create('program.view.grid.menu.gridmenu', {
                    x: e.pageX + 5,
                    y: e.pageY,
                    listeners: {
                        show: function (menu, eOpts) {
                            var isAddSlot = panel.datas.isAddSlot;
                            if (isAddSlot) {
                                var addSlot = menu.getComponent("addSlot").on("click", menu.getController().addSlotclick, panel);
                                addSlot.setDisabled(false);
                            }
                            menu.getComponent("LinkMark").setDisabled(false);
                            if (getCurrentDrawPanel().datas.LinkMarkTypeGrid) {
                                var linkform = menu.getComponent("LinkForm");
                                linkform.setDisabled(false);
                                linkform.setText("Link Form \"" + getCurrentDrawPanel().datas.LinkMarkTypeGrid.getTitle() + "\"")
                            }
                            changeTitle(panel, menu);

                            /*isPidMenu(panel, menu);
                             isLogicMenu(panel, menu);
                             isSCFMMenu(panel, menu);
                             isScaleMenu(panel, menu);
                             isdoubleBOMenu(panel,menu)*/
                            isTypeGridProperty(panel, menu);

                            menu.getComponent("cut").setDisabled(false);
                            menu.getComponent("copy").setDisabled(false);
                            menu.getComponent("deplicate").setDisabled(false);
                            menu.getComponent("delete").setDisabled(false);
                        }
                    }
                })
            )
            return false;
            //console.log(arguments)
        };
    },

    girdmove: function (t, x, y, eOpts) {

        var grids = getCurrentPlantGridPanles(getCurrentPlant())
        var isColls2 = false;
        for (var i = 0; i < grids.length; i++) {
            if (t.id == grids[i].id) {
                continue
            }
            var isColls = isCollsionWithRect(t, grids[i]);
            if (isColls) {
                isColls2 = true
                //t.setX(t.data.x)
                //t.setY(t.data.y)
                //t.x= t.data.x
                //t.y= t.data.y
                t.setPagePosition(t.data.x += 5, t.data.y += 5, false)
            }
        }
        if (!isColls2) {
            drawlines();
        }
        if ((x < 0 || y < 0) & !t.getActiveAnimation()) {
            t.setPagePosition(t.data.x += 5, t.data.y += 5, false)
            //t.setX(t.data.x)
            //t.setY(t.data.y)
            // t.x= t.data.x
            // t.y= t.data.y
        }
        function isCollsionWithRect(data1, data2) {
            var x1 = data1.getX();
            var y1 = data1.getY();
            var w1 = data1.getWidth();
            var h1 = data1.getHeight();
            var x2 = data2.getX() - My.JIANGE * 3;
            var y2 = data2.getY() - My.JIANGE * 3;
            var w2 = data2.getWidth() + My.JIANGE * 3 * 2;
            var h2 = data2.getHeight() + My.JIANGE * 3 * 2;

            if (x1 >= x2 && x1 >= x2 + w2) {
                return false;
            } else if (x1 <= x2 && x1 + w1 <= x2) {
                return false;
            } else if (y1 >= y2 && y1 >= y2 + h2) {
                return false;
            } else if (y1 <= y2 && y1 + h1 <= y2) {
                return false;
            }
            return true;
        }
    }
    ,
    render: function (th) {
        alert("render")
    }
    ,
    griditemclick: function (me) {
        console.log(arguments)
        console.info(this.index);
    },
    girditemdblclick: function (me, record, item, index, e, eopts) {
        console.log(arguments)
        var gridPanel = this.view;
        var dataName = record.data.name;
        if (dataName == "Out" || dataName == "open" || dataName == 'close') {
            return;
        }

        var win = Ext.create("Ext.window.Window", {
            title: "ChangeValue",
            width: 260,
            height: 150,
            layout: "fit",
            autoShow: true,
            listeners: {
                activate: function () {
                    // win.down("form").loadRecord(record);
                },
                render: function () {
                    //   win.down("form").loadRecord(record);
                },
                show: function (th) {
                    th.down("form").add({xtype: "textfield", name: "name", fieldLabel: "name", editable: false});
                    if (record.data.select) {
                        var store = Ext.create('Ext.data.Store', {
                            fields: ['name'],
                            data: record.data.select
                        });
                        th.down("form").add({
                            xtype: "combobox",
                            name: "value",
                            fieldLabel: "type",
                            forceSelection: true,
                            store: store,
                            editable: false,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'name'
                        });
                    } else {
                        if (gridPanel.datas.type == '79' & index == 2) {
                            th.down("form").add({
                                xtype: "combo",
                                name: "value",
                                fieldLabel: "value",
                                editable: false,
                                store: [1, 2, 3, 4, 5, 6, 7, 8],
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        if (newValue > gridPanel.store.getCount() - 3) {
                                            Ext.Msg.alert("Massage", "Value cannot be greater than " + (gridPanel.store.getCount() - 3))
                                            field.setValue(oldValue)
                                        }

                                    }
                                }
                            });
                            return;
                        }
                        if (gridPanel.datas.type == '73' & index == 1) {
                            th.down("form").add({
                                xtype: "combo",
                                name: "value",
                                fieldLabel: "value",
                                editable: false,
                                store: [1, 2, 3, 4, 5, 6, 7, 8],
                                listeners: {
                                    change: function (field, newValue, oldValue) {
                                        if (newValue > gridPanel.store.getCount() - 2) {
                                            Ext.Msg.alert("Massage", "Value cannot be greater than " + (gridPanel.store.getCount() - 3))
                                            field.setValue(oldValue)
                                        }

                                    }
                                }
                            });
                            return;
                        }
                        th.down("form").add({xtype: "textfield", name: "value", fieldLabel: "value"});
                    }
                }
            },
            items: {
                xtype: "form",
                margin: 5,
                border: false,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 60
                }
                /*,
                 items: [
                 {xtype: "textfield", name: "name", fieldLabel: "type"},
                 /!*{ xtype: "numberfield", name: "age", fieldLabel: "年龄" ,maxValue: 3,  minValue: 0 },*!/
                 {xtype: "textfield", name: "value", fieldLabel: "value"}
                 ]*/
            },
            buttons: [
                {
                    text: "OK", handler: function () {
                    win.down("form").updateRecord();
                    record.commit();
                    win.close();
                }
                }
            ]
        });
        win.show();
        win.down("form").loadRecord(record);
        // console.log(arguments)
    }
    ,

    griditemmousedown: function (th, record, item, index, el, e, eOpts) {
        /*console.log(th.up())
         console.log(arguments)*/
        console.log("鼠标按下")
    }
    ,
    griditemmouseleave: function () {
        console.log("鼠标移出")
    }
    ,
    griditemmouseenter: function (th, record, item, index, e, eOpts) {
        //console.log(arguments)
        /*
         Ext.tip.QuickTipManager.register({
         target:th.id,
         title:th.index,
         text:th.index,
         width:100,
         height:100
         })*/

        d3.select("#tempLineEnd").remove();
        initDrawLine(th.up("drawpanel"), th, record, item, index, e, eOpts)
    }
    ,
    griditemmouseup: function (item, record, itemHtml, index, e, eOpts) {

        console.log(this)
        var me = this.view;
        console.log(arguments)
        //me.datas.index = index// = {"index": index}

        me.el.dom.oncontextmenu = function (eve) {
            return false;
        }
        if (e.button == 2) {
            me.add(
                Ext.create('program.view.grid.menu.gridmenu', {
                    x: e.pageX + 10,
                    y: e.pageY + 10,
                    listeners: {
                        show: function (menu, eOpts) {
                            var gridTitle = me.datas.title || getNameByType(me.datas.type);


                            d3.select(menu.el.dom).attr("data-targetid", d3.select(itemHtml).attr("data-targetid"));

                            if (record.data.name == "In") {

                                if (me.store.data.length > slotsJson[gridTitle].initData().length) {
                                    var delSlot = menu.getComponent("delSlot").on("click", menu.getController().delSlotclick, me);
                                    delSlot.setDisabled(false);
                                }
                            }

                            if (me.datas.type > 10) {
                                var title = gridTitle;
                                if (slotsJson[title].isAddSlot) {
                                    var addSlot = menu.getComponent("addSlot").on("click", menu.getController().addSlotclick, me);
                                    addSlot.setDisabled(false);
                                }
                            }

                            isTypeGridProperty(me, menu);

                            menu.getComponent("cut").setDisabled(false);
                            menu.getComponent("copy").setDisabled(false);
                            menu.getComponent("deplicate").setDisabled(false);
                            menu.getComponent("delete").setDisabled(false);

                        }
                    }
                })
            )
        }
        console.log("鼠标抬起")
        e.stopEvent()
        e.stopPropagation()
    }
    ,
    griditemcontextmenu: function (th, td, cellIndex, tr, rowIndex, e, eOpts) {
        alert("griditemcontextmenu")
    }
});

function changeTitle(girdpanel, menu) {
    if (girdpanel.datas.type > 6) {
        menu.getComponent("Rename").setDisabled(false);
    }
}


function isTypeGridProperty(gridpanel, menu) {
    isPidMenu(gridpanel, menu);
    isLogicMenu(gridpanel, menu);
    isSCFMMenu(gridpanel, menu);
    isScaleMenu(gridpanel, menu);
    isdoubleBOMenu(gridpanel, menu);
}

function isScaleMenu(girdpanel, menu) {
    console.log(arguments)

    if (girdpanel.datas.type == 75) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().pidPropertyClick, girdpanel)
    }
}
function isSCFMMenu(girdpanel, menu) {
    console.log(arguments)
    if (girdpanel.datas.type == 67) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().pidPropertyClick, girdpanel)
    }
}

function isLogicMenu(gridpanel, menu) {
    if (gridpanel.datas.type == 56) {
        //var addSlot = menu.getComponent("addSlot").setDisabled(true);
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().logicPropertyClick, gridpanel)
    }
}
function isPidMenu(girdpanel, menu) {
    if (girdpanel.datas.type == 74) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().SCFMPropertyClick, girdpanel)
    }
}
function isdoubleBOMenu(gridpanel, menu) {

    if (gridpanel.datas.type == 80) {
        var cProperty = menu.getComponent("Property")
        cProperty.setDisabled(false);
        cProperty.on("click", menu.getController().pidPropertyClick, gridpanel)
    }
}

function currentDrawPanelGridPanelsTrSetId() {
    //var aGridPanels = getCurrentDrawPanelGirdPanels();
    var aGridPanels = getCurrentDrawPanel().items.items;
    for (var i = 0; i < aGridPanels.length; i++) {
        var aRowsAll = aGridPanels[i].el.dom.querySelectorAll("tr");

        for (var j = 0; j < aRowsAll.length; j++) {
            var trId = $.trim(aRowsAll[j].id);
            if (trId.length == 0 || trId == undefined || trId == "undefined" || trId.substr(0, 1) != "t") {

                var id = generateTrId();
                //aRowsAll[j].id = id
                datasArrayChangeId(aRowsAll[j].id, id)

                Ext.get(aRowsAll[j]).setId(id)


            }
        }
    }
}

function datasArrayChangeId(oldId, newId) {
    if (oldId.length > 0 & newId.length > 0) {
        var drawPanel = getCurrentDrawPanel()
        var arr = drawPanel.datas.datasArray
        var str = Ext.encode(arr);
        str = str.replaceAll(oldId, newId);
        drawPanel.datas.datasArray = Ext.decode(str)
    }
}

function generateTrId() {

    var id = "t" + Math.floor(Math.random() * 10000000000);
    var dom = document.getElementById(id);
    if (dom) {
        id = generateTrId()
    }

    return id;
}


/*function gridPanelsTrIdAddRandom(aGridPanels, randomnumber) {

 var drawpanel = getCurrentDrawPanel()

 var datasArray = drawpanel.datas.datasArray
 console.log(datasArray);
 var newDatasArray = [];

 for (var i = 0; i < datasArray.length; i++) {
 var ojson = {};
 for (var okey in datasArray[i]) {
 var skey = idAddNumber(okey, randomnumber);
 var svalue = idAddNumber(datasArray[i][okey], randomnumber);
 ojson[skey] = svalue;
 }

 newDatasArray.push(ojson)

 newDatasArray.push(datasArray[i])
 }


 for (var i = 0; i < aGridPanels.length; i++) {
 console.log(aGridPanels[i])

 var aRowsAll = aGridPanels[i].el.dom.querySelectorAll("tr");
 var aCloneRowsAll = Ext.decode(aGridPanels[i].trsIds);
 console.log(aCloneRowsAll)
 for (var j = 0; j < aRowsAll.length; j++) {
 var sid = aCloneRowsAll[j].id;
 if (sid) {

 aRowsAll[j].id = idAddNumber(sid, randomnumber)

 }
 }
 }
 drawpanel.datas.datasArray = newDatasArray;
 function idAddNumber(sid, randomnumber) {
 return "t" + (parseInt(sid.substr(1, sid.length)) + randomnumber);
 }
 }*/
function gridPanelsTrIdAddRandom(aGridPanels, randomnumber) {
    var drawpanel = getCurrentDrawPanel()

    var datasArray = Ext.decode(Ext.encode(drawpanel.datas.datasArray));
    for (var i = 0; i < datasArray.length; i++) {

        var ojson = datasArray[i];
        for (var key in ojson) {

            var skey = idAddNumber(key, randomnumber);
            var svalue = idAddNumber(ojson[key], randomnumber);
            ojson[skey] = svalue;
        }
    }

    for (var i = 0; i < aGridPanels.length; i++) {
        console.log(aGridPanels[i])

        var aRowsAll = aGridPanels[i].el.dom.querySelectorAll("tr");
        var aCloneRowsAll = Ext.decode(aGridPanels[i].trsIds);
        console.log(aCloneRowsAll)

        for (var j = 0; j < aRowsAll.length; j++) {
            console.log(j)
            var sid = aCloneRowsAll[j];
            console.log(sid)

            aRowsAll[j].id = idAddNumber(sid, randomnumber)
            console.log(aRowsAll[j])

        }
    }

    drawpanel.datas.datasArray = drawpanel.datas.datasArray.concat(datasArray)
    console.log(drawpanel.datas.datasArray)

    function idAddNumber(sid, randomnumber) {
        return "t" + (parseInt(sid.substr(1, sid.length)) + randomnumber);
    }

}
function removeTemp() {
    d3.select("#tempCircle").remove()
    d3.select("#tempLineEnd").remove()
    d3.select("#tempLineStart").remove()
    d3.selectAll(".tempCircle").remove()
    d3.select("#tempLine").remove()
}
var CIRCLE_MIN_R = 8;
var CIRCLE_MAX_R = 15;
var JIANGE = 10;
var STROKEWIDTH_MAX = 10;
var STROKEWIDTH_MIN = 3;
var iDrawPanelLeft;
var iDrawPanelTop;
var STROKE_COLOR = "blue";
//带 data-targetid 的是td  data-targetid 标注的是目标的id
var sStartItemTrId;//鼠标按下后得到item下的tr的id


function initDrawLine(thi, th, record, item, index, e, eOpts) {
    //console.log(item.querySelector("div").innerHTML )
    thi = getCurrentDrawPanel();
    var justDrawTempLine = thi.datas.justDrawTempLine;
    if (justDrawTempLine == true) {
        return;
    }
    if (item.querySelector("div").innerHTML == "mode") {
        return;
    }
    if (item.querySelector("div").innerHTML == "Instance") {
        return;
    }

    sStartItemTrId = item.querySelector("tr").id;
    //console.log(arguments)

    var drawpanelScrollTop = thi.el.dom.querySelector("div").scrollTop
    var drawpanelScrollLeft = thi.el.dom.querySelector("div").scrollLeft
    var oDrawPanel = d3.select(thi.el.dom).select(".x-autocontainer-innerCt");
    var oSvg = oDrawPanel.select(".tempSVG" + thi.id);
    iDrawPanelLeft = thi.el.getLeft();
    iDrawPanelTop = thi.el.getTop();

    var eItem = Ext.get(item);
    var eItemWidth = eItem.getLeft() - iDrawPanelLeft + eItem.getWidth() + drawpanelScrollLeft;
    var eItemHeight = eItem.getTop() - iDrawPanelTop + eItem.getHeight() / 2 + drawpanelScrollTop;

    //var aRowsAll = thi.el.dom.querySelectorAll(".x-grid-row");
    var girdPanel = th.up()
    var aRowsAll = getCanLinesRowsAll(girdPanel)

    function getCanLinesRowsAll(gridpanel) {
        var typegrids = getCurrentDrawPanelGirdPanels()
        var sId = gridpanel.getId();
        var aRowsAll = [];
        //console.log(typegrids.length)
        for (var i = 0; i < typegrids.length; i++) {
            if (typegrids[i].getId() == sId) {
                typegrids.splice(i, 1)
                break;
            }
        }

        //console.log(typegrids.length)
        for (var i = 0; i < typegrids.length; i++) {
            var rows = typegrids[i].el.dom.querySelectorAll(".x-grid-row")
            for (var j = 0; j < rows.length; j++) {
                if (typegrids[i].datas.type == "79" & j > 2) {
                    continue;
                }
                aRowsAll.push(rows[j])
            }
        }
        return aRowsAll;
    }

//    console.log(aRowsAll)

    d3.select("#tempLineStart").remove();

    var tempLineStart = oSvg.append("rect").attr("x", eItemWidth).attr("y", eItemHeight).attr("id", "tempLineStart");
    var tempLineEnd = oSvg.append("circle").attr("r", 4).attr("stroke-width", 1.5).attr("stroke", "rgb(137,190,229)").attr("fill", "blue").attr("cx", eItemWidth + 10).attr("cy", eItemHeight).attr("id", "tempLineEnd");

    tempLineEnd[0][0].onmousedown = function () {
        thi.datas.justDrawTempLine = true;
        var _this = d3.select(this);

        for (var i = 0; i < aRowsAll.length; i++) {
            //console.log(aRowsAll[i].id)
            var left = drawpanelScrollLeft + Ext.get(aRowsAll[i]).getLeft() - iDrawPanelLeft - 10;

            var top = drawpanelScrollTop + Ext.get(aRowsAll[i]).getTop() - iDrawPanelTop + parseInt(Ext.get(aRowsAll[i]).getHeight() / 2);

            var columnid = d3.select(aRowsAll[i]).attr("id");

            var tempLineEnd;
            var nameHtml = aRowsAll[i].querySelector("div").innerHTML;
            if (nameHtml != "Out" && nameHtml != "mode" && nameHtml != "Instance" && nameHtml != "open" && nameHtml != "close") {

                tempLineEnd = oSvg.append("circle").attr("r", CIRCLE_MIN_R).attr("stroke-width", STROKEWIDTH_MIN).attr("stroke", "rgb(137,190,229)").attr("fill", "green").attr("cx", left).attr("cy", top).attr("class", "tempCircle").attr("columnid", columnid);

                tempLineEnd.on("mouseover", function () {
                    d3.select(this).attr("r", CIRCLE_MAX_R);
                });

                tempLineEnd.on("mouseout", function () {
                    d3.select(this).attr("fill", "green").attr("r", CIRCLE_MIN_R);
                });

                sStartItemTrId = item.querySelector("tr").id;
            }
            //console.log("wanle")
        }

        document.onmousemove = function (e) {
            _this.attr("cx", drawpanelScrollLeft + e.clientX - iDrawPanelLeft - parseInt(tempLineEnd.attr("width") / 2));
            _this.attr("cy", drawpanelScrollTop + e.clientY - iDrawPanelTop - parseInt(tempLineEnd.attr("height") / 2));
            //console.log(document.onmousemove)
            drawTempline();
        };
        document.onmouseup = function (e) {
            removeTemp();
            thi.datas.justDrawTempLine = false;
            document.onmousemove = null;
            document.onmouseup = null;
            console.log(document.onmousemove)
            console.log(e.target.tagName + "   " + sStartItemTrId)
            if (e.target.tagName == "circle") {
                sEndItemTrId = d3.select(e.target).attr("columnid");
                console.log(thi)
                thi.datas.datasArray.push(generateJson(sEndItemTrId, sStartItemTrId))
                console.log(thi.datas.datasArray);
                d3.select(item).attr("data-targetid", d3.select(e.target).attr("columnid"));
                drawlines(thi);
            } else {
                //console.log(datasArray.pop())
                return;
            }
        };
    };
    function drawTempline() {
        var drawpanel = getCurrentDrawPanel()

        d3.select("#tempLine").remove();
        var svg = d3.select(".tempSVG" + drawpanel.id);
        var start = d3.select("#tempLineStart");
        var end = d3.select("#tempLineEnd");
        var endcx = end.attr("cx");
        var endcy = end.attr("cy");
        var y1 = parseInt(start.attr("x")) + iDrawPanelLeft;
        var x1 = parseInt(start.attr("y")) + iDrawPanelTop;
        var x2 = parseInt(end.attr("cx")) + iDrawPanelLeft;
        var y2 = parseInt(end.attr("cy")) + iDrawPanelTop;
        //console.log(x1 + " " + y1 + " " + x2 + " " + y2)
        var a = (x1 + CIRCLE_MIN_R) - (x2 + CIRCLE_MIN_R);
        var b = (y1 + CIRCLE_MIN_R) - (y2 + CIRCLE_MIN_R);
        //var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        var cA = Math.atan2(a, b);
        var x = Math.sin(cA) * CIRCLE_MIN_R;
        var y = Math.cos(cA) * CIRCLE_MIN_R;
        svg.append("line").attr("id", "tempLine").attr('stroke', "blue").attr("stroke-width", "1").attr("x1", parseInt(endcx) + x).attr("y1", parseInt(endcy) + y).attr("x2", start.attr("x")).attr("y2", start.attr("y"));


    }

}


