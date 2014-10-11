(function(){
  'use strict';

  $(document).ready(function(){
  });
////////////////// WAYPOINTS START ///////////////////

  $('.wp1').waypoint(function(){
    $('.wp1').addClass('animated zoomIn');
  }, {
    offset: '100%'
  });

  $('.wp2').waypoint(function(){
    $('.wp2').addClass('animated fadeInRightBig');
  }, {
    offset: '100%'
  });

  $('.wp3').waypoint(function(){
    $('.wp3').addClass('animated fadeInRightBig');
  }, {
    offset: '100%'
  });

  $('.wp4').waypoint(function(){
    $('.wp4').addClass('animated bounceInDown');
  }, {
    offset: '100%'
  });

////////////////// WAYPOINTS END ///////////////////

  //function onClick(){
    //debugger;
    //document.getElementById('bleeP').play();
    //var bleep = new Audio();
    //bleep.src = '/audio/bleep.mp3';
  //}

})();

