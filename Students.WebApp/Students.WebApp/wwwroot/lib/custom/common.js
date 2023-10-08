$(document).ready(function () {
    fixCheckboxes();
});

/*Checkbox MDL*/
function fixCheckboxes() {
    $('label.mdl-checkbox').each(function (index, value) {
        value.setAttribute('for', $('input.mdl-checkbox__input', $(value))[0].id);
    });
}

/*Collapse*/
$(function () {
    $('.mdl-collapse__content').each(function () {
        var content = $(this);
        content.css('margin-top', -content.height());
    })

    $(document.body).on('click', '.mdl-collapse__button', function () {
        $(this).parent('.mdl-collapse').toggleClass('mdl-collapse--opened');
    })
})

function isMobile() {

    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        isMobile = true;
    return isMobile;
}


$(function () {
    //Validaciones sobre-escritas al framework de mvc y localidazas para argentina
    Globalize.culture('es-AR');
    if ($.validator != null) {

        $.validator.methods.number = function (value, element) {
            return this.optional(element) || !isNaN(Globalize.parseFloat(value));
        }

        $.validator.methods.range = function (value, element, param) {
            value = Globalize.parseFloat(value);
            return this.optional(element) ||
               (value >= param[0] && value <= param[1]);
        }
    }
    //Fin validaciones sobre-escritas

    // Detecting IE
    //    var oldIE;
    if ($('html').is('.ie6, .ie7, .ie8, .ie9, .ie10')) {
        $("input[type='date']").datepicker({ dateFormat: "dd/mm/yy" });
    }

    // IF THE BROWSER IS INTERNET EXPLORER 10
    if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
        $("input[type='date']").datepicker({ dateFormat: "dd/mm/yy" });
    }

    $("form").submit(function () { });
    //    $("form input[type=submit]").click(function () {
    //    $(this).button('loading');
    //    });
});

function calcAgeFromString(dateString) {
    var birthday = +new Date(dateString);
    return calcAge(birthday);
}

function calcAge(birthday) {
    return ~ ~((Date.now() - birthday) / (31557600000));
}

function getDateTimeISO() {
    var d = new Date();

    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":00";

    return datestring;
}

function getDateFromStringES(dateString) {
    if (dateString.length == 10) {
        var Fecha = dateString.split('/');
        var d = parseInt(Fecha[0]);
        var m = parseInt(Fecha[1]);
        var y = parseInt(Fecha[2]);

        m = m - 1; //el mes en en base cero

        var date = new Date(y, m, d);
        return date;
    }
    else
        return null;
}

function getCurrentTime() {
    var currentdate = new Date();
    var datetime = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
    return datetime;
}

function getCurrentDate() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear();
    return datetime;
}

function getCurrentDateTime() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
    return datetime;
}


function IsWholeNumber(s) {
    // Check if string is a whole number(digits only).
    var isWhole_re = /^\s*\d+\s*$/;
    return String(s).search(isWhole_re) != -1;
}

function ValidateNumberKey() {
    if (event.keyCode < 44 || event.keyCode > 57 || event.keyCode == 45 || event.keyCode == 47) event.returnValue = false;
}

function ValidateNoNumberKey() {
    if ((event.keyCode > 31 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97) || (event.keyCode > 122 && event.keyCode < 192 && event.keyCode !== 127)) event.returnValue = false;
}

/*ABM Compuesto*/
/*Grilla de tutores*/
function DeleteThisRowItem(object, listName) {
    var r = confirm("¿Estás seguro que querés eliminar el elemento seleccionado?");
    if (r == true) {
        var link = $(object);
        var table = link.closest("td").closest("tr").closest("table");
        link.closest("td").closest("tr").remove();

        //Reindexo la tabla
        var newIdx = 0;
        var rows = table.find('tbody > tr:has(td):not(:has(th))');

        rows.each(function () {
            var controls = $(this).find('td [name^="' + listName + '["]');
            controls.each(function () {
                var attr = $(this).attr('name');
                attr = attr.split(']')[1];
                $(this).attr('name', '' + listName + '[' + newIdx + ']' + attr);
            });
            newIdx++;
        });
    }
    return;
}

function ReindexTable(listName) {
    var table = $("#" + listName);
    var newIdx = 0;
    var rows = table.find('tbody > tr:has(td):not(:has(th))');

    rows.each(function () {
        var controls = $(this).find('td [name^="' + listName + '"]');
        controls.each(function () {
            var attr = $(this).attr('name');
            attr = attr.split(']')[1];
            $(this).attr('name', '' + listName + '[' + newIdx + ']' + attr);
        });
        newIdx++;
    });
}

function ReindexTableByID(tableID, listName) {
    var table = $("#" + tableID);
    var newIdx = 0;
    var rows = table.find('tbody > tr:has(td):not(:has(th))');

    rows.each(function () {
        var controls = $(this).find('td [name^="' + listName + '"]');
        controls.each(function () {
            var attr = $(this).attr('name');
            attr = attr.split(']')[1];
            $(this).attr('name', '' + listName + '[' + newIdx + ']' + attr);
        });
        newIdx++;
    });
}

function onGridLoading() {

    alert('loading');
    return true;
}

function onGridLoaded() {
    alert('Success');
}

String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function gotopage(pagenumber, sortcol, sortdir) {
    var page = pagenumber
    if (page > 0) {
        page += 1;
        var sortColumn = sortcol;
        var sortDirection = sortdir;
        var u = $("a[data-swhglnk='true']").attr('href').split('&page')[0].split('&sort')[0].split('?page')[0].split('?sort')[0];
        url = u + "?page=" + page + "&sort=" + sortColumn + "&sortdir=" + sortDirection;
        containerId = "#grid";
        callback = function anonymous() { };
        url = url + (url.indexOf('?') == -1 ? '?' : '&') + '__swhg=' + new Date().getTime();
        $('<div/>').load(url + ' ' + containerId, function (data, status, xhr) {
            $(containerId).replaceWith($(this).html());
            if (typeof (callback) === 'function') {
                callback.apply(this, arguments);
            }
        });
        return this;
    }
}

function setCollection(collection, collectionName, item) {
    var i = 0;
    ($(collection).find(item)).each(function () {
        $(this).find("input[type=hidden]").each(function () {
            var a = this;
            if (a.id.split("__").length == 2) {
                itemName = a.id.split("__")[1];
            }
            else {
                itemName = a.name
            }
            a.name = collectionName + "[" + i + "]." + itemName;
            a.id = collectionName + "_" + i + "__" + itemName;
        });
        i = i + 1;
    });
}

function startWaiting(holder) {
    var wait = '<div class="waiting"><img src="' + APPPATH + 'Images/loading.gif"/></div>';
    $(holder).html(wait);
}

function stopWaiting(holder) {
    $(holder).remove($(".waiting"));
}

$('#search').keypress(function (event) {
    if (event.keyCode == 13) {
        $("#searchBtn")[0].click();
    }
    return event.keyCode != 13;
});

function showAjaxError(jqXHR, textStatus, errorThrown) {
    if (jqXHR.responseJSON != "") { alert(jqXHR.responseJSON); }
    else { alert(errorThrown); }
}



function ValidateNoNumberKey() {
    if ((event.keyCode > 32 && event.keyCode < 39) || (event.keyCode > 40 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97) || (event.keyCode > 122 && event.keyCode < 192 && event.keyCode !== 127)) event.returnValue = false;
}

function numberToString(number, decimals) {
    if (decimals == null)
        decimals = 0;
    return number.toFixed(2).toString().replace('.', ',');
}

function parseFloatNumber(number) {
    if (number == null || number == '')
        return 0;
    return parseFloat(number.toString().replace(',', '.'));
}

function replacePointNumber(number) {
    if (number == null || number == '')
        return 0;
    return number.toString().replace('.', ',');
}
function OnlyNumbers(e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 || (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}


function confirmDelete(url, id) {
    $("#dialog-delete").modal('show');

    $("#dialog-delete .closedialog").on('click', function () {
        $("#dialog-delete").modal('hide');
    });

    $("#dialog-delete .accept").on('click', function () {

      //  debugger;

        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            traditional: true,
            async: false,
            data: { 'id': id },
            success: function (result, responseText) {
                debugger;
                if (result === true) {
                    notify('success', 'Exito!', 'El elemento se ha eliminado exitosamente.');
                    //location.reload();
                    $(".divFilterButton .fa-search").click();
                } else {
                    notify('warning', 'Advertencia!', result);
                }
                return false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notify('danger', 'Error!', 'Se produjo un error al intentar eliminar el elemento.');
                return false;
            }
        });
        $("#dialog-delete").modal('hide');
    });

}

function notify(type, title, msj, delay, from) {
    //Predefinidos
    var Type = 'info';
    var Icon = 'fa fa-info-circle'
    var Title = 'title';
    var Msj = 'msj';
    var Delay = 3000;
    var From = "top";

    //si hay un tipo, tambien le aigno un icono
    if (type != "" && type != undefined) {

        Type = type;

        switch (type) {
            case 'success': Icon = 'fa fa-check fa-lg'
                break;
            case 'warning': Icon = 'fa fa-warning fa-lg'
                break;
            case 'danger': Icon = 'fa fa-times-circle fa-lg'
                break;
            case 'info': Icon = 'fa fa-info-circle fa-lg'
                break;
            default:
                break;
        }
    }

    // si hay un titulo
    if (title != "" && type != undefined)
        Title = title;

    // si hay un msj
    if (msj != "" && msj != undefined)
        Msj = msj;

    //si hay un delay
    if (delay != undefined)
        Delay = delay;

    if (from != undefined)
        From = from;
    //Mostrar notificacion
    $.growl({
        title: '<p><strong><i class="' + Icon + '"></i>&nbsp' + Title + '</strong></p>',
        message: Msj,
    },
            {
                delay: Delay,
                type: Type,
                placement: { from: From, align: "center" },
                animate: { enter: 'animated fadeInUp', exit: 'animated fadeOutDown' },
            }
    );


}

function notifyInModal(type, title, msj, delay, from) {
    //Predefinidos
    var Type = 'info';
    var Icon = 'fa fa-info-circle'
    var Title = 'title';
    var Msj = 'msj';
    var Delay = 3000;
    var From = "top";

    //si hay un tipo, tambien le aigno un icono
    if (type != "" && type != undefined) {

        Type = type;

        switch (type) {
            case 'success': Icon = 'fa fa-check fa-lg'
                break;
            case 'warning': Icon = 'fa fa-warning fa-lg'
                break;
            case 'danger': Icon = 'fa fa-times-circle fa-lg'
                break;
            case 'info': Icon = 'fa fa-info-circle fa-lg'
                break;
            default:
                break;
        }
    }

    // si hay un titulo
    if (title != "" && type != undefined)
        Title = title;

    // si hay un msj
    if (msj != "" && msj != undefined)
        Msj = msj;

    //si hay un delay
    if (delay != undefined)
        Delay = delay;

    if (from != undefined)
        From = from;
    //Mostrar notificacion
    $.growl({
        title: '<p><strong><i class="' + Icon + '"></i>&nbsp' + Title + '</strong></p>',
        message: Msj,
    },
        {
            delay: Delay,
            type: Type,
            placement: { from: From, align: "center" },
            animate: { enter: 'animated fadeInUp', exit: 'animated fadeOutDown' },
            z_index: 1055
        }
    );


}

function bloquearPag(url, msj) {
    $.blockUI({
        baseZ: 2000,
        message: '<h3><img src="' + url + '" / ><span style="margin-left:10px">' + msj + '</span></h3>',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });

    return 0;
}

function desbloquearPag() {
    $.unblockUI();
    return 0;
}

//valida formato dd/mm/aaaa

function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex 
    var rxDatePattern = /^(\d{2})(\/|-)(\d{2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function ShowAutoGeneratedPopup(accion, controller, acceptEvent) {
    $.ajax({
        url: '/' + controller + '/' + accion,
        type: "get",
        dataType: "html",
        success: function (result) {
            $("#dialog-auto-generated .modal-dialog").html(result);
            $("#dialog-auto-generated").modal('show');

            $("#dialog-auto-generated .accept").click(function () {
                $("#dialog-auto-generated").modal('hide');
                $("#dialog-auto-generated .modal-dialog .modal-lg").empty();
                acceptEvent();
            });

            $("#dialog-auto-generated .closedialog").click(function () {
                $("#dialog-auto-generated").modal('hide');
                $("#dialog-auto-generated .modal-dialog .modal-lg").empty();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notify('danger', 'Error!', 'Se produjo un error.');
        }
    });
}
