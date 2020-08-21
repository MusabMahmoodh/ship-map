import { Route }  from  './shared.js';


window.onload = function(){
    var way_points = []
    
    // load ship and port data
    //from local storage
    var ports = JSON.parse(localStorage.getItem('allPorts'));

    fetch(`https://eng1003.monash/api/v1/ports/`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                data.ports.forEach((port) => {
                    ports.push(port)
                })
                createPort()
            });

    //load ship data
    // from local storage
    var ships = JSON.parse(localStorage.getItem('allShips'));
    //from Apis
    fetch(`https://eng1003.monash/api/v1/ships/`)
    .then(response => response.json())
    .then(data => {
        data.ships.forEach((ship) => {
            ships.push(ship)
        })
        
        createShip()
    });



    //rendering ports in select options
    function createPort() {
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
    //rendering ships in ship select option
    function createShip() {
      var shipSelect = document.getElementById('ship');
      ships.forEach(ship => {
        //check conditions
        if ( ship.status == "available"){
            const option = document.createElement('option');
            option.setAttribute('value', ship.name);
            option.innerHTML= ship.name 
            shipSelect.appendChild(option)
        }
      });
    }
    //FUnction to generat map
    function generateMap(src_port_geo, des_port_geo) {
      mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbTRtb2JpbGVhcHBzIiwiYSI6ImNrY3hvcXF5dzAyMzkycmxxOTkzaXJmOTYifQ.whkLuHWY1w-RiWgU221rIQ';
  
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-96, 37.8],
        zoom: 3
      });
      
      // to store co_ordinates
      var geojson = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: src_port_geo
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: des_port_geo
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
          }
        }]
      };
      // add markers to map
      function addMarkers() {
          geojson.features.forEach(function(marker) {
      
          // create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker';
      
          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
          .addTo(map);
          });
      }
      addMarkers()
      // get cordinates
      map.on('mousedown', function(e) {
              document.getElementById('info').innerHTML =
                  // e.point is the x, y coordinates of the mousemove event relative
                  // to the top-left corner of the map
                  JSON.stringify(e.point) +
                  '<br />' +
                  // e.lngLat is the longitude, latitude geographical position of the event
                  JSON.stringify(e.lngLat.lng);
                  way_points.push([e.lngLat.lng,e.lngLat.lng])
                  geojson.features.push({
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [JSON.stringify(e.lngLat.lng), JSON.stringify(e.lngLat.lat)]
                      },
                      properties: {
                        title: 'Mapbox',
                        description: 'San Francisco, California'
                      }
                    })
                    addMarkers()
              })
      console.log("Ended")
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

        //loading selected ports
        ports.forEach((port) => {
            if(port.name == srcPortSelectVal) {
                srcPortGeo = [port.lng, port.lat] 
            } else if(port.name == desPortSelectVal) {
                desPortGeo = [port.lng, port.lat]
            }
        })
        

        // toggling the form

        form1.style.display = 'none';
        
        form2.style.display = 'block';
        const srcPortSelectVal_2 = document.getElementById('src_port_2')
        const desPortSelectVal_2 = document.getElementById('des_port_2')
        srcPortSelectVal_2.value = srcPortSelectVal;
        desPortSelectVal_2.value = desPortSelectVal;

        createShip()


        //show map
        generateMap(srcPortGeo, desPortGeo)
    });

    // form2 submission

    form2.addEventListener('submit', function (e) {

        e.preventDefault();       
        console.log(way_points)
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
        let route = new Route("no name",selectedShip, srcPortSelectVal,   "not calculated","no time yet", "cost", date, way_points)
        var existingRoutes = JSON.parse(localStorage.getItem("allRoutes"));
        if(existingRoutes == null) existingRoutes = [];
        existingRoutes.push(route);
        console.log(existingRoutes)
        localStorage.setItem("allRoutes", JSON.stringify(existingRoutes)); 
        // // window.location.replace("../index.html");  
    });
}
