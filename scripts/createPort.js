

import { Port }  from  './shared.js';


const form = document.querySelector('form');



form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    const type = document.getElementById("type").value;
    const size = document.getElementById("size").value;
    const Location = document.getElementById("location").value;
    var latitude ;
    var longitude ;


    fetch(`https://api.opencagedata.com/geocode/v1/json?q={ Location }&key=8739b49f320e4b609834b335790271ba&language=en&pretty=1`)
        .then(response => response.json())
        .then(data => {
            latitude = data.results[0].geometry.lat;
            longitude = data.results[0].geometry.lng;
            let port = new Port(name, country, type, size, latitude, longitude)
            console.log(port)
            var existingPorts = JSON.parse(localStorage.getItem("allPorts"));
            if(existingPorts == null) existingPorts = [];
            existingPorts.push(port);
            localStorage.setItem("allPorts", JSON.stringify(existingPorts)); 
        });

    
    window.location.replace("../index.html");  

  
});
  
  
  
  
  
  
  
  
  