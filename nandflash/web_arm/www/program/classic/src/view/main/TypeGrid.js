Ext.define("program.view.grid.TypeGrid", {
    extend: "Ext.grid.Panel",
    xtype: "typegrid",
    requires: [
        "program.view.grid.TypeGridController",
        "program.view.grid.TypeGridModel",
        "program.view.grid.LogicGridPanel"
    ],

    //hideMode:"offsets",
    controller: "grid-typegrid",
    viewModel: {
        type: "grid-typegrid"
    },
    resizable: false,
    collapsible: true,//收起
    scrollable:false,
    draggable: {
        autoStart:true,
        tolerance:1000
    },
    //closable: true,
    // title: 'null',

    sortable: false,//禁用标题排序
    enableColumnMove: false,//禁止移动列
    enableColumnHide: false,
    constrainHeader: false,
    hideable:false,
    //plain: true,
    //icon:"img/PNG/add.png",
    iconCls: "titleIcon",
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    listeners: {
        render:"render1",
        viewready:"girdviewready",
        itemdblclick: "girditemdblclick",
        boxready:"boxready",
        move: "girdmove",
        itemclick:"griditemclick",
        itemmousedown:"griditemmousedown",
        //itemmouseleave:"griditemmouseleave",
        itemmouseenter:"griditemmouseenter",
        itemmouseup:"griditemmouseup"
    },
    hideHeaders :true,
    columnLines : true,
    initComponent: function () {
        var me =this;

        this.width = 90;
        this.columns = [
            {
                multiColumnSort: false,
                //text     :"<img height='20px' src='img/PNG/add.png'>",
                text: "type",
                flex: 1,
                sortable: false,
                dataIndex: 'name',
                detachOnRemove: true,
                collapsible: false,
                editor: {
                    allowBlank: false
                }
            },
            {
                text: 'value',
                flex: 1,
                sortable: false,
                align: "right",
                //renderer : 'usMoney',
                dataIndex: 'value',
                editor:"textfield"
                //editor: 'textfield'
                /*,
             editor: {
             allowBlank: true
            }*/
            }
        ];
        this.callParent();
    }
});
