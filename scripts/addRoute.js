import { Route }  from  './shared.js';



window.onload = function(){
    var geojson = []
    var distance ;
    
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
      mapboxgl.accessToken = 'pk.eyJ1IjoibXVzYWI5ODciLCJhIjoiY2tlMmNvNjgzMDgwYTJzb2I1MmdlMTVkcSJ9.R5WwJb-qcA75bHn7L3gQsA';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.3399, 48.8555],
      zoom: 3
      });
      
      var distanceContainer = document.getElementById('distance');
      // GeoJSON object to hold our measurement features
      geojson = {
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
      // adding markers for starting and ending point
      addMarkers()
      // Used to draw a line between points
      var linestring = {
      'type': 'Feature',
      'geometry': {
      'type': 'LineString',
      'coordinates': [[-122.414, 37.776],[-77.032, 38.913] ]
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
          layers: ['measure-points']//when click add an point layer
      });
      
      // Remove the linestring from the group
      // So we can redraw it based on the points collection
      if (geojson.features.length > 1) geojson.features.pop();
      
      // Clear the Distance container to populate it with a new value
      distanceContainer.innerHTML = '';
      
      // If a feature was clicked, remove it from the map
      if (features.length) {
      var id = features[0].properties.id;
      geojson.features = geojson.features.filter(function(point) {
          if(point.properties.id !== 'start' && point.properties.id !== 'end') {
              return point.properties.id !== id;
          }
      });
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
      
      geojson.features.push(point);
      }
      
      if (geojson.features.length > 1) {
      linestring.geometry.coordinates = geojson.features.map(function(
      point
      ) {
      return point.geometry.coordinates;
      });
      
      geojson.features.push(linestring);
      
      // Populate the distanceContainer with total distance
      distance = turf.length(linestring).toLocaleString();
      var value = document.createElement('pre');
      value.textContent =
      'Total distance: ' +
      turf.length(linestring).toLocaleString() +
      'km';
      distanceContainer.appendChild(value);
      }
      
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
        let  way_points = geojson.features[geojson.features.length - 1].geometry.coordinates
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
        let route = new Route(`${selectedShip}.${srcPortSelectVal}.${desPortSelectVal} `,selectedShip, srcPortSelectVal, desPortSelectVal, distance,String(new Date().getTime()), "cost", date, way_points)
        var existingRoutes = JSON.parse(localStorage.getItem("allRoutes"));
        if(existingRoutes == null) existingRoutes = [];
        existingRoutes.push(route);
        console.log(existingRoutes)
        localStorage.setItem("allRoutes", JSON.stringify(existingRoutes)); 
        console.log(existingRoutes)
        window.location.replace("../index.html");  
    });
}
