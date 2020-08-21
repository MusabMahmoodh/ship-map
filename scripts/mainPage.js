const container = document.getElementById('container');
const routeMaker = (route) => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'ul-route-card');

    ul.innerHTML = `
    ${ route.name }
    <li class="li-route-detail">
        ${ route.distance }
    </li>
    <li class="li-route-detail">
        ${ route.cost }
    </li>
    <li class="li-route-detail">
        "cHECK SOME details are missing"
    </li>
  `;
    container.appendChild(ul);
  }


window.onload = function() {
    
    var routes = JSON.parse(localStorage.getItem('allRoutes'));
    routes.forEach(route => {
        routeMaker(route)
    })
    
 

}
