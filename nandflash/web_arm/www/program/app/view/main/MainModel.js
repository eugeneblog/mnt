/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('program.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'SmartIO',
        img: "data:image/png;base64,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 lnha8FNifAAAAABJRU5ErkJggg==",
    },
    formulas: {
        diameter: function (get) {
            var input1 = get('input1');
            var input2 = get('input2');
            return Ext.util.Format.number(Math.sqrt(input1 * input1 + input2 * input2), '0.00')
        }
    }
    //TODO - add data, formulas and/or methods to support your view
});


var slotsJson = {
    'AI': {
        type: "0",
        initData: function () {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'Instance', 'value': ""}
            return arr
        },
        isAddSlot: false
    },
    'AO': {
        type: "1",
        initData: function (defaultValue) {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'Instance', 'value': ""};
            if (defaultValue) {
                arr[2] = {'name': 'In', 'value': ""};
            }
            return arr;
        },
        isAddSlot: true,
        maxSlot: 2
    },
    'AV': {
        type: "2",
        initData: function (defaultValue) {
            var arr = new Array()

            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'Instance', 'value': ""}
            if (defaultValue) {
                arr[2] = {'name': 'In', 'value': defaultValue}
            }
            return arr;
        },
        isAddSlot: true,
        maxSlot: 2
    },
    'BI': {
        type: "3",
        initData: function () {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'Instance', 'value': "0"}
            return arr;
        },
        isAddSlot: false
        //maxSlot:10
    },
    'BO': {
        type: "4",
        initData: function (defaultValue) {
            var arr = new Array()

            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'Instance', 'value': ""}
            if (defaultValue) {
                arr[2] = {'name': 'In', 'value': ""}
            }
            return arr;
        },
        isAddSlot: true,
        maxSlot: 2
    },

    'BV': {
        type: "5",
        initData: function (defaultValue) {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'Instance', 'value': ""}
            if (defaultValue) {
                arr[2] = {'name': 'In', 'value': defaultValue}
            }
            return arr;
        },
        isAddSlot: true,
        maxSlot: 2
    },

    'add': {
        type: "51",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    'sub': {
        type: "52",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    'mul': {
        type: "53",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    'fa': {
        type: "54",
        initData: function () {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: false
    },

    'aver': {
        type: "55",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },

    'logic': {
        type: "56",
        initData: function () {
            var arr = new Array();
            arr[0] = {
                'name': 'Out',
                delay: "0",
                'value': "0",
                time: "0",
                time1: "0",
                time2: "0",
                time3: "0",
                time4: "0",
                time5: "0",
                time6: "0",
                time7: "0",
                time8: "0",
                time9: "0"
            }
            arr[1] = {
                'name': 'In',
                delay: "0",
                'value': "0",
                time: "0",
                time1: "0",
                time2: "0",
                time3: "0",
                time4: "0",
                time5: "0",
                time6: "0",
                time7: "0",
                time8: "0",
                time9: "0"
            }

            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    'fd': {
        type: "57",
        initData: function () {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: false
    },

    'aodo': {
        type: "58",
        initData: function () {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: false
    },
    'hour': {
        type: "59",
        initData: function () {
            var arr = new Array()
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: false
    },
    'delay': {
        type: "60",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'DelayTime(s)', 'value': "2"}
            return arr;
        },
        isAddSlot: false
    },
    'comp': {
        type: "61",
        initData: function () {
            var arr = new Array();

            arr[0] = {
                "name": "mode", value: "<", select: [{name: "<", value: "0"},
                    {name: ">", value: "2"},
                    {name: "=", value: "1"}
                ]
            }
            arr[1] = {'name': 'Out', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            arr[3] = {'name': 'In', 'value': "0"}
            return arr;
        },

        isAddSlot: false
    },
    'count': {
        type: "62",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },


    'max': {
        type: "63",
        initData: function () {
            var arr = new Array();

            arr[0] = {
                'name': 'mode', 'value': "max", select: [{name: "max", value: "1"},
                    {name: "min", value: "0"}
                ]
            }
            arr[1] = {'name': 'Out', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            arr[3] = {'name': 'In', 'value': "0"}
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    'Switch': {
        type: "64",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}
            arr[3] = {
                'name': 'Enable',
                'value': "Enable",
                select: [{name: "Enable", value: "1"}, {name: "Disable", value: "0"}]
            }
            return arr
        },
        isAddSlot: false
    },
    'pulse': {
        type: "65",
        initData: function () {
            var arr = new Array();

            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {
                'name': 'Enable',
                'value': "Enable",
                select: [{name: "Enable", value: "1"}, {name: "Disable", value: "0"}]
            }
            arr[2] = {'name': 'OnTime', 'value': "6"}
            arr[3] = {'name': 'OffTime', 'value': "6"}
            arr[4] = {'name': 'lifetime', 'value': "60"}
            return arr;
        },
        isAddSlot: false
    },
    'pid': {
        type: "67",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'PV', 'value': "0"}
            arr[2] = {'name': 'SP', 'value': "0"}
            arr[3] = {
                'name': 'Enable',
                'value': "Enable",
                select: [{name: "Enable", value: "1"}, {name: "Disable", value: "0"}]
            }
            arr[4] = {
                'name': 'Direction',
                'value': "Derect",
                select: [{name: "Derect", value: "0"}, {name: "Reverse", value: "1"}]
            }
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    'hy': {
        type: "68",
        initData: function () {
            var arr = new Array();

            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'On', 'value': "55"}
            arr[3] = {'name': 'Off', 'value': "45"}
            return arr;
        },
        isAddSlot: false
    },
    'lock': {
        type: "69",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'Unlock', 'value': "0"}
            return arr;
        },
        isAddSlot: false
    },
    'enth': {
        type: "70",
        initData: function () {
            var arr = new Array();

            arr[0] = {
                "name": "mode", value: "ps", select: [{name: "ps", value: "0"},
                    {name: "water", value: "1"},
                    {name: "enthalpy", value: "2"}
                ]
            }
            arr[1] = {'name': 'Out', 'value': "0"}
            arr[2] = {'name': 'Temp', 'value': "0"}
            arr[3] = {'name': 'RH', 'value': "0"}
            arr[4] = {'name': 'pa', 'value': "101325.0"}
            return arr;
        },
        isAddSlot: false
    },
    'select': {
        type: "73",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'select', 'value': "1"};
            arr[2] = {'name': 'In', 'value': "0"};
            arr[3] = {'name': 'In', 'value': "0"};
            arr[4] = {'name': 'In', 'value': "0"};
            return arr;
        },
        isAddSlot: true,
        maxSlot: 9
    },
    'SCFM': {
        type: "74",
        initData: function () {
            var arr = new Array();
            arr[0] = {
                'name': 'mode', 'value': "0", select: [{name: "SCFM", value: "0"},
                    {name: "Vento", value: "1"}
                ]
            }
            arr[1] = {'name': 'Out', 'value': "0"}
            arr[2] = {'name': 'In', 'value': "0"}

            return arr;
        },
        isAddSlot: false
    },

    'scale': {
        type: "75",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'In', 'value': "0"};
            //arr[2] = {'name': 'In', 'value': "0"}
            //arr[3] = {'name': 'In', 'value': "100"}
            //arr[4] = {'name': 'In', 'value': "20"}
            //arr[5] = {'name': 'In', 'value': "400"}
            return arr;
        },
        isAddSlot: false
    },

    "buffer": {
        type: "76",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'In', 'value': "0"};
            return arr;
        },
        isAddSlot: false
    },
    "Delayoff": {
        type: "77",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"}
            arr[1] = {'name': 'In', 'value': "0"}
            arr[2] = {'name': 'DelayTime(s)', 'value': "2"}
            return arr;
        },
        isAddSlot: false
    },

    "NOT": {
        type: "78",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'In', 'value': "0"};
            return arr;
        },
        isAddSlot: false
    },
    "Integer": {
        type: "79",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'In', 'value': "0"};
            arr[2] = {'name': 'select', 'value': "1"};
            arr[3] = {'name': 'In', 'value': "0"};
            arr[4] = {'name': 'In', 'value': "0"};
            return arr;
        },
        isAddSlot: true,
        maxSlot: 10
    },
    "doubleBO": {
        type: "80",
        initData: function () {
            var arr = new Array();
            arr[0] = {'name': 'Out', 'value': "0"};
            arr[1] = {'name': 'In', 'value': "0"};
            arr[2] = {'name': 'open', 'value': "0"};
            arr[3] = {'name': 'close', 'value': "0"};
            return arr;
        },
        isAddSlot: false
        //maxSlot:10
    }


};

var Imgs = [

    {
        name: "add",
        title:"Add",
        src: "resources/img/SVG/add.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAshJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAx4vEAG9Z4Q5MHCCCwFyQoKDUAAghswCPy9IL9 DRBAjHiigJAXwAoAAgjkgnXkOl8QiAECiBFPGiDoghN2DAwAAQR0QSvZAWgBxAABxIgnERJ0AcPm YAaAAKLMAKASgABiorT2AAggig0ACCAWhmQcZRUDTnEUDwEEEBODNyX2czMABBATgxUlBlgyAAQQ E4MQJQZIMAAEEIWBqM4AEEAUGvCHASCAKDTgJQNAADEx3KHEgHMMAAHExHCKEgMuMAAEEBPDBEoM +MUAEEAUZyaAAKI4LwAEEMUGAAQQ0IDv5Ot2YWAACCBgGPC/JjsMgCoAAgjogo9kO2AXEAMEEKhU 1j9NQb0AEEAUVywAAQSOhWvk+cATRAAEENgFzN/Jr50BAgjsgr8/yXFAAZgECCBI+4DzIxkugEgD BBC0jYQzLRBspwEEEDQpk54WdkNpgACC5QU2EhN0Haw2AAggRsJZFhvY6wljAQQQwgBGEqLioimc CRBAiOz8n41o/ccQ+hkAAogRZ6WHG/xnR+IABBBKgcJWRIx+RWT9DAABxIwid0pdm6B+zYcoXIAA QivSYtj24teewYbWrQAIIMxuH76Ozy8eDCGAAMIsVH+zsU3Grt2BDVM/A0AA4UI2e1A7vpNw6QUI IHzIb99toNZvZ9ea4FEEEEAUI4AAohgBBBgAyTiK+R+id1QAAAAASUVORK5CYII:",
        Img_1: ""
    },
    {
        name: "sub",
        title:"Sub",
        src: "resources/img/SVG/sub.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAArtJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUjGUVYRVyAxAAQQE4M3JfZzMwAEEBODFSUGWDIABBATgxAlBkgwAAQQ hYGozgAQQBQa8IcBIIAoNOAlA0AAMTHcocSAcwwAAcTEcIoSAy4wAAQQE8MESgz4xQAQQBRnJoAA ojgvAAQQxQYABBDQgO/k63ZhYAAIIGAY8L+mIAgYAAII6IKPZOvfBcQAAQQqlfVPU1AvAAQQxRUL QACBY+Eaefo9QQRAAIFdwPydbAcwAAQQ2AV/f5KjvwBMAgQQpH3A+ZFcBzAABBAkJX4XJVc/A0AA QZMy6S7YDaUBAgiWF9hIDMc6WG0AEECM2KsLQmCvJ4wFEEAIAxhJiIqLpnAmQAAhsvN/NqL1H0Po ZwAIIEaclR5u8J8diQMQQCgFClsRMfoVkfUzAAQQM4rcKXVtgvo1H6JwAQIIrUiLYduLX3sGG1q3 AiCAMLt9+Do+v3gwhAACCLNQ/c3GNhm7dgc2TP0MAAGEC9nsQe34TsKlFyCA8CG/fbeBWr+dXWuC RxFAAFGMAAKIYgQQYADYEIAGVrhQ8QAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "mul",
        title:"Mul",
        src: "resources/img/SVG/mul.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAvRJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAYRkACuI +I3GZkUWQhWABCNAADFRWnsABBC6AaxIJFEAIICYGJIpcwFAADExeCPxfmNh4QXcDAABxMRghekH 4n1gyQAQQEwMQpR4QIIBIIDQAvE3aT5gUGcACCDMaGQlJQ7+MAAEEIXp4CUDQAAxMdyhxIBzDAAB xMRwCksgEBsEDBcYAAKIiWECA9bESGwlBxBATEBDCAD8qRsggFgI6P7NitD7G92JIAGAAMKIhd9o QUAodQMEENCA7wTcgEe/CwMDQAABCxT+12THIrBYBgggoAs+kq1/FxADBBCoVNY/TUG9ABBAFFcs AAEEjoVr5On3BBEAAQR2AfN38mtngAACu+DvT3L0F4BJgACCtA84P5LrAAaAAIKkxO+i5OpnAAgg aFIm3QW7oTRAAMHyAhuJ4VgHqw0AAogRa/uVINjrCWMBBBDCAEYSouKiKZwJEECI7PyfjWj9xxD6 GQACiBFXKxwP+M+OxAEIIJQCha2IGP2KyPoZAAKIGUXulLo2Qf2aD1G4AAGEVqTFsO3Frz2DDa1b ARBAmN0+fB2fXzwYQgABhFm1/WZjm4xduwMbpn4GgADChWz2oHZ8J+HSCxBA+JDfvttArd/OrjXB owgggChGAAFEMQIIMAByu5LI5qTgJQAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "count",
        title:"Count",
        src: "resources/img/SVG/count.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAxNJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUiGFGcg4jcDnP0bwvjNAKOR2Kxw3UAhgABiYvAGibIiTGFFIlEAKxb7 uRkAAoiJwQpiFhDA1EDYDDhNgMiDSUsGgABiYhCCO/U3w28kNisxISDBABBAKIH4G69ibGaqMwAE ECmxgMWEPwwAAURhNL5kAAggJoY7lDjhHANAADExnMIfUfhNuMAAEEBMDBPg4qwgCs7+jUgZ+Co5 gACCZCZWpGjAwUaYiJxI2RgAAogJmjQQ0fgbmcSIXoyYBgggirMzQAABXfCdfP0uDAwAAQR0Af9r ChzAABBAQBd8JFv/LiAGCCBQqax/moJ6ASCAKK5YAAIIHI3XyNPvCSIAAgjsAubvZDuAASCAwC74 +5Mc/QVgEiCAIO0Dzo/kOoABIIAgSfm7KLn6GQACCFqgkO6C3VAaIIBgJRIbieFY5w1lAAQQI9b2 K0Gw1xPGAggghAGMJETFRVM4EyCAEIXqfzai9R9D6GcACCBGXK1wPOA/OxIHIIBQinW2ImL0KyLr ZwAIIGYUuVPq2gT1az5E4QIEEFrFEsO2F7/2DDa0bgVAAGF2+/B1fH7xYAgBBBBm1fabjW0ydu0O bJj6GQACCBey2YPa8Z2ESy9AAOFDfvtuA7V+O7vWBI8igACiGAEEEMUIIMAAS5Gzv20kNXIAAAAA SUVORK5CYII:",
        Img_1: ""
    },
    {
        name: "aver",
        title:"Aver",
        src: "resources/img/SVG/aver.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAx1J REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAYRhACuI +A1l/UYR/82KrPA3JBgBAogJt/G/oaYxYJqGBAACiInS6gcggFgYktF9AHQpK8w2GIMVxeHIACCA mBi88fkBJw8KuBkAAoiJwQojCJFtJAAsGQACiIlBCMPe3xjBiDMIJRgAAoiFxDBDCwx1BoAAYsII QrQIZMXroT8MAAGEPxp/4w9CBoaXDAABxMJwR4UBm22sv4mIGYZzDAABxMRwioATWHEHIQPDBQaA AGJimEBJOvzFABBAyJkJ2SY4mxXJ4ZhOYWMACCCyoxFmFEAAUZyZAAIIaMB3bDkWnhR+445DYHuK gQEggIBhwP+abOuBxTJAAAFd8JFs/buAGCCAQKWy/mkK6gWAAKK4YgEIIHAsXCNPvyeIAAggsAuY v5NfOwMEENgFf3+So78ATAIEEKR9wPmRXAcwAAQQJCV+FyVXPwNAAEGTMuku2A2lAQIIlhfYSAzH OlhtABBAjFjbrwTBXk8YCyCAEAYwkhAVF03hTIAAQmTn/2xE6z+G0M8AEECMuFrheMB/diQOQACh FChsRcToV0TWzwAQQMwocqfUtQnq13yIwgUIILQiLYZtL37tGWxo3QqAAMLs9uHr+PziwRACCCDM QvU3G9tk7Nod2DD1MwAEEC5kswe14zsJl16AAMKH/PbdBmr9dnatCR5FAAFEMQIIIIoRQIABAEpb oSbso7vsAAAAAElFTkSuQmCC",
        Img_1: ""
    },
    {
        name: "aodo",
        title:"Aodo",
        src: "resources/img/SVG/aodo.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAxFJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUhGFGkMDL8RTDgbwmPAIQkQQEwM3pimsrIiSBzCUEluBoAAYmKwQtjz G2YXw28gQNb7G1kAiW3JABBATAxCmA6AOBBhHEwjSABVUoIBIIAoDER1BoAAYkKxF8NSQuAPA0AA UeiClwwAAcTEcAcplFmxRAgrPkedYwAIICaGUyhxTaIfLjAABBAjg8Ep5KAHUxA2K1LKQcihSrIx AAQQPDOhGoCZ9OACKJJsDAABBDMAbh0rXBUxSZmNASCAKM7OAAEEjMbv5Ot3YWAACCCgC/hfU+AA BoAAArrgI9n6dwExQACBSmX90xTUCwABRHHFAhBA4LxwjTz9niACIIDALmD+TrYDGAACCOyCvz/J 0V8AJgECCNI+4PxIrgMYAAIIUh58FyVXPwNAAEELFNJdsBtKAwQQrERiIzEc62C1AUAAMWJtvxIE ez1hLIAAQhjASEJUXDSFMwECCFGo/mcjWv8xhH4GgABixNUKxwP+syNxAAIIpVhnKyJGvyKyfgaA AGJGkTulrk1Qv+ZDFC5AAKFVLDFse/Frz2BD61YABBBmtw9fx+cXD4YQQABhVm2/2dgmY9fuwIap nwEggHAhmz2oHd9JuPQCBBA+5LfvNlDrt7NrTfAoAgggihFAAFGMAAIMAMwZq5zeFKkhAAAAAElF TkSuQmCC",
        Img_1: ""
    },
    {
        name: "max",
        title:"Max",
        src: "resources/img/SVG/max.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAwNJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUhGE2FlYPiNnUam4AAggJgYvIm2jBWKkQA3A0AAMTFY4VcJshHMhlmM 4gBLBoAAYmIQItYBIIPQPSDBABBATFhVYtiE5DQUoM4AEEBMOHyL7AOoH8BGohn7hwEggCiMxpcM AAHExHCHUNizsuKOhXMMAAHExHAKe3D9RvE0KwP2cLnAABBATAwTCIQ9CGAEB6KSAwggJqAhxCcj LDEBEEBMOKIcYSnMT1hjgYEBIIAozs4AAQR0wXfy9bswMAAEENAF/K8pcAADQAABXfCRbP27gBgg gEClsv5pCuoFgACiuGIBCCBwNF4jT78niAAIILALmL+T7QAGgAACu+DvT3L0F4BJgACCtA84P5Lr AAaAAIIk5e+i5OpnAAggaF4g3QW7oTRAAMEyExuJ4VgHqw0AAogRa/uVINjrCWMBBBDCAEYSouKi KZwJEECI8uA/G9H6jyH0MwAEECOuVjge8J8diQMQQCglElsRMfoVkfUzAAQQM4rcKXVtgvo1H6Jw AQIIrUyMYduLX3sGG1q3AiCAMLt9+Do+v3gwhAACCLNU/s3GNhm7dgc2TP0MAAGEC9nsQe34TsKl FyCA8CG/fbeBWr+dXWuCRxFAAFGMAAKIYgQQYAAJwZ/WqLL/YwAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "comp",
        title:"Comp",
        src: "resources/img/SVG/comp.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAzxJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUiGFGcg4je8cGNAcBEyUBYrTBVYECCAmBi8QVIQQVQKTuMCQGluBoAA YmKwYmBgRRfHwsRugiUDQACxMAjBnQNUzvqbAZkLcysrSJwVSCM7nhWcDQECiAlJ5W8wYoUp+E3Y CQzqDAABxIRkJMPv38g8RJjiBn8YAAKIhcjYYv3Nii2YXjIABBATwx3y08BvhnMMAAHExHCKKJXY vATkX2AACCAmhgnkWA0G4JIAIICYgIbAPQVPQVhSAa74AAggJiSnsYIRPPZYiYoIgABiQbXgNw77 frPiMgwggIAu+I4m9RsrEytwYWAACCBggcL/mlBu/I1CIjkGWCwDBBDQCx8x7fqNIwp/o0ruAmKA AAKVyvqnKagXAAKI4ooFIIDAmekaefo9QQRAAIFdwPyd/NoZIIDALvj7kxz9BWASIIAg7QPOj2Q3 MAACCFKgfBclVz8DQABBSyTSXbAbSgMEEKxiYSMxHOu8oQyAAGLE2n4lCPZ6wlgAAYQwgJGEqLho CmcCBBCibvzPRrT+Ywj9DAABxIirFY4H/GdH4gAEEErtzFZEjH5FZP0MAAHEjCJ3Sl2boH7Nhyhc gABCax/EsO3Frz2DDa1bARBAmN0+fB2fXzwYQgABhNlC+c3GNhm7dgc2TP0MAAGEC9nsQe34TsKl FyCA8CG/fbeBWr+dXWuCRxFAAFGMAAKIYgQQYAC3t7PVzqGHSAAAAABJRU5ErkJggg::",
        Img_1: ""
    },

    {
        name: "delay",
        title:"DelayOn",
        src: "resources/img/SVG/delay.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODIyQUU5NDEyN0U2OTBGNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNjgwMkY3MDAwQzcxMUU3OTJGOEU3M0NGRTQ4ODJBQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNjgwMkY2RjAwQzcxMUU3OTJGOEU3M0NGRTQ4ODJBQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDI4MDExNzQwNzIwNjgxMTgyMkFFOTQxMjdFNjkwRjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgyMkFFOTQxMjdFNjkwRjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70LPjwAAAFbElEQVR42uxcT0gcVxh/SlvSakybEvFQDwoa26IRsRURW8GDJwtGBBHa4EFYL63pRTzpoVvxIEggIHiwuYgIYhoRvdhaL142dKvUaoXYrdFUQUNdPRhJtt/v7XuTt+MsOpudzey8/uDn6szs977v9773Z96bMYM5j6vEz4gfEz8kXifmEa8QL4trwsR/if8Q14l/EFeJvxAPWBqilOgnBojPiZEE+VzY8AubrsYlok84HHGIAVHGJTcF/g7xW+KOg4GbuSPKzHrdwX9BDKUwcDNDwoeU4xrx/msM3Mz7wqeUoJb42EXBSz4WvjmKr4mnLgxe8lT4mHRkiKEokib8LtkC3Emj4CXvJCt4fxoGn7RM8KVx8JK+RIP/hHjiAQEQw6d2g8eNyiMPBC/5SMR0YfzgoeAlR+1MdF54UIAXF5kovUH81YPBSwZFjHHxpYeDl/wqXvCZxN81EGBVxHoGTRoEL3nTSoBZjQSYVW9ymFik3Dqvg/AQsNb4gViE5bitUe1L3lYV+UlDAX6WTQCLmk+JbzG9gMWTd5nYtIhoys8xHt5g+uIGBCjRWIDrEKCopaWFnZycGFxbW2MDAwO2rQ0PD8fYKSoqcszzuro6NjY2xn3FZ09PTyJmivHjTxIgQg5HAoFAhIzx30ESwVabgh18H3bwfRLAkbYLuwcHB5woj0Tg5ZEIdm1hI5btSwGoBvkJUpcb39raSshBKaJTAkj7MmCUA18hhE1b25nKFrWBhYUFNjExwXJzc5nP93JJDWlGBRkpjpRPBEhZtamozU2eQ7OUmJ6ejmlSFRUVbG9vj/X39/O/NzY2WDAY5P6qdqgSeSyyHMpMsyuXIcCbVk7CIFBQUMA/4VBfXx8vZHJykm1ubrL29nbbbQ+iNTc3s5WVFW4H6OjoMM4vLi5G78yamoxjNTU1vDwECsCH3d3dGLvb29ssKyuL9w0S+Lu6utrwt7S0NKZCpQCnVo7u7+9HFwevRJfS6uvr+SdEaGtrYyUlJbwWEIwdjI+PcxuVlZXczujoKHdU1jgEgt3a2ujiDbID51GTKo6Ojqw3La+93CI8Pj5mDQ0NvJyhoSF+rLy8XL08DAHCVobgIBAKhfgnApYCyJRCTWRnZ9sSAIGgJmRTQhaZMTMzYzS/qqoqHsjg4GBMYHl5eTHfycnJiclctTy1Qk0I4+4PZ66az6BgYGlpKXplOKqTTFuJw8ND2wIgLVHLsFVcXMwFMWcJhGltbWVlZWVseXnZSH8A6V9YWMj7BHkcdiCMet0FcIQM+CuekwheKri6umoU1Nvby9MKNLWpc4GaQ/D5+flsamrKMoNQJvoI+ID0hyAqIByOj4yMGM0GIs7Nzdntj//Gj7tyGFSJIcU8jJFjZ66TQ6fVMAViOFXPUY9+xgZIQsZchzkIjscbis12MPdQ/YUPatnmoV7wLprAGtqNmtpon93d3ZazL/T6asrOz8+fuQ61F6+JNDY28hqTbRZZgB4fM7qY5anZWdbV1cX7AyvAjhya5XBo9kEtW8Zo8nfdtXeDqFHUoFOTKXk3yMR6wDO3BK42M6vmlUQ+E7HrvSIk18enNbwVfvD/qrCyKqztvoCKm7rvDGWKfTNt9waBWxoIcOu85wOCHg7+t4t09Fo/ISJxz4MC3LMzTmr/lBiAZ+u0fU5QotMDAnS+6rTx+zQO3p+subPWT4vLmya/jjVvxjdM0zdGzBOlHRcGn5J3hpiyfvDARcH/KHxKObR9b1AF3t5M9ZujT5hL3hxV8baYdDj97nCnKMvVwM4JNv0fsld/e/yhsOXI2+MZKRDjfbH58pGg/P8B74l1eQxd2Ot+KrguVm3ARbF56xj+E2AA6ItkhToA9qsAAAAASUVORK5CYII=",
        Img_1: ""
    },
    {
        name: "Delayoff",
        title:"DelayOff",
        src: "resources/img/SVG/Delayoff.svg",
        Img_0: "",
        Img_1: ""
    },
    {
        name: "enth",
        title:"Enth",
        src: "resources/img/SVG/enth.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAvdJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUhGFGkwxm8g8zdU6DdcFMSEi8IFAQKIicEbu8msRNnPzQAQQEwMVkj8 3xCAYgJEAC6MCiwZAAKIiUGIkhCQYAAIIJyB+JsoT6gzAAQQCzaP/4YEGetvgiHzhwEggCiMxpcM AAHEwnBHBdndyJ7A4oTfaO44xwAQQEwMpxgoCIYLDAABxMQwgRIv/GIACCAWoCHYAxGS9AgCgADC H4i/CRsAEEAUZ2eAAAK64Dv5+l0YGAACCOgC/tcUOIABIICALvhItv5dQAwQQKBSWf80BfUCQABR XLEABBA4Gq+Rp98TRAAEENgFzN/JdgADQACBXfD3Jzn6C8AkQABB2gecH8l1AANAAEGS8ndRcvUz AAQQNC+Q7oLdUBoggGCZiY3EcKyD1QYAAcSItf1KEOz1hLEAAghhACMJUXHRFM4ECCBEefCfjWj9 xxD6GQACiBFXKxwP+M+OxAEIIJQSia2IGP2KyPoZAAKIGUXulLo2Qf2aD1G4AAGEVibGsO3Frz2D Da1bARBAmN0+fB2fXzwYQgABhFkq/2Zjm4xduwMbpn4GgADChWz2oHZ8J+HSCxBA+JDfvttArd/O rjXBowgggChGAAFEMQIIMAC5IaC6CNe0aAAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "fa",
        title:"Fa",
        src: "resources/img/SVG/fa.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAABGdBTUEAALGOfPtRkwAAACBjSFJN AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACXBIWXMAAA7EAAAOxAGVKw4b AAAC4ElEQVR4Xu2bQXKjMBBF23MW4oXLJ9CcgGLjFdvZMYeZDbMcH8Erb2LfgBOksgjchZGIAOHI ICE1EiivSmUlZXD3769uOxXvagoEzGIC7HY7vlNjqbqgCKCbrApYgvzgj9bASJ7B7otxbysOwEp6 ChuuMBLAVeKPmAgx+wj4kjzDJBZtB/iUuAxdN2g5wPfk56AswFqS141TSYC1VV4n3kkB1mp71bhn T4E1oCLCqABrrb7IVA5PBdhC8i1juUgF2FLyU2y6B4g8K+oXAUKqPiMYBzBkxQ1KABkDAUKw/2OO 3w7gj8E1vxaLDiCQl3XzeXx63SDjVw0gOZTtc8qc3hEHsdh+HYHjHiK+hSiBFEsBEap2A9uaLVJT B3TcMtlzxld24xdzypxIn2djtXjkgAxOMd9yoiRFOwYtjQBeNEBygBe+7Yj2cORbLLxxAEkTfv4r qKpmQ4nhJO2W5rRF90QAAmnC21/1Cr/+3D/3lBhLAY4fApAU+vwvULx9UB9w4pN8ZFoCTYD4nzj3 21VCLutqwvgr3wuA4gKvnQIvcMDshDQw6ZjQX/PHYD/+bjWtdvM7ItwMaxwyPBAgo2lPUOY1NYHk WrPFcN8DshPt9RMgjkPnApCDMP3vv5vx9Ll+wt8FxqFjAYTxR7lfz3zHKODSd0Lr45C6v3lsBGh/ WBxh/NH0YZA/pXgv+Y6CNA6dOqB/90epPuCNbzvOVypLC844dCrAcd/bv3kDxPc9Z7h2CkSQIHw+ 7v5BwosPRAsy6AGhIfa8TgBnjdAxwTngsdADAUJ0QZA9QCQoAWQO/yJAaMcgGAc8K6xUgK25YCyf pw4I5SiMHoEtiDCVw2QPWLMIKrFvtgmqFk5JAHazNTlBJ1YtB6xBBN0YtY+AzyLMiW1WD/BRhLkx GX9rzPVfkkyLYTwFXLmBva6N17byvUERbEfYFty6ACK2xEAMEVeAR1QFWTCkZQXwEeMmuG4A/gNY uEnj99QbMQAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "fd",
        title:"Fd",
        src: "resources/img/SVG/fd.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAABGdBTUEAALGOfPtRkwAAACBjSFJN AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACXBIWXMAAA7EAAAOxAGVKw4b AAACg0lEQVR4Xu2bT1LCMBSHH56lsGA8QTmBuPcIsoSNO2/ABpaw8wau4ARwAseF5S41aVOalkCT Jq+8NHwzDFH+5X3vl8Q6OkgZEDCdCRgMBmKkR1d9QRFgWqwOWEKexL0zMIrn8PfFeG/rBGAVrIOL VFglwPfiOa0TcM/iVbQVYiyAWuF1TEUYLQHqxbdBW4AvxZvOU0uAb503mW+jAF9jrztvq2OQOjoS bgrwtfsyTTVcFdCH4gtu1aIU0Kfim+j1HiBzrakXAkLqPieYBHBUzQ1KgIqKgBDiX6/xkQBx76D7 MaySNLscbb7t4D17zTvsKt9PYBVnD3QGsQREMD/IQlLY5aacIjcbTcB+lv8SU32bwlY8r+QE6wl7 bLJmo5KXTQoJYizo7QHHBQyZpMm61BDNP8WScQ/ZTfC4WMJejFkO4AMpBZkAHkt6bOG7NADR6FmM 3EI2AZytbGA4ZueMO4qmkxZQIRoBRgbQBPDdWz7O8lv353wTaALUx+AQFkfxBCL4swROf/Ajhi4h LSAeD8WIkfwCRngIC4jh7TUSYx4AjP4TFhCvvmB+rn8PS6TNg6CA/ArxUFbPNlTVtYMd/FTiZAKK L+5LcSW4YT/4FuQXSFPX1UsQTMAeZh0em+e/D+AfGBKVJRAyQQqQ97yzABobYfcEl4B6oysCQkzB YxMU90GgSviFgNCWQTAJuNZYpYC+peBWPVcTEMpSuLkE+iChqYbGPcBnCTpz7+0mqNs4LQH8zXxK gslcjRLggwTTORovAcoS2syt1R5AUULbOXn9X2Mc22ZYnwL3SgP/XBefbZ2AOtiJcC3cuQAZVzIQ p4groI6ukA6n1K0Ailhvgn4D8A/QDSsvmHmWFwAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "hour",
        title:"Hour",
        src: "resources/img/SVG/hour.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAzBJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggJkprD4AAotgAgABiYUgGlmUMvyFlGoRmBeLfSHwwzQrVABOBMQECiInBG81IVlYEiQWwwgkQ yc0AEEBMDFYYan4DARatvyHirGAXQZmWDAABxMQghG7Db4jzsDvhNypTggEggFhIDDNWJGuASJ0B IIBYUMSJ0QvSCfYGiPWHASCASI1GSOj8hsXWSwaAAGJiuAMPoN+E9P5GOBXKOccAEEBMDKdIsR9i Ais8GVxgAAggJoYJ6GpY0dIUcgD9RgoPVnBJABBA4MyEkhKRkxwrss0wE38jhScbA0AAMeENpt/Y Ip8VJgAmAQKI4uwMEEBAF3wnX78LAwNAAAFdwP+aAgcwAAQQ0AUfyda/C4gBAghUKuufpqBeAAgg iisWgAACR+M18vR7ggiAAAK7gPk72Q5gAAggsAv+/iRHfwGYBAggSPuA8yO5DmAACCBIUv4uSq5+ BoAAguYF0l2wG0oDBBAsM7GRGI51sNoAIIAYsbZfCYK9njAWQAAhDGAkISoumsKZAAGEKA/+sxGt /xhCPwNAADHiaoXjAf/ZkTgAAYRSIrEVEaNfEVk/A0AAMaPInVLXJqhf8yEKFyCA0MrEGLa9+LVn sKF1KwACCLPbh6/j84sHQwgggLCUymxsk7Frd2DD1M8AEEC4kM0e1I7vJFx6AQIIH/Lbdxuo9dvZ tSZ4FAEEEMUIIIAoRgABBgBV4MGgz9Ke/wAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "hy",
        title:"Hysteresis",
        src: "resources/img/SVG/hy.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAsNJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAsQLyOQHLHmZwF3zMwAAQQIw4HEGXACTsGBoAAAoZBK9kBaAHEAAHEiCME2PDlQDjY HMwAEECUGQBUBhBATJTWHgABRLEBAAHExJBMmQEAAcTE4E2Jdm4GgABiYrCixABLBoAAYmIQosQA CQaAAKIwENUZAAKIQgP+MAAEEIUGvGQACCAmhjuUGHCOASCAmBhOUWLABQaAAGJimECJAb8YAAKI 4swEEEAU5wWAAKLYAIAAAhrwnXzdLgwMAAEEDAP+18SWgdhCCiCAgC74SLYDdgExQACBSmX902S6 AKQJIIAorlgAAggcC9fI0+8JIgACCOwC5u9kO4ABIIDALvj7kxz9BWASIIAg7QPOj+Q6gAEggCAp 8bsoufoZAAIImpRJd8FuKA0QQLC8wEZiONbBagOAAGIkkF9xgL2eMBZAACEMYCQhKi6awpkAAYTI zv/ZiNZ/DKGfASCAGAmXOhjgPzsSByCAUAoUtiJi9Csi62cACCBmFLlT6toE9Ws+ROECBBBakRbD the/9gw2tG4FQABhdvvwdXx+8WAIAQQQZqH6m41tMnbtDmyY+hkAAggXstmD2vGdhEsvQADhQ377 bgO1fju71gSPIoAAohgBBBDFCCDAABiWhvXrKVx4AAAAAElFTkSuQmCC",
        Img_1: ""
    },
    {
        name: "lock",
        title:"Lock",
        src: "resources/img/SVG/lock.svg",
        Img_0: "data:image/png;base64,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::",
        Img_1: ""
    },
    {
        name: "logic",
        title:"Logic",
        src: "resources/img/SVG/logic.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAABGdBTUEAALGOfPtRkwAAACBjSFJN AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACXBIWXMAAA7EAAAOxAGVKw4b AAADWUlEQVR4Xu2bPXajMBDHhz1LcOHnE+ATrNOkyhFw63tsg9scIdU2sW/gE+S5CL4LkUASgxCg D8CA+L1HELYYZv4ajZQ4DjICeMxoAgRBwFp6jDUugwhgGqwOQwnyh517Y4jgKdTuELZ7yYChgu6i j6xwEuBZgcu4CGE9BaYSPMXFF+MMmFLgKkyzwSgDph68DdoCzCV4Uz+1BJjbyJv42ynAXNNe12/r VWAO6IjQKsBcRx/TFUOjAEsIntMWi1KAJQXfxaJrAKZpUGsC+DT6FG8ygKIaXK8EUFERwIf0l2Nc M4CdvSt+HC8zAA/2OgXY2VtWAegPXwsgxdsM4IO+TgF29pZVAHauEiWQZln+IUN2idmL7cQX1r9y XEB5d3zR70tB/qRJxF5UgP0WRwptt9BO9KOU6hElGTFUcInr70tHlIjeRX+ihiBNMvL8sj+2Td+T r3FfxT1EgPr7Uh/iRBZDlJVupRkRoXYPpQcBYvI4BgoAi0KSSPQvtaFOyn3VjuoIUNpFNjruo7jX gPgN/rLm4+sTbqx9+/yCB2uHW56DMbzxztf/8MGaZd8XeH1vy9cmsN1/cBJO3CFlzZfNjrWq9FoE 0zt/MkH18GgLYdGCx883axFuJwjJukzX5lB4b0CTXSLxgdkNDlzuAjL4+TkXgF/YEG35o1sIt5CP 625DxngAHOw+dxlUrAatVX4AxhEgvYvaMDWcBbjd+UzHxY6A5qXg+0cUxpyPQzE/gyNc2UtWyHYF EZAFpsiuNCmmoYR7BqCHVyotmpeiMOHC+PpeOqQSy4Qmu7CDDXcCZSEVREAuBPQyP4z2AaoNR/Mm BO+R+P4A7xmU67zRPkBtF+9FMN0CNIGFaelfdxhtnBTYClAVXQL5KlOZAuSatQzJ1/E9nCsT8QHn vWpdL9bmI5r0j/NRuteGG5zCAPaSoeuxvgfA1P5LbOl/HZIH+bn7gJFRZXhNAOtpMFO8yYCmgVUK sLQsaIunMQN8mQqtU2AJInTF0FkD5iyCju+LLYK6A6clADU2p0ww8dUoA+YggqmPxlNgyiLY+GZV A6Yogq1Pzt8ae/YvT66D4bwKPCsb6HP7eHYv3xvEDJ0RfQveuwCYvsQY0MVhBZDRFWREl8YVYIo4 F8F5A/AL92q26OLem8sAAAAASUVORK5CYII:",
        Img_1: ""
    },



    {
        name: "pid",
        title:"Pid",
        src: "resources/img/SVG/pid.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAYAAABhNaJ7AAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAACe0lEQVR42mL8//8/w0gGAAHEQi+LGBkZSQppYMQw0sNdAAHESIsUQKpnBzJAAAKI6gFAC8/T MiAAAogqAUBrT9MyMAACiKIAGCiPUzMgAAKIaah7nlK3AAQQySlgMHmcGqkBIICYhpPnyQEAAcQ0 3DxPqjsBAohpOMY8Ke4FCCCm4ZrsiXU3QAAxMQxjQEwgAAQQ03Av9Aj5ASCAmEZCiY/PLwABxDRS qjtcACCAmEaKR3FFKkAAMY3k2AcBgABiGkmexRa5AAE0ogIAGwAIIKaRlvzR/QgQQCM+BQAEENNI LfxgACCARmQKQI5sgAAa8VkAIIBGfAAABBBVJkaIGVYDJjucemBy5JhDKQAIICZ6FYDUmn+g9jwG QADRNQsMpkCARTpAAFF9bhBbEiXHwdQyhxAACKAhWwhSKzAAAmhIBQC1C0AQAAgglsEaM/QCAAHE NNRjkFIAEEBMI9nzIAAQQCwjxaO4AEAAjdimMGwSFSCAmJA5Q6nqo1ZKAwgglqHgWVoCgAAaklmA muUMQACxjFSPwwBAAMFXiIykITHkMg8ggJiwCY4kABBAI64aRI9ogABiwic5EgBAAI34MUGAAGIa yckfBAACiIkYRcMZAAQQ00iOfRAACCAmUhQPN8+DAEAAMZGjaTgBgABiIjfkhkPsgwBAADFRasBQ 9jwIAATQsC0EiY04gAAiabn8UOkwkZJqAQKIiVYGDwXPgwBAADHR2oLB7HkQAAggJnpZNBg9DwIA AUTxrrGBLhcojQyAABqy2+aolQoBAmjEb5wECCBGWg4/UyswaFnmAAQQIz1nc4kNEHoWsgABxDjS t88DBNCIHxIDCDAAZ9bfWoFCSVQAAAAASUVORK5CYII:",
        Img_1: ""
    },
    {
        name: "pulse",
        title:"Pulse",
        src: "resources/img/SVG/pulse.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAxNJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/kgiwECiJECB4CdABBAQBe0UlT0AgQQIyUOYNgczAAQQJQZAPQDQAAxUVp7 AAQQC7QwglC/wczfUKHfcDZcyW+EWgiHASCAmBiSkQs13Dax4lAAEEAsDN7IlrP+xqkfSQFCEfdX gABiYrBCqPpNyMMYCiwZAAKIhUGIKB9A3YBuggQDQACxoGrG6YbfrGAlv9GCXJ0BIICY8DsRSeo3 Njf+YQAIIBai/Q9SgRGILxkAAoiJ4Q5R6YWVFast5xgAAoiJ4RT2KGfFJooheIEBIIAYGQxOISU/ ZK2/sTF/o6ZENgaAAIJmJmQDkCIEyQDsSZmNASCAKM6NAAFEcW4ECCCgAd/J1+3CwAAQQEAv8L+m pEwECCCgCz6SrX8XEAMEEKhU1j9NQb0AEEAUVywAAQSOhWvk6fcEEQABBHYB83eyHcAAEEBgF/z9 SY7+AjAJEECQ9gHnR3IdwAAQQJCU+F2UXP0MAAEETcqku2A3lAYIIFheYCMxHOugtQEDQAAxYm2/ EgR7PWEsgABCGMBIQlRcNIUzAQIIkZ3/sxGt/xhCPwNAADHiaoXjAf/ZkTgAAYRSoLAVEaNfEVk/ A0AAMaPInVLXJqhf8yEKFyCA0Iq0GLa9+LVnsKF1KwACCLPbh6/j84sHQwgggDAL1d9sbJOxa3dg w9TPABBAuJDNHtSO7yRcegECCB/y23cbqPXb2bUmeBQBBBDFCCCAKEYAAQYAXsSlMm/W424AAAAA SUVORK5CYII:",
        Img_1: ""
    },

    {
        name: "Switch",
        title:"Switch",
        src: "resources/img/SVG/Switch.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAzJJ REFUeNpiYKAQAAQQHmS1+hcUTFbErQoggLAjgQO/MEArdqUAAcSITfCpKFa1W4KwCAIEEKYBLtvw Oe0bughAAKEb4LaFgO94fqHyAQKICZX7gpB+hi89qHyAAEJxgf9qooIYxREAAYRsAOtXIiOJDYkN EEBIXlAkVj8DsgsAAgjhAtm7xKeTfxxwJkAAwQ1g+UZSUoP7AiCA4F4gTT/DURgDIIAYsXiLKPBe HEIDBBDUBbdJzmqCThAaIIAgLlC/TEZuhQQDQAAxkucBhAkAAQT2ggQFpQZAAIENeESeXrC/AQKI kXwfQPwAEEAgF6wj1/mCQAwQQIwUOIDhhB0DA0AAAV3QSnYAWgAxQAAxUuAABobNwQwAAUSZAcBg BAggFkxBVjD5G8r8DRfEYIEBQAAxYWhnRaOxGo8AAAHExJCMx4W/kbWxYoiCAEAAMTF4Y1jwGwiw 2IUNcDMABBATgxVWa3/jdAwKsGQACCAmBiEcgQh2xW9k17NiBqEEA0AAYYkFdEX4gDoDQAAxYXcp KysrUQb8YQAIIIxo/P0bLT6BDgI76Te2SHzJABBATAx3MI34jSPsWDFEzjEABBATwyls8U9sPF5g AAggJoYJqOmQFW+0YVZyAAGElplYGTDSPCtyzkA3mI0BIICYMCOBFWuaxwUAAghHOiDeFwABBHTB dxwp9jeC+o3GgrenGBgAAggYBvyvsTrgN2bCZMUMAgaAAAJ64SOBbPMbp8wuIAYIIFCprH+agnoB IIAorlgAAggcjdfI0+8JIgACCOwC5u/k184AAQR2wd+f5OgvAJMAAQRpH3B+JLuBARBAkKT8XZRc /QwAAQTNC6S7YDeUBgggWGZiIzEc62C1AUAAMWJtvxIEez1hLIAAQhjASEJUXDSFMwECCFEe/Gcj Wv8xhH4GgABixNUKxwP+syNxAAIIpURiKyJGvyKyfgaAAGJGkTulrk1Qv+ZDFC5AAKGViTFse/Fr z2BD61YABBBmtw9fx+cXD4YQQAAxYVYqbGyTsWt3YMPUzwAQQLiQzR7Uju8kXHoBAggf8tt3G6j1 29m1JngUAQQQxQgggChGAAEGAPwfseRyGN9+AAAAAElFTkSuQmCC",
        Img_1: ""
    },
    {
        name: "select",
        title:"Select",
        src: "resources/img/SVG/select.svg",
        Img_0: "",
        Img_1: ""
    },
    {
        name: "SCFM",
        title:"Scfm",
        src: "resources/img/SVG/SCFM.svg",
        Img_0: "",
        Img_1: ""
    },
    {
        name: "scale",
        title:"Scale",
        src: "resources/img/SVG/scale.svg",
        Img_0: "",
        Img_1: ""
    },
    {
        name: "buffer",
        title:"Buffer",
        src: "resources/img/SVG/buffer.svg",
        Img_0: "",
        Img_1: ""
    },

    {
        name: "NOT",
        title:"Not",
        src: "resources/img/SVG/NOT.svg",
        Img_0: "",
        Img_1: ""
    },
    {
        name: "Integer",
        title:"Integer",
        src: "resources/img/SVG/Integer.svg",
        Img_0: "",
        Img_1: ""
    },
    {
        name: "doubleBO",
        title:"DoubleBo",
        src: "resources/img/SVG/doubleBO.svg",
        Img_0: "",
        Img_1: ""
    }
]
var typeicon = [

    {
        name: "AI",
        src: "resources/img/SVG/AI.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAgFJ REFUeNpi/MVAGQAIICYK9TMABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUG AAQQxQYABBDFBgAEEMUGAAQQxQYABBALMoeVgeE3iEQQIBJMgxlQmhUiCgEAAYTVBazo3N+/QWIw GgUABBATqkIUeSgfbCFYK4hGNwEggLCHASvxYQAQQFgN+I1pIisuMwECCEcssBI0EgYAAogJRRMr VOtvND4eABBAKC74/RvVJggfFm6IEEUGAAHEgt3c36woHEiCgNGIhAEEAAHESGmxDhBAFCdlgACi 2ACAAEIPAzYgJslXAAFEsQsAAghbLLCR4giAAKLYBQABhCMdgIKCOGcABBDFLgAIIBaEheSFBUAA EXABG0EDAAKIYi8ABBDFBgAEEAEDCIcBQACxoKljI007AwNAAFHsBYAAYiHf8RAAEEAUuwAggFgo sh4IAAKIhTLtDAwAAUSxFwACiIUS20EAIIAodgFAAFFsAEAAUWwAQACxYNSqv2EtFESFhspHBQAB hLeF8hulRfIb0s5AAwABRLEXAAKI4hYKQAAR2ULBDQACiAVfC4WVCMMAAogFX/OAGJcABBDFgQgQ QDgM+I3CBrXRcLkGIIAobqEABBDFXgAIIIoNAAggig0ACCCKDQAIIIoNAAggig0ACCCKDQAIMAD1 DUdocwzoUgAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "AO",
        src: "resources/img/SVG/AO.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAg1J REFUeNpi/MVAGQAIICYK9TMABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUG AAQQxQYABBDFBgAEEMUGAAQQxQYABBALMoeVgeE3iEQQIBJMgxlQmhUiCgEAAYTVBazo3N+/QWIw GgUABBATqkIUeSgfbCFYK4hGNwEggLCHASvxYQAQQFgN+I1pIisuMwECCEcssBI0EgYAAogJRRMr VOtvND4eABBAKC74/RvVJggfFm6IEEUGAAHEgt3c36woHEiCgNGIhAEEAAHESGmxDhBAFCdlgACi 2ACAAGIhRTEbEKN7GSCAKHYBQACxkKqBDc0RAAFEsQsAAoiFDD2goIA7AyCAKHYBQACxEGUdnrAA CCBKXAA2GyCAKPYCQABRbABAAFFiADgMAAKIhShV2AIUKgEQQBR7ASCAWMh3PAQABBDFLgAIIBaK rAcCgABioUw7AwNAAFHsBYAAYqHEdhAACCCKXQAQQBQbABBAFBsAEEAsaDUqUguFFbmO+o0uDNME EEAsaO0J1t9INTK0IgRpRIj/Rq0fAQKICUU/ZgOEIAAIIIrDACCAKDYAIICISUis+JooAAFEjAG/ 8UkCBBATSqBjNkAIAoAAYsHREME0CIcwQABR3EIBCCCKYwEggCg2ACCAKDYAIIAoNgAggCg2ACCA KDYAIIAoNgAgwABOuU57dfvcgAAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "AV",
        src: "resources/img/SVG/AV0.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAQAAADLPGrwAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAACEklEQVR42mJk+M8woAAggJgYBhgABNCAOwAggAbcAQABNOAOAAigAXcAQAANuAMAAmjAHQAQ QAPuAIAAGnAHAATQgDsAIIAG3AEAATTgDgAIoAF3AEAADbgDAAJowB0AEEAD7gCAABpwBwAE0IA7 ACCAWLAJQlppjHA2NhamKKpuZFFMEQQACCCiQoCUZiPEQYxIujBFkAFAADHhMgK3tfjkEeEBU4Es gi0EAAKIiXh/0QYABBBRDmCkgkX/wRATAAQQEylxSwnA5QmAAGLCbtF/NEsZCciTDwACiAm7axnx BjtueUYUxzESSM4gABBALMQH4X+C0cMIVfcfJdQwRZABQAAxDnTfECCABrwoBgigAXcAQAANuAMA AmjAHQAQQAPuAIAAGnAHAATQgDsAIIAG3AEAATTgDgAIoAF3AEAADbgDAAJowB0AEEAsDARafsg8 3K1h9Lbzf6LbUwABxIKv+v2Ps+lNvYYcQACREAWEWsvkAYAAGvA0ABBATPiD8D/ZEQBrBxMKL4AA YqGd34hzNEAAkdgsp15rGAYAAoiJkB/+ozQvGanSSUEGAAFEURT8R3LYf4w+8H+iogIggAa8VQwQ QAOeDQECaMAdABBAA+4AgAAacAcABNCAOwAggAbcAQABNOAOAAigAXcAQAANuAMAAmjAHQAQQAPu AIAAGnAHAATQgDsAIIAG3AEAAQYA94REhLujI0EAAAAASUVORK5CYII:",
        Img_1: ""
    },
    {
        name: "BI",
        src: "resources/img/SVG/DI.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAftJ REFUeNpi/MVAGQAIICYK9TMABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUG AAQQxQYABBALEpsVRPwG0b8hnN8gJlgUzITLIQOAAEJ1we/fEFPACqFsIA3GOABAAKF7AaoLbBGK NlYGuOEoACCAKA4DgABiwS0F8TQhABBAeFzwmygXAAQQsV5ghSF0ABBATBgKfyOFJWoMYXUSQACx 4PD2b1ZcQcCK6juAAGKktEwECCCKoxEggCg2ACCAKDYAIIAoNgAggLCkRDYgJj5oAQKIYhcABBCO vMBGtCMAAohiFwAEEO7cCAoKIpwBEEAUuwAggFhQLCQjLAACiLAL2PBLAwQQEV7AbwJAABFhAH4/ AAQQE4X6GQACiAVTHRsJ2hkYAAKI4mgECCAW8h0PAQABRLELAAKIhSLrgQAggFgo087AABBAFHsB IIBYKLEdBAACiGIXAAQQxQYABBALRtUIbeAgNW1Q+WgAIICYcNR+sOqUFbn5g62pAxBAFHsBIICY GPA4gRgAEEBMZDdNoAAggFgYcDuBlRjDAAIIqwG4QhwbAAggigMRIICYCDbQgFHJyorbNQABRHET ByCAKPYCQABRbABAAFFsAEAAUWwAQABRbABAAFFsAEAAUWwAQABRbABAAFFsAECAAQCcBUM4eoe8 jgAAAABJRU5ErkJggg::",
        Img_1: ""
    },
    {
        name: "BO",
        src: "resources/img/SVG/DO.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAD7+/v8/Pz9/f3+/v7///82tC/HAAAAAXRSTlMAQObYZgAAAgJJ REFUeNpi/MVAGQAIICYK9TMABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUGAAQQxQYABBDFBgAEEMUG AAQQxQYABBALEpsVRPwG0b8hnN8gJlgUzITLIQOAAEJ1we/fEFPACqFsIA3GOABAAKF7AaoLbBGK NlYGuOEoACCAKA4DgABiwS0F8TQhABBAeFzwmygXAAQQsV5ghSF0ABBATBgKfyOFJWoMYXUSQACx 4PD2b1ZcQcCK6juAAGKktEwECCCKoxEggCg2ACCAKDYAIIAoNgAggCg2ACCAWEhRzAbE6LEGEEAU uwAggFhI1cCG5giAAKLYBQABxEKGHlBQwJ0BEEAUuwAggFiIsQ1fWAAEECUuABsOEEAUewEggCg2 ACCAKDEAHAYAAcRCjCKsIQqVAQggir0AEEAs5DseAgACiGIXAAQQC0XWAwFAALFQpp2BASCAKPYC QACxUGI7CAAEEMUuAAggig0ACCCKDQAIIIoNAAggFiwVL7SVBmufIZppKMJQPQABxILejmL9jdLg +g1r+iHEf6O09QACiAmtbYG9KYYHAAQQxWEAEEAUGwAQQESlRFY8bTaAACLKAHwNPoAAYkJr5bIS 2TyEA4AAQnYBrGUGpjENwi4MEEAUt9IAAojiWAAIIIoNAAggig0ACCCKDQAIIIoNAAggig0ACDAA 48VJS6EvLe4AAAAASUVORK5CYII:",
        Img_1: ""
    },
    {
        name: "BV",
        src: "resources/img/SVG/DV.svg",
        Img_0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAACXBIWXMAAAOLAAADiwF1yxf7AAAA BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG AAADAFBMVEUAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8Q EBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIj IyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2 NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJ SUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tc XFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5v b29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGC goKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSV lZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eo qKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7 u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3O zs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh 4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P0 9PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////isF19AAABt0lEQVR42mJgoBAABBDF CCCAKEYAAUQxAgggihFAAFGMAAKIYgQQQBQjgACiGAEEEMUIIIAoRgABRDECCCCKEUAAUYwAAohi BBBAFCOAAKIYAQQQxQgggChGAAHEiMT+DxX4DyFAbCDzP1Tdf4QcMgAIICZU4xghpoAVQtlAGoxx AIAAYsJw0X+ofjRt/xnghqMAgABiojQMAAKIBbcUxNOEAEAAMREXvrgBQAAR64X/MIQOAAKICUMh I1JYosYQVicBBBALDm8z/scVBP9RfQcQQBQjgACiGAEEEMUIIIAoRgABRDECCCCKEUAAUYwAAohi BBBAFCOAAKIYAQQQxQgggChGAAFEMQIIIEYseRlSFDMi8xmQy2cUABBAKNkZmIexldx4CymAAGLC Uf5gL4KxAIAAorhUBgggJoxaAY8PGP7//4/uMIAAYiE/yCEAIICYSCqCsQCAAGLCrNkYcRfBWABA ALEQrA6Ahv2HlcRYSmSAAKIYAQQQxQgggChGAAFEMQIIIIoRQABRjAACiGIEEEAUI4AAohgBBBDF CCCAKEYAAUQxAgggihFAAFGMAAKIYgQQYABBxjIyXEyFmwAAAABJRU5ErkJggg::",
        Img_1: ""
    }];


Ext.define("program.store.SvgImgs", {
    extend: "Ext.data.JsonStore",
    fields: ["name"],
    data: Imgs
});

