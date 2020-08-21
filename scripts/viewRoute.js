console.log(window.location.href.split("?")[1].split("=")[1])

window.onload = function() {
    var ships = JSON.parse(localStorage.getItem('allShips'));
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