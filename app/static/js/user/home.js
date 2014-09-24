/* global google:true */
/* jshint camelcase:false */

'use strict';

var geocoder,
    map,
    marker,
    infowindow = new google.maps.InfoWindow();

function initialize() {
  //var city = $('#name').val();
  var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
  //var pyrmont = new google.maps.LatLng(29.9511, -90.0715);
  //var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 14
  });

  var request = {
    location: pyrmont,
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

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function codeLatLng(){
  var input = document.getElementById('latlng').value,
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

function geocode(address){
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({addess:address}, function(results, status){
    var name = results[0].formatted_adrress,
    lat  = results[0].geometry.location.lat(),
    lng  = results[0].geometry.location.lng();

    $('#name').val(name);
    $('#lat').val(lat);
    $('#lng').val(lng);

    $('form').submit();
    var data = $('form').serialize();
    console.log(data);
    console.log(lat, lng, name);
  });
}
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
