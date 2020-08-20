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
        ${ ship.max_speed }
    </li>
    <li class="li-ship-detail">
        ${ ship.range }
    </li>
    <li class="li-ship-detail">
        ${ ship.description }
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

const ships = JSON.parse(localStorage.getItem('allShips'));
if (ships) {
    ships.forEach(ship => {
        console.log(ship)
        shipMaker(ship);
    });
}
else {
    console.log("no data")
}
