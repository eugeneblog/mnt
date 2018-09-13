Ext.define('program.view.window.AlarmWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-alarmwindow',
    formBoxReady: function (win) {
        var me = this.view;

        me.getAlarmFormData()
        //me.down("form").loadRecord();


        /*myAjax("resources/test1.php?par=getAlarm&nodename=" + win.sDevNodeName, function (response) {
            console.log(arguments)
            try{
                var data = Ext.decode(response.responseText)['Set_Alarm'][0];
                var alarm = Ext.create("program.model.Alerm", data);


                win.down("form").loadRecord(alarm);
            }catch(e){
                setTimeout(function(){
                    Ext.Msg.alert('Massage', 'invalid date , This attribute is initialized, ok .');
                },500);
                return ;
            }
        })*/
    }
});
