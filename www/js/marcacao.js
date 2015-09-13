var mapa = document.getElementById('map');
var marker = null;
var map;

document.addEventListener('deviceready', function() {
   var map = new google.maps.Map(mapa, {
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      /*
      // Tirar ícones do mapa
      styles: [
         { featureType: "poi", elementType: "labels", 
           stylers: [{ visibility: "off" }] }
      ],
      */
      center: { 
         // USP!!
         lat: -23.5588181, 
         lng: -46.730902
      }
   });
   
   google.maps.event.addListener(map, 'click', function(event) {
      marca(event.latLng, map);
   });
   
   var date = new Date();
   var day = date.getDate();
   var month = date.getMonth() + 1;
   var year = date.getFullYear();
   var hour = date.getHours();
   var minute = date.getMinutes();
   
   if (month < 10) month = "0" + month;
   if (day < 10) day = "0" + day;
   if (hour < 10) hour = "0" + hour;
   if (minute < 10) minute = "0" + minute;
   
   var now = year + "-" + month + "-" + day + 
              'T' + hour + ':' + minute;
   $("#txtDataHora").attr("value", now);
});

function marca(location, map) {
   if (!marker) 
      marker = new google.maps.Marker({ 
         map: map,
         position: location,
         label: '*'
      });
   else
      marker.setPosition(location);
}

$('form').submit(function(event) {
   if (!marker) {
      alert('Aponte no mapa o local da ocorrência.');
      event.preventDefault();
      return;
   }
   
   var lat = marker.getPosition().lat();
   var lng = marker.getPosition().lng();
   $('#lat').val(lat);
   $('#lng').val(lng);
});
