Ext.define('program.view.tab.DrawPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tab-drawpanel',
    launch: function () {
        Ext.fly('loading-mask').destroy();
        console.log('yes');
    },
    boxready: function (th, width, height, eOpts) {
        th.el.dom.childNodes[0].childNodes[0].style.height = "300%"
        th.el.dom.childNodes[0].childNodes[0].style.width = "150%"
        My.currentDrawPanelDiv = th.el.dom.querySelector("div")

        var svg = d3.select(th.el.dom).select(".x-autocontainer-innerCt").append("svg").attr("class", "tempSVG" + th.id)
            .attr("width", "150%").attr("height", "300%")
            //.style("border","1px solid red")
            .style("position", "absolute")
            .style("left", "0").style("top", "0");
        try {
            var startTime = new Date().getTime()

            var p = Ext.create('Ext.ProgressBar', {
                width: 300,
                text: "Please Wait ..."
            });
            th.pressBar = p
            Ext.create("Ext.window.Window", {
                title: "Loading ...",
                autoShow: true,
                items: p
            })


            setTimeout(function () {
                typegridCache(th)
                drawlines(th)
            }, 0)

            console.log("typegridcache" + (new Date().getTime() - startTime) + "毫秒")

        } catch (e) {
        }
    },
    hide: function (th) {
        var plant = Ext.get("plants" + th.getTitle())
        if (plant) {
            plant.hide();
        }

    },
    close: function (th) {
        Ext.getCmp("plants" + th.getTitle()).close();
    },
    render: function (th, eOpts) {

        new Ext.dd.DDTarget(th.getId(), "IconDragDropGroup");
        // var dTreedd = new Ext.dd.DDTarget(th.getId(), "DevTreeDragDropGroup");

        th.datas = {
            data: [],
            plants: [],
            datasArray: [],
            gridpanelConfigs: [],
            justDrawTempLine: false,
            LinkMarkTypeGrid: null
        };


        Ext.create('Ext.data.Store', {
            storeId: 'store' + th.getTitle(),
            fields: ['active', 'name'],
            data: th.datas.data
        });
        var ogridpanle = Ext.create('Ext.grid.Panel', {
            id: "plantsPanel" + th.getTitle(),
            store: "store" + th.getTitle(),
            //width: "100%",
            viewConfig: {
                getRowClass: function (record, rowIndex, rowParams, store) {
//                    console.log(arguments)
                    if (record.data.selected) {
                        if (plantWindow) {
                            plantWindow.setTitle(th.getTitle() + " " + record.data.name + " Plants");
                        }

                        return "skyblue";
                    }
                    //return record.get("valid") ? "row-valid" : "row-error";
                }
            },
            listeners: {
                itemmouseup: function (th, record, item, index, e, eOpts) {

                    th.el.dom.oncontextmenu = function (eve) {
                        return false;
                    }

                    e.stopEvent();
                    var drawpanel = getCurrentDrawPanel();
                    if (e.button == 2) {
                        ogridpanle.config.listeners.itemclick.call(ogridpanle, th, record, item, index, e, eOpts);
                        Ext.create("Ext.menu.Menu", {
                                //floating: true,
                                autoShow: true,
                                x: e.pageX + 5,
                                y: e.pageY + 5,
                                items: [
                                    {
                                        text: "copy...",
                                        handler: function () {
                                            ogridpanle.copyGridPanels = [];

                                            var plant = getCurrentDrawPanelPlantByIndex(index);
                                            var gridPanels = getCurrentPlantGridPanles(plant)

                                            for (var i = 0; i < gridPanels.length; i++) {

                                                var resJson = getTypeGridDatas(gridPanels[i]);
                                                ogridpanle.copyGridPanels.push(resJson);


                                            }

                                        }
                                    },
                                    {
                                        text: "paste...",
                                        listeners: {
                                            boxready: function () {


                                                if (ogridpanle.copyGridPanels) {
                                                    this.setDisabled(false);
                                                } else {
                                                    this.setDisabled(true);
                                                }
                                            }
                                        },
                                        handler: function () {
                                            //var plant = getCurrentDrawPanelPlantByIndex(index);

                                            var plant = getCurrentPlant()
                                            var randomNumber = Math.floor(Math.random() * 100000);

                                            var gridpanelDatas = ogridpanle.copyGridPanels;

                                            var gridpanels = [];

                                            for (var i = 0; i < gridpanelDatas.length; i++) {

                                                var gridPanel = createTypeGrid(gridpanelDatas[i]);
                                                gridpanels.push(gridPanel);
                                                gridPanel.datas.plantId = plant.id;
                                            }

                                            gridPanelsTrIdAddRandom(gridpanels, randomNumber);

                                            ogridpanle.copyGridPanels = false;
                                            drawlines()
                                        }
                                    }
                                ]
                            }
                        )
                    }
                },
                itemclick: function (grid, record, item, index, e, eOpts) {
                    //console.log(grid.el.dom.childNodes[0].childNodes[index])
                    ogridpanle.datas = {index: index}

                    setCurrentPlant(index, grid)
                    //双击事件的操作
                    //grid.el.dom.childNodes[0].childNodes[index].style.backgroundColor = "skyblue";
                },
                edit: function (grid, e) {
                    // 编辑完成后，提交更改
                    var index = ogridpanle.datas.index;
                    this.setStore(this.getStore())
                    var plant = getCurrentDrawPanelPlantByIndex(index);
                    plant.name = e.value;
                    updateCurrentDrawPanelPlant(plant, index);
                    e.record.commit();
                }
            },
            columns: [
                {
                    dataIndex: "selected",
                    xtype: 'actioncolumn',
                    //width: 40,
                    flex: 1,
                    sortable: false,
                    menuDisabled: true,

                    renderer: function (val) {
                        //drawlines(getCurrentDrawPanel())

                        if (val)
                            return '<img src = "resources/img/openFolder.png"/>'
                        return '<img src = "resources/img/closeFolder.png"/>'
                    },
                    handler: function () {
                    }
                },
                {
                    text: 'Name', dataIndex: 'name', flex: 3,
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false

                    }
                },
                {
                    xtype: 'actioncolumn',
                    //width: 30,
                    flex: 1,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: 'resources/img/delete.gif',
                        tooltip: 'Delete Plant',
                        scope: this,
                        handler: function (grid, rowIndex) {

                            var plant = getCurrentDrawPanelPlantByIndex(rowIndex);
                            var aGirdPanels = getCurrentDrawPanelGirdPanels();
                            console.log(aGirdPanels)

                            if (!aGirdPanels.length) {
                                delCurrentDrawPanelPlant(rowIndex, grid);

                            }

                            for (var i = 0; aGirdPanels.length; i++) {
                                console.log(aGirdPanels[i])
                                if (!aGirdPanels[i]) {
                                    delCurrentDrawPanelPlant(rowIndex, grid);
                                    break;
                                    return;
                                }

                                if (aGirdPanels[i].datas.plantId == plant.id) {
                                    Ext.Msg.show({
                                        title: 'Massage',
                                        message: 'Warning ! Current plant is not null . Would you remove this plant ? ',
                                        buttons: Ext.Msg.YESNO,
                                        icon: Ext.Msg.WARNING,
                                        fn: function (btn) {
                                            if (btn === 'yes') {
                                                delCurrentDrawPanelPlant(rowIndex, grid);
                                                for (var j = 0; j < aGirdPanels.length; j++) {
                                                    if (aGirdPanels[j].datas.plantId == plant.id) {
                                                        aGirdPanels[j].close();
                                                    } else {
                                                        aGirdPanels[j].hide()
                                                    }
                                                }
                                                drawlines()

                                                delayToast("Massage", "Remove current plant successfully .")
                                            } else if (btn === 'no') {

                                            }
                                        }
                                    });
                                    break;
                                }
                            }


                        }
                    }]
                }
            ],
            tbar: [
                {
                    text: 'Add Plant',
                    handler: function (th, e) {
                        var data = getCurrentDrawPanel().datas.data;
                        var name = data.length + 1 + ""
                        if (name.length == 1)
                            name = "00" + name;
                        if (name.length == 2)
                            name = "0" + name;
                        var plant = {
                            name: name,
                            selected: false,
                            id: "p" + Math.floor(Math.random() * 100000000000000)
                        };
                        addCurrentDrawPanelPlant(plant)


                        //console.log(getCurrentDrawPanelPlants())

                        //console.log(arguments)
                    }
                }
            ],
            selType: 'cellmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            height: "100%",
            width: "100%"

        });

        var plantWindow = Ext.create("Ext.window.Window", {
            autoShow: true,
            x: 300,
            y: 150,
            width: 200,
            height: 300,
            resizable: true,
            //resizeHandles: "s",
            //maximizable: true,
            collapsible: true,//收起
            closable: false,
            renderTo: Ext.getBody(),
            title: th.getTitle() + " Plants",
            constrainHeader: true,//禁止移出父窗口

            id: "plants" + th.getTitle(),
            //autoScroll: true,
            overflowX: "hidden",
            overflowY: "scroll",
            items: ogridpanle,
            listeners: {

                resize: function (th) {
                    ogridpanle.setWidth(th.getWidth() - 20)
                },
                collapse: function (th, eOpts) {
                    th.setPagePosition(0, 0, true)

                    console.log(arguments)
                }
            }
        });

    },
    show: function (th, event, eOpts) {
        // drawlines(th);
        drawlines(th);
        Ext.get("plants" + th.getTitle()).show();

    }
});

function getStoreData(gridPanelItems) {
    var storeData = [];
    for (var i = 0; i < gridPanelItems.length; i++) {
        var name = gridPanelItems[i].data.name;
        var value = gridPanelItems[i].data.value;
        if (gridPanelItems[i].data.select) {
            var select = gridPanelItems[i].data.select;
            storeData.push({name: name, value: value, select: select})
        } else {
            storeData.push({name: name, value: value})
        }
    }
    console.log(storeData)
    return storeData;
}

function typegridCache(th) {
    th.pressBar.wait({
        interval: 50, //bar will move fast!
        duration: 200,
        increment: 15,
        text: 'Updating...',
        scope: this,
        fn: function () {
            th.pressBar.updateText('100% !')
            setTimeout(function () {
                th.pressBar.up().close()
            }, 1000)
        }
    });
    var startTime = new Date().getTime()

    th = th || getCurrentDrawPanel();
    var fileName;
    if (th.title == "1000") {
        fileName = "../" + "1000.json";
    } else {
        fileName = "devsinfo/" + th.title;
    }
    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        async: false,
        params: {
            fileName: fileName,
            rw: "r"
        },
        success: function (response) {
            var text = response.responseText;
            if (text == null) {
                return;
            }
            try {
                //console.log(text)
                var ojson = Ext.decode(text);
                th.datas.datasArray = Ext.decode(ojson.datasArray);
                th.datas.gridpanelConfigs = Ext.decode(ojson.gridpanelConfigs);
                th.datas.plants = Ext.decode(ojson.plants);
                console.log(th.datas.plants)
            } catch (e) {
                return;
            }
        }
    });

    console.log("ajax" + (new Date().getTime() - startTime) + "毫秒")


    var items = th.datas.gridpanelConfigs;// Ext.decode(localStorage.getItem("gridpanelConfigs"));
    var plants = th.datas.plants;// Ext.decode(localStorage.getItem("plants"))
    //console.log(plants.length)
    //console.log(items)
    if (!items || !plants) {
        console.log(items)
        console.log(plants)
        return;
    }


    var store = Ext.data.StoreManager.lookup('store' + th.getTitle());
    for (var i = 0; i < plants.length; i++) {
        var data = th.datas.data
        data.push({selected: plants[i].selected, name: plants[i].name});
        store.setData(data);
        //addCurrentDrawPanelPlant(plants[i]);
    }


    console.log(items.length)

    var currentPlantId = getCurrentPlant().id
    for (var i = 0; i < items.length; i++) {
        var typegrid = createTypeGrid(items[i])

        var ids = Ext.decode(items[i].typegrid.trsIds);
        var trs = typegrid.el.dom.querySelectorAll("tr");
        for (var j = 0; j < trs.length; j++) {

            trs[j].id = ids[j];
        }
        if (currentPlantId != typegrid.datas.plantId) {
            typegrid.hide();
        }
    }

}

function createTypeGrid(items, index) {
    var drawPanel = getCurrentDrawPanel();
    var typegrid = Ext.create("program.view.grid.TypeGrid", items.typegrid);

    typegrid.datas = items.datas;

    if (typegrid.datas.name) {
        typegrid.setTitle(typegrid.datas.name)
    }
    typegrid.setStore(
        Ext.create(getNameByType(items.datas.type), {
            data: items.store.data,
            //fields: items.store.fields
        })
    )
    if (index != undefined) {
        drawPanel.add(typegrid);
        drawPanel.insert(index, typegrid);
    } else {
        drawPanel.add(typegrid);
    }
    isDev(typegrid, items)
    isLogicShowRows(typegrid)

    function isLogicShowRows(typegrid) {
        if (typegrid.datas.type == 56) {
            var columns = Ext.getCmp("win" + typegrid.id).down("grid").getColumns();
            for (var i = 0; i < typegrid.datas.rows; i++) {
                columns[i].show()
            }
        }
    }

    function isDev(typegrid, item) {
        var type = typegrid.datas.type;
        if (type >= 10) {
            return
        }
        var data;
        if (item.store.data[2]) {
            data = slotsJson[getNameByType(type)].initData(item.store.data[2].value);
        } else {
            data = slotsJson[getNameByType(type)].initData();
        }
        try {
            data[1].value = item.store.data[1].value;
            data[2].value = item.store.data[2].value;
        } catch (e) {
        }
        typegrid.store.setData(data)

    }

    return typegrid
}

function drawlines(drawpanel) {
    var startTime = new Date().getTime()

    d3.selectAll(".tempCircle").remove()
    My.gridPanels = getCurrentPlantGridPanles(getCurrentPlant());

    var currentDrawPanel = drawpanel || getCurrentDrawPanel();


    drawpanel = currentDrawPanel
    var oSvg = d3.select(currentDrawPanel.el.dom).select(".tempSVG" + currentDrawPanel.id);
    var datasArray = currentDrawPanel.datas.datasArray;
    if (!datasArray) {
        return;
    }

    datasArrayUnique(drawpanel);
    datasArray = drawpanel.datas.datasArray;
    d3.selectAll(".OkCircle").remove();
    d3.selectAll("polyline").remove();

    //var aRowsAll = currentDrawPanel.el.dom.querySelectorAll(".x-grid-row td");

    var drawpanelScrollTop = drawpanel.el.dom.querySelector("div").scrollTop
    var drawpanelScrollLeft = drawpanel.el.dom.querySelector("div").scrollLeft
    var iDrawPanelLeft = drawpanel.el.getLeft();
    var iDrawPanelTop = drawpanel.el.getTop();


    for (var i = 0; i < datasArray.length; i++) {//value 是起点

        var oStartEndJson = datasArray[i];
//        console.log(oStartEndJson)
        for (var o in oStartEndJson) {
            //var dStart = Ext.getDom(document.getElementById(oStartEndJson[o]));
            //var dEnd = Ext.getDom(document.getElementById(o));
            var oElStart = Ext.get(oStartEndJson[o]);

            //var startPanel = oElStart.up(".x-panel").component;

            var oElEnd = Ext.get(o);

            //var endPanel = oElEnd.up(".x-panel").component;

            if (!oElEnd || !oElStart) {
                drawpanel.datas.datasArray.splice(i, 1);
                drawlines(drawpanel)
                return
            }

            var oElStartEl = oElStart.el;
            var oElEndEl = oElEnd.el;

            var iElWidth = oElStartEl.getWidth();
            var iElHeight = oElStartEl.getHeight() / 2;


            var oElStartLeft = oElStart.getLeft();
            var oElStartTop = oElStart.getTop();
            var oElEndLeft = oElEnd.getLeft();
            var oElEndTop = oElEnd.getTop();
//            console.log(oElStartLeft)
//            console.log(oElStartTop)
//            console.log(oElEndLeft)
//            console.log(oElEndTop)
            var iStartLeft = 0, iStartTop = 0, iEndLeft = 0, iEndTop = 0;
            iStartLeft = oElStartLeft - iDrawPanelLeft + iElWidth + drawpanelScrollLeft;
            iStartTop = oElStartTop - iDrawPanelTop + iElHeight + drawpanelScrollTop;
            iEndLeft = oElEndLeft - iDrawPanelLeft + drawpanelScrollLeft;
            iEndTop = oElEndTop - iDrawPanelTop + iElHeight + drawpanelScrollTop;


            if (iStartLeft < 0 & iStartTop < 0 & iEndLeft < 0 & iEndTop < 0) {
                //break;
                continue;
            }

//            console.log(iStartLeft + "  " + iStartTop)
//            console.log(iEndLeft + " " + iEndTop)
//            console.log(iStartLeft)
//            console.log(iStartTop)
//            console.log(iEndLeft)
//            console.log(iEndTop)

            var circle, polyline;

            if (oElStartLeft == 0 || oElStartTop == 0 || oElEndLeft == 0 || oElEndTop == 0) {
                //if (startPanel.hidden||endPanel.hidden) {
                circle = oSvg.append("circle")
                    .attr("r", CIRCLE_MIN_R)
                    .attr("stroke-width", STROKEWIDTH_MIN)
                    .attr("stroke", "rgb(137,190,229)")
                    .attr("fill", "red").attr("data-index", i)
                    .attr("class", "OkCircle")
                    .attr("data-start", oStartEndJson[o])
                    .attr("id", "circle" + Math.floor(Math.random() * 100000))
                    .attr("data-end", o);
                //alert("circle")
                //continue
            } else {
                polyline = oSvg.append("polyline")
                    .attr("stroke", "blue")
                    .attr("stroke-width", STROKEWIDTH_MIN)
                    .attr("fill", "none")
                    .attr("class", "OkLine")
                    .attr("data-start", oStartEndJson[o])
                    .attr("data-end", o)
                    .attr("data-index", i);
            }

//            console.log(polyline)
//            console.log(circle)

            if (polyline) {
                polyline.on("mouseover", function () {
                    d3.select(this).attr("stroke-width", STROKEWIDTH_MIN)
                        .transition()
                        .attr("stroke-width", STROKEWIDTH_MAX).attr("stroke", "chartreuse");
                });
                polyline.on("mouseout", function () {
                    d3.select(this).attr("stroke-width", STROKEWIDTH_MAX)
                        .transition()
                        .attr("stroke-width", "4").attr("stroke", "blue");
                });
                polyline.on("dblclick", function () {
                    var index = d3.select(this).attr("data-index");
                    drawpanel.datas.datasArray.splice(index, 1);
                    d3.select(this).remove();
                });
            }
            else {
                circle.on("dblclick", function () {
                    var index = d3.select(this).attr("data-index");
                    drawpanel.datas.datasArray.splice(index, 1);
                    d3.select(this).remove();
                });
                circle.on("mouseover", function () {
                    var me = $(this);

                    var endId = Ext.get(me.attr('data-end'));
                    var startId = Ext.get(me.attr("data-start"));
                    var endPanel = Ext.getCmp(endId.up(".x-panel").id)
                    var startPanel = Ext.getCmp(startId.up(".x-panel").id)
                    var panel;
                    if (endPanel.hidden) {
                        panel = endPanel
                    } else {
                        panel = startPanel
                    }
                    /* var quicktip = Ext.create("Ext.tip.QuickTip",{
                     target:startId,
                     title:endPanel.title,
                     text:""+endPanel.index,
                     hideDelay:1,
                     showDelay:1,
                     width:100,
                     height:100,
                     autoShow:true,
                     autoHide:false

                     })*/
                    if (!panel.curPlantIndex) {
                        showIndex()
                        hideIndex()
                    }

                    Ext.create('Ext.tip.ToolTip', {
                        target: this.id,
                        html: ["<div>" + panel.title + "</div>",
                            "<div>node number: " + panel.curPlantIndex + "</div>"
                        ].join("")
                    });
                    /*  Ext.tip.QuickTipManager.register({
                     target:Ext.getBody(),
                     title:endPanel.title,
                     text:""+endPanel.index,
                     hideDelay:1,
                     showDelay:1,
                     width:100,
                     height:100,
                     autoHide:false,
                     trackMouse:true
                     //                        dismissDelay:3000
                     })*/
                });
                circle.on("mouseout", function () {
                    var tip = Ext.tip.QuickTipManager.getQuickTip()
                    console.log(tip)
                    Ext.tip.QuickTipManager.unregister(tip.el)
                    tip.hide()

                })

                if (oElStartLeft == 0 || oElStartTop == 0) {
                    circle.attr("cx", iEndLeft - 10).attr("cy", iEndTop + 12);
                    //console.log("start")
                    continue;
                }
                if (oElEndLeft == 0 || oElEndTop == 0) {
                    circle.attr("cx", iStartLeft + 10).attr("cy", iStartTop)
                    //console.log("end")
                    continue;
                }
            }

            if (!polyline) {
                continue
            }

            var pointStart = [iStartLeft + My.JIANGE, iStartTop];
            var pointEnd = [iEndLeft - My.JIANGE, iEndTop];
            My.PathNodeManager.removeAll()

            var startPathNode = new My.PathNode(pointStart[0], pointStart[1]);
            var endPathNode = new My.PathNode(pointEnd[0], pointEnd[1]);
            var arr = My.getShortPathNode(startPathNode, endPathNode);
            //console.log(arr);
            arr.unshift(iStartLeft, iStartTop);

            arr.push(iEndLeft, iEndTop);
            polyline.attr("points", arr);
            //polyline.attr("points", pointAll);
            //console.log(pointAll)
            polyline = null;
            circle = null;

        }

    }

    /*
     for (var i = 0; i < My.PathNodes.length; i++) {
     circle = oSvg.append("circle")
     .attr("r", 3)
     .attr("stroke-width", 1)
     .attr("stroke", "#00FF00")
     .attr("fill", "blue").attr("data-index", i)
     .attr("class", "tempCircle")
     .attr("cx", My.PathNodes[i].x + drawpanelScrollLeft)
     .attr("cy", My.PathNodes[i].y + drawpanelScrollTop)
     }*/

    var mainTab = Ext.getCmp("frametab_drawpanel")
    mainTab.viewModel.set("allLine", currentDrawPanel.datas.datasArray.length);

    if (isDebug) {
        console.log("drawline" + (new Date().getTime() - startTime) + "毫秒")
    }

}

var My = {};
My.PathNodes = [];
My.MaxPathNodeId = 0;
My.JIANGE = 5;
My.PathNode = function (x, y) {//节点对象

    this.x = x;
    this.y = y;
    this.leftNode = null;
    this.rightNode = null;
    this.parentNode = null;
    this.count = 0;
    this.getLeftNodeLength = function () {
        console.log(this.leftNode)
        return Math.abs(this.x - this.leftNode.x) + Math.abs(this.y - this.leftNode.y)
    }
    this.getRightNodeLength = function () {
        console.log(this.rightNode)
        return Math.abs(this.x - this.rightNode.x) + Math.abs(this.y - this.rightNode.y)
    }
    this.setLeftNode = function (node) {
        if (!node) {
            return;
        }
        node.setParentNode(this)
        this.leftNode = node;
    }
    this.setRightNode = function (node) {
        if (!node) {
            return;
        }
        node.setParentNode(this)
        this.rightNode = node;
    }
    this.setParentNode = function (node) {
        if (!node) {
            return;
        }
        this.parentNode = node;
    }
    this.getLeftNode = function () {
        if (this.leftNode) {
            return this.leftNode;
        }
        return false
    }
    this.getRightNode = function () {
        if (this.rightNode) {
            return this.rightNode;
        }
        return false
    }
    this.getX = function (is) {
        if (is) {
            var drawpanelScrollLeft = My.currentDrawPanelDiv.scrollLeft
            return this.x - drawpanelScrollLeft;
        }
        return this.x
    }
    this.getY = function (is) {
        if (is) {
            var drawpanelScrollTop = My.currentDrawPanelDiv.scrollTop
            return this.y + drawpanelScrollTop
        }
        return this.y;
    }
    this.getXY = function () {
        if (this.x >= 0 & this.y >= 0) {
            return [this.x, this.y];
        } else {
            return null;
        }
    }

    this.init = (function (pathNode) {
        My.PathNodeManager.init(pathNode);
    })(this)

}

My.PathNodeManager = {

    init: function (pathNode) {

        var id = "pathnode-" + My.MaxPathNodeId;
        My.MaxPathNodeId++;
        if (My.PathNodeManager.getById(id)) {
            My.PathNodeManager.init(pathNode);
            return;
        }
        pathNode.id = id;
        My.PathNodes.push(pathNode);
    },
    removeAll: function () {
        My.PathNodes = [];
        My.MaxPathNodeId = 0;
    },
    getById: function (id) {
        for (var i = 0; i < My.PathNodes.length; i++) {
            if (My.PathNodes[i].id == id) {
                return My.PathNodes[i];
            }
        }
        return null;
    }
}

//var endNode = new My.PathNode(750, 200);
//var strNode = new My.PathNode(50, 200);

My.PathNode.prototype.toRootNodeLength = function () {
    var me = this;
    var length = 0;
    if (me.parentNode) {
        var parentNode = me.parentNode;
        var width = Math.abs(me.x - parentNode.x);
        var height = Math.abs(me.y - parentNode.y);
        length = width + height;
        length += me.parentNode.toRootNodeLength();
    }
    return length;
}

My.PathNode.prototype.getToRootPath = function (arr) {
    var me = this;
    arr.push(me.getNextNodeCenterPoint())
    arr.push([me.x, me.y]);
    if (me.parentNode) {
        me.parentNode.getToRootPath(arr)
    }
}
My.PathNode.prototype.getNextNodeCenterPoint = function () {

    var me = this;
    if (me.leftNode) {
        return [me.leftNode.x, me.y]
    }
    return null;
}
//var strXY = new My.PathNode(100, 200);

//var endXY = new My.PathNode(500, 300);
//var fangka = 0;


My.getShortPathNode = function (rootNode, endNode) {


    var leafArr = []

    My.getLeafPointAll(rootNode, endNode, leafArr)

    leafArr.sort(function (a, b) {

        return a.toRootNodeLength() - b.toRootNodeLength();

    })

    var arr = []

    leafArr[0].getToRootPath(arr)

    arr[0] = [endNode.x, arr[1][1]]

    arr.unshift([endNode.x, endNode.y]);

    arr.reverse()

    /*for (var i = 0; i < arr.length; i++) {
     console.log(arr[i])
     }*/

    //My.getStartNodeTopButtomNodePathByEndY()

    return arr;
}

My.getLeafPointAll = function (testNode, endNode, arr) {
    console.log("kazaizhe")
    testNode.count++
    endNode.count++
    if (testNode.count > 100) {
        console.log(testNode)
        return;
    }
    if (endNode.count > 100) {
        console.log(endNode)
        return;
    }

    if (!testNode) {
        return;
    }

    var tn = My.getStartNodeTopButtomNodePathByEndX(testNode, endNode);

    if (tn == null) {
        return;
    }


    if (tn.rightNode) {
//        console.log("%c right     Node  is : ", "color:blue");
        My.getLeafPointAll(tn.rightNode, endNode, arr);
        console.log("right")
    }
    if (tn.leftNode) {
//        console.log("%c left      Node  is : ", "color:red");
        My.getLeafPointAll(tn.leftNode, endNode, arr)
        console.log("left")

        return;
    }
    arr.push(tn);

}

My.PathNode.prototype.initLeftNodeRightNode = function (endNode) {
    console.log(this)
    var me = this;
    var drawPanel = Ext.getCmp("frametab_drawpanel").getActiveTab();
    var dPLeft = drawPanel.getX()
    var dPTop = drawPanel.getY()
    if (!me.getXY()) {
        return;
    }
    var gridPanels = getCurrentPlantGridPanles(getCurrentPlant());
    if (me.x < endNode.x) {
        gridPanels.sort(function (a, b) {
            return a.getX() - b.getX();
        });
    } else {
        gridPanels.sort(function (a, b) {
            return b.getX() - a.getX();
        });
    }
    for (var i = 0; i < gridPanels.length; i++) {
        var gY = gridPanels[i].getY() - dPTop;
        var gH = gridPanels[i].getHeight();
        if (gY > me.Y & (gY + gH) < me.Y) {
            continue;
        }
        if (me.x < endNode.x) {
            if (gridPanels[i].getX() > me.x) {
                me.setLeftNode(My.getGridPanelPoint(gridPanels[i], 'nw'));
                me.setRightNode(My.getGridPanelPoint(gridPanels[i], 'sw'));
                me.rightNode.initLeftNodeRightNode(endNode)
                me.leftNode.initLeftNodeRightNode(endNode)
                //return startNode;
            }
        } else {
            if (gridPanels[i].getX() < me.x) {
                me.setLeftNode(My.getGridPanelPoint(gridPanels[i], 'ne'));
                me.setRightNode(My.getGridPanelPoint(gridPanels[i], 'se'));
                me.rightNode.initLeftNodeRightNode(endNode)
                me.leftNode.initLeftNodeRightNode(endNode)
                //return startNode;
            }
        }
    }

}

My.getStartNodeTopButtomNodePathByEndX = function (startNode, endNode) {
    //获取距离起点最近的 并且和 在一条直线伤的 gridpanel
    //console.log(tn.rightNode)
    var leftToRight, gX, gY, gH, nY, leftNode, rightNode

    var gridPanels = My.gridPanels;

    if (!startNode || !endNode) {
        return null;
    }


    leftToRight = startNode.x < endNode.x;

    /*if(fangka>100){
     fangka=0;
     return ;
     }*/
    if (leftToRight) {
        gridPanels.sort(function (a, b) {
            return a.getX() - b.getX();
        });
    } else {
        gridPanels.sort(function (a, b) {
            return b.getX() - a.getX();
        });
    }

    for (var i = 0; i < gridPanels.length; i++) {
        //console.log(gridPanels[i])
        gX = gridPanels[i].x
        gY = gridPanels[i].y
        gH = gridPanels[i].getHeight();
        nY = startNode.getY()

//        console.log(gridPanels[i].el.dom)

//       console.log("面板.X= " + gX)
//       console.log("面板.Y= " + gY)
//       console.log("开始.Y= " + nY)
        if (gY > nY || (gY + gH) < nY) {
            continue;
        }
        /*if ((gY + gH) < nY) {
         continue;
         }*/

        if (leftToRight) {
            if (gX > startNode.getX() & gX < endNode.getX()) {
                //alert(gX)
                //console.log("面板.X=" + gX)
                //console.log("起点.X=" + startNode.getX())
                leftNode = My.getGridPanelPoint(gridPanels[i], 'nw');
                if (leftNode) {
                    startNode.setLeftNode(leftNode);
                }
                rightNode = My.getGridPanelPoint(gridPanels[i], 'sw');
                if (rightNode) {
                    startNode.setRightNode(rightNode);
                }
                return startNode;
            }
        } else {
            if (gX < startNode.getX() & gX > endNode.getX()) {
                leftNode = My.getGridPanelPoint(gridPanels[i], 'ne')
                if (leftNode) {
                    startNode.setLeftNode(leftNode);
                }
                startNode.setLeftNode(leftNode);
                rightNode = My.getGridPanelPoint(gridPanels[i], 'se');
                if (rightNode) {
                    startNode.setRightNode(rightNode);
                }
                startNode.setRightNode(My.getGridPanelPoint(gridPanels[i], 'se'));
                return startNode;
            }
        }
    }

    return startNode;
}
My.getStartNodeTopButtomNodePathByEndY = function (startNode, endNode) {

}

My.getGridPanelPoint = function (gridPanel, pointStr) {
    //   console.log(gridPanel.el.dom)
    var yuliang = 10
    var pathNode = new My.PathNode();
    var x = gridPanel.x;
    var y = gridPanel.y;
    var width = gridPanel.getWidth();
    var height = gridPanel.getHeight();
    if (pointStr == "nw") {
        pathNode.x = x - yuliang;
        pathNode.y = y - yuliang;
    }
    if (pointStr == "sw") {
        pathNode.x = x - yuliang;
        pathNode.y = y + height + yuliang;
    }
    if (pointStr == "se") {
        pathNode.x = x + width + yuliang;
        pathNode.y = y + height + yuliang;
    }
    if (pointStr == "ne") {
        pathNode.x = x + width + yuliang;
        pathNode.y = y - yuliang;
    }
    if (My.isCollsion(pathNode)) {
        return null;
    } else {


        return pathNode;
    }
}


My.isCollsion = function (pathNode) {
    if (!pathNode.getXY()) {
        return false;
    }
    var x1 = pathNode.x;
    var y1 = pathNode.y;

    var gridPanels = getCurrentPlantGridPanles(getCurrentPlant());
    var drawPanel = Ext.getCmp("frametab_drawpanel").getActiveTab() || getCurrentDrawPanel();
    var dPLeft = drawPanel.getX();
    var dPTop = drawPanel.getY();
    for (var i = 0; i < gridPanels.length; i++) {
        var x2 = gridPanels[i].getX() - dPLeft;
        var y2 = gridPanels[i].getY() - dPTop;
        var w = gridPanels[i].getWidth();
        var h = gridPanels[i].getHeight();
        if (isCollsionPointRect(x1, y1, x2, y2, w, h)) {
            return true;
        }
    }
    return false;
    function isCollsionPointRect(x1, y1, x2, y2, w, h) {
        if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h) {
            return true;
        }
        return false;
    }
}

My.isCollsionWithRect = function (x1, y1, w1, h1,
                                  x2, y2, w2, h2) {
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

function testCreate() {
    var a = new Date().getTime()
    testTime()
    console.log((new Date().getTime() - a) / 1000 + "秒")

}
function testTime() {
    for (var i = 0; i < 3000; i++) //3 16
        new My.PathNode(100, 200)

}
function datasArrayUnique(drawpanel) {
    var datasArray = drawpanel.datas.datasArray;
    var map = new Ext.util.HashMap();
    for (var i = 0; i < datasArray.length; i++) {
        var oStartEndJson = datasArray[i];
        for (o in oStartEndJson) {
            map.add(o, oStartEndJson[o]);
        }
    }
    var datasArray1 = []
    map.each(function (key, value, length) {
        datasArray1.push(generateJson(key, value));
    });
    drawpanel.datas.datasArray = datasArray1;
}

My.onSpinUp = function () {
    var oldValue = this.getValue().split(":");
    var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
    time += 10000;
    var newTime = new Date(time)
    var H = newTime.getHours()
    var M = newTime.getMinutes()
    var S = newTime.getSeconds()
    //if(newTime>2649600000&newTime<2736000000)
    this.setValue(H + ":" + M + ":" + S);
}

My.onSpinDown = function () {
    var oldValue = this.getValue().split(":");
    var time = new Date(1970, 1, 1, oldValue[0], oldValue[1], oldValue[2]).getTime()
    time -= 10000;
    var newTime = new Date(time)
    var H = newTime.getHours()
    var M = newTime.getMinutes()
    var S = newTime.getSeconds()
    this.setValue(H + ":" + M + ":" + S);
}
/*var node1 = new My.PathNode(1, 1);

 var node2_l = new My.PathNode(20, 20);
 var node2_r = new My.PathNode(40, 40);

 var node2_l_3_l = new My.PathNode(300, 300);
 var node2_l_3_r = new My.PathNode(400, 400);
 var node2_r_3_l_ = new My.PathNode(500, 500);
 var node2_r_3_r = new My.PathNode(600, 600);

 node1.setLeftNode(node2_l);
 node1.setRightNode(node2_r);

 node2_l.setLeftNode(node2_l_3_l);
 node2_l.setRightNode(node2_l_3_r);
 node2_r.setLeftNode(node2_r_3_l_);
 node2_r.setRightNode(node2_r_3_r);*/

/*function getTreeLeafAll(rootNode,endNode,arr) { //获取所有叶节点
 this.leafAll = [];
 firstIteration.call(this, rootNode)
 return this.leafAll;

 }



 function firstIteration(node) {

 if (!node.leftNode & !node.rightNode) //判断是否有自节点
 {
 console.log(node)
 this.leafAll.push(node)
 }
 if (node.leftNode) {                   //判断当前节点是否有左孩子
 firstIteration(node.leftNode);    //递归左孩子
 node.leftNode.parentNode = node;
 }
 if (node.rightNode) {                  //判断当前节点是否有右孩子
 firstIteration(node.rightNode);   //递归右孩子
 node.rightNode.parentNode = node;
 }

 }*/

/*
 function iterationNodeTree(rootNode, endPonit) {
 var treeLeafNodeArr = getTreeLeafAll(rootNode); //拿到所有叶节点
 for (var i = 0; i < treeLeafNodeArr.length; i++) {
 var pathNodeArr = [];

 //treeLeafNodeArr[i].parentNode
 //while(){
 //}
 }
 }*/
/*
 function getNodeToParentNodeLength(node) {

 var parentNode = node.parentNode;
 var width = Math.abs(node.x - parentNode.x);
 var height = Math.abs(node.y - parentNode.y);
 return width + height;

 }*/
/*
 function lineToRect(lineStart, lineEnd) { //这个方法把线转换成矩形
 var width = (lineEnd[0] - lineStart[0]);//+lineStart[0];
 var height = (lineEnd[1] - lineStart[1]);//+lineStart[1];
 width == 0 ? width += My.JIANGE : null;
 height == 0 ? height += My.JIANGE : null;

 var oJson = {};

 if (width < 0) {
 oJson.x = lineStart[0] + width;
 oJson.width = Math.abs(width);
 } else {
 oJson.x = lineStart[0];
 oJson.width = width;
 }
 if (height < 0) {
 oJson.y = lineStart[1] + height;
 oJson.height = Math.abs(height);
 }
 else {
 oJson.y = lineStart[1];
 oJson.height = height;
 }
 return oJson;
 }*/


/*function isCollsion(LineToRect) {
 var aObsDivs = currentDrawPanel.items.items;


 for (var i = 0; i < aObsDivs.length; i++) {
 var oDiv = d3.select(aObsDivs[i].el.dom);
 var iObsoffsetLeft = oDiv.property("offsetLeft");
 var iObsoffsetTop = oDiv.property("offsetTop");
 var iObswidth = parseInt(oDiv.style("width"));
 var iObsheight = parseInt(oDiv.style("height"));
 //console.log(x1 + "  " + y1 + " " + iLinewidth + "  " + iLineheight + "  " + iObsoffsetLeft + "  " + iObsoffsetTop + "  " + iObswidth + "  " + iObsheight)
 if (isCollsionWithRect(LineToRect.x, LineToRect.y, LineToRect.width, LineToRect.height, iObsoffsetLeft, iObsoffsetTop, iObswidth, iObsheight))
 return {
 x: iObsoffsetLeft - JIANGE,
 y: iObsoffsetTop - JIANGE,
 width: iObswidth + JIANGE,
 height: iObsheight + JIANGE
 };
 }
 return false;
 }*/

/*var pointAll = [];//折线的数组初始化
 pointAll.push([iStartLeft, iStart
 Top]);

 pointAll.push(pointStart);
 //polyline.attr("points", [[iStartLeft, iStartTop], [iEndLeft, iEndTop]]);
 var iCount = 0;

 drawPolyline(pointStart, iCount);

 pointAll.push([pointEnd[0] - JIANGE, pointEnd[1]]);
 pointAll.push(pointEnd);
 */


/*
 function drawPolyline(pointStart, iCount) { //遇到障碍物一定会出现两条折线这个方法用来画折线
 console.log(pointStart)
 console.log(pointEnd)
 if ((pointStart[0] - pointEnd[0]) == 0 || (pointStart[1] - pointEnd[1]) == 0) //判断是否在一条线上 如果不再一条线上 进入画折线部分
 {
 //console.log("在一条线上")
 //return;
 }
 var iX1 = (pointEnd[0] - pointStart[0]) + pointStart[0]; //
 var iY1 = pointStart[1];
 console.log("iX1=" + iX1)
 console.log("iY1" + iY1)
 var lineToRect1 = lineToRect(pointStart, [iX1, iY1]);
 var lineToRect2 = lineToRect([iX1, iY1], pointEnd);
 var oRect1 = isCollsion(lineToRect1);//第一条线碰撞判断
 var oRect2 = isCollsion(lineToRect2);//第二条线碰撞判断

 if (!oRect1 & !oRect2) {
 pointAll.push([iX1, iY1]);
 return;
 }

 //console.log(oRect1)
 iX1 = pointStart[0];
 iY1 = (pointEnd[1] - pointEnd[1]) + pointEnd[1]
 var lineToRect1 = lineToRect(pointStart, [iX1, iY1]);
 var lineToRect2 = lineToRect([iX1, iY1], pointEnd);
 var oRect3 = isCollsion(lineToRect1);//第一条线碰撞判断
 var oRect4 = isCollsion(lineToRect2);//第二条线碰撞判断
 if (!oRect3 & !oRect4) {
 pointAll.push([iX1, iY1])
 return;
 }

 console.log(iCount++)

 if (iCount > 10) {
 polyline.attr("stroke", "red")
 return;
 }


 if (oRect1 || oRect3) {
 console.log("oRect3碰上了")
 polyline.attr("stroke", STROKE_COLOR)
 var aPoint = lineSkirtRect(pointStart, oRect1 || oRect3);//
 //console.log(aPoint,"font-size:20px;","aa啊啊啊啊啊啊啊啊")

 for (var i = 0; i < aPoint.length; i++) {
 pointAll.push(aPoint[i]);
 console.log(pointAll)
 }
 drawPolyline([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]], iCount);
 return;
 }

 if (oRect2 || oRect4) {
 console.log("oRect4碰上了")
 //console.log(pointEnd)
 var aPoint = lineSkirtRect([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]], oRect2 || oRect4);
 //            console.log(aPoint,"font-size:20px;","aa啊啊啊啊啊啊啊啊")

 for (var i = 0; i < aPoint.length; i++) {
 pointAll.push(aPoint[i]);
 }
 //console.log([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]])
 console.log(pointAll)
 drawPolyline([pointAll[pointAll.length - 1][0], pointAll[pointAll.length - 1][1]], iCount);
 return;
 }
 }
 */

/* pointAll.push(pointEnd);
 pointAll.push([pointEnd[0] + JIANGE, pointEnd[1]])
 polyline.attr("points", pointAll)*/
/*
 function lineSkirtRect(pointStart, aRect) {//这个方法用来 绕过矩形 返回值是矩形上的两个点
 console.log(pointStart)
 console.log(aRect)
 var sx = pointStart[0];
 var sy = pointStart[1];
 var ex = aRect.x;
 var ey = aRect.y;
 var ex1 = ex + aRect.width + My.JIANGE;
 var ey1 = ey + aRect.height + My.JIANGE;
 var point1 = [];
 var point2 = [];
 var point3 = [];
 //console.log(sx+" "+sy+" "+ex+" "+ ey+" "+(ex+aRect.width)+" "+(ey+aRect.height))
 if (sx <= ex & sy >= ey & sy <= ey + aRect.height) {
 point1 = [ex, sy];
 if (sy > (ey + aRect.height / 2)) {
 point2 = [ex, ey1];
 point3 = [ex1, ey1];
 } else {
 point2 = [ex, ey];
 point3 = [ex1, ey];
 //   console.log("左边 靠上")
 }
 return [point1, point2];
 }
 if (sx >= ex & sy <= ey & sx <= ex + aRect.width) {
 point1 = [sx, ey];
 if (sx > (ex + aRect.width / 2)) {
 point2 = [ex1, ey];
 point3 = [ex1, ey1];
 } else {
 point2 = [ex, ey];
 point3 = [ex, ey1];
 }
 return [point1, point2];
 }
 if (sx >= (ex + aRect.width)) {
 point1 = [ex1, sy];
 if (sy > (ey + aRect.height / 2)) {
 point2 = [ex1, ey1];
 point3 = [ex, ey1];
 } else {

 point2 = [ex1, ey];
 point3 = [ex, ey];
 }
 return [point1, point2];
 }
 // & sx <= ex + aRect.width & ey >= ey + aRect.height
 if (sx >= ex & sy >= ey + aRect.height) {
 point1 = [sx, ey1];
 if (sx > (ex + aRect.width / 2)) {
 point2 = [ex1, ey1];
 point3 = [ex1, ey];
 } else {
 point2 = [ex, ey1];
 point3 = [ex, ey];
 }
 return [point1, point2];
 }
 return false;
 }

 */

//test1(new My.PathNode(50, 200), endNode)