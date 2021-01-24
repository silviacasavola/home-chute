  var waitingRoom;
  var container;

  var timer = 100000;

  var ready = false;

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
  waitingRoomContainer.hide();


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
  clear()

  // UPDATES THE TIMER
  if (timer>0) {timer--;}
  select("#waiting-room-timer").html(timer);

  // THE USER IS READY TO PLAY
  select("#play-btn").mouseClicked(function () {
    ready = true;
  })

  select("#skip-btn").mouseClicked(function () {
    ready = true;
  })

  if (ready==true) {
    openPoll()
  }

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
    // let pastaW = (cnvW/18);
    // let pastaH = (cnvW/18);

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

      if (ready == true) {
      score++;
    }
  }
  }
  }


  // OPEN POLL
  function openPoll () {
  loop()

// if a match is in progress, it display the mini-game

  if (timer >= 3) {
  select("#play-btn").hide();
  select("#skip-btn").hide();
  select("#scroll").hide();
  select("#home-text-content").hide();
  waitingRoomContainer.show();
  waitingRoomContainer.style.display = "block";
  waitingRoomContainer.addClass('activated')
  select("#waiting-room-text").addClass("activated")
  select("#score").addClass("activated")
  }

  // if the match is over, it opens the poll

  else {window.open("poll.html", "_self")}
  }
