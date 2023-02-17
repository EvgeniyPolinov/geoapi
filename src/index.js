import {validateIp} from './helpers'


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');


const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');


btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function handleKey(e) {
    if(e.key === 'Enter'){
        getData()
    };
}

function getData() {
    if(validateIp(ipInput.value)){
        fetch(`
        https://geo.ipify.org/api/v2/country?apiKey=at_bOjPlhIzouZ2aoMlauaKx8PHavl7v&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(data => setInfo(data))
    }
}

function setInfo(mapData) {
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;
}

let center = [55.76, 37.64];


function init(){
    let Map = new ymaps.Map("map", {
        center: center,
        zoom: 7
    });
    var myPlacemark = new ymaps.Placemark([55.8, 37.6]);
    Map.geoObjects.add(myPlacemark);

}

ymaps.ready(init)



