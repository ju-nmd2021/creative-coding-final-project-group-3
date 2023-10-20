//------------------------------------------\\VARIABLES//-----------------------------//

//----------Audio Variables 
let popSong1;
let popSong2;
let popSong3;
let popSong4;
let popSong5;
let rockSong1;
let rockSong2;
let rockSong3;
let rockSong4; 
let rockSong5;

//----------Waveform/Particle Variables 
let fft;
let particles = [];

//----------Random Variables 
let rndTrackInt;
let rndSongInt; 
let particleInt;  
let waveInt;

//----------Color Variables 
let colorOne;
let colorTwo;
let colorThree;
let hexString = "0123456789abcdef";

//----------Button Variables 
let button = document.getElementById('generateBtn');
let backButtonX = 30;
let backButtonY = 880;

//----------Display Variables
let homeContent = document.getElementById('home-content');
let state = 0; 

//------------------------------------------\\AUDIO SOURCE SELECTION//-----------------------------//

//----------Loads all audio sources
function preload() {
    popSong1 = loadSound('/Audio Files/DuaLipa.mp3');
    popSong2 = loadSound('/Audio Files/Flowers.mp3');
    popSong3 = loadSound('/Audio Files/Daylight.mp3');
    popSong4 = loadSound('/Audio Files/Lights.mp3');
    popSong5 = loadSound('/Audio Files/Sunflower.mp3');
    rockSong1 = loadSound('/Audio Files/ACDC.mp3');
    rockSong2 = loadSound('/Audio Files/Mississippi.mp3');
    rockSong3 = loadSound('/Audio Files/Bohemian.mp3');
    rockSong4 = loadSound('/Audio Files/RocknRoll.mp3');
    rockSong5 = loadSound('/Audio Files/TeenSpirit.mp3');
   };

//----------Selects what song will be played depending on the selected genre 
function songPicker() {
    let selectedGenre = document.getElementById('genre-select').value;
    

    switch (rndTrackInt) {
        case 7:
        if (selectedGenre==='pop') {
            popSong1.play();
        } else if (selectedGenre==='rock') {
            rockSong1.play();
        }
        break;
        case 8:
        if (selectedGenre==='pop') {
            popSong2.play();
        } else if (selectedGenre==='rock') {
            rockSong2.play();
        }
        break;
        case 9:
        if (selectedGenre==='pop') {
            popSong3.play();
        } else if (selectedGenre==='rock') {
            rockSong3.play();
        }
        break;
        case 10:
        if (selectedGenre==='pop') {
            popSong4.play();
        } else if (selectedGenre==='rock') {
            rockSong4.play();
        }
        break;
        case 11:
        if (selectedGenre==='pop') {
            popSong5.play();
        } else if (selectedGenre==='rock') {
            rockSong5.play();
        }
        break;
        }
}

//----------Stops audio from being played 
function songStopper() {
    popSong1.stop();
    rockSong1.stop();
    popSong2.stop();
    rockSong2.stop();
    popSong3.stop();
    rockSong3.stop();
    popSong4.stop();
    rockSong4.stop();
    popSong5.stop();
    rockSong5.stop();
}

//------------------------------------------\\RANDOM INTEGERS//-----------------------------//

//REFERENCE: The following 13 lines were written referencing https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript Accessed: 2023-10-13

//----------Resets the random integers 
function setup() {
    randomIntegers();
}
//----------Resets the random integers 
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//----------Selects integers within specific ranges
function randomIntegers() {
    rndSongInt = randomIntFromInterval(1, 6);
    rndTrackInt = randomIntFromInterval(7, 12);
    particleInt = randomIntFromInterval(0.01000, 300);
    waveInt = randomIntFromInterval(300, 1000);
    }

//------------------------------------------\\COLOR GENERATION//-----------------------------//

//Reference: The following 15 lines of code were adapted from https://proxlight.hashnode.dev/random-gradient-generator-javascript-tutorial Accessed: 2023-10-13

//----------Selects a random hexcode 
let randomColor = () => {
    let hexCode = "#";
    for( i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}

//----------Generates a background gradient using three of the random hexcodes 
let randomGradient = () => {
    colorOne = randomColor();
    colorTwo = randomColor();
    colorThree = randomColor();
    let angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo}, ${colorThree})`;
}

//------------------------------------------\\PARTICLE GENERATION//-----------------------------//

//Reference: The particle generation from an audio source was adapted from https://www.youtube.com/watch?v=uk96O7N1Yo0&t=69s Accessed: 2023-09-20

//----------Defines the particles that are shown in the 'pop' genre
class popParticle {
    constructor() {
        let particleInt = randomIntFromInterval(300, 3000);
        let selectedGenre = document.getElementById('genre-select').value;
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.5000, Math.random() * 10);
            this.acc = this.pos.copy().mult(random(0.01000, 0.02002));
            this.w = random(Math.random() * 5, Math.random() * 5);
        if (selectedGenre === 'pop' && rndSongInt === 1) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.5000, Math.random() * 10);
            this.acc = this.pos.copy().mult(random(0.01000, 0.02002));
            this.w = random(Math.random() * 5, Math.random() * 5);
        } else if (selectedGenre === 'pop' && rndSongInt === 2) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 2);
            this.acc = this.pos.copy().mult(random(0.10000, 0.20002));
            this.w = random(Math.random() * 3, Math.random() * 10);
        } else if (selectedGenre === 'pop' && rndSongInt === 3) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.9000, Math.random() * 3000);
            this.acc = this.pos.copy().mult(random(0.00400, 0.90002));
            this.w = random(Math.random() * 6, Math.random() * 2);
        } else if (selectedGenre === 'pop' && rndSongInt === 4) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 700);
            this.acc = this.pos.copy().mult(random(0.05400, 0.98002));
            this.w = random(Math.random() * 4, Math.random() * 9);
        } else if (selectedGenre === 'pop' && rndSongInt === 5) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 1.2000, Math.random() * 1);
            this.acc = this.pos.copy().mult(random(1.05400, 3.98002));
            this.w = random(Math.random() * 2, Math.random() * 3);
        }
    }

    //---------------------------pushes the particles away when the volume reaches a certain level
    update(cond) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (cond) {
            this.pos.add(this.vel);
            this.pos.add(this.vel);
            this.pos.add(this.vel);
        }
    }
   
    //---------------------------Shows the particles on the canvas 
    show() {
        let selectedGenre = document.getElementById('genre-select').value;
        if (selectedGenre === 'pop') {
            stroke(colorOne);
            strokeWeight(Math.random() * 10);
            fill(colorTwo);
            ellipse(this.pos.x, this.pos.y, rndTrackInt + particleInt, Math.random() * rndSongInt * 2);
        } 
    }
}

//----------Defines the particles that are shown in the 'rock' genre 
class rockParticle {

    constructor() {
        let particleInt = randomIntFromInterval(300, 3000);
        let selectedGenre = document.getElementById('genre-select').value;

        this.pos = p5.Vector.random2D(Math.random() * 1).mult(Math.random() * 12);
        this.vel = createVector(Math.random() * 3, Math.random() * 20);
        this.acc = this.pos.copy().mult(random(0.1000, 0.1000));
        this.w = random(5, 10);

        if (selectedGenre === 'rock' && rndSongInt === 1) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.5000, Math.random() * 10);
            this.acc = this.pos.copy().mult(random(0.01000, 0.02002));
            this.w = random(Math.random() * 5, Math.random() * 5);
        } else if (selectedGenre === 'rock' && rndSongInt === 2) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 2);
            this.acc = this.pos.copy().mult(random(0.10000, 0.20002));
            this.w = random(Math.random() * 3, Math.random() * 10);
        } else if (selectedGenre === 'rock' && rndSongInt === 3) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.9000, Math.random() * 3000);
            this.acc = this.pos.copy().mult(random(0.00400, 0.90002));
            this.w = random(Math.random() * 6, Math.random() * 2);
        } else if (selectedGenre === 'rock' && rndSongInt === 4) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 700);
            this.acc = this.pos.copy().mult(random(0.05400, 0.98002));
            this.w = random(Math.random() * 4, Math.random() * 9);
        } else if (selectedGenre === 'rock' && rndSongInt === 5) {
            this.pos = p5.Vector.random2D().mult(particleInt);
            this.vel = createVector(Math.random() * 1.2000, Math.random() * 1);
            this.acc = this.pos.copy().mult(random(1.05400, 3.98002));
            this.w = random(Math.random() * 2, Math.random() * 3);
        }
    }

    //-------pushes the particles away when the volume reaches a certain level
    update(cond) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (cond) {
            this.pos.add(this.vel);
            this.pos.add(this.vel);
            this.pos.add(this.vel);
        }
    }

    //--------Defines what will appear on the canvas 
    show() {
        let selectedGenre = document.getElementById('genre-select').value;
        if (selectedGenre === 'rock') {
              stroke(colorTwo);
              strokeWeight(rndSongInt);
              fill(colorThree);
              rect(this.pos.x, this.pos.y, rndSongInt * particleInt, Math.random() * 100, 10);
          }
      }
}

//------------------------------------------\\WAVEFORM GENERATION//-----------------------------//

//Reference: Switch functionality was referenced from https://www.w3schools.com/js/js_switch.asp Accesed: 2023-10-13
//Reference: The waveform generation from an audio source was adapted from https://www.youtube.com/watch?v=uk96O7N1Yo0&t=69s Accessed: 2023-09-20

//----------Defines the waveform shapes, colors and responses for the 'pop' genre 
function randomPopShape() {

   //'A' = Waveform when amplitude is above 200
   //'B' = Waveform when amplitude is below 200

   let wave = fft.waveform();

    switch (rndSongInt) {
        case 1: 
        //------------------------[SHAPE A]
        if (amp > 200) {
            beginShape();
                stroke(colorThree);
                strokeWeight(10);
                fill(colorTwo);
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 100, wave.length + 10));
                let x = i;
                let y = wave[index] * Math.random() * 100 + height / 2 + sin(i) / 1; 
                vertex(x, y);
            }
            endShape();
            } else if (amp < 200) {
            //------------------------[SHAPE B]
            beginShape();
                stroke(colorThree);
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 50 + height / 2 + sin(i) / 1; 
                    vertex(x, y);
                    }
            }
            endShape();
    
        break;
        case 2: 
        //------------------------[SHAPE A]  
        if (amp > 200) {
            beginShape();
                stroke(colorThree);
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, 2000, 10, wave.length + 10));
                let x = i;
                let y = wave[index] * 250 + height / 2 + sin(i) / 1; 
                vertex(x, y);
            }
            endShape();
             //------------------------[SHAPE B]
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree);
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 100 + height / 2 + sin(i) / 1; 
                    vertex(x, y);
                    }
            }
            endShape();
        break;
        case 3: 
        //------------------------[SHAPE A.1]
        if (amp > 200) {
            beginShape();
                stroke(colorThree);
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 10, width, 0, wave.length + 2));
                let x = i;
                let y = wave[index] * 190 + height / 1 + sin(i) / 10; 
                vertex(x, y);
            }
            endShape();
            //------------------------[SHAPE A.2]
            beginShape();
            stroke(colorTwo);
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 0, wave.length + 2));
            let x = i;
            let y = wave[index] * 100 + height / 2 + sin(i) / 9;
            vertex(x, y);
            }
            endShape();
            //------------------------[SHAPE A.3]
            beginShape();
            stroke(colorOne);
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 0, wave.length + 2));
            let x = i;
            let y = wave[index] * 50 + height + sin(i) / 7; 
            vertex(x, y);
        }
            endShape();
            //------------------------[SHAPE B]
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree);
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 2, wave.length + 2));
                    let x = i;
                    let y = wave[index] * 10 + height / 2 + sin(i) / 20; 
                    vertex(x, y);
                    }
            }
            endShape();
    
        break;
        case 4: 
        //------------------------[SHAPE A.1]
        if (amp > 200) {
            beginShape();
                stroke(colorThree);
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 10, wave.length + 10));
                let x = i;
                let y = wave[index] * 400 + height / 2 + sin(i) / 2; 
                vertex(x, y);
            }
            endShape();
            //------------------------[SHAPE A.2]
            beginShape();
            stroke(colorThree);
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 0, width, 10, wave.length + 10));
            let x = i;
            let y = wave[index] * 50 + height / 2 + sin(i) / 2; 
            vertex(x, y);
        }
            endShape();
            //------------------------[SHAPE B]
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree);
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 100 + height / 2 + sin(i) / 1; 
                    vertex(x, y);
                    }
            }
            endShape();
        
        break;
        case 5: 
        //------------------------[SHAPE A.1]
        if (amp > 200) {
            beginShape();
                stroke(colorThree);
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 3, width, 3, wave.length + 10));
                let x = i;
                let y = wave[index] * 50 + height / 3 + sin(i) / 1; 
                vertex(x, y);
            }
            endShape();
            //------------------------[SHAPE A.2]
            beginShape();
            stroke(colorTwo);
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 2, width, 1, wave.length + 10));
            let x = i;
            let y = wave[index] * 80 + height / 10 + sin(i) / 1; 
            vertex(x, y);
        }
            endShape();
            //------------------------[SHAPE A.3]
            beginShape();
            stroke(colorOne);
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 5, wave.length + 10));
            let x = i;
            let y = wave[index] * 90 + height / 5 + sin(i) / 2; 
            vertex(x, y);
    }
            endShape();
            //------------------------[SHAPE A.4]
            beginShape();
            stroke(colorThree);
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 0, width, 2, wave.length + 10));
            let x = i;
            let y = wave[index] * 40 + height / 3 + sin(i) / 1; 
            vertex(x, y);
}
            endShape();
            //------------------------[SHAPE B]
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree);
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 300 + height / 2 + sin(i) / 1; 
                    vertex(x, y);
                    }
            }
            endShape();
    break;
    }
}

//----------Defines the waveform shapes, colors and responses for the 'rock' genre 
function randomRockShape() {
    let wave = fft.waveform();
    
    //'A' = Waveform when amplitude is above 200
    //'B' = Waveform when amplitude is below 200
    
    switch (rndSongInt) {
        case 1: 
        //------------------------[SHAPE A]
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 5);
            noFill();
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1));
                let r = map(wave[index], -1, 1, 150, 350);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
        } else  {
            stroke(colorOne);
            frameRate(15);
            translate(width / 2, height / 2);
            strokeWeight(rndSongInt);
            fill(colorTwo);
    
        //------------------------[SHAPE B]
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1));
                let r = map(wave[index], -1, 1, 15, 20);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
    }
        break; 
        case 2: 
        //------------------------[SHAPE A]
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 5);
            noFill();
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1));
                let r = map(wave[index], -1, rndSongInt, 10, waveInt);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
        } else  {
            stroke(colorOne);
            frameRate(15);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 10 + rndSongInt);
            fill(colorTwo);
         //------------------------[SHAPE B]
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, waveInt, 0, wave.length - 1));
                let r = map(wave[index], -1, rndSongInt, waveInt - 300, 10);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
    }
        break;
        case 3: 
        //------------------------[SHAPE A]
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * rndSongInt * Math.random() * 3);
            noFill();
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = rndSongInt; i <= 180; i += rndSongInt) {
                let index = floor(map(i, rndSongInt + 3, waveInt, rndSongInt, wave.length - 1));
                let r = map(wave[index], 0, rndSongInt, 10 * rndSongInt, waveInt);
                let x = innerWidth * sin(i) * t - Math.random() * 1000;
                let y = r * cos(i) + Math.random() * rndSongInt * 2;
                vertex(x, y);
            } 
            endShape();
        }
        } else  {
            stroke(colorOne);
            frameRate(15);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 10 + rndSongInt);
            fill(colorTwo);
         //------------------------[SHAPE B]
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, waveInt, 0, wave.length - 1));
                let r = map(wave[index], -1, rndSongInt, waveInt - 300, 10);
                let x = innerWidth * sin(i) * t + rndSongInt * 2;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
    }
        break;
        case 4: 
        //------------------------[SHAPE A]
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 5);
            noFill();
        
         for (var t = - rndSongInt; t <= rndSongInt; t += rndSongInt) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1));
                let r = map(wave[index], -1, rndSongInt, 10, waveInt);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
    
        } else  {
            stroke(colorOne);
            frameRate(15);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 10 + rndSongInt);
            fill(colorTwo);
         //------------------------[SHAPE B]
         for (var t = - rndSongInt; t <= rndSongInt; t += rndSongInt) {
            beginShape();
            for (let i = 0; i <= waveInt; i += 0.1) {
                let index = floor(map(i, 0, waveInt, 0, wave.length - 1));
                let r = map(wave[index], -1, rndSongInt, waveInt - 300, 1);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
    }
        break;
        case 5: 
        //------------------------[SHAPE A]
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 5);
            noFill();
       
         for (var t = -1; t <= 1; t += 2) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1));
                let r = map(wave[index], - Math.random() * 0.1000, 1, waveInt, 10 + rndSongInt);
                let x = r * sin(i) * t;
                let y = r * cos(i);
                vertex(x, y);
            } 
            endShape();
        }
        } else  {
            stroke(colorTwo);
            frameRate(10);
            translate(width / 2, height / 2);
            strokeWeight(Math.random() * 20);
    
        //------------------------[SHAPE B]
        let wave = fft.waveform();
        
         for (var t = - rndSongInt; t <= rndSongInt; t += rndSongInt) {
            beginShape();
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, waveInt, Math.random() * 2000, waveInt, wave.length - 1));
                let r = map(wave[index], - Math.random() * 0.1000, rndSongInt + 2, rndSongInt, waveInt);
                let x = r * sin(i) * t;
                let y = r * cos(i) ;
                vertex(x, y);
            } 
            endShape();
        }
    }
    break;
     }
    }
 
//------------------------------------------\\BUTTONS//-----------------------------//

//----------Generate Button triggers the artwork 
button.addEventListener('click', function() {
    let selectedGenre = document.getElementById('genre-select').value;
    setup();

    homeContent.style.display = "none";

    if (selectedGenre === 'pop') {
    state = 1;
    songPicker();
    createCanvas(innerWidth, innerHeight);
    randomGradient();
    artworkButtons();
    fft = new p5.FFT();
    } else if (selectedGenre ==='rock') {
    state = 1;
    songPicker();
    createCanvas(innerWidth, innerHeight);
    randomGradient();
    artworkButtons();
    fft = new p5.FFT();
    } else {
        alert('ERROR: Please select a genre');
    }
});

//----------'Back' button to return to the home state
function mouseClicked() {
    let selectedGenre = document.getElementById('genre-select').value;
    setup();
    if (state === 1) {
        if (mouseX > backButtonX && mouseX < backButtonX + 150 && mouseY > backButtonY && mouseY < backButtonY + 40) {
            state = 0; 
            canvas.remove();
            songStopper();
        } else if (mouseX > backButtonX + 160 && mouseX < backButtonX + 290 && mouseY > backButtonY && mouseY < backButtonY + 40) {
            
            songStopper();
            if (selectedGenre === 'pop') {
                state = 1;
                songPicker();
                createCanvas(innerWidth, innerHeight);
                randomGradient();
                artworkButtons();
                fft = new p5.FFT();
                } else if (selectedGenre ==='rock') {
                state = 1;
                songPicker();
                createCanvas(innerWidth, innerHeight);
                randomGradient();
                artworkButtons();
                fft = new p5.FFT();
                }
        }
    } 
}

//----------Buttons displayed within the generation state 
function artworkButtons() {
    push();
    fill(255, 255, 255);
    rect(backButtonX, backButtonY, 140, 40);
    stroke(255, 255, 255, 70)

    fill(128, 128, 128);
    textStyle(BOLD);
    textSize(13);
    text('BACK', backButtonX + 49, backButtonY + 26);
    pop();
    
    push();
    fill(255, 255, 255);
    rect(backButtonX + 160, backButtonY, 140, 40);
    stroke(255, 255, 255, 70)

    fill(colorTwo);
    textStyle(BOLD);
    textSize(13);
    text(' + REGENERATE', backButtonX + 177, backButtonY + 26);
    pop();
}

//------------------------------------------\\ARTWORK GENERATION//-----------------------------//

//----------Generate function triggers the artwork 
function generateArt() {

        let selectedGenre = document.getElementById('genre-select').value;
    
        fft.analyze();
        amp = fft.getEnergy(20, 200);
    
        if (selectedGenre==='pop') {
    
            randomPopShape();
           
            if (amp >= 190) {
            let p = new popParticle();
            particles.push(p);
        
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(amp > 230);
                particles[i].show();
            }
          }
        } else if (selectedGenre==='rock') {
    
            randomRockShape();
            
            if (amp >= 190) {
            let p = new rockParticle();
            particles.push(p);
        
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(amp > 230);
                particles[i].show();
            }
            }
        } 
    }

//----------Elements are drawn onto canvas when in the correct state 
function draw() {
if (state===1) {
    homeContent.style.display = "none";
    angleMode(DEGREES);
    imageMode(CENTER);
    generateArt();
    } else if (state===0) {
    homeContent.style.display = "flex";
    let greyAngle = 210;
    document.body.style.background = `linear-gradient(${greyAngle}deg, black, grey)`;
    }
}