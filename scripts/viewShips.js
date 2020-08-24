const container = document.getElementById('container');
const shipMaker = (ship) => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'ul-ship-card');

    ul.innerHTML = `
    ${ ship.name }
    <li class="li-ship-detail">
        Ship name: ${ ship.name }
    </li>
    <li class="li-ship-detail">
        Max_speed: ${ ship.maxSpeed }
    </li>
    <li class="li-ship-detail">
        Range :${ ship.range }
    </li>
    <li class="li-ship-detail">
        Description: ${ ship.desc }
    </li>
    <li class="li-ship-detail">
        Cost per Km: ${ ship.cost }
    </li>
    <li class="li-ship-detail">
        Status: ${ ship.status }
    </li>
  `;
    container.appendChild(ul);
  }


window.onload = function() {
    var ships;
    //get from local storage
    var ships_obj = JSON.parse(localStorage.getItem('allShips'));
    //if ship list is not in local storage, create an empty array
    if(ships_obj == null) {
        ships= []
    } else {
        ships = JSON.parse(localStorage.getItem('allShips')).ships;
    }
    //get from A
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
