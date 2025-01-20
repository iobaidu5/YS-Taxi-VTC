
$(document).ready(function () {
    $("li.active").removeClass("active");
    $('a[href="' + location.pathname + '"]')
      .closest("li")
      .addClass("active");
});

var distanceEle;
var hoursEle;
var minutesEle;
var duration = 0;
var perKmEle;
var arriveEle;
var departEle;
var loader;
var dateSelected;
var timeSelected;
var dateDepart;
var timeDepart;

document.addEventListener("DOMContentLoaded", () => {
  distanceEle = document.querySelectorAll(".dist");
  hoursEle = document.querySelectorAll(".hours");
  minutesEle = document.querySelectorAll(".minutes");
  perKmEle = document.querySelectorAll("#perKm");
  departEle = document.querySelectorAll("#depart");
  arriveEle = document.querySelectorAll("#arrive");
  loader = document.getElementById("loader");
  dateSelected = document.querySelectorAll("#selectedDate");
  timeSelected = document.querySelectorAll("#selectedTime");
  dateDepart = document.getElementById('date-depart');
  timeDepart = document.getElementById('time-depart');
});



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

  // document.getElementById("defaultOpen").click();
  // document.getElementById("defaultOpen2").click();
  // document.getElementById('date').valueAsDate = new Date();


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


  // système de reservation vehicule
const passagers = document.getElementById('nombre-passagers');
const bagages = document.getElementById('bagages');

const firstStep = document.querySelector('.first-step');
const secondStep = document.querySelector('.second-step');
const thirdStep = document.querySelector('.third-step');
const suivantButton = document.getElementById('suivant');

const estimationButton = document.getElementById('estimation');

const adresseDepart = document.getElementById('adresse-depart');
const adresseDestination = document.getElementById('adresse-destination');

const vehiculeRadios = document.querySelectorAll('input[type=radio][name=vehicule]');
const priceChoosen = document.querySelector('.priceChoosen');
const totalFare = document.querySelectorAll('.totalFare');
const vehChoose = document.querySelectorAll('.vehChoose');

let coordonnesDestinationList = [];
let coordonnesDepartList = [];

const coordonneesDepartSelected = [];
const coordonneesDestinationtSelected = [];

const pricePerKm = {
    'Van': 3.20,
    'Berline': 2.70,
    'Eco': 2.20,
    'Limousine': 4
}

const allCars = {
  'van-car': 3.20,
  'berline-car': 2.70,
  'eco-car': 2.20,
  'limousine-car': 4
}

const chooseCar = () => {
    const van = document.querySelector('.Van').parentElement;
    const eco = document.querySelector('.Eco').parentElement;
    const berline = document.querySelector('.Berline').parentElement;
    const limousine = document.querySelector('.Limousine').parentElement;

    secondStep.classList.remove('none');

    if ((passagers.value < 5 && bagages.value <= 4)) {
        van.classList.remove('none');
        eco.classList.remove('none');
        berline.classList.remove('none');
        limousine.classList.remove('none');
        return
    }

    van.classList.remove('none');
    eco.classList.add('none');
    berline.classList.add('none');
    limousine.classList.add('none');
}

// autocompletion des adresses
const createAutocomplete = (coordonneesList, inputHtml, classContainer, coordonneesSelected) => {
    const list = document.querySelector(classContainer);
    if (list.children.length >= 3) {
        list.innerHTML = "";
    }
    const item = document.createElement('li');
    item.setAttribute('class', 'autocomplete-item');

    coordonneesList.forEach(coordonnee => {
        item.innerHTML = coordonnee.properties.label;
        list.appendChild(item);
    })

    item.addEventListener('click', () => {
        inputHtml.value = item.innerText;
        list.innerHTML = "";
        coordonneesSelected.splice(0, coordonneesSelected.length);
        coordonneesSelected.push(coordonneesList.filter(c => c.properties.label === inputHtml.value));
    })
}

adresseDepart.addEventListener('input', async e => {
    coordonnesDepartList = await getLocation(e.target.value);
    createAutocomplete(coordonnesDepartList, adresseDepart, '.autocomplete-list-depart', coordonneesDepartSelected);
})

adresseDestination.addEventListener('input', async e => {
    coordonnesDestinationList = await getLocation(e.target.value);
    createAutocomplete(coordonnesDestinationList, adresseDestination, '.autocomplete-list-destination', coordonneesDestinationtSelected);
})

const getLocation = async (lieu) => {
    const adresses = [];

    await geoApiGouvAdresse
        .search(lieu)
        .then(response => {
            response.features.forEach(address => {
                adresses.push(address);
            });
        })
        .catch(error => {
            console.log(error);
        });
    return adresses;
}

function showLoader() {
  loader.style.display = "flex"; // Show the loader
}

function hideLoader() {
  loader.style.display = "none"; // Hide the loader
}


const distance = async (lat1, lon1, lat2, lon2) => {
  console.log("lat1, lon1, lat2, lon2 -> ", lat1, lon1, lat2, lon2)
  showLoader();
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248674d3558a5df4b4d94aa2d5c0f6e350c&start=${lon1},${lat1}&end=${lon2},${lat2}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data ---> ", data)
    const distance = data.features[0].properties.segments[0].distance / 1000;
    duration = data.features[0].properties.segments[0].duration;
    hideLoader();
    return distance;
}

const calculPrice = async () => {

    if (coordonneesDepartSelected.length === 0 || coordonneesDestinationtSelected.length === 0) return alert('Selectionnez une adresse valide');


    console.log("check ", coordonneesDepartSelected[0][0].geometry.coordinates[1], coordonneesDepartSelected[0][0].geometry.coordinates[0], coordonneesDestinationtSelected[0][0].geometry.coordinates[1], coordonneesDestinationtSelected[0][0].geometry.coordinates[0])


    const dist = await distance(coordonneesDepartSelected[0][0].geometry.coordinates[1], coordonneesDepartSelected[0][0].geometry.coordinates[0], coordonneesDestinationtSelected[0][0].geometry.coordinates[1], coordonneesDestinationtSelected[0][0].geometry.coordinates[0]);
    console.log("dist -> ", dist)
    console.log("duration -> ", duration)
    distanceEle.forEach((ele) => {
      ele.innerText = `${parseFloat(dist).toFixed(2)}`;
    });

    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    
    console.log("hours -> ", hours);
    console.log("minutes -> ", minutes);

    if (hoursEle) {
      hoursEle.forEach((ele) => {
        ele.innerText = `${parseFloat(hours).toFixed(2)}`;
      });
    }
    if (minutesEle){
      hoursEle.forEach((ele) => {
        ele.innerText = `${parseFloat(minutes).toFixed(2)}`;
      });
    }

    // if (passagers.value === "none") return alert('Vous devez selectionnez un nombre de passagers !');
    // if (bagages.value === "none") return alert('Vous devez sélectionner un nombre de bagages');

    for (const vehicule in pricePerKm) {
      console.log("pricePerKm -> ", vehicule);
        if (Object.hasOwnProperty.call(pricePerKm, vehicule)) {
            const choice = document.querySelector(`.${vehicule} p.prix`);
            console.log("choice -< ", choice)
            const priceInput = document.querySelector(`.${vehicule} input.priceInput`); 
            perKmEle.innerText = `${parseFloat(pricePerKm).toFixed(2)}`
            priceInput.value = parseFloat(dist * pricePerKm[vehicule]).toFixed(2);
            choice.innerText = `Prix: ${parseFloat(dist * pricePerKm[vehicule]).toFixed(2)}€`
        }
    }

    priceChoosen.value = document.querySelector('.Van input.priceInput').value;

    return true;
}

// estimationButton.addEventListener('click', async () => {
//   console.log("estimation clicked")
//     const prix = await calculPrice();
//     if (prix) chooseCar();
// });


document.addEventListener("DOMContentLoaded", () => {
  const departInput = document.getElementById("adresse-depart");
  const destinationInput = document.getElementById("adresse-destination");
  const destinationList = document.querySelector(".autocomplete-list-destination");

  // Simulated onChange function
  const onChange = async () => {
      console.log("Both fields have values. Calling onChange function...");
      console.log("Adresse de départ:", departInput.value);
      console.log("Adresse de destination:", destinationInput.value);

      arriveEle.forEach((ele) => {
        ele.innerText = departInput.value; 
      });

      departEle.forEach((ele) => {
        ele.innerText = destinationInput.value;
      });

      dateSelected.forEach((ele) => {
        ele.innerText = dateDepart.value;
      });

      timeSelected.forEach((ele) => {
        ele.innerText = timeDepart.value;
      });

      const prix = await calculPrice();
      if (prix) chooseCar();
  };

  // Add event listener for the autocomplete list selection
  destinationList.addEventListener("click", (event) => {
      const selectedValue = event.target.textContent;

      // Set the value of the destination input field
      destinationInput.value = selectedValue;

      // Check if both fields have values
      if (departInput.value.trim() !== "" && destinationInput.value.trim() !== "") {
          onChange();
      }
  });
});


suivantButton.addEventListener('click', () => {
  console.log("suivantButton click -")
    if (dateDepart.value === '' || timeDepart.value === '') return alert('veuillez seléctionner une date et une heure valide');
    firstStep.classList.add('none');
    secondStep.classList.add('none');
    thirdStep.classList.remove('none');
    
    document.getElementById("devis-reservation").scrollIntoView({ behavior: 'smooth' })
})

vehiculeRadios.forEach(radio => {
    radio.addEventListener('click', () => {
      // Trouvez l'élément "Estimation du prix" correspondant au véhicule sélectionné
      const priceInput = radio.parentElement.querySelector('.priceInput');

        
        priceChoosen.value = priceInput.value;
        const carSele = priceInput.id;
        console.log("priceInput carSele -> ", carSele)
        console.log("priceInput -> allCars.carSele ", allCars.carSele)
        totalFare.forEach((ele) => {
          ele.innerText = `€ ${parseFloat(priceInput.value).toFixed(2)}`;
        });

        perKmEle.forEach((ele) => {
          ele.innerText = allCars[carSele]
        });

        vehChoose.forEach((ele) => {
          ele.innerText = `${carSele}`;
        });
        
    });
  });


dateDepart.setAttribute('min', new Date().toISOString().split('T')[0]);
dateDepart.value = new Date().toISOString().split('T')[0];
console.log("dateDepart.value -> ", dateDepart.value)

timeDepart.value = new Date().getHours() + ':00' ;


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