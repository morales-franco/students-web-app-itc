function initializeLinkeador(url, userid, container, ipInterna) {

    var esIpInt = false;
    if (ipInterna == 'True')
        esIpInt = true;

    console.log('initializeLinkeador--> es ip interna: ' + esIpInt);

    $.ajax({
        type: "GET",
        contentType: "html",
        url: url,
        data: { id: userid, esIpInterna: esIpInt }
    }).done(function (data) {

        if (container == null)
            $("body").prepend(data);
        else
            $(container).prepend(data);

    }).fail(function (response) {
        console.log('error al obtener el linkeador-lite');
    });

}

function abrirUrl(url, appid, nuevaVentana) {
    var sessionId = sesionLinkeadorId;
    GetUrlLite(url, appid, nuevaVentana, sesionLinkeadorId);
    return;
}

function CerrarSession() {
    var SesionLinkeadorId = sesionLinkeadorId;
    CerrarSesion(SesionLinkeadorId);
}

function cerrarSesionActual() {
    window.location.href = cerrarSesionUrl;
}