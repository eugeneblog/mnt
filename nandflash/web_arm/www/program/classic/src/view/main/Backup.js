Ext.define('program.view.window.Backup', {
    extend: 'Ext.window.Window',
    autoShow: true,
    frame: true,
    width: 1000,
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
            margin:"0 5 0 0"

        }, {
            xtype: "backupgrid",
            folder:"devxml",
            margin:"0 0 0 5"
        }, {
            xtype: "backupgrid",
            folder:"../../../../",
            margin:"0 0 0 5"
        }
    ]
});


