const container = document.getElementById('container');
const portMaker = (port) => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'ul-port-card');

    ul.innerHTML = `
    ${ port.name }
    <li class="li-port-detail">
        ${ port.country }
    </li>
    <li class="li-port-detail">
        ${ port.type }
    </li>
    <li class="li-port-detail">
        ${ port.size }
    </li>
    <li class="li-port-detail">
        ${ port.lat }
    </li>
    <li class="li-port-detail">
        ${ port.lng }
    </li>
  `;
    container.appendChild(ul);
  }

window.onload = function() {
    var ports;
    //get from local storage
    var ports_obj = JSON.parse(localStorage.getItem('allPorts'));
    //if port list is not in local storage, create an empty array
    if(ports_obj == null) {
        ports= []
    } else {
        ports = ports_obj.ports;
    }
    //fetch data from port  API
    fetch(`https://eng1003.monash/api/v1/ports/`)
    .then(response => response.json())
    .then((data) => {
        //push to ports array
        data.ports.forEach((port) => {
            ports.push(port)
        })
        ports.forEach(port => {
            portMaker(port)
        })
        
    });

}

