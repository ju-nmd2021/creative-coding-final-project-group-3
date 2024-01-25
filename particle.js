class Particle(){
    constructor(){
     this.pos = createVector(random(width), random(height));
     this.vel = createVector(0, 0);
     this.acc = createVector(0, 0);
     this.maxspeed = 4;
     this.prevPos = this.pos.copy();
    }
}