
let song;
let fft;
let particles = []
let bgImages = []
let genres = []
let state = 0; 
let button = document.getElementById('generateBtn')
let fileInput = document.querySelector('input[type="file"]');


//Use uploaded file as audio source 
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        song = loadSound(URL.createObjectURL(file));
        button.disabled = false;
    }
}

fileInput.addEventListener('change', handleFileUpload);





function setup() {
    let homeContent = document.getElementById('home-content')
    if (state===1) {
        homeContent.style.display = "none"
        createCanvas(windowWidth, windowHeight);
        angleMode(DEGREES)
        imageMode(CENTER)
        fft = new p5.FFT()
        noLoop()
        generatorScreen();
    } else if (state===0)
    homeContent.style.display = "flex";
    };


if (state===0) {

    button.addEventListener('click', function(){
        song.play();
        state === 1;
     })

} else if (state===1) {

function generatorScreen() {
//Draws the waveform onto the canvas 
    background(0);
    stroke(255);
    strokeWeight(3)
    noFill();
    
    translate(width / 2, height / 2)

    fft.analyze( )
    amp = fft.getEnergy(20, 200)

   
    push()
    if (amp > 220) {
        rotate(random(-0.3, 0.3))
    }
    
    //draws background image
    image(popImg, 0, 0, width, height)
    pop()

    //defines the shape being drawn 
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
    
    //Generates the particles that move away from the waveform 
    let p = new Particle();
    particles.push(p)

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(amp > 230)
        particles[i].show()
    }
};
}

//Particles that generate randomly 
class Particle {
    constructor() {
        this.pos = p5.Vector.random2D().mult(250)
        this.vel = createVector(0, 0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(3, 5)
    }

    //pushes the particles away when the volume reaches a certain level
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if (cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
   
    //Shows the particles on the canvas 
    show() {
        noStroke()
        fill(255)
        ellipse(this.pos.x, this.pos.y, 4)
    }
}


