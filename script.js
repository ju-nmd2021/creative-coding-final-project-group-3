let popSong1;
let rockSong1;
let fft;
let particles = []
let state = 0; 
let button = document.getElementById('generateBtn')
let homeContent = document.getElementById('home-content')
let popHexString = "0123defg";
let rockHexString = "345abcde";
let rndSongInt = randomIntFromInterval(1, 6)
let particleInt = randomIntFromInterval(0.01000, 300)
let waveInt = randomIntFromInterval(300, 1000)
let currentTimestamp = new Date().getTime();


//The following 4 lines were adapted from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript Accessed: 2023-10-13
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//REFERENCE: The following three strings of code were adapted from https://www.youtube.com/watch?v=1ut44--PSSo Accessed: 2023-10-12


//REFERENCE: The following 12 strings of code were adapted from https://proxlight.hashnode.dev/random-gradient-generator-javascript-tutorial Accessed: 2023-10-13

let randomColor = () => {
    let selectedGenre = document.getElementById('genre-select').value;
    if (selectedGenre==='pop')
    {
    let hexCode = "#";
    for( i=0; i<6; i++){
        hexCode += popHexString[Math.floor(Math.random() * popHexString.length)];
    }
    return hexCode;
    } else {
        let hexCode = "#";
    for( i=0; i<6; i++){
        hexCode += rockHexString[Math.floor(Math.random() * rockHexString.length)];
    }
    return hexCode;
    }
}

let colorOne = randomColor();
let colorTwo = randomColor();
let colorThree = randomColor();

let generateGrad = () => {
    let angle = randomIntFromInterval(1, 360)
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
}

//load audio source based on the genre
function preload() {
    popSong1 = loadSound('DuaLipa.mp3')
    rockSong1 = loadSound('ACDC.mp3')
   };



//REFERENCE: The waveform and particle generation from an audio source was adapted from https://www.youtube.com/watch?v=uk96O7N1Yo0&t=69s Accessed: 2023-09-20

class popParticle {
    constructor() {
        let particleInt = randomIntFromInterval(300, 3000)
        let selectedGenre = document.getElementById('genre-select').value;
        if (selectedGenre === 'pop' && rndSongInt === 1) {
            this.pos = p5.Vector.random2D().mult(particleInt)
            this.vel = createVector(Math.random() * 0.5000, Math.random() * 10)
            this.acc = this.pos.copy().mult(random(0.01000, 0.02002))
            this.w = random(Math.random() * 5, Math.random() * 5)
        } else if (selectedGenre === 'pop' && rndSongInt === 2) {
            this.pos = p5.Vector.random2D().mult(particleInt)
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 2)
            this.acc = this.pos.copy().mult(random(0.10000, 0.20002))
            this.w = random(Math.random() * 3, Math.random() * 10)
        } else if (selectedGenre === 'pop' && rndSongInt === 3) {
            this.pos = p5.Vector.random2D().mult(particleInt)
            this.vel = createVector(Math.random() * 0.9000, Math.random() * 3000)
            this.acc = this.pos.copy().mult(random(0.00400, 0.90002))
            this.w = random(Math.random() * 6, Math.random() * 2)
        } else if (selectedGenre === 'pop' && rndSongInt === 4) {
            this.pos = p5.Vector.random2D().mult(particleInt)
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 700)
            this.acc = this.pos.copy().mult(random(0.05400, 0.98002))
            this.w = random(Math.random() * 4, Math.random() * 9)
        } else if (selectedGenre === 'pop' && rndSongInt === 5) {
            this.pos = p5.Vector.random2D().mult(particleInt)
            this.vel = createVector(Math.random() * 1.2000, Math.random() * 1)
            this.acc = this.pos.copy().mult(random(1.05400, 3.98002))
            this.w = random(Math.random() * 2, Math.random() * 3)
        }
    }

    //---------------------------pushes the particles away when the volume reaches a certain level
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if (cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
   
    //---------------------------Shows the particles on the canvas 
    show() {
        let selectedGenre = document.getElementById('genre-select').value;
        if (selectedGenre === 'pop') {
            stroke(colorOne)
            strokeWeight(Math.random() * 10)
            fill(colorTwo)
            ellipse(this.pos.x, this.pos.y, Math.random() * particleInt)
        } 
    }
}

class rockParticle {
    constructor() {
        let selectedGenre = document.getElementById('genre-select').value;
     if (selectedGenre === 'rock') {
            this.pos = p5.Vector.random2D(Math.random() * 1).mult(Math.random() * 12)
            this.vel = createVector(Math.random() * 3, Math.random() * 20)
            this.acc = this.pos.copy().mult(random(0.1000, 0.1000))
            this.w = random(5, 10, 100, 20, 9)
        }
    }

    //---------------------------pushes the particles away when the volume reaches a certain level
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if (cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
   
    //---------------------------Shows the particles on the canvas 
    show() {
        let selectedGenre = document.getElementById('genre-select').value;
      if (selectedGenre === 'rock') {
            stroke(colorTwo)
            strokeWeight(Math.random() * 1)
            fill(colorOne)
            line(this.pos.x, this.pos.y, Math.random() * 100, 1, 10, 5)
        }
    }
}

function generateArt() {

    let selectedGenre = document.getElementById('genre-select').value;
   
    fft.analyze()
    amp = fft.getEnergy(20, 200)

    if (selectedGenre==='pop') {

        randomPopShape();
       
        if (amp >= 210) {
        let p = new popParticle();
        particles.push(p)
    
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(amp > 230)
            particles[i].show()
        }
      }
    } else if (selectedGenre==='rock') {

        randomRockShape();
        
        if (amp >= 220) {
        let p = new rockParticle();
        particles.push(p)
    
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(amp > 230)
            particles[i].show()
        }
        }
    } 
}







//Switch functionality was referenced from https://www.w3schools.com/js/js_switch.asp Accesed: 2023-10-13
function randomPopShape() {
    let wave = fft.waveform()  

    switch (rndSongInt) {
        case 1: 
        if (amp > 200) {
            beginShape();
                stroke(colorThree)
                strokeWeight(10)
                fill(colorTwo)
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 100, wave.length + 10));
                let x = i;
                let y = wave[index] * Math.random() * 100 + height / 2 + sin(i) / 1; 
                vertex(x, y);
            }
            endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
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
        if (amp > 200) {
            beginShape();
                stroke(colorThree)
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, 2000, 10, wave.length + 10));
                let x = i;
                let y = wave[index] * 250 + height / 2 + sin(i) / 1; 
                vertex(x, y);
            }
            endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
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
        if (amp > 200) {
            beginShape();
                stroke(colorThree)
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 10, width, 0, wave.length + 2));
                let x = i;
                let y = wave[index] * 190 + height / 1 + sin(i) / 10; 
                vertex(x, y);
            }
            endShape();
            beginShape();
            stroke(colorTwo)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 0, wave.length + 2));
            let x = i;
            let y = wave[index] * 100 + height / 2 + sin(i) / 9;
            vertex(x, y);
            }
            endShape();

        beginShape();
            stroke(colorOne)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 0, wave.length + 2));
            let x = i;
            let y = wave[index] * 50 + height + sin(i) / 7; 
            vertex(x, y);
        }
        endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
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
        if (amp > 200) {
            beginShape();
                stroke(colorThree)
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 10, wave.length + 10));
                let x = i;
                let y = wave[index] * 400 + height / 2 + sin(i) / 2; 
                vertex(x, y);
            }
            endShape();

            beginShape();
            stroke(colorThree)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 0, width, 10, wave.length + 10));
            let x = i;
            let y = wave[index] * 50 + height / 2 + sin(i) / 2; 
            vertex(x, y);
        }
        endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
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
        if (amp > 200) {
            beginShape();
                stroke(colorThree)
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 3, width, 3, wave.length + 10));
                let x = i;
                let y = wave[index] * 50 + height / 3 + sin(i) / 1; 
                vertex(x, y);
            }
            endShape();

            beginShape();
            stroke(colorTwo)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 2, width, 1, wave.length + 10));
            let x = i;
            let y = wave[index] * 80 + height / 10 + sin(i) / 1; 
            vertex(x, y);
        }
        endShape();

        beginShape();
        stroke(colorOne)
        for (let i = 0; i < width; i++) {
        let index = floor(map(i, 10, width, 5, wave.length + 10));
        let x = i;
        let y = wave[index] * 90 + height / 5 + sin(i) / 2; 
        vertex(x, y);
    }
    endShape();

    beginShape();
    stroke(colorThree)
    for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 2, wave.length + 10));
    let x = i;
    let y = wave[index] * 40 + height / 3 + sin(i) / 1; 
    vertex(x, y);
}
endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
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


function randomRockShape() {
    let wave = fft.waveform()
    switch (rndSongInt) {
        case 1: 

        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1))
                let r = map(wave[index], -1, 1, 150, 350)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
        } else  {
            stroke(colorOne);
            frameRate(15)
            translate(width / 2, height / 2)
            strokeWeight(rndSongInt)
            fill(colorTwo)
    
        //---------------------------defines the shape being drawn 
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1))
                let r = map(wave[index], -1, 1, 15, 20)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
    }

        break; 
        case 2: 
     if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1))
                let r = map(wave[index], -1, rndSongInt, 10, waveInt)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
        } else  {
            stroke(colorOne);
            frameRate(15)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 10 + rndSongInt)
            fill(colorTwo)
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, waveInt, 0, wave.length - 1))
                let r = map(wave[index], -1, rndSongInt, waveInt - 300, 10)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
    }
        break;
        case 3: 
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * rndSongInt * Math.random() * 3)
            noFill()
            
        //---------------------------defines the shape being drawn 
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = rndSongInt; i <= 180; i += rndSongInt) {
                let index = floor(map(i, rndSongInt + 3, waveInt, rndSongInt, wave.length - 1))
                let r = map(wave[index], 0, rndSongInt, 10 * rndSongInt, waveInt)
                let x = innerWidth * sin(i) * t - Math.random() * 1000
                let y = r * cos(i) + Math.random() * rndSongInt * 2
                vertex(x, y)
            } 
            endShape()
        }
        } else  {
            stroke(colorOne);
            frameRate(15)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 10 + rndSongInt)
            fill(colorTwo)
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, waveInt, 0, wave.length - 1))
                let r = map(wave[index], -1, rndSongInt, waveInt - 300, 10)
                let x = innerWidth * sin(i) * t + rndSongInt * 2
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
    }
       
       
        break;
        case 4: 
        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        
         for (var t = - rndSongInt; t <= rndSongInt; t += rndSongInt) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1))
                let r = map(wave[index], -1, rndSongInt, 10, waveInt)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            
            endShape()
        }
    
        } else  {
            stroke(colorOne);
            frameRate(15)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 10 + rndSongInt)
            fill(colorTwo)
        
         for (var t = - rndSongInt; t <= rndSongInt; t += rndSongInt) {
            beginShape()
            for (let i = 0; i <= waveInt; i += 0.1) {
                let index = floor(map(i, 0, waveInt, 0, wave.length - 1))
                let r = map(wave[index], -1, rndSongInt, waveInt - 300, 1)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
    }
        break;
        case 5: 

        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn
        
         for (var t = -1; t <= 1; t += 2) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, 0, 180, 0, wave.length - 1))
                let r = map(wave[index], - Math.random() * 0.1000, 1, waveInt, 10 + rndSongInt)
                let x = r * sin(i) * t
                let y = r * cos(i)
                vertex(x, y)
            } 
            endShape()
        }
        } else  {
            stroke(colorTwo);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 20)
    
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
         for (var t = - rndSongInt; t <= rndSongInt; t += rndSongInt) {
            beginShape()
            for (let i = 0; i <= 180; i += 0.1) {
                let index = floor(map(i, waveInt, Math.random() * 2000, waveInt, wave.length - 1))
                let r = map(wave[index], - Math.random() * 0.1000, rndSongInt + 2, rndSongInt, waveInt)
                let x = r * sin(i) * t
                let y = r * cos(i) 
                vertex(x, y)
            } 
            endShape()
        }
    }
    break;
     }
 
    }
 



//Generate Button triggers artwork 


button.addEventListener('click', function(){
    let selectedGenre = document.getElementById('genre-select').value;
    if (state===0) {
    state = 1;
    createCanvas(innerWidth, innerHeight);
    fft = new p5.FFT()
    if (selectedGenre === 'pop') {
    popSong1.play();
    } else  {
    rockSong1.play();
    }
    generateGrad();
    }
}) 



//Artwork is drawn onto canvas in the correct state 
function draw() {
if (state===1) {
    homeContent.style.display = "none"
    angleMode(DEGREES)
    imageMode(CENTER)
    generateArt(currentTimestamp);


    } else if (state===0)
    homeContent.style.display = "flex";
    ;
}



