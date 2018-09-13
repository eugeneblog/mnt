Ext.define('program.view.main.toolbar.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-toolbar-toptoolbar',
    newClick: function () {
        var tabpanel = Ext.getCmp("frametab_drawpanel");
        var drawpanels = Ext.ComponentQuery.query("drawpanel");
        for (var i = 0; i < drawpanels.length; i++) {
            if (drawpanels[i].title == "1000") {
                drawpanels[i].close();
            }
            drawpanels[i].close()
        }
        removeFile("../1000");
        removeFile("../1000.json");
        tabpanel.add(Ext.create("program.view.tab.DrawPanel", {
            title: "1000"
        }));
        delayToast("Status", 'New file successfully..', 1000);
    },

    openXmlClick1: function () {

        var aDevNames = getDevInfoFileNames();
        var win = Ext.create('Ext.window.Window', {
            title: 'Open •••',
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
                    store: aDevNames,
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
                    win.close();
                    Ext.Ajax.request({
                        url: "resources/xmlRW.php",
                        async: false,
                        params: {
                            fileName: "devsinfo/" + text,
                            rw: "r"
                        },
                        success: function (response) {
                            //var ojsonstr = response.responseText

                            var tabpanel = Ext.getCmp("frametab_drawpanel");
                            tabpanel.addDrawPanel(text)

                            /*var drawpanels = Ext.ComponentQuery.query("drawpanel");
                             for (var i = 0; i < drawpanels.length; i++) {
                             if (drawpanels[i].title == text) {
                             tabpanel.setActiveTab(drawpanels[i].id);
                             return;
                             }
                             drawpanels[i].close()
                             }

                             var drawpanel = Ext.create("program.view.tab.DrawPanel", {
                             title: text
                             })
                             //console.log(tabpanel.items)
                             tabpanel.add(drawpanel)
                             tabpanel.setActiveTab(drawpanel.id);*/

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
            ]
        })
    },

    saveAsClick: function () {
        saveXml()
        var states = getDevNamesAllDataStore(true)
        console.log(states);
// Create the combo box, attached to the states data store
        var win = Ext.create('Ext.window.Window', {
            title: 'Save as•••',
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
                    fieldLabel: 'devic Instance',
                    store: states,           
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

                    saveXml(text);
                    //saveGridpanelsConfigs(text);
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
    },
    replaceClick: function () {

        Ext.create("program.view.window.ReplaceDevInfo")
        /*
         var win = Ext.create("program.view.window.EditFile", {
         showCombo: true,
         showFileButton: false,
         typeCombo: Ext.create("Ext.form.field.ComboBox", {
         fieldLabel: "Fields",
         store: Ext.create("Ext.data.Store", {
         field: ["name", "value"],
         data: [{name: "key", value: "value"},
         {name: "title", value: "title"}
         ]
         }),
         displayField: 'name',
         valueField: 'value',
         listeners: {
         beforedestroy: function () {
         return false;
         }
         }
         }),
         replaceOkHandler: function (oldValue, newValue) {
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
         });

         /!*} catch (e) {
         throw new Error(e)
         Ext.Msg.alert("Massage", "Data Error"+e)
         }*!/

         },
         okHandler: function () {

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
         console.log(arguments)
         }
         })
         },
         listeners: {
         boxready: function () {
         console.log(this)


         }
         },
         combo: Ext.create("Ext.form.field.ComboBox", {
         fieldLabel: "Select File",
         store: getDevInfoFileNames(),
         editable: false,

         listeners: {
         change: function (combo, newValue) {
         console.log(arguments)

         myAjax('resources/devsinfo/' + newValue, function (response) {
         win.textArea.setValue(response.responseText);

         console.log(arguments)
         })
         }
         }
         })
         })*/
    },
    downloadClick: function () {

        var data;
        Ext.Ajax.request({
            url: "resources/test1.php?par=getDevFileNames",
            async: false,
            params: {},
            success: function (response) {
                var text = response.responseText;
                data = Ext.decode(text)
            }
        })
        var win = Ext.create('Ext.window.Window', {
            title: 'Download •••',
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
                    fieldLabel: 'devic name',
                    store: data,
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
                    win.close();
                    filePublish("9999.8.*", "9999998\r\nSend_File\r\n" + text);
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })

    },
    uploadClick: function () {

        var store = getDevNamesAllDataStore();
        var win = Ext.create('Ext.window.Window', {
            title: 'Upload •••',
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
                    store: store,
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
                    win.close();
                    filePublish("9999.8.*", "9999998\r\nRead_File\r\n" + text);
                }
                },
                {
                    text: 'Cancel', handler: function () {
                    win.close();
                }
                }
            ]
        })
    },
    backupClick: function () {


        Ext.create("program.view.window.Backup")

        /*   var win = Ext.create("Ext.window.Window", {
         title: "Backup •••",
         frame: true,
         width: 800,
         height: 600,

         //bodyPadding: 10,

         autoShow: true,
         layout: "border",
         items: {
         xtype: "grid",
         width: "100%",
         region: 'center',
         selModel: {
         mode: "SIMPLE",
         selType: 'checkboxmodel'
         },
         store: Ext.create("Ext.data.Store", {
         fields: ["name", "lasttime", "size", "filetype"],
         proxy: {
         type: "ajax",
         url: "resources/test1.php?par=getbackupfiles"
         },
         autoLoad: true
         }),
         columns: [
         {
         text: "File Name", dataIndex: "name", flex: 4,
         renderer: function (val) {

         return "<a class='adownload' download=" + val + " target='_black' href=resources/devsinfo/" + val + ">" + val + "<span class='x-col-move-top'></span></a>";
         }
         },
         {text: "Last Post", dataIndex: "lasttime", flex: 2},
         {text: "File Type", dataIndex: "filetype", flex: 1},
         {
         text: "File Size", dataIndex: "size", flex: 1, renderer: function (val) {
         console.log(arguments)
         return Ext.util.Format.fileSize(val)
         }
         }
         ],
         listeners: {
         boxready: function () {
         setTimeout(function () {
         var aTag = document.createElement("a");
         if (aTag.download == undefined) {
         $(".adownload").mousedown(function (e) {
         Ext.Msg.alert('Message', "If you can't download properly , Please right click on the save .<br>如果不能正常下载请点击鼠标右键，选择目标另存为。");
         //e.preventDefault();
         //return false;
         })
         }
         }, 1000)
         },

         select: function () {
         console.log(arguments)
         },
         selectionchange: function () {
         console.log(arguments)
         }
         }
         }
         ,
         buttons: [{
         text: 'Select Path',
         handler: function () {

         var grid = this.up("window").down("grid")
         var records = grid.getSelection();
         console.log(records);
         var fileNames = "";
         if (records.length == 0) {
         Ext.Msg.alert('Status', 'Select a file please.');
         return;
         }
         Ext.MessageBox.progress('please wait', {msg: 'Server Ready ...'});
         for (var i = 0; i < records.length; i++) {
         Ext.MessageBox.updateProgress(i + 1 / records.length + 1, 'The server is preparing for the ' + (i + 1));
         fileNames += "devsinfo/" + records[i].data.name + " ";
         }

         console.log(fileNames)

         setTimeout(function () {

         Ext.MessageBox.updateProgress(1 / 1, 'The server is preparing for the ' + (records.length ));
         setTimeout(function () {
         myAjax("resources/test1.php", function () {
         location.href = "resources/pragramBackup.tar.gz";
         //myAjax("resources/pragramBackup.tar.gz")
         }, {
         par: "system",
         command: "tar czvf pragramBackup.tar.gz " + fileNames
         })
         //location.href = "resources/devsinfo/" + records[0].data.name
         //location.href = "resources/FileUD.php?par=downfile&filenames=" + fileNames.substr(0, fileNames.length - 1);
         Ext.MessageBox.close();
         win.close();
         }, 500)
         }, 1000)

         }
         }]
         })*/
    },
    RestorClick: function () {
        //uploadwindow
        Ext.create("Ext.window.Window", {
            autoShow: true,
            liveDrag: true,
            layout: "hbox",
            title: "Restor",
            width: 800,
            height: 600,
            defaults: {
                width: 390,
                height: 560,
                flex: 1,
                constrain: true,
                closable: false,
                draggable: false,
                resizable: false
            },
            items: [
                {
                    xtype: "uploadwindow",
                    x: 0,
                    y: 0,
                    title: "Dev Info",
                    folder: "devsinfo",
                    FilesAdded: function (upload, files) {

                    }
                },
                {
                    xtype: "uploadwindow",
                    x: 400,
                    title: "Dev Instance",
                    folder: "devxml",
                    callbackEvent: function (eventName, upload, files) {
                        if (eventName == "FilesAdded") {
                            var files = upload.files;
                            var fr = new FileReader()
                            console.log(files)

                            for (var i = 0; i < files.length; i++) {
                                //console.log(files[i].getSource())
                                //console.log(fr.readAsText(files[i].getSource()))

                            }

                        }

                    }
                }
            ],
            listeners: {
                move: function () {
                    console.log(arguments)
                }
            }
        })

    }
});

function filePublish(key, value) {
    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "GET",
        async: false,
        params: {
            par: "filePublish",
            key: key,
            value: value
        },
        success: function (response) {
            var text = response.responseText;
            if (text == 1) {
                delayToast('Success', 'Publish Ok.', 0)
            } else if (text == 3) {
                Ext.Msg.alert('Info', 'The user is reading the other files, please download later');
            }
            else if (text == 2 || text == 3) {
                Ext.Msg.alert('Info', 'Users are downloading other files, please download later。');
            }

        }
    })
}
function devPublish(key, value, success) {

    Ext.Ajax.request({
        url: "resources/test1.php",
        method: "POST",
        async: false,
        params: {
            par: "devPublish",
            key: key,
            value: value
        },
        success: success || function (response) {
            var text = response.responseText;
            if (text == 1) {
                delayToast('Success', 'Publish Ok.', 0)
            } else {
                //  Ext.Msg.alert('Info', 'Please download later.');
            }
        }
    })
}

function saveXml(text) {
    var fileName = text;

    panelAddCurPlantIndex()
    text = text || "1000";  //文件名等于当前文件名或者模板1000
    var fName = text;
    if (text == "local") {
        text = "local.xml"
    }
    if (text != "1000") {
        text = "../../../" + text;
    }
    if (text.trim() == "") {
        Ext.Msg.alert('Exception', 'File name cannot null.');
        return;
    }
    console.log(text);       //text是要保存的文件路径
    // process text value and close...
    var sXmlNameSpace = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
    var root = $("<root></root>");
    xmlAppendPlant(root)
    var datas = {};
    datas['fileName'] = "../" + text;
    console.log(datas['fileName']);
    var lineSize = getCurrentDrawPanel().datas.datasArray.length;
    console.log(lineSize)
    if (lineSize == lineCount) {

        saveGridpanelsConfigs(fileName)

        delayToast("Save Massage", "All line size is " + lineSize + ",save " + lineCount + " line ");
    } else {
        Ext.Msg.alert("Save Exception ", "All line size is " + lineSize + ",save " + lineCount + " line ,The server will reload。");
        getCurrentDrawPanel().close()
        var tabpanel = Ext.getCmp("frametab_drawpanel").addDrawPanel(fileName)
    }
    lineCount = 0;

    changeKey(root, text);
    if (isDebug) {
        console.log(root)
        console.log(root[0].outerHTML)
    }

    datas['content'] = formatXml(replacePID(sXmlNameSpace + root[0].outerHTML));
    //console.log($.parseXML(formatXml(sXmlNameSpace + root[0].outerHTML)).toXMLString())
    function replacePID(text) {
        text = text.replaceAll("<p>", "<P>");
        text = text.replaceAll("</p>", "</P>");
        text = text.replaceAll("<i>", "<I>");
        text = text.replaceAll("</i>", "</I>");
        text = text.replaceAll("<d>", "<D>");
        text = text.replaceAll("</d>", "</D>");
        return text;
    }

    datas['rw'] = "w";
    $.ajax({
        type: "POST",
        url: "resources/xmlRW.php",
        data: datas,
        success: function () {
            delayToast("Status", "Saved file " + fName + " successfully.", 0);

        }
    });

    function changeKey(root, text) {
        if (text == "1000") {
            return;
        }
        if (text == "../../../local.xml") {
            return;
        }
        text = text.substr(text.length - 4, text.length);
        var keys = root.find('key');
        for (var i = 0; i < keys.length; i++) {
            var keyValue = $(keys[i]).html();
            if (keyValue.substr(0, 4) != text) {
                $(keys[i]).html(text + keyValue.substr(4, text.length))
            }
        }
        return root;
    }

    function sortNodeNumber(root) {
        var plants = root.find('plant');
        var nodes = root.find('node')

        console.log(nodes.length)
        console.log(nodes)

        var count = 1;
        for (var i = 0; i < plants.length; i++) {
            var masterNodes = $(plants[i]).find('master_node');

            for (var j = 0; j < masterNodes.length; j++) {
                var number = $(masterNodes[j]).attr('number')

                //console.info(masterNodes[j])

                /* try {
                 gridpanelChangeButtonText(number, count)
                 } catch (e) {
                 throw e;
                 }*/
                //console.info(number)
                //var nodes = masterNodes[j].querySelectorAll('node');
                //var nodes = $(plants[i]).find('node')

                for (var k = 0; k < nodes.length; k++) {

                    var nodeHTML = $(nodes[k]).html()
                    console.log(number)
                    if (nodeHTML == number + "") {
                        console.log($(nodes[k]).html() + "       " + number)
                        console.log('number=' + number)
                        console.log('count=' + count)
                        console.log(nodes[k])
                        $(nodes[k]).html(count);
                        break;

                    }
                }
                $(masterNodes[j]).attr('number', count)
                console.info(count)

                count++;
            }
        }

//        console.log(root)
        return root;
    }

    function gridpanelChangeButtonText(number, count) {
        var panels = getCurrentDrawPanelGirdPanels();
        for (var i = 0; i < panels.length; i++) {
            if (!panels[i].button) {
                break;
                return;
            }
            if (number == panels[i].button.text) {
                if (panels[i].button1) {
                    panels[i].removeDocked(panels[i].button1);
                }
                var button1 = Ext.create("Ext.button.Button", {
                    text: count
                })
                panels[i].index1 = count;
                panels[i].button1 = button1;
                panels[i].addDocked(button1);
            }
        }
    }
}
//var panelCount = 1;

function xmlAppendPlant(root) {

    var plants = getCurrentDrawPanelPlants();

    //console.info(plants)

    for (var i = 0; i < plants.length; i++) {
        var plant = $("<plant name='" + plants[i].name + "'></plant>");

        root.append(plant);

        plantAppendMasterNode(plant, plants[i].id);

    }

}

function plantAppendMasterNode(plant, plantId) {
    var aGridpanels = getCurrentDrawPanelGirdPanels();
    //var panels = getCurrentDrawPanelPlants();
    for (var i = 0; i < aGridpanels.length; i++) {
        //if (aGridpanels[i].datas.plantId == panels[index].id) {
        if (aGridpanels[i].datas.plantId == plantId) {
            plant.append(get_A_Master_node(aGridpanels[i]));

            //aGridpanels[i].curPlantIndex = panelCount;
            //console.info(aGridpanels[i]);
            //console.info(panelCount);
            //panelCount++;

        }
    }
}


function panelAddCurPlantIndex() {
    var count = 1;
    var plants = getCurrentDrawPanelPlants();
    var aGridpanels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < plants.length; i++) {
        for (var j = 0; j < aGridpanels.length; j++) {
            if (aGridpanels[j].datas.plantId == plants[i].id) {
                aGridpanels[j].curPlantIndex = count;
                count++;

                //console.log(aGridpanels[j])
            }
        }
    }

}

var lineCount = 0;

function get_A_Master_node(gridpanel) {
    var masterNode = $(document.createElement("master_node"));
    var iType = gridpanel.datas.type;
    masterNode.attr("number", gridpanel.curPlantIndex);
    masterNode.append("<type>" + iType + "</type>");
    isPidSave(gridpanel, masterNode);
    isSCFMSave(gridpanel, masterNode);
    var gridPanelItems = gridpanel.store.data.items;
    gridPanelItems = isModelFilter(gridPanelItems, masterNode, gridpanel);
    gridPanelItems = isKeyFilter(gridPanelItems, masterNode, gridpanel);

    var startIndex = 0;

    for (var i = 0; i < gridPanelItems.length; i++) {
        //  console.log(gridPanelItems[i]);

        if (gridPanelItems[i].data["name"] == "Out") {
            continue;
        }
        if (gridPanelItems[i].data["name"] == "Instance") {
            continue;
        }
        if (gridPanelItems[i].data["name"] == "mode") {
            continue;
        }

        //console.log(gridPanelItems[i])
        startIndex++;
        var name = gridPanelItems[i].data["name"];
        var value = gridPanelItems[i].data["value"];
        //console.log(gridPanelItems[i].data.select)
        if (gridPanelItems[i].data['select']) {
            var select = gridPanelItems[i].data.select;
            for (var j = 0; j < select.length; j++) {
                if (select[j].name == value) {
                    value = select[j].value;
                }
            }
        }

        var slots = $("<slots number='" + startIndex + "'></slots>");
        var aGirdPanelIII = getStartGridPanelIndexAndItemIndex(gridpanel, i);//判断当前tr上的id是否有相应的线，有的话返回起点的坐标
        if (!aGirdPanelIII[0] && !aGirdPanelIII[1]) {

            slots.append("<default>" + value + "</default>")

        } else {

            slots.append($("<node>" + aGirdPanelIII[0] + "</node>"));
            slots.append($("<slot_number>" + aGirdPanelIII[1] + "</slot_number>"));

            lineCount++;

        }


        if (gridpanel.datas.type == "79" & i > 2) {
            slots = $("<slots number=" + i + "></slots>");
            slots.append($("<node>0</node>"));
            slots.append($("<slot_number>0</slot_number>"));
        }

        masterNode.append(slots);

        //数据校验 图片缓存 优化性能

        /*if (iType == 1 || iType == 2 || iType == 4 || iType == 5) {
         console.log(slots.find("default"))
         if (slots.find("default").length != 0) {

         } else {
         masterNode.append(slots);
         }
         } else {
         masterNode.append(slots);
         }*/

        aGirdPanelIII = null;
    }
    isLogic(gridpanel, masterNode)
    isscaleSave(gridpanel, masterNode);
    isDoubleBOSave(gridpanel, masterNode);

    return masterNode;
}
function isLogic(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "56") {
//        console.log(gridpanel)
        items = gridpanel.store.data.items;
    } else {
        return;
    }
    var times = ["delay", "time", "time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9"];
    var columns = Ext.getCmp("win" + gridpanel.id).down("grid").getColumns()
    var index;
    for (var i = 0; i < columns.length; i++) {
        //console.log(columns[i])
    }
    for (var i = 3; i < columns.length; i++) {
        if (columns[i].hidden) {
            index = i - 2;
            break;
        }
        index = 10;
    }

    for (var i = 0; i < index; i++) {
        var list = $("<list number=" + i + "></list>")
        masterNode.append(list)
        for (var j = 1; j < items.length; j++) {
            var data = items[j].data;
            var ivalue = data[times[i]];
            if (ivalue == "-") {
                ivalue = 2;
            }
            list.append("<default number=" + (j - 1) + ">" + ivalue + "</default>")
        }
    }
}

function isPidSave(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "67") {
        items = Ext.data.StoreManager.lookup("store" + gridpanel.id).data.items;
    } else {
        return;
    }
    //console.log(items)
    masterNode.append("<P>" + items[0].data.value + "</P>")
    masterNode.append("<I>" + items[1].data.value + "</I>")
    masterNode.append("<D>" + items[2].data.value + "</D>")
    masterNode.append("<extime>" + items[3].data.value + "</extime>")
    masterNode.append("<max_value>" + items[4].data.value + "</max_value>")
    masterNode.append("<min_value>" + items[5].data.value + "</min_value>")
}
function isscaleSave(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "75") {
        items = Ext.data.StoreManager.lookup("store" + gridpanel.id).data.items;
    } else {
        return;
    }
    console.log(items)
    masterNode.append("<slots number='2'><default>" + items[0].data.value + "</default></slots>")
    masterNode.append("<slots number='3'><default>" + items[1].data.value + "</default></slots>")
    masterNode.append("<slots number='4'><default>" + items[2].data.value + "</default></slots>")
    masterNode.append("<slots number='5'><default>" + items[3].data.value + "</default></slots>")
}
function isDoubleBOSave(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "80") {
        items = Ext.data.StoreManager.lookup("store" + gridpanel.id).data.items;
    } else {
        return;
    }
    console.log(items)
    masterNode.append("<slots number='4'><default>" + items[0].data.value + "</default></slots>")
}


function isSCFMSave(gridpanel, masterNode) {
    var items;
    if (gridpanel.datas.type == "74") {
        items = Ext.data.StoreManager.lookup("store" + gridpanel.id).data.items;
    } else {
        return;
    }
    console.log(items)
    masterNode.append("<P>" + items[0].data.value + "</P>")
    masterNode.append("<D>" + items[1].data.value + "</D>")
}

function isKeyFilter(gridPanelItems, masterNode, gridpanel) {
    var name = gridPanelItems[1].data["name"];
    var value = gridPanelItems[1].data["value"];
    if (name == "Instance") {
        masterNode.append("<key>" + gridpanel.datas.value + "</key>")
        //gridPanelItems.shift();
        return gridPanelItems;
    }
    return gridPanelItems;
}
function isModelFilter(gridPanelItems, masterNode, gridpanel) {
    var name = gridPanelItems[0].data["name"];
    var value = gridPanelItems[0].data["value"];
    if (name == 'mode') {// if (name != "Out" && name != "In") {
//        console.log(gridPanelItems[0])

        var select = gridPanelItems[0].data.select;
        if (!select) {
            var title = gridpanel.datas.title;
            select = slotsJson[title].initData()[0].select;
        }
        for (var i = 0; i < select.length; i++) {
            if (select[i].name == value) {
                value = select[i].value;
            }
        }
        masterNode.append("<mode>" + value + "</mode>")
        //gridPanelItems.shift()
        return gridPanelItems;
    }
    /*console.log(gridPanelItems[i].data["select"])

     if(gridPanelItems[i].data['select']){
     console.log(gridPanelItems[i])
     var select = gridPanelItems[i].data['select'];
     for(var i= 0 ;i<select.length;i++){
     console.log(select[i])
     if(select[i].name==name){
     value=select[i].value;
     }
     }
     }*/

    return gridPanelItems;
}
function getStartGridPanelIndexAndItemIndex(gridpanel, index) {
    /**
     * 一次只判断一个tr
     */
    /*console.log(gridpanel.el.dom.querySelectorAll(".x-grid-row")[index])
     //alert(index)
     console.log(gridpanel.el.dom.querySelectorAll(".x-grid-row"))*/
    var endTrId = gridpanel.el.dom.querySelectorAll(".x-grid-row")[index].id;
    var startTrId = getStartTrIdByEndTrId(endTrId);//通过结束id从所有连线信息中得到开始id
    var gridpanels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < gridpanels.length; i++) {
        var trs = gridpanels[i].el.dom.querySelectorAll(".x-grid-row");
        var items = gridpanels[i].store.data.items;
        for (var j = 0; j < trs.length; j++) {
            //alert(trs[j].id+"  "+startTrId)
            if (trs[j].id == startTrId) {
                //              console.log(trs[j])
                var sn = j;
//                console.log(items)
                if (items[0].data['name'] == "mode") {
                    sn = j - 1
                }
                if (items[1].data['name'] == "Instance" & j > 0) {
                    sn = j - 1
                }
                //return [i + 1, sn]

                return [gridpanels[i].curPlantIndex, sn]
            }
        }

    }
    return [null, null]
}
function getStartTrIdByEndTrId(endTrId) {
    var datasArray = getCurrentDrawPanel().datas.datasArray;
    for (var i = 0; i < datasArray.length; i++) {
        for (o in datasArray[i]) {
            //lert(datasArray[i][o]+" "+o)
//            console.log(datasArray)
//            console.log(endTrId)
            if (o == endTrId) {
                return datasArray[i][o];
            }
        }
    }
}


function getCurrentDrawPanel() {

    var drawpanels = Ext.ComponentQuery.query("drawpanel");
    var drawpanel;
    for (var i = 0; i < drawpanels.length; i++) {
        if (!drawpanels[i].hidden && drawpanels[i].el) {
            //console.log(drawpanels[i])
            drawpanel = drawpanels[i];
        }
    }
    return drawpanel;
    //return Ext.getCmp("frametab_drawpanel").getActiveTab();
}
function getCurrentDrawPanelDatasArray(drawpanel) {
    var cdrawpanel = drawpanel || getCurrentDrawPanel()
    return cdrawpanel.datas.datasArray;
}
function currentDrawPanelGirdPanelsAddTitle() {
    var ps = getCurrentDrawPanelGirdPanels()
}
function getCurrentDrawPanelGirdPanels(drawpanel) {
    var drawpanel = drawpanel || getCurrentDrawPanel();
    var aGridpanels = [];

    var girdpanels = Ext.ComponentQuery.query("gridpanel", drawpanel);
    for (var i = 0; i < girdpanels.length; i++) {
        girdpanels[i].index = i + 1
        aGridpanels.push(girdpanels[i])
    }

    return aGridpanels;
}


function addCurrentDrawPanelPlant(plant) {
    console.log(plant)
    var currentDrawPanel = getCurrentDrawPanel()
    var data = currentDrawPanel.datas.data;
    currentDrawPanel.datas.plants.push(plant);
    data.push({selected: plant.selected, name: plant.name});
    var store = Ext.data.StoreManager.lookup('store' + currentDrawPanel.getTitle());
    store.setData(data);
}

function delCurrentDrawPanelPlant(index, grid) {
    getCurrentDrawPanel().datas.plants.splice(index, 1);
    var data = getCurrentDrawPanel().datas.data;
    data.splice(index, 1);
    grid.store.setData(data);

    setTimeout(function () {
        setCurrentPlant(0, grid)
    }, 100)
    //setTimeout(function () {
    //    var model = grid.store.getAt(0);
    //    if (model) {
    //        model.set("selected", true)
    //        setCurrentPlant(index)
    //    }
//
    //    for (var i = 1; i < grid.store.data.length; i++) {
    //        var model = grid.store.getAt(i);
    //        if (model) {
    //            model.set("selected", false)
    //        }
    //    }
    //}, 1000)

}


function setCurrentPlant(index, grid) {
    //var plant = getCurrentDrawPanelPlantByIndex(index);
    //plant.selected = true;
    var plants = getCurrentDrawPanelPlants();
    for (var i = 0; i < plants.length; i++) {
        if (i == index) {
            plants[i].selected = true;
        } else {
            plants[i].selected = false;
        }
        updateCurrentDrawPanelPlant(plants[i], i)
    }
    selectPlant(getCurrentPlant())
    var ostore = grid.getStore();

    for (var i = 0; i < ostore.data.length; i++) {
        var model = ostore.getAt(i);
        if (i == index) {
            model.set("selected", true)
        } else {
            model.set("selected", false)
        }
    }
    drawlines()

}

function getCurrentDrawPanelPlantByIndex(index) {
    return getCurrentDrawPanel().datas.plants[index]
}

function getCurrentDrawPanelPlants() {
    return getCurrentDrawPanel().datas.plants;
}

function selectPlant(plant) {
    var aTypeGrids = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < aTypeGrids.length; i++) {
        if (aTypeGrids[i].datas.plantId == plant.id) {
            //console.log(aTypeGrids[i])
            aTypeGrids[i].show();
        } else {
            //console.log(aTypeGrids[i])
            aTypeGrids[i].hide();
        }
    }

}
function getCurrentPlant() {
    var plants = getCurrentDrawPanelPlants();
    //console.log(plants)
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].selected) {
            //      console.log(plants[i])
            return plants[i];
        }
    }
    return false;
}

function getCurrentPlantGridPanles(plant) {

    var curPlantGridPanelArr = [];
    var gridPanels = getCurrentDrawPanelGirdPanels();


    for (var i = 0; i < gridPanels.length; i++) {
        if (plant.id == gridPanels[i].datas.plantId) {
            curPlantGridPanelArr.push(gridPanels[i])
        }
    }
    return curPlantGridPanelArr;
}

function updateCurrentDrawPanelPlant(plant, index) {
    getCurrentDrawPanel().datas.plants.splice(index, 1, plant);
}
/* var myMsg = Ext.create('Ext.window.MessageBox', {
 // set closeAction to 'destroy' if this instance is not
 // intended to be reused by the application
 closeAction: 'destroy'
 }).show({
 title: 'Custom MessageBox Instance',
 message: 'I can exist along with Ext.Msg'
 });
 */
function removeFile(fileName) {
    Ext.Ajax.request({
        url: "resources/test1.php?par=delFile&fileName=" + fileName,
        async: false,
        /*params: {
         fileName:fileName
         },*/
        success: function (response) {
            var text = response.responseText;
            if (text) {
                delayToast("Status", 'Server delete file successfully..', 0)
            }
        }
    });
}
