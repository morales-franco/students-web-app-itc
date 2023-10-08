var usedNodes = [];

var selectedNodes = [];
var disabledNodes = [];
var destinosSource = [];
var parentNodes = [];
var childNodes = [];


var arrayDestinos = [];

//tree
function getData(destinos) {

    var data = [];
    $.each(destinos, function (idx, obj) {

        if (obj['DestinoPadreID'] == null) {
            var parent = {};
            parent.text = obj['Abreviatura'];
            parent.id = obj['DestinoID'];
            if (obj['Used'] == 'Si') usedNodes.push(parent);
            parentNodes.push(parent);
            addChild(parent, destinos);

            data.push(parent);
        }
    });
    disableUsed();
    destinosSource = data;
    return data;
}

function getDataNoChild(destinos) {

    var data = [];
    $.each(destinos, function (idx, obj) {

        //if (obj['DestinoPadreID'] == null) {
            var parent = {};
            parent.text = obj['Abreviatura'];
            parent.id = obj['DestinoID'];
            if (obj['Used'] == 'Si') usedNodes.push(parent);
            parentNodes.push(parent);
            //addChild(parent, arrayDestinos);

            data.push(parent);

        //}
    });
    disableUsed();
    destinosSource = data;
    return data;
}

function getAvailableNodes() {

    var availableNodes = [];

    availableNodes = arrayDestinos.filter(function (obj) {
        return (usedNodes.map(function (e) {
            return e.id;
        }).indexOf(obj.DestinoID) === -1);
    });

    return availableNodes;
}

function removeFromUsed(id) {

    usedNodes = usedNodes.filter(function (obj) {
        return (obj.id != id);
    });
}

function treeHasAvailableNodes() {

    return (getAvailableNodes().length > 0);

}

function treeIsSourceSet() {

    return (destinosSource.length > 0);

}

function getParent(destinos) {

    var data = [];
    $.each(destinos, function (idx, obj) {

        if (obj['DestinoPadreID'] == null) {
            var parent = {};
            parent.text = obj['Abreviatura'];
            parent.id = obj['DestinoID'];
    
            data.push(parent);

        }
    });
   
    return data;
}

function getChild(destinos) {

    var data = [];
    $.each(destinos, function (idx, obj) {

        if (obj['DestinoPadreID'] != null) {
            var child = {};
            child.text = obj['Abreviatura'];
            child.id = obj['DestinoID'];

            data.push(child);

        }
    });

    return data;
}

function addChild(parent, array) {

    parent.nodes = [];

    $.each(array, function (idx, obj) {
        if (obj['DestinoPadreID'] != null &
            obj['DestinoPadreID'] == parent['id']) {

            var child = {};
            child.text = obj['Abreviatura'];
            child.id = obj['DestinoID'];
            if (obj['Used'] == 'Si') usedNodes.push(child);
            parent.nodes.push(child);
            childNodes.push(child);
        }
    });

}

function disableNodes(nodes) {
    $.each(nodes, function (idx, obj) {
        var text = obj.text;
        $('li:contains("' + text + '") span.check-icon').remove();
    });
}

function disableUsed() {
    disableNodes(usedNodes);
}

function disableParentNodes() {
    disableNodes(parentNodes);
}

function disableChildNodes() {
    disableNodes(childNodes);
}

function addSelectedNote(node) {

    selectedNodes.push(node);
}

function removeSelectedNode(node) {

    selectedNodes = selectedNodes.filter(function (obj) {
        return (obj.id != node.id);
    });
}

function findNodeId(idObject) {
    var result;
    $.each(arrayDestinos, function (idx, obj) {
        if (obj.DestinoID === idObject) {
            nodeid = $('li:contains("' + obj.Abreviatura + '")').attr("data-nodeid");
            result = nodeid;
        }
        else {
            $.each(obj['nodes'], function (idx, child) {
                if (child.DestinoID === idObject) {
                    nodeid = $('li:contains("' + child.Abreviatura + '")').attr("data-nodeid");
                    result = nodeid;
                }
            });
        }
    });

    return result;
}
//

//para view y edit
function displaySelectedNode(index, manager, silentValue) {

    var item = manager.getIndexDataSource()[index];
    n = item.filter(function (obj) { return obj.name == 'DestinoID'; });
    var nodeid = findNodeId(n[0].value);
    //saco todos los checks
    $('#tree').treeview('uncheckAll', { silent: true });
    //selecciono el que corresponde
    $('#tree').treeview('checkNode', [parseInt(nodeid), { silent: silentValue }]);
    //deshabilito el div del arbol
    $('#tree').css('pointer-events', 'none')
}

function displaySelectedNodeByName(name, manager) {

    var item;
    $(manager.getIndexDataSource()).each(function () {

        if (this['text'] == name) item = this;
    });

    n = item.filter(function (obj) { return obj.name == 'DestinoID'; });
    var nodeid = findNodeId(n[0].value);
    //saco todos los checks
    $('#tree').treeview('uncheckAll', { silent: true });
    //selecciono el que corresponde
    $('#tree').treeview('checkNode', [parseInt(nodeid), { silent: true }]);
    //deshabilito el div del arbol
    $('#tree').css('pointer-events', 'none')
}