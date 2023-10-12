let song; 
let fft;
let particles = []
let state = 0; 
let fade = 255;
let fadeAmount = -1;
let button = document.getElementById('generateBtn')
let homeContent = document.getElementById('home-content')


//establish the ranges of colors for each genre 
const popColorRange = [
  [0, 0, 255],   // Blue
  [0, 255, 255], // Cyan
  [255, 0, 255]  // Magenta
]
const rockColorRange = [
    [255, 0, 0],   // Red
    [0, 0, 0],     // Black
    [255, 165, 0], // Orange
    [255, 255, 0], // Yellow
  ]

//stores random values into genre color variables based on the established range 
const popColor1 = popColorRange[Math.floor(Math.random() * popColorRange.length)];
const popColor2 = popColorRange[Math.floor(Math.random() * popColorRange.length)];

const rockColor1 = rockColorRange[Math.floor(Math.random() * rockColorRange.length)];
const rockColor2 = rockColorRange[Math.floor(Math.random() * rockColorRange.length)];

//load audio source 
function preload() {
    song = loadSound("HPST - 002.mp3");
    };

//Function that generates waveform artwork 
function generateArt() {
    let selectedGenre = document.getElementById('genre-select').value;
    let gradientStyle = ""
   
    fft.analyze()
    amp = fft.getEnergy(20, 200)
    //---------------------------Draws the waveform onto the canvas 

    //---------------------------Creates empty object for the color range 
    let genreColorRange = {};

    //---------------------------Conditions for what range should be displayed for which genre 
    if (selectedGenre === 'pop') {
        genreColorRange = {
            color1: popColor1,
            color2: popColor2
        };
    } else if (selectedGenre === 'rock') {
        genreColorRange = {
            color1: rockColor1,
            color2: rockColor2
        }
    }

    //---------------------------Inserts 
    gradientStyle = `linear-gradient(to bottom, rgba(${genreColorRange.color1[0]}, ${genreColorRange.color1[1]}, ${genreColorRange.color1[2]}, 1), rgba(${genreColorRange.color2[0]}, ${genreColorRange.color2[1]}, ${genreColorRange.color2[2]}, 1))`

    
    if (selectedGenre === 'pop') {
        let fade = 255;
        stroke(Math.random() * 100, 90, 100, fade);
        document.body.style.background = gradientStyle;
        frameRate(10)
        translate(width / 2, height / 2)
        strokeWeight(50)
        noFill();

  
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
    
    //---------------------------Generates the particles that move away from the waveform 
    let p = new Particle();
    particles.push(p)

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(amp > 230)
        particles[i].show()
    }

    stroke(200, 100, 50, fade);
    strokeWeight(100)
  




    } else if (selectedGenre === 'rock') {

        let fade = 255;
        stroke(Math.random() * 100, 90, 100, fade);
        document.body.style.background = gradientStyle;
        frameRate(10)
        translate(width / 2, height / 2)
        strokeWeight(50)
        noFill();

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
    
    //---------------------------Generates the particles that move away from the waveform 
    let p = new Particle();
    particles.push(p)

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(amp > 230)
        particles[i].show()
    }

    stroke(200, 100, 50, fade);
    strokeWeight(100)
    } else if (selectedGenre === 'jazz') {
        background(10, 10, 200)
    } else if (selectedGenre === 'hiphop') {
        background(4, 150, 43)
    } else if (selectedGenre === 'alternative') {
        background(1, 200, 100)
    } else

    background(0);
    stroke(255);
    strokeWeight(3)
    noFill();
    
  

  


    //---------------------------defines the shape being drawn 
    // let wave = fft.waveform()
    
    // for (var t = -1; t <= 1; t += 2) {
    //     beginShape()
    //     for (let i = 0; i <= 180; i += 0.1) {
    //         let index = floor(map(i, 0, 180, 0, wave.length - 1))
    //         let r = map(wave[index], -1, 1, 150, 350)
    //         let x = r * sin(i) * t
    //         let y = r * cos(i)
    //         vertex(x, y)
    //     } 
    //     endShape()
    // }
    
    //---------------------------Generates the particles that move away from the waveform 
    // let p = new Particle();
    // particles.push(p)

    // for (let i = 0; i < particles.length; i++) {
    //     particles[i].update(amp > 230)
    //     particles[i].show()
    // }






};

//Randomly generated particles 


class Particle {
    constructor() {
        this.pos = p5.Vector.random2D().mult(250)
        this.vel = createVector(0, 0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))
        this.w = random(3, 5)
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
            stroke(100, 90, 100, fade)
            strokeWeight(5)
            fill(150, 100, 90, fade)
            ellipse(this.pos.x, this.pos.y, 4)
        }
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


function fadeArt() {
    fade += fadeAmount;

    if (fade<0) {
        fadeAmount = 0
    } 

    print(fade)
}


//Artwork is drawn onto canvas in the correct state 
function draw() {
    //--------------------------After button is clicked, artwork is generated
if (state===1) {
    homeContent.style.display = "none"
    angleMode(DEGREES)
    imageMode(CENTER)
    generateArt();
    fadeArt();

   
   

    } else if (state===0)
    homeContent.style.display = "flex";
    ;
}








// Reference: Colorful Coding - Code an Audio Visualizer in p5 | Coding Project 17 - Youtube 2021//
