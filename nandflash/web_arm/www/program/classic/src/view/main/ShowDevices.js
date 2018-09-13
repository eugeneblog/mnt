
Ext.define('program.view.window.ShowDevices',{
    extend: 'Ext.window.Window',

    requires: [
        'program.view.window.ShowDevicesController',
        'program.view.window.ShowDevicesModel'
    ],

    controller: 'window-showdevices',
    viewModel: {
        type: 'window-showdevices'
    },
    xtype:"showdevices",
    alias:"showdevices",
    autoShow:true,
    height: 600,
    layout: {
        type: "table",
        columns: 3,
        tableAttrs: {
            style: {
                flex: 1,
                width: "100%"
            }
        }
    },
    defaults: {
        flex: 1,
        margin: 3
    },
    autoScroll: true,
    device:"1000",
    ip:"127.0.0.1",
    port:"6379",
    initComponent:function(){
        var me=this;
        var types = ['AI', "AO", "AV", "BI", "BO", "BV"]
        var gridItems = [];
        for (var i = 0; i < types.length; i++) {
            var store = My.getDevsByDevName(location.host,"6379" , me.device);
            store.setFilters([
                function (item) {
                    return item.data.value.substr(0, 5) == me.device + i
                }
            ])

            gridItems.push({
                title: types[i],
                xtype: "grid",
                border: true,
                //split:true,
                height: 340,
                maxHeight: 340,
                fields: ['name', "value", 'Present_Value','update'],
                store: store,
                autoScroll: true,
                columns: [
                    {
                        dataIndex: "name", text: "name", flex: 3
                    }, {
                        dataIndex: "value", text: "key", flex: 1, hidden: true
                    },
                    {
                        dataIndex: "Present_Value", text: "value", flex: 2
                    },{
                        dataIndex:"update",text:"UPdate",flex:2
                    }

                ]
            })
        }
        me.title= me.device + " devices";
        me.width= Ext.getBody().getWidth();
        me.items= gridItems;
        me.callParent();
    }
});
