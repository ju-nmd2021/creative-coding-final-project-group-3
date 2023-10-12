let song; 
let fft;
let particles = []
let state = 0; 
let fadeAmount = -1;
let button = document.getElementById('generateBtn')
let homeContent = document.getElementById('home-content')

//establish the ranges of colors for each genre 
const popColorRange = [
  [0, 0, 255]
  [128, 0, 128], 
  [0, 255, 255],  
  [255, 105, 180],
  [255, 255, 255], 
  [0, 255, 127],
  [230, 230, 250],
  [0, 128, 128],
  [255, 0, 255],
]

const rockColorRange = [
    [255, 0, 0],   // Red
    [0, 0, 0],     // Black
    [255, 165, 0], // Orange
    [210, 54, 0],  // Dark Orange
    [255, 255, 0], // Yellow
  ]


//stores random values into genre color variables based on the established range of colors 
const popColor1 = popColorRange[Math.floor(Math.random() * 7)];
const popColor2 = popColorRange[Math.floor(Math.random() * 7)];

const rockColor1 = rockColorRange[Math.floor(Math.random() * 4)];
const rockColor2 = rockColorRange[Math.floor(Math.random() * 4)];



//load audio source based on the genre
function preload() {
    song = loadSound('DuaLipa.mp3')
   };

//Function that generates waveform artwork 
function generateArt() {
    let selectedGenre = document.getElementById('genre-select').value;
    let gradientStyle = ""
   
    fft.analyze()
    amp = fft.getEnergy(20, 200)

    //---------------------------Creates empty object for the color range 
    let genreColorRange = {};

    //---------------------------Conditions for what range should be displayed for which genre 
    if (selectedGenre === 'pop') {
        genreColorRange = {
            color1: popColor1,
            color2: popColor2,
        };
    } else if (selectedGenre === 'rock') {
        genreColorRange = {
            color1: rockColor1,
            color2: rockColor2,
        }
    }

    //---------------------------Inserts gradient based on the selected color range 
    gradientStyle = `linear-gradient(to bottom, rgba(${genreColorRange.color1[2]}, ${genreColorRange.color1[1]}, ${genreColorRange.color1[2]}, 1), rgba(${genreColorRange.color2[1]}, ${genreColorRange.color2[2]}, ${genreColorRange.color2[0]}, 1)`
    

    //---------------------------Defines the attributes and waveform for the 'POP' genre 
    if (selectedGenre === 'pop') {
        let fade = 255;
        stroke(popColor2, fade)
        document.body.style.background = gradientStyle;
        frameRate(15)
        // translate(width / 2, height / 2)
        strokeWeight(10)
        fill(popColor2);

    //---------------------------Pop Waveform 
    let wave = fft.waveform()
    
    if (amp > 200) {
     beginShape()
     for (let i = 0; i < width; i++) {
        let index = floor(map(i, 20, width, 30, wave.length))
        let x = i
        let y = wave[index] * 170 + height / 2
        vertex(x, y)
     }
     endShape()
     frameRate(10)
    } else {
        
        beginShape()
        for (let i = 2; i < width; i++) {
           let index = floor(map(i, 50, width, 300, wave.length))
           let x = i
           let y = wave[index] * 30 + height / 2
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

    stroke(popColor2);
    strokeWeight(100)
  
     //---------------------------Defines the attributes and waveform for the 'ROCK' genre 

    } else if (selectedGenre === 'rock') {
        document.body.style.background = gradientStyle;
        if (amp > 200) {
        stroke(rockColor1);
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

    } else {
        stroke(rockColor1);
        frameRate(10)
        translate(width / 2, height / 2)
        strokeWeight(50)
        fill(rockColor2)

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
    
    //---------------------------Generates the particles that move away from the waveform 
    let p = new Particle();
    particles.push(p)

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(amp > 230)
        particles[i].show()
    }

    stroke(200, 100, 50);
    strokeWeight(100)
    // } else if (selectedGenre === 'jazz') {
    //     background(10, 10, 200)
    // } else if (selectedGenre === 'hiphop') {
    //     background(4, 150, 43)
    // } else if (selectedGenre === 'alternative') {
    //     background(1, 200, 100)
    } else

    background(0);
    stroke(255);
    strokeWeight(0.5)
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

//Randomly generated particles based on the genre selection 
class Particle {
    constructor() {
        let selectedGenre = document.getElementById('genre-select').value;
        if (selectedGenre === 'pop') {
        this.pos = p5.Vector.random2D().mult(400)
        this.vel = createVector(Math.random() * 500, Math.random() * 3)
        this.acc = this.pos.copy().mult(random(0.0050, 0.00015))
        this.w = random(12, 7)
        } else if (selectedGenre === 'rock') {
            this.pos = p5.Vector.random2D().mult(Math.random() * 800)
            this.vel = createVector(Math.random() * 10, Math.random() * 10)
            this.acc = this.pos.copy().mult(random(0.0030, 0.00012))
            this.w = random(5, 10)
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
            stroke(popColor2)
            strokeWeight(Math.random() * 10)
            fill(popColor1)
            ellipse(this.pos.x, this.pos.y, Math.random() * 1)
        } else if (selectedGenre === 'rock') {
            stroke(rockColor2)
            strokeWeight(Math.random() * 0.5)
            fill(rockColor2)
            line(this.pos.x, this.pos.y, Math.random() * 10, 10)
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


//Artwork is drawn onto canvas in the correct state 
function draw() {
if (state===1) {
    homeContent.style.display = "none"
    angleMode(DEGREES)
    imageMode(CENTER)
    generateArt();

    } else if (state===0)
    homeContent.style.display = "flex";
    ;
}








// Reference: Colorful Coding - Code an Audio Visualizer in p5 | Coding Project 17 - Youtube 2021//
