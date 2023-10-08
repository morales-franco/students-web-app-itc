var preloader = null;

$(document).ready(function () {
    drawMoreOptionsMenu();

    $(".fa-search,.webgrid-footer a, thead a, .table-pager a").click(function () {
        preLoader();
    });
});

function preLoader() {
    var div = '<div id="loading" class="overlay">'
             + '<i class="fa fa-refresh fa-spin"></i>'
          + '</div>';

    $($(".wrapper")[0]).append(div);
}


/*********Grid More Options**********/
function drawMoreOptionsMenu() {
    var ajaxGrid = $('#ajaxGrid');
    if (ajaxGrid.length > 0) {
        $('.action-column').each(function (index, value) {
            //generate the button and the menu
            var buttonId = 'moreActions' + index;
            var menuId = 'grid-action-menu' + index;

            var li = "<li class='dropdown pull-right' style='list-style: none;'><a class='dropdown-toggle fa fa-caret-down grid-action-more-button' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'></a>"
                     + '<ul id="' + menuId + '" class="dropdown-menu"></ul></li>';
            $(value).append(li);

            var actionMenu = $('#' + menuId);

            //add menu items
            $('a:not(.dropdown-toggle)', $(value)).each(function (linkIndex, link) {
                var text = $(link).attr("title");
                var newItem = $(link).clone();
                newItem.children("i").remove();
                newItem.append(text);
                actionMenu.append('<li>' + newItem[0].outerHTML + '</li>');
            });
        });
    }
}

//Callback al llamado AJAX del WebGrid
function webGridCallBack() {
    drawMoreOptionsMenu();

    if (typeof addClassHiddenColumn == 'function') {
        addClassHiddenColumn();
    }
    $("#loading").remove();
}
