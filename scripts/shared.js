// maximum speed (in knots), range (in km),
export class Ship {
    constructor(name, maxSpeed, range, desc, cost) {
      this.name = name;
      this.maxSpeed = maxSpeed;
      this.range = range;
      this.desc = desc;
      this.cost = cost;
      this.status = "available";

      
    }

  }

export class Port {
    constructor(name, country, type, size, lat, lng) {
        this.name = name;
        this.country = country;
        this.type = type;
        this.size = size;
        this.lat = lat;
        this.lng = lng;
  
        
      }
}

export class Route {
    constructor(name, ship, source_port, destination_port, distance,time, cost, start_date, way_point_list) {
        this.name = name;
        this.ship = ship;
        this.source_port = source_port;
        this.destination_port = destination_port;
        this.distance = distance;
        this.time = time;
        this.cost = cost;
        this.start_date = start_date;
        this.way_point_list = way_point_list;
  
    }
}

export class ShipList {
    constructor() {
        this.ships = []
    }
  }

export class PortList {
    constructor() {
        this.ports = []
    }
}
export class RouteList {
    constructor() {
        this.routes = []
    }
}