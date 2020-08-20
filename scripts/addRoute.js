
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
    option.setAttribute('value', 'port.name');
    option.innerHTML= port.name 
    srcPortSelect.appendChild(option)
});
ports.forEach(port => {
    const option = document.createElement('option');
    option.setAttribute('value', 'port.name');
    option.innerHTML= port.name 
    desPortSelect.appendChild(option)
});

//Creating the Map
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const srcPortSelectVal = document.getElementById('src_port').value;
    const desPortSelectVal = document.getElementById('des_port').value;
    


  
});
// const myLatLng = { lat: -25.363, lng: 131.044 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: myLatLng
//     });
//     new google.maps.Marker({
//       position: myLatLng,
//       map,
//       title: "Hello World!"
//     });