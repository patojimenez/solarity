// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require jquery.nouislider.min
//= require_tree .

$(document).on('ready page:load', function () {

    $('.profile').mouseenter(function(){
      alert("asd");
    });

    /*
    //definicion tramos
    var strJSONTramosResindencial = '[ \
        { "begin":0,  "end":16,  "text": "Entre $250.000  y ? "     , "tip":"Tu cuenta eléctrica esta fuera de control!"},\
        { "begin":17, "end":33,  "text": "Entre $200.000 y $249.000", "tip":"Estás pagando demasiado, tenemos que ayudarte!"},\
        { "begin":34, "end":50,  "text": "Entre $150.000 y $199.000", "tip":"Atención, te podemos ayudar a bajar esta tarifa"},\
        { "begin":51, "end":67,  "text": "Entre $100.000 y $150.000", "tip":"Te podemos ayudar a bajar esta tarifa"},\
        { "begin":68, "end":84,  "text": "Entre $50.000 y $99.000"  , "tip":"Podemos ayudarte a ahorrar, contáctanos!"},\
        { "begin":85, "end":100, "text": "Entre $1 y $50.000"       , "tip":"Mientras más gastas más te podemos ayudar a ahorrar"}\
      ]';*/
 
    var strJSONTramosIndustrial = '[ \
        { "begin":0,  "end":150,  "text": "Entre 10Mill y ? " , "tip":"Estás gastando demasiado, seguro podemos hacer algo por ti!"},\
        { "begin":151, "end":300,  "text": "Entre 5Mill y 10Mill", "tip":"Quizás la electricidad es un costo muy alto para tu negocio, te podemos ayudar!"},\
        { "begin":301, "end":450,  "text": "Entre 1Mill y 5Mill" , "tip":"Podemos ayudarte a bajar tus costos en electricidad, contactanos!"},\
        { "begin":451, "end":600, "text": "Entre 500 y 1MM" , "tip":"Mientras más gastas más te podemos ayudar a ahorrar"}\
      ]';

    jsonTramos = JSON.parse(strJSONTramosIndustrial);


  $("#slider").noUiSlider({
    start: 100,
    orientation: "vertical",
    range: {
      'min': 0,
      'max': 600
    },
    serialization: {
      format: {
        decimals: 0
      }
    }
  });


  $('#slider').on({
    slide: function(){
     updateInfoSlider();
    },
  });

  /*
  $("#home").click(function () {
    $('.simulation').removeClass('bgIndustry').addClass('bgHome');
    $(this).toggleClass('btn-link btn-black');
     $('#enterprise').toggleClass('btn-black btn-link');
     jsonTramos = JSON.parse(strJSONTramosResindencial);
     updateInfoSlider();
  });


  $("#enterprise").click(function () {
    $('.simulation').removeClass('bgHome').addClass('bgIndustry');
    $(this).toggleClass('btn-link btn-black');
     $('#home').toggleClass('btn-black btn-link');
     jsonTramos = JSON.parse(strJSONTramosIndustrial);
     updateInfoSlider();
  });*/


  $('#registerBtn').on('shown.bs.popover', function() {
    setTimeout(function() {
        $('#registerBtn').popover('hide');
    }, 3000);
  });

  //Initialize
  updateInfoSlider();
  simpleScrollSpy(710);

});

function simpleScrollSpy(positionY){
  $(window).scroll(function(){

    if  ($(window).scrollTop() >= positionY){
      $('#registerLink').addClass('visible');
    }else {
      $('#registerLink').removeClass('visible');
    }


 /*
    var mq = window.matchMedia( "(max-width: 767px)" );
    if (mq.matches) {
      if  ($(window).scrollTop() > 0){
        if ($('.navbar-collapse').hasClass('collapse','in')){
          $('.navbar-collapse').collapse('hide');
          $('.navbar-collapse').removeClass('collapse','in');
        }
      }
    }*/






  });
}

var jsonTramos;
function getInfoTramo(valor){
  for (i=0; i < jsonTramos.length; i++){
    if ( valor >= jsonTramos[i].begin && valor <= jsonTramos[i].end ){
      return [jsonTramos[i].text , jsonTramos[i].tip];
    }
  }
}

function updateInfoSlider(){
  var infoTramo=getInfoTramo($("#slider").val());
   //$('#infoSlider').html(infoTramo[0]);
   $('#infoSlider').html('$ '+sepMiles($("#slider").val()) +'MM Mensual <br> $ '+sepMiles($("#slider").val()*12)+'MM Anual');

   $('#tip').html(infoTramo[1]);

   //var colorLabel='hsla('+$("#slider").val()+',50%,45%,1)';
   //var borderColorHandle='hsla('+$("#slider").val()+',50%,38%,0.8)';
   //$('#infoSlider').css('background-color',colorLabel);
   //$('#infoSlider').css('border-color',colorLabel);
   //$('.noUi-handle').css('background-color',colorLabel).css('border-color', borderColorHandle);
   //$('#infoSlider').css('top',(($("#slider").val()*2)-13)+'px');
   $('#infoSlider').css('top',(( ($("#slider").val()/6) *2)-22)+'px');
}



function sepMiles(num){
  var num = num.toString().replace(/\./g,'');
  if(!isNaN(num)){
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    num = num.split('').reverse().join('').replace(/^[\.]/,'');
  }
  return num;
}

