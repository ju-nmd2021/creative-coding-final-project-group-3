

class Particle {
    constructor() {
     this.pos = createVector(random(width), random(height));
     this.vel = createVector(0, 0);
     this.acc = createVector(0, 0);
     this.maxspeed = 1;
     this.prevPos = this.pos.copy();
    }

update() {
    if (amp > 220) {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    } else if (amp > 190) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed - 0.5);
        this.pos.add(this.vel);
        this.acc.mult(0);
    } else if (amp < 180) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed - 0.7);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
};

follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
};


applyForce(force) {
    this.acc.add(force);
    
};

show() {


    if (amp < 180) {
    stroke(colorThree);
    } else if (amp > 180 && amp < 235) {
    stroke(colorTwo);
    } else if (amp > 235 && amp < 290) {
    stroke(255, 255, 255);
    }

    strokeWeight(Math.random() * 0.7);

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
};

updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
};

edges() {
    if(this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrevious;
    }
    if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrev();
    }
    if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrev();
    }
    if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
    }
 }
}