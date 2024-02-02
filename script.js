
//------------------------------------------\\VARIABLES//-----------------------------//

//---Audio Variables 
let fft;
let amp;
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

//---Particle & Flowfield Variables

let inc;
let cols, rows;
let zoff = 3;
let scl = 2.5;
let fr; 
let flowfield;
let particles;

//---Random Integer Variables 
let rndTrackInt;
let rndSclInt;
let timeStampMilli;
let rndUpInt;
let number;
let even;
let odd;

//---Color Variables 
let colorOne;
let colorTwo;
let colorThree;

let BGcolorOne;
let BGcolorTwo;
let BGcolorThree;

let hexString = "0123456789ABCDEF";
let angle;
let alpha;

//---Button Variables 
let button = document.getElementById('generateBtn');
let backButton;
let genButton;
let buttonWidth = 130; 
let buttonHeight = 40;
let backButtonX = 20;
let backButtonY = innerHeight - buttonHeight - 20;
let genButtonX = 20;
let genButtonY = innerHeight - buttonHeight - 20;
let buttonsShown = false;

//---Display Variables
let homeContent = document.getElementById('home-content');
let state = 0; 

//------------------------------------------\\AUDIO SOURCE SELECTION//-----------------------------//

//---Loads all audio sources
function preload() {
    //REFERENCE: The following sound functionality was written referencing https://stackoverflow.com/questions/43167907/sound-play-stop-pause Accessed: 2023-10-13
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

//---Selects what song will be played
function songPicker() {
    //Reference: Switch functionality was referenced from https://www.w3schools.com/js/js_switch.asp Accesed: 2023-10-13
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

//---Stops audio from being played 
function songStopper() {
    //REFERENCE: The following sound functionality was written referencing https://stackoverflow.com/questions/43167907/sound-play-stop-pause Accessed: 2023-10-13
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

//---Resets the random integers 
function randomIntFromInterval(min, max) { 
    //REFERENCE: The random integer functionality was written referencing https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript Accessed: 2023-10-13
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//---Selects integers within specific ranges
function randomIntegers() {
    rndTrackInt = randomIntFromInterval(1, 10)
    rndIncInt = randomIntFromInterval(0.1, 3);
    rndSclInt = randomIntFromInterval(3, 7)
    rndUpInt = randomIntFromInterval(1, 5);
    }

//---Resets the random integers and sets up particle array
function setup() {
    fft = new p5.FFT();
    randomIntegers();
    artworkButtons();
    
    //Getting current milliseconds
    let milli = new Date();
    timeStampMilli = milli.getMilliseconds();

    //Reference: The following perlin flowfield setup code was adapted from https://youtu.be/BjoM9oKOAKY Accessed: 2024-01-23
    //Particle Array
    particles = [];
    for (var i = 0; i < timeStampMilli / 3; i++) {
    particles[i] = new Particle();
    }

    //Perlin Noise Grid 
    cols = floor(width / 2);
    rows = floor(height / 2);
    fr = createP('');

    flowfield = new Array(cols * rows);

    //Reference: The following odd and even number code was adapted from https://www.programiz.com/javascript/examples/even-odd Accessed: 2024-01-30
    //Find odd or even number from milliseconds
    number = timeStampMilli;
    if(number % 2 == 0) {
    number = even;
    } else {
    number = odd;
    }
}

//---Defines the buttons displayed during the artwork generation 
function artworkButtons() {
    //Reference: The following button implementation was adapted from https://p5js.org/reference/#/p5/createButton Accessed: 2024-02-01
    if (buttonsShown === false && state === 1) {
        backButton = createButton('BACK');
        backButton.position(backButtonX + 10, backButtonY - 10);
        backButton.size(buttonWidth, buttonHeight);
        backButton.style('position', 'absolute');
        backButton.style('z-index', '2');
        backButton.style('color', 'grey');
        backButton.style('font-size', '12px');
        backButton.style('font-weight', 'bold');
        backButton.style('opacity', '0.5');
        backButton.style('background-color', 'white');
    
        genButton = createButton('+ REGENERATE');
        genButton.position(genButtonX + 160, genButtonY - 10);
        genButton.size(buttonWidth, buttonHeight);
        genButton.style('position', 'absolute');
        genButton.style('z-index', '2');
        genButton.style('color', 'grey');
        genButton.style('font-weight', 'bold');
        genButton.style('font-size', '12px');
        genButton.style('background-color', 'white');
        genButton.style('opacity', '0.5');
    
        buttonsShown = true;
        } 
};

//---Function to remove the buttons when returning to the home screen
function removeButtons() {
    //Reference: The following removing of buttons implementation was adapted from https://www.w3schools.com/jsref/met_element_remove.asp Accessed: 2024-02-01
    if (buttonsShown) {
        if (backButton) backButton.remove();
        if (genButton) genButton.remove();
        if (screenshotButton) screenshotButton.remove();
        buttonsShown = false;
    }
};

//------------------------------------------\\COLOR GENERATION//-----------------------------//

//---Selects a random hexcode 
let randomColor = (alpha) => {
    //Reference: The following coloring randomization code was adapted from https://proxlight.hashnode.dev/random-gradient-generator-javascript-tutorial Accessed: 2023-10-13
    let hexCode = "#";
    for( i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    hexCode += alpha.toString(16).toUpperCase();
    return hexCode;
    }

//---Generates a background gradient using three of the random hexcodes 
let randomGradient = () => {
    //Reference: The following coloring randomization code was adapted from https://proxlight.hashnode.dev/random-gradient-generator-javascript-tutorial Accessed: 2023-10-13
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

//-------------------------------------\\FLOWFIELD GENERATION//-----------------------------//

//---Defines the response of the flowfield based on certain amplitudes, random integers, and timestamp in milliseconds
function randomShape() {
    //Reference: The following perlin flowfield code was adapted from https://youtu.be/BjoM9oKOAKY Accessed: 2024-01-23
    fft.analyze();
    amp = fft.getEnergy(10, 280);

    var yoff = rndIncInt;

    if (amp > 180) {
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
              if (amp < 190) {
              var index = x + y * cols;
              var angle = noise(xoff, yoff, zoff) + TWO_PI * Math.random() * 1;
              } else if (amp > 190 && amp < 210) {
                var index = x + y + cols;
                var angle = noise(xoff, yoff, zoff) + TWO_PI * Math.random() * 1; 
             }   else if (amp > 210 && amp < 220) {
                    var index = x + y * cols;
                    var angle = noise(xoff, yoff, zoff) + TWO_PI * Math.random() * 1; }
              else {
              var index = x + y + cols;
              var angle = noise(xoff, yoff, zoff) * TWO_PI * Math.random() * 1;
              }
              var v = p5.Vector.fromAngle(angle);
              v.setMag(rndTrackInt);
              flowfield[index] = v;
              xoff += 0;
            }

              yoff += rndIncInt;
              zoff += rndIncInt;
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

//---Generate Artwork button triggers the artwork from the home screen
button.addEventListener('click', function() {
    setup();
    state = 1;
    songPicker();
    createCanvas(innerWidth, innerHeight)
    if (state===1) {
        setup();
        randomGradient();
        generateArt();
    } 
});

//---'Back' button to return to the home state & '+Regenerate' button to trigger new artwork
function mouseClicked() {
    setup();
    if (state === 1) {
        if (mouseX > backButtonX && mouseX < backButtonX + 150 && mouseY > backButtonY && mouseY < backButtonY + 40) {
            state = 0;
            canvas.remove();
            songStopper();
        } else if (mouseX > genButtonX + 160 && mouseX < genButtonX + 290 && mouseY > backButtonY && mouseY < backButtonY + 40) {
            songStopper();
            canvas.remove();
            createCanvas(innerWidth, innerHeight);
            fft = new p5.FFT(); 
            state = 1;
            songPicker();
            randomIntegers();
            randomGradient();
        }
    } 
}

//------------------------------------------\\ARTWORK GENERATION//-----------------------------//

//---Elements are drawn onto canvas when in the correct state 
function draw() {
if (state===1) {
    homeContent.style.display = "none";
    angleMode(DEGREES);
    imageMode(CENTER);
    randomShape();
    } else {
    homeContent.style.display = "flex";
    let greyAngle = 210;
    removeButtons();
    document.body.style.background = `linear-gradient(${greyAngle}deg, black, grey)`;
    }
};