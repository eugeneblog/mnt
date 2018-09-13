Ext.define('program.view.window.AttributeTableWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-attributetablewin',
    closeWin:function(){
        var me=this.view;

        me.close();
    }
});
