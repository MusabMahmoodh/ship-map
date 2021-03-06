

import { Port, PortList }  from  './shared.js';


const form = document.querySelector('form');



form.addEventListener('submit', function (e) {
    e.preventDefault();
    //getting form data
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    const type = document.getElementById("type").value;
    const size = document.getElementById("size").value;
    const location = document.getElementById("location").value;
    var lat ;
    var lng ;
    //get location detail from API
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=8739b49f320e4b609834b335790271ba&language=en&pretty=1`)
        .then(response => response.json())
        .then(data => {
            //get langitude and latitdue
            lat = data.results[0].geometry.lat;
            lng = data.results[0].geometry.lng;
            //create new port instance
            let port = new Port(name, country, type, size, lat, lng)
            // Saving to local storage
            var existingPorts = JSON.parse(localStorage.getItem("allPorts"));
            if(existingPorts == null) existingPorts = new PortList();
            existingPorts.ports.push(port)
            localStorage.setItem("allPorts", JSON.stringify(existingPorts)); 
            window.location.replace("../index.html");  
        });

    
    

  
});
  
  
  
  
  
  
  
  
  