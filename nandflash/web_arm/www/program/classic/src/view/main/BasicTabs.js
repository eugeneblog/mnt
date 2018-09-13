/**
 * Created by Administrator on 2016/2/25.
 */


Ext.define('program.view.tab.BasicTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'basic-tabs',
    requires: [
        "program.view.tab.BasicController",
        "program.view.tree.DevTree"
    ],

    width: 400,
    height: 300,
    maxHeight: "100%",
    defaults: {
        //bodyPadding: 10,
        //autoScroll: true
    },
    style: "border-right:10px",
    controller: 'grid-panel-gridpanel',

    items: [{
        title: 'Active',
        layout: "border",
        defaults:{
            collapsible: true,
            split: true,
            bodyStyle: 'padding:15px'
        },
        items: [
            /*Ext.create("program.view.tree.DevTree", {
             region: "north",
             height: 300,
             minHeight: 200
             }),*/
            {
                xtype: "devtree",
                region: "north",
                height: 300,
                minHeight: 200
            },
            Ext.create("Ext.grid.Panel", {
                region: "center",
                manageHeight: true,
                title: "Icons",
                autoScroll: true,    //滚动
                collapsible: true,   //折叠
                // enableDragDrop: true,  
                closable: false,
                constrainHeader: true,
                resizable: true,
                // stateful: true, 
                store: Ext.create("program.store.SvgImgs", {}),
                id: "leftPanelIcons",
                columns: [
                    {
                        draggable: false,
                        menuDisabled: true,
                        sortable: false,
                        header: 'type', dataIndex: "src", flex: 1,
                        renderer: function (value) {
                            return Ext.String.format('<img src="{0}" width="67px" height="33px"/>', value);
                        }
                    },
                    {draggable: false, menuDisabled: true, sortable: false, header: 'name', dataIndex: 'name', width:1,resizeable:false},
                    {draggable: false, menuDisabled: true, sortable: false, header: 'name', dataIndex: 'title', flex: 1},

                ],
                autoShow: true,

                viewConfig: {
                    /*   plugins: {
                     ptype: 'gridviewdragdrop',
                     dragText: 'Drag and drop to reorganize',
                     ddGroup:    'DragDropGroup1',
                     enableDrop:true
                     }*/
                },
                listeners: {
                    expand: function () {
                        setTimeout(function () {
                            Ext.getCmp("leftDevTree").setHeight(250);
                            //console.log(Ext.getCmp("leftDevTree").getHeight());
                        }, 50)

                    },
                    collapse: function () {
                        setTimeout(function () {
                            Ext.getCmp("leftDevTree").setHeight("95%");
                            //console.log(Ext.getCmp("leftDevTree").getHeight());
                        }, 50)

                    },
                    resize:function(e){
                        // var icon = Ext.getCmp('leftPanelIcons');
                    },
                    render: "basicRender",
                    viewready: "basicViewready",
                    itemclick: "basicItemclick",
                    afterDragDrop: "basicAfterDragDrop"
                }

            })
        ]
    },
        {
            title: 'Inactive',
            items: {
                rootVisible: true,
                xtype: "treepanel",

                listeners: {
                    boxready: function (treePanel) {
                        treePanel.store.root.set("text", location.host)
                    },
                    itemcontextmenu: function (treePanel, record, item, index, e, eOpts) {
                        e.stopEvent()
                        e.stopPropagation()
                        if (record.data.depth == 1) {
                            Ext.createWidget("showdevices", {
                                device: record.data.text
                            })
                        }
                    },
                    itemclick: function (treePanel, record, item, index, e, eOpts) {
                        console.log(arguments)
                        if (record.data.depth == 1) {
                            Ext.createWidget("showdevices", {
                                device: record.data.text
                            })
                        }

                    }
                },
                tbar: [
                    {
                        text: 'Expand All',
                        xtype: "button",
                        handler: function (th) {
                            var me = this.up("treepanel");
                            me.expandAll();
                        }
                    }, {
                        text: 'Collapse All',
                        xtype: "button",
                        handler: function (th) {
                            var me = this.up("treepanel");
                            me.collapseAll();
                        }
                    }
                ],
                width: "100%",
                height: "100%",
                scrollable: "y",
                modal: true,
                store: Ext.create("Ext.data.TreeStore", {
                    autoLoad: true,
                    url: "resources/test1.php?par=nodestree",
                    proxy: {
                        type: "ajax",
                        url: "resources/test1.php?par=nodestree&ip=" + location.host + "&port=6379",
                        reader: {
                            type: "json"
                        }
                    }
                })
            }
        },

        {text:""}
    ]
});

