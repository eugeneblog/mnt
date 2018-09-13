Ext.define('program.view.window.AttributeTableWin', {
    extend: 'Ext.window.Window',
    requires: [
        'program.view.window.AttributeTableWinController',
        'program.view.window.AttributeTableWinModel',
        "program.store.AttributeTableStore"
    ],

    controller: 'window-attributetablewin',
    viewModel: {
        type: 'window-attributetablewin'
    },
    modal: true,
    title: "Select Attribute",
    autoShow: true,
    width: 600,
    buttons: [
        {
            text: "Close", handler: "closeWin"
        }
    ],
    initComponent: function () {
        var me = this;

        var formPanel = Ext.create("Ext.form.Panel", {
            viewModel: me.viewModel,
            width: "100%",
            layout: "hbox",
            margin: 10,
            items: [
                {
                    xtype: "textfield",
                    width: 100,
                    bind: "{value}"
                }, {
                    fieldLabel: 'Toggle Group',
                    margin: "0 0 0 20",
                    items: [{
                        xtype: 'segmentedbutton',
                        items: [{
                            text: "English",
                            margin: "0 0 0 20",
                            value: "en",
                            pressed: true,
                        }, {
                            margin: "0 0 0 20",
                            text: '中文',
                            value: "zh"
                        }],
                        listeners: {
                            toggle: function (container, button, pressed) {
                                me.viewModel.set("bol", button.value)
                            }
                        }
                    }
                    ]
                }, {
                    margin: "0 0 0 20",
                    xtype: "button",
                    text: "OK",
                    handler: function () {
                        me.callback(me.viewModel.get("value"));
                    }
                }

            ]
        })

        var treePanel = Ext.create("Ext.tree.Panel", {
            region: "center",
            useArrows: true,
            maxHeight: 400,
            viewModel: me.viewModel,
            checkPropagation: "both",
            rootVisible: false,
            bufferedRenderer: false,
            width: "100%",
            store: {
                type: "tree",
                autoLoad: true,
                filters: [],
            },
            bind: {
                store: "{treestore}"
            },
            tbar: [{
                text: 'Expand All',
                scope: this,
                handler: function () {
                    treePanel.expandAll();
                }
            }, {
                text: 'Collapse All',
                scope: this,
                handler: function () {
                    treePanel.collapseAll();
                }
            }],
            listeners: {
                select: function (tree, record, index, eOpts) {
                    if (record.data.qtip) {
                        me.viewModel.set("value", record.data.qtip)
                    } else {
                        me.viewModel.set("value", "")
                    }
                }
            }
        })


        me.items = [formPanel, treePanel]

        /* me.buttons = [{
         text: "Ok",
         handler: function () {
         //var grid = win.down("treepanel");
         var tree = me.down("treepanel")
         var selectArr = tree.getSelection();
         if (!selectArr[0]) {
         Ext.Msg.alert("Massage", "Please select a key .");
         } else {
         me.callback(selectArr)
         }
         }
         }, {
         text: "Cancel",
         handler: function () {
         me.close();
         }
         }]*/
        me.callParent();
    },
});
