import { Route,RouteList,ShipList }  from  './shared.js';



window.onload = function(){
    var geojson = []
    var distance ;
    
    // load ship and port data
    //from local storage
    var ports = JSON.parse(localStorage.getItem('allPorts')).ports;

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
    var ships_local = JSON.parse(localStorage.getItem('allShips')).ships;
    var ships = []
    ships.push(...ships_local)
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
      mapboxgl.accessToken = 'pk.eyJ1IjoibXVzYWI5ODciLCJhIjoiY2tlMmNvNjgzMDgwYTJzb2I1MmdlMTVkcSJ9.R5WwJb-qcA75bHn7L3gQsA';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3399, 48.8555],
      zoom: 3
      });
      
      var distanceContainer = document.getElementById('distance');
      // GeoJSON object to hold our measurement features
      var geojson_markers = {
      'type': 'FeatureCollection',
      'features': [{
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: src_port_geo
              },
              properties: {
                  'id': "start"
              }
          },
          {
              type: 'Feature',
              geometry: {
              type: 'Point',
              coordinates: des_port_geo
              },
              properties: {
                  'id': "end"
              }
          }]
      };
      // add initial markers to map
      function addMarkers() {
          geojson_markers.features.forEach(function(marker) {
  
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
      // adding markers for starting and ending point
      addMarkers()
      // 
      geojson = {
            type: 'FeatureCollection',
            features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: src_port_geo
                },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.',
                id:"start"
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
            description: 'San Francisco, California',
            id:"end"
                }
            },
            {
            type: 'Feature',
            geometry: {
            type: 'LineString',
            coordinates: [src_port_geo,des_port_geo]
                }
            }
        
            ]
        };
         
        // Used to draw a line between points
        var linestring = {
        'type': 'Feature',
        'geometry': {
        'type': 'LineString',
        'coordinates': []
        }
        };
         
        map.on('load', function() {
        map.addSource('geojson', {
        'type': 'geojson',
        'data': geojson
        });
         
        // Add styles to the map
        map.addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'geojson',
        paint: {
        'circle-radius': 5,
        'circle-color': 'orange'
        },
        filter: ['in', '$type', 'Point']
        });
        map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'geojson',
        layout: {
        'line-cap': 'round',
        'line-join': 'round'
        },
        paint: {
        'line-color': '#000',
        'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
        });
         
        map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
        });
         
        // Remove the linestring from the group
        // So we can redraw it based on the points collection
        if (geojson.features.length > 1) geojson.features.pop();
        // Clear the Distance container to populate it with a new value
        distanceContainer.innerHTML = '';
         
        // If a feature was clicked, remove it from the map
        if (features.length) {
        var id = features[0].properties.id;
        // Not allow first and last point to be deleted
        if( id != "start" && id != "end"){
            geojson.features = geojson.features.filter(function(point) {
                return point.properties.id !== id;
                })
         }
        } else {
            var point = {
                'type': 'Feature',
                'geometry': {
                'type': 'Point',
                'coordinates': [e.lngLat.lng, e.lngLat.lat]
                },
                'properties': {
                'id': String(new Date().getTime())
            }
            };
            //checking distance between two points
            //at this point we have removed the linestring(last value from geojson)
            var from = turf.point(geojson.features[geojson.features.length-2].geometry.coordinates);
            var to = turf.point(point.geometry.coordinates);
            var options = {units:'kilometers'};
            var distance_between_poits = turf.distance(from, to, options);
            if(distance_between_poits > 100){
                geojson.features.splice(geojson.features.length-1,0,point);
            } else {
                var value = document.createElement('div');
                value.textContent =
                'Distance should be greater than 100km';
                distanceContainer.appendChild(value);
            }
        }
         // mapping linestring with points 
        if (geojson.features.length > 1) {
            linestring.geometry.coordinates = geojson.features.map(function(
            point
            ) {
            return point.geometry.coordinates;
            });
            
            geojson.features.push(linestring);
            
            // Populate the distanceContainer with total distance
            var value = document.createElement('pre');
            value.textContent =
            'Total distance: ' +
            turf.length(linestring).toLocaleString() +
            'km';
            distanceContainer.appendChild(value);
        }
        distance = turf.length(linestring)
        map.getSource('geojson').setData(geojson);
        });
        });
         
      
      map.on('mousemove', function(e) {
          // display co-ordinate values
          document.getElementById('info').innerHTML =
                      // e.point is the x, y coordinates of the mousemove event relative
                      // to the top-left corner of the map
                      JSON.stringify(e.point) +
                      '<br />' +
                      // e.lngLat is the longitude, latitude geographical position of the event
                      JSON.stringify(e.lngLat.lng);
  
          
          var features = map.queryRenderedFeatures(e.point, {
          layers: ['measure-points']
          });
          // UI indicator for clicking/hovering a point on the map
          map.getCanvas().style.cursor = features.length
          ? 'pointer'
          : 'crosshair';
      });
      // console.log("Ended")

      
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
        let  way_points = geojson
        const srcPortSelectVal = document.getElementById('src_port_2').value;
        const desPortSelectVal = document.getElementById('des_port_2').value;
        const selectedShip = document.getElementById('ship').value;
        const date = document.getElementById('date').value;
        

        //Calculating cost
        
        //update ship status to 'en-route'
        ships.forEach(ship => {
            
            if ( ship.name == selectedShip){
                //check ship's range
                if(ship.range > distance) {
                    //calculate cost
                    var cost =  distance*ship.cost
                    //calculate time
                    var time = distance/(ship.maxSpeed*1.852)
                    


                    // change status to en-route
                    ship.status = "en-route"
                    let newShipList = new ShipList()
                    newShipList.ships = ships_local
                    localStorage.setItem("allShips", JSON.stringify(newShipList)); 
                    
                    
                    //add to route list
                    let route = new Route(`${selectedShip}.${srcPortSelectVal}.${desPortSelectVal}`,selectedShip, srcPortSelectVal, desPortSelectVal, distance,time, cost, date, way_points)
                    var existingRoutes = JSON.parse(localStorage.getItem("allRoutes"));
                    if(existingRoutes == null) existingRoutes = new RouteList();
                    existingRoutes.routes.push(route)

                    localStorage.setItem("allRoutes", JSON.stringify(existingRoutes)); 
                    window.location.replace("../index.html");  
                     
                } else {
                    console.log("here")
                    console.log(ship.range)
                    console.log(typeof ship.range)
                    var distanceContainer = document.getElementById('distance');
                    var value = document.createElement('div');
                    value.textContent =
                    "ship's range is less than the distance , please select another one";
                    distanceContainer.appendChild(value);
                }
               
            }
        
        });

       
    });
}
