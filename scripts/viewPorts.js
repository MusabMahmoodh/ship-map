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
        ${ port.latitude }
    </li>
    <li class="li-port-detail">
        ${ port.longitude }
    </li>
  `;
    container.appendChild(ul);
  }

const ports = JSON.parse(localStorage.getItem('allPorts'));
if (ports) {
    ports.forEach(port => {
        console.log(port)
        portMaker(port);
    });
}
else {
    console.log("no data")
}
