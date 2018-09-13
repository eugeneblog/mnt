Ext.define("program.view.grid.LogicGridPanel", {
    extend: "Ext.grid.Panel",
    xtype: "logicgridpanel",
    requires: [
        "program.view.grid.LogicGridPanelController",
        "program.view.grid.LogicGridPanelModel"
    ],
    //height: 300,
    width: "100%",
    border: false,
    forceFit: true,
    controller: "grid-logicgridpanel",
    viewModel: {
        type: "grid-logicgridpanel"
    },
    listeners: {
        boxready: "boxready"
    },
    columnLines: true,
    columns: [
        {
            header: 'name', dataIndex: "name", width: 80, minWidth: 80, maxWidth: 80,
            align: "center",
            sortable: false,
            menuDisabled: true
        },
        {
            sortable: false,
            menuDisabled: true,
            header: "delay", dataIndex: "delay", width: 90, minWidth: 90, maxWidth: 90, align: "center", editor: {
            xtype: 'textfield',
            allowBlank: false
        }
        },
        {
            sortable: false,
            menuDisabled: true,
            header: "value", dataIndex: "value", width: 73, minWidth: 73, maxWidth: 73, align: "center", editor: {
            xtype: 'textfield',
            allowBlank: false
        }
        },
        {
            sortable: false,
            menuDisabled: true,
            header: "configure",
            width: 100,
            minWidth: 100,
            columns: [{
                sortable: false,
                menuDisabled: true,
                dataIndex: "time", width: 45, minWidth: 45, align: "center",
                editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
            },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time1", width: 45, minWidth: 45, align: "center",hidden:true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time2", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time3", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time4", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time5", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time6", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time7", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time8", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                },
                {
                    sortable: false,
                    menuDisabled: true,
                    dataIndex: "time9", width: 45, minWidth: 45, align: "center", hidden: true, editor: {
                    xtype: "spinnerfield",
                    value: 0,
                    onSpinUp: function () {
                        var _this = this;
                        changeTimeValueUp(_this)
                    },
                    onSpinDown: function () {
                        var _this = this;
                        changeTimeValueDown(_this)
                    }
                }
                }
            ]
        }
    ],
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    }
});

function joinRow0(th) {
    var table = th.body.dom.querySelector("table");
    var aTds = table.querySelectorAll("td")
    for (var i = 0; i < aTds.length; i++) {
        if (i != 0 & i != 2) {
            aTds[i].style.display="none"
            //aTds[i].parentNode.removeChild(aTds[i])
        }
        if (i == 2) {
            var iWidth = th.el.getWidth() - parseInt(aTds[0].style.width);
            console.log(th.el.getWidth())
            console.log(aTds[0].style.width)
            console.log(iWidth)
            aTds[i].style.width = iWidth + "px";
            aTds[i].style.minWidth = iWidth + "px";
            aTds[i].style.maxWidth = iWidth + "px";
            aTds[i].childNodes[0].style.textAlign="right";
        }
    }
}

function changeTimeValueDown(_this) {
    var oldValue = _this.getValue();
    var newValue = 0;
    if (oldValue == "0") {
        newValue = "-";
    }
    if (oldValue == "-") {
        newValue = "1";
    }
    if (oldValue == "1") {
        newValue = "0";
    }
    _this.setValue(newValue);
}
function changeTimeValueUp(_this) {
    var oldValue = _this.getValue();
    var newValue = 0;
    if (oldValue == "0") {
        newValue = "1";
    }
    if (oldValue == "1") {
        newValue = "-";
    }
    if (oldValue == "-") {
        newValue = "0";
    }
    _this.setValue(newValue);
}