Ext.define("program.view.grid.PropertypeGrid", {
    extend: "Ext.grid.Panel",
    xtype: "propertypegrid",
    alias: "propertypegrid",
    requires: [
        "program.view.grid.PropertypeGridController",
        "program.view.grid.PropertypeGridModel"
    ],

    controller: "grid-propertypegrid",
    viewModel: {
        type: "grid-propertypegrid"
    },
    // Let's put an empty grid in just to illustrate fit layout
    //xtype: 'grid',

    border: false,
    columnLines: true,
    initComponent: function () {
        var me = this;

        me.callParent()
    },
    plugins: {
        ptype: "rowediting",
        clicksToEdit: 1,
        listeners: {
            edit: function (editor, context) {
                console.log(arguments)
                var win = editor.cmp.up();
                var sDevNodeName = win.datas.record.data.value;
                var sNodeType = win.datas.record.data.type;
                var sDevName = sDevNodeName.substr(0, 4);

                if (context.value == context.newValues.value) {
                    return false
                }
                var rowRecord = context.record;

                Ext.Ajax.request({
                    url: "resources/test1.php",
                    method: "GET",
                    params: {
                        par: "changevalue",
                        nodename: sDevNodeName,
                        type: rowRecord.data.type,
                        value: rowRecord.data.value
                    },
                    success: function (response) {
                        var text = response.responseText;
                        delayToast('Status', 'Changes saved successfully,' + "New value is " + rowRecord.data.value + " .")
                        /*if (text == "0") {
                         } else {
                         delayToast('Error', ' Servers Change the failure.')
                         }*/
                    }
                });
                if (context.record.data.type == "Object_Name") {

                    //record.set("text","adasda")
                    context.grid.record.set("text", context.record.data.value);
                    //devTreeStoreLoad()
                    //var devtree = Ext.getCmp("leftDevTree")
                    //devtree.expandAll()

                }

            },
            beforeedit: function (editor, context, eOpts) {


                var win = editor.cmp.up();
                console.log(win)
                var sDevNodeName = win.datas.record.data.value;
                var sNodeType = win.datas.record.data.type;
                var sDevName = sDevNodeName.substr(0, 4);

                if (context.field == "type") {
                    return false;
                }

                var aWriteArr = ["Object_Name", "Hide", "Offset", "Description", "Device_Type", "Inactive_Text", "Active_Text",
                    "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
                    "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Present_Value", "Offset"];

                var rowRecord = context.record;
                for (var i = 0; i < aWriteArr.length; i++) {
                    if (rowRecord.data.type == aWriteArr[i]) {

                        if ((sNodeType == "0" || sNodeType == "3") & rowRecord.data.type == "Present_Value") {
                            return false;
                        }

                        if ((sNodeType == "4" || sNodeType == "5") & rowRecord.data.type == "Present_Value") {
                            if (Ext.getCmp("Priority_Array_combobox2")) {
                                return false;
                            }
                            Ext.create('Ext.window.Window', {
                                title: 'Write -- Priority_Array',
                                frame: true,
                                width: 315,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                modal: true,
                                layout: "auto",
                                items: [
                                    {
                                        margin: 10,
                                        xtype: "combobox",
                                        allowBlank: false,
                                        id: "Priority_Array_combobox1",
                                        fieldLabel: 'Set Value',
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ['abbr', 'name'],
                                            data: [{name: "On", abbr: "1"},
                                                {name: "Off", abbr: "0"},
                                                {name: "NULL", abbr: "NULL"}
                                            ]
                                        }),
                                        editable: false,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        autoSelect: true
                                    }
                                    , {
                                        margin: 10,
                                        xtype: "combobox",
                                        allowBlank: false,
                                        id: "Priority_Array_combobox2",
                                        fieldLabel: 'Priority',
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ['abbr', 'name'],
                                            data: [
                                                {name: "Priority1", abbr: "1"},
                                                {name: "Priority2", abbr: "2"},
                                                {name: "Priority3", abbr: "3"},
                                                {name: "Priority4", abbr: "4"},
                                                {name: "Priority5", abbr: "5"},
                                                {name: "Priority6", abbr: "6"},
                                                {name: "Priority7", abbr: "7"},
                                                {name: "Priority8", abbr: "8"},
                                                {name: "Priority9", abbr: "9"},
                                                {name: "Priority10", abbr: "10"},
                                                {name: "Priority11", abbr: "11"},
                                                {name: "Priority12", abbr: "12"},
                                                {name: "Priority13", abbr: "13"},
                                                {name: "Priority14", abbr: "14"},
                                                {name: "Priority15", abbr: "15"},
                                                {name: "Priority16", abbr: "16"}
                                            ]
                                        }),
                                        editable: false,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        autoSelect: true
                                    }
                                ],

                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {

                                        var text1 = Ext.getCmp("Priority_Array_combobox1").value;
                                        var text2 = Ext.getCmp("Priority_Array_combobox2").value;
                                        if (text2 == null && text1 == null) {
                                            Ext.Msg.alert('Exception', 'Not null.');
                                            return false;
                                        }
                                        if (text1 == "NULL") {
                                            setPresent_Value(sDevNodeName, text1, text2);
                                            /* devPublish(sDevName + ".8.*", sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2, function () {
                                             delayToast('Success', 'Publish Ok.', 0)
                                             })*/
                                        } else {
                                            setPresent_Value(sDevNodeName, text1, text2);
                                        }
                                        this.up("window").close();
                                    }
                                    },
                                    {
                                        text: 'Cancel', handler: function () {
                                        this.up("window").close();
                                    }
                                    }
                                ]
                            })
                            return false;
                        }

                        if ((sNodeType == "1" || sNodeType == "2") & rowRecord.data.type == "Present_Value") {
                            if (Ext.getCmp("Priority_Array_combobox3")) {
                                return false;
                            }
                            Ext.create('Ext.window.Window', {
                                title: 'Write -- Priority_Array',
                                frame: true,
                                width: 315,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                modal: true,
                                layout: "auto",
                                items: [
                                    {
                                        margin: 10,
                                        xtype: "combobox",
                                        allowBlank: false,
                                        id: "Priority_Array_combobox3",
                                        fieldLabel: 'Set Value',
                                        store: ["NULL"],
                                        editable: true,
                                        queryMode: 'local',
                                        validator: function (val) {
                                            if (val == "NULL") {
                                                return true;
                                            }
                                            if (!isNaN(val)) {
                                                return true;
                                            } else {
                                                return "Must enter the Numbers";
                                            }
                                        },
                                        displayField: 'name',
                                        valueField: 'name',
                                        autoSelect: true
                                    }, {
                                        margin: 10,
                                        xtype: "combobox",
                                        allowBlank: false,
                                        id: "Priority_Array_combobox4",
                                        fieldLabel: 'Priority',
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ['abbr', 'name'],
                                            data: [
                                                {name: "Priority1", abbr: "1"},
                                                {name: "Priority2", abbr: "2"},
                                                {name: "Priority3", abbr: "3"},
                                                {name: "Priority4", abbr: "4"},
                                                {name: "Priority5", abbr: "5"},
                                                {name: "Priority6", abbr: "6"},
                                                {name: "Priority7", abbr: "7"},
                                                {name: "Priority8", abbr: "8"},
                                                {name: "Priority9", abbr: "9"},
                                                {name: "Priority10", abbr: "10"},
                                                {name: "Priority11", abbr: "11"},
                                                {name: "Priority12", abbr: "12"},
                                                {name: "Priority13", abbr: "13"},
                                                {name: "Priority14", abbr: "14"},
                                                {name: "Priority15", abbr: "15"},
                                                {name: "Priority16", abbr: "16"}
                                            ]
                                        }),
                                        editable: false,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        autoSelect: true
                                    }
                                ],

                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {

                                        var text1 = Ext.getCmp("Priority_Array_combobox3").value;
                                        var text2 = Ext.getCmp("Priority_Array_combobox4").value;

                                        if (text2 == null || text1 == null) {
                                            Ext.Msg.alert('Exception', 'Input Error.');
                                            return false;
                                        }


                                        if (text1 == "NULL") {
                                            setPresent_Value(sDevNodeName, text1, text2);
                                            /*devPublish(sDevName + ".8.*", sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2, function () {
                                             delayToast('Success', 'Publish Ok.', 0)
                                             })*/
                                        } else {
                                            if (isNaN(text1)) {
                                                Ext.Msg.alert('Exception', 'Input Error.');
                                                return false;
                                            }
                                            setPresent_Value(sDevNodeName, text1, text2);

                                        }
                                        this.up("window").close();
                                    }
                                    },
                                    {
                                        text: 'Cancel', handler: function () {
                                        this.up("window").close();
                                    }
                                    }
                                ]
                            })
                            return false;
                        }

                        if (sNodeType != "0" & rowRecord.data.type == "Offset") {
                            return false;
                        }

                        if (rowRecord.data.type == "Inactive_Text") {
                            context.column.setEditor({
                                xtype: "combobox",
                                editable: false,
                                store: ActiveJson.get("Inactive_Text_Defaults")
                            })
                            return true
                        }
                        if (rowRecord.data.type == "Active_Text") {

                            context.column.setEditor({
                                xtype: "combobox",
                                editable: false,
                                store: ActiveJson.get("Active_Text_Defaults")
                            })
                            return true
                        }
                        if (rowRecord.data.type == "Units") {
                            console.log(arguments)
                            setTimeout(function () {
                                var attributeTable = Ext.create("program.view.window.AttributeTableWin", {
                                    callback: function (value) {
                                        editor.context.column.field.setValue(value)
                                    }
                                });
                                attributeTable.show();
                            }, 500)


                        }
                        if (rowRecord.data.type == "Device_Type") {

                            var combostore = Ext.create('Ext.data.Store', {

                                autoLoad: false,
                                fields: ['name'],
                                data: [
                                    {"name": "0-10=0-100"},
                                    {"name": "NTC10K"},
                                    {"name": "NTC20K"},
                                    {"name": "BI"}
                                ]
                            })
                            context.column.setEditor({
                                xtype: "combobox",
                                store: combostore,
                                validator: function (val) {
                                    if (val == "NTC10K" || val == "NTC20K" || val == "BI") {
                                        return true
                                    }
                                    var arr = val.split("=");
                                    if (arr.length != 2) {
                                        return false;
                                    }
                                    for (var i = 0; i < arr.length; i++) {
                                        var arr_ = arr[i].split("-");
                                        if (arr_.length < 2 || arr_.length > 3) {
                                            return false;
                                        }
                                        isNaN(arr_[0])
                                        isNaN(arr_[1])
                                    }
                                    return true;
                                },
                                displayField: 'name',
                                valueField: 'name'
                            })

                        } else {

                            context.column.setEditor({xtype: "textfield"})
                        }
                        return arguments;
                    }
                }
                console.log(arguments)
                return false
            }
        }
    }
    ,
    columns: [{header: 'Type', flex: 1, dataIndex: "type", sortable: false, resizable: false},
        {
            header: "Value", flex: 1, dataIndex: "value", sortable: false, editor: {
            xtype: 'textfield',
            allowBlank: false//允许空白
        }
        }
    ]


});
