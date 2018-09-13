Ext.define("program.view.tree.DevTree", {
    extend: "Ext.tree.Panel",
    xtype: 'devtree',
    requires: [
        "program.view.tree.DevTreeController",
        "program.view.tree.DevTreeModel",
        "program.view.grid.PropertypeGrid"
    ],
    expanded: true,
    controller: "imgtree",
    //viewModel:"devtreemodel",
    viewModel: {
        type: 'devtreemodel'
    },

    header: {
        title: "Device",
        items: [
            {
                xtype: "image", src: "", width: 20, height: 20,
                hidden: true,
                disable: true,
                listeners: {
                    el: {
                        mouseover: function (e, target) {
                            console.log(this)
                            Ext.tip.QuickTipManager.register({
                                target: target.id, // Target button's ID
                                title: 'Info',  // QuickTip Header
                                text: this.component.info // Tip content
                            });
                        }
                    },
                    boxready: function () {
                        return;
                        var img = this;
                        var acceptBulb = "resources/img/light_bulb_accept_24px.png";
                        var deleteBulb = "resources/img/light_bulb_delete_24px.png";
                        var helpBulb = "resources/img/light_bulb_help_24px.png";

                        engLogin()
                        setInterval(function () {
                            engLogin()
                        }, 300000)
                        function engLogin() {
                            img.setSrc(helpBulb)
                            Ext.Ajax.request({
                                url: "resources/test1.php?par=englogin",
                                success: function (response) {
                                    try {
                                        var resJson = Ext.decode(response.responseText);
                                        if (resJson.success) {
                                            img.setSrc(acceptBulb)
                                            img.info = resJson.info;

                                        } else {
                                            img.setSrc(helpBulb)
                                            img.info = resJson.info
                                        }
                                    } catch (e) {
                                        console.log(e)
                                        img.setSrc(deleteBulb)
                                        img.info = response
                                    }

                                }
                            })
                        }

                    }
                }
            }
        ]
    },
    //titleAlign:"center",//标题居中
    // titleCollapse: true,
    // autoScroll: true,
    // animate: false,
    // resizable: true,
    // //ui: "default",
    // useArrows: true,
    // //viewType: "treeview",
    // stateful: true,
    //draggable:true,
    id: "leftDevTree",
    singleExpand: false,
    rootVisible: false,//隐藏root
    listeners: {
        // itemclick: "itemclick",
        render: "render",
        itemcontextmenu: "itemcontextmenu",
        //itemmouseenter: "itemmouseenter",
        boxready: "boxready",
        afteritemexpand: function (node, index, e) {
            /*if (node.raw.depth == 3) {
                console.log(node)
            }*/
        },
        checkchange: function (treeModel, check) {
            console.log(arguments)
            var me = this;
            var treePanle = this;
            if (check) {
                treeModel.set("qtip", "On line")
            } else {
                treeModel.set("qtip", "Off line")
            }
            treePanle.viewModel.set("linkDataBase", check);

        }
    },
    tbar: [
        {
            text: 'Expand All',
            scope: this,
            handler: function (th) {
                th.up("devtree").down("toolbar").disable();
                th.up("devtree").expandAll(function () {
                    th.up("devtree").down("toolbar").enable()
                });
            }
        }, {
            text: 'Collapse All',
            scope: this,
            handler: function (th) {
                th.up("devtree").down("toolbar").disable();
                th.up("devtree").collapseAll(function () {
                    th.up("devtree").down("toolbar").enable()
                });
            }
        }],

    initComponent: function () {
        var me = this;
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: "DevTreeDragDropGroup"
            },
        }

        me.tools = [
            {
                type: 'refresh',
                tooltip: 'Refresh Dev Data',
                // hidden:true,
                handler: function (event, toolEl, panelHeader) {
                    //devTreeStoreLoad()
                    me.store.reload()
                    me.expandAll()
                }
            }]

        this.callParent();
    }
});