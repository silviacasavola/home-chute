  var waitingRoomContainer;

  var timer = 100000;

  var ready = false;

  var score = 0;


  function setup() {
  waitingRoomContainer = select("#waiting-room-container");
  waitingRoomContainer.hide();
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
