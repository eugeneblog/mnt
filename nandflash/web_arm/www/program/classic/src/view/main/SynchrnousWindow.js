Ext.define("program.view.window.SynchrnousWindow", {
    extend: "Ext.window.Window",

    requires: [
        "program.view.window.SynchrnousWindowController",
        "program.view.window.SynchrnousWindowModel"
    ],
    height: 600,
    width: 750,
    autoShow: true,
    layout: 'hbox',
    controller: "window-synchrnouswindow",
    viewModel: {
        type: "window-synchrnouswindow"
    },
    initComponent: function () {
        var targetdata = []
        var me = this;
        myAjax("resources/test1.php?par=getAllScheduleNamesOuter&devname="+me.sDevName, function (response) {
            var text = Ext.decode(response.responseText);
            text.sort()
            for (var i = 0; i < text.length; i++) {
                targetdata.push({name: text[i]})
            }
        });

        me.title = me.sDevNodeName + " Synchrnous"
        me.items = [
            {
                xtype: "gridpanel",
                flex: 4,
                border: true,
                margin: 5,
                selModel: 'checkboxmodel',
                height: "100%",
                title: me.sDevName+" Schedule",

                store: Ext.create("Ext.data.Store", {
                    fields: [{name: "name", type: "string"}],
                    data: [{name: me.sDevNodeName}]
                }),
                columns: [
                    {header: 'Name', dataIndex: 'name', flex: 1}
                ]
            },
            {
                xtype: "panel",
                width: 90,
                height: "100%",
                layout: {
                    type: 'center'

                },
                items: [
                    {
                        xtype: 'button',
                        margin: "0 0 70 0",
                        text: "Ok",
                        scale: 'large',
                        handler: function () {
                            if (me.items.items[0].getSelectionModel().selected.items.length == 0 ||me.items.items[2].getSelectionModel().selected.items.length == 0 ) {
                                Ext.Msg.alert('Massage', 'Please select Schedule .');
                                return ;
                            }

                            var weekStr = ""
                            myAjax("resources/test1.php?par=getvalue&type=Weekly_Schedule&nodename=" + me.sDevNodeName, function (response) {
                                weekStr = response.responseText
                            })
                            var effectivePeriodStr="";
                            myAjax("resources/test1.php?par=getvalue&type=Effective_Period&nodename=" + me.sDevNodeName, function (response) {
                                effectivePeriodStr = response.responseText
                            })
                            console.log(effectivePeriodStr)
                            var publishweeks = me.publishWeek(Ext.decode(weekStr))
                            var models = me.items.items[2].getSelectionModel().selected.items;

                            for (var i = 0; i < models.length; i++) {
                                console.log(models[i])
                                Ext.Ajax.request({
                                    url: "resources/test1.php?par=changevaluenopublish&type=Weekly_Schedule&nodename=" + models[i].data.name,
                                    params: {
                                        value: weekStr
                                    },
                                    async: false,
                                    success: function (response) {
                                        var text = response.responseText;
                                        delayToast("Massage", "Change " + models[i].data.name + " Weekly_Schedule successfully .")
                                    }
                                });
                                Ext.Ajax.request({
                                    url: "resources/test1.php?par=changevaluenopublish&type=Effective_Period&nodename=" + models[i].data.name,
                                    params: {
                                        value: effectivePeriodStr
                                    },
                                    async: false,
                                    success: function (response) {
                                        delayToast("Massage", "Change " + models[i].data.name + " Effective_Period successfully .")
                                    }
                                });

                                console.log(publishweeks)
                                devPublish((models[i].data.name).substr(0, 4) + ".8.*", models[i].data.name + "\r\nEffective_Period\r\n" + effectivePeriodStr.replaceAll("\\s*|\t|\r|\n", ""));
                                for(var j=0;j<publishweeks.length;j++){
                                    var pubstr=Ext.encode(publishweeks[j]).replaceAll("\\s*|\t|\r|\n", "")
                                devPublish((models[i].data.name).substr(0, 4) + ".8.*", models[i].data.name + "\r\nWeekly_Schedule\r\n" + pubstr);
                            }}
                            me.close()
                        }
                    }
                ]
            },
            {
                xtype: "gridpanel",
                title: "Other Schedule",
                flex: 4,
                selModel: {
                    selType: 'checkboxmodel',
                    mode: 'SIMPLE'
                },
                border: true,
                height: "100%",
                margin: 5,
                store: Ext.create('Ext.data.Store', {
                    fields: [{name: "name", type: "string"}
                    ],
                    data: targetdata
                }),
                columns: [
                    {header: 'Name', dataIndex: 'name', flex: 1}
                ]
            }
        ];
        me.callParent();
    },
    buttons:[
        {text:"close",handler:function(){
            this.up("window").close()
        }}
    ],
    publishWeek: function (weekJson) {
        var WeekArr = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        console.log(weekJson)
        var pubweeks=[]
        for (var i = 0; i < WeekArr.length; i++) {
            var pubweekly = {
                "Weekly_Schedule": []
            }
            pubweekly["Weekly_Schedule"].push({
                day: (i + 1),
                value: weekJson['Weekly_Schedule'][WeekArr[i]]
            })
            pubweeks.push(pubweekly)
        }
        return pubweeks;
    }
});

/*
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
 console.log(aItems[i].data.name)
 if (sDevName == "1000" || sDevName == getNetNumberValue()) {
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
 console.log(Ext.encode(oJson))

 Ext.Ajax.request({
 url: "resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=List_Of_Object_Property_References",
 params: {
 value: Ext.encode(oJson)
 },
 success: function (response) {
 var text = response.responseText;
 delayToast("Status", "Changes saved successfully .", 1000)
 }
 });

 if (sDevName != getNetNumberValue()) {
 myAjax("resources/test1.php?par=changevaluenopublish&nodename=" + sDevNodeName + "&type=Position&value=2")
 devPublish(sDevName + ".8.*", sDevNodeName + "\r\nList_Of_Object_Property_References\r\n" + (Ext.encode(oJson).replaceAll("\\s*|\t|\r|\n", "")));
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
 {header: 'Name', dataIndex: 'name', flex: 1},
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
 /!*{
 xtype: 'button',
 margin: "0 0 20 0",
 text: "→",
 scale: 'large'
 },
 {
 xtype: 'button',
 margin: "0 0 0 0",
 text: "←",
 scale: 'large'
 }*!/
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
 text: "Clear All ←",
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
 viewConfig: {
 plugins: {
 ptype: 'gridviewdragdrop',
 dragText: 'Drag and drop to reorganize'
 }
 },
 store: Ext.create('Ext.data.Store', {
 fields: [{name: "name", type: "string"},
 {name: "identifier", type: "string"},
 {name: "arrayIndex", type: "string"}
 ],
 storeId: "refTargetStore",
 data: targetData
 }),
 columns: [
 {header: 'Name', dataIndex: 'name', flex: 1},
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
 */
