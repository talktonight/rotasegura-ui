var watchID, alarmeID, emAlarme = false;

// Armazena como string, o 'false' para ele é true :P
if (localStorage['monitoramento'] == 'true') {
   $('#monitoramento').prop('checked', true);
   inicia();
}

$('#monitoramento').change(function() {
   var marcado = $(this).prop('checked');
   localStorage['monitoramento'] = marcado;
   
   if (marcado)
      inicia();
   else
      finaliza();
});

document.addEventListener('deviceready', function() {
   if ($(this).prop('checked')) inicia();
});

function inicia() {
   watchID = navigator.geolocation.watchPosition(
      onSuccess, onError, { timeout: 30000 });
   cordova.plugins.backgroundMode.enable();
}

function finaliza() {
   navigator.geolocation.clearWatch(watchID);
   cordova.plugins.backgroundMode.disable();
   
   if (emAlarme) {
      clearInterval(alarmeID);
      emAlarme = false;   
   }
}


function onSuccess(position) {
   $.get('http://eb8f1c09.ngrok.io/perigo?lat=' +
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
   
   if (nota >= 15 && !emAlarme) {
      alarmeID = setInterval(apita, 3500);
      emAlarme = true;
   }
   else {
      clearInterval(alarmeID);
      emAlarme = false;
   }
}

function apita() {
   navigator.notification.vibrate(2500);
}
