/* global google:true */
/* jshint camelcase:false */
(function(){
  'use strict';


  $(document).ready(function(){
    $('button').click(geocode);
  });

  var map,
      infowindow = new google.maps.InfoWindow(),
      mapCity,
      //cityName,
      lat,
      lng;
  console.log('LAT & LNG HERE---->', lat, lng);


  function initialize(){
    //var city = $('#name').val();
    //var name = document.getElementById('name').value;
    //var lat = document.getElementById('lat').value;
    //var lng = document.getElementById('lng').value;
    //var pyrmont = new google.maps.LatLng(29.9511, -90.0715);
    //var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    if(lat && lng){
      mapCity = new google.maps.LatLng(lat, lng);
    }else{
      mapCity = new google.maps.LatLng(29.9511, -90.0715);
    }

    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCity,
      zoom: 12
    });

    var request = {
      location: mapCity,
      radius: 5000,
      query: 'sushi restaurant'
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }

  function callback(results, status){
    if (status === google.maps.places.PlacesServiceStatus.OK){
      for (var i = 0; i < results.length; i++){
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place){
    var placeLoc = place.geometry.location,
      marker = new google.maps.Marker({
        icon: '/img/mapMarker.png',
        map: map,
        position: placeLoc
      });

    google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
  //--------------traffic_toggle-----------------\\
  var trafficLayer = new google.maps.TrafficLayer();
  $('#toggle_traffic').click(function(){
    if(trafficLayer.getMap()){
      trafficLayer.setMap(null);
    }else{
      trafficLayer.setMap(map);
    }
  });
//---------------traffic_toggle_end----------------\\

//-----------------weather_toggle----------------------------\\
  var weatherLayer =new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
  }),
  cloudLayer = new google.maps.weather.CloudLayer();

  $('#toggle_weather').click(function(){
    if(weatherLayer.getMap() || cloudLayer.getMap()){
      weatherLayer.setMap(null);
      cloudLayer.setMap(null);
    }else{
      weatherLayer.setMap(map);
      cloudLayer.setMap(map);
    }
  });
//--------------weather_toggle_end-----------------------------\\

/*
  function codeLatLng(){
    var input = document.getElementById('name').value,
        latlngStr = input.split(',', 2),
        lat = parseFloat(latlngStr[0]),
        lng = parseFloat(latlngStr[1]),
        latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latlng': latlng}, function(results, status){
      if (status === google.maps.GeocoderStatus.OK){
        if (results[1]) {
          map.setZoom(14);
          marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }
*/
  function geocode(event){
    var geocoder = new google.maps.Geocoder(),
        name = $('#name').val();

    geocoder.geocode({address:name}, function(results, status){
      console.log('---------->-------->--->', results);
      var cityName = results[0].formatted_address,
        lat  = results[0].geometry.location.lat(),
        lng  = results[0].geometry.location.lng();

      $('#name').val(cityName);
      $('#lat').val(lat);
      $('#lng').val(lng);

     // $('form').submit();
      //var data = $('form').serialize();
      return lat,lng;
    });

    event.preventDefault();
    //loadScript();
  }
/*
  function loadScript(){
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
    document.body.appendChild(script);
  }

  window.onload = loadScript;
*/
/*
 function getPositions(){
    var positions = $('form input').toArray().map(function(input){
      var name  = $(input).attr('#name'),
            lat = $(input).attr('#lat'),
            lng = $(input).attr('#lng'),
            pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};

      return pos;
    });
    return positions;
  }
*/
  google.maps.event.addDomListener(window, 'load', initialize);
})();
