Ext.define('program.view.grid.LogicGridPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-logicgridpanel',
    boxready:function(th){
        joinRow0(th)

    },
    onSpinUp:function () {
        var oldValue = this.getValue();
        var newValue=0;
        if(oldValue=="0"){
            newValue="1";
        }
        if(oldValue=="1"){
            newValue="-";
        }
        if(oldValue=="-"){
            newValue="0";
        }
        this.setValue(newValue);
    },
    onSpinDown: function () {
        var oldValue = this.getValue();
        var newValue=0;
        if(oldValue=="0"){
            newValue="-";
        }
        if(oldValue=="-"){
            newValue="1";
        }
        if(oldValue=="1"){
            newValue="0";
        }
        this.setValue(newValue);
    }

});
