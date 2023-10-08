$('.groupRole').on('click', function (event) {

    var groupname = $(this).attr('id');
    var hijos = $('.' + groupname);
    var checked = $('.groupRole').is(":checked");

    $(hijos).each(function () {
        $(this).attr("checked", checked);
        if (checked) {
            $(this).closest("div").addClass("checked");
        }
        else {
            $(this).closest("div").removeClass("checked");
        }
    });

});

$('.sonRole').on('click', function (event) {
    checkear(this);
});


function checkear(obj) {

    var groupname = $(obj).data('parent');
    var hermanos = $('.' + groupname);

    var allSel = true;
    $(hermanos).each(function () {
        if ($(this).prop('checked') == false)
            allSel = false;
    });

    if (allSel) {
        $('#' + groupname).attr("checked", true);
        $('#' + groupname).closest("div").addClass("checked");
    } else {
        $('#' + groupname).attr("checked", false);

        $('#' + groupname).closest("div").removeClass("checked");
    }
}
