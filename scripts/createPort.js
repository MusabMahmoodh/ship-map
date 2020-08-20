

import { Port }  from  './shared.js';


const form = document.querySelector('form');



form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    const type = document.getElementById("type").value;
    const size = document.getElementById("size").value;
    const location = document.getElementById("location").value;
    var lat ;
    var lng ;

    console.log("hi")
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=8739b49f320e4b609834b335790271ba&language=en&pretty=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            lat = data.results[0].geometry.lat;
            lng = data.results[0].geometry.lng;
            let port = new Port(name, country, type, size, lat, lng)
            console.log(port)
            var existingPorts = JSON.parse(localStorage.getItem("allPorts"));
            if(existingPorts == null) existingPorts = [];
            existingPorts.push(port);
            localStorage.setItem("allPorts", JSON.stringify(existingPorts)); 
            window.location.replace("../index.html");  
        });

    
    

  
});
  
  
  
  
  
  
  
  
  