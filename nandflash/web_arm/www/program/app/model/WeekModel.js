Ext.define('program.model.WeekModel', {
    extend: 'Ext.data.Model',
    alias: "WeekModel",
    fields: [
        //{name: "divId", type: "string"},
        {name: "Week", type: "string"},
        {name: "time", type: "string"},
        {name: "value", type: "boolean"},
        {
            name: "level", type: "number", calculate: function (data) {
            var week = data.Week;
            var weeks = ['sunday','monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            return weeks.indexOf(week);
        }
        },{
            name:"timesort",type:"number",calculate:function (data) {
                var times = data.time.split(':');
                var time = new Date("1970","1","1",times[0],times[1],times[2]).getTime();
                return time;
            }
        }
        //{name: "StartTime", type: "string"},
        //{name: "EndTime", type: "string"},
    ]
});
