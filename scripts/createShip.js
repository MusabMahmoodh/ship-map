import { Ship,ShipList }  from  './shared.js';


const form = document.querySelector('form');



form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Getting form datas
    const name = document.getElementById("name").value;
    const max_speed = document.getElementById("max_speed").value;//in knots
    const range = document.getElementById("range").value;//in kms
    const description = document.getElementById("description").value;
    const cost = document.getElementById("cost").value;
    //create ship object and shiplist oject
    let ship = new Ship(name, max_speed, range, description, cost)
    let shipList = new ShipList();
    // Saving to local storage
    var existingShips = JSON.parse(localStorage.getItem("allShips"));
    //if the required item is not in the local storage , create a ship list object in local storage
    if(existingShips == null) existingShips = new ShipList();
    //push created ship to ShipList object
    existingShips.ships.push(ship)
    //save the new list to local storage
    localStorage.setItem("allShips", JSON.stringify(existingShips)); 
    //redirect to index.html
    window.location.replace("../index.html");  

    
  });








