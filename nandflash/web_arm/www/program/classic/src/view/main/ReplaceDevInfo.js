Ext.define('program.view.window.ReplaceDevInfo', {
    extend: 'program.view.window.EditFile',

    requires: [
        'program.view.window.ReplaceDevInfoController',
        'program.view.window.ReplaceDevInfoModel'
    ],

    controller: 'window-replacedevinfo',
    viewModel: {
        type: 'window-replacedevinfo'
    },
    bind: {
        title: "Edit {title}"
    },
    constructor: function () {
        var me = this;
        var win = me;
        me.showTextArea = false;
        me.showCombo = true;
        me.showFileButton = false;
        me.typeCombo = Ext.create("Ext.form.field.ComboBox", {
            fieldLabel: "Fields",
            store: Ext.create("Ext.data.Store", {
                field: ["name", "value"],
                data: [
                    {name: "key", value: "value"},
                    {name: "title", value: "title"}
                    //{name:"plant",value:"plantId"}
                ]
            }),
            displayField: 'name',
            valueField: 'value',
            listeners: {
                beforedestroy: function () {
                    return false;
                },
                change: function () {
                    console.log("change")
                }
            }
        });

        me.combo = Ext.create("Ext.form.field.ComboBox", {
            fieldLabel: "Select File",
            store: getDevInfoFileNames(),
            editable: false,
            viewModel: me.viewModel,
            bind: {
                value: "{title}"
            },
            listeners: {
                change: function (combo, newValue) {

                    me.loadFile(newValue)


                }
            }
        })
        me.loadFile = function (filename) {
            me.currentFile=filename;
            myAjax('resources/devsinfo/' + filename, function (response) {
                win.textArea.setValue(response.responseText);
                treePanel.changeNode(response.responseText)
            })
        }
        me.okHandler = function () {

            Ext.Ajax.request({
                url: "resources/xmlRW.php",
                async: false,
                method: "POST",
                params: {
                    fileName: "devsinfo/" + win.combo.value,
                    content: win.textArea.value,
                    rw: "w"
                },
                success: function (response) {
                    if (win.textArea.value.length == response.responseText) {

                        delayToast("Maasage", "save success ." + response.responseText);
                    } else {
                        Ext.Msg.alert("Error", response.responseText);
                    }
                    me.loadFile(me.currentFile);
                    console.log(arguments)
                }
            })
        }
        me.replaceOkHandler = function (oldValue, newValue) {
            var me = win;
            console.log(me.typeCombo.value)
            var typeName = me.typeCombo.value;

            //try {
            var resArr = Ext.decode(Ext.decode(me.textArea.value).gridpanelConfigs)
            var count = 0;
            for (var i = 0; i < resArr.length; i++) {
                var datas = resArr[i].datas;
                if (datas[typeName]) {
                    datas[typeName] = datas[typeName].replace(oldValue, newValue);
                    count++;
                }
                console.log(datas)
            }

            Ext.Msg.show({
                title: 'Save Changes?',
                message: 'Are you want replace <code style="color: red;">' + typeName + '</code> The old value is <code style="color: red;">' + oldValue + '</code> new value is <code style="color: red;">' + newValue + '</code>, You are closing a tab that has unsaved changes. Would you like to save your changes?',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        //console.log('Yes pressed');
                        me.textArea.setValue(Ext.encode(resArr))
                        Ext.Msg.alert("Massage", "Modified " + count + " places .")
                        //console.log(Ext.encode(resArr))

                    }
                }
            })
        }
        console.log("before - constructor ReplaceDev")
        me.callParent();
        /* function getTreeStoreRoot(text) {
         var resArr = Ext.decode(Ext.decode(text).gridpanelConfigs);
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
         keyChild.push({text: resArr[k].typegrid.title, key: resArr[k].datas.value, leaf: true})
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

         var treePanel = Ext.create("Ext.tree.Panel", {
         region: "center",
         useArrows: true,
         animate: true,
         checkPropagation: "both",
         rootVisible: false,
         bufferedRenderer: false,
         maxHeight: 400,
         autoScroll: true,
         store: Ext.create('Ext.data.TreeStore', {}),
         tbar: [{
         text: 'Expand All',
         scope: this,
         handler: function (th) {
         treePanel.expandAll()
         }
         }, {
         text: 'Collapse All',
         scope: this,
         handler: function (th) {
         treePanel.collapseAll()
         }
         }],
         listeners: {
         itemcontextmenu: function () {
         alert("asdf")
         }
         }
         })*/

        me.add({
            bind: {
                html: "Current File is <code style='color: red;font-size: 17px;'>{title}</code>"
            }
        })

        var treePanel = Ext.create("program.view.tree.ReplaceKey")
        me.add(treePanel)

        console.log(me.getDockedItems()[1].insert(1, Ext.create("Ext.button.Button", {
            text: "Replace Type",
            handler: "replaceTypeClick"
        })))
        //.insert(0,{text:"Replace Type",handler:"replaceType"})

        console.log("after - constructor ReplaceDev")

    },
    initComponent: function () {
        var me = this;


        console.log("before - initComponent ReplaceDev")

        me.callParent();
        /*me.buttons.push({
         text:"Replace Type",
         handler:"replaceType"
         })*/
        console.log("after - initComponent ReplaceDev")

    },

});
