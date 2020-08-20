export class Ship {
    constructor(name, max_speed, range, description, cost) {
      this.name = name;
      this.max_speed = max_speed;
      this.range = range;
      this.description = description;
      this.cost = cost;
      this.status = "available";

      
    }
  }

export class Port {
    constructor(name, country, type, size, latitude, longitude) {
        this.name = name;
        this.country = country;
        this.type = type;
        this.size = size;
        this.latitude = latitude;
        this.longitude = longitude;
  
        
      }
}

export class Route {
    constructor(name, ship, source_port, distance,time, cost, start_date, way_point_list) {
        this.name = name;
        this.ship = ship;
        this.source_port = source_port;
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