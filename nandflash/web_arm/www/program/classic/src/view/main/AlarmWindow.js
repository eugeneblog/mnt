Ext.define("program.view.window.AlarmWindow", {
    extend: "Ext.window.Window",

    requires: [
        "program.view.window.AlarmWindowController",
        "program.view.window.AlarmWindowModel",
        'program.model.Alerm'
    ],

    controller: "window-alarmwindow",
    viewModel: {
        type: "window-alarmwindow"
    },
    autoShow: true,
    width: 800,
    height: 600,
    layout: 'auto',
    resizable: false,
    constrainHeader: true,
    listeners: {
        boxready: "formBoxReady"
    },
    initComponent: function () {
        var me = this;
        me.title = me.sDevNodeName + " Alarm Property";


        var meForm = Ext.create('Ext.form.Panel', {
            items: {
                xtype: "container",
                height: 600,
                defaults: {
                    anchor: '100%',
                    margin: "20 10 10 10"
                },
                layout: 'hbox',
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Input Value',
                                defaultType: 'numberfield',
                                defaults: {
                                    margin: "73 0 73 0",
                                    allowBlank: false,
                                    minValue: 0,
                                },
                                items: [{
                                    disabled: me.isBiov(),
                                    hidden: me.isBiov(),
                                    name: "high_limit",
                                    fieldLabel: "Height Limit",
                                    bind: "{high_limit}"
                                }, {
                                    disabled: me.isBiov(),
                                    hidden: me.isBiov(),
                                    name: "low_limit",
                                    fieldLabel: "Low Limit",
                                    bind: "{low_limit}"
                                }, {
                                    name: "delay_time",
                                    fieldLabel: "Delay Time",
                                    bind: "{delay_time}"
                                }, {
                                    disabled: me.isBiov(),
                                    hidden: me.isBiov(),
                                    name: "deadband",
                                    fieldLabel: "Deadband",
                                    bind: "{deadband}"
                                }]
                            }
                        ]
                    },
                    {
                        xtype: "container",
                        flex: 1,

                        items: [
                            {
                                xtype: 'fieldset',
                                flex: 1,
                                title: 'select value',
                                defaultType: 'checkbox', // each item will be a checkbox
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    hideEmptyLabel: false
                                },
                                items: [
                                    {
                                        xtype: "combobox",
                                        margin: "15 0 15 0",
                                        fieldLabel: 'Notification Class',
                                        name: 'notification_class',
                                        displayField: 'name',
                                        valueField: 'value',
                                        allowBlank: false,
                                        editable: false,
                                        bind: "{notification_class}",
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ["name", "value"],
                                            data: [
                                                {"name": "URGENT", "value": "1"},
                                                {"name": "HIGH", "value": "2"},
                                                {"name": "LOW", "value": "3"}
                                            ]
                                        })
                                    },
                                    {
                                        xtype: "combobox",
                                        margin: "15 0 15 0",
                                        fieldLabel: 'Event Type',
                                        name: 'event_type',
                                        disabled: (me.isAiov()) & me.isBiov(),
                                        hidden: (me.isAiov()) & me.isBiov(),
                                        displayField: 'name',
                                        valueField: 'value',
                                        allowBlank: false,
                                        editable: false,
                                        bind: {
                                            value: "{event_type}",
                                        },
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ["name", "value"],
                                            data: [
                                                {"name": "ALARM", "value": "0"},
                                                {"name": "EVENT", "value": "1"}
                                            ]
                                        })
                                    },

                                    {
                                        xtype: "combobox",
                                        margin: "15 0 15 0",
                                        fieldLabel: 'Alarm Value',
                                        name: 'alarm_value',
                                        disabled: !me.isBiov(),
                                        hidden: !me.isBiov(),
                                        displayField: 'name',
                                        valueField: 'value',
                                        allowBlank: false,
                                        editable: false,
                                        bind: {
                                            value: "{alarm_value}",
                                        },
                                        store: Ext.create("Ext.data.Store", {
                                            fields: ["name", "value"],
                                            data: [
                                                {"name": "0", "value": "0"},
                                                {"name": "1", "value": "1"}
                                            ]
                                        })
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                flex: 1,
                                title: 'checked value',
                                defaultType: 'checkbox', // each item will be a checkbox
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    margin: "20 0 20 0",
                                    viewModel: me.getViewModel()
                                },

                                items: [
                                    {
                                        disabled: me.isBiov(),
                                        hidden: me.isBiov(),
                                        reference: "checked1",
                                        fieldLabel: 'Enable Limit',
                                        boxLabel: 'Enable Height Limit',
                                        submitValue:false,
                                        bind: "{ck1}"
                                    }, {
                                        disabled: me.isBiov(),
                                        hidden: me.isBiov(),
                                        reference: "checked2",
                                        boxLabel: 'Enable Low Limit',
                                        submitValue:false,
                                        bind: "{ck2}"
                                    },
                                    {
                                        disabled: me.isBiov(),
                                        hidden: me.isBiov(),
                                        xtype: "hiddenfield",
                                        name: "limit",
                                        bind: '{limit}'
                                    },
                                    {
                                        reference: "checked3",
                                        fieldLabel: 'Event Enable',
                                        boxLabel: 'ENABLE_TO_NORMAL',
                                        bind: '{ck3}',
                                        submitValue:false
                                    }, {
                                        reference: "checked4",
                                        boxLabel: 'ENABLE_TO_OFFNORMAL',
                                        bind: '{ck4}',
                                        submitValue:false
                                    }, {
                                        reference: "checked5",
                                        boxLabel: 'ENABLE_TO_FAULT',
                                        bind: '{ck5}',
                                        submitValue:false
                                    }, {
                                        xtype: "hiddenfield",
                                        name: "event_enable",
                                        bind: '{event_enable}'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });
        me.items = meForm;

        me.buttons = [
            {
                text: "Ok", handler: function () {

                if (me.localData) {
                    var values = meForm.getValues();
                    var ojson = {
                        Set_Alarm: [
                            values
                        ]
                    }
                    me.submitAlarm(Ext.encode(ojson));
                    me.close()
                    return;
                }

                if (meForm.isValid()) {
                    meForm.submit({
                        url: "resources/test1.php?par=addAlarm&nodename=" + me.sDevNodeName,
                        method: "post",
                        failure: function (form, action) {
                            delayToast('Success', me.sDevNodeName + ' Change value Alarm success .', 0)
                            devPublish(me.sDevName + ".8.*", me.sDevNodeName + "\r\nSet_Alarm\r\n" + (Ext.encode(action.result)).replaceAll("\\s*|\t|\r|\n", ""), 0);
                            me.close()
                        },
                        success: function (form, action) {
                            delayToast('Success', me.sDevNodeName + ' Change value Alarm success .', 0)
                            devPublish(me.sDevName + ".8.*", me.sDevNodeName + "\r\nSet_Alarm\r\n" + (Ext.encode(action.result)).replaceAll("\\s*|\t|\r|\n", ""), 0);
                            me.close()
                        }

                    });
                }
            }
            }, {
                text: "Cancel", handler: function () {
                    me.close()
                }
            }
        ];
        me.callParent();
    },
    getAlarmFormData: function () {

        var me = this;
        if (me.localData) {
            try {
                var data = Ext.decode(me.alarmData)['Set_Alarm'][0];
                var alarm = Ext.create("program.model.Alerm", data);

                me.down("form").loadRecord(alarm);

            } catch (e) {
            }
            return
        }

        myAjax("resources/test1.php?par=getAlarm&nodename=" + me.sDevNodeName, function (response) {
            console.log(arguments)
            try {
                var data = Ext.decode(response.responseText)['Set_Alarm'][0];
                var alarm = Ext.create("program.model.Alerm", data);

                me.alarmData = alarm;
                console.log(alarm);
                me.down("form").loadRecord(alarm);
            } catch (e) {
                setTimeout(function () {
                    Ext.Msg.alert('Massage', 'invalid date , This attribute is initialized, ok .');
                }, 500);
                return;
            }
        })

        return me.alarmData;

    },
    isBiov: function () {
        var me = this;
        var text = me.sDevNodeType;
        console.log(me)
        console.log(text)
        if (text == "BI" || text == "BO" || text == "BV") {
            return true;
        }
        return false;
    },
    isAiov: function () {
        var me = this;
        var text = me.sDevNodeType;
        console.log(me)
        console.log(text)
        if (text == "AI" || text == "AO" || text == "AV") {
            return true;
        }
        return false;
    }
});

