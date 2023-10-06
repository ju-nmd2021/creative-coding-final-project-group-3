let song; 
let fft;
let genres = []
let bgImages = []
let particles = []
let state = 0; 
let button = document.getElementById('generateBtn')
let homeContent = document.getElementById('home-content')


let genreStyles = {
    pop: {
        backgroundGradient: "linear-gradient(rgba(255, 100, 100, 1), rgba(255, 200, 200, 1))",
        shapeColor: "rgba(255, 0, 0)",
    },
}

//load audio source 
function preload() {
    song = loadSound("HPST - 002.mp3");
    };

//Function that generates waveform artwork 
function generateArt() {
    let selectedGenre = document.getElementById('genre-select').value;

    //---------------------------Draws the waveform onto the canvas 

    if (genreStyles.hasOwnProperty(selectedGenre)) {
        let genreStyle = genreStyles[selectedGenre];
        background(genreStyle.backgroundGradient);
        stroke(genreStyle.shapeColor);
        strokeWeight(3);
        noFill();
        translate(width / 2, height / 2);
        
        // The rest of your generateArt function remains the same
        // ...
    } else {
        // Handle the case when an invalid genre is selected
        alert('Please select a valid genre.');
    }

    background(0);
    stroke(255);
    strokeWeight(3)
    noFill();
    translate(width / 2, height / 2)

    fft.analyze()
    amp = fft.getEnergy(20, 200)

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
        noStroke()
        fill(255)
        ellipse(this.pos.x, this.pos.y, 4)
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

// Function to create a gradient background
function createGradient(c1, c2) {
    let gradient = createGraphics(width, height);
    gradient.background(255);
    gradient.stroke(0);
    gradient.fill(0);
    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(c1, c2, inter);
        gradient.stroke(c);
        gradient.line(0, i, width, i);
    }
    return gradient;
}


//Artwork is drawn onto canvas in the correct state 
function draw() {

    //--------------------------After button is clicked, artwork is generated
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
