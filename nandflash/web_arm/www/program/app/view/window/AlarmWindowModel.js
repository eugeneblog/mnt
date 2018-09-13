Ext.define('program.view.window.AlarmWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.window-alarmwindow',
    data: {
        "high_limit": 100,
        "low_limit": 0,
        "delay_time": 10,
        "deadband": 0,
        "notification_class": 1,
        "limit": 0,
        "event_enable": 0
    },
    getLimitValue: function (checked1, checked2) {
        var num = 0;
        if (checked1 & checked2)
            num = 11;
        if (checked1 & !checked2)
            num = 10
        if (!checked1 & checked2)
            num = 1
        this.set('limit', num)
    },
    getEventValue: function (checked1, checked2, checked3) {
        var num = 0;
        if (checked1)
            num += 100
        if (checked2)
            num += 10
        if (checked3)
            num += 1


        console.log(num)
        this.set('event_enable', num)
    },
    formulas: {

        ck1: {
            get: function (get) {
                var limit = get('limit')
                if (parseInt(limit) >= 10)
                    return true;
                return false;
            },
            set: function (value) {
                var checked1 = value;
                var checked2 = this.get('checked2').checked
                console.log(this)
                this.getLimitValue(checked1, checked2)
            }
        },
        ck2: {
            get: function (get) {
                var limit = get('limit')
                if (parseInt(limit) == 1 || parseInt(limit) == 11)
                    return true;
                return false;
            },
            set: function (value) {
                var checked1 = this.get('checked1').checked;
                var checked2 = value
                this.getLimitValue(checked1, checked2)
            }

        },
        ck3: {
            get: function (get) {
                var event = get('event_enable')
                console.log("getck3  " + event)
                if (parseInt(event) >= 100)
                    return true;
                return false;
            },
            set: function (value) {
                var checked1 = value;
                var checked2 = this.get('checked4').checked
                var checked3 = this.get('checked5').checked
                this.getEventValue(checked1, checked2, checked3)
            }
        },
        ck4: {
            get: function (get) {
                var event = get('event_enable') + ""
                console.log("getck4  " + event.substr(1, 1))
                if (parseInt(event) & 10)
                    return true;
                return false;
            },
            set: function (value) {
                var checked1 = this.get('checked3').checked
                var checked2 = value
                var checked3 = this.get('checked5').checked
                this.getEventValue(checked1, checked2, checked3)
            }
        },
        ck5: {
            get: function (get) {
                var event = get('event_enable')
                console.log("getck5  " + event)
                if (parseInt(event) & 1)
                    return true;
                return false;
            },
            set: function (value) {
                var checked1 = this.get('checked3').checked
                var checked2 = this.get('checked4').checked
                var checked3 = value
                this.getEventValue(checked1, checked2, checked3)
            }
        }


    }


});

