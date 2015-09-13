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
   
   alert(lat + ', ' + lng);
   
   
});
