
$(document).ready(function () {
    $("li.active").removeClass("active");
    $('a[href="' + location.pathname + '"]')
      .closest("li")
      .addClass("active");
});

const nav = document.querySelector('.fixedNav');
const particules = document.querySelector('#particles-js');
const slider = document.querySelector('.slider');
window.addEventListener('scroll', fixNav);

function fixNav() {
    if (window.scrollY > nav.offsetHeight) {
        nav.classList.add('navbar-active');
        particules.classList.add('particules_none');
        slider.classList.add('static_slider');
    } else {
        nav.classList.remove('navbar-active');
        particules.classList.remove('particules_none');
        slider.classList.remove('static_slider');
    }
}



function openCity(evt, cityName) {
    evt.preventDefault();
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function openCity2(evt, cityName) {
    evt.preventDefault();
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  document.getElementById("defaultOpen").click();
  document.getElementById("defaultOpen2").click();
  document.getElementById('date').valueAsDate = new Date();


  $('#trajet-btn').click(function () {
    $('#trajet').show('slow');
    $('#mise').hide('slow');
  });

  $('#mise-btn').click(function () {
    $('#mise').show('slow');
    $('#trajet').hide('slow');
  });


  $("#btn1").click(function(){
    $(".btn1").css("background-color", "#F4E6D9");
    $(".btn2").css("background-color", "#fff");
  });

  $("#btn2").click(function(){
    $(".btn2").css("background-color", "#F4E6D9");
    $(".btn1").css("background-color", "#fff");
  });