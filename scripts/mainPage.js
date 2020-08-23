const container = document.getElementById('container');
const routeMaker = (route) => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'ul-route-card');

    ul.innerHTML = `
    <a href="viewRoute.html?name=${ route.name }">Name: ${ route.name }</a>
    <li class="li-route-detail">
        Distance:    ${ route.distance }
    </li>
    <li class="li-route-detail">
        Cost: ${ route.cost }
    </li>
    <li class="li-route-detail">
        Time: ${ route.time }
    </li>
    <li class="li-route-detail">
        Date: ${ route.start_date }
    </li>
  `;
    container.appendChild(ul);
  }


window.onload = function() {
    //get route and sort
    var routes = JSON.parse(localStorage.getItem('allRoutes')).routes.slice().sort((a, b) => new Date(a.start_date)- new Date(b.start_date));
    if(routes){
        routes.forEach(route => {
            routeMaker(route)
            console.log(new Date(route.start_date))
        })
    } else {
        const h3 = document.createElement('h3');
        h3.innerHTML="No routes to display"
        container.appendChild(h3);
        console.log("here")
    }
    
    
 

}
