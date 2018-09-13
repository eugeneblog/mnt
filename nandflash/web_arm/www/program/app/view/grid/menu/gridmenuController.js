Ext.define('program.view.grid.menu.gridmenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-menu-gridmenu',

    init: function (el) {
        try {
            if (hideCom) {
                console.log(el.getComponent('paste').setDisabled(false))
            }
        } catch (e) {

        }


    },
    show: function (th) {

        /*var title = th.up("typegrid");
         if (slotsJson[title].isAddSlot) {
         el.getComponent("addSlot").setDisabled(true);
         } else {
         el.getComponent("addSlot").setDisabled(false);
         }*/
    },
    cupclick: function (menu, e, eOpts) {
        hideCom = cloneTypegrid(menu.up("typegrid"), e);
        menu.up("typegrid").destroy();
        //console.log(menu.up().getComponent('paste').setDisabled(true))
    },
    copyclick: function (menu, e, eOpts) {
        var typegrid = menu.up("typegrid");
        var type = typegrid.datas.type;
        if (type == 1 || type == 2 || type == 4 || type == 5) {
            if (typegrid.store.data.length > 2) {
                Ext.Msg.alert("Massage", "Cannot copy ")
                return;
            }
        }
        hideCom = cloneTypegrid(menu.up("typegrid"), e);

    },
    pasteclick: function (item, e, eOpts) {


        getCurrentDrawPanel().add(hideCom);
        hideCom.setPagePosition(e.pageX, e.pageY, true)

        hideCom.datas.plantId = getCurrentPlant().id

        /*   setInterval(function(){
         console.info(hideCom.datas.plantId)
         },1000)*/
    },

    deleteclick: function (menu, item, e, eOpts) {

        if (menu.up("typegrid") == hideCom) {
            menu.up().getComponent('paste').setDisabled(true);
            hideCom = false;
        }
        menu.up("typegrid").close()
        drawlines(getCurrentDrawPanel())
    },
    deplicateclick: function (menu, e, eOpts) {
        var typegrid = menu.up("typegrid");
        hideCom = cloneTypegrid(typegrid, e);
        //hideCom.datas.plantId=getCurrentPlant().id;
        menu.up("drawpanel").add(hideCom)
        hideCom.setPagePosition(typegrid.x + hideCom.up().getX() + hideCom.width + 50, typegrid.y + hideCom.up().getY(), true)
    },
    addSlotclick: function (menu, item, e, eOpts) {
        var gridpanel = this;
        var type = parseInt(gridpanel.datas.type);
        //console.log(gridpanel)
        var typeGirdName = menu.up("typegrid").datas.title || getNameByType(gridpanel.datas.type);

        var store = gridpanel.getStore();
        //console.log(store.data.length)
        //console.log(slotsJson[typeGirdName].maxSlot)
        if (store.data.length > slotsJson[typeGirdName].maxSlot) {
            Ext.Msg.alert('Info', 'This slot max length is ' + slotsJson[typeGirdName].maxSlot + '.');
            return;
        }

        if (gridpanel.datas.type == "56") {
            store.add({
                'name': 'In',
                delay: "0",
                'value': "0",
                time: "0",
                time1: "0",
                time2: "0",
                time3: "0",
                time4: "0",
                time5: "0",
                time6: "0",
                time7: "0",
                time8: "0",
                time9: "0"
            })
        } else {
            if (type == 1 || type == 2 || type == 4 || type == 5) {
                var arrs = getCurrentDrawPanelGirdPanels();
                for (var i = 0; i < arrs.length; i++) {
                    //console.log(arrs[i])
                    if (arrs[i].datas.value == gridpanel.datas.value & arrs[i].id != gridpanel.id & arrs[i].store.data.length > 2) {
                        Ext.Msg.alert("Massage", "Cannot add Slot, the same Slot 。")
                        return
                    }
                }

            }
            store.add({
                name: "In",
                value: "0"
            })
            //store.commitChanges()
        }


        //console.log(this.setStore(store))

    },
    delSlotclick: function (menu, item, e, eOpts) { //删除连线 并去除数组中的 对应元素

        var store = this.getStore();
        console.log(store)
        store.removeAt(store.data.length - 1);
        //this.setStore(store);
        drawlines(getCurrentDrawPanel())
        /* var datasArray = getCurrentDrawPanel().datas.datasArray;
         var targetid = d3.select(menu.up().el.dom).attr("data-targetid");
         console.log(datasArray)
         d3.selectAll("polyline").each(function () {
         console.log(d3.select(this).attr("data-end") + " " + targetid)
         for (var i = 0; i < datasArray.length; i++) {
         console.log(datasArray[i][targetid])
         if (datasArray[i][targetid]) {
         getCurrentDrawPanel().datas.datasArray.splice(i, 1)
         }
         }
         if (d3.select(this).attr("data-end") == targetid) {
         d3.select(this).remove()
         }
         })*/
    },
    LinkMarkClick: function (menu, item, e, eOpts) {
        var curDrawPanel = getCurrentDrawPanel();
        var curTypeGrid = menu.up("typegrid");
        curDrawPanel.datas.LinkMarkTypeGrid = curTypeGrid;
        console.log(arguments)
    },

    pidPropertyClick: function (menu, item, e, eOpts) {
        console.log(this)
        var _this = this
        var store = Ext.data.StoreManager.lookup("store" + _this.id)
        var win = Ext.create('Ext.window.Window', {
            title: _this.title + ' Property',
            width: 213,
            height: 262,
            layout: 'border',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                region: "center",
                xtype: 'grid',
                height: "100%",
                width: "100%",
                border: false,
                bbar: [
                    {
                        text: "Ok", handler: function (menu) {
                        Ext.data.StoreManager.lookup("store" + _this.id).commitChanges();
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        win.close();
                    }
                    }
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1,
                        listeners: {
                            edit: function (editor, context, eOpts) {
                                var record = context.record;

                                if (record.data.name == "time") {
                                    var value = parseInt(context.value) || context.originalValue
                                    record.set("value", value)

                                    if (value > 500 || value < 100) {
                                        Ext.Msg.alert('Exception', 'Changes failure max value is 500 ,min value is 100.');
                                        record.set("value", parseInt(context.originalValue))
                                    }
                                    //record.commit()
                                }
                            }
                            /*beforeedit: function (editor, context, eOpts) {
                             testeditor=editor;
                             editor.setConfig("field",{
                             xtype:"numberfield"
                             })
                             console.log(arguments)
                             return true;
                             }*/
                        }
                    })
                ],
                columns: [{header: 'name', dataIndex: "name"},
                    {
                        header: "value", dataIndex: "value", editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                    }

                ],                 // 仅仅用来显示一个头部。没有数据，
                store: store
            }
        }).show();
    },

    logicPropertyClick: function (menu, item, e, eOpts) {
        var _this = this;
        console.log(_this.config.store);
        var typeGirdName = this.datas.title;
        var store = _this.store//Ext.data.StoreManager.lookup("store" + _this.id);
        if (store.data.length > slotsJson[typeGirdName].maxSlot) {
            Ext.Msg.alert('Info', 'This slot max length is ' + slotsJson[typeGirdName].maxSlot + '.');
            return;
        }

        var win;
        win = Ext.getCmp("win" + _this.id);
        console.log(win)

        if (win) {
            win.show()
            return
        }
    },

    SCFMPropertyClick: function () {
        var _this = this;
        var store = Ext.data.StoreManager.lookup("store" + _this.id);
        console.log(store)
        teststore = store
        console.log(_this)
        var input1 = Ext.create("Ext.form.field.Text", {
            fieldLabel: 'diameter(D)',
            labelWidth: 130,
            name: store.getAt(1).data.name,
            xtype: "numberfield",
            value: store.getAt(1).data.value,

            bind: {
                disabled: "{!check1.checked}",
                value: "{diameter}"
            }
        })

        var input2 = Ext.create("Ext.form.field.Number", {
            xtype: "numberfield",
            fieldLabel: 'W',
            labelAlign: "right",
            labelWidth: 11,
            width: 140,
            value: 0.2,
            step: 0.1,
            bind: {
                disabled: "{!check2.checked}",
                value: "{input1}"
            }
        })
        var input3 = Ext.create("Ext.form.field.Number", {
            xtype: "numberfield",
            fieldLabel: 'H',
            labelAlign: "right",
            labelWidth: 11,
            width: 135,
            value: 0.4,
            step: 0.1,
            bind: {
                disabled: "{!check2.checked}",
                value: "{input2}"
            }
        })

        var win = Ext.create('Ext.window.Window', {
            title: 'SCFM Property',
            width: 390,
            height: 190,
            layout: 'border',

            listeners: {
                resize: function () {
                    console.log(arguments)
                }
            },
            items: {
                xtype: "form",
                controller: "grid-menu-gridmenu",
                region: "center",
                height: "100%",
                width: "100%",
                defaultType: 'textfield',
                defaults: {
                    labelWidth: 150,
                    margin: 10
                },
                buttons: [
                    {
                        text: "Ok", handler: function (button) {

                        console.log(arguments)
                        var form = button.up("form").getForm();
                        var resJson = form.getFieldValues();
                        console.log(resJson)
                        store.getAt(0).set("value", resJson[store.getAt(0).data.name])
                        store.getAt(1).set("value", input1.value);
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        win.close();
                    }
                    }
                ],
                //layout:"auto",
                items: [{
                    fieldLabel: store.getAt(0).data.name,
                    name: store.getAt(0).data.name,
                    value: store.getAt(0).data.value
                },

                    {
                        xtype: 'fieldcontainer',

                        layout: 'hbox',
                        //margin: '0 0 5 0',
                        items: [
                            {
                                xtype: "radiofield",
                                name: "diameter(D)",
                                margin: "0 5 0 0",
                                reference: "check1",
                                checked: true
                            },
                            input1,
                            {
                                xtype: "textfield",
                                value: "m",
                                width: 25,
                                disabled: true
                            },
                        ]
                    },
                    {
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        defaults: {
                            enableKeyEvents: true,

                            listeners: {
                                keydown: function (field, e, eOpts) {
                                    if (e.keyCode == 13) {
                                        console.log(arguments)
                                        var value = input2.value * input2.value + input3.value * input3.value;
                                        value = Math.sqrt(value)
                                        value = Ext.util.Format.number(value, "0.00")
                                        input1.setValue(value)
                                    }
                                }
                            }
                        },
                        items: [
                            {
                                xtype: "radiofield",
                                margin: "0 5 0 0",
                                reference: "check2",
                                name: "diameter(D)"
                            },
                            input2,
                            {
                                xtype: "textfield",
                                value: "m",
                                width: 25,
                                disabled: true,
                                margin: "0 5 0 0"
                            },
                            input3,
                            {
                                xtype: "textfield",
                                value: "m",
                                width: 25,
                                disabled: true
                            }
                        ]
                    }

                ],
                listeners: {
                    boxready: function () {
                        //var form = this;
                        //var model=store.getAt(0);
                        //console.log(model)
                        //form.getForm().loadRecord(model)
                    }
                },

            }
        }).show();


    },
    attribute: function (menu) {
        var gridPanel = this.view.up();
        var datas = gridPanel.datas
        console.log(datas)

        var types = ['AI', 'AO', 'AV', 'BI', 'BO', 'BV', 'SCHEDULE'];

        var netNumbers = []
        for (var i = 0; i <= 9900; i += 100) {
            netNumbers.push(i)
        }
        var modelAddress = [];
        for (var i = 0; i <= 99; i++) {
            modelAddress.push(i);
        }
        var pointType = [];
        for (var i = 0; i < types.length; i++) {
            pointType.push({
                name: types[i],
                value: i
            })
        }

        var attributeItems = [];

        attributeItems.push(
            {fieldLabel: "point index", name: "index", value: gridPanel.index}
        )

        var keyField = Ext.create("Ext.form.field.Text", {
            margin: 10,
            hidden:true,
            fieldLabel: "Key",
            name: "key",
            value: datas.value,
            listeners:{
                change:function(field,newValue,oldValue){
                    console.log(arguments)
                    var name = myGetValue(newValue,"Object_Name")
                    field.up().getComponent("title").setValue(name)
                }
            }
        })

        if (gridPanel.datas.type > 10) {
            attributeItems.push(
                {
                    fieldLabel: "title",
                    name: "title",
                    value: datas.title
                }
            )
        } else {

            /*attributeItems.push({
             xtype: "combobox",
             allowBlank: false,
             fieldLabel: 'device instance',
             store: modelAddress,
             editable: false,
             queryMode: 'local',
             autoSelect: false,
             value: "01",
             listeners: {
             change: function (field, newValue, oldValue) {
             var value = Ext.String.leftPad(newValue, 2, "0");
             var values = keyField.getValue().split("");
             values[2] = value[0]
             values[3] = value[1]
             keyField.setValue(values.join(''))
             }
             }
             })*/
            attributeItems.push({
                xtype: "textfield",
                editable: true,
                name:"device",
                value: datas.value.substr(0, 4),
                fieldLabel: "device instance"
            })
            attributeItems.push({
                xtype: "combobox",
                allowBlank: false,
                fieldLabel: 'Point Type',
                store: Ext.create("Ext.data.Store", {
                    fields: ['name', "value"],
                    data: pointType
                }),
                valueField: "value",
                displayField: "name",
                editable: false,
                queryMode: 'local',

                autoSelect: false,
                listeners: {
                    afterrender: function (combo) {
                        console.log(arguments)
                        combo.setValue(combo.store.getAt(datas.value.substr(4, 1)));
                    },
                    change: function (field, newValue, oldValue) {
                        var value = newValue;
                        var values = keyField.getValue().split("");
                        values[4] = value
                        console.log(keyField)
                        keyField.setValue(values.join(''))
                    }
                }
            })

            attributeItems.push({
                    xtype: "combobox",
                    allowBlank: false,
                    fieldLabel: 'Point Number',
                    store: modelAddress,
                    editable: false,
                    queryMode: 'local',
                    autoSelect: false,
                    value: "01",
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            var value = Ext.String.leftPad(newValue, 2, "0");
                            var values = keyField.getValue().split("");
                            values[5] = value[0];
                            values[6] = value[1];
                            keyField.setValue(values.join(''));
                        }
                    }
                }
            )

            attributeItems.push({
                xtype: "textfield",
                name: "title",
                itemId:"title",
                value: gridPanel.title,//myGetValue(datas.value,"Object_Name"),
                fieldLabel: "name"
            })
        }


        attributeItems.push(keyField)
        /*attributeItems.push({
         fieldLabel: "key", name: "key",
         value: datas.value,
         hidden: !datas.value,
         disabled: !datas.value
         })*/

        var win = Ext.create("Ext.window.Window", {
            title: "change attribute",
            autoShow: true,
            items: {
                xtype: "form",
                defaultType: "textfield",
                bodyPadding: 10,
                defaults: {
                    margin: 10
                },
                items: attributeItems || [
                    {fieldLabel: "point index", name: "index", value: gridPanel.index},
                    {
                        fieldLabel: "key", name: "key",
                        value: datas.value,
                        hidden: !datas.value,
                        disabled: !datas.value
                    },
                    {
                        fieldLabel: "title",
                        name: "title",
                        value: datas.title,
                        hidden: !datas.title,
                        disabled: !datas.title
                    },
                    //{fieldLabel: "lines", name: "lines"}
                ]
            },
            buttons: [
                {
                    text: "Ok", handler: function () {

                    var form = win.down("form");
                    var values = form.getValues();
                    if (gridPanel.datas.type < 10) {
                        values.key=values.device + values.key.substr(4,7)
                        gridPanel.datas.value=values.key;
                        changeDevValue(values.key,"Object_Name",values.title);
                    }
                    console.log(values)
                    console.log(gridPanel)
                    //changeDevValue
                    MyGridPanel.setIndex(gridPanel, values.index);
                    MyGridPanel.setTitle(gridPanel, values.title);
                    win.close();

                }
                },
                {
                    text: "Cancel", handler: function () {
                    win.close()
                }
                }
            ]
        })
        var MyGridPanel = {}
        MyGridPanel.setIndex = function (gridPanel, index) {
            if (gridPanel.index == index) {
                return;
            }
            var resDatas = getTypeGridDatas(gridPanel)
            gridPanel.destroy();
            var newGrid = createTypeGrid(resDatas, index - 1);
            var trs = newGrid.el.dom.querySelectorAll("tr");
            var ids = Ext.decode(resDatas['typegrid'].trsIds)
            for (var j = 0; j < trs.length; j++) {
                trs[j].id = ids[j];
            }
        };

        MyGridPanel.setTitle = function (gridPanel, title) {
            if (!title) {
                return;
            }
            if (title == gridPanel.datas.name) {
                return;
            }
            gridPanel.datas.name = title;
            gridPanel.setTitle(title);
        }

        console.log(gridPanel)
    },
    Rename: function (menu) {

        var girdpanel = menu.up("typegrid");
        var win = Ext.create("Ext.window.Window", {
            title: "Change Name",
            width: 280,
            height: 135,
            layout: "fit",
            autoShow: true,
            bodyPadding: 15,
            items: {
                xtype: "form",
                border: false,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 60
                },
                items: {
                    fieldLabel: "title",
                    xtype: "textfield",
                    itemId: "titlefield",
                    value: girdpanel.title
                }
            },
            buttons: [
                {
                    text: "OK", handler: function () {
                    var value = win.down("form").getComponent('titlefield').value;
                    girdpanel.datas.name = value;
                    girdpanel.setTitle(value);
                    delayToast("Message", "change title ok.");
                    win.close();
                }
                }
            ]
        });

        testwin = win;

    },
    LinkFormClick: function (menu, item, e, eOpts) {
        var SourceTypeGrid = getCurrentDrawPanel().datas.LinkMarkTypeGrid;
        var TargetTypeGrid = menu.up("typegrid");

        var win = Ext.create('Ext.window.Window', {
            title: "Link",
            autoScroll: true,
            width: 600,
            height: 600,
            renderTo: Ext.getBody(),
            autoShow: true,
            bodyPadding: 5,
            layout: {
                type: 'hbox'
                //align: 'stretch'
            },
            defaults: {
                //split: true,
                //sortable:false
                sortableColumns: false
            },
            listeners: {
                show: function (th, eOpts) {
                    th.datas = {
                        sourceIndex: 0,
                        targetIndex: 0
                    }
                }
            },
            items: [
                {
                    xtype: 'gridpanel', region: 'center', margin: '0 10 0 0', flex: 1,
                    store: SourceTypeGrid.getStore(),
                    columns: [
                        {text: 'Name', dataIndex: 'name', flex: 1},
                        {text: 'Value', dataIndex: 'value', flex: 1}
                        //{ text: 'Phone', dataIndex: 'phone' ,flex:1}
                    ],
                    tbar: [
                        {
                            xtype: 'displayfield',
                            value: '<span style="color:#04408c;font-weight:bolder;height:20px;line-height:19px;margin-left:3px"> SupplyTemp[Source] (' + SourceTypeGrid.getTitle() + ') </span>',
                            margin: '0 0 0 0'
                        }
                    ],
                    listeners: {
                        itemclick: function (thi, record, item, index, e, eOpts) {
                            win.datas.sourceIndex = index;
                        }
                    }
                },
                {
                    xtype: 'gridpanel', region: 'center', flex: 1,
                    store: TargetTypeGrid.getStore(),
                    columns: [
                        {text: 'Name', dataIndex: 'name', flex: 1},
                        {text: 'Value', dataIndex: 'value', flex: 1}
                        //{ text: 'Phone', dataIndex: 'phone' ,flex:1}
                    ],
                    tbar: [
                        {
                            xtype: 'displayfield',
                            value: '<span style="color:#04408c;font-weight:bolder;height:20px;line-height:19px;margin-left:3px"> GreaterThan[Target] (' + TargetTypeGrid.getTitle() + ') </span>',
                            margin: '0 0 0 0'
                        }
                    ],
                    listeners: {
                        itemclick: function (thi, record, item, index, e, eOpts) {
                            win.datas.targetIndex = index;
                        }
                    }
                }
            ],
            fbar: [
                {xtype: "displayfield", value: 'Link"SupplyTemp [Source]"->"GreaterThane[Target]', margin: "0 120 0 0"},
                {
                    type: 'button', text: 'Ok',
                    handler: function () {
                        var startId = getTypeGridRowIdByIndex(SourceTypeGrid, win.datas.sourceIndex).id;
                        var endId = getTypeGridRowIdByIndex(TargetTypeGrid, win.datas.targetIndex).id;
                        getCurrentDrawPanel().datas.datasArray.push(generateJson(endId, startId));
                        drawlines(getCurrentDrawPanel())
                        win.close()
                    }
                },
                {
                    type: 'button', text: 'Cancel',
                    handler: function () {
                        win.close()
                    }
                }
            ]
        });

    }
});


function getTypeGridRowIdByIndex(typegrid, index) {
    return typegrid.el.dom.querySelectorAll(".x-grid-row")[index];
}

function cloneTypegrid(typegrid, e) {

    console.log(arguments)

    var typeName = typegrid.getTitle();

    var dataitems = typegrid.getStore().data.items;

    var data = [];

    for (var i = 0; i < dataitems.length; i++) {
        var otempjson = {};
        otempjson['name'] = dataitems[i].data['name']
        otempjson['value'] = dataitems[i].data['value']
        data[i] = otempjson
    }

    var store = Ext.create("Ext.data.Store", {
        fields: ["name", "value"],
        data: data,
        listeners: {
            add: function () {

                setTimeout(currentDrawPanelGridPanelsTrSetId, 1000)

            }
        }
    });

    var oTypeGrid = Ext.create("program.view.grid.TypeGrid", {
        title: typegrid.config.title,
        store: store,
        icon: typegrid.config.icon,
        listeners: {
            render: function (thi) {
                //thi.datas = typegrid.datas
            }
        }
    });
    oTypeGrid.datas = {}
    for (o in  typegrid.datas) {
        oTypeGrid.datas[o] = typegrid.datas[o];
    }


    return oTypeGrid;
}

