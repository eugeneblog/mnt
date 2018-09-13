Ext.define('program.view.window.AttributeTableWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.window-attributetablewin',
    data: {
        name: 'program',
        bol: "en",
    },
    formulas: {
        treestore: function (get) {
            if (get("bol")=="en") {
                return this.storeInfo.en
            } else {
                return this.storeInfo.zh
            }
        }

    },
    stores: {
        en: Ext.create("Ext.data.TreeStore", {
            root: {
                expanded: true,
                children: [
                    {
                        text: "Acceleration", leaf: false, children: [
                        {text: "METERS PER SECOND PER SECOND  ", qtip: "166", leaf: true},
                    ]
                    },
                    {
                        text: "Area", leaf: false, children: [
                        {text: "SQUARE METERS  ", qtip: "0", leaf: true},
                        {text: "SQUARE CENTIMETERS  ", qtip: "116", leaf: true},
                        {text: "SQUARE FEET  ", qtip: "1", leaf: true},
                        {text: "SQUARE INCHES  ", qtip: "115", leaf: true},
                    ]
                    },

                    {
                        text: "Currency", leaf: false, children: [
                        {text: "CURRENCY1  ", qtip: "105", leaf: true},
                        {text: "CURRENCY2  ", qtip: "106", leaf: true},
                        {text: "CURRENCY3  ", qtip: "107", leaf: true},
                        {text: "CURRENCY4  ", qtip: "108", leaf: true},
                        {text: "CURRENCY5  ", qtip: "109", leaf: true},
                        {text: "CURRENCY6  ", qtip: "110", leaf: true},
                        {text: "CURRENCY7  ", qtip: "111", leaf: true},
                        {text: "CURRENCY8  ", qtip: "112", leaf: true},
                        {text: "CURRENCY9  ", qtip: "113", leaf: true},
                        {text: "CURRENCY10  ", qtip: "114", leaf: true},
                    ]
                    },
                    {
                        text: "Electrical", leaf: false, children: [
                        {text: "MILLIAMPERES  ", qtip: "2", leaf: true},
                        {text: "AMPERES  ", qtip: "3", leaf: true},
                        {text: "AMPERES PER METER  ", qtip: "167", leaf: true},
                        {text: "AMPERES PER SQUARE METER  ", qtip: "168", leaf: true},
                        {text: "AMPERE SQUARE METERS  ", qtip: "169", leaf: true},
                        {text: "DECIBELS  ", qtip: "199", leaf: true},
                        {text: "DECIBELS MILLIVOLT  ", qtip: "200", leaf: true},
                        {text: "DECIBELS VOLT  ", qtip: "201", leaf: true},
                        {text: "FARADS  ", qtip: "170", leaf: true},
                        {text: "HENRYS  ", qtip: "171", leaf: true},
                        {text: "OHMS  ", qtip: "4", leaf: true},
                        {text: "OHM METERS  ", qtip: "172", leaf: true},
                        {text: "MILLIOHMS  ", qtip: "145", leaf: true},
                        {text: "KILOHMS  ", qtip: "122", leaf: true},
                        {text: "MEGOHMS  ", qtip: "123", leaf: true},
                        {text: "MICROSIEMENS  ", qtip: "190", leaf: true},
                        {text: "MILLISIEMENS  ", qtip: "202", leaf: true},
                        {text: "SIEMENS  ", qtip: "173", leaf: true},
                        {text: "SIEMENS PER METER  ", qtip: "174", leaf: true},
                        {text: "TESLAS  ", qtip: "175", leaf: true},
                        {text: "VOLTS  ", qtip: "5", leaf: true},
                        {text: "MILLIVOLTS  ", qtip: "124", leaf: true},
                        {text: "KILOVOLTS  ", qtip: "6", leaf: true},
                        {text: "MEGAVOLTS  ", qtip: "7", leaf: true},
                        {text: "VOLT AMPERES  ", qtip: "8", leaf: true},
                        {text: "KILOVOLT AMPERES  ", qtip: "9", leaf: true},
                        {text: "MEGAVOLT AMPERES  ", qtip: "10", leaf: true},
                        {text: "VOLT AMPERES REACTIVE  ", qtip: "11", leaf: true},
                        {text: "KILOVOLT AMPERES REACTIVE  ", qtip: "12", leaf: true},
                        {text: "MEGAVOLT AMPERES REACTIVE  ", qtip: "13", leaf: true},
                        {text: "VOLTS PER DEGREE KELVIN  ", qtip: "176", leaf: true},
                        {text: "VOLTS PER METER  ", qtip: "177", leaf: true},
                        {text: "DEGREES PHASE  ", qtip: "14", leaf: true},
                        {text: "POWER FACTOR  ", qtip: "15", leaf: true},
                        {text: "WEBERS  ", qtip: "178", leaf: true},
                    ]
                    },
                    {
                        text: "Energy", leaf: false, children: [
                        {text: "JOULES  ", qtip: "16", leaf: true},
                        {text: "KILOJOULES  ", qtip: "17", leaf: true},
                        {text: "KILOJOULES PER KILOGRAM  ", qtip: "125", leaf: true},
                        {text: "MEGAJOULES  ", qtip: "126", leaf: true},
                        {text: "WATT HOURS  ", qtip: "18", leaf: true},
                        {text: "KILOWATT HOURS  ", qtip: "19", leaf: true},
                        {text: "MEGAWATT HOURS  ", qtip: "146", leaf: true},
                        {text: "WATT HOURS REACTIVE  ", qtip: "203", leaf: true},
                        {text: "KILOWATT HOURS REACTIVE  ", qtip: "204", leaf: true},
                        {text: "MEGAWATT HOURS REACTIVE  ", qtip: "205", leaf: true},
                        {text: "BTUS  ", qtip: "20", leaf: true},
                        {text: "KILO BTUS  ", qtip: "147", leaf: true},
                        {text: "MEGA BTUS  ", qtip: "148", leaf: true},
                        {text: "THERMS  ", qtip: "21", leaf: true},
                        {text: "TON HOURS  ", qtip: "22", leaf: true},
                    ]
                    },
                    {
                        text: "Enthalpy", leaf: false, children: [
                        {text: "JOULES PER KILOGRAM DRY AIR  ", qtip: "23", leaf: true},
                        {text: "KILOJOULES PER KILOGRAM DRY AIR  ", qtip: "149", leaf: true},
                        {text: "MEGAJOULES PER KILOGRAM DRY AIR  ", qtip: "150", leaf: true},
                        {text: "BTUS PER POUND DRY AIR  ", qtip: "24", leaf: true},
                        {text: "BTUS PER POUND  ", qtip: "117", leaf: true},
                    ]
                    },
                    {
                        text: "Entropy", leaf: false, children: [
                        {text: "JOULES PER DEGREE KELVIN  ", qtip: "127", leaf: true},
                        {text: "KILOJOULES PER DEGREE KELVIN  ", qtip: "151", leaf: true},
                        {text: "MEGAJOULES PER DEGREE KELVIN  ", qtip: "152", leaf: true},
                        {text: "JOULES PER KILOGRAM DEGREE KELVIN  ", qtip: "128", leaf: true},
                    ]
                    },
                    {
                        text: "Force", leaf: false, children: [
                        {text: "NEWTON  ", qtip: "153", leaf: true},
                    ]
                    },
                    {
                        text: "Frequency", leaf: false, children: [
                        {text: "CYCLES PER HOUR  ", qtip: "25", leaf: true},
                        {text: "CYCLES PER MINUTE  ", qtip: "26", leaf: true},
                        {text: "HERTZ  ", qtip: "27", leaf: true},
                        {text: "KILOHERTZ  ", qtip: "129", leaf: true},
                        {text: "MEGAHERTZ  ", qtip: "130", leaf: true},
                        {text: "PER HOUR  ", qtip: "131", leaf: true},
                    ]
                    },
                    {
                        text: "Humidity", leaf: false, children: [
                        {text: "GRAMS OF WATER PER KILOGRAM DRY AIR  ", qtip: "28", leaf: true},
                        {text: "PERCENT RELATIVE HUMIDITY  ", qtip: "29", leaf: true},
                    ]
                    },
                    {
                        text: "Length", leaf: false, children: [
                        {text: "MICROMETERS  ", qtip: "194", leaf: true},
                        {text: "MILLIMETERS  ", qtip: "30", leaf: true},
                        {text: "CENTIMETERS  ", qtip: "118", leaf: true},
                        {text: "KILOMETERS  ", qtip: "193", leaf: true},
                        {text: "METERS  ", qtip: "31", leaf: true},
                        {text: "INCHES  ", qtip: "32", leaf: true},
                        {text: "FEET  ", qtip: "33", leaf: true},
                    ]
                    },

                    {
                        text: "Light", leaf: false, children: [
                        {text: "CANDELAS  ", qtip: "179", leaf: true},
                        {text: "CANDELAS PER SQUARE METER  ", qtip: "180", leaf: true},
                        {text: "WATTS PER SQUARE FOOT  ", qtip: "34", leaf: true},
                        {text: "WATTS PER SQUARE METER  ", qtip: "35", leaf: true},
                        {text: "LUMENS  ", qtip: "36", leaf: true},
                        {text: "LUXES  ", qtip: "37", leaf: true},
                        {text: "FOOT CANDLES  ", qtip: "38", leaf: true},
                    ]
                    },

                    {
                        text: "Mass", leaf: false, children: [
                        {text: "MILLIGRAMS  ", qtip: "196", leaf: true},
                        {text: "GRAMS  ", qtip: "195", leaf: true},
                        {text: "KILOGRAMS  ", qtip: "39", leaf: true},
                        {text: "POUNDS MASS  ", qtip: "40", leaf: true},
                        {text: "TONS  ", qtip: "41", leaf: true},
                    ]
                    },
                    {
                        text: "Mass Flow", leaf: false, children: [
                        {text: "GRAMS PER SECOND  ", qtip: "154", leaf: true},
                        {text: "GRAMS PER MINUTE  ", qtip: "155", leaf: true},
                        {text: "KILOGRAMS PER SECOND  ", qtip: "42", leaf: true},
                        {text: "KILOGRAMS PER MINUTE  ", qtip: "43", leaf: true},
                        {text: "KILOGRAMS PER HOUR  ", qtip: "44", leaf: true},
                        {text: "POUNDS MASS PER SECOND  ", qtip: "119", leaf: true},
                        {text: "POUNDS MASS PER MINUTE  ", qtip: "45", leaf: true},
                        {text: "POUNDS MASS PER HOUR  ", qtip: "46", leaf: true},
                        {text: "TONS PER HOUR  ", qtip: "156", leaf: true},
                    ]
                    },
                    {
                        text: "Power", leaf: false, children: [
                        {text: "MILLIWATTS  ", qtip: "132", leaf: true},
                        {text: "WATTS  ", qtip: "47", leaf: true},
                        {text: "KILOWATTS  ", qtip: "48", leaf: true},
                        {text: "MEGAWATTS  ", qtip: "49", leaf: true},
                        {text: "BTUS PER HOUR  ", qtip: "50", leaf: true},
                        {text: "KILO BTUS PER HOUR  ", qtip: "157", leaf: true},
                        {text: "HORSEPOWER  ", qtip: "51", leaf: true},
                        {text: "TONS REFRIGERATION  ", qtip: "52", leaf: true},
                    ]
                    },

                    {
                        text: "Pressure", leaf: false, children: [
                        {text: "PASCALS  ", qtip: "53", leaf: true},
                        {text: "HECTOPASCALS  ", qtip: "133", leaf: true},
                        {text: "KILOPASCALS  ", qtip: "54", leaf: true},
                        {text: "MILLIBARS  ", qtip: "134", leaf: true},
                        {text: "BARS  ", qtip: "55", leaf: true},
                        {text: "POUNDS FORCE PER SQUARE INCH  ", qtip: "56", leaf: true},
                        {text: "MILLIMETERS OF WATER  ", qtip: "206", leaf: true},
                        {text: "CENTIMETERS OF WATER  ", qtip: "57", leaf: true},
                        {text: "INCHES OF WATER  ", qtip: "58", leaf: true},
                        {text: "MILLIMETERS OF MERCURY  ", qtip: "59", leaf: true},
                        {text: "CENTIMETERS OF MERCURY  ", qtip: "60", leaf: true},
                        {text: "INCHES OF MERCURY  ", qtip: "61", leaf: true},
                    ]
                    },
                    {
                        text: "Temperatrue", leaf: false, children: [
                        {text: "DEGREES CELSIUS  ", qtip: "62", leaf: true},
                        {text: "DEGREES KELVIN  ", qtip: "63", leaf: true},
                        {text: "DEGREES KELVIN PER HOUR  ", qtip: "181", leaf: true},
                        {text: "DEGREES KELVIN PER MINUTE  ", qtip: "182", leaf: true},
                        {text: "DEGREES FAHRENHEIT  ", qtip: "64", leaf: true},
                        {text: "DEGREE DAYS CELSIUS  ", qtip: "65", leaf: true},
                        {text: "DEGREE DAYS FAHRENHEIT  ", qtip: "66", leaf: true},
                        {text: "DELTA DEGREES FAHRENHEIT  ", qtip: "120", leaf: true},
                        {text: "DELTA DEGREES KELVIN  ", qtip: "121", leaf: true},
                    ]
                    },
                    {
                        text: "Time", leaf: false, children: [
                        {text: "YEARS  ", qtip: "67", leaf: true},
                        {text: "MONTHS  ", qtip: "68", leaf: true},
                        {text: "WEEKS  ", qtip: "69", leaf: true},
                        {text: "DAYS  ", qtip: "70", leaf: true},
                        {text: "HOURS  ", qtip: "71", leaf: true},
                        {text: "MINUTES  ", qtip: "72", leaf: true},
                        {text: "SECONDS  ", qtip: "73", leaf: true},
                        {text: "HUNDREDTHS SECONDS  ", qtip: "158", leaf: true},
                        {text: "MILLISECONDS  ", qtip: "159", leaf: true},
                    ]
                    },
                    {
                        text: "Torque", leaf: false, children: [
                        {text: "NEWTON METERS  ", qtip: "160", leaf: true},
                    ]
                    },
                    {
                        text: "Velocity", leaf: false, children: [
                        {text: "MILLIMETERS PER SECOND  ", qtip: "161", leaf: true},
                        {text: "MILLIMETERS PER MINUTE  ", qtip: "162", leaf: true},
                        {text: "METERS PER SECOND  ", qtip: "74", leaf: true},
                        {text: "METERS PER MINUTE  ", qtip: "163", leaf: true},
                        {text: "METERS PER HOUR  ", qtip: "164", leaf: true},
                        {text: "KILOMETERS PER HOUR  ", qtip: "75", leaf: true},
                        {text: "FEET PER SECOND  ", qtip: "76", leaf: true},
                        {text: "FEET PER MINUTE  ", qtip: "77", leaf: true},
                        {text: "MILES PER HOUR  ", qtip: "78", leaf: true},
                    ]
                    },
                    {
                        text: "Volume", leaf: false, children: [
                        {text: "CUBIC FEET  ", qtip: "79", leaf: true},
                        {text: "CUBIC METERS  ", qtip: "80", leaf: true},
                        {text: "IMPERIAL GALLONS  ", qtip: "81", leaf: true},
                        {text: "MILLILITERS  ", qtip: "197", leaf: true},
                        {text: "LITERS  ", qtip: "82", leaf: true},
                        {text: "US GALLONS  ", qtip: "83", leaf: true},
                    ]
                    },
                    {
                        text: "Volumetric Flow", leaf: false, children: [
                        {text: "CUBIC FEET PER SECOND  ", qtip: "142", leaf: true},
                        {text: "CUBIC FEET PER MINUTE  ", qtip: "84", leaf: true},
                        {text: "CUBIC FEET PER HOUR  ", qtip: "191", leaf: true},
                        {text: "CUBIC METERS PER SECOND  ", qtip: "85", leaf: true},
                        {text: "CUBIC METERS PER MINUTE  ", qtip: "165", leaf: true},
                        {text: "CUBIC METERS PER HOUR  ", qtip: "135", leaf: true},
                        {text: "IMPERIAL GALLONS PER MINUTE  ", qtip: "86", leaf: true},
                        {text: "MILLILITERS PER SECOND  ", qtip: "198", leaf: true},
                        {text: "LITERS PER SECOND  ", qtip: "87", leaf: true},
                        {text: "LITERS PER MINUTE  ", qtip: "88", leaf: true},
                        {text: "LITERS PER HOUR  ", qtip: "136", leaf: true},
                        {text: "US GALLONS PER MINUTE  ", qtip: "89", leaf: true},
                        {text: "US GALLONS PER HOUR  ", qtip: "192", leaf: true},
                    ]
                    },
                    {
                        text: "Other", leaf: false, children: [
                        {text: "DEGREES ANGULAR  ", qtip: "90", leaf: true},
                        {text: "DEGREES CELSIUS PER HOUR  ", qtip: "91", leaf: true},
                        {text: "DEGREES CELSIUS PER MINUTE  ", qtip: "92", leaf: true},
                        {text: "DEGREES FAHRENHEIT PER HOUR  ", qtip: "93", leaf: true},
                        {text: "DEGREES FAHRENHEIT PER MINUTE  ", qtip: "94", leaf: true},
                        {text: "JOULE SECONDS  ", qtip: "183", leaf: true},
                        {text: "KILOGRAMS PER CUBIC METER  ", qtip: "186", leaf: true},
                        {text: "KW HOURS PER SQUARE METER  ", qtip: "137", leaf: true},
                        {text: "KW HOURS PER SQUARE FOOT  ", qtip: "138", leaf: true},
                        {text: "MEGAJOULES PER SQUARE METER  ", qtip: "139", leaf: true},
                        {text: "MEGAJOULES PER SQUARE FOOT  ", qtip: "140", leaf: true},
                        {text: "NO     ", qtip: "95", leaf: true},
                        {text: "NEWTON SECONDS  ", qtip: "187", leaf: true},
                        {text: "NEWTONS PER METER  ", qtip: "188", leaf: true},
                        {text: "PARTS PER MILLION  ", qtip: "96", leaf: true},
                        {text: "PARTS PER BILLION  ", qtip: "97", leaf: true},
                        {text: "PERCENT  ", qtip: "98", leaf: true},
                        {text: "PERCENT OBSCURATION PER FOOT  ", qtip: "143", leaf: true},
                        {text: "PERCENT OBSCURATION PER METER  ", qtip: "144", leaf: true},
                        {text: "PERCENT PER SECOND  ", qtip: "99", leaf: true},
                        {text: "PER MINUTE  ", qtip: "100", leaf: true},
                        {text: "PER SECOND  ", qtip: "101", leaf: true},
                        {text: "PSI PER DEGREE FAHRENHEIT  ", qtip: "102", leaf: true},
                        {text: "RADIANS  ", qtip: "103", leaf: true},
                        {text: "RADIANS PER SECOND  ", qtip: "184", leaf: true},
                        {text: "REVOLUTIONS PER MINUTE  ", qtip: "104", leaf: true},
                        {text: "SQUARE METERS PER NEWTON  ", qtip: "185", leaf: true},
                        {text: "WATTS PER METER PER DEGREE KELVIN  ", qtip: "189", leaf: true},
                        {text: "WATTS PER SQUARE METER DEGREE KELVIN  ", qtip: "141", leaf: true},
                        {text: "PER MILLE  ", qtip: "207", leaf: true},
                        {text: "GRAMS PER GRAM  ", qtip: "208", leaf: true},
                        {text: "KILOGRAMS PER KILOGRAM  ", qtip: "209", leaf: true},
                        {text: "GRAMS PER KILOGRAM  ", qtip: "210", leaf: true},
                        {text: "MILLIGRAMS PER GRAM  ", qtip: "211", leaf: true},
                        {text: "MILLIGRAMS PER KILOGRAM  ", qtip: "212", leaf: true},
                        {text: "GRAMS PER MILLILITER  ", qtip: "213", leaf: true},
                        {text: "GRAMS PER LITER  ", qtip: "214", leaf: true},
                        {text: "MILLIGRAMS PER LITER  ", qtip: "215", leaf: true},
                        {text: "MICROGRAMS PER LITER  ", qtip: "216", leaf: true},
                        {text: "GRAMS PER CUBIC METER  ", qtip: "217", leaf: true},
                        {text: "MILLIGRAMS PER CUBIC METER  ", qtip: "218", leaf: true},
                        {text: "MICROGRAMS PER CUBIC METER  ", qtip: "219", leaf: true},
                        {text: "NANOGRAMS PER CUBIC METER  ", qtip: "220", leaf: true},
                        {text: "GRAMS PER CUBIC CENTIMETER  ", qtip: "221", leaf: true},
                        {text: "BECQUERELS  ", qtip: "222", leaf: true},
                        {text: "MEGABECQUERELS  ", qtip: "224", leaf: true},
                        {text: "GRAY  ", qtip: "225", leaf: true},
                        {text: "MILLIGRAY  ", qtip: "226", leaf: true},
                        {text: "MICROGRAY  ", qtip: "227", leaf: true},
                        {text: "SIEVERTS  ", qtip: "228", leaf: true},
                        {text: "MILLISIEVERTS  ", qtip: "229", leaf: true},
                        {text: "MICROSIEVERTS  ", qtip: "230", leaf: true},
                        {text: "MICROSIEVERTS PER HOUR  ", qtip: "231", leaf: true},
                        {text: "DECIBELS A  ", qtip: "232", leaf: true},
                        {text: "NEPHELOMETRIC TURBIDITY UNIT  ", qtip: "233", leaf: true},
                        {text: "PH  ", qtip: "234", leaf: true},
                        {text: "GRAMS PER SQUARE METER  ", qtip: "235", leaf: true},
                        {text: "MINUTES PER DEGREE KELVIN  ", qtip: "236", leaf: true},
                    ]
                    },
                ]
            }
        }),
        zh: Ext.create("Ext.data.TreeStore", {
            root: {
                expanded: true,
                children: [
                    {
                        text: "加速", leaf: false, children: [
                        {text: "每秒米每秒 ", qtip: "166", leaf: true},
                    ]
                    },
                    {
                        text: "面积", leaf: false, children: [
                        {text: "平方米 ", qtip: "0", leaf: true},
                        {text: "平方厘米 ", qtip: "116", leaf: true},
                        {text: "平方英尺 ", qtip: "1", leaf: true},
                        {text: "平方英寸 ", qtip: "115", leaf: true},
                    ]
                    },

                    {
                        text: "货币", leaf: false, children: [
                        {text: "流通1 ", qtip: "105", leaf: true},
                        {text: "流通2 ", qtip: "106", leaf: true},
                        {text: "流通3 ", qtip: "107", leaf: true},
                        {text: "流通4 ", qtip: "108", leaf: true},
                        {text: "流通5 ", qtip: "109", leaf: true},
                        {text: "流通6 ", qtip: "110", leaf: true},
                        {text: "流通7 ", qtip: "111", leaf: true},
                        {text: "流通8 ", qtip: "112", leaf: true},
                        {text: "流通9 ", qtip: "113", leaf: true},
                        {text: "流通10 ", qtip: "114", leaf: true},
                    ]
                    },

                    {
                        text: "电气", leaf: false, children: [
                        {text: "毫安 ", qtip: "2", leaf: true},
                        {text: "安培 ", qtip: "3", leaf: true},
                        {text: "安培 每米 ", qtip: "167", leaf: true},
                        {text: "安培 每平方米 ", qtip: "168", leaf: true},
                        {text: "安培平方米 ", qtip: "169", leaf: true},
                        {text: "分贝 ", qtip: "199", leaf: true},
                        {text: "分贝毫伏 ", qtip: "200", leaf: true},
                        {text: "分贝伏 ", qtip: "201", leaf: true},
                        {text: "法拉 ", qtip: "170", leaf: true},
                        {text: "亨利 ", qtip: "171", leaf: true},
                        {text: "欧姆 ", qtip: "4", leaf: true},
                        {text: "欧姆表 ", qtip: "172", leaf: true},
                        {text: "毫欧 ", qtip: "145", leaf: true},
                        {text: "千欧 ", qtip: "122", leaf: true},
                        {text: "兆欧 ", qtip: "123", leaf: true},
                        {text: "微西门子 ", qtip: "190", leaf: true},
                        {text: "毫西门子 ", qtip: "202", leaf: true},
                        {text: "西门子 ", qtip: "173", leaf: true},
                        {text: "西门子每米 ", qtip: "174", leaf: true},
                        {text: "特斯拉 ", qtip: "175", leaf: true},
                        {text: "伏 ", qtip: "5", leaf: true},
                        {text: "毫伏 ", qtip: "124", leaf: true},
                        {text: "千伏 ", qtip: "6", leaf: true},
                        {text: "兆伏 ", qtip: "7", leaf: true},
                        {text: "伏安 ", qtip: "8", leaf: true},
                        {text: "千伏安 ", qtip: "9", leaf: true},
                        {text: "兆伏安 ", qtip: "10", leaf: true},
                        {text: "无功伏安 ", qtip: "11", leaf: true},
                        {text: "千伏安反应 ", qtip: "12", leaf: true},
                        {text: "兆伏安反应 ", qtip: "13", leaf: true},
                        {text: "每开尔文 伏特 ", qtip: "176", leaf: true},
                        {text: "每米的电压 ", qtip: "177", leaf: true},
                        {text: "度相 ", qtip: "14", leaf: true},
                        {text: "功率因数 ", qtip: "15", leaf: true},
                        {text: "韦伯 ", qtip: "178", leaf: true},
                        {
                            text: "热量", leaf: false, children: [
                            {text: "焦耳 ", qtip: "16", leaf: true},
                            {text: "千焦耳 ", qtip: "17", leaf: true},
                            {text: "焦 每公斤 ", qtip: "125", leaf: true},
                            {text: "兆焦耳 ", qtip: "126", leaf: true},
                            {text: "瓦特小时 ", qtip: "18", leaf: true},
                            {text: "千瓦小时 ", qtip: "19", leaf: true},
                            {text: "兆瓦小时 ", qtip: "146", leaf: true},
                            {text: "瓦特小时反应性 ", qtip: "203", leaf: true},
                            {text: "千瓦时反应性 ", qtip: "204", leaf: true},
                            {text: "兆瓦小时反应 ", qtip: "205", leaf: true},
                            {text: "热量 ", qtip: "20", leaf: true},
                            {
                                text: "热量 公斤 ", qtip: "147", leaf: true
                            },
                            {
                                text: "巨型热量 ", qtip: "148", leaf: true
                            }
                            ,
                            {
                                text: "千卡 ", qtip: "21", leaf: true
                            }
                            ,
                            {
                                text: "吨小时 ", qtip: "22", leaf: true
                            }
                            ,
                        ]
                        }

                    ]
                    },

                    {
                        text: "焓", leaf: false, children: [
                        {text: "焦耳每公斤干空气 ", qtip: "23", leaf: true},
                        {text: "焦 每公斤干空气 ", qtip: "149", leaf: true},
                        {text: "焦耳 每公斤干空气 ", qtip: "150", leaf: true},
                        {text: "英国热量单位每磅干空气 ", qtip: "24", leaf: true},
                        {text: "英国热量单位每磅 ", qtip: "117", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "熵", leaf: false, children: [
                        {text: "每开尔文 焦耳 ", qtip: "127", leaf: true},
                        {text: "每开尔文 焦 ", qtip: "151", leaf: true},
                        {text: "每开尔文 焦耳 ", qtip: "152", leaf: true},
                        {text: "每公斤开尔文 焦耳 ", qtip: "128", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "重量", leaf: false, children: [
                        {text: "牛顿 ", qtip: "153", leaf: true},

                    ]
                    }
                    ,
                    {
                        text: "频率", leaf: false, children: [
                        {text: "每小时周期 ", qtip: "25", leaf: true},
                        {text: "每分钟周期 ", qtip: "26", leaf: true},
                        {text: "赫兹 ", qtip: "27", leaf: true},
                        {text: "千赫 ", qtip: "129", leaf: true},
                        {text: "兆赫 ", qtip: "130", leaf: true},
                        {text: "每小时 ", qtip: "131", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "湿度", leaf: false, children: [
                        {text: "克水每公斤干空气 ", qtip: "28", leaf: true},
                        {text: "相对湿度百分比 ", qtip: "29", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "长度", leaf: false, children: [
                        {text: "微米 ", qtip: "194", leaf: true},
                        {text: "毫米 ", qtip: "30", leaf: true},
                        {text: "厘米 ", qtip: "118", leaf: true},
                        {text: "公里 ", qtip: "193", leaf: true},
                        {text: "米 ", qtip: "31", leaf: true},
                        {text: "英寸 ", qtip: "32", leaf: true},
                        {text: "英尺 ", qtip: "33", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "照度", leaf: false, children: [
                        {text: "烛光 ", qtip: "179", leaf: true},
                        {text: "坎德拉每平方米 ", qtip: "180", leaf: true},
                        {text: "瓦特每平方英尺 ", qtip: "34", leaf: true},
                        {text: "瓦特每平方米 ", qtip: "35", leaf: true},
                        {text: "流明 ", qtip: "36", leaf: true},
                        {text: "勒克斯 ", qtip: "37", leaf: true},
                        {text: "英尺烛光 ", qtip: "38", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "质量", leaf: false, children: [
                        {text: "毫克 ", qtip: "196", leaf: true},
                        {text: "克 ", qtip: "195", leaf: true},
                        {text: "公斤 ", qtip: "39", leaf: true},
                        {text: "磅质量 ", qtip: "40", leaf: true},
                        {text: "吨 ", qtip: "41", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "流质量", leaf: false, children: [
                        {text: "克每秒 ", qtip: "154", leaf: true},
                        {text: "每分钟克 ", qtip: "155", leaf: true},
                        {text: "每秒公斤 ", qtip: "42", leaf: true},
                        {text: "每分钟公斤 ", qtip: "43", leaf: true},
                        {text: "每小时公斤 ", qtip: "44", leaf: true},
                        {text: "每秒磅质量 ", qtip: "119", leaf: true},
                        {text: "每分钟体重 ", qtip: "45", leaf: true},
                        {text: "每小时体重 ", qtip: "46", leaf: true},
                        {text: "每小时吨 ", qtip: "156", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "电源", leaf: false, children: [
                        {text: "毫瓦 ", qtip: "132", leaf: true},
                        {text: "瓦 ", qtip: "47", leaf: true},
                        {text: "千瓦 ", qtip: "48", leaf: true},
                        {text: "兆瓦 ", qtip: "49", leaf: true},
                        {text: "英国热量单位每小时 ", qtip: "50", leaf: true},
                        {
                            text: "BTU每小时 = 公斤", qtip: "157", leaf: true
                        },
                        {
                            text: "马力 ", qtip: "51", leaf: true
                        }
                        ,
                        {
                            text: "吨制冷 ", qtip: "52", leaf: true
                        }
                        ,
                    ]
                    }
                    ,

                    {
                        text: "压力", leaf: false, children: [
                        {text: "帕斯卡 ", qtip: "53", leaf: true},
                        {text: "百帕 ", qtip: "133", leaf: true},
                        {text: "千帕斯卡 ", qtip: "54", leaf: true},
                        {text: "毫巴 ", qtip: "134", leaf: true},
                        {text: "酒吧 ", qtip: "55", leaf: true},
                        {text: "每平方英寸磅力 ", qtip: "56", leaf: true},
                        {text: "毫米的水 ", qtip: "206", leaf: true},
                        {text: "厘米水 ", qtip: "57", leaf: true},
                        {text: "英寸的水 ", qtip: "58", leaf: true},
                        {text: "毫米汞 ", qtip: "59", leaf: true},
                        {text: "厘米汞 ", qtip: "60", leaf: true},
                        {text: "英寸汞 ", qtip: "61", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "温度", leaf: false, children: [
                        {text: "摄氏度", qtip: "62", leaf: true},
                        {text: "开尔文", qtip: "63", leaf: true},
                        {text: "开尔文每小时 ", qtip: "181", leaf: true},
                        {text: "开尔文每分钟 ", qtip: "182", leaf: true},
                        {text: "华氏度 ", qtip: "64", leaf: true},
                        {text: "摄氏度 ", qtip: "65", leaf: true},
                        {text: "华氏度 ", qtip: "66", leaf: true},
                        {text: "华氏度 ", qtip: "120", leaf: true},
                        {text: "三角度 ", qtip: "121", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "时间", leaf: false, children: [
                        {text: "年 ", qtip: "67", leaf: true},
                        {text: "个月 ", qtip: "68", leaf: true},
                        {text: "周 ", qtip: "69", leaf: true},
                        {text: "天 ", qtip: "70", leaf: true},
                        {text: "小时 ", qtip: "71", leaf: true},
                        {text: "分钟 ", qtip: "72", leaf: true},
                        {text: "秒 ", qtip: "73", leaf: true},
                        {text: "百秒 ", qtip: "158", leaf: true},
                        {text: "毫秒 ", qtip: "159", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "扭矩", leaf: false, children: [
                        {text: "牛顿米 ", qtip: "160", leaf: true},
                    ]
                    }
                    ,
                    {
                        text: "速度", leaf: false, children: [
                        {text: "每第二毫米 ", qtip: "161", leaf: true},
                        {text: "每分钟毫米 ", qtip: "162", leaf: true},
                        {text: "每秒米 ", qtip: "74", leaf: true},
                        {text: "每分钟米 ", qtip: "163", leaf: true},
                        {text: "每小时米 ", qtip: "164", leaf: true},
                        {text: "每小时公里数 ", qtip: "75", leaf: true},
                        {text: "每第二英尺 ", qtip: "76", leaf: true},
                        {text: "每分钟英尺 ", qtip: "77", leaf: true},
                        {text: "每小时英里数 ", qtip: "78", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "体积", leaf: false, children: [
                        {text: "立方英尺 ", qtip: "79", leaf: true},
                        {text: "立方米 ", qtip: "80", leaf: true},
                        {text: "帝国加仑 ", qtip: "81", leaf: true},
                        {text: "毫升 ", qtip: "197", leaf: true},
                        {text: "升 ", qtip: "82", leaf: true},
                        {text: "美国加仑 ", qtip: "83", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "体积流量", leaf: false, children: [
                        {text: "每第二次立方英尺 ", qtip: "142", leaf: true},
                        {text: "每分钟立方英尺 ", qtip: "84", leaf: true},
                        {text: "每小时立方英尺 ", qtip: "191", leaf: true},
                        {text: "每秒立方米 ", qtip: "85", leaf: true},
                        {text: "每分钟立方米 ", qtip: "165", leaf: true},
                        {text: "每小时立方米 ", qtip: "135", leaf: true},
                        {text: "帝国加仑每分钟 ", qtip: "86", leaf: true},
                        {text: "每秒 毫升", qtip: "198", leaf: true},
                        {text: "升每秒 ", qtip: "87", leaf: true},
                        {text: "每分钟升 ", qtip: "88", leaf: true},
                        {text: "升每小时 ", qtip: "136", leaf: true},
                        {text: "美国加仑每分钟 ", qtip: "89", leaf: true},
                        {text: "美国加仑每小时 ", qtip: "192", leaf: true},
                    ]
                    }
                    ,

                    {
                        text: "其他", leaf: false, children: [
                        {text: "度角", qtip: "90", leaf: true},
                        {text: "每小时 摄氏度 ", qtip: "91", leaf: true},
                        {text: "摄氏度 每分钟 ", qtip: "92", leaf: true},
                        {text: "华氏度每小时 ", qtip: "93", leaf: true},
                        {text: "华氏度 华氏每分钟 ", qtip: "94", leaf: true},
                        {text: "焦耳秒 ", qtip: "183", leaf: true},
                        {text: "每立方米公斤 公斤 ", qtip: "186", leaf: true},
                        {text: "千瓦小时每平方米 ", qtip: "137", leaf: true},
                        {text: "千瓦小时每平方英尺 ", qtip: "138", leaf: true},
                        {text: "每平方米 焦耳 ", qtip: "139 ", leaf: true},
                        {text: "每平方英尺 焦耳 ", qtip: "140 ", leaf: true},
                        {text: "NO ", qtip: "95", leaf: true},
                        {text: "牛顿秒 ", qtip: "187", leaf: true},
                        {text: "牛顿 每米 ", qtip: "188", leaf: true},
                        {text: "百万分之 ", qtip: "96", leaf: true},
                        {text: "十亿分 ", qtip: "97", leaf: true},
                        {text: "百分比 ", qtip: "98", leaf: true},
                        {text: "每英尺 分的蒙昧 ", qtip: "143", leaf: true},
                        {text: "%的遮拦每米 ", qtip: "144", leaf: true},
                        {text: "每第二个百分比 ", qtip: "99", leaf: true},
                        {text: "每分钟 ", qtip: "100", leaf: true},
                        {text: "每第二 ", qtip: "101", leaf: true},
                        {text: "PSI每华氏度", qtip: "102", leaf: true},
                        {text: "弧度 ", qtip: "103", leaf: true},
                        {text: "弧度每秒 ", qtip: "184", leaf: true},
                        {text: "每分钟革命 ", qtip: "104", leaf: true},
                        {text: "每牛顿平方米 ", qtip: "185", leaf: true},
                        {text: "米的瓦 每开尔文 ", qtip: "189", leaf: true},
                        {text: "瓦 每平方米开尔文 ", qtip: "141", leaf: true},
                        {text: "‰ ", qtip: "207", leaf: true},
                        {text: "克每克 ", qtip: "208", leaf: true},
                        {text: "每公斤公斤 ", qtip: "209", leaf: true},
                        {text: "克每公斤 ", qtip: "210", leaf: true},
                        {text: "毫克 克 ", qtip: "211", leaf: true},
                        {text: "毫克每公斤 ", qtip: "212", leaf: true},
                        {text: "每毫升 克 ", qtip: "213", leaf: true},
                        {text: "每升克 克 ", qtip: "214", leaf: true},
                        {text: "毫克每升 ", qtip: "215", leaf: true},
                        {text: "微克每升 ", qtip: "216", leaf: true},
                        {text: "克每立方米 克 ", qtip: "217", leaf: true},
                        {text: "毫克每立方米 ", qtip: "218", leaf: true},
                        {text: "微克每立方米 ", qtip: "219", leaf: true},
                        {text: "毫微克 每立方米 ", qtip: "220", leaf: true},
                        {text: "克每立方厘米 ", qtip: "221", leaf: true},
                        {text: "贝可 ", qtip: "222", leaf: true},
                        {text: "megabecquerels ", qtip: "224", leaf: true},
                        {text: "灰色 ", qtip: "225", leaf: true},
                        {text: "毫戈瑞 ", qtip: "226", leaf: true},
                        {text: "为微 ", qtip: "227", leaf: true},
                        {text: "辐射 ", qtip: "228", leaf: true},
                        {text: "毫 ", qtip: "229", leaf: true},
                        {text: "微希沃特 ", qtip: "230", leaf: true},
                        {text: "微西弗 小时 ", qtip: "231", leaf: true},
                        {text: "分贝 ", qtip: "232", leaf: true},
                        {text: "浊度单位 ", qtip: "233", leaf: true},
                        {text: "pH ", qtip: "234", leaf: true},
                        {text: "每平方米克克 平方米 ", qtip: "235", leaf: true},
                        {text: "分钟 每开尔文 ", qtip: "236", leaf: true},
                    ]
                    }


                ]
            }
        })
    },

})
;




