Ext.define("program.view.main.toolbar.TopToolbar", {
    extend: "Ext.toolbar.Toolbar",
    xtype: 'basic-toolbar',
    id: 'basic-toolbar',
    requires: [
        "program.view.main.toolbar.TopToolbarController",
        "program.view.main.toolbar.TopToolbarModel",
        "program.view.window.UploadWindow",
        "Ext.window.*",
        "program.view.window.EditFile"
    ],
    controller: "main-toolbar-toptoolbar",
    viewModel: {
        type: "main-toolbar-toptoolbar"
    },
    initComponent: function () {
        Ext.apply(this, {
            width: "100%",
            
            items: [
                {
                    text: 'File',
                    glyph: 70,
                    menu: [{
                        text: 'New',
                        handler: "newClick"
                    },
                        {
                            text: 'Open',
                            listeners: {
                                click: "openXmlClick1"
                            }
                        }, {
                            text: 'Save',
                            handler: function () {
                                var title = getCurrentDrawPanel().title;
                                var startTime = new Date().getTime()
                                saveXml(title);
                                console.log("saveXml" + (new Date().getTime() - startTime) + "毫秒")
                            }
                        }, {
                            text: "Save as •••",
                            handler: "saveAsClick"
                        }, {
                            text: "replace •••",
                            handler: "replaceClick"
                        }, {
                            text: "Download •••",
                            handler: "downloadClick"
                        }, {
                            text: "Upload •••",
                            handler: "uploadClick"
                        }, {
                            text: "Backup •••", handler: "backupClick"
                        }, {
                            text: "Restor •••", handler: "RestorClick"
                        }, "-", {
                            text: "Exit", handler: function () {
                                Ext.Msg.show({
                                    title: 'Exit System',
                                    message: 'Click YES Will exit the system!',
                                    buttons: Ext.Msg.YESNO,
                                    icon: Ext.Msg.INFO,
                                    fn: function (btn) {
                                        if (btn === 'yes') {
                                            location.href = "../default.html";
                                        } else if (btn === 'no') {

                                        } else {

                                        }
                                    }
                                });
                            }
                        }
                    ]
                }
                , {
                    text: "Help",
                    glyph: 72,
                    menu: [
                        {
                            text: "Update", hidden: false, handler: function () {

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
                                            fieldLabel: 'Plase select Program Install Packages',
                                            labelWidth: 150,
                                            msgTarget: 'side',
                                            allowBlank: false,
                                            anchor: '100%',
                                            buttonText: 'Select Program...',
                                            listeners: {
                                                blur: function () {

                                                }
                                            }
                                        }
                                    ],
                                    listeners: {
                                        boxready: function () {
                                            var downButton = form.el.dom.querySelector('.x-form-file-input');
                                            downButton.accept="application/x-gzip"
                                        }
                                    }
                                }
                            )


                            var win = Ext.create("Ext.window.Window", {
                                title: 'Upload Programming Software',
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
                                        console.log(this)
                                        //var form = form.getForm();
                                        if (form.isValid()) {
                                            form.submit({
                                                waitMsg: 'Updateing your program...',
                                                url: 'resources/test1.php?par=updateProgram',
                                                method: "POST",
                                                metadata: {"enctype": "multipart/form-data"},
                                                Massage: function (form, action) {
                                                    if (action.response.responseText.indexOf("Error") >= 0) {
                                                        Ext.Msg.alert("Exception", "auto update failure , Please use manual installation package update 。 ");
                                                        return;
                                                    }
                                                    Ext.Msg.show({
                                                        title: 'Massage',
                                                        message: 'program update success .',
                                                        buttons: Ext.Msg.YES,
                                                        //icon: Ext.Msg.INFO,
                                                        fn: function (btn) {
                                                            if (btn === 'yes') {
                                                                location.reload()

                                                            }
                                                        }
                                                    });
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
                        }, {
                            text: "open permission",
                            handler: function () {
                                myAjax("resources/test1.php?par=openPermission", function () {
                                    delayToast("Massage", "open permission success .", 1000)
                                })
                            }
                        }, {
                            text: "About",
                            handler: function () {
                                Ext.Msg.alert('Version', 'Smart 3.10 ');
                            }
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});

function saveGridpanelsConfigs(fileName) {
    if (fileName != "1000") {
        fileName = "devsinfo/" + fileName
    } else {
        fileName = "../1000.json";
    }
    var drawpanel = getCurrentDrawPanel();


    var gridpanels = getCurrentDrawPanelGirdPanels();
    var aGridPanels = [];
    for (var i = 0; i < gridpanels.length; i++) {
        /*    var typeGridConfig = getGridPanelConfig(gridpanels[i]);


         var storeConfig = getStoreConfig(gridpanels[i]);

         var datas = gridpanels[i].datas;

         if (gridpanels[i].datas.type == 56) {
         var columns = Ext.getCmp("win" + gridpanels[i].id).down("grid").getColumns();
         for (var j = 0; j < columns.length; j++) {
         if (columns[j].hidden) {
         datas.rows = j;
         break;
         }
         datas.rows = 10;
         }
         }
         aGridPanels.push({typegrid: typeGridConfig, store: storeConfig, datas: datas});
         */
        var resJson = getTypeGridDatas(gridpanels[i]);
        aGridPanels.push(resJson);
    }

    var oJson = {
        //datasArray:datasArrayStr,
        datasArray: Ext.encode(drawpanel.datas.datasArray),
        plants: Ext.encode(drawpanel.datas.plants),
        gridpanelConfigs: Ext.encode(aGridPanels)
    };

    console.log(oJson)
    Ext.Ajax.request({
        url: "resources/xmlRW.php",
        params: {
            fileName: fileName,
            rw: "w",
            content: Ext.encode(oJson)
        },
        success: function (response) {
            var text = response.responseText;
        }
    });
}

function getGridPanelRowsIds(gridpanel) {
    var trs = gridpanel.el.dom.querySelectorAll(".x-grid-row");
    var ids = [];
    for (var i = 0; i < trs.length; i++) {
        /*if (trs[i].length < 3) {
         currentDrawPanelGridPanelsTrSetId()
         }*/
        /*var sid = "t"+parseInt((trs[i].id).substr(1,trs[i].id.length)-1);
         console.log(trs[i].id)
         console.log(sid)*/
        ids.push(trs[i].id)
    }
    return ids;
}

function getTypeGridDatas(typegrid) {
    var typeGridConfig = getGridPanelConfig(typegrid);
    var storeConfig = getStoreConfig(typegrid);
    var datas = typegrid.datas;
    typeGridConfig = Ext.decode(Ext.encode(typeGridConfig))
    storeConfig = Ext.decode(Ext.encode(storeConfig))
    datas = Ext.decode(Ext.encode(datas))
    if (typegrid.datas.type == 56) {
        var columns = Ext.getCmp("win" + typegrid.id).down("grid").getColumns();
        for (var j = 0; j < columns.length; j++) {
            if (columns[j].hidden) {
                datas.rows = j;
                break;
            }
            datas.rows = 10;
        }
    }
    return {typegrid: typeGridConfig, store: storeConfig, datas: datas};
}
function getGridPanelConfig(gridpanel) {
    var config = gridpanel.getConfig()
    //console.log(gridpanel)
    var ids = getGridPanelRowsIds(gridpanel)

    return {icon: config.icon, title: config.title, x: gridpanel.x, y: gridpanel.y, trsIds: Ext.encode(ids)};
}

function getStoreConfig(gridpanel) {
    var store = gridpanel.getStore();
    var datas = store.data.items;
    //console.info(gridpanel)
    store.commitChanges()
    var data = [];
    for (var i = 0; i < datas.length; i++) {
        var ojson;
        if (datas[i].data.select) {
            ojson = {"name": datas[i].data.name, "value": datas[i].data.value, select: datas[i].data.select}
        } else if (datas[i].data.time) {
            var dt = datas[i].data;
            ojson = {
                "name": dt.name,
                "value": dt.value,
                delay: dt.delay,
                time: dt.time,
                time1: dt.time1,
                time2: dt.time2,
                time3: dt.time3,
                time4: dt.time4,
                time5: dt.time5,
                time6: dt.time6,
                time7: dt.time7,
                time8: dt.time8,
                time9: dt.time9
            }
        } else {
            ojson = {"name": datas[i].data.name, "value": datas[i].data.value}
        }
        //console.info(ojson)

        data.push(ojson)
    }
    var fields = getStoreFields(store);
    return {data: data, fields: fields}
}
function getStoreDatas(store) {
    var items = store.data.items;
    var arr = [];
    var ojson = {};
    for (var i = 0; i < items.length; i++) {
        arr[i] = {name: items[i].data.name, value: items[i].data.value};
    }
    return arr;
}
function getStoreFields(store) {
    var fields = [];
    for (var i = 0; i < store.config.fields.length; i++) {
        fields.push(store.config.fields[i])
    }
    return fields;
}
/*var datasArray = drawpanel.datas.datasArray
 var datasArrayStr='"[';
 for(var i=0;i<datasArray.length;i++){
 for(var skey in datasArray[i]){
 var key = "t"+parseInt((skey).substr(1,skey.length)-1);
 var value="t"+parseInt((datasArray[i][skey]).substr(1,datasArray[i][skey].length)-1);
 console.log(datasArray[i])
 console.log(key+"  "+value)
 if(i!=datasArray.length-1){
 datasArrayStr+='{\"'+key+'\":\"'+value+'\"},';
 }else{
 datasArrayStr+='{\"'+key+'\":\"'+value+'\"}';
 }
 }
 }
 datasArrayStr+=']"';
 console.log(datasArrayStr)*/

