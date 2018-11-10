Ext.define("program.view.window.RenameWindow", {
    extend: "Ext.window.Window",

    xtype: "renamewindow",
    requires: [
        "program.view.window.RenameWindowController",
        "program.view.window.RenameWindowModel",
        "program.store.RenameStore"
    ],
    id:"loadRenameWin",
    width: 900,
    height: 1024,
    controller: "window-renamewindow",
    viewModel: {
        type: "window-renamewindow"
    },
    constrainHeader: true,
    autoShow: true,
    //maxHeight:Ext.getBody().getHeight(),
    layout: 'accordion',
    scrollable: true,
    listeners: {
        boxready: "boxready"
    },

    xmlSources: function () {   //xml资源

        var me = this;
        var __me = this;

        var sDevName = me.text.substring(0, me.text.indexOf('.'));//文件名称
        me.title = sDevName;     
        // console.log(me.title);
        me.sDevName = sDevName;
        // console.log(me.sDevName);
        //       var items = []
        me.items = []

        Ext.Ajax.request({

            async: false,    
            url: "resources/"+me.xmlFile+"/" + me.text,    //发请求获取xml文件

            success: function (response, opts) {
                var xml = response.responseXML;
                if (!xml) {          //如果非xml就抛出错误
                    Ext.Msg.alert("Error", "invalid data !");
                }


                var domKeys = xml.querySelectorAll("key");
            
                var keys = [];
                // Window.ModelKeys.insKey = Window.ModelKeys.insKey || [];
                window.xml_insKey = [];
                for(var i = 0;i<6;i++){
                    window.xml_insKey[i] = '';
                }
                window.Eugene = 'this is my win';
                
                for (var i = 0; i < domKeys.length; i++) {   //遍历所有key
                    // console.log(domKeys[i].getAttribute('number'));
                    var domKeys_attr = domKeys[i].getAttribute('number')
                    var domKeys_attr_type = domKeys_attr.substr(5,1);
                    // console.log(domKeys_attr_type);
                    
                    switch(parseInt(domKeys_attr_type)){
                        case 2:window.xml_insKey[0] += (domKeys[i].outerHTML+'\n');break;
                        case 3:window.xml_insKey[1] += (domKeys[i].outerHTML+'\n');break;
                        case 4:window.xml_insKey[2] += (domKeys[i].outerHTML+'\n');break;
                        case 5:window.xml_insKey[3] += (domKeys[i].outerHTML+'\n');break;
                        case 6:window.xml_insKey[4] += (domKeys[i].outerHTML+'\n');break;
                        case 7:window.xml_insKey[5] += (domKeys[i].outerHTML+'\n');break;
                    }
                    // if(domKeys_attr_type>=2){      //如果包含模块，那么跳出循环
                    //     continue;
                    // }
                        keys.push(domKeys[i]);
                        // console.log(keys.length)
                        // console.log(domKeys[i].getAttribute('number'));
                    
                }
                keys.sort(function (a, b) {     //给所有key排序
                    var akey = a.getAttribute("number")
                    var bkey = b.getAttribute("number")
                    return akey - bkey;
                })
                // console.log(keys);
                for (var i = 0; i < keys.length; i++) {
                    var Object_Name = keys[i].querySelector("Object_Name").innerHTML; //获取所有key的Object_name的值
                    var keyType;
                    (keys[i].getAttribute('number').substr(5,1) > 1) && (keys[i].getAttribute('number').substr(4,1) == 3) ? keyType = '4' : keyType = keys[i].getAttribute("number").substr(4, 1); 
                    
                    
                    if (keyType == '3' || keyType == '4') {   //如果keyType是3 或 4 截取前四位
                        var devName = keys[i].getAttribute('number').substr(0, 4)
                        me.devName = devName;
                        // console.log(devName);
                    }
                    //var fieldsItems = [];
                    var types = me["type" + keyType];  //获取keyType对应类型key下的值
                    // console.log(me);
                    //console.log(types)
                    if (!types) {     
                        continue;
                    }

                    var formData = {};
                    for (var j = 0; j < types.length; j++) {  //遍历types数组下的所有值
                        var typeTag = keys[i].getElementsByTagName(types[j])[0];
                        // console.log(typeTag);
                        var fieldName = types[j];
                        // console.log(fieldName)
                        var value;
                        if (typeTag) {
                            value = typeTag.innerHTML;
                        } else {
                            value = ""
                        }
                        /*var textfield = {
                         fieldLabel: fieldName,
                         name: fieldName,
                         value: value
                         };*/

                        formData[fieldName] = value;
                        // console.log(formData);
                        //fieldsItems.push(textfield);
                    }
                    // console.log(formData)
                    /*
                     var formPanel = Ext.create("Ext.form.Panel", {
                     title: Object_Name,
                     key: keys[i].getAttribute("number"),
                     defaultType: 'textfield',
                     defaults: {
                     anchor: '100%'
                     },
                     minHeight: 300,
                     scrollable: true,
                     url: "resources/test1.php?par=setRenameValue&devname=" + sDevName,
                     bodyPadding: 10,
                     items: fieldsItems
                     })*/
                    var formPanel = me.createDevForm({Object_Name: Object_Name, key: keys[i].getAttribute('number')});//创建formPanel
                    me.id = 'myXmlDevForm';
                    me.items.push(formPanel);
                    formPanel.getForm().setValues(formData)
                }
                // var modelPanel = me.createModelForm();  //在window插入model panel
                // me.items.push(modelPanel);

            },
            failure: function (response, opts) {
                Ext.Msg.alert("Error", 'server-side failure with status code ' + response.status);
            }
        });


//        me.items = items;

    },
    createModelForm:function(data){
        var typeArr = ['AI', 'AO', 'AV', 'BI', 'BO', 'BV', 'SCHEDULE','null','DevName'];
        var me = this;
        var keyType;
        var titleValue = 'Dev.'+data.key.substr(0,4)+' '+'Model.'+data.key.substr(5,1)+' '+typeArr[data.key.substr(4,1)]+data.key.substr(5,)+'('+data["Object_Name"]+')';
        // console.log(data);
        parseInt(data.key.substr(4,1)) == 3 ? keyType = 4 : keyType = data.key.substr(4,1);
        // console.log(keyType);
        var fields = me["type" + keyType];  //在当前对象找到相对应类型
        var fieldsItems = [];
        if (!fields) {     
            return;
        }

        for (var i = 0; i < fields.length; i++) {   //遍历types数组
            var fieldName = fields[i];  //获取下标相对应内容
            var textfield = null;


            if (fieldName == "Inactive_Text") { //逐个判断
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    xtype: "combobox",
                    editable: false,
                    store: me.I_T_D
                }
            } else if (fieldName == "Active_Text") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    xtype: "combobox",
                    editable: false,
                    store: me.A_T_D
                }
            } else if (fieldName == "Device_Type") {
                var combostore = Ext.create('Ext.data.Store', {
                    autoLoad: false,
                    fields: ['name'],
                    data: [
                        {"name": "0-10=0-100"},
                        {"name": "NTC10K"},
                        {"name": "NTC20K"},
                        {"name": "BI"},
                        {"name": "hide"}
                    ]
                })

                textfield = {
                    fieldLabel: fieldName,
                    xtype: "combobox",
                    name: fieldName,

                    store: combostore,
                    validator: function (val) {
                        if (val == "NTC10K" || val == "NTC20K" || val == "BI" || val == "hide") {
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
                }

            }
            else if (fieldName == 'Alarm_Value') {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    listeners: {
                        focus: function (field, newValue) {

                            Ext.create('program.view.window.AlarmWindow', {
                                id: "alermwindow",
                                sDevNodeName: panel.key,
                                sDevName: panel.key.substr(0, 4),
                                sDevNodeType: panel.key.substr(4, 1),
                                alarmData: field.getValue(),
                                localData: true,
                                submitAlarm: function (value) {
                                    field.setValue(value)
                                }
                            })
                        }
                    }
                };
            } else if (fieldName == "Object_Name") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    value: data["Object_Name"],
                    listeners: {
                        change: function (field, newValue) {
                            if (field.name == "Object_Name") {
                                var form = field.up("form")
                                // if (form) {
                                    form.setTitle(titleValue);
                                // }
                            }
                            if (!form) {
                                return;
                            }
                        }
                    }
                };
            } else if (fieldName == "Units") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    value: data["Units"],
                    listeners: {
                        focus: function (field) {
                            Ext.create("program.view.window.AttributeTableWin", {
                                callback: function (value) {
                                    field.setValue(value)
                                }
                            })
                        }
                    }
                }

            } else {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,

                };
            }
            fieldsItems.push(textfield);   //判断处理后追加到新数组
        }

        var panel = Ext.create("Ext.form.Panel", {
            //title: data.Object_name,
            // title: data['Object_Name'],
            title:titleValue,
            key: data.key,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            minHeight: 300,
            url: "resources/test1.php?par=setRenameValue&devname=" + me.sDevName,
            scrollable: true,
            bodyPadding: 10,
            items: fieldsItems,
            tbar: [{            //隐藏的添加到数据库的按钮
                text: "commit",   
                hidden: true,
                handler: function () {
                    panel.saveToDataBase()
                }
            }],
            saveToDataBase: function () {      //封装保存到数据的函数
                var me = this;

                me.header.remove(me.p)

                var type = me.key.substr(4, 1);

                var deviceType = me.query("[name=Device_Type]")[0];
                if (!!deviceType) {
                    if (deviceType.value == "BI" & type == "0") {
                        return;
                    }
                    if (deviceType.value == "hide") {
                        return;
                    }
                }
                var p = Ext.create('Ext.ProgressBar', {
                    width: 200,
                    buttonAlign: "left",
                    value: 0
                });
                me.p = p;
                me.header.insert(1, p)
                var items = me.items.items;
                var formSize = items.length;

                for (var i = 0; i < items.length; i++) {

                    (function (me, field, delay) {
                        setTimeout(function () {
                            //console.log((delay + 1) / formSize)
                            p.setValue((delay + 1) / formSize)
                            changeDevValue(me.key, field.name, field.value)
                        }, delay * 10)
                    })(me, items[i], i)
                }

            }
        })
        return panel;
    },
    createDevForm: function (data) {
        // console.log(this);
        var typeArr = ['AI', 'AO', 'AV', 'BI', 'BO', 'BV', 'SCHEDULE',null,'DevName'];
        var me = this;

        // var keyType = data.key.substr(4, 1);
        var keyType;
        (data.key.substr(5,1) > 1) && (data.key.substr(4,1) == 3) ? keyType = '4' : keyType = data.key.substr(4, 1);
                    
        // console.log(keyType);
        var fields = me["type" + keyType];
        var titleValue = '<b style = "font-size:10px;color:#888;">Dev.'+data.key.substr(0,4)+'</b> '+'Model.'+data.key.substr(5,1)+' '+typeArr[data.key.substr(4,1)]+' '+data.key.substr(5,)+'('+data["Object_Name"]+')';
        // console.log(fields);
        var fieldsItems = [];
        if (!fields) {
            return;
        }

        for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i];
            var textfield = null;


            if (fieldName == "Inactive_Text") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    xtype: "combobox",
                    editable: false,
                    store: me.I_T_D
                }
            } else if (fieldName == "Active_Text") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    xtype: "combobox",
                    editable: false,
                    store: me.A_T_D
                }
            } else if (fieldName == "Device_Type") {
                var combostore = Ext.create('Ext.data.Store', {
                    autoLoad: false,
                    fields: ['name'],
                    data: [
                        {"name": "0-10=0-100"},
                        {"name": "NTC10K"},
                        {"name": "NTC20K"},
                        {"name": "BI"},
                        {"name": "hide"}
                    ]
                })

                textfield = {
                    fieldLabel: fieldName,
                    xtype: "combobox",
                    name: fieldName,

                    store: combostore,
                    validator: function (val) {
                        if (val == "NTC10K" || val == "NTC20K" || val == "BI" || val == "hide") {
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
                }

            }
            else if (fieldName == 'Alarm_Value') {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    listeners: {
                        focus: function (field, newValue) {

                            Ext.create('program.view.window.AlarmWindow', {
                                id: "alermwindow",
                                sDevNodeName: panel.key,
                                sDevName: panel.key.substr(0, 4),
                                sDevNodeType: panel.key.substr(4, 1),
                                alarmData: field.getValue(),
                                localData: true,
                                submitAlarm: function (value) {
                                    field.setValue(value)
                                }
                            })
                        }
                    }
                };
            } else if (fieldName == "Object_Name") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    value: data["Object_Name"],
                    listeners: {
                        change: function (field, newValue) {
                            if (field.name == "Object_Name") {
                                var form = field.up("form")
                                if (form) {
                                    form.setTitle(titleValue+'('+newValue+')');
                                }
                            }
                            if (!form) {
                                return;
                            }
                        }
                    }
                };
            } else if (fieldName == "Units") {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,
                    value: data["Units"],
                    listeners: {
                        focus: function (field) {
                            Ext.create("program.view.window.AttributeTableWin", {
                                callback: function (value) {
                                    field.setValue(value)
                                }
                            })
                        }
                    }
                }

            } else {
                textfield = {
                    fieldLabel: fieldName,
                    name: fieldName,

                };
            }
            fieldsItems.push(textfield);
        }

        var panel = Ext.create("Ext.form.Panel", {
            //title: data.Object_name,
            title:titleValue,

            key: data.key,
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            minHeight: 300,
            url: "resources/test1.php?par=setRenameValue&devname=" + me.sDevName,
            scrollable: true,
            bodyPadding: 10,
            items: fieldsItems,
            tbar: [{
                text: "commit",
                hidden: true,
                handler: function () {
                    panel.saveToDataBase()
                }
            }],
            saveToDataBase: function () {
                var me = this;

                me.header.remove(me.p)

                var type = me.key.substr(4, 1);

                var deviceType = me.query("[name=Device_Type]")[0];
                if (!!deviceType) {
                    if (deviceType.value == "BI" & type == "0") {
                        return;
                    }
                    if (deviceType.value == "hide") {
                        return;
                    }
                }
                var p = Ext.create('Ext.ProgressBar', {
                    width: 200,
                    buttonAlign: "left",
                    value: 0
                });
                me.p = p;
                me.header.insert(1, p)
                var items = me.items.items;
                var formSize = items.length;

                for (var i = 0; i < items.length; i++) {

                    (function (me, field, delay) {
                        setTimeout(function () {
                            //console.log((delay + 1) / formSize)
                            p.setValue((delay + 1) / formSize)
                            changeDevValue(me.key, field.name, field.value)
                        }, delay * 10)
                    })(me, items[i], i)
                }

            }
        });
        return panel;
    },

    databaseSources: function () {
        var me = this;
        me.title = me.sDevName + " rename";
        var sDevName = me.sDevName;
        me.items = []

        myAjax("resources/test1.php?par=getKeys&devname=" + sDevName, function (response) {
            var datas = Ext.decode(response.responseText)
            //var fields = me.fields;
            datas.sort(function (a, b) {
                var akey = a['key']
                var bkey = b['key']
                return akey - bkey;
            })

            var store = Ext.create("Ext.data.JsonStore", {
                fields: me.fields,
                storeId: "testStore",
                data: datas
            })
            store.setData(datas)
            for (var i = 0; i < datas.length; i++) {
                
                var gridpanel = me.createDevForm(datas[i]);
                if (gridpanel != undefined) {
                    me.items.push(gridpanel);
                    gridpanel.getForm().loadRecord(store.getAt(i));

                }

            }

        })
    },


    getChartStoreData: function () {
        var me = this;
        var items = me.items.items;
        return devsSplitType(items);
    },
    getFormValues: function () {
        var me = this;
        var items = me.items.items;
        var data = {
            AI: 0,
            AO: 0,
            AV: 0,
            BI: 0,
            BO: 0,
            BV: 0,
            SCHEDULE: 0,
            type0: [],
            type1: [],
            type2: [],
            type3: [],
            type4: [],
            type5: [],
            type6: [],
        }
        for (var i = 0; i < items.length; i++) {
            if (items[i].key) {
                var type = items[i].key.substr(4, 1);
                if (type == 0) {
                    data.AI++
                    data.type0.push(items[i])
                }
                if (type == 1) {
                    data.AO++
                    data.type1.push(items[i])
                }
                if (type == 2) {
                    data.AV++
                    data.type2.push(items[i])
                }
                if (type == 3) {
                    data.BI++
                    data.type3.push(items[i])
                }
                if (type == 4) {
                    data.BO++
                    data.type4.push(items[i])
                }
                if (type == 5) {
                    data.BV++
                    data.type5.push(items[i])
                }
                if (type == 6) {
                    data.SCHEDULE++
                    data.type6.push(items[i])
                }

            }

        }
        return data;
    },

    insrtDevForm: function (key, Object_Name) {
        var me = this;
        var types = {
            "type0": {
                "Offset": "0.100",
                "Description": "ANALOG INPUT 1",
                "Device_Type": "BI",
                "Units": "98",
                "Min_Pres_Value": "0.00",
                "Max_Pres_Value": "100.000",
                "COV_Increment": "1.000",
                "High_Limit": "100.000",
                "Low_Limit": "0.000",
                "Deadband": "0.000",
                "Limit_Enable": "0",
                "Event_Enable": "0",
                "Notify_Type": "0",
                "Time_Delay": "0",
                "Notification_Class": "1"
            },
            "type1": {
                "Offset": "1.000",
                "Description": "ANALOG OUTPUT1",
                "Device_Type": "0-10=0-100",
                "COV_Increment": "0.500",
                "High_Limit": "100",
                "Low_Limit": "0.000",
                "Deadband": "0.000",
                "Limit_Enable": "0",
                "Event_Enable": "0",
                "Notify_Type": "0",
                "Time_Delay": "0",
                "Notification_Class": "1"
            },
            "type2": {
                "Description": "ANALOG VALUE 1",
                "COV_Increment": "0.500",
                "High_Limit": "100",
                "Low_Limit": "0.000",
                "Deadband": "0.000",
                "Limit_Enable": "0",
                "Event_Enable": "0",
                "Notify_Type": "0",
                "Time_Delay": "0",
                "Notification_Class": "1"
            },
            "type3": {
                "Description": "BINARY_INPUT 1",
                "Device_Type": "normal open",
                "Inactive_Text": "Off",
                "Active_Text": "On",
                "Event_Enable": "0",
                "Notify_Type": "0",
                "Time_Delay": "0",
                "Alarm_Value": "0",
                "Notification_Class": "1"
            },
            "type4": {
                "Description": "BINARY_OUTPUT 1",
                "Device_Type": "normal",
                "Inactive_Text": "Off",
                "Active_Text": "On",
                "Event_Enable": "0",
                "Notify_Type": "0",
                "Time_Delay": "0",
                "Alarm_Value": "0",
                "Notification_Class": "1"
            },
            "type5": {
                "Description": "BINARY_VALUE1",
                "Device_Type": "normal",
                "Inactive_Text": "Off",
                "Active_Text": "On",
                "Event_Enable": "0",
                "Notify_Type": "0",
                "Time_Delay": "0",
                "Alarm_Value": "0",
                "Notification_Class": "1"
            },
            "type6": {
                "Description": "SCHEDULE1",
                "Priority_For_Writing": "10"
            }
        }

        var items = me.items.items;

        var inertIndex = 0;

        for (var i = 0; i < items.length; i++) {

            if (key < items[i].key) {
                inertIndex = i;


                break;
            }
        }

        var form = me.createDevForm({key: key, Object_Name: Object_Name});
        var type = key.substr(4, 1);
        var values = types["type" + type];

        form.getForm().setValues(values)

        if (inertIndex) {
            me.insert(inertIndex, form);
        } else {
            me.add(form);
        }


    },
    deleteDevForm: function (key) {

        var me = this;
        var form = me.query('[key=' + key + ']')[0];
        me.remove(form);


    },

    initComponent: function () {
        var me = this;
        me.setHeight(680);
        me.setWidth(512);
        me.setMaxHeight(Ext.getBody().getHeight())

        var fields = ["Object_Name", "Offset", "Description", "Device_Type",
            "Inactive_Text", "Active_Text",
            "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit",
            "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Present_Value",
            "Offset", "Set_Alarm", "AV_count", "BV_count", "SCHEDULE_count",
        ];

        me.type0 = ["Object_Name", "Offset", "Description", "Device_Type", "Units", "Min_Pres_Value", "Max_Pres_Value", "COV_Increment", "High_Limit", "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Notify_Type", "Time_Delay", "Notification_Class"];
        me.type1 = ["Object_Name", "Offset", "Description", "Device_Type", "COV_Increment", "High_Limit", "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Notify_Type", "Time_Delay", "Notification_Class"];
        me.type2 = ["Object_Name", "Description", "COV_Increment", "High_Limit", "Low_Limit", "Deadband", "Limit_Enable", "Event_Enable", "Notify_Type", "Time_Delay", "Notification_Class"];
        me.type3 = ["Object_Name", "Description", "Device" +
        "", "Inactive_Text", "Active_Text", "Event_Enable", "Notify_Type", "Time_Delay", "Alarm_Value", "Notification_Class"];
        me.type4 = ["Object_Name", "Description", "Device_Type", "Inactive_Text", "Active_Text", "Event_Enable", "Notify_Type", "Time_Delay", "Alarm_Value", "Notification_Class"];
        me.type5 = ["Object_Name", "Description", "Device_Type", "Inactive_Text", "Active_Text", "Event_Enable", "Notify_Type", "Time_Delay", "Alarm_Value", "Notification_Class"];
        me.type6 = ["Object_Name", "Description", "Priority_For_Writing", "Alarm"];
        me.type8 = ['Object_Name'];

        me.I_T_D = ActiveJson.get("Inactive_Text_Defaults")
        me.A_T_D = ActiveJson.get("Active_Text_Defaults")
        var fields = ["AI_count", "AO_count", "AV_count", "BI_count", "BO_count", "BV_count", "SCHEDULE_count"].concat(me.type0).concat(me.type1).concat(me.type2).concat(me.type3).concat(me.type4).concat(me.type5).concat(me.type6);
        me.fields = fields;
        if (me.text) {
            me.xmlSources()
            me.xmlsources = true
        } else if (me.sDevName) {
            me.databaseSources();
        }
        me.callParent()
    },
    iterationItems: function (callback) {
        var me = this;
        var items = me.items.items;
        for (var i = 1; i < items.length; i++) {
            callback(items[i], i)
        }
        return me;
    },
    getXmlStr: function () {
        var me = this;
        var items = me.items.items;       //获取所有的key对应的panel对象
       
        var root = document.createElement("root");
        var ai = document.createElement("AI_count");
        var ao = document.createElement("AO_count");
        var av = document.createElement("AV_count");
        var bi = document.createElement("BI_count");
        var bo = document.createElement("BO_count");
        var bv = document.createElement("BV_count");
        var schedule = document.createElement("SCHEDULE_count");
        var aicount = 0;
        var aocount = 0;
        var avcount = 0;
        var bicount = 0;
        var bocount = 0;
        var bvcount = 0;
        var schedulecount = 0;

        root.appendChild(ai);
        root.appendChild(ao);
        root.appendChild(av);
        root.appendChild(bi);
        root.appendChild(bo);
        root.appendChild(bv);
        root.appendChild(schedule);

        for (var i = 1; i < items.length; i++) {   //遍历items
            //console.log(items[i]);
            var form = items[i].getForm();    //获取panel对象   
            var res = form.getFieldValues();  //获取panel对象所有的值
            var key = document.createElement("key");  //创建key
            var keytype = items[i].key.substr(4, 1);  //获取所有panel的key属性第五位
            if (keytype == "0") {  
                aicount++
            }
            if (keytype == "1") {
                aocount++
            }
            if (keytype == "2") {
                avcount++
            }
            if (keytype == "3") {
                bicount++
            }
            if (keytype == "4") {
                bocount++
            }
            if (keytype == "5") {
                bvcount++
            }
            if (keytype == "6") {
                schedulecount++
            }
            if(me.deviceName && items[i].key.substr(-2,1)<=1){   //如果前四位有值和panel的key属性倒数第二位小于等于1条件成立则往下执行
                var newKey = me.deviceName + (items[i].key.substr(4, 7))  //获取修改好的keynumber前四位+原本的后三位
               
                key.setAttribute("number", newKey);
            } else {      //key倒数第二位大于1的情况
              
                var modelKeys = '1001';
                key.setAttribute("number", items[i].key);
            }
            for (var type in res) {
                var tag = document.createElement(type)
                tag.innerHTML = res[type];
                key.appendChild(tag);
            }
            root.appendChild(key);
            myAjax("resources/test1.php?par=getAlarm&nodename=" + items[i].key, function (response) {
                try {
                    // console.log(response.responseText);
                    var alermJson = Ext.decode(response.responseText);
                    if (alermJson['Set_Alarm']) {
                        //var setAlarm = document.createElement("Set_Alarm");
                        var aPars = alermJson['Set_Alarm'][0]
                        for (var type in aPars) {
                            var tag = document.createElement(type);
                            tag.innerHTML = aPars[type];
                            //setAlarm.appendChild(tag);
                            key.appendChild(tag);
                        }
                    }

                } catch (e) {
                    // console.log(e)
                }
            })
        }

        ai.innerHTML = aicount;
        ao.innerHTML = aocount;
        av.innerHTML = avcount;
        bi.innerHTML = bicount;
        bo.innerHTML = bocount;
        bv.innerHTML = bvcount;
        schedule.innerHTML = schedulecount;
        //var root = me.saveXml();
        var div = document.createElement("div");
        div.appendChild(root)
        var xmlstr = div.innerHTML;
        // var norootxml = root.innerHTML;
        // console.log(norootxml);
        for (var i = 0; i < me.fields.length; i++) {
            var field = me.fields[i]
            // console.log(me.fields[i])
            xmlstr = xmlstr.replaceAll(field.toLocaleLowerCase(), me.fields[i]);
        }
        // console.log(me);
        return xmlstr;
        // return norootxml;
    },
    getModelKey:function(){
        var me = this;
        var keyArr = me.ModelKeys.insertKey;
        // console.log(keyArr);
        return keyArr;
    },
    saveXml: function (filename) {    //保存xml文件，直接用处理好的字符串替换当前的xml文件
        var me = this;
        // var win = Ext.getCmp('loadRenameWin');
        // console.log(window);
        // var keyArr = window.xml_insKey;
        // var keyStr = '';
        // for(var i = 0;i<keyArr.length;i++){
        //     if(keyArr[i]){
        //         keyStr += keyArr[i];
        //     }
        // }
        var xmlstr = me.getXmlStr();
        var pattern = /<\/?root>/g;
        xmlstr = formatXml(xmlstr);
        

        // var filename = me.xmlFile+"/" + filename + ".xml"
        var filename = "devxml/" + filename + ".xml"
        var datas = {
            rw: "w",
            isDel:'',
            fileName: filename,
            content: '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + '\n<root>' + xmlstr.replace(pattern,'') + '</root>'
        }
        // win.ModelKeys.data = datas;
        // var newstr2 = datas.content;
        // console.log(newstr2);
        $.ajax({
            type: "POST",
            url: "resources/xmlRW.php",
            data: datas,
            success: function () {
                delayToast("Status", "Saved file " + datas.fileName + " successfully.", 0);
                moveXml(filename);
            }
        });
        function moveXml(filename) {
            myAjax(null, function (response) {
                try {
                    var resJson = Ext.decode(response.responseText);
                    if (resJson.success) {
                        delayToast("Massage", resJson.info)
                    } else {
                        Ext.Msg.alert("Massage", resJson.info)
                    }
                } catch (e) {
                    Ext.Msg.alert("error", e)
                    throw new Error(e);
                }
            }, {
                par: "moveXml",
                filename: filename
            })
        }

        // setTimeout(function () {
        //     me.close()
        // }, 1000)
    },
    insertKey:function(){
        var fileName = button.up('form').down('#select').getValue(); //获取select的value
        var xmlType =  button.up('form').down('#selectNum').getValue(); //获取selectNum 的vlaue
        Ext.Ajax.request({
            url:"resources/xmlInsert.php",
            method:"GET",
            params: { file_name: fileName+'.xml', select_num: xmlType ,parent_file:filePath},
            success:function(response,opts){
                var xml = response.responseText;
                console.log(xml);
                console.log("成功，异步请求加载完成")
                console.log(filePath);
                Ext.MessageBox.alert('成功','已经从服务器端获取结果');
            },
            failure:function(response,opts){
                Ext.MessageBox.alert("失败",'请求超时或网络故障，错误编号: ' + response.status);
            }
        });
    },
    build: function () {
        var me = this;
        var items = me.items.items;
        for (var i = 1; i < items.length; i++) {
            (function (me, form, delay) {
                setTimeout(function () {
                    form.expand();
                    form.saveToDataBase()
                }, delay * 1000)
            })(me, items[i], i)
        }
    },
    relaodRenameWindow: function () {

        console.log(this)
        setTimeout(function () {
            if (me.sources == "db") {
                Ext.create('program.view.window.RenameWindow', {
                    sources: "db",
                    sDevName: me.sDevName,
                })
                return;
            }
            if (me.sources == "xml") {
                Ext.create('program.view.window.RenameWindow', {
                    sources: "xml",
                    text: me.text,
                })
                return;
            }

        }, 3000)

    },
    buttons: [
        {
            text: "Save ...",
            handler: function () {
                var me = this.up("window");
                Ext.MessageBox.prompt("Save ...", "please input device number", function (ms, v) {
                    if (ms == 'ok') {
                        if (isNaN(v) || v.length != 4) {
                            Ext.Msg.alert("Key Exception", "The key ,Does not meet the requirements")
                            return
                        }
                        if (v) {
                            me.deviceName = v;
                            me.saveXml(v)
                        } else {
                            Ext.Msg.alert("Exception", "filename exception .")
                        }
                    }
                })

            }
        },
        {
            text: "replace ...",
            handler: function () {
                var me = this.up("window");
                var arr = me.type0.concat(me.type1).concat(me.type2).concat(me.type3).concat(me.type4).concat(me.type5).concat(me.type6).unique1()


                var win = Ext.create('Ext.window.Window', {
                    title: 'Replace •••',
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
                            itemId: "field",
                            margin: 10,
                            xtype: "combobox",
                            allowBlank: false,
                            fieldLabel: 'Fields',
                            store: arr,
                            editable: false,
                            queryMode: 'local',
                            autoSelect: false
                        },
                        {
                            itemId: "oldvalue",
                            margin: 10,
                            xtype: "textfield",
                            allowBlank: false,
                            fieldLabel: 'old value',
                        },
                        {
                            itemId: "newvalue",
                            margin: 10,
                            xtype: "textfield",
                            allowBlank: false,
                            fieldLabel: 'new value',
                        }
                    ],
                    buttons: [
                        {
                            text: 'Ok',
                            handler: function () {
                                var text = win.down("combobox").getValue();
                                if (text == null) {
                                    Ext.Msg.alert('Info', 'Plase select file name.');
                                    return;
                                }
                                var field = win.getComponent("field").getValue();
                                var oldValue = win.getComponent("oldvalue").getValue();
                                var newValue = win.getComponent("newvalue").getValue();
                                me.replaceFieldValue(field, oldValue, newValue);
                                win.close();
                            }
                        },
                        {
                            text: 'Close', handler: function () {
                            win.close();
                        }
                        }
                    ]
                })

            }
        },
        {
            text: "build", handler: function () {
            {
                var me = this.up("window");
                Ext.MessageBox.show({
                    title: 'Build Database?',
                    msg: 'Do you want to build the data into the database?',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: me,
                    fn: function (ms) {
                        if (ms == 'ok') {
                            me.build()
                        }
                    },
                    animateTarget: this,
                    icon: Ext.MessageBox.QUESTION
                });

            }
        }
        },
        "->",
        {
            text: "Ok", 
            id: "renameButtonOk",
            handler: function () {
            var me = this.up("window");
            // console.log(me.sDevName)
            // console.log(me.deviceName)
            Ext.MessageBox.prompt("Save", "please input device name", function (ms, v) {
                if (ms == 'ok') {
                    if (isNaN(v) || v.length != 4) {
                        Ext.Msg.alert("Key Exception", "The key ,Does not meet the requirements")
                        return;
                    }
                    if (v) {

                        me.deviceName = v;
                        me.saveXml(me.sDevName)
                        //me.relaodRenameWindow()
                    } else {
                        Ext.Msg.alert("Exception", "filename exception .")
                    }
                }
            }, this, "", me.deviceName || me.sDevName)

            return;
        }
        },
        {

            text: "Close", handler: function (button) {
            var me = button.up('window');
            me.close();
        }
        }
    ],
    replaceFieldValue: function (fieldName, oldValue, newValue) {
        var me = this;
        var items = me.query('[name=' + fieldName + ']');
        for (var i = 0; i < items.length; i++) {
            items[i].setValue(items[i].getValue().replace(oldValue, newValue));
        }

        Ext.Msg.alert("Massage", items.length + " project have been changed");
    }
});

function devsSplitType(datas) {

    var AI = {
        name: 'AI',
        value: 0,
        devs: "",
        keys: []
    }
    var AO = {
        name: 'AO',
        value: 0,
        devs: "",
        keys: []
    }
    var AV = {
        name: 'AV',
        value: 0,
        devs: "",
        keys: []
    }
    var BI = {
        name: 'BI',
        value: 0,
        devs: "",
        keys: []
    }
    var BO = {
        name: 'BO',
        value: 0,
        devs: "",
        keys: []
    }
    var BV = {
        name: 'BV',
        value: 0,
        devs: "",
        keys: []
    }
    var SCHEDULE = {
        name: "SCHEDULE",
        value: 0,
        devs: "",
        keys: []
    }


    datas.find(function (data, index, all) {
        // console.log(data)
        if (data.key) {
            if (data.key.substr(4, 1) == 0) {
                AI.value++;
                AI.devs += data.title + ""
                AI.keys.push(data)
            }
        }
    })

    datas.find(function (data, index, all) {
        if (data.key) {
            if (data.key.substr(4, 1) == 1) {
                AO.value++;
                AO.devs += data.title + ""
                AO.keys.push(data)
            }
        }
    })
    datas.find(function (data, index, all) {
        if (data.key) {
            if (data.key.substr(4, 1) == 2) {
                AV.value++;
                AV.devs += data.title + ""
                AV.keys.push(data)
            }
        }

    })
    datas.find(function (data, index, all) {
        if (data.key) {
            if (data.key.substr(4, 1) == 3) {
                BI.value++;
                BI.devs += data.title + ""
                BI.keys.push(data)
            }
        }
    })
    datas.find(function (data, index, all) {
        if (data.key) {
            if (data.key.substr(4, 1) == 4) {
                BO.value++;
                BO.devs += data.title + ""
                BO.keys.push(data)
            }
        }

    })
    datas.find(function (data, index, all) {
        if (data.key) {
            if (data.key.substr(4, 1) == 5) {
                BV.value++;
                BV.devs += data.title + ""
                BV.keys.push(data)
            }
        }
    })

    datas.find(function (data, index, all) {
        if (data.key) {
            if (data.key.substr(4, 1) == 6) {
                SCHEDULE.value++;
                SCHEDULE.devs += data.title + "";
                SCHEDULE.keys.push(data)
            }
        }
    })

    var arr = []
    arr.push(AI)
    arr.push(AO)
    arr.push(AV)
    arr.push(BI)
    arr.push(BO)
    arr.push(BV)
    arr.push(SCHEDULE)
    return arr;

}

/*var items = me.items.items;
 var root = document.createElement("root");
 for (var i = 0; i < items.length; i++) {
 console.log(items[i]);
 /!*items[i].submit({
 method: "POST"
 })*!/
 var form = items[i].getForm();
 var res = form.getFieldValues();
 var key = document.createElement("key");
 key.setAttribute("number", items[i].key);
 for (var type in res) {
 var tag = document.createElement(type)
 tag.innerHTML = res[type];
 key.appendChild(tag);
 }
 root.appendChild(key);
 myAjax("resources/test1.php?par=getAlarm&nodename=" + items[i].key, function (response) {
 try {
 var alermJson = Ext.decode(response.responseText);
 if (alermJson['Set_Alarm']) {
 var setAlarm = document.createElement("Set_Alarm");
 var aPars = alermJson['Set_Alarm'][0]
 for (var type in aPars) {
 var tag = document.createElement(type)
 tag.innerHTML = aPars[type];
 setAlarm.appendChild(tag);
 }
 key.appendChild(setAlarm);
 }
 } catch (e) {
 console.log(e)
 }
 })
 }*/