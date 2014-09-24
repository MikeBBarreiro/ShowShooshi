/* jshint camelcase:false */
/*
(function(){
  'use strict';
  var map;

  $(document).ready(function(){
    initMap(36, -86, 2);
    $('form').submit(addVacation);
    var positions = getPositions();
    positions.forEach(function(pos){
      addMarker(pos.lat, pos.lng, pos.name);
    });
    $('.btn').click(getSushi);
  });

  function initMap(lat, lng, zoom){
    var styles = [{'stylers':[{'hue':'#ff1a00'},{'invert_lightness':true},{'saturation':-100},{'lightness':33},{'gamma':0.5}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2D333C'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElement:ById('map'), mapOptions);
  }

  function addVacation(e){
    var lat = $('#lat').val();
    if(!lat){
      var name = $('#name').val();
      console.log(name);
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({address:address}, function(results, status){
      var name = results[0].formatted_address,
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

  function getPositions(){
    var positions = $('form input').toArray().map(function(input){
      var name = $(input).attr('data-name'),
          lat  = $(input).attr('data-lat'),
          lng  = $(input).attr('data-lng'),
          pos  = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      return pos;
    });

    return positions;
  }

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: '/img/marker.png'});
  }

  function getSushi(){
    var name = $('#name').val(),
        url  = 'https://api.foursquare.com/v2/venues/search?' + name + '&query=sushi&limit=10&radius=1000&client_id=VBE22GOV4BLKQE5MO0H2NPNDZ3LNEJKZ4M12GCVY2100WTYB&client_secret=F5PLOO2BFTDF3CVXLXWKZOKOLYTKOSJMYLLYPK3SS0NBJ4RO&v=20140806';
    $.getJSON(url);
  }




})();
*/
