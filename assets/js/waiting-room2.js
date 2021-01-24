  var waitingRoom;
  var container;

  var gameCnv;
  var cnvW;
  var cnvH;


// TURNS TRUE WHEN THE USER CLICKS
  var ready = false;

  var timer = 100000;

  var pastaimgs = [];
  var pasta = [];

  var score = 0;

  // var i;

  var colanderX;
  var colanderY;
  var colanderW;
  var colanderH;

  var angle = 0;


  function setup() {

  waitingRoomContainer = select("#waiting-room-container");
  waitingRoomContainer.hide();

  cnvW = waitingRoomContainer.width;
  cnvH = waitingRoomContainer.height;


  gameCnv = createCanvas(cnvW, cnvH)
  gameCnv.position(0, 0);
  gameCnv.style.border = "solid";
  gameCnv.parent(waitingRoomContainer);
  }


  function preload() {
    for (var a=1; a<26; a++) {
    pastaimgs[a] = loadImage("./assets/img/pasta/pasta-"+a+".png");
  }

    for (var e = 1; e<26; e++) { pasta[e] = new pastaRain() }

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

  if (ready==true) {
    openPoll()
  }

  // TOGGLES THE FUNCTIONS TO CREATE PASTA
  for (var i=1; i<26; i++) {
  pasta[i].show();
  pasta[i].update();
  }

  // DISPLAYS THE SCORE
  select("#score").html("SCORE: " + score)

  // COLANDER
  let colanderW = width/8;
  let colanderH = height/8;
  colanderX = constrain(mouseX, 0, width-colanderW) - colanderW/2;
  colanderY = height - colanderH;

  imageMode(CENTER)

  image(colander, colanderX, colanderY, colanderW, colanderH);
  }



  function pastaRain() {
  waitingRoomContainer = select("#waiting-room-container");

  cnvW = waitingRoomContainer.width;
  cnvH = waitingRoomContainer.height;

  this.x = random(0, cnvW);
  this.y = random(-10, -cnvH);

  // 1
  // i = random(1, 25);
  // this.img=pastaimgs[i];

  // 2
  this.img=random(pastaimgs);

  // 3



  // CREATES PIECES OF PASTA
    this.show = function() {
    let pastaW = (cnvW/18);
    let pastaH = (cnvW/18);

    image(this.img, this.x, this.y);
    }

  // MAKES PASTA FALL
    this.update = function() {
      this.speed = random(5, 10);
      this.gravity = 1.05;
      this.y = this.y + this.speed*this.gravity;

    if (this.y > cnvH) {
    this.y = random(0, -cnvH);
    this.gravity = 0;
    }

  // MAKES PASTA DISAPPEAR IF CAUGHT WITH THE COLANDER
  let colanderW = width/10;
  let colanderH = height/10;
  colanderX = constrain(mouseX, 0, width-colanderW) - colanderW/2
  colanderY = cnvH - colanderH*2;

    if (this.y > colanderY && this.x >= (colanderX - colanderW/2) && this.x <= (colanderX + colanderW)) {
      this.y = 0;
      score++;
  }
  }
  }


  // OPEN POLL
  function openPoll () {
  loop()
  if (timer >= 3) {
  select("#play-btn").hide();
  select("#home-text-content").hide();
  waitingRoomContainer.show();
  waitingRoomContainer.addClass('activated')
  select("#waiting-room-text").addClass("activated")
  select("#score").addClass("activated")
  }
  else {window.open("poll.html", "_self")}
  }
