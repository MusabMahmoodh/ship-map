
// 
//load from Api


// load ship and port data
const ships = JSON.parse(localStorage.getItem('allShips'));
const ports = JSON.parse(localStorage.getItem('allPorts'));
// Creating form
const shipSelect = document.getElementById('ship');
const srcPortSelect = document.getElementById('src_port');
const desPortSelect = document.getElementById('des_port');


ships.forEach(ship => {
    const option = document.createElement('option');
    option.setAttribute('value', 'ship.name');
    option.innerHTML= ship.name 
    shipSelect.appendChild(option)
});
ports.forEach(port => {
    const option = document.createElement('option');
    option.setAttribute('value', port.name);
    option.innerHTML= port.name 
    srcPortSelect.appendChild(option)
});
ports.forEach(port => {
    const option = document.createElement('option');
    option.setAttribute('value', port.name);
    option.innerHTML= port.name 
    desPortSelect.appendChild(option)
});

//Creating the Map
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const srcPortSelectVal = document.getElementById('src_port').value;
    const desPortSelectVal = document.getElementById('des_port').value;
    // getting long and latittudes
    var srcPortGeo
    var desPortGeo

    ports.forEach((port) => {
        if(port.name == srcPortSelectVal) {
            srcPortGeo = [port.longitude, port.latitude] 
        } else if(port.name == desPortSelectVal) {
            desPortGeo = [port.longitude, port.latitude]
        }
    })
    // console.log(srcPortGeo)
    // console.log(desPortGeo)
    
    // Map 
    const mapDiv = document.getElementById('map');
    const img = document.createElement('img');
    img.setAttribute('src', `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-s-heart+1ea458(${srcPortGeo[0]},${srcPortGeo[1]}),pin-s-heart+fb0909(${desPortGeo[0]},${desPortGeo[1]})/-73.7638,42.6564,0,0/600x300@2x?access_token=pk.eyJ1IjoidGVhbTRtb2JpbGVhcHBzIiwiYSI6ImNrY3hvcXF5dzAyMzkycmxxOTkzaXJmOTYifQ.whkLuHWY1w-RiWgU221rIQ`);
    mapDiv.appendChild(img);


  
});
