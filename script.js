let song; 
let fft;
let particles = []
let state = 0; 
let button = document.getElementById('generateBtn')
let homeContent = document.getElementById('home-content')

// let randomRockInt = Math.floor(Math.random() * (20 - 11 + 1)) + 11;

//REFERENCE: The following three strings of code were adapted from https://www.youtube.com/watch?v=1ut44--PSSo Accessed: 2023-10-12
function setup() {
    let currentDate = new Date();
    currentTimestamp = Math.floor(currentDate.getTime() / 1000);
}

//REFERENCE: The following 12 strings of code were adapted from https://proxlight.hashnode.dev/random-gradient-generator-javascript-tutorial Accessed: 2023-10-13
let popHexString = "0123defg";
let rockHexString = "345abcde";

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
    let angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
}

//load audio source based on the genre
function preload() {
    song = loadSound('DuaLipa.mp3')
   };



//REFERENCE: The waveform and particle generation from an audio source was adapted from https://www.youtube.com/watch?v=uk96O7N1Yo0&t=69s Accessed: 2023-09-20


class popParticle {
    constructor() {
        let selectedGenre = document.getElementById('genre-select').value;
        if (selectedGenre === 'pop' && rndPopInt === 1) {
        this.pos = p5.Vector.random2D().mult(Math.random() * 5)
        this.vel = createVector(Math.random() * 0.5000, Math.random() * 10)
        this.acc = this.pos.copy().mult(random(0.01000, 0.02002))
        this.w = random(Math.random() * 20, Math.random() * 20)
        } else if (selectedGenre === 'pop' && rndPopInt === 2) {
        this.pos = p5.Vector.random2D().mult(Math.random() * 10)
        this.vel = createVector(Math.random() * 0.2000, Math.random() * 2)
        this.acc = this.pos.copy().mult(random(0.10000, 0.20002))
        this.w = random(Math.random() * 3, Math.random() * 10)
        } else if (selectedGenre === 'pop' && rndPopInt === 3) {
            this.pos = p5.Vector.random2D().mult(Math.random() * 10)
            this.vel = createVector(Math.random() * 0.9000, Math.random() * 7)
            this.acc = this.pos.copy().mult(random(0.00400, 0.90002))
            this.w = random(Math.random() * 6, Math.random() * 2)
        } else if (selectedGenre === 'pop' && rndPopInt === 4) {
            this.pos = p5.Vector.random2D().mult(Math.random() * 90)
            this.vel = createVector(Math.random() * 0.2000, Math.random() * 4)
            this.acc = this.pos.copy().mult(random(0.05400, 0.98002))
            this.w = random(Math.random() * 4, Math.random() * 9)
        } else if (selectedGenre === 'pop' && rndPopInt === 5) {
            this.pos = p5.Vector.random2D().mult(Math.random() * 4)
            this.vel = createVector(Math.random() * 1.2000, Math.random() * 40)
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
            ellipse(this.pos.x, this.pos.y, Math.random() * 1)
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


//The following 4 lines were adapted from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript Accessed: 2023-10-13
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndPopInt = randomIntFromInterval(1, 6)




//The following switch function was referenced from https://www.w3schools.com/js/js_switch.asp Accesed: 2023-10-13
function randomPopShape() {
    let wave = fft.waveform()  

    switch (rndPopInt) {
        case 1: 
        if (amp > 200) {
            beginShape();
                stroke(colorThree)
                strokeWeight(10)
                fill(colorTwo)
                for (let i = 0; i < width; i++) {
                let index = floor(map(i, 0, width, 100, wave.length + 10));
                let x = i;
                let y = wave[index] * Math.random() * 100 + height / 2 + sin(i) / 1; // Adjust the waveform with a sine function
                vertex(x, y);
            }
            endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 50 + height / 2 + sin(i) / 1; // Adjust the waveform with a sine function
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
                let y = wave[index] * 250 + height / 2 + sin(i) / 1; // Adjust the waveform with a sine function
                vertex(x, y);
            }
            endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 100 + height / 2 + sin(i) / 1; // Adjust the waveform with a sine function
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
                let y = wave[index] * 190 + height / 1 + sin(i) / 10; // Adjust the waveform with a sine function
                vertex(x, y);
            }
            endShape();
            beginShape();
            stroke(colorTwo)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 0, wave.length + 2));
            let x = i;
            let y = wave[index] * 100 + height / 2 + sin(i) / 9; // Adjust the waveform with a sine function
            vertex(x, y);
            }
            endShape();

        beginShape();
            stroke(colorOne)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 10, width, 0, wave.length + 2));
            let x = i;
            let y = wave[index] * 50 + height + sin(i) / 7; // Adjust the waveform with a sine function
            vertex(x, y);
        }
        endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 2, wave.length + 2));
                    let x = i;
                    let y = wave[index] * 10 + height / 2 + sin(i) / 20; // Adjust the waveform with a sine function
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
                let y = wave[index] * 400 + height / 2 + sin(i) / 2; // Adjust the waveform with a sine function
                vertex(x, y);
            }
            endShape();

            beginShape();
            stroke(colorThree)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 0, width, 10, wave.length + 10));
            let x = i;
            let y = wave[index] * 50 + height / 2 + sin(i) / 2; // Adjust the waveform with a sine function
            vertex(x, y);
        }
        endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 100 + height / 2 + sin(i) / 1; // Adjust the waveform with a sine function
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
                let y = wave[index] * 50 + height / 3 + sin(i) / 1; // Adjust the waveform with a sine function
                vertex(x, y);
            }
            endShape();

            beginShape();
            stroke(colorTwo)
            for (let i = 0; i < width; i++) {
            let index = floor(map(i, 2, width, 1, wave.length + 10));
            let x = i;
            let y = wave[index] * 80 + height / 10 + sin(i) / 1; // Adjust the waveform with a sine function
            vertex(x, y);
        }
        endShape();

        beginShape();
        stroke(colorOne)
        for (let i = 0; i < width; i++) {
        let index = floor(map(i, 10, width, 5, wave.length + 10));
        let x = i;
        let y = wave[index] * 90 + height / 5 + sin(i) / 2; // Adjust the waveform with a sine function
        vertex(x, y);
    }
    endShape();

    beginShape();
    stroke(colorThree)
    for (let i = 0; i < width; i++) {
    let index = floor(map(i, 0, width, 2, wave.length + 10));
    let x = i;
    let y = wave[index] * 40 + height / 3 + sin(i) / 1; // Adjust the waveform with a sine function
    vertex(x, y);
}
endShape();
            } else if (amp < 200) {
            beginShape();
                stroke(colorThree)
                    for (let i = 0; i < width; i++) {
                    let index = floor(map(i, 0, width, 7, wave.length + 20));
                    let x = i;
                    let y = wave[index] * 300 + height / 2 + sin(i) / 1; // Adjust the waveform with a sine function
                    vertex(x, y);
                    }
            }
            endShape();
            break;
    }
}


function randomRockShape() {
    
    let randomRockInt = 1;
    
    // Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    switch (randomRockInt) {
        case 0: 

        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(50)
            fill(colorTwo)
    
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
        case 1: 
     if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(50)
            fill(colorTwo)
    
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
        let wave = fft.waveform()
        
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
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(50)
            fill(colorTwo)
    
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
        case 3: 

        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(50)
            fill(colorTwo)
    
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
        case 4: 

        if (amp > 200) {
            stroke(colorOne);
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(Math.random() * 5)
            noFill()
            
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
            frameRate(10)
            translate(width / 2, height / 2)
            strokeWeight(50)
            fill(colorTwo)
    
        //---------------------------defines the shape being drawn 
        let wave = fft.waveform()
        
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
     }
 
    }
 



//Generate Button triggers artwork 


button.addEventListener('click', function(){
    if (state===0) {
    state = 1;
    createCanvas(innerWidth, innerHeight);
    fft = new p5.FFT()
    song.play();
    }
}) 



//Artwork is drawn onto canvas in the correct state 
function draw() {
if (state===1) {
    homeContent.style.display = "none"
    angleMode(DEGREES)
    imageMode(CENTER)
    generateGrad();
    generateArt(currentTimestamp);


    } else if (state===0)
    homeContent.style.display = "flex";
    ;
}



