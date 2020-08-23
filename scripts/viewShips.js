const container = document.getElementById('container');
const shipMaker = (ship) => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'ul-ship-card');

    ul.innerHTML = `
    ${ ship.name }
    <li class="li-ship-detail">
        ${ ship.name }
    </li>
    <li class="li-ship-detail">
        ${ ship.maxSpeed }
    </li>
    <li class="li-ship-detail">
        ${ ship.range }
    </li>
    <li class="li-ship-detail">
        ${ ship.desc }
    </li>
    <li class="li-ship-detail">
        ${ ship.cost }
    </li>
    <li class="li-ship-detail">
        ${ ship.status }
    </li>
  `;
    container.appendChild(ul);
  }


window.onload = function() {
    var ships = JSON.parse(localStorage.getItem('allShips')).ships;
    fetch(`https://eng1003.monash/api/v1/ships/`)
    .then(response => response.json())
    .then((data) => {
        
        data.ships.forEach((ship) => {
            ships.push(ship)
        })
        ships.forEach(ship => {
            shipMaker(ship)
        })
        
    });
   

}
