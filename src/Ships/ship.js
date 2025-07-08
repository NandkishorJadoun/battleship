export class Ship {
  constructor() {
    this.hitCount = 0;
  }

  hit() {
    this.hitCount++;
    return this.hitCount;
  }
}

export class Carrier extends Ship {
  constructor() {
    super();
    this.length = 5;
  }
}

export class Battleship extends Ship {
  constructor() {
    super()
    this.length = 4;
  }
}

export class Cruiser extends Ship {
  constructor() {
    super()
    this.length = 3;
  }
}

export class Submarine extends Ship {
  constructor() {
    super()
    this.length = 2;
  }
}

export class Destroyer extends Ship {
  constructor() {
    super()
    this.length = 1;
  }
}
