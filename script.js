

//------------------------------------------\\VARIABLES//-----------------------------//
let changeThreshold = 300; 


//----------Audio Variables 
let Song1;
let Song2;
let Song3;
let Song4;
let Song5;
let Song6;
let Song7;
let Song8;
let Song9; 
let Song10;

//------------Particle Variables

let inc;
let cols, rows;
let zoff = 3;
let scl = 2.5;
let fr; 
let particles = [];
let flowfield;

//----------Waveform/Particle Variables 
let fft;
let amp;
let spec;
let number;
let even;
let odd;

//----------Random Variables 
let rndTrackInt;
// let rndSongInt; 

//----------Color Variables 
let colorOne;
let colorTwo;
let colorThree;
let hexString = "0123456789ABCDEF";
let angle;
let alpha;

//----------Button Variables 
let button = document.getElementById('generateBtn');

let buttonWidth = 130; 
let buttonHeight = 40;
let backButtonX = 20;
let backButtonY = innerHeight - buttonHeight - 20;

//----------Display Variables
let homeContent = document.getElementById('home-content');
let state = 0; 

//------------------------------------------\\AUDIO SOURCE SELECTION//-----------------------------//

//----------Loads all audio sources
function preload() {
    Song1 = loadSound('/Audio Files/HigherPower.mp3');
    Song2 = loadSound('/Audio Files/Flowers.mp3');
    Song3 = loadSound('/Audio Files/Daylight.mp3');
    Song4 = loadSound('/Audio Files/Sorry.mp3');
    Song5 = loadSound('/Audio Files/Sunflower.mp3');
    Song6 = loadSound('/Audio Files/Midnight.mp3');
    Song7 = loadSound('/Audio Files/Intentions.mp3');
    Song8 = loadSound('/Audio Files/LetsomebodyGo.mp3');
    Song9 = loadSound('/Audio Files/RocknRoll.mp3');
    Song10 = loadSound('/Audio Files/BetterNow.mp3');
   };

//----------Selects what song will be played depending on the selected genre 
function songPicker() {
    switch (rndTrackInt) {
        case 1:
            Song1.play();
        break;
        case 2:
            Song2.play();
        break;
        case 3:
            Song3.play();
        break;
        case 4:
            Song4.play();
        break;
        case 5:
            Song5.play();
        break;
        case 6:
            Song6.play();
        break;
        case 7:
            Song7.play();
        break;
        case 8:
            Song8.play();
        break;
        case 9:
            Song9.play();
        break;
        case 10:
            Song10.play(); 
        break;
        }
}

//----------Stops audio from being played 
function songStopper() {
    Song1.stop();
    Song2.stop();
    Song3.stop();
    Song4.stop();
    Song5.stop();
    Song6.stop();
    Song7.stop();
    Song8.stop();
    Song9.stop();
    Song10.stop();
}

//------------------------------------------\\RANDOM INTEGERS//-----------------------------//

//REFERENCE: The following 13 lines were written referencing https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript Accessed: 2023-10-13



//----------Resets the random integers 
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//----------Selects integers within specific ranges
function randomIntegers() {
    // rndSongInt = randomIntFromInterval(1, 6);
    rndTrackInt = randomIntFromInterval(1, 10)
    rndIncInt = randomIntFromInterval(0.1, 3);
    rndSclInt = randomIntFromInterval(3, 7)
    }

//----------Resets the random integers 
function setup() {
    fft = new p5.FFT();
    let milli = new Date();
    let timeStampMilli = milli.getMilliseconds();
    randomIntegers();

//Perlin Noise Grid 
    cols = floor(width / 2);
    rows = floor(height / 2);
    fr = createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < timeStampMilli; i++) {
    particles[i] = new Particle();
    }

//Find odd or even number from milliseconds

    number = timeStampMilli;

    if(number % 2 == 0) {
    number = even;
    }
    else {
    number = odd;
    }
}


//------------------------------------------\\COLOR GENERATION//-----------------------------//

//Reference: The following 15 lines of code were adapted from https://proxlight.hashnode.dev/random-gradient-generator-javascript-tutorial Accessed: 2023-10-13

//----------Selects a random hexcode 


let randomColor = (alpha) => {
    let hexCode = "#";
    for( i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    hexCode += alpha.toString(16).toUpperCase();
    return hexCode;
    }

//----------Generates a background gradient using three of the random hexcodes 
let randomGradient = () => {

    let alphaA = 255;
    let alphaB = 60;

    colorOne = randomColor(alphaA);
    colorTwo = randomColor(alphaA);
    colorThree = randomColor(alphaA);
    colorFour = randomColor(alphaA);
    BGcolorOne = randomColor(alphaB);
    BGcolorTwo = randomColor(alphaB);
    BGcolorThree = randomColor(alphaB);
    BGcolorFour = randomColor(alphaB);
    angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${BGcolorOne}, ${BGcolorTwo}, ${BGcolorThree}), ${BGcolorFour}`;

}

let rndSongGradient = () => {
    angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo}, ${colorThree}), ${colorFour}`;
}


//------------------------------------------\\WAVEFORM GENERATION//-----------------------------//

//Reference: Switch functionality was referenced from https://www.w3schools.com/js/js_switch.asp Accesed: 2023-10-13

//----------Defines the waveform shapes, colors and responses for the 'pop' genre 
function randomShape() {
    
    fft.analyze();
    amp = fft.getEnergy(100, 300);

    var yoff = 2;

    if (amp > 180) {
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
              if (amp < 210) {
              var index = x + y * cols;
              var angle = noise(xoff, yoff, zoff) + TWO_PI * Math.random() * 4;
              } else {
              var index = x + y * cols;
              var angle = noise(xoff, yoff, zoff) * TWO_PI * Math.random() * 2;
              }
              var v = p5.Vector.fromAngle(angle);
              v.setMag(rndTrackInt);
              flowfield[index] = v;
              xoff += 0.1;
            }

              yoff += 0.1;
              zoff += 0.0010;
            }
    } 


    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }


   fr.html(floor(frameRate()));
}


 
//------------------------------------------\\BUTTONS//-----------------------------//

//----------Generate Button triggers the artwork 
button.addEventListener('click', function() {
    setup();
    state=1;
    songPicker();
    createCanvas(innerWidth, innerHeight);
    artworkButtons(); 

    if (state===1) {
        randomIntegers();
        randomGradient();
        generateArt();
    } 

});


//----------'Back' button to return to the home state
function mouseClicked() {
    setup();
    if (state === 1) {
        if (mouseX > backButtonX && mouseX < backButtonX + 150 && mouseY > backButtonY && mouseY < backButtonY + 40) {
            state = 0;
            canvas.remove();
            songStopper();
        } else if (mouseX > backButtonX + 160 && mouseX < backButtonX + 290 && mouseY > backButtonY && mouseY < backButtonY + 40) {
            songStopper();
            canvas.remove();
            createCanvas(innerWidth, innerHeight);
            fft = new p5.FFT(); 
            state = 1;
            songPicker();
            randomIntegers();
            randomGradient();
            artworkButtons();
            randomShape();
        }
    } 
}

//----------Buttons displayed within the generation state 
function artworkButtons() {
    push();
    fill(255, 255, 255);
    rect(backButtonX + 10, backButtonY - 10, buttonWidth, buttonHeight);
    stroke(255, 255, 255, 70)

    fill(128, 128, 128);
    textStyle(BOLD);
    textSize(13);
    text('BACK', backButtonX + buttonWidth / 2 - 7, backButtonY + buttonHeight / 2 - 5);
    pop();
    
    push();
    fill(255, 255, 255);
    rect(backButtonX + 160, backButtonY - 10, buttonWidth, buttonHeight);
    stroke(255, 255, 255, 70)

    fill(128, 128, 128);
    textStyle(BOLD);
    textSize(13);
    text(' + REGENERATE', backButtonX + buttonWidth / 2 + 106, backButtonY + buttonHeight / 2 - 5);
    pop();
}

//------------------------------------------\\ARTWORK GENERATION//-----------------------------//

// function lowSpec() {
//     spec = fft.analyze();
//     for (let i = 0; i < spec.length; i++) {
//       low = spec[i];
//     }

//     if (low < 1) {
//         stroke(colorOne || colorTwo || colorThree);
//         rect(Math.random() * innerWidth, Math.random() * innerHeight, Math.random() * innerWidth, Math.random() * innerHeight);
//         strokeWeight(Math.random() * 50);
//     } else if (low > number) {
//         line((Math.random() * innerWidth, Math.random() * innerHeight, Math.random() * innerWidth, Math.random() * innerHeight));
//         strokeWeight(Math.random() * rndTrackInt);
//         stroke(255);
//     }
// }

//----------Generate function triggers the artwork 
function generateArt() {
        randomShape();   
    }

//----------Elements are drawn onto canvas when in the correct state 
function draw() {
if (state===1) {
    nowSeconds = Math.floor(Date.now() / 1000)
    homeContent.style.display = "none";
    angleMode(DEGREES);
    imageMode(CENTER);
    artworkButtons();
    generateArt();
    } else {
    homeContent.style.display = "flex";
    let greyAngle = 210;
    document.body.style.background = `linear-gradient(${greyAngle}deg, black, grey)`;
    }

};