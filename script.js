

//------------------------------------------\\VARIABLES//-----------------------------//

let timestampInSeconds;

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

//------------Particle Variables

let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let fr; 
let particles = [];
let flowfield;

//----------Waveform/Particle Variables 
let fft;
// let particles = [];

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
let angle;

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
    timestampInSeconds = Math.floor(Date.now() / 1000);
    fft = new p5.FFT();

//Perlin Noise Grid 
    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
    }
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
    angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo}, ${colorThree})`;
}

let rndSongGradient = () => {
    angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo}, ${colorThree})`;
}


//------------------------------------------\\WAVEFORM GENERATION//-----------------------------//

//Reference: Switch functionality was referenced from https://www.w3schools.com/js/js_switch.asp Accesed: 2023-10-13

//----------Defines the waveform shapes, colors and responses for the 'pop' genre 
function randomPopShape() {
    
    let spectrum = fft.analyze;
    let amplitude = fft.getEnergy("bass", "mid", "high");

    // let modulatedLine = 
    // let modulatedColor 
    // let modulated

    var yoff = 0;

    for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
      yoff += inc;

      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }

  //  fr.html(floor(frameRate()));
    
}

//----------Defines the waveform shapes, colors and responses for the 'rock' genre 
function randomRockShape() {

    var yoff = 0;

    for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
      }

      yoff += inc;

      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }

  //  fr.html(floor(frameRate()));
   
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
           
        } else if (selectedGenre==='rock') {
    
            randomRockShape();
            
        } 
    }

//----------Elements are drawn onto canvas when in the correct state 
function draw() {
if (state===1) {
    nowSeconds = Math.floor(Date.now() / 1000)
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
