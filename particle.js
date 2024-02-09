
class Particle {
    //Reference: The following Particle code was adapted from https://youtu.be/BjoM9oKOAKY Accessed: 2024-01-23
    constructor() {
     this.pos = createVector(random(width), random(height));
     this.vel = createVector(0, 0);
     this.acc = createVector(0, 0);
     this.maxspeed = 1;
     this.prevPos = this.pos.copy();
    }

update() {
    if (amp < 170) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed - 0.5);
        this.pos.add(this.vel);
        this.acc.mult(rndUpInt);
    }
    else if (amp > 220 && amp < 240) {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed + 1);
    this.pos.add(this.vel);
    this.acc.mult(0);
    } else if (amp > 240) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed + 5);
        this.pos.add(this.vel);
        this.acc.mult(2);}
    else if (amp < 190 && amp > 180) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    } else if (amp < 180 && amp > 170) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed + 0.5);
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
}

show() {
    let milli = new Date();
    let timeStampMilli = milli.getMilliseconds();

    if (amp < 180) {
    stroke(colorThree);
    strokeWeight(Math.random() * 1.5);
    } else if (amp > 180 && amp < 229) {
    stroke(colorTwo);
    strokeWeight(Math.random() * 3.7);
    } else if (amp > 245) {
    stroke(colorOne);
    strokeWeight(Math.random() * 5.7);
    } 
    
    if (amp > 235 && timeStampMilli < 500 && number === odd) {
    stroke(colorFour);
    strokeWeight(Math.random() * rndTrackInt + 4);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }

    if (amp > 235 && timeStampMilli > 500 && number === even) {
        stroke(colorThree);
        strokeWeight(Math.random() * rndTrackInt + 12);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        }

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  
    this.updatePrev();

};

updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
};

edges() {
    //------NOTE: The following code caused unwanted horizontal lines to shoot across the screen so it was disabled. 

    // if(this.pos.x > width) {
    //     this.pos.x = 0;
    //     this.updatePrevious;
    // }
    // if (this.pos.x < 0) {
    //     this.pos.x = width;
    //     this.updatePrev();
    // }
    // if (this.pos.y > height) {
    //     this.pos.y = 0;
    //     this.updatePrev();
    // }
    // if (this.pos.y < 0) {
    //     this.pos.y = height;
    //     this.updatePrev();
    // }
 }

 
}