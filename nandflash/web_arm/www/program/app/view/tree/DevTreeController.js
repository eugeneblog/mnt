Ext.define('program.view.tree.DevTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.imgtree',
    render: function (th) {
        Ext.create("Ext.data.TreeStore", {
            storeId: "devtreestore",
        })

    },
    boxready: function (tree) {
        var store = Ext.create("Ext.data.TreeStore", {
            storeId: "devtreestore",
            autoLoad: true,
            url: "resources/main.php?par=getDeviceTree",
            //defaultRootText:location.host+"",
            proxy: {
                type: "ajax",
                url: "resources/main.php?par=getDeviceTree",
                reader: {
                    type: "json"
                }
            }
        })

        tree.setStore(store)
        //devTreeStoreLoad()

    },
    repalceDeviceInstance: function (oldValue, newValue) {
        myAjax(null, function (response) {
            try {
                var resArr = Ext.decode(response.responseText);
                if (resArr.success) {
                    delayToast("Massage", "Success repalce " + resArr.info);
                    devTreeStoreLoad()
                } else {
                    Ext.Msg.alert("Massage", resArr.info);
                }

            } catch (e) {
                Ext.Msg.alert("Massage", "Error " + e);
                throw new Error(e)
            }
        }, {
            par: "repalceDeviceInstance",
            oldDev: oldValue,
            newDev: newValue
        })
    },
    itemcontextmenu: function (th, record, item, index, e, eOpts) {
        e.stopEvent();
        var __this = this;
        var treePanel = this.view;
        // console.log(treePanel)
        if (record.data.depth == 1) {
            Ext.create("Ext.menu.Menu", {    //创建一个菜单
                //floating: true,
                viewModel: treePanel.viewModel,
                autoShow: true,
                x: e.pageX + 5,
                y: e.pageY + 5,
                items: [{
                    text: "DB ••• ",
                    menu: [
                        {
                            text: "load",
                            bind: {
                                hidden: "{linkDataBase}"
                            },
                            handler: function () {
                                function getDevXmlStore() {
                                    var store = null;
                                    myAjax("", function (response) {
                                        try {
                                            store = Ext.decode(response.responseText);
                                            console.log(response);
                                        } catch (e) {
                                        }
                                    }, {
                                        par: "getDevxmls",
                                    })
                                    return store;
                                }

                                var win = Ext.create('Ext.window.Window', {
                                    title: "load",
                                    frame: true,
                                    width: 325,
                                    bodyPadding: 10,
                                    autoShow: true,
                                    defaultType: 'textfield',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            margin: 10,
                                            xtype: "combobox",
                                            allowBlank: false,
                                            fieldLabel: 'select file name',
                                            store: getDevXmlStore(),
                                            editable: false,
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'name',
                                            autoSelect: false
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'Ok', handler: function () {
                                            var text = win.down("combobox").getValue();
                                            if (text == null) {
                                                Ext.Msg.alert('Info', 'Plase select file name.');
                                                return;
                                            }
                                            console.log('-----------加载异步请求-----------')
                                            Ext.Ajax.request({
                                                url:"resources/inspect.php",
                                                method:"GET",
                                                params: { file_name: text},
                                                success:function(response,opts){
                                                    var result = response.responseText;
                                                    // var pattern = /(\s\n)?<\/?xml>(\s\n)?/g;
                                                    if(result){
                                                        //获取input组件
                                                        var xmlModel = Ext.getCmp('modelType').items.items;
                                                        var pattern = new RegExp('['+result+']');  //匹配模式
                                                        for(var i = 1;i<xmlModel.length;i++){
                                                            if(pattern.test(xmlModel[i].value)){
                                                                xmlModel[i].setDisabled(false);
                                                            }else{
                                                                xmlModel[i].setDisabled(true);
                                                            }
                                                        }
                                                        console.log(xmlModel);
                                                        console.log(result);
                                                        // console.log(Ext.getCmp('loadRenameWin'));
                                                    }
                                                    // result.nodename
                                                    // console.log(result.getElementsByTagName('key'));
                                                }
                                            })
                                            console.log('检查xml是否有model');
                                            console.log(text)
                                            Ext.create('program.view.window.RenameWindow', {
                                                sources: "xml",
                                                text: text,
                                            })
                                            win.close();
                                        }
                                        },
                                        {
                                            text: 'Cancel', handler: function () {
                                            win.close();
                                        }
                                        }
                                    ]
                                })

                            }
                        },
                        {
                            text: "save •••",
                            handler: function () {
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
                            text: "clean •••",
                            handler: function () {

                                Ext.Msg.show({
                                    title: 'Warning !!',
                                    message: 'Click Ok will <i style="color:red;">clear the database</i> !!',
                                    buttons: Ext.Msg.YESNOCANCEL,
                                    icon: Ext.Msg.WARNING,
                                    fn: function (btn) {
                                        if (btn === 'yes') {
                                            Ext.Ajax.request({
                                                url: "resources/test1.php",
                                                method: "GET",
                                                async: false,
                                                params: {
                                                    par: "clear"
                                                },
                                                success: function (response) {
                                                    var text = response.responseText;
                                                    Ext.Msg.alert('Status', 'OK , Clear ' + text + ' successfully .');
                                                    setTimeout(function () {
                                                        location.reload();
                                                    }, 3000);
                                                }
                                            });

                                        } else if (btn === 'no') {

                                        } else {

                                        }
                                    }
                                });


                            }
                        }]
                },
                    {
                        text: "Addpoint •••",
                        disabled: true
                    }, {
                        text: "Schedule •••",
                        handler: function () {

                            var aDevNames = getDevNamesAllDataStore()

                            var strnumbervalue = getNetNumberValue();
                            strnumbervalue = Ext.String.leftPad(strnumbervalue, 4, '0');
                            var win = Ext.create('Ext.window.Window', {
                                title: 'new schedule',
                                frame: true,
                                width: 400,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [

                                    {
                                        margin: 10,
                                        allowBlank: false,
                                        editable: false,
                                        value: strnumbervalue,
                                        fieldLabel: 'select file NetNumber',
                                        labelWidth: 150,
                                        xtype: 'textfield',
                                        name: 'name',
                                        allowBlank: false
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {
                                        var text = win.down("textfield").getValue();
                                        if (text == null) {
                                            Ext.Msg.alert('Info', 'Plase select file NetNumber.');
                                            return;
                                        }

                                        var initData = [
                                            //{type: "Object_Name", value: "1"},
                                            //{type: "Present_Value", value: "1"},
                                            //{type: "Description", value: "Description 1"},
                                            //{type: "Priority_For_Writing", value: "8"},
                                            {type: "Position", value: '2'},
                                            {type: "Object_Type", value: "17"},
                                            {
                                                type: "List_Of_Object_Property_References",
                                                value: '{"List_Of_Object_Property_References":[]}'
                                            },
                                            {type: "Object_Identifier", value: "17,9902601"},
                                            {type: "Exception_Schedule", value: '{"Exception_Schedule":[]}'},
                                            {type: "Schedule_Default", value: "Off"},
                                            {type: "Lock_Enable", value: "0"},
                                            {type: "Weekly_Schedule", value: '{"Weekly_Schedule":{}}'},
                                            {type: "Update_Time", value: Ext.Date.format(new Date(), "Y-m-d H:i:s")}
                                        ];

                                        /*var store = Ext.create("Ext.data.Store", {
                                         fields: ["type", "value"],
                                         data: initData
                                         });*/

                                        var win1 = Ext.create('Ext.window.Window', {
                                            title: text + " Schedule Config",
                                            constrainHeader: true,//禁止移出父窗口
                                            height: 400,
                                            width: 450,
                                            resizeable: false,
                                            layout: 'auto',
                                            items: {
                                                xtype: "form",
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'Input Value',
                                                        defaultType: 'textfield',
                                                        margin: 10,
                                                        defaults: {
                                                            anchor: '100%'
                                                        },
                                                        items: [
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: 'Object_Name',
                                                                name: 'Object_Name',
                                                                emptyText: 'object name'
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: 'Present_Value',
                                                                name: 'Present_Value',
                                                                emptyText: 'present value',
                                                                xtype: "combobox",
                                                                store: ["On", "Off"],
                                                                editable: false
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: 'Description',
                                                                name: 'Description',
                                                                emptyText: 'description'
                                                                //inputType: 'password'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'Select Value',
                                                        defaultType: 'textfield',
                                                        margin: 10,
                                                        defaults: {
                                                            anchor: '100%'
                                                        },
                                                        items: [
                                                            {
                                                                fieldLabel: 'Priority_For_Writing',
                                                                xtype: 'combobox',
                                                                labelPad: 30,
                                                                name: 'Priority_For_Writing',
                                                                store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                                                                //valueField: 'abbr',
                                                                value: "8",
                                                                //displayField: 'abbr',
                                                                //typeAhead: true,
                                                                autoSelect: false,
                                                                queryMode: 'local'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'indate',
                                                        margin: 10,
                                                        layout: {
                                                            type: "table",
                                                            columns: 5,
                                                            tableAttrs: {
                                                                style: {
                                                                    //width:"100%"
                                                                }
                                                            }
                                                        },
                                                        defaults: {
                                                            //anchor: '100%'
                                                            format: "d-m-Y",
                                                            labelWidth: 45
                                                        },
                                                        items: [
                                                            {
                                                                xtype: "displayfield",
                                                                fieldLabel: "Effective_Period",
                                                                name: "Effective_Period",
                                                                labelWidth: 110,
                                                                rowspan: 3,
                                                                colspan: 1
                                                            },
                                                            {
                                                                xtype: "fieldcontainer",
                                                                rowspan: 3,
                                                                colspan: 1,
                                                                width: 20,
                                                                layout: {
                                                                    type: "table",
                                                                    columns: 1
                                                                },
                                                                defaults: {
                                                                    width: 20,
                                                                    name: "dataradios"
                                                                },
                                                                items: [{
                                                                    xtype: "radio",
                                                                    checked: true,
                                                                    handler: function (th, bl) {
                                                                        if (!bl)
                                                                            return;
                                                                        Ext.getCmp("ScheduleConfig_after").setDisabled(false);
                                                                        Ext.getCmp("ScheduleConfig_front").setDisabled(true);
                                                                        Ext.getCmp("ScheduleConfig_fromstart").setDisabled(true);
                                                                        Ext.getCmp("ScheduleConfig_fromend").setDisabled(true);
                                                                    }
                                                                },
                                                                    {
                                                                        xtype: "radio",
                                                                        handler: function (th, bl) {
                                                                            if (!bl)
                                                                                return;
                                                                            Ext.getCmp("ScheduleConfig_after").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_front").setDisabled(false);
                                                                            Ext.getCmp("ScheduleConfig_fromstart").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_fromend").setDisabled(true);
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: "radio",
                                                                        handler: function (th, bl) {
                                                                            if (!bl)
                                                                                return;
                                                                            Ext.getCmp("ScheduleConfig_after").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_front").setDisabled(true);
                                                                            Ext.getCmp("ScheduleConfig_fromstart").setDisabled(false);
                                                                            Ext.getCmp("ScheduleConfig_fromend").setDisabled(false);
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                fieldLabel: "after",
                                                                xtype: "datefield",
                                                                id: "ScheduleConfig_after",
                                                                name: "after",
                                                                width: 260,
                                                                rowspan: 1,
                                                                colspan: 3
                                                            },

                                                            {
                                                                allowBlank: false,
                                                                disabled: true,
                                                                xtype: "datefield",
                                                                fieldLabel: "front",
                                                                id: "ScheduleConfig_front",
                                                                name: "front",
                                                                width: 260,
                                                                rowspan: 1,
                                                                colspan: 3
                                                            },
                                                            {
                                                                allowBlank: false,
                                                                disabled: true,
                                                                xtype: "datefield",
                                                                fieldLabel: "from",
                                                                id: "ScheduleConfig_fromstart",
                                                                name: "fromstart",
                                                                width: 150,
                                                                listeners: {
                                                                    change: function (th, newValue, oldValue, eOpts) {
                                                                        var maxValue = new Date(new Date(newValue).getTime() + 777600000000);
                                                                        var minValue = new Date(new Date(newValue).getTime() - 777600000000);
                                                                        Ext.getCmp("ScheduleConfig_fromend").setMaxValue(maxValue);
                                                                        Ext.getCmp("ScheduleConfig_fromend").setMinValue(minValue);
                                                                    }
                                                                }
                                                            }, {
                                                                xtype: "displayfield",
                                                                value: "-",
                                                                width: 5
                                                            }, {
                                                                allowBlank: false,
                                                                disabled: true,
                                                                id: "ScheduleConfig_fromend",
                                                                xtype: "datefield",
                                                                name: "fromend",
                                                                maxValue: "",
                                                                width: 103,
                                                                listeners: {
                                                                    change: function (th, newValue, oldValue, eOpts) {
                                                                        var maxValue = new Date(new Date(newValue).getTime() + 777600000000);
                                                                        var minValue = new Date(new Date(newValue).getTime() - 777600000000);
                                                                        Ext.getCmp("ScheduleConfig_fromstart").setMaxValue(maxValue);
                                                                        Ext.getCmp("ScheduleConfig_fromstart").setMinValue(minValue);
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            buttons: [
                                                {
                                                    text: "OK", handler: function () {
                                                    var devName = getNullSchedule(text).trim();
                                                    if (devName == "null") {
                                                        Ext.Msg.alert('Error', "Cannot create Schedule , There can be at most ten .");
                                                        win1.close()
                                                        return;
                                                    }
                                                    if (!win1.down("form").isValid()) {
                                                        Ext.Msg.alert('Exception', "Please enter the form fields .");
                                                        return;
                                                    }
                                                    win1.down("form").submit({
                                                        url: "resources/test1.php?par=ScheduleConfig&nodename=" + devName,
                                                        async: true,
                                                        method: "GET"
                                                    })

                                                    for (var i = 0; i < initData.length; i++) {
                                                        changeDevValue(devName, initData[i].type, initData[i].value)
                                                    }
                                                    delayToast("Status", 'Create Schedule successfully. New Schedule name is ' + devName + " .", 1000);

                                                    setTimeout(function () {
                                                        win1.close();
                                                    }, 1000)

                                                }
                                                }, {
                                                    text: "Close", handler: function () {
                                                        Ext.Msg.show({
                                                            title: 'Save Changes?',
                                                            message: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
                                                            buttons: Ext.Msg.YESNOCANCEL,
                                                            icon: Ext.Msg.QUESTION,
                                                            fn: function (btn) {
                                                                if (btn === 'yes') {

                                                                    win1.close();
                                                                } else if (btn === 'no') {

                                                                    win1.close();
                                                                } else {

                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            ]
                                        }).show();

                                        win.close();
                                    }
                                    },
                                    {
                                        text: 'Cancel', handler: function () {

                                        win.close();
                                    }
                                    }
                                ]
                            })


                        }
                    }, {
                        text: "NetNumber •••",
                        handler: function () {
                            var NetCount = 1100;
                            var storeData = []
                            for (var i = 0; i < 89; i++) {
                                storeData.push(NetCount)
                                NetCount += 100;
                            }
                            var win = Ext.create('Ext.window.Window', {
                                title: 'NetNumber •••',
                                frame: true,
                                width: 310,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        id: "NetNumberCombobx",
                                        margin: 10,
                                        xtype: "combobox",
                                        allowBlank: false,
                                        fieldLabel: 'select value',
                                        store: storeData,
                                        editable: false,
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'name',
                                        autoSelect: false,
                                        value: "9900"
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {
                                        var text = win.down("combobox").getValue();
                                        if (text == null) {
                                            Ext.Msg.alert('Info', 'Plase select NetNumber ..');
                                            return;
                                        }
                                        Ext.Ajax.request({
                                            url: "resources/xmlRW.php",
                                            async: false,
                                            params: {
                                                fileName: "../../../../bac_config.xml",
                                                rw: "r"
                                            },
                                            success: function (response) {
                                                var xml = $($.parseXML(response.responseText));
                                                xml.find("root net").text(text);
                                                var xmlstr = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + $("<div></div>").append(xml[0].childNodes[0]).html()

                                                Ext.Ajax.request({
                                                    url: "resources/xmlRW.php",
                                                    async: false,
                                                    params: {
                                                        fileName: "../../../../bac_config.xml",
                                                        rw: "w",
                                                        content: xmlstr
                                                    },
                                                    success: function (response) {
                                                        delayToast("Success", "NetNumber new value is " + text, 1000)
                                                    }
                                                })

                                            }
                                        })

                                        win.close();
                                    }
                                    },
                                    {
                                        text: 'Cancel', handler: function () {
                                        win.close();
                                    }
                                    }
                                ], listeners: {
                                    show: function () {
                                        var combox = Ext.getCmp("NetNumberCombobx");

                                        combox.setValue(getNetNumberValue());


                                    }
                                }
                            })

                        }
                    }, "-", {
                        text: "Property",
                        disabled: true
                    }
                ]
            })
        }
        if (record.data.depth == 2) {
            Ext.create("Ext.menu.Menu", {
                //floating: true,
                viewModel: treePanel.viewModel,
                autoShow: true,
                x: e.pageX,
                y: e.pageY,
                listeners: {
                    boxready: function () {
                        var me = this;
                        return;
                        var menu = me.getComponent("deviceinforamation");
//                      var fileName = record.data.text;
                        var fileName = "devxml/" + record.data.text + ".xml";

                        fileExists(fileName, function (response) {
                            // console.log(response.responseText != 1)
                            if (response.responseText != 1) {
                                setTimeout(function () {
                                    menu.setDisabled(true)
                                }, 100)
                            }
                        })
                    }
                },
                items: [
                    {
                        text: "change device instance",
                        handler: function () {

                            Ext.MessageBox.prompt("change key", "please input device instance , old device instance is " + record.data.text, function (ms, v) {
                                if (ms == 'ok') {
                                    if (isNaN(v) || v.length != 4) {
                                        Ext.Msg.alert("Key Exception", "The key ,Does not meet the requirements")
                                        return
                                    }
                                    if (v) {
                                        __this.repalceDeviceInstance(record.data.text, v)
                                    } else {
                                        Ext.Msg.alert("Exception", "device instance exception .")
                                    }
                                }
                            })

                        }
                    },
                    "-",
                    {
                        /* bind: {
                         disabled: "{!linkDataBase}"
                         },*/
                        itemId: "deviceinforamation",
                        text: "deviceinforamation",
                        handler: function () {
                            // console.log(record)
                            Ext.create('program.view.window.RenameWindow', {
                                sDevName: record.data.text,
                                sources: "db"
                            })
                        }
                    },
                    {
                        text: "build", menu: [
                        {
                            text: "build",
                            handler: function () {

                                var textarea = Ext.create("Ext.form.field.TextArea", {
                                    width: "100%",
                                    border: false,
                                    height: 500,
                                    bind: {
                                        hidden: "{!showtextarea.checked}"
                                    }
                                })
                                var checkbox = Ext.create("Ext.form.field.Checkbox", {
                                    reference: "showtextarea",
                                    checked: false,
                                    dock: 'right',
                                    boxLabel: 'Show Xml'
                                })
                                var p = Ext.create('Ext.ProgressBar', {
                                    width: 300,
                                    buttonAlign: "left"
                                });

                                var win = Ext.create("Ext.window.Window", {
                                    //title: record.data.text + ' build',

                                    title: "1000 biuld",
                                    viewModel: Ext.create("program.view.tree.DevTreeModel"),
                                    width: 800,
                                    //height: 500,
                                    //bodyPadding: 10,
                                    frame: true,
                                    autoShow: true,
                                    closable: true,
                                    layout: "auto",
                                    tbar: [
                                        {
                                            xtype: "filebutton",
                                            text: "Select File",
                                            listeners: {
                                                change: function (menu, target, eOpts) {
                                                    var files = target.target.files;

                                                    if (files.length) {
                                                        var file = files[0];
                                                        var reader = new FileReader();
                                                        reader.onload = function () {
                                                            //document.getElementById("filecontent").innerHTML = this.result;

                                                            textarea.setValue(this.result);
                                                            checkbox.setValue(true)
                                                        };
                                                        reader.readAsText(file);
                                                    }
                                                }
                                            }
                                        },
                                        checkbox
                                    ],
                                    items: textarea,
                                    buttons: [
                                        p,
                                        "->",
                                        {
                                            text: 'OK',
                                            itemId: "Ok",
                                            handler: function (menu) {
                                                menu.setDisabled(true);
                                                //me.CloseButton.setD
                                                var packet = Ext.create('Ext.data.amf.Packet');
                                                var xml = packet.parseXml(textarea.getValue())
                                                var keys = xml.querySelectorAll("key");
                                                var aAll = 0;
                                                // console.log(aAll)
                                                for (var i = 0; i < keys.length; i++) {
                                                    aAll += keys[i].getElementsByTagName("*").length;
                                                }
                                                var count = 0;
                                                var delayCount = 0;
                                                for (var i = 0; i < keys.length; i++) {
                                                    //var tags = keys[i].children;
                                                    var tags = keys[i].getElementsByTagName("*");
                                                    var devname = keys[i].getAttribute("number");
                                                    for (var j = 0; j < tags.length; j++) {
                                                        count++;
                                                        var progressNumber = count / aAll;
                                                        if (count % 10 == 0) {
                                                            delayCount++
                                                        }

                                                        (function (progressNumber, devname, tag) {
                                                            // console.log(arguments)
                                                            var type = tag.tagName;
                                                            var value = tag.innerHTML;
                                                            setTimeout(function () {
                                                                p.setValue(progressNumber)
                                                                /* if (tag.tagName == "Set_Alarm") {
                                                                 var setalermpars = tag.children;
                                                                 var setAlermJson = {
                                                                 Set_Alarm: [{}]
                                                                 }
                                                                 for (var i = 0; i < setalermpars.length; i++) {
                                                                 setAlermJson.Set_Alarm[0][setalermpars[i].tagName.toLocaleLowerCase()] = setalermpars[i].innerHTML;
                                                                 }
                                                                 console.log(tag.tagName)
                                                                 type = tag.tagName;
                                                                 value = Ext.encode(setAlermJson)
                                                                 }*/

                                                                if (tag.tagName != "hide") {
                                                                    myAjax("resources/test1.php?par=changevalue&nodename=" + devname + "&type=" + type + "&value=" + value, function () {
                                                                        delayToast('Success', devname + ' Changes ' + type + ' saved successfully,New value is  .' + value, count * 150)
                                                                    })
                                                                }

                                                            }, count * 50 + 1000 * delayCount)

                                                        })(progressNumber, devname, tags[j])
                                                    }
                                                    // console.log(count)
                                                }

                                                var devName = record.data.text;
                                                setTimeout(function () {
                                                    menu.setDisabled(false);

                                                    devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n1");
                                                }, count * 50 + 1000 * delayCount + 1000)
                                                // console.log(xml)
                                                // console.log(this)
                                            }
                                        }, {
                                            text: "Close",
                                            itemId: "Close",
                                            handler: function () {
                                                win.close()
                                            }
                                        }
                                    ]
                                })
                                testwin = win;
                                // console.log(win);


                            }

                        },
                        {
                            text: "upload", handler: function () {

                            var win = Ext.create("program.view.window.EditFile", {
                                title: "upload ",
                                okHandler: function () {


                                    Ext.MessageBox.prompt("Save", "please input file name", function (ms, v) {
                                        if (ms == 'ok') {
                                            if (!v) {
                                                Ext.Msg.alert("Error", 'file')
                                            }

                                            Ext.Ajax.request({
                                                url: "resources/xmlRW.php",
                                                async: false,
                                                method: "POST",
                                                params: {
                                                    fileName: "devxml/" + v,
                                                    content: win.textArea.value,
                                                    rw: "w"
                                                },
                                                success: function (response) {
                                                    if (win.textArea.value.length == response.responseText) {
                                                        delayToast("Maasage", "save success ." + response.responseText);
                                                    } else {
                                                        Ext.Msg.alert("Error", response.responseText);
                                                    }
                                                    // console.log(arguments)
                                                }
                                            })
                                        }

                                    }, this, "", win.fileName)


                                }
                            })
                        }
                        }
                    ]
                    },
                    {
                        text: "backup",
                        handler: function () {
                            var fileName = "devxml/" + record.data.text + ".xml";
                            fileExists(fileName, function (response) {
                                if (response.responseText == 1) {
                                    location.href = "resources/test1.php?par=backup&filename=" + fileName
                                } else {
                                    Ext.Msg.alert("Massage", "file does not exist .");
                                }
                            })


                            /* myAjax("resources/test1.php?par=file_exists&filename=devxml/" + record.data.text + ".xml",
                             )*/
                        }
                    },
                    "-",
                    {
                        text: "Schedule...",
                        disabled: true
                    },
                    {
                        text: "Update", handler: function () {
                        var keyArr = getDevAllByDevice(record.data.text);

                        var pbwin = Ext.createByAlias("progressbarwin",
                            {
                                y: 0,
                                allCount: keyArr.length
                            }
                        )
                        for (var i = 0; i < keyArr.length; i++) {
                            (function (key, i) {
                                setTimeout(function () {
                                    updateKey(key);
                                    pbwin.setValue(i + 1)
                                    pbwin.show();
                                }, i * 500)
                            })(keyArr[i], i)
                        }
                        devTreeStoreLoad()

                        treePanel.expandAll()

                    }
                    },
                    {
                        text: "BACnetNO.",
                        handler: function () {

                            var win = Ext.create('Ext.window.Window', {
                                title: 'BACnetNO •••',
                                frame: true,
                                width: 310,
                                bodyPadding: 10,
                                autoShow: true,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        margin: 10,
                                        xtype: "numberfield",
                                        allowBlank: false,
                                        fieldLabel: 'select file name',
                                        value: 1000,
                                        maxValue: 9900,
                                        minValue: 1000,
                                        step: 100,
                                        validator: function (value) {
                                            if (value % 100 == 0) {
                                                return true;
                                            } else {
                                                return "This value is invalid,Plase input 1000-9000 A number between.Interval of 100";
                                            }
                                        }
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Ok', handler: function () {
                                        var text = win.down("numberfield").getValue();
                                        if (!win.down("numberfield").isValid()) {
                                            Ext.Msg.alert('Info', 'Plase select file name.');
                                            return;
                                        }
                                        var devName = record.data.text;
                                        devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n" + text);
                                        win.close();
                                    }
                                    },
                                    {
                                        text: 'Cancel', handler: function () {
                                        win.close();
                                    }
                                    }
                                ]
                            })

                        }
                    },
                    {
                        text: "Save...",
                        menu: [
                            {
                                text: "Save Property", handler: function () {
                                var devName = record.data.text.substr(0, 4)
                                devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n1");
                            }


                            },
                            {
                                text: "Download Property", handler: function () {
                                var sDevName = record.data.text;
                                myAjax(null, null, {
                                    par: "copyFile",
                                    sources: "devxml/" + sDevName + ".xml",
                                    target: "/mnt/nandflash/" + sDevName + ".xml"
                                })
                                //filePublish("9999.8.*", "9999998\r\nSend_Config_File\r\n" + sDevName);
                                //delayToast("Massage","publish ok "+record.data.text+".8.*" + " 9999998\r\nSend_Config_File\r\n" + record.data.text)
                                myAjax("resources/test1.php?par=file_exists&filename=devxml/" + record.data.text + ".xml", function (response) {
                                    if (response.responseText == 1) {
                                        filePublish(record.data.text + ".8.*", "9999998\r\nSend_Config_File\r\n" + record.data.text);
                                        //filePublish(record.data.text+".8.*", "9999998\r\nSend_Config_File\r\n" + record.data.text);
                                        //location.href = "resources/test1.php?par=backup&filename=devxml/" + record.data.text + ".xml"
                                    } else {
                                        Ext.Msg.alert("Massage", "file does not exist .");
                                    }
                                })
                            }
                            }
                        ],

                    },
                    {
                        text: "RestorFactory", handler: function () {
                        var devName = record.data.text;
                        devPublish(devName + ".8.*", devName + "701\r\nPresent_Value\r\n2");
                    }
                    },
                    {
                        text: "bin download", handler: function () {
                        var devName = record.data.text;
                        var form = Ext.create("Ext.form.Panel", {
                                width: "100%",
                                height: "100%",
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        xtype: 'filefield',
                                        name: 'file1',
                                        fieldLabel: 'Plase select .bin file',
                                        labelWidth: 150,
                                        msgTarget: 'side',
                                        allowBlank: false,
                                        anchor: '100%',
                                        buttonText: 'Select file...',
                                        listeners: {
                                            blur: function () {

                                            }
                                        }
                                    }
                                ],
                                listeners: {
                                    boxready: function () {
                                        //var downButton = form.el.dom.querySelector('.x-form-file-input');
                                        //downButton.accept="application/x-gzip"
                                    }
                                }
                            }
                        )

                        var win = Ext.create("Ext.window.Window", {
                            title: 'Upload .bin file',
                            width: 550,
                            height: 130,
                            bodyPadding: 10,
                            frame: true,
                            autoShow: true,
                            layout: "auto",
                            items: form,
                            buttons: [{
                                text: 'Upload',
                                handler: function () {
                                    // console.log(this)
                                    //var form = form.getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            waitMsg: 'Updateing your program...',
                                            url: 'resources/test1.php?par=uploadBin',
                                            method: "POST",
                                            metadata: {"enctype": "multipart/form-data"},
                                            Massage: function (form, action) {
                                                if (action.response.responseText.indexOf("Error") >= 0) {
                                                    Ext.Msg.alert("Exception", "auto update failure , Please use manual installation package update 。 ");
                                                    return;
                                                }
                                                Ext.Msg.alert("Upload Done", action.response.responseText)
                                                devPublish(devName + ".8.*", "9999998\r\nSend_Bin_File\r\n" + devName);
                                                /*Ext.Msg.show({
                                                 title: 'Massage',
                                                 message: 'program update success .',
                                                 buttons: Ext.Msg.YES,
                                                 //icon: Ext.Msg.INFO,
                                                 fn: function (btn) {
                                                 if (btn === 'yes') {
                                                 location.reload()
                                                 }
                                                 }
                                                 });*/
                                            },
                                            success: function (form, action) {
                                                this.Massage(form, action)
                                            },
                                            failure: function (form, action) {
                                                this.Massage(form, action)
                                            }
                                        });

                                    }

                                }
                            }]
                        })


                    }
                    }
                ]
            })
        }

        //{text: "Shedule Config"}, {text: "event"}, {text: "week"},
        if (record.data.depth == 3) {
            if (record.data.text != "Schedule") {
                /*Ext.create("Ext.menu.Menu", {
                 //floating: true,
                 autoShow: true,
                 x: e.pageX + 5,
                 y: e.pageY + 5,
                 items: [
                 {
                 text: "new..."
                 //disabled: true
                 }
                 ]
                 }
                 )*/
            }
        }
        if (record.data.depth == 4) {
            var sDevNodeName = record.data.value;
            var sNodeType = record.data.type;
            var sDevName = record.data.text;
            if (record.parentNode.data.text == "Schedule") {
                Ext.create("Ext.menu.Menu", {
                    //floating: true,
                    autoShow: true,
                    x: e.pageX + 5,
                    y: e.pageY + 5,
                    items: [
                        {
                            text: "Schedule Config", handler: function () {
                            var win1 = Ext.create('Ext.window.Window', {
                                title: sDevNodeName + " Schedule Config",
                                constrainHeader: true,//禁止移出父窗口
                                height: 400,
                                width: 450,
                                resizeable: false,
                                layout: 'auto',
                                items: {
                                    xtype: "form",
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Input Value',
                                            defaultType: 'textfield',
                                            margin: 10,
                                            defaults: {
                                                anchor: '100%'
                                            },

                                            items: [
                                                {
                                                    name: 'Object_Name',
                                                    allowBlank: false,
                                                    fieldLabel: 'Object_Name',
                                                    id: "Object_Name",
                                                    emptyText: 'object name'
                                                },
                                                {
                                                    id: "Present_Value",
                                                    allowBlank: false,
                                                    fieldLabel: 'Present_Value',
                                                    name: 'Present_Value',
                                                    emptyText: 'present value',
                                                    xtype: "combobox",
                                                    store: ["On", "Off"],
                                                    editable: false
                                                },
                                                {
                                                    id: "Description",
                                                    allowBlank: false,
                                                    fieldLabel: 'Description',
                                                    name: 'Description',
                                                    emptyText: 'description'
                                                    //inputType: 'password'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Select Value',
                                            defaultType: 'textfield',
                                            margin: 10,
                                            defaults: {
                                                anchor: '100%'
                                            },
                                            items: [
                                                {
                                                    id: "Priority_For_Writing",
                                                    fieldLabel: 'Priority_For_Writing',
                                                    xtype: 'combobox',
                                                    labelPad: 30,
                                                    name: 'Priority_For_Writing',
                                                    store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                                                    //valueField: 'abbr',
                                                    value: "8",
                                                    //displayField: 'abbr',
                                                    //typeAhead: true,
                                                    autoSelect: false,
                                                    queryMode: 'local'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'indate',
                                            margin: 10,
                                            layout: {
                                                type: "table",
                                                columns: 5,
                                                tableAttrs: {
                                                    style: {
                                                        //width:"100%"
                                                    }
                                                }
                                            },
                                            defaults: {
                                                //anchor: '100%'
                                                format: "d-m-Y",
                                                labelWidth: 45
                                            },
                                            items: [
                                                {
                                                    xtype: "displayfield",
                                                    fieldLabel: "Effective_Period",
                                                    name: "Effective_Period",
                                                    labelWidth: 110,
                                                    rowspan: 3,
                                                    colspan: 1
                                                },
                                                {
                                                    xtype: "fieldcontainer",
                                                    rowspan: 3,
                                                    colspan: 1,
                                                    width: 20,
                                                    layout: {
                                                        type: "table",
                                                        columns: 1
                                                    },
                                                    defaults: {
                                                        width: 20,
                                                        name: "dataradios"
                                                    },
                                                    items: [{
                                                        xtype: "radio",
                                                        id: "Effective_Period_radio1",
                                                        checked: true,
                                                        handler: function (th, bl) {
                                                            if (!bl)
                                                                return;
                                                            Ext.getCmp("ScheduleConfig_after").setDisabled(false);
                                                            Ext.getCmp("ScheduleConfig_front").setDisabled(true);
                                                            Ext.getCmp("ScheduleConfig_fromstart").setDisabled(true);
                                                            Ext.getCmp("ScheduleConfig_fromend").setDisabled(true);
                                                        }
                                                    },
                                                        {
                                                            xtype: "radio",
                                                            id: "Effective_Period_radio2",
                                                            handler: function (th, bl) {
                                                                if (!bl)
                                                                    return;
                                                                Ext.getCmp("ScheduleConfig_after").setDisabled(true);
                                                                Ext.getCmp("ScheduleConfig_front").setDisabled(false);
                                                                Ext.getCmp("ScheduleConfig_fromstart").setDisabled(true);
                                                                Ext.getCmp("ScheduleConfig_fromend").setDisabled(true);
                                                            }
                                                        },
                                                        {
                                                            xtype: "radio",
                                                            id: "Effective_Period_radio3",
                                                            handler: function (th, bl) {
                                                                if (!bl)
                                                                    return;
                                                                Ext.getCmp("ScheduleConfig_after").setDisabled(true);
                                                                Ext.getCmp("ScheduleConfig_front").setDisabled(true);
                                                                Ext.getCmp("ScheduleConfig_fromstart").setDisabled(false);
                                                                Ext.getCmp("ScheduleConfig_fromend").setDisabled(false);
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    allowBlank: false,
                                                    fieldLabel: "after",
                                                    xtype: "datefield",
                                                    id: "ScheduleConfig_after",
                                                    name: "after",
                                                    width: 260,
                                                    rowspan: 1,
                                                    colspan: 3
                                                },

                                                {
                                                    allowBlank: false,
                                                    disabled: true,
                                                    xtype: "datefield",
                                                    fieldLabel: "front",
                                                    id: "ScheduleConfig_front",
                                                    name: "front",
                                                    width: 260,
                                                    rowspan: 1,
                                                    colspan: 3
                                                },
                                                {
                                                    allowBlank: false,
                                                    disabled: true,
                                                    xtype: "datefield",
                                                    fieldLabel: "from",
                                                    id: "ScheduleConfig_fromstart",
                                                    name: "fromstart",
                                                    width: 150,
                                                    listeners: {
                                                        change: function (th, newValue, oldValue, eOpts) {
                                                            var maxValue = new Date(new Date(newValue).getTime() + 777600000000);
                                                            var minValue = new Date(new Date(newValue).getTime() - 777600000000);
                                                            Ext.getCmp("ScheduleConfig_fromend").setMaxValue(maxValue);
                                                            Ext.getCmp("ScheduleConfig_fromend").setMinValue(minValue);
                                                        }
                                                    }
                                                }, {
                                                    xtype: "displayfield",
                                                    value: "-",
                                                    width: 5
                                                }, {
                                                    allowBlank: false,
                                                    disabled: true,
                                                    id: "ScheduleConfig_fromend",
                                                    xtype: "datefield",
                                                    name: "fromend",
                                                    maxValue: "",
                                                    width: 103,
                                                    listeners: {
                                                        change: function (th, newValue, oldValue, eOpts) {
                                                            var maxValue = new Date(new Date(newValue).getTime() + 777600000000);
                                                            var minValue = new Date(new Date(newValue).getTime() - 777600000000);
                                                            Ext.getCmp("ScheduleConfig_fromstart").setMaxValue(maxValue);
                                                            Ext.getCmp("ScheduleConfig_fromstart").setMinValue(minValue);
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                buttons: [
                                    {
                                        text: "OK", handler: function () {
                                        if (!win1.down("form").isValid()) {
                                            Ext.Msg.alert('Exception', "Please enter the form fields .");
                                            return;
                                        }
                                        ;
                                        var url = "resources/test1.php?par=ScheduleConfig&ispublish=true&nodename=" + sDevNodeName;
                                        if (sDevName == getNetNumberValue()) {
                                            url = "resources/test1.php?par=ScheduleConfig&nodename=" + sDevNodeName;
                                        }
                                        win1.down("form").submit({
                                            url: url,
                                            async: true,
                                            method: "GET"
                                        });
                                        delayToast("Status", 'Create Schedule successfully. New Schedule name is ' + sDevNodeName + " .", 1000);
                                        setTimeout(function () {
                                            win1.close();
                                        }, 1000)

                                    }
                                    }, {
                                        text: "Close", handler: function () {
                                            Ext.Msg.show({
                                                title: 'Save Changes?',
                                                message: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
                                                buttons: Ext.Msg.YESNOCANCEL,
                                                icon: Ext.Msg.QUESTION,
                                                fn: function (btn) {
                                                    if (btn === 'yes') {

                                                        win1.close();
                                                    } else if (btn === 'no') {

                                                        win1.close();
                                                    } else {

                                                    }
                                                }
                                            });
                                        }
                                    }
                                ]
                            }).show();
                            var cArr = ["Object_Name", "Present_Value", "Description", "Priority_For_Writing"]
                            for (var i = 0; i < cArr.length; i++) {
                                myAjax("resources/test1.php?par=getvalue&nodename=" + sDevNodeName + "&type=" + cArr[i], function (response) {
                                    var text = response.responseText.trim();
                                    Ext.getCmp(cArr[i]).setValue(text)
                                })
                            }
                            myAjax("resources/test1.php?par=getvalue&nodename=" + sDevNodeName + "&type=Effective_Period", function (response) {
                                var text = response.responseText.trim();
                                var oJson = Ext.decode(text)
                                var dateType = "";
                                var startYear = oJson.dateRange['startDate']["year"];
                                var endYear = oJson.dateRange['endDate']["year"];
                                if (startYear != 255 & endYear != 255) {
                                    dateType = "from";
                                } else if (startYear != 255 & endYear == 255) {
                                    dateType = "after";
                                } else if (startYear == 255 & endYear != 255) {
                                    dateType = "front";
                                } else {
                                    Ext.Msg.alert('Massage', ' "invalid date , This attribute is initialized, ok .');
                                    return;
                                }
                                // console.log(oJson.dateRange['startDate']["year"])
                                // console.log(oJson.dateRange['endDate']["year"])

                                if (dateType == 'after') {
                                    Ext.getCmp("Effective_Period_radio1").setValue(true)
                                    var cAfter = Ext.getCmp("ScheduleConfig_after");
                                    //var cFront = Ext.getCmp("ScheduleConfig_front");
//                                    console.log(oJson)
                                    var syear = oJson.dateRange['startDate']["year"];
                                    var smon = oJson.dateRange['startDate']["month"];
                                    var sday = oJson.dateRange['startDate']["day_of_month"];
                                    cAfter.setValue(new Date(syear, smon - 1, sday));
                                }
                                if (dateType == 'front') {
                                    Ext.getCmp("Effective_Period_radio2").setValue(true)
                                    var cFront = Ext.getCmp("ScheduleConfig_front");
                                    var syear = oJson.dateRange['endDate']["year"];
                                    var smon = oJson.dateRange['endDate']["month"];
                                    var sday = oJson.dateRange['endDate']["day_of_month"];
                                    cFront.setValue(new Date(syear, smon - 1, sday));
                                }
                                if (dateType == 'from') {
                                    var cFormstart = Ext.getCmp("ScheduleConfig_fromstart");
                                    var cFormend = Ext.getCmp("ScheduleConfig_fromend");
                                    var syear = oJson.dateRange['startDate']["year"];
                                    var smon = oJson.dateRange['startDate']["month"];
                                    var sday = oJson.dateRange['startDate']["day_of_month"];
                                    var eyear = oJson.dateRange['endDate']["year"];
                                    var emon = oJson.dateRange['endDate']["month"];
                                    var eday = oJson.dateRange['endDate']["day_of_month"];

                                    cFormstart.setValue(new Date(syear, smon - 1, sday));
                                    cFormend.setValue(new Date(eyear, emon - 1, eday));
                                    Ext.getCmp("Effective_Period_radio3").setValue(true)
                                }
                            })

                        }
                        },
                        {
                            text: "References",
                            handler: function () {

                                var sDevName = (sDevNodeName + "").substr(0, 4)
                                myAjax("resources/test1.php?par=getreferencesdev&nodename=" + sDevNodeName, function (response) {
                                    var text = eval(response.responseText.trim());
                                    // console.log(text)

                                    var sourceData = [];
                                    var targetData = [];
                                    var objList = [];
                                    Ext.Ajax.request({
                                        async:false,
                                        url:"resources/main.php?par=getDevList",
                                        success:function(response){
                                            try{
                                                objList = Ext.decode(response.responseText);
                                            }catch (e){
                                                // console.log(arguments)
                                                Ext.Msg.alert("Exception","load Object_Name failure .")
                                            }
                                        }
                                    })
                                    myAjax("resources/test1.php?par=getvalue&nodename=" + sDevNodeName + "&type=List_Of_Object_Property_References", function (response) {
                                        var text;
                                        try {
                                            text = Ext.decode(response.responseText)["List_Of_Object_Property_References"];
                                        } catch (e) {
                                            delayToast("Message", "invalid data , This attribute is initialized, ok .")
                                            text = []
                                        }

                                        for (var i = 0; i < text.length; i++) {
                                            var dev = text[i].device_id || sDevName;
                                            dev += ""
                                            if ((dev + "").length == 3) {
                                                dev = "0" + dev;
                                            }
                                            if ((dev + "").length == 2) {
                                                dev = "00" + dev;
                                            }
                                            if ((dev + "").length == 1) {
                                                dev = "000" + dev;
                                            }
                                            var type = text[i].objectIdentifier["type"] + "";
                                            var instance = text[i].objectIdentifier["instance"] + "";
                                            if (instance.length == 1) {
                                                instance = "0" + instance;
                                            }
                                            var key = dev + type + instance;
                                            var obj ="";
                                            objList.find(function(v){
                                                if(v.value==key){
                                                    obj=v.name;
                                                    return v;
                                                }
                                            })

                                            targetData.push({
                                                'name': key,
                                                'Object_Name':obj,
                                                "identifier": text[i].propertyIdentifier,
                                                "arrayIndex": text[i].propertyArrayIndex
                                            });
                                        }
                                    })
                                    // console.log(targetData)
                                    var netNumber = getNetNumberValue()



                                    for (var i = 0; i < text.length; i++) {
                                        var key = text[i];
                                        var obj = "";
                                        objList.find(function(v){
                                            if(v.value==key){
                                                obj=v.name;
                                                return v;
                                            }
                                        })
                                        if (sDevName == netNumber) {
                                            sourceData.push({'name': key,
                                                'Object_Name':obj,
                                                "identifier": "85", "arrayIndex": "-1"})
                                        } else {
                                            if (sDevName == (key + "").substr(0, 4)) {
                                                sourceData.push({
                                                    'name': key,
                                                    'Object_Name':obj,
                                                    "identifier": "85",
                                                    "arrayIndex": "-1"
                                                })
                                            }

                                        }

                                        for (var j = 0; j < targetData.length; j++) {
                                            if (text[i] == targetData[j].name) {
                                                // console.log("pop")
                                                sourceData.pop()
                                            }
                                        }
                                    }



                                    // console.log(targetData)
                                    // console.log(sourceData)


                                    Ext.create('Ext.data.Store', {
                                        fields: [{
                                            name: "name", type: "string", convert: function (val) {
                                                if ((val + "").length == 6) {
                                                    val = "0" + val;
                                                }
                                                if ((val + "").length == 5) {
                                                    val = "00" + val;
                                                }
                                                if ((val + "").length == 4) {
                                                    val = "000" + val;
                                                }
                                                return val;
                                            }
                                        }, {
                                            name: "Object_Name", type: "string",
                                           /* mapping: function (model) {
                                                console.log(model["Object_Name"],model["Object_Name"].length)
                                                if(model["Object_Name"].trim().length!=0){
                                                   return
                                                }
                                                var data = "";
                                                Ext.Ajax.request({
                                                    url: "resources/test1.php",
                                                    async: false,
                                                    params: {
                                                        par: "getvalue",
                                                        nodename: model.name,
                                                        type: "Object_Name"
                                                    },
                                                    success: function (response) {
                                                        if (response.status == 200) {
                                                            data = response.responseText
                                                        }
                                                    }
                                                })
                                                return data;
                                            }*/
                                        },
                                            {name: "identifier", type: "string"},
                                            {name: "arrayIndex", type: "string"}
                                        ],
                                        storeId: "refSourceStore",
                                        data: sourceData
                                    }),
                                        Ext.create("Ext.window.Window", {
                                            title: sDevNodeName + " References",
                                            //title: "References",
                                            constrainHeader: true,//禁止移出父窗口
                                            height: 600,
                                            width: 750,
                                            autoShow: true,
                                            layout: 'hbox',
                                            //resizable: false,
                                            buttons: [
                                                {
                                                    text: "Ok",
                                                    handler: function () {
                                                        var target = Ext.data.StoreManager.lookup('refTargetStore');
                                                        var aItems = target.getData().items;
                                                        var oJson = {
                                                            "List_Of_Object_Property_References": []
                                                        }
                                                        for (var i = 0; i < aItems.length; i++) {
                                                            // console.log(aItems[i].data.name)
                                                            if (sDevName == "1000" || sDevName ==netNumber) {
                                                                oJson['List_Of_Object_Property_References'].push({
                                                                    "objectIdentifier": {
                                                                        "type": parseInt((aItems[i].data.name + "").substr(4, 1)),
                                                                        "instance": parseInt((aItems[i].data.name + "").substr(5, 2))
                                                                    },
                                                                    "device_id": parseInt((aItems[i].data.name + "").substr(0, 4)),
                                                                    "propertyIdentifier": parseInt(aItems[i].data.identifier),
                                                                    "propertyArrayIndex": parseInt(aItems[i].data.arrayIndex)
                                                                })
                                                            } else {
                                                                oJson['List_Of_Object_Property_References'].push({
                                                                    "objectIdentifier": {
                                                                        "type": parseInt((aItems[i].data.name + "").substr(4, 1)),
                                                                        "instance": parseInt((aItems[i].data.name + "").substr(5, 2))
                                                                    },
                                                                    "propertyIdentifier": parseInt(aItems[i].data.identifier),
                                                                    "propertyArrayIndex": parseInt(aItems[i].data.arrayIndex)
                                                                })
                                                            }
                                                        }
                                                        // console.log(Ext.encode(oJson))

                                                        Ext.Ajax.request({
                                                            url: "resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=List_Of_Object_Property_References",
                                                            method: "POST",
                                                            params: {
                                                                value: Ext.encode(oJson)
                                                            },
                                                            success: function (response) {
                                                                var text = response.responseText;
                                                                delayToast("Status", "Changes saved successfully .", 1000)
                                                            }
                                                        });

                                                        if (sDevName != getNetNumberValue()) {
                                                            devPublish(sDevName + ".8.*", sDevNodeName + "\r\nList_Of_Object_Property_References\r\n" + (Ext.encode(oJson).replaceAll("\\s*|\t|\r|\n", "")));
                                                        } else {
                                                            myAjax("resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=Position&value=2", function (response) {
                                                                delayToast("Massage", "Change Position Ok .", 1000)
                                                            })
                                                        }
                                                        this.up("window").close()

                                                    }
                                                }
                                            ],
                                            defaults: {
                                                height: "100%"
                                            },

                                            items: [
                                                {
                                                    xtype: "gridpanel",
                                                    itemId: "sourceGridPanel",
                                                    flex: 4,
                                                    border: true,
                                                    margin: 5,
                                                    title: "Wait to be selected",
                                                    viewConfig: {
                                                        plugins: {
                                                            ptype: 'gridviewdragdrop',
                                                            dragText: 'Drag and drop to reorganize'
                                                        }
                                                    },
                                                    store: "refSourceStore",
                                                    columns: [
                                                        {
                                                            header: 'Name', dataIndex: 'name', flex: 1
                                                        },
                                                        {
                                                            header: "Object_Name", dataIndex: "Object_Name", flex: 1
                                                        },
                                                        {
                                                            header: 'Identifier',
                                                            dataIndex: 'identifier',
                                                            flex: 1,
                                                            hidden: true
                                                        },
                                                        {
                                                            header: 'ArrayIndex',
                                                            dataIndex: 'arrayIndex',
                                                            flex: 1,
                                                            hidden: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: "panel",
                                                    //flex:1,
                                                    //border: "1 0 1 0",
                                                    width: 90,
                                                    layout: {
                                                        type: 'center'

                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            margin: "0 0 300 0",
                                                            text: "select", handler: function (button) {
                                                            var source = Ext.data.StoreManager.lookup('refSourceStore');
                                                            var target = Ext.data.StoreManager.lookup('refTargetStore');
                                                            var sourceGridPanel = button.up("window").getComponent("sourceGridPanel");
                                                            var targetGridPanel = button.up("window").getComponent("targetGridPanel");

                                                            target.add(source.remove(sourceGridPanel.getSelection()[0]));
                                                        }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: "0 0 240 0",
                                                            text: "move", handler: function (button) {
                                                            var source = Ext.data.StoreManager.lookup('refSourceStore');
                                                            var target = Ext.data.StoreManager.lookup('refTargetStore');
                                                            var sourceGridPanel = button.up("window").getComponent("sourceGridPanel");
                                                            var targetGridPanel = button.up("window").getComponent("targetGridPanel");
                                                            source.add(target.remove(targetGridPanel.getSelection()[0]));
                                                        }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: "0 0 70 0",
                                                            text: "Select All →",
                                                            scale: 'small',
                                                            handler: function () {
                                                                var source = Ext.data.StoreManager.lookup('refSourceStore');
                                                                var target = Ext.data.StoreManager.lookup('refTargetStore');
                                                                target.add(source.removeAll())
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            //margin: "0 0 0 0",
                                                            text: "Move All ←",
                                                            scale: 'small',
                                                            handler: function () {
                                                                var source = Ext.data.StoreManager.lookup('refSourceStore');
                                                                var target = Ext.data.StoreManager.lookup('refTargetStore');
                                                                source.add(target.removeAll())
                                                            }
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: "gridpanel",
                                                    title: "Has been selected",
                                                    flex: 4,
                                                    border: true,
                                                    margin: 5,
                                                    itemId: "targetGridPanel",
                                                    viewConfig: {
                                                        plugins: {
                                                            ptype: 'gridviewdragdrop',
                                                            dragText: 'Drag and drop to reorganize'
                                                        }
                                                    },
                                                    store: Ext.create('Ext.data.Store', {
                                                        fields: [{name: "name", type: "string"},
                                                            {
                                                                name: "Object_Name", type: "string",
                                                                /*mapping: function (model) {
                                                                    console.log(arguments)
                                                                    var data = "";
                                                                    Ext.Ajax.request({
                                                                        url: "resources/test1.php",
                                                                        params: {
                                                                            par: "getvalue",
                                                                            nodename: model.name,
                                                                            type: "Object_Name"
                                                                        },
                                                                        success: function (response) {
                                                                            if (response.status == 200) {
                                                                                data = response.responseText
                                                                                model.set("Object_Name",data)

                                                                            }
                                                                        }
                                                                    })
                                                                    return data;
                                                                }*/
                                                            },
                                                            {name: "identifier", type: "string"},
                                                            {name: "arrayIndex", type: "string"}
                                                        ],

                                                        storeId: "refTargetStore",
                                                        data: targetData,
                                                        listeners: {
                                                            load: function () {
                                                                // console.log(arguments)
                                                            }
                                                        }
                                                    }),
                                                    columns: [
                                                        {header: 'Name', dataIndex: 'name', flex: 1},
                                                        {
                                                            header: "Object_Name", dataIndex: "Object_Name", flex: 1
                                                        },
                                                        {
                                                            header: 'Identifier',
                                                            dataIndex: 'identifier',
                                                            flex: 1,
                                                            hidden: true
                                                        },
                                                        {
                                                            header: 'ArrayIndex',
                                                            dataIndex: 'arrayIndex',
                                                            flex: 1,
                                                            hidden: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        })
                                })
                            }
                        },
                        {
                            text: "week",
                            handler: function () {
                                var dwwin = Ext.getCmp("drawWindow")
                                if (dwwin) {
                                    dwwin.close()
                                }

                                Ext.create('program.view.window.DrawWeeksWindow', {
                                    sDevNodeName: sDevNodeName,
                                    sDevName: sDevName,
                                    id: "drawWindow"
                                })

                            }
                        },
                        {
                            text: "exception"
                        },
                        {
                            text: "Synchronous", handler: function () {
                            Ext.create('program.view.window.SynchrnousWindow', {
                                sDevNodeName: sDevNodeName,
                                sDevName: sDevName
                            })
                        },
                            listeners: {
                                boxready: function (menu) {
                                    if (sDevName.substr(2, 2) != "00") {
                                        menu.hide()
                                    }
                                }
                            }
                        },
                        "-",
                        {
                            text: "Update", handler: function () {
                            updateKey(sDevNodeName);
                            devTreeStoreLoad()

                            treePanel.expandAll()
                        }
                        },
                        {
                            text: "Delete Key",
                            handler: function () {
                                Ext.Msg.show({
                                    title: 'Delete ?',
                                    message: 'Would you delete this key? This key is ' + sDevNodeName,
                                    buttons: Ext.Msg.YESNOCANCEL,
                                    icon: Ext.Msg.WARNING,
                                    fn: function (btn) {
                                        if (btn === 'yes') {
                                            deleteKey(sDevNodeName)
                                        }
                                    }
                                });
                            }
                        }
                    ]
                })


                return false;
            }
            Ext.create("Ext.menu.Menu", {
                //floating: true,
                autoShow: true,
                x: e.pageX + 5,
                y: e.pageY + 5,
                items: [
                    {
                        text: "Property", handler: function () {
                        if (Ext.getCmp("devNodeWindow")) {
                            var win = Ext.getCmp("devNodeWindow")
                            win.setTitle(sDevNodeName + " Property")
                            win.datas.record = record;
                            var store = Ext.data.StoreManager.lookup('ParametersStore');
                            store.getProxy().setUrl('resources/test1.php?par=node&type=parameters&&nodename=' + sDevNodeName)
                            store.load()
                            var store1 = Ext.data.StoreManager.lookup('PropertypegridStore');
                            store1.getProxy().setUrl('resources/test1.php?par=node&type=event&nodename=' + sDevNodeName)
                            store1.load()
                            return;
                        }

                        /* var store = Ext.create("Ext.data.Store", {
                         id: "devNodeStore",
                         fields: ["type", "value"],
                         //data: serversData,
                         proxy: {
                         type: 'ajax',
                         url: 'resources/test1.php?par=node&nodename=' + sDevNodeName
                         }
                         })

                         store.load()
                         store.data.items.sort(function (a, b) {
                         console.log(a + b)
                         return a.value - b.value
                         })*/
                        Ext.create('Ext.window.Window', {
                            id: "devNodeWindow",
                            title: sDevNodeName + " Property",
                            constrainHeader: true,//禁止移出父窗口
                            style: {
                                boxShadow: "rgb(0, 0, 25) 5px 5px 10px"
                            },
                            height: 768,
                            width: 1024,
                            maxHeight: Ext.getBody().getHeight(),
                            layout: 'accordion',
                            listeners: {
                                show: function (th) {
                                    th.datas = {'record': record};
                                }
                            },
                            items: [
                                Ext.widget("propertypegrid", {
                                    title: "Parameters",
                                    th: th,
                                    record: record,
                                    store: Ext.create("Ext.data.Store", {
                                        id: "ParametersStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=parameters&nodename=' + sDevNodeName
                                        }
                                    })
                                }),
                                Ext.create("propertypegrid", {
                                    title: "Event",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "PropertypegridStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=event&nodename=' + sDevNodeName
                                        }
                                    })
                                })
                                ,
                                Ext.create("propertypegrid", {
                                    title: "Alarm",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "PropertypegridStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=alarm&nodename=' + sDevNodeName
                                        }
                                    })
                                }),
                                Ext.create("propertypegrid", {
                                    title: "Other",
                                    store: Ext.create("Ext.data.Store", {
                                        id: "PropertypegridStore",
                                        autoLoad: true,
                                        fields: ["type", "value"],
                                        proxy: {
                                            type: 'ajax',
                                            url: 'resources/test1.php?par=node&type=other&nodename=' + sDevNodeName
                                        }
                                    })
                                })

                            ],
                            buttons: [
                                {
                                    text: "Close", handler: function () {
                                    this.up("window").close();
                                }
                                }
                            ]
                        }).show();
                        // console.log(arguments)
                    }
                    },

                    {
                        text: "Event&AlarmConfig",
                        handler: function () {
                            Ext.create('program.view.window.AlarmWindow', {
                                sDevNodeName: sDevNodeName,
                                sDevName: sDevName,
                                sDevNodeType: record.parentNode.data.text
                            })
                        },
                        listeners: {
                            boxready: function () {
                                var me = this;
                                //AIAOAV
                                var text = record.parentNode.data.text
                                if (text != "AI" & text != "AO" & text != "AV") {
                                    //me.hide()
                                }
                            }
                        }

                    },
                    "-",
                    {
                        text: "Update", handler: function () {
                        updateKey(sDevNodeName);
                        devTreeStoreLoad()
                        treePanel.expandAll()
                    }
                    },
                    {
                        text: "Delete Key",
                        handler: function () {
                            Ext.Msg.show({
                                title: 'Delete ?',
                                message: 'Would you delete this key? This key is ' + sDevNodeName,
                                buttons: Ext.Msg.YESNOCANCEL,
                                icon: Ext.Msg.WARNING,
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        deleteKey(sDevNodeName)
                                    }
                                }
                            });
                        }
                    }
                ]
            })


            function deleteKey(key) {
                myAjax(null, function (response) {
                    try {
                        var resArr = Ext.decode(response.responseText);
                        if (resArr.success) {
                            delayToast("Massage", "Success " + resArr.info);
                            devTreeStoreLoad()
                        } else {
                            Ext.Msg.alert("Massage", resArr.info);
                        }

                    } catch (e) {
                        Ext.Msg.alert("Massage", "Error " + e);
                        throw new Error(e)
                    }
                }, {
                    par: "deleteKey",
                    key: key
                })
            }
        }
        function updateKey(key) {
            var __key = key;
            // console.log(key)
            var curTime = Ext.Date.format(new Date(), 'Y-m-d h:i:s');
            var types = {}
            types.typeKeys0 = {
                "Object_Identifier": "0",
                "Object_Type": "0",
                "Present_Value": "0",
                "Description": "ANALOG INPUT 1",
                "Device_Type": "NTC20K",
                "Status_Flags": "0000",
                "Event_State": "0",
                "Reliability": "0",
                "Out_Of_Service": "0",
                "Update_Interval": "1",
                "Units": "98",
                "Min_Pres_Value": "0",
                "Max_Pres_Value": "100",
                "Resolution": "0",
                "COV_Increment": "1.2",
                "Time_Delay": "0",
                "Notification_Class": "0",
                "High_Limit": "100",
                "Low_Limit": "0",
                "Deadband": "0.000",
                "Limit_Enable": "0",
                "Event_Enable": "0",
                "Acked_Transitions": "0",
                "Notify_Type": "0",
                "Update_Time": curTime,
                "Offset": "0",
                "Lock_Enable": "0",
                "Plant": "AHU_AI",
                "Hide": "0",
                "Object_Name": "AI1"
            }
            types.typeKeys1 = {
                "Plant": "AHU_AO",
                "Status_Flags": "0000",
                "Deadband": "0.000",
                "Object_Identifier": "0",
                "Units": "1",
                "Time_Delay": "0",
                "Hide": "0",
                "Notification_Class": "0",
                "Description": "ANALOG OUTPUT 1",
                "High_Limit": "100",
                "Low_Limit": "0",
                "Lock_Enable": "0",
                "Resolution": "100",
                "Relinquish_Default": "0",
                "Object_Name": "AO1",
                "Priority_Array": "NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL",
                "Min_Pres_Value": "95",
                "Present_Value": "0",
                "Max_Pres_Value": "0",
                "Limit_Enable": "0",
                "Event_State": "0",
                "Notify_Type": "0",
                "Acked_Transitions": "0",
                "Device_Type": "0-10=0-100",
                "Update_Time": curTime,
                "Event_Enable": "0",
                "Out_Of_Service": "0",
                "COV_Increment": "1.2",
                "Object_Type": "1",
                "Reliability": "0"
            }
            types.typeKeys2 = {
                "Status_Flags": "0000",
                "Plant": "AHU_AV",
                "Deadband": "0.000",
                "Object_Identifier": "0",
                "Units": "98",
                "Time_Delay": "0",
                "Hide": "0",
                "Notification_Class": "0",
                "Description": "ANALOG VALUE 1",
                "Low_Limit": "0",
                "High_Limit": "100",
                "Lock_Enable": "0",
                "Relinquish_Default": "0",
                "Object_Name": "AV1",
                "Priority_Array": "NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL",
                "Present_Value": "0",
                "Event_State": "0",
                "Limit_Enable": "0",
                "Notify_Type": "0",
                "Acked_Transitions": "0",
                "Update_Time": curTime,
                "Event_Enable": "0",
                "Out_Of_Service": "0",
                "COV_Increment": "1.2",
                "Reliability": "0",
                "Object_Type": "2"
            }
            types.typeKeys3 = {
                "Object_Identifier": "0",
                "Object_Type": "3",
                "Present_Value": "0",
                "Description": "BINARY INPUT 1",
                "Device_Type": "NormalOpen",
                "Status_Flags": "0000",
                "Event_State": "0",
                "Reliability": "0",
                "Out_Of_Service": "0",
                "Polarity": "0",
                "Inactive_Text": "Off",
                "Active_Text": "On",
                "Change_Of_State_Time": "0.5",
                "Change_Of_State_Count": "0",
                "Time_Of_State_Count_Reset": "0",
                "Elapsed_Active_Time": "1",
                "Time_Of_Active_Time_Reset": "0",
                "Time_Delay": "0",
                "Notification_Class": "0",
                "Alarm_Value": "0",
                "Event_Enable": "0",
                "Acked_Transitions": "0",
                "Notify_Type": "0",
                "Update_Time": curTime,
                "Lock_Enable": "0",
                "Plant": "AHU_BI",
                "Hide": "0",
                "Object_Name": "BI1"
            }
            types.typeKeys4 = {
                "Status_Flags": "0000",
                "Plant": "AHU_BO",
                "Change_Of_State_Count": "1",
                "Object_Identifier": "0",
                "Time_Delay": "1",
                "Description": "Binary Output 1",
                "Hide": "0",
                "Notification_Class": "1",
                "Lock_Enable": "1",
                "Relinquish_Default": "1",
                "Polarity": "0",
                "Object_Name": "BO1",
                "Change_Of_State_Time": "1",
                "Priority_Array": "NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL",
                "Minimum_On_Time": "1",
                "Present_Value": "0",
                "Event_State": "0",
                "Notify_Type": "1",
                "Device_Type": "NormalOpen",
                "Acked_Transitions": "1",
                "Update_Time": "2016-12-08 20:32:22",
                "Time_Of_State_Count_Reset": "1",
                "Active_Text": "On",
                "Event_Enable": "1",
                "Time_Of_Active_Time_Reset": "1",
                "Elapsed_Active_Time": "1",
                "Out_Of_Service": "0",
                "Feedback_Value": "1",
                "Inactive_Text": "Off",
                "Reliability": "0",
                "Minimum_Off_Time": "1",
                "Object_Type": "4"
            }
            types.typeKeys5 = {
                "Plant": "AHU_BV",
                "Status_Flags": "0000",
                "Object_Identifier": "0",
                "Change_Of_State_Count": "1",
                "Time_Delay": "1",
                "Hide": "0",
                "Notification_Class": "1",
                "Description": "Digital Value 1",
                "Alarm_Value": "1",
                "Lock_Enable": "1",
                "Relinquish_Default": "1",
                "Object_Name": "BV1",
                "Change_Of_State_Time": "1",
                "Priority_Array": "NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL",
                "Minimum_On_Time": "1",
                "Present_Value": "0",
                "Event_State": "0",
                "Notify_Type": "1",
                "Acked_Transitions": "1",
                "Update_Time": curTime,
                "Time_Of_State_Count_Reset": "1",
                "Event_Enable": "1",
                "Active_Text": "On",
                "Time_Of_Active_Time_Reset": "1",
                "Elapsed_Active_Time": "1",
                "Out_Of_Service": "0",
                "Inactive_Text": "Off",
                "Reliability": "0",
                "Object_Type": "5",
                "Minimum_Off_Time": "1"
            }
            types.typeKeys6 = {
                "Object_Identifier": "17,9922601",
                "Object_Type": "17",
                "Present_Value": "1",
                "Description": "Description 1",
                "Effective_Period": "{\"dateRange\":{}}",
                "Weekly_Schedule": "{\"Weekly_Schedule\":{}}",
                "Exception_Schedule": "{\"Exception_Schedule\":[]}",
                "List_Of_Object_Property_References": "{\"List_Of_Object_Property_References\":[]}",
                "Priority_For_Writing": "8",
                "Update_Time": curTime,
                "Lock_Enable": "0",
                "Schedule_Default": "Off",
                "Object_Name": "SCHE1"
            }
            myAjax(null, function (response) {
                try {
                    var resArr = Ext.decode(response.responseText);
                    // console.log(resArr);
                    var type = getKeyType(key);
                    compareKeys(key, resArr, types["typeKeys" + type]);
                } catch (e) {
                    Ext.Msg.alert("Massage", "Error " + e);
                    throw new Error(e)
                }
            }, {
                par: 'getKeyAll',
                key: key
            })
            function getKeyType(key) {
                if (isKey(key)) {
                    return key.substr(4, 1);
                } else {
                    return false;
                }
            }

            function isKey(key) {
                if (typeof key != "string" & typeof key != "number") {
                    throw new Error("Invald key!" + typeof key)
                    return false;
                }
                if (typeof key != "string") {
                    key = key + ""
                }
                if (key.length != 7 || isNaN(key)) {
                    Ext.Msg.show({
                        title: 'Exception !',
                        message: 'Found an exception key' + key + ', do you want to delete ?',
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.Msg.ERROR,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                deleteKey(key)
                            }
                        }
                    });
                    return false;
                }
                return true;
            }

            function changeKey(oldKey, newKey) {

                myAjax(null, function (response) {


                }, {
                    par: "changeKey",
                    oldKey: oldKey,
                    newKey: newKey
                })
            }

            function compareKeys(device, dbJSON, normalJSON) {
                // console.log(dbJSON, normalJSON)
                var noCount = 0
                for (var key in normalJSON) {
                    if (dbJSON[key]) {
                        // console.log("key = " + key + ", value=" + dbJSON[key] + " 有")
                    } else {
                        // console.log("key = " + key + ", value=" + normalJSON[key] + " 没有")
                        changeDevValue(device, key, normalJSON[key]);
                        noCount++
                    }
                }
                var point = noCount ? 1 : 0
                Ext.Msg.alert("Update Device", "key " + __key + " Update " + point + " point , " + noCount + " Attributes .")

            }

            //myGetValue()


        }

    }
})
;

function getNetNumberValue(filename) {
    var str = "";

    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        async: false,
        params: {
            fileName: filename || "../../../../bac_config.xml",
            rw: "r"
        },
        success: function (response) {
            // console.log(arguments)
            try {

                //var text = response.responseText
                //console.log(response)
                var xml = $($.parseXML(response.responseText));
                // console.log(xml)
                //var xml = response.responseXML;
                if (xml) {
                    str = xml.find("root net").text()
                } else {
                    Ext.Msg.alert("Exception ", "bac_config is not fount .")
                }
            } catch (e) {
                Ext.Msg.alert("Massage", "Error " + response.responseText);
                str="1000"
            }

        }
    })
    return str;
}
function getNameByType(type) {
    if (type == 0) {
        return "AI"
    }
    if (type == 1) {
        return "AO"
    }
    if (type == 2) {
        return "AV"
    }
    if (type == 3) {
        return "BI"
    }
    if (type == 4) {
        return "BO"
    }
    if (type == 5) {
        return "BV"
    }
    if (type >= 10) {
        for (var data in slotsJson) {
            if (slotsJson[data].type == type) {
                return data
            }
        }
    }
    return null;
}

function devTreeStoreLoad() {
    var store = Ext.data.StoreManager.lookup("devtreestore")
    var url = window.location.host;
    var oJson = getTreeJsonByUrl(url)
    store.setRoot(oJson);
    var devtree = Ext.getCmp("leftDevTree")
    // console.log(devtree)
    devtree.setStore(store);
}

function setPresent_Value(sDevNodeName, text1, text2) {
    var sDevName = sDevNodeName.substr(0, 4)
    var strnull = "";
    var pubstr = "";
    var url = "resources/test1.php?par=getvalue&nodename=" + sDevNodeName + "&type=Priority_Array";
    myAjax(url, function (response) {
        var aPriority = response.responseText.split(",");
        for (var i = 0; i < 16; i++) {
            if (i + 1 == parseInt(text2)) {
                strnull += text1 + ",";
                pubstr += text1 + ",";
            } else {
                strnull += aPriority[i] + ","
                pubstr += "NULL,";
            }
        }
    })

    myAjax("resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=Priority_Array&value=" + strnull.substr(0, strnull.length - 1), function () {
        delayToast('Success', sDevNodeName + ' Change value Priority_Array success new value is ' + strnull.substr(0, strnull.length - 1), 0)
    })

    if (text1 == "NULL") {
        var value = sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2;
        //alert(sDevNodeName + "\r\nCancel_Priority_Array\r\n" + text2)
        devPublish(sDevName + ".8.*",
            value,
            function () {
                delayToast('Success', 'Publish Ok.', 1000)
            })

    } else {
        var value = sDevNodeName + "\r\nPriority_Array\r\n" + pubstr.substr(0, pubstr.length - 1);
        //alert(sDevNodeName + "\r\nPriority_Array\r\n" + strnull.substr(0, strnull.length - 3))
        devPublish(sDevName + ".8.*",
            value,
            function () {
                delayToast('Success', 'Publish Ok.', 1000)
            })

    }
}

function getTreeJsonByUrl(url) {
    return {
        expanded: true,
        "children": [{
            expanded: false,
            text: url,
            checked: true,
            qtip: "On Line",
            children: getDevAll(url)
        }
        ]
    };
}


function getNullSchedule(text) {
    var devName = "";
    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "GET",
        async: false,
        params: {
            par: "getnullschedule",
            nodename: text
        },
        success: function (response) {
            var text = response.responseText;
            devName = text;
        }
    });
    return devName;
}

function myGetValue(nodename, type) {

    var value = "";
    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "GET",
        async: false,
        params: {
            par: "getvalue",
            nodename: nodename,
            type: type
        },
        success: function (response) {
            var text = response.responseText;
            value = text;
        }
    });
    return value;
}

function changeDevValue(nodename, type, value) {
    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "GET",
        params: {
            par: "changevalue",
            nodename: nodename,
            type: type,
            value: value
        }
    });
}


function getDevAllUniqueNames() {
    var aNames = getDevNamesAll();
    aNames = getArrayBeforeFour(aNames);
    aNames.sort(function (a, b) {
        return a - b//parseInt(a) - parseInt(b);
    });
    aNames = aNames.unique1();
    return aNames;
}
function getDevAll() {
    var aNames = getDevAllUniqueNames()
    var childrenArr = [];
    for (var i = 0; i < aNames.length; i++) {
        childrenArr.push({
            text: aNames[i], allowDrop: false, allowDrag: false, expanded: false, children: getTypeByDev(aNames[i])
        })
    }
    return childrenArr;
}
function getDevAllByDevice(deviceInstance) {
    var arr = getDevNamesAll();
    // console.log(arr)
    return arr.filter(function (value, insudex) {
        if ((value + "").substr(0, 4) == deviceInstance + "") {
            return true;
        } else {
            return false;
        }
    })


}

function getTypeByDev(devName) {
    var type = [0, 1, 2, 3, 4, 5];
    var nodes = getNodesAll();
    var childrenArr = [];
    for (var i = 0; i < type.length; i++) {
        var childrenArr1 = [];
        var devAndType = devName + type[i];

        for (var j = 0; j < nodes.length; j++) {
            //console.log(nodes[j]["value"])
            if (nodes[j]["value"].substr(0, 5) == devAndType) {
                nodes[j]['allowDrop'] = false;
                nodes[j]['allowDrag'] = true;
                nodes[j]['type'] = i;
                childrenArr1.push(nodes[j]);
            }
        }
        childrenArr1.sort(function (a, b) {
            return a.value - b.value;
        })

        var typeJson = {
            text: getNameByType(i),
            expanded: false,
            allowDrop: false,
            allowDrag: false,
            children: childrenArr1
        };
        if (childrenArr1.length != 0) {
            childrenArr.push(typeJson);
        }
    }

    childrenArr.push({
        text: "Schedule",
        expanded: false,
        allowDrop: false,
        allowDrag: false,
        children: getScheduleByDev(devName)
    })
    return childrenArr;
}


function getScheduleByDev(devName) {
    var devjson = null;
    Ext.Ajax.request({
        url: 'resources/test1.php',
        async: false,
        method: "GET",
        params: {
            par: "schedule",
            nodename: devName
        },
        success: function (response) {
            var text = response.responseText;
            devjson = eval(text);

//            console.log(devjson)
            // console.log(devjson)
            devjson.sort(function (a, b) {
                return a.text - b.text
            })
        }
    });
    return devjson;
}
function getDevInfoFileNames() {
    var aNames = null;
    Ext.Ajax.request({
        //url: 'resources/test3.php?par=0',
        url: 'resources/test1.php?par=getDevInfoFileNames',
        async: false,
        params: {
            // url: url,
        },
        success: function (response) {
            var text = response.responseText;
            aNames = eval(text);
        }
    });
    return aNames;
}


function getDevNamesAllDataStore(isLocal) {
    var aDevs = getDevNamesAll();
    // console.log(aDevs);
    var tempArr = [];
    for (var i = 0; i < aDevs.length; i++) {
        var devName = aDevs[i] + "";
        if (devName.length == 6) {
            devName = "0" + devName;
        }
        if (devName.length == 5) {
            devName = "00" + devName
        }
        if (devName.length == 4) {
            devName = "000" + devName
        }
        if (devName.length <= 3) {
            continue;
        }
        tempArr.push(devName.substr(0, 4))
    }
    tempArr.sort(function (a, b) {
        return a - b;
    })
    tempArr = tempArr.unique1();
    var aDevsStore = [];
    if (isLocal) {
        aDevsStore.push({"name": "local"})
    }
    for (var i = 0; i < tempArr.length; i++) {
        aDevsStore.push({"name": tempArr[i]})
    }

    var states = Ext.create('Ext.data.Store', {
        fields: ['name'],
        data: aDevsStore
    });
    return states;
}
function getDevNamesAll() {
    var aNames = null;
    Ext.Ajax.request({
        url: 'resources/test1.php?par=dev',
        async: false,
        params: {
            // url: url,
        },
        success: function (response) {
            // console.log(response)
            //var text = response.responseText;
            //aNames = eval(text);
            try {
                aNames = Ext.decode(response.responseText);
            } catch (e) {
                Ext.Msg.alert("Error", response.responseText);
                throw new Error(e);
            }

        }
    });
    return aNames;
}

function getNodesAll(url) {
    var aNames = null;
    Ext.Ajax.request({
        url: 'resources/test1.php?par=nodes',
        async: false,
        params: {
            //url: url,
        },
        success: function (response) {
            var text = response.responseText;
            var ojson = Ext.decode(text);

            /*for (var i = 0; i < ojson.length; i++) {
             var text = ojson[i].text;
             ojson[i].text = Ext.util.Base64.decode(text);
             }*/
            aNames = ojson

            // console.log(ojson);
        }
    });
    return aNames;
}


function getTypeAllByDev() {
    var nodes = getNodesAll();
    var aText = text.split(" ");
    aText = getArrayBeforeFour(aText);
    aText.sort(function (a, b) {
        return parseInt(a) - parseInt(b);
    });
    aText = aText.unique1();
    aNames = aText;

}


function getArrayBeforeFour(aArr) {
    var aArray = [];
    for (var i = 0; i < aArr.length; i++) {
        var devName = aArr[i] + "";
        if (devName.length == 6) {
            devName = "0" + devName;
        }
        if (devName.length == 5) {
            devName = "00" + devName
        }
        if (devName.length == 4) {
            devName = "000" + devName
        }
        if (devName.length <= 3) {
            continue;
        }
        var str = devName.trim().substr(0, 4);
        aArray.push(str);
    }
    return aArray;
}
Array.prototype.unique1 = function () {
    var n = []; //一个新的临时数组
    for (var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}


