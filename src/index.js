import {createPlacemark, getAdress, validateIp} from "./helpers";


const  ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    yandexMap.geoObjects.removeAll();
    if (validateIp(ipInput.value)) {        
        getAdress(ipInput.value)
            .then(setInfo)
    }
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const {lat, lng, city, country, timezone} = mapData.location;
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = `${city}, ${country}`;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;

    yandexMap.setCenter([lat, lng]);
    createPlacemark(yandexMap, lat, lng);
    
}
//A variable that contains our map
let yandexMap;

// This function creates map centered on the Kremlin or a map centered on your location (if this feature
// is enabled in your browser)
function createMap() {
    let geolocation = ymaps.geolocation;
    yandexMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
    });

    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        yandexMap.geoObjects.add(result.geoObjects);
    });
}

// Map creation
ymaps.ready(createMap);


