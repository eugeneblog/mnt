Ext.define('program.view.grid.BackupGrid', {
    extend: 'Ext.grid.Panel',
    xtype: "backupgrid",

    requires: [
        'program.view.grid.BackupGridController',
        'program.view.grid.BackupGridModel'
    ],

    controller: 'grid-backupgrid',
    viewModel: {
        type: 'grid-backupgrid'
    },
    title: '',
    width: "100%",
    height: "100%",
    region: 'center',
    selModel: {
        mode: "SIMPLE",
        selType: 'checkboxmodel'
    },

    initComponent: function () {
        var me = this;

        me.store = Ext.create("Ext.data.Store", {
            fields: ["name", "lasttime", "size", "filetype"],
            proxy: {
                type: "ajax",
                url: "resources/test1.php?par=getbackupfiles&folder=" + me.folder +"&newfolder=/Applications/XAMPP/xamppfiles/htdocs/mnt/nandflash"
            },
            autoLoad: true
        }),

            me.callParent();
    },
    columns: [
        {
            text: "File Name", dataIndex: "src", flex: 1,
            renderer: function (val, b, record) {

                console.log(val)
                return "<a class='adownload' download=" + val + " target='_black' href=" + val + ">" + record.data.name + "<span class='x-col-move-top'></span></a>";
            }
        },
        {text: "Last Post", dataIndex: "lasttime", flex: 2},
        {text: "File Type", dataIndex: "filetype", flex: 1},
        {
            text: "File Size", dataIndex: "size", flex: 1, renderer: function (val) {
            //console.log(arguments)
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
    },
    getSelectFileNames: function () {
        var grid = this;
        var records = grid.getSelection();
        console.log(records);
        if (records.length == 0) {
            Ext.Msg.alert('Status', 'Select a file please.');
            return null;
        }
        Ext.MessageBox.progress('please wait', {msg: 'Server Ready ...'});

        var fileNames = "";
        var files = []
        for (var i = 0; i < records.length; i++) {
            Ext.MessageBox.updateProgress(i + 1 / records.length + 1, 'The server is preparing for the ' + (i + 1));
            fileNames += grid.folder + "/" + records[i].data.name + " ";
            files.push(grid.folder + "/" + records[i].data.name + " ")
        }
        return {filesArr: files, filesStr: fileNames};
    },
    buttons: [
        {
            text: "delete",
            handler: function (button) {
                var grid = this.up("grid");
                var fileJson = grid.getSelectFileNames();
                if (fileJson) {
                    Ext.Msg.show({
                        title: 'Delete?',
                        message: "Do you want to delete these " + fileJson.filesArr.length + "  files? ",
                        buttons: Ext.Msg.YESNOCANCEL,
                        icon: Ext.Msg.QUESTION,
                        animateTarget: button,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                myAjax("resources/test1.php", function () {
                                    Ext.MessageBox.close();
                                    grid.store.load();
                                    console.log(arguments)
                                }, {
                                    par: "system",
                                    command: "rm " + fileJson.filesStr
                                })
                                console.log('Yes pressed');
                            }
                        }
                    });



                }


            }
        },
        {
            text: 'Select Path',
            handler: function () {
                var grid = this.up("grid");
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
                    fileNames += grid.folder + "/" + records[i].data.name + " ";
                }


                console.log(fileNames)

                setTimeout(function () {


                    Ext.MessageBox.updateProgress(1 / 1, 'The server is preparing for the ' + (records.length ));
                    setTimeout(function () {


                        myAjax("resources/test1.php", function () {
                            location.href = "resources/pragramBackup.tar.gz";
                        }, {
                            par: "system",
                            command: "tar czvf pragramBackup.tar.gz " + fileNames
                        })

                        Ext.MessageBox.close();
                        // win.close();
                    }, 500)
                }, 1000)

            }
        }]
});
