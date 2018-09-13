Ext.define("program.view.grid.menu.gridmenu", {
    extend: "Ext.menu.Menu",
    requires: [
        "program.view.grid.menu.gridmenuController",
        "program.view.grid.menu.gridmenuModel"
    ],
    controller: "grid-menu-gridmenu",
    viewModel: {
        type: "grid-menu-gridmenu"
    },
    floating: true,  // usually you want this set to True (default)
    autoShow: true,
    shadow: "drop",
    shadowOffset: 5,
    border: "0 0 0 1",
    style: {
        borderColor: "#111"
    },
    listeners: {
        show: "show"
    },
    items: [{
        text: 'cut',
        itemId: 'cut',
        disabled: true,
        listeners: {
            click: "cupclick"
        }
    }, {
        text: 'copy',
        itemId: 'copy',
        disabled: true,
        listeners: {
            click: "copyclick"
        }
        //disabled: true
    }, {
        text: 'paste',
        itemId: 'paste',
        disabled: true,
        listeners: {
            click: "pasteclick"
        }
    }, {
        text: 'deplicate',
        itemId: 'deplicate',
        disabled: true,
        listeners: {
            click: "deplicateclick"
        }
    }, {
        text: 'delete',
        itemId: 'delete',
        disabled: true,
        //plain:true //平的
        border: "0 0 1 0",
        style: {
            borderColor: "#111"
        },
        listeners: {
            click: "deleteclick"
        }
    }, {
        text: 'Link Mark',
        itemId: 'LinkMark',
        disabled: true,
        listeners: {
            click: "LinkMarkClick"
        }
    }, {
        text: 'Link Form',
        itemId: 'LinkForm',
        disabled: true,
        border: "0 0 1 0",
        listeners: {
            click: "LinkFormClick"
        },
        style: {
            borderColor: "#111"
        }
    }, {
        text: 'addSlot',
        disabled: true,
        itemId: "addSlot"

    }, {
        text: 'delSlot',
        disabled: true,
        border: "0 0 1 0",
        itemId: 'delSlot',

        style: {
            borderColor: "#111"
        }, disabled: true
    }, {
        text: "attribute",
        itemId: "attribute",
        handler: "attribute"
    },
        {
            text: 'Rename',
            itemId: "Rename",
            //disabled: true,
            handler: "Rename"
        }, {
            text: 'New plant',
            hidden: true,
            disabled: true
        }, {
            text: 'Reorder',//排序
            hidden: true,
            disabled: true
        }, {
            text: 'Property',
            disabled: true,
            itemId: 'Property',
            border: "0 0 1 0",
            listeners: {
                //click:"PropertyClick"
            },
            style: {
                borderColor: "#111"
            }
        }, {
            text: 'PinSlots',
            itemId: 'PinSlots',
            hidden: true,
            disabled: true
        }, {
            text: 'Backup',
            itemId: 'Backup',
            hidden: true,
            disabled: true
        }, {
            text: 'Restor',
            hidden: true,
            itemId: 'Restor',
            disabled: true
        }
    ],

});
