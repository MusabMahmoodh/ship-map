import { RouteList }  from  './shared.js';


window.onload = function() {
    var route;
    var way_points;
    var routes = JSON.parse(localStorage.getItem('allRoutes')).routes;
    routes.forEach(element => {
        if(element.name.trim().localeCompare(window.location.href.split("?")[1].split("=")[1].split("%20").join(" ").trim()) == 0) {
            route = element
        }
        
    });

    way_points=route.way_point_list
    //settings
    document.getElementById('src_port_2').value = route.source_port;
    document.getElementById('des_port_2').value =route.destination_port;
    document.getElementById('ship').value =route.ship ;
    document.getElementById('date').value = route.start_date ;


    generateMap(way_points)
    function generateMap(way_points) {
        mapboxgl.accessToken = 'pk.eyJ1IjoibXVzYWI5ODciLCJhIjoiY2tlMmNvNjgzMDgwYTJzb2I1MmdlMTVkcSJ9.R5WwJb-qcA75bHn7L3gQsA';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [2.3399, 48.8555],
        zoom: 3
        });
        // 
        var geojson = way_points
           
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
        'circle-color': '#711'
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
        
        });
  
        
      }

    const btn_del = document.getElementById('btn_del')
    console.log(routes)
    btn_del.addEventListener('click', function(e){
        routes = routes.filter((x) => x != route)
        console.log(routes)
       
        let newRouteList = new RouteList()
        newRouteList.routes = routes
        localStorage.setItem("allRoutes", JSON.stringify(newRouteList)); 
        window.location.replace("../index.html"); 
    })

}