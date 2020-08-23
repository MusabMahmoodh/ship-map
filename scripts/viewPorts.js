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
    var ports = JSON.parse(localStorage.getItem('allPorts')).ports;
    fetch(`https://eng1003.monash/api/v1/ports/`)
    .then(response => response.json())
    .then((data) => {
        
        data.ports.forEach((port) => {
            ports.push(port)
        })
        ports.forEach(port => {
            portMaker(port)
        })
        
    });

}

