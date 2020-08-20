import { Route }  from  './shared.js';


window.onload = function(){
  
    
    // load ship and port data
    //from local storage
    const ships = JSON.parse(localStorage.getItem('allShips'));
    var ports = JSON.parse(localStorage.getItem('allPorts'));
    //from Apis
    fetch(`https://eng1003.monash/api/v1/ships/`)
            .then(response => response.json())
            .then(data => {
                data.ships.forEach((ship) => {
                    ships.push(ship)
                })
                
                
            });
    fetch(`https://eng1003.monash/api/v1/ports/`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                data.ports.forEach((port) => {
                    ports.push(port)
                })
                createPort()
            });



    // Creating form
    var shipSelect = document.getElementById('ship');
    var srcPortSelect = document.getElementById('src_port');
    var desPortSelect = document.getElementById('des_port');


    //initializing the routes
    function createPort() {
        console.log(ports)
        //src
        ports.forEach(port => {
            const option = document.createElement('option');
            option.setAttribute('value', port.name);
            option.innerHTML= port.name 
            document.getElementById('src_port').appendChild(option)
            
        });
        //des
        ports.forEach(port => {
            const option = document.createElement('option');
            option.setAttribute('value', port.name);
            option.innerHTML= port.name 
            document.getElementById('des_port').appendChild(option)
            
        });

    }




    //Creating the Map Form
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');

    // Form1 submission
    form1.addEventListener('submit', function (e) {
        e.preventDefault();
        const srcPortSelectVal = document.getElementById('src_port').value;
        const desPortSelectVal = document.getElementById('des_port').value;
        
        // getting long and latittudes
        var srcPortGeo
        var desPortGeo

        ports.forEach((port) => {
            
            if(port.name == srcPortSelectVal) {
                srcPortGeo = [port.lng, port.lat] 
                console.log(port)
            } else if(port.name == desPortSelectVal) {
                desPortGeo = [port.lng, port.lat]
            }
        })
        
        // loadnig Map 
        const mapDiv = document.getElementById('map');
        const img = document.createElement('img');
        img.setAttribute('src', `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-s-heart+1ea458(${srcPortGeo[0]},${srcPortGeo[1]}),pin-s-heart+fb0909(${desPortGeo[0]},${desPortGeo[1]})/-73.7638,42.6564,0,0/600x300@2x?access_token=pk.eyJ1IjoidGVhbTRtb2JpbGVhcHBzIiwiYSI6ImNrY3hvcXF5dzAyMzkycmxxOTkzaXJmOTYifQ.whkLuHWY1w-RiWgU221rIQ`);
        mapDiv.appendChild(img);

        // toggling the form

        form1.style.display = 'none';
        
        form2.style.display = 'block';
        const srcPortSelectVal_2 = document.getElementById('src_port_2')
        const desPortSelectVal_2 = document.getElementById('des_port_2')
        srcPortSelectVal_2.value = srcPortSelectVal;
        desPortSelectVal_2.value = desPortSelectVal;

        ships.forEach(ship => {
            //check conditions
            if ( ship.status == "available"){
                const option = document.createElement('option');
                option.setAttribute('value', ship.name);
                option.innerHTML= ship.name 
                shipSelect.appendChild(option)
            }
        });


        //show form2
    });

    // form2 submission

    form2.addEventListener('submit', function (e) {
        e.preventDefault();
        const srcPortSelectVal = document.getElementById('src_port_2').value;
        const desPortSelectVal = document.getElementById('des_port_2').value;
        const selectedShip = document.getElementById('ship').value;
        const date = document.getElementById('date').value;
        
        //update ship status to 'en-route'
        ships.forEach(ship => {
            
            if ( ship.name == selectedShip){
                ship.status = "en-route"
                localStorage.setItem("allShips", JSON.stringify(ships));
            }
        
        });

        //add to route list
        let route = new Route("no name", desPortSelectVal, srcPortSelectVal, "not calculated","no time yet", "no data", date, "no data")
        var existingRoutes = JSON.parse(localStorage.getItem("allRoutes"));
        if(existingRoutes == null) existingRoutes = [];
        existingRoutes.push(route);
        console.log(existingRoutes)
        localStorage.setItem("allRoutes", JSON.stringify(existingRoutes)); 
        // window.location.replace("../index.html");  


        



    
    });
}