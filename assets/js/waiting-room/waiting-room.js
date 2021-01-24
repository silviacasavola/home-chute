  var waitingRoomContainer;

  var pastaimgs = [];
  var pasta = [];
  var i;

  var score = 0;


  var colanderX;
  var colanderY;
  var colanderW;
  var colanderH;


  function setup() {

  waitingRoomContainer = select("#waiting-room-container");

  let gameCnv = createCanvas(windowWidth, windowHeight)
  gameCnv.parent(waitingRoomContainer);
  gameCnv.position(0, 0);
  gameCnv.style.zIndex = "150";
  }


  function preload() {
    for (i=1; i<23; i++) {
    pastaimgs[i] = loadImage("./assets/img/pasta/pasta-"+i+".png");
  }

    for(i = 1; i<23; i++) { pasta[i] = new pastaRain() }

    colander = loadImage("./assets/img/colander.png")
  }


  function draw() {
  // TOGGLES THE FUNCTIONS TO CREATE PASTA
  for (i=1; i<23; i++) {
  pasta[i].show();
  pasta[i].update();
  }

  // DISPLAYS THE SCORE
  select("#score").html("SCORE: " + score)

  // COLANDER
  colanderW = windowWidth/8;
  colanderH = windowWidth/20;
  colanderX = constrain(mouseX, colanderW/2, windowWidth-colanderW/2);
  colanderY = height - colanderH/2 - windowHeight/12;

  imageMode(CENTER)

  image(colander, colanderX, colanderY, colanderW, colanderH);
  }



  function pastaRain() {

  this.x = random(0, windowWidth);
  this.y = random(-10, -windowHeight);
  this.img = random(pastaimgs);


  // CREATES PIECES OF PASTA
    this.show = function() {

    image(this.img, this.x, this.y);
    }

  // MAKES PASTA FALL
    this.update = function() {
      this.speed = random(5, 10);
      this.gravity = 1.05;
      this.y = this.y + this.speed*this.gravity;

    if (this.y > windowHeight) {
    this.y = random(0, -windowHeight);
    this.gravity = 0;
    }

  // MAKES PASTA DISAPPEAR IF CAUGHT WITH THE COLANDER
  colanderW = windowWidth/8;
  colanderH = windowHeight/8;
  colanderX = constrain(mouseX, colanderW/2, windowWidth-colanderW/2);
  colanderY = height - colanderH - windowHeight/12;

    if (this.y > colanderY && this.x >= (colanderX - colanderW/2) && this.x <= (colanderX + colanderW))
    {
      this.y = 0;

      if (waitingRoomContainer.style.display = "block") {
      score++;
    }
  }
  }
  }
