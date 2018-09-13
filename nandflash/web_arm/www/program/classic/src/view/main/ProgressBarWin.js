Ext.define('program.view.massage.ProgressBarWin', {
    extend: 'Ext.window.Window',
    alias: "progressbarwin",
    autoShow: true,
    title: "Please Wait ...",
    requires: [
        'program.view.massage.ProgressBarWinController',
        'program.view.massage.ProgressBarWinModel',
    ],
    allCount: null,//总数
    autoSetText: true,
    autoClose: true,
    controller: 'massage-progressbarwin',
    viewModel: {
        type: 'massage-progressbarwin'
    },
    initComponent: function () {
        var me = this;
        me.progress = Ext.create("Ext.Progress", {
            width: 300,
            value:0,
            text:"ready ..."
        });
        me.items = [me.progress]
        me.callParent()
    },
    setValue: function (value) {
        var me = this;
        var cur = value / me.allCount
        me.progress.setValue(cur);
        if (me.autoSetText) {
            me.setText(Ext.util.Format.percent(cur))
        }
        if (me.autoClose == true & cur >= 1) {
            me.setText("done.")
            setTimeout(function () {
                me.close();
            }, 1000)
        }
    },
    setText: function (text) {
        var me = this;
        me.progress.setText(text);
    }
});
