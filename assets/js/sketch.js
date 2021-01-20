function preload(){
  // put preload code here
}

function setup() {

  // put setup code here
}

function draw() {
  // put drawing code here
}

function openAbout() {
  document.getElementById("about").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeAbout() {
  document.getElementById("about").style.width = "0%";
  console.log('chiudi')
}

function openRan() {
  document.getElementById("ranking").style.left = "0px";
  console.log('non mi vedi')
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeRan() {
  document.getElementById("ranking").style.left = "100%";
  console.log('chiudimi');

}

function showCredits(){
  console.log('crediti')
 x =  document.getElementById('crediti');
if(x.style.display === 'none'){
  x.style.display ='block'
}
else {x.style.display = 'none'}
}

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var ground;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("poll");
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(300, height, width+500, 100, options);
  World.add(world, ground);
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }

function mouseClicked() {
  if(mouseX<windowWidth/2){
  boxes.push(new Box2(mouseX, mouseY, 60, 17));}
  else{
  boxes.push(new Box(mouseX, mouseY, 60, 17));}


}

function preload(){
  farfalla = loadImage('./farfalla.png');
  penna = loadImage('./penna.png');
}

function draw() {
  background(255);
  Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  noStroke(255);
  fill(170);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width+2000, 100);
}
