Ext.define('program.model.Alerm', {
    extend: 'Ext.data.Model',
    alias: "program.Alerm",
    fields: [
        {name: 'high_limit', type: 'string'},
        {name: 'low_limit', type: 'string'},
        {name: 'delay_time', type: 'string'},
        {name: 'deadband', type: 'string'},
        {name: 'notification_class', type: 'string'},
        {name: 'limit', type: 'int'},
        {name: 'event_enable', type: 'int'},
        {name:"event_type",type:"int"},
        {name:"alarm_value",type:"int"}
    ]
});
