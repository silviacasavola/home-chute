// declaring pasta pieces
let penna;
let farfalla;

let x_penna;
let y_penna;

var myBoolean = false;

let time = 0;
let time2 = 0;
let time3 = 0;

//movement
let angle = 0;
let scroll = 0;

function preload(){
penna_preload = loadImage('../assets/img/penna.png');
farfalla_preload = loadImage('../assets/img/farfalla.png');
}

function setup() {
let pageHeight = document.documentElement.scrollHeight;

let cnv = createCanvas(windowWidth,pageHeight);
cnv.parent("animated-background");
//FRAMERATE
// frameRate(10);
}

function mouseWheel() {
if (event.deltaY>0) {
  myBoolean = true
}
console.log(event.deltaY)
console.log(myBoolean)
}

function draw() {
background("yellow")

// console.log(scroll)

if (myBoolean === true) {

let scalar = 4;
// START TIMER
time++;
//MOVE IN A CIRCLE
angle++;

let x = windowWidth/2;
let y = (windowHeight/5)*4;

if (time <=20) {
time2++
y_penna = y - time2*10
y_farfalla = y - time2*15
}

if (time > 20 && time <=22) {
y_penna = y_penna
y_farfalla = y_farfalla
}

if (time > 22 && time <50) {
time3++
y_penna = y_penna + time3
y_farfalla = y_farfalla + time3
}

if (time<50) {
x_farfalla = x + scalar * angle;
x_penna = x + scalar * angle;
}

if (time >= 50) {
y_penna = y_penna + scroll;
x_penna = x_penna;
y_farfalla = y_farfalla + scroll;
x_farfalla = x_farfalla;
}

farfalla =  image(farfalla_preload, x_farfalla, y_farfalla, farfalla_preload.width/2, farfalla_preload.height/2)
penna =  image(penna_preload, x_penna, y_penna, penna_preload.width/2, penna_preload.height/2)

// let w = random(0, windowWidth);
// let h = random(0, windowHeight)
//
// x_farfalla2 = w;
// x_penna2 = x + angle;
//
// y_farfalla2 = h;
// y_penna2 = x + angle;
//
// farfalla2 =  image(farfalla_preload, x_farfalla2, y_farfalla2, farfalla_preload.width/2, farfalla_preload.height/2)
// penna2 =  image(penna_preload, x_penna2, y_penna2, penna_preload.width/2, penna_preload.height/2)
}
}
