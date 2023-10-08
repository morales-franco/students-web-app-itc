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

    StyleWebGrid();
});

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};



function calcAgeFromString(dateString) {
    var birthday = +new Date(dateString);
    return calcAge(birthday);
}

function calcAge(birthday) {
    return ~ ~((Date.now() - birthday) / (31557600000));
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

function getInputDateFromString(dateString) {

    var iday = parseInt(dateString.split("/")[0]);
    var imonth = parseInt(dateString.split("/")[1]);
    var iyear = parseInt(dateString.split("/")[2].substring(0, 4));

    var result = iyear + "-" + (imonth < 10 ? '0' : '') + imonth + "-" + (iday < 10 ? '0' : '') + iday;
    return result;
}

function getInputDateTimeFromString(dateString) {

    var date = getInputDateFromString(dateString);
    var time = getInputTimeFromString(dateString.split(" ")[1]);

    var result = date + 'T' + time;
    return result;
}

function getInputTimeFromString(timeString) {
    var hours = parseInt(timeString.split(":")[0]);
    var minutes = parseInt(timeString.split(":")[1]);

    var time = hours + ':' + minutes;
    return time;
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

function getCurrentFullDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var min = d.getMinutes("mm");

    var output = (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        d.getFullYear() + ' ' + (hours < 10 ? '0' : '') + hours + ':' + (min < 10 ? '0' : '') + min;

    return output;
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
    var table = $("#"+listName);
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
        if (page>0)
        {
        page+=1;
        var sortColumn = sortcol;
        var sortDirection = sortdir;
        var u = $("a[data-swhglnk='true']").attr('href').split('&page')[0].split('&sort')[0].split('?page')[0].split('?sort')[0];
        url = u + "?page=" + page + "&sort=" + sortColumn +"&sortdir=" + sortDirection;
        containerId = "#grid";
        callback = function anonymous() {};
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
        var wait = '<div class="waiting"><img src="'+ APPPATH +'Images/loading.gif"/></div>';
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

    function showAjaxError(jqXHR, textStatus, errorThrown)
    {
        if (jqXHR.responseJSON != "") { alert(jqXHR.responseJSON); }
        else { alert(errorThrown); }
    }

    //Callback al llamado AJAX del WebGrid
    function WebGridCallBack() {
        StyleWebGrid();
    }

    //Aplica formato al WebGrid
    function StyleWebGrid() {
        //Pager
        var footer = $('.webgrid-footer td').contents().filter(function () {
        return this.nodeType === 3 && $.trim(this.nodeValue) !== '';
        }).wrap('<span class="active">');

        //Header
        var dir = $('#dir').val(); //hidden field value
        var col = $('#col').val(); //hidden field value
        var header = $('th a[href*="sort=' + col + '"]').parent("th");
        header.removeClass("sorting_asc").removeClass("sorting_desc");
        if (dir == 'Ascending') {
            header.addClass("sorting_asc");
        }
        if (dir == 'Descending') {
            header.addClass("sorting_desc");
        }

        $("table.dataTable thead .sorting th:not(:has(a))").addClass("no-sort");
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
        var conf = confirm('¿Confirma que desea eliminar el elemento seleccionado?');
        if (conf) {
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                traditional: true,
                async: false,
                data: { 'id': id },
                success: function (result, responseText) {
                    
                    if (result===true) {
                        notify('success', 'Exito!', 'El elemento se ha eliminado exitosamente.');
                        $('.FilterButton').click();
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
        }
        else {
            return false;
        }
    }





    function notify(type, title, msj, delay) {

        //Predefinidos
        var Type = 'info';
        var Icon = 'fa fa-info-circle'
        var Title = 'title';
        var Msj = 'msj';
        var Delay = 3000;
        
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



        //Mostrar notificacion
        $.growl({
            title: '<p><strong><i class="' + Icon + '"></i>&nbsp'+Title+'</strong></p>',
            message: Msj,
                },
                {
                    delay: Delay,
                    type: Type,
                    placement: {from: "top",align: "center"},
                    animate: {enter: 'animated fadeInUp', exit: 'animated fadeOutDown'},
                }
        );



    }


        

        function bloquearPag(url, msj){
            $.blockUI({
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

        function bloquearPag(msj) {
            $.blockUI({
                message: '<h3><span style="margin-left:10px">' + msj + '</span></h3>',
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
            dtMonth= dtArray[3];
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