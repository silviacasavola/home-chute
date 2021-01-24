- Concept of your project. Where does your idea come from? What is you communication aim? What is the context of use of your project? What devices are part of the experience?
- Design challenges. Which were the most challenging aspects of your project, design-wise? How did you solve your design problems? Document this part with images, schemas, diagrams and screenshots from the prototype.
- Coding challenges. Which were the most challenging aspects of your project, coding-wise? How did you solve your coding problems? Document this part with code snippets, links to tutorials you followed or resources you found online.

During the exam, no slides are needed. Stress these three points in particular: the Public, Communicative goals and Context of use of your project.

![alt tag](../master/links/index.png)

## About
"Pasta Chute" is a WebApp built on [p5.js](https://p5js.org) that aims to connect people thanks to a topic of general interest: pasta.
The app is playable at: https://surprise-surprise.herokuapp.com/<br>
"Past Chute" was developed as a part of the [Creative Coding](https://drawwithcode.github.io/) course at Politecnico di Milano.<br>
<br>Faculty: Michele Mauri, Andrea Benedetti, Tommaso Elli

## Table of Contents
1. [Concept](#concept)<br>
a. [How does it work?](#how-does-it-work)<br>
b. [The User Challenge](#the-user-challenge)<br>
2. [Structure](#structure)<br>
a. [Homepage](#homepage)<br>
b. [Waiting room](#waiting-room)<br>
c. [Poll](#poll)<br>
d. [Ranking](#ranking)<br>
3. [The Interface](#the-interface)<br>
4. [The Code](#the-code)<br>
a. [Tools](#tools)<br>
5. [Team](#team)<br>

## Concept  
As harmless as it might look, pasta often ends up at the center of fierce animated debates, especially in our country. Our team wanted to trigger the same engagement in a WebApp the requires users to root for their favorite type of pasta.
The purpose is light and humorous: to entertain people through a very simple, yet engaging experience and to make them feel part of something big, despite (or maybe thanks to) the trivial subject.
The creative process is very similar to the one of memes, as it starts from picking a very simple piece of culture that has a surprisingly big impact because of its universality.


## Context of use
The project addresses a broad target audience, but it's expected to be spark interest / be appreciated / succeed mostly among young people. The game is always ongoing and there is no special events, so that people can jump in and fool around whenever they want.<br>
Friends can arrange to visit the website at the same time to play together or against each other, but one can also play alone, fooling around, asking themselves what pasta they prefer, discovering new types and browsing the records.


## How does it work?
The user can through the map in any directions, but he will have some restrictions: he won’t be able to zoom back over a certain value, to discourage the user from exploring the places on the man that are not strictly surrounding. The user can move on the map as he moves around in real life; through a button located in the bottom part of the scree he can leave some packets around, which could be opened from other users that find them while exploring the map. The user will be able to leave a content of his choice hidden inside the gifts.

## The User Challenge
<p align="center">
  <img width="300" height="300" src="../master/links/challenges.gif">
</p>

Every time the user access the app, he will have the chance to see all 5 the different illustrations and to leave the packets around (so other users can collect them and the game can proceed) until he leaves the website.
Every time he reconnects he will have to start over.

## Structure
The WebApp is designed to work on computer and mobile devices in landscape mode.

#### Homepage
The homepage is designed to prepare the user to the fast dynamics of the poll. The library [skrollr](https://github.com/Prinzhorn/skrollr) was used to display a sequence of very concise information about the attitude they need to take: be fierce, be fast and ready to click. Once they are ready, they can enter the game.

#### Waiting room
The purpose of the waiting room is to entertain the user until the start of a new match, so that they don't find themselves in the middle of a duel that has already started.
A checkered, truly Italian-stereotype-style tablecloth got from... flutters in the screen and falls at the end of the timer, uncovering the actual poll.

#### Poll
The poll works in a very simple way. The screen is split in two; each side represents a type of pasta. The user needs to locate their mouse (or their finger) on the side of the pasta they want to vote for and click as many times as possible to make it win. Any click generates a piece of the chosen pasta in that point of the screen, which falls on the ground and gathers on the others, thanks to [matter.js](https://brm.io/matter-js/). This way, it's very easy to sense what pasta is winning and the contribution of the other users, who generate pasta in turn.
All the matches last 15 seconds. The short duration makes the individual contests very quick and ephemeral, but each result contributes to the general ranking.

#### Ranking
The ranking displays the general results of the whole game.

## The Interface  
The WebApp works only on mobile platforms and in portrait mode.
<p align="center">
  <img width="400" height="200" src="../master/links/desktop.png">
</p>

In the map in  the user has a limited possibility to move around. He can move the map, but he can't zoom back over a certain value.

  ![alt tag](../master/links/map.jpg)

The user, clicking the button in the bottom part of the screen, will be able to leave some presents around. The user can choose three differents mood.

  ![alt tag](../master/links/mood)

The user who leaves the package will see it in greyscale, while the other users will see it in a coloured version.

  ![alt tag](../master/links/packages.jpg)

When the other users open your packages, they will see some animations that show your chosen mood.

  ![alt tag](../master/links/open.jpg)

## The Code
The app was built mostly in p5.js. The library matter.js was used to render the mechanics of the pieces of pasta falling from above.

We used Mapbox for the main part of the WebApp. To intergrate Mapbox GL inside p5.js we used a library called mappa.js, a tool that facilitate work between the canvas element and existing map libraries and APIs.
We slightly changed mappa.js to add a gps button that helps the user go back to his position:
```javascript
map.addControl(
  new mapboxgl.GeolocateControl({
	  positionOptions: {
		  enableHighAccuracy: true
		},
		trackUserLocation: true,
		showUserLocation: false
	})
);
```
The main challenge was based around having so many interactions that have to be registered, remembered and sent to everyone.
We overcame that challenge by relying on a local JSON file that is modified everytime a change with the present happens by sending signals from the client to the server and then to all the clients with socket.io, an engine which enables real-time, bidirectional and event-based communication.
As an example, when someone sends a present automatically will be sent a JSON variable to the server holding all the present informations:
```javascript
//Variable holding the new Present informations
var data = {
  x: rx,
  y: ry,
  q1: question1,
  show: iconshow
}

//JSON variable holding the previus variable
var json = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: data
}

//Emit the Present data to other Users
socket.emit('present', json);
```
When the server receives the signal and the gift Informations it starts a function to change the local JSON by adding this new informations:
```javascript
function jsonUpdate(request){
  var testo = request.body; //Put the informations of the present that a user sent on the variable testo
  var fs = require('fs'); //Call FileSystem API to read and modify JSON file

	//Read JSON file
	fs.readFile('./public/presents.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err); //If the read produces an error say it on the console
    } else {
      obj = JSON.parse(data); //Convert the JSON into an object
      obj.regali.push(testo) //Put the present informations as a new entry inside the objects
      json = JSON.stringify(obj, null, 2); //Convert the object into a string
      fs.writeFile('./public/presents.json', json, finished); //Write new entry into JSON
		  socket.broadcast.emit('presentBroadcast', request); //Send to all clients the update
    }
  });
}
```
And then a signal is emitted to all the clients to update the presents:
```javascript
regalimported = []; //deletes all the previus shown presents
database = loadJSON("../presents.json"); //Loads JSON with new informations
//Recreate all the gifts Objects on the map after some time to ensure that the JSON is loaded
setTimeout(function() {
  for (var t = 0; t < database.regali.length; t++) {
    var data = {
      x: database.regali[t].x,
      y: database.regali[t].y,
      q1: database.regali[t].q1,
      show: database.regali[t].show,
      index: t
    }
    regalimported[t] = new RegaloImported(data);
  }
}, 1000);
```
In general we used mostly p5.js to handle events but for graphics and animations we used JQuery and CSS as it's easier to make the animations more fluid and dynamic.

## Tools
* [p5.js](https://p5js.org/)
* [matter.js](https://brm.io/matter-js/)
* [JQuery](https://jquery.com/)
* [skrollr.js](https://github.com/Prinzhorn/skrollr)
* [three.js](https://threejs.org/)

## Team
* [Martina Bracchi](mailto:martinabracchi.mb@gmail.com)   
* [Silvia Casavola](mailto:silcasavola@gmail.com)
* [Dario Faudella](mailto:dario.faudella@gmail.com)  
* [Manuel Reale](mailto:manuel.reale2000@gmail.com)
* [Donato Renzulli](mailto:donren.99@gmail.com)
