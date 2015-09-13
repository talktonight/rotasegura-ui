var watchID, alarmeID, emAlarme = false;

// Armazena como string, o 'false' para ele é true :P
if (localStorage['monitoramento'] == 'true') {
   $('#monitoramento').prop('checked', true);
   iniciaMonitoramento();
}

$('#monitoramento').change(function() {
   var marcado = $(this).prop('checked');
   localStorage['monitoramento'] = marcado;
   
   if (marcado)
      iniciaMonitoramento();
   else
      finalizaMonitoramento();
});

document.addEventListener('deviceready', function() {
   if ($(this).prop('checked')) 
      iniciaMonitoramento();
});

function iniciaMonitoramento() {
   watchID = navigator.geolocation.watchPosition(
      onSuccess, onError, { timeout: 30000 });
   cordova.plugins.backgroundMode.enable();
}

function finalizaMonitoramento() {
   navigator.geolocation.clearWatch(watchID);
   cordova.plugins.backgroundMode.disable();
   
   if (emAlarme) 
      finalizaAlarme();
}

function onSuccess(position) {
   $.get(SERVIDOR + '/perigo?lat=' +
         position.coords.latitude + 
         '&lon=' + position.coords.longitude,
         verificarPerigo);
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function verificarPerigo(data) {
   var nota = parseFloat(data);
   
   if (nota >= 15) {
      if (!emAlarme) 
         iniciaAlarme();
   }
   else 
      finalizaAlarme();
}

function iniciaAlarme() {
   alarmeID = setInterval(apita, 3500);
   emAlarme = true;
}

function finalizaAlarme() {
   clearInterval(alarmeID);
   emAlarme = false;
}

function apita() {
   navigator.notification.vibrate(2500);
}
