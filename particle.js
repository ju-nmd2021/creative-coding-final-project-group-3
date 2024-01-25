class Particle(){
    constructor(){
     this.pos = createVector(random(width), random(height));
     this.vel = createVector(0, 0);
     this.acc = createVector(0, 0);
     this.maxspeed = 4;
     this.prevPos = this.pos.copy();
    }
}

update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

