Ext.define('program.view.window.RenameWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-renamewindow',
    types: ['AI', 'AO', 'AV', 'BI', 'BO', 'BV', 'SCHEDULE'],

    boxready: function () {
        var me = this.view;             //当前的视图对象  
        var types = ['AI', 'AO', 'AV', 'BI', 'BO', 'BV', 'SCHEDULE'];
        var modelType = ['EX-0804','EX-4240','EX-2622'];
        var items = [];   //定义一个数组，用循环创建子组件
        for (var i = 0; i < types.length; i++) {   //遍历types,根据types的长度创建相对应的视图
            var fieldcontainer = {
                xtype: "fieldcontainer",
                layout: "hbox",
                defaults: {
                    margin: "0 20"
                },
                typeAdd: function () {

                },
                items: [
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        fieldLabel: types[i],
                        name: types[i],
                        width: 180,
                        itemId: "typeNumber",
                        flex: 5
                    }, {
                        xtype: "button",
                        devType: i,
                        text: "+",
                        flex: 1,
                        handler: addType.bind(me)
                    }, {
                        xtype: "button",
                        text: "-",
                        devType: i,
                        flex: 1,
                        handler: deleteType
                    }
                ]
            }

            items.push(fieldcontainer);
        }
        items.push(
            {
                xtype: "fieldcontainer",
                layout: "hbox",
                defaults: {
                    margin: "0 10",
                },
                items: [
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        margin: "0 20",
                        xtype: "textfield",
                        fieldLabel: "device instance",
                        editable: false,
                        flex: 2,
                        value: me.devName,
                        itemId: "deviceInstance",
                        columnWidth: 10
                    }, {
                        xtype: "button",
                        text: "replace",
                        flex: 1,
                        handler: function (button) {
                            var container = button.up();
                            var EXDevice = Ext.getCmp('EXModelNum');
                            var oldDevice = container.getComponent("deviceInstance");
                            var newDevice = container.getComponent("replaceDevice");
                            var main = Ext.ComponentQuery.query('renamewindow')[0]; //获取主容器
                            var mainPanel = main.query('panel') //获取主容器下所有panel

                            function logArrayElements(element, index, array){ // 遍历所有panel，替换title
                                if(index){
                                    var oldTitle = element.getTitle();
                                    element.key = newDevice.getValue() + element.key.substr(4);
                                    
                                    element.setTitle(oldTitle.replace(/<b.*?>(.*?)<\/b>/ig, 'dev.' + newDevice.getValue()+ ' '));
                                }
                            }
                            mainPanel.forEach(logArrayElements)
                            
                            oldDevice.setValue(newDevice.getValue());
                            EXDevice.setValue(newDevice.getValue());
                            me.devName = newDevice.getValue();
                            me.deviceName = oldDevice.getValue();
                            me.iterationItems(function (item, i) {
                            })
                            delayToast("Massage", "Replace success");
                        }
                    }, {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        validator: function (val) {
                            if (isNaN(val)) {
                                return "please input number .";
                            }
                            if (val.length != 4 || val < 0 || val > 9999) {
                                return "wrong format ."
                            }
                            return true
                        },
                        itemId: "replaceDevice",
                        xtype: "textfield",
                        flex: 1
                        //marigin:"0 35 0 0"
                    }
                ]
            }
        );
        items.push(
          {
                xtype: "fieldcontainer",
                layout: "hbox",
                id:'modelType',
                defaults: {
                    margin: "0 10",
                },
                 items: [
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        
                        xtype: "textfield",
                        fieldLabel: "EX-model",
                        editable: false,
                        flex: 6,
                        margin:"0 0 0 20px",
                        value: me.devName,
                        itemId: "EXModelNum",
                        id:'EXModelNum'
                    },
                    
                    
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        value:2,
                        disabled:true,
                        isAdd:false,
                        editable: false,
                        flex: 1
                    },
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        value:3,
                        isAdd:false,
                        disabled:true,
                        editable: false,
                        flex: 1
                    },
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        value:4,
                        disabled:true,
                        isAdd:false,
                        editable: false,
                        flex: 1
                    },
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        value:5,
                        disabled:true,
                        isAdd:false,
                        editable: false,
                        flex: 1
                    },
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        value:6,
                        disabled:true,
                        isAdd:false,
                        editable: false,
                        flex: 1
                    },
                    {
                        fieldStyle: {
                            textAlign: "center"
                        },
                        xtype: "textfield",
                        value:7,
                        disabled:true,
                        isAdd:false,
                        editable: false,
                        flex: 1
                    }
                    ]
            }
            );
            items.push(
                {
                      xtype: "fieldcontainer",
                      layout: "hbox",
                      defaults: {
                          margin: "0 10",
                      },
                       items: [
                        {
                            margin:"0 0 0 20px",
                            xtype: "combobox",
                            flex: 5,
                            // allowBlank: false,
                            fieldLabel: 'select',
                            store: modelType,
                            editable: false,
                            // autoSelect: true,
                            itemId: "select",

                            
                            value:'EX-0804',
                        },
                        {
                            fieldStyle: {
                                textAlign: "center"
                            },
                            xtype: "combobox",
                            value:2,
                            itemId:'selectNum',
                            id:'selectNum',
                            editable: false,
                            store: [2,3,4,5,6,7],
                            flex: 1
                        },{
                            xtype: "button",
                            devType: i,
                            text: "+",
                            flex: 1,
                            handler:function(button){
                                addModel(button);
                            },
                        }, {
                            xtype: "button",
                            text: "-",
                            devType: i,
                            flex: 1,
                            handler: delModel
                        }
                          ]
                  }
                  );

        var panel = Ext.create("Ext.form.Panel", {
            title: "devices",
            key:'0000000',
            items: items,    //将子组件加入panel
            bodyPadding: 20,
            minHeight: 350,
            id:'devicePanel'
        });
        var myMask = new Ext.LoadMask({
            msg    : 'Please wait...',
            target : panel,
        }).hide();
        panel.getForm().setValues(me.getFormValues());  //获取panel的form对象，批量设置表单内的字段值
        me.insert(0, panel);//添加容器到指定位置
    
        panel.expand();//展开panel所有节点
    //    ----------------------------------------===========================================================
        function addType(button) {  //传入button对象   ，添加类型

            var lastText = me.sDevName + button.devType;    //当前操作的xml文件名 + 按钮的 devtype

            var netNumbers = []     //device instance select框的值
            for (var i = 0; i <= 9900; i += 100) {
                netNumbers.push(i)
            }
            var modelAddress = []; //instance select 框的值
            for (var i = 0; i <= 99; i++) {
                modelAddress.push(i);
            }
            var pointType = [];    //point select 的值
            for (var i = 0; i < types.length; i++){
                pointType.push({
                    name: types[i],
                    value: i
                })
            }
            // console.log(types);

            //console.log(button.devType)
            //console.log(button.up().getComponent("typeNumber").value)
            //console.log(me)

            var refDev;
            if (me.devName) {
                refDev = me.devName;
            } else {
                refDev = me.sDevName;
            }
            //console.log(refDev);
            var keyField = Ext.create("Ext.form.field.Text", {
                margin: 10,
                fieldLabel: "Key",
                value: (refDev || "9901") + button.devType + "01"
            })

            var win = Ext.create('Ext.window.Window', {    //增加AI..BI 的弹窗视图
                title: 'Add •••',
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
                        fieldLabel: 'device instance',
                        store: netNumbers,
                        editable: false,
                        queryMode: 'local',
                        autoSelect: false,
                        value: refDev || "9901",
                        listeners: {
                            change: function (field, newValue, oldValue) {

                                var instance = win.getComponent("instance");
                                var instanceValue = (newValue + "").substr(2, 2)
                                instance.setValue(instanceValue)

                                var value = Ext.String.leftPad(newValue, 4, "0");
                                var values = keyField.getValue().split("");
                                values[0] = value[0];
                                values[1] = value[1];
                                keyField.setValue(values.join(''))

                                //Ext.String.insert //补0
                            }
                        }
                    },
                    {
                        margin: 10,
                        xtype: "combobox",
                        allowBlank: false,
                        fieldLabel: 'instance',
                        store: modelAddress,
                        editable: false,
                        itemId: "instance",
                        queryMode: 'local',
                        autoSelect: false,
                        value: refDev.substr(2, 2),
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var value = Ext.String.leftPad(newValue, 2, "0");
                                var values = keyField.getValue().split("");
                                values[2] = value[0]
                                values[3] = value[1]
                                keyField.setValue(values.join(''))
                            }
                        }

                    },
                    {
                        margin: 10,
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
                                combo.setValue(combo.store.getAt(button.devType));
                            },
                            change: function (field, newValue, oldValue) {
                                var value = newValue;
                                var values = keyField.getValue().split("");
                                values[4] = value
                                keyField.setValue(values.join(''))

                                var pn = field.up().getComponent("pointNumber");
                                if (newValue == 2 || newValue == 5) {
                                    pn.setMaxValue(30)
                                    if (pn.value > 30) {
                                        pn.setValue(30)
                                    }
                                } else {
                                    pn.setMaxValue(24)
                                }

                            }
                        }
                    },
                    {
                        margin: 10,
                        xtype: "numberfield",
                        allowBlank: false,
                        fieldLabel: 'Point Number',
                        //store: modelAddress,
                        maxValue: 24,
                        minValue: 0,
                        editable: false,
                        itemId: "pointNumber",
                        queryMode: 'local',
                        autoSelect: false,
                        value: "01",
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var value = Ext.String.leftPad(newValue, 2, "0");
                                var values = keyField.getValue().split("");
                                values[5] = value[0]
                                values[6] = value[1]
                                keyField.setValue(values.join(''))
                            }
                        }

                    },
                    keyField
                ],
                buttons: [
                    {
                        text: 'Ok', handler: function () {    //ok点击事件发生后调用一个处理程序

                        var text = keyField.getValue();    //获取文件名

                        /*if (text == null) {
                         Ext.Msg.alert('Info', 'Plase select file name.');
                         return;
                         }*/

                        //win.close();

                        if (isNaN(text) || text.length != 7) {     //判断text是不是非数值，和text的长度是否不等于7位数，有一个条件满足则提示用户不符合要求
                            Ext.Msg.alert("Key Exception", "The key ,Does not meet the requirements")
                            return
                        }

                        if (me.query('[key=' + text + ']').length) {  
                            Ext.Msg.alert("Key Exception", "has been " + text)
                            return
                        }

                        var typeNumber = text.substr(4, 1);
                        if (me.getFormValues().SCHEDULE >= 5) {
                            Ext.Msg.alert("Massage","SCHDULE max is 5");
                            return ;
                        }
                        var objname = types[typeNumber] + text.substr(5, 2);
                        Ext.MessageBox.prompt("Input", "New Name", function (ms, v) {
                            if (ms != 'ok') {
                                return;
                            }

                            me.insrtDevForm(text, v);
                            panel.getForm().setValues(me.getFormValues());
                            Ext.Msg.alert("Massage", "Ok.")
                        }, this, false, objname);

                        //panel.getForm().setValues(me.getFormValues());

                    }
                    },
                    {
                        text: 'Close', handler: function () {
                        win.close();
                    }
                    }
                ]
            })

            /*Ext.MessageBox.prompt('Add •••', 'Please enter your key:', function (ms, v, scope) {
             if (ms == 'ok') {
             if (v.length == 7 & v.substr(0, 5) == lastText & !isNaN(v)) {
             window.insrtDevForm(v);
             } else {
             Ext.Msg.alert('Exception', "Please enter 7 digits after two .")
             }

             }
             }, this, false, lastText);
             */


        }
        //---------------------------------------删除模块------------------------------------------------
        function deleteType(button) {  //删除类型


            var win = Ext.create('Ext.window.Window', {
                title: 'Delete •••',
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
                        store: Ext.create("Ext.data.Store", {
                            fields: ['key', "title"],
                            data: me.getFormValues()['type' + button.devType]
                        }),
                        editable: false,
                        queryMode: 'local',
                        displayField: 'title',
                        valueField: 'key',
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
                        }else{
                            me.deleteDevForm(text);

                            panel.getForm().setValues(me.getFormValues());
                            win.close();
                        }

                    }
                    },
                    {
                        text: 'Close', handler: function () {
                        win.close();
                    }
                    }
                ]
            })

        };
        // ====================================================================================
        function addModel(button){
            // myMask.show();
            var fileName = button.up('form').down('#select').getValue(); //获取select的value
            var xmlType =  button.up('form').down('#selectNum').getValue(); //获取selectNum 的vlaue
            var allInput = Ext.getCmp('modelType').items.items;
            var form = Ext.getCmp("loadRenameWin");
            var keys = [];
            var pattern = /\d/;
            //遍历所有items，加上禁用
            for(var i = 1,len = allInput.length;i < len;i++){
                // allInput[i].setDisabled(true);
                if(parseInt(allInput[i].value) === xmlType){
                    if(allInput[i].disabled == true){
                        allInput[i].setDisabled(false);
                        console.log('加载异步请求');
                        function replaceChat(source,pos,newChar){  
                            if(pos<0||pos>=source.length||source.length==0){  
                                return "invalid parameters...";  
                            }  
                            var iBeginPos= 0, iEndPos=source.length;  
                            var sFrontPart=source.substr(iBeginPos,pos);  
                            var sTailPart=source.substr(pos+1,source.length);  
                            var sRet=sFrontPart+newChar+sTailPart;  
                            
                            return sRet;  
                        }  
                        Ext.Ajax.request({
                            async: false,
                            url:'resources/model/'+fileName+'.xml',
                            listeners:{  
                                beforerequest:function(){  
                                    myMask.show();
                                    console.log('加载之前显示loadmask');
                                }  
                            }, 
                            success:function(response,opts){
                               
                                var xml = response.responseXML;
                                var domKeys = xml.querySelectorAll("key");
                                for(var i = 0,len = domKeys.length;i<len;i++){   //遍历所有key
                                    var domKeys_attr = domKeys[i].getAttribute('number');    //获取number属性
                                    var new_keys = replaceChat(domKeys_attr,5,xmlType);  //替换number第六位
                                    domKeys[i].setAttribute('number',new_keys);   //修改number属性
                                    
                                    var Description = domKeys[i].querySelector('Description').innerHTML;    //修改Description元素的文本
                                    domKeys[i].querySelector('Description').innerHTML = Description.replace(pattern,xmlType);

                                    var Object_Name_str = domKeys[i].querySelector("Object_Name").innerHTML;    //修改Object_Name元素的文本
                                    domKeys[i].querySelector('Object_Name').innerHTML = Object_Name_str.replace(pattern,xmlType);
                                    var Object_Name = domKeys[i].querySelector("Object_Name").innerHTML;

                                    var keyType;
                                    parseInt(domKeys[i].getAttribute("number").substr(4, 1)) == 3 ? keyType = 4 : keyType = domKeys[i].getAttribute("number").substr(4, 1);
                                   
                                    if (keyType == '3' || keyType == '4') {   //如果keyType是3 或 4 截取前四位
                                        var devName = domKeys[i].getAttribute('number').substr(0, 4)
                                        me.devName = devName;
                                        // console.log(devName);
                                    }
                                    var types = me["type" + keyType];  //获取keyType对应类型key下的值
                                        // console.log(me);
                                        //console.log(types)
                                        if (!types) {     
                                            continue;
                                        }
                                    var formData = {};
                                    for (var j = 0; j < types.length; j++) {  //遍历types数组下的所有值
                                        var typeTag = domKeys[i].getElementsByTagName(types[j])[0];
                                        var fieldName = types[j];
                                        var value;
                                        if (typeTag) {
                                            value = typeTag.innerHTML;
                                        } else {
                                            value = ""
                                        }
                                        formData[fieldName] = value;
                                    }
                                    var formPanel = me.createModelForm({Object_Name: Object_Name, key: domKeys[i].getAttribute('number')});//创建formPanel
                                    // me.add(formPanel);
                                    me.insert(1,formPanel);
                                    // me.items.items.push(formPanel);
                                    formPanel.getForm().setValues(formData);   //调用Ext内置的方法获取form并且设置值
                                }
                                me.updateLayout();
                                Ext.MessageBox.alert('Success','Successfully adding EX-model'+xmlType);
                            },
                            failure:function(response,opts){

                            }
                        })
                    }else{
                        Ext.MessageBox.alert("Warning",'This module already exists');
                        return;
                    }
                }
            }
            console.log(allInput);
            
        };
        //=========================================================================================
        function delModel(button){
            var xmlType =  button.up('form').down('#selectNum').getValue(); //获取selectNum 的vlaue
            var allInput = Ext.getCmp('modelType').items.items;
            for(var i = 1,len = allInput.length;i < len;i++){
                if(parseInt(allInput[i].value) == xmlType){
                    if(allInput[i].disabled == false){
                        allInput[i].setDisabled(true);
                        //根据属性值删除组件
                        var keys = me.items.items;
                        var i = keys.length;
                        while(i--){
                            console.log(i+'='+keys[i]);
                            if(keys[i].key && keys[i].key.substr(5,1) == xmlType){
                                me.remove(keys[i],true);
                            }
                        }
                        Ext.MessageBox.alert('Success','Deleted successfully EX-model '+xmlType);
                    }else{
                        Ext.MessageBox.alert('Waring','This module does not exist');
                    }
                }else{
                    // Ext.MessageBox.alert('Waring','This module does not exist');
                }
            }
        };
        // 
    }
});
