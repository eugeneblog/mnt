Ext.define("program.view.tab.DrawPanel", {
    extend: "Ext.panel.Panel",
    xtype: "drawpanel",

    requires: [
        "program.view.tab.DrawPanelController",
        "program.view.tab.DrawPanelModel",
        //"svgxml.view.grid.PropertypeGrid"
    ],
    //engine: "Ext.draw.engine.Svg",
    controller: "tab-drawpanel",
    viewModel: {
        type: "tab-drawpanel"
    },
    //autoScroll: true,
    closable: true,
    bodyStyle: 'background:url(resources/img/square.png);',
    bodyPadding: "0",
    layout: {
        type: "absolute"
    },

    initComponent: function () {    //修改 me = this 
        var me = this;
        me.height = 3000;
        me.width = 3000;
        me.callParent();
    },
    enableDragDrop: true,
    listeners: {
        boxready: "boxready",
        //add: "add",
        render: "render",
        show: "show",
        hide: "hide",
        close: "close",
        el: {

            selectstart: function (th) {
                th.stopEvent();
                return;
            },
            contextmenu: function (th, el, eOpts) {
                console.log(arguments)
                if (el.tagName != "svg") {
                    th.stopEvent();
                    return;
                }
                ;
                Ext.create('program.view.grid.menu.gridmenu', {
                    x: th.pageX + 15,
                    y: th.pageY + 10,
                    listeners: {
                        show: function (thi, eOpts) {
                            try {
                                if (hideCom)
                                    thi.getComponent("addSlot").setDisabled(false);
                            } catch (e) {

                            }

                        }
                    }
                })
                th.stopEvent();
            }
        }
    },
    afterFirstLayout: function (th) {
        this.callParent(arguments);
        var body = this.body;
        console.log(body)

        this.PanelDropTarget = new Ext.dd.DropTarget(body.id, {
            ddGroup: "DevTreeDragDropGroup",
            notifyEnter: function (ddSource, e, data) {
                //console.log("notifyEnter")
                //console.log(arguments)
                //Add some flare to invite drop.
                body.stopAnimation();
                body.highlight();
            },
            notifyDrop: function (ddSource, e, data) {
                var selectRecord = ddSource.dragData.records[0].data;
                var aData, type = selectRecord.type, typeName = getNameByType(selectRecord.type), value = selectRecord.value, title = selectRecord.text;
                if (getCurrentPlant()) {
                    getCurrentDrawPanel().add(createDevGrid(selectRecord))
                } else {
                    Ext.Msg.alert('Massage',"Please select a Plant .")
                    return ;
                }
                function createDevGrid(selectRecord, defaultValue) {
                    var aData, type = selectRecord.type, typeName = getNameByType(selectRecord.type), value = selectRecord.value, title = selectRecord.text;

                    /*if (defaultValue == undefined) {
                     aData = slotsJson[typeName].initData();
                     Ext.Msg.alert("Waring","INPUT Default Value .")
                     } else {
                     aData = slotsJson[typeName].initData(defaultValue);
                     }*/
                    aData = slotsJson[typeName].initData(defaultValue);

                    aData[1].value = Number.valueOf()(value.substr(5, 6));
                    var ostore = Ext.create("Ext.data.Store", {
                        fields: ["name", "value"],
                        data: aData
                    })
                    var grid = Ext.create("program.view.grid.TypeGrid", {
                        title: title,
                        store: ostore,
                        x: e.browserEvent.offsetX + 5,
                        y: e.browserEvent.offsetY + 5,
                        icon: "resources/img/SVG/" + typeName + ".svg",
                        listeners: {
                            add: function () {
                                setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
                            },
                            render: function (thi) {
                                thi.datas = {
                                    isAddSlot: slotsJson[getNameByType(type)].isAddSlot,
                                    plantId: getCurrentPlant().id,
                                    type: type,
                                    value: value
                                };
                            }
                        }
                    })
                    return grid;
                }

                /*                console.log(typeName)
                 console.log(title)
                 console.log(value);
                 aData = slotsJson[typeName].initData();
                 aData[1].value = Number.valueOf()(value.substr(5, 6));
                 var ostore = Ext.create("Ext.data.Store", {
                 fields: ["name", "value"],
                 data: aData
                 })*/
                /* getCurrentDrawPanel().add(

                 Ext.create("svgxml.view.grid.TypeGrid", {
                 title: title,
                 store: ostore,
                 x: e.browserEvent.offsetX + 5,
                 y: e.browserEvent.offsetY + 5,
                 icon: "resources/img/SVG/" + typeName + ".svg",
                 listeners: {
                 add: function () {
                 setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)
                 },
                 render: function (thi) {

                 thi.datas = {
                 isAddSlot: slotsJson[getNameByType(type)].isAddSlot,
                 plantId: "",
                 type: type,
                 value: value
                 };
                 }
                 }
                 })

                 );*/

                // Reference the record (single selection) for readability

                return true;
            }
        });

    }
});



