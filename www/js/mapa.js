var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
var directionsService = new google.maps.DirectionsService();
 
var directionsDisplay = new google.maps.DirectionsRenderer({
   draggable: true
}); // Instanciando...

var options = {
   zoom: 15,
   disableDefaultUI: true,
   mapTypeId: google.maps.MapTypeId.ROADMAP
};

var mapa = document.getElementById('mapa');
var btnFechar = document.getElementById('btnFechar');

$("form").submit(function(event) {
   event.preventDefault();

   var enderecoPartida = $("#txtEnderecoPartida").val();
   var enderecoChegada = $("#txtEnderecoChegada").val();
 
   var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
      origin: enderecoPartida, // origem
      destination: enderecoChegada, // destino
      travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
   };
 
   directionsService.route(request, function(result, status) {
      mapa.style.display = 'block';
      btnFechar.style.display = 'block';
      
      map = new google.maps.Map(mapa, options);
      directionsDisplay.setMap(map); // Relacionamos o directionsDisplay com o mapa desejado

      // Na lista TODO: fazer a chamada para o backend e obter estes dados.
      // Usar o objeto com pesos :)
      var heatmapData = [
        new google.maps.LatLng(37.782, -122.447),
        new google.maps.LatLng(37.782, -122.445),
        new google.maps.LatLng(37.782, -122.443),
        new google.maps.LatLng(37.782, -122.441),
        new google.maps.LatLng(37.782, -122.439),
        new google.maps.LatLng(37.782, -122.437),
        new google.maps.LatLng(37.782, -122.435),
        new google.maps.LatLng(37.785, -122.447),
        new google.maps.LatLng(37.785, -122.445),
        new google.maps.LatLng(37.785, -122.443),
        new google.maps.LatLng(37.785, -122.441),
        new google.maps.LatLng(37.785, -122.439),
        new google.maps.LatLng(37.785, -122.437),
        new google.maps.LatLng(37.785, -122.435)
      ];
      
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });
      
      heatmap.setMap(map);
      
      
      if (status == google.maps.DirectionsStatus.OK) { // Se deu tudo certo
         directionsDisplay.setDirections(result); // Renderizamos no mapa o resultado
      }
   });
});

$('#btnFechar').click(function() {
   mapa.style.display = 'none';
   btnFechar.style.display = 'none';
});