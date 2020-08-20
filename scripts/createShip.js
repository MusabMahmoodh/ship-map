import { Ship }  from  './shared.js';


const form = document.querySelector('form');



form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const max_speed = document.getElementById("max_speed").value;
    const range = document.getElementById("range").value;
    const description = document.getElementById("description").value;
    const cost = document.getElementById("cost").value;

    let ship = new Ship(name, max_speed, range, description, cost)
    // console.log(ship)
    var existingShips = JSON.parse(localStorage.getItem("allShips"));
    if(existingShips == null) existingShips = [];
    existingShips.push(ship);
    localStorage.setItem("allShips", JSON.stringify(existingShips)); 
    window.location.replace("../index.html");  

    
  });








