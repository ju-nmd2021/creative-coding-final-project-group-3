

//------------------------------------------\\VARIABLES//-----------------------------//
let milli = new Date();
let changeThreshold = 300; 


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

let inc;
let scl = Math.random() * 10;
let cols, rows;
let zoff = Math.random() * 5;
let fr; 
let particles = [];
let flowfield;

//----------Waveform/Particle Variables 
let fft;
let amp;
let spec;
let number;
let low;
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
    switch (rndTrackInt) {
        case 1:
            popSong1.play();
        break;
        case 2:
            rockSong1.play();
        break;
        case 3:
            popSong2.play();
        break;
        case 4:
            rockSong2.play();
        break;
        case 5:
            popSong3.play();
        break;
        case 6:
            rockSong3.play();
        break;
        case 7:
            popSong4.play();
        break;
        case 8:
            rockSong4.play();
        break;
        case 9:
            popSong5.play();
        break;
        case 10:
            rockSong5.play(); 
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
    clear();
    fft = new p5.FFT(0, 1024);
    randomIntegers();
    let timeStampMilli = milli.getMilliseconds();

//Perlin Noise Grid 
    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < timeStampMilli; i++) {
    particles[i] = new Particle();
    }

    number = timeStampMilli;

    if(number % 2 == 0) {
    number = even;
    }
    else {
    number = odd;
    }
}



//----------Resets the random integers 
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//----------Selects integers within specific ranges
function randomIntegers() {
    // rndSongInt = randomIntFromInterval(1, 6);
    rndTrackInt = randomIntFromInterval(1, 10)
    rndIncInt = randomIntFromInterval(0.1, 3);
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

    let alpha = 255;
    colorOne = randomColor(alpha);
    colorTwo = randomColor(alpha);
    colorThree = randomColor(alpha);
    colorFour = randomColor(alpha);
    angle = Math.floor(Math.random() * 360);
    document.body.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo}, ${colorThree}), ${colorFour}`;

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
    amp = fft.getEnergy(100, 500);

    // let modulatedLine = 
    // let modulatedColor 
    // let modulated

    var yoff = 0;

    if (amp > 180) {
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
              if (rndTrackInt && amp < 210) {
              var index = x - y * cols;
              var angle = noise(xoff, yoff, zoff) * TWO_PI * 1;
              } else {
              var index = x + y * cols;
              var angle = noise(xoff, yoff, zoff) * TWO_PI * 1;
              }
              var v = p5.Vector.fromAngle(angle);
              v.setMag(rndTrackInt);
              flowfield[index] = v;
              xoff += rndIncInt;
            //   stroke(0, 50);
            //   strokeWeight (1)
            //   push();
            //   translate(x * scl, y * scl);
            //   rotate(v.heading());
            //   strokeWeight(1);
            //   line(0, 0, scl, 0);
            //   pop();
            }
              yoff += rndIncInt;
        
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
    state=1;
    songPicker();
    createCanvas(innerWidth, innerHeight);
    artworkButtons(); 

    if (state===1) {
        randomGradient();
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
            fft = new p5.FFT(); 
            state = 1;
            songPicker();
            createCanvas(innerWidth, innerHeight);
            randomGradient();
            artworkButtons();
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
    background(0);
    // let greyAngle = 210;
    // document.body.style.background = `linear-gradient(${greyAngle}deg, black, grey)`;
    }

};