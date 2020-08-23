import { Ship,ShipList }  from  './shared.js';


const form = document.querySelector('form');



form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const max_speed = document.getElementById("max_speed").value;//in knots
    const range = document.getElementById("range").value;//in kms
    const description = document.getElementById("description").value;
    const cost = document.getElementById("cost").value;

    let ship = new Ship(name, max_speed, range, description, cost)
    let shipList = new ShipList();
    // Saving to local storage
    var existingShips = JSON.parse(localStorage.getItem("allShips"));
    if(existingShips == null) existingShips = new ShipList();
    existingShips.ships.push(ship)
    localStorage.setItem("allShips", JSON.stringify(existingShips)); 
    window.location.replace("../index.html");  

    
  });








