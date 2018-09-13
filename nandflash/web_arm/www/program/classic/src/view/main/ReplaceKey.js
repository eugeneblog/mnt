Ext.define('program.view.tree.ReplaceKey', {
    extend: 'Ext.tree.Panel',

    requires: [
        'program.view.tree.ReplaceKeyController',
        'program.view.tree.ReplaceKeyModel'
    ],

    controller: 'tree-replacekey',
    viewModel: {
        type: 'tree-replacekey'
    },
    region: "center",
    useArrows: true,
    animate: true,
    checkPropagation: "both",
    rootVisible: false,
    bufferedRenderer: false,
    maxHeight: 400,
    autoScroll: true,
    tbar: [{
        text: 'Expand All',
        scope: this,
        handler: function (th) {
            th.up("treepanel").expandAll()
        }
    }, {
        text: 'Collapse All',
        scope: this,
        handler: function (th) {
            th.up("treepanel").collapseAll()
        }
    }],
    listeners: {
        itemcontextmenu: "itemcontextmenu"
    },
    /*buttons:[
     {
     text: "testkeyReplace", hidden: true, handler: function () {
     var me = this.up("treepanel")
     me.keyReplace(8415, 8888)

     }
     }, {
     text: "nameReplace", hidden:true,handler: function () {
     var me = this.up("treepanel")

     me.nameReplace(8415, 8888)
     }
     }
     ],*/
    returnValue: function () {
        var me = this;
        me.up("window").textArea.setValue(me.datasource)
    },
    replaceController: function (callback) {
        var me = this;
        var resAll = Ext.decode(me.datasource)
        var resArr = Ext.decode(resAll.gridpanelConfigs);
        resArr = callback(resArr);
        resAll.gridpanelConfigs = Ext.encode(resArr);
        var text = Ext.encode(resAll)
        me.changeNode(text);
        me.returnValue();
        delayToast("Massage", "ok")
    },
    keyDelete: function (oldkey) {

        this.replaceController(function (resArr) {
            resArr = resArr.filter(function (value, index) {
                if (value.datas.value == oldkey) {
                    return false;
                }else{
                    return true;
                }
            })
            return resArr;
        })
    },
    keyReplace: function (oldValue, newValue) {

        this.replaceController(function (resArr) {
            for (var i = 0; i < resArr.length; i++) {
                var key = resArr[i].datas.value;
                if (key) {
                    console.log(key, key.substr(0, 4), oldValue)
                    if (key.substr(0, 4) == oldValue) {
                        resArr[i].datas.value = newValue + key.substr(4, 3);
                        console.log(resArr[i].datas.value)
                    }
                }
            }
            return resArr;
        })
    },

    nameReplace: function (oldkey, oldValue, newValue) {

        this.replaceController(function (resArr) {
            for (var i = 0; i < resArr.length; i++) {
                console.log(resArr[i])
                var key = resArr[i].datas.value;
                if (oldkey == key) {
                    resArr[i].typegrid.title = newValue;
                }
            }
            return resArr;
        })
    },
    numberReplace: function (oldkey, newValue) {

        this.replaceController(function (resArr) {
            for (var i = 0; i < resArr.length; i++) {
                var key = resArr[i].datas.value;
                console.log(key == oldkey)
                if (oldkey == key) {
                    resArr[i].datas.value = key.substr(0, 5) + newValue;
                    console.log(resArr[i].datas.value)
                }
            }
            return resArr;
        })

    },
    changeNode: function (text) {
        var me = this;
        me.datasource = text;

        var root = me.getTreeStoreRoot(text)
        console.log(root)
        var store = Ext.create("Ext.data.TreeStore", {
            root: root
        })
        me.setStore(store);
    },
    getTreeStoreRoot: function () {
        var me = this;

        var resArr = Ext.decode(Ext.decode(me.datasource).gridpanelConfigs);
        resArr.sort(function (a, b) {
            return a.datas.value - b.datas.value
        })

        resArr = resArr.filter(function (value, index, arr) {
            if (value.datas.type > 10) {
                return false;
            } else {
                return true;
            }
        })
        var keys = []
        for (var i = 0; i < resArr.length; i++) {
            if (resArr[i].datas.type < 10) {
                keys.push(resArr[i].datas.value.substr(0, 4));
            }
        }
        var devs = keys.unique1();
        var devArr = []
        var types = ['AI', 'AO', 'AV', 'BI', 'BO', 'BV'];
        for (var i = 0; i < devs.length; i++) {
            var typeChild = []
            for (var j = 0; j < types.length; j++) {
                var keyChild = []
                for (var k = 0; k < resArr.length; k++) {
                    //console.log(resArr[k])
                    if (devs[i] + j == resArr[k].datas.value.substr(0, 5)) {
                        keyChild.push({
                            qtip: resArr[k].datas.value,
                            qtitle: "key",
                            text: resArr[k].typegrid.title+"  ("+resArr[k].datas.value+")",
                            name: resArr[k].typegrid.title,
                            key: resArr[k].datas.value,
                            leaf: true
                        })
                    }
                }
                if (keyChild.length > 0) {
                    typeChild.push({text: types[j], children: keyChild})
                }
            }
            devArr.push({text: devs[i], children: typeChild})
        }
        var root = {
            children: devArr
        }
        return root;
    }
});
