

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
    let milli = new Date();
    let timeStampMilli = milli.getMilliseconds();

    if (amp < 180) {
    stroke(colorThree);
    strokeWeight(Math.random() * 0.7);
    } else if (amp > 180 && amp < 229) {
    stroke(colorTwo);
    strokeWeight(Math.random() * 1.7);
    } else if (amp > 230 && amp < 290) {
    stroke(colorOne);
    strokeWeight(Math.random() * 1.7);
    } 
    
    if (amp > 235 && timeStampMilli < 500 && number === odd) {
    stroke(colorFour);
    strokeWeight(Math.random() * rndSongInt + 2);
    line(Math.random() * 1000, this.prevPos, 100, Math.random() * this.prevPos);
    }

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();

    if (alpha > 0) {
        alpha -= 5; 
      }
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


