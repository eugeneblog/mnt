Ext.define('program.view.window.Backup', {
    extend: 'Ext.window.Window',
    autoShow: true,
    frame: true,
    width: 1200,
    height: 600,
    title: "Backup •••",
    layout: "hbox",
    requires: [
        'program.view.window.BackupController',
        'program.view.window.BackupModel',
        'program.view.grid.BackupGrid'
    ],
    controller: 'window-backup',
    viewModel: {
        type: 'window-backup'
    },
    defaults: {
        flex: 1,
        border: true
    },
    items: [
        {
            xtype: "backupgrid",
            folder:"devsinfo",
            margin:"0 5 0 0",
            title: 'Program Backup'
        }, {
            xtype: "backupgrid",
            folder:"ddc",
            margin:"0 0 0 5",
            title: 'Config File'
        }, {
            xtype: "backupgrid",
            folder:"lgc",
            margin:"0 0 0 5",
            title: 'Program File'
        }
    ]
});


