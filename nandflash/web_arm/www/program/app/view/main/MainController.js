/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('program.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    boxready: function () {


        function autoSave() {
            var fileName = getCurrentDrawPanel().title;
            saveXml(fileName)
        }

        var runner = new Ext.util.TaskRunner();
        setTimeout(function () {
            var task = runner.start({
                run: autoSave,
                interval: 60 * 1000
            })
        }, 60 * 1000)



    },
    onClick: function () {
        alert("aaa");
    },
    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});


function fileExists(fileName, resFn) {
    myAjax("resources/test1.php?par=file_exists&filename=" + fileName, resFn)
}
var ActiveJson = {
    get: function (name) {
        var value = null;
        myAjax("active.json", function (response) {
            var activeJson = Ext.decode(response.responseText)

            value = activeJson[name];
        })
        return value;
    }
}

function lookforProperty(grid, store) {
    saveXml()
    console.log(arguments)
    var tag = null;
    myAjax("1000", function (response) {
        var jXml = $($.parseXML(response.responseText))
        console.log(jXml)
        tag = jXml.find("master_node[number=" + grid.curPlantIndex + "]");
    })
    if (tag.length) {
        return null;
    }
    if (grid.datas.type == 74) {

        store.set(store.getAt(0).data.name, tag.find("P").html())
        store.set(store.getAt(1).data.name, tag.find("D").html())
        console.log(store)
    }

    return tag;
}

function generateJson(key, value) {
    var str = '{ "' + key + '": "' + value + '" }'
    var oJSON = JSON.parse(str);
    for (o in oJSON) {
        if (o != "" & o != null & oJSON[o] != "" & oJSON[o] != null) {
            if (oJSON[null]) {
                return null;
            } else {
                return oJSON;
            }
        }
    }
}


function delayToast(title, html, delay) {
    setTimeout(function () {
        Ext.toast({
            minWidth: 200,
            minHeight:200,
            title: title,
            html: html,
            align: 'br'
        });
    }, delay)
}

String.prototype.removeLineEnd = function () {
    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2')
}

function formatXml1(str) {
    //去除输入框中xmll两端的空格。
    str = str.replace(/^\s+|\s+$/g, "");
    var source = new ActiveXObject("Msxml2.DOMDocument");
    //装载数据
    source.async = false;
    source.loadXML(str);
    // 装载样式单
    var stylesheet = new ActiveXObject("Msxml2.DOMDocument");
    stylesheet.async = false;
    stylesheet.resolveExternals = false;
    stylesheet.load(path + "/XlsTmpl/temp/format.xsl");

    // 创建结果对象
    var result = new ActiveXObject("Msxml2.DOMDocument");
    result.async = false;

    // 把解析结果放到结果对象中方法1
    source.transformNodeToObject(stylesheet, result);
    //alert(result.xml);
    if (result.xml == '' || result.xml == null) {
        alert('xml报文格式错误，请检查');
        return false;
    }
    var finalStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n" + result.xml;
    return finalStr;
}


function formatXml(text) {
    //去掉多余的空格
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
            return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
        }).replace(/>\s*?</g, ">\n<");

    //把注释编码
    text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
        var ret = '<!--' + escape(text) + '-->';
        //alert(ret);
        return ret;
    }).replace(/\r/g, '\n');
    console.log(text)

    //调整格式
    var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    var nodeStack = [];
    var output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
        //alert([all,isClosed].join('='));
        var prefix = '';
        if (isBegin == '!') {
            prefix = getPrefix(nodeStack.length);
        }
        else {
            if (isBegin != '/') {
                prefix = getPrefix(nodeStack.length);
                if (!isClosed) {
                    nodeStack.push(name);
                }
            }
            else {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }

        }
        var ret = '\n' + prefix + all;
        return ret;
    });

    var prefixSpace = -1;

    var outputText = output.substring(1);
    //alert(outputText);
    //把注释还原并解码，调格式
    outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
        //alert(['[',prefix,']=',prefix.length].join(''));
        if (prefix.charAt(0) == '\r')
            prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g, '\n');
        var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
        //alert(ret);
        return ret;
    });

    return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}
function getPrefix(prefixIndex) {
    var span = ' ';
    var output = [];
    for (var i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }

    return output.join('');
}
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();


