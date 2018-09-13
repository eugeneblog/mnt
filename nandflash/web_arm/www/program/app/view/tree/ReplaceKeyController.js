Ext.define('program.view.tree.ReplaceKeyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tree-replacekey',
    itemcontextmenu: function (treeview, record, item, index, e, eOpts) {
        console.log(arguments)
        e.stopEvent();
        var __this = this;
        console.log(arguments)
        if (record.data.depth == 1) {
            __this.devHandler(__this.view, record, e)
        }
        if (record.data.depth == 3) {
            __this.keyHandler(__this.view, record, e)
        }
    },
    devHandler: function (treepanel, record, e) {
        Ext.create("Ext.menu.Menu", {
            //floating: true,
            //viewModel: treePanel.viewModel,
            autoShow: true,
            x: e.pageX + 5,
            y: e.pageY + 5,
            items: [
                {
                    text: "change device instance",
                    handler: function () {
                        Ext.MessageBox.prompt("change device instance", "please input device instance , old device number is " + record.data.text, function (ms, v) {
                            if (ms == 'ok') {
                                if (isNaN(v) || v.length != 4) {
                                    Ext.Msg.alert("Key Exception", "The key ,Does not meet the requirements")
                                    return
                                }
                                if (v) {
                                    treepanel.keyReplace(record.data.text, v);
                                } else {
                                    Ext.Msg.alert("Exception", "device instance exception .")
                                }
                            }
                        }, this, false, record.data.text)
                    }
                }
            ]
        })
    },
    keyHandler: function (treepanel, record, e) {
        Ext.create("Ext.menu.Menu", {
            //floating: true,
            //viewModel: treePanel.viewModel,
            autoShow: true,
            x: e.pageX + 5,
            y: e.pageY + 5,
            items: [{
                text: "change name",
                handler: function () {
                    Ext.MessageBox.prompt("change key", "please input name , old name is " + record.data.text, function (ms, v) {
                        if (ms == 'ok') {
                            /*if (isNaN(v) || v.length != 4) {
                             Ext.Msg.alert("Key Exception", "The key ,Does not meet the requirements")
                             return
                             }*/
                            if (v) {
                                treepanel.nameReplace(record.data.key, record.data.text, v);

                            } else {
                                Ext.Msg.alert("Exception", "name exception .")
                            }
                        }
                    })
                }
            },
                {
                    text: "change number", handler: function () {

                    Ext.MessageBox.prompt("change key", "please input  number , old  number is " + record.data.key.substr(5, 2), function (ms, v) {
                        if (ms == 'ok') {
                            if (isNaN(v) || v.length > 2 || v > 99 || v < 1) {
                                Ext.Msg.alert("number Exception", "The number ,Does not meet the requirements")
                                return
                            }
                            if (v) {
                                console.log(v)
                                treepanel.numberReplace(record.data.key, v);
                            } else {
                                Ext.Msg.alert("Exception", "number exception .")
                            }
                        }
                    })
                }

                },
                {
                    text: "delete ", handler: function () {
                    Ext.Msg.show({
                        title: 'Delete ?',
                        message: 'Would you delete this key? This key is ' + record.data.key,
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.Msg.WARNING,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                treepanel.keyDelete(record.data.key);
                            }
                        }
                    });

                }
                }
            ]
        })
    }
});
