var watchID, alarmeID, emAlarme = false;
var check = document.getElementById('monitoramento');

document.addEventListener('deviceready', function() {
   // Armazena como string, o 'false' para ele é true :P
   if (localStorage['monitoramento'] == 'true') {
      check.checked = true;
      iniciaMonitoramento();
   }
});

check.onchange = function() {
   var marcado = check.checked;
   localStorage['monitoramento'] = marcado;
   
   if (marcado)
      iniciaMonitoramento();
   else
      finalizaMonitoramento();
}

function iniciaMonitoramento() {
   cordova.plugins.backgroundMode.setDefaults({ 
      title: 'Monitoramento ativado',
      text:'Saiba quando estiver em uma região perigosa.'
   });
   cordova.plugins.backgroundMode.enable();
   watchID = navigator.geolocation.watchPosition(
      onSuccess, onError, { timeout: 30000 });
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
   
   if (nota >= 0.2) {
      if (!emAlarme) 
         iniciaAlarme();
   }
   else 
      finalizaAlarme();
}

function iniciaAlarme() {
   localNotification.add(103, {
      seconds: 1,
      title: 'Região perigosa!',
      message: 'Procure andar por outro caminho.',
      badge: 2
   });
   emAlarme = true;
   apita();
}

function finalizaAlarme() {
   emAlarme = false;
   clearTimeout(alarmeID);
}

function apita() {
   navigator.notification.vibrate(2500);
   if (emAlarme) 
      alarmeID = setTimeout(apita, 3500);
}

