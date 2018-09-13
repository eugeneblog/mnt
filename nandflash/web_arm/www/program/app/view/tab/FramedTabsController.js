Ext.define('program.view.tab.FramedTabsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.framedtabs',

    render: function (th) {
        th.add(Ext.create("program.view.tab.DrawPanel", {
            title: "1000"
        }))
    },

    showIndex: function () {
        var me = this.view;
        if (me.showIndex) {
            showIndex()
            me.showIndex = false;

        } else {

            hideIndex()
            me.showIndex = true

        }

    }
});

function showIndex() {
    saveXml()

    var panels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < panels.length; i++) {
        if (panels[i].button) {
            panels[i].removeDocked(panels[i].button);
        }
        console.log(panels[i])
        var button = Ext.create("Ext.button.Button", {
            text: panels[i].curPlantIndex,
            hidden: false
        })
        panels[i].button = button;
        panels[i].addDocked(button)
    }
}
function hideIndex() {
    var panels = getCurrentDrawPanelGirdPanels();
    for (var i = 0; i < panels.length; i++) {
        /*var dock = panels[i].getDockedItems("button[hidden!=true]")[0]

        if (dock) {
            panels[i].removeDocked(dock);
        }*/
        if(panels[i].button){
            panels[i].removeDocked(panels[i].button);
        }

    }
}