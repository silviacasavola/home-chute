function openAbout() {
  document.getElementById("about-overlay").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeAbout() {
  document.getElementById("about-overlay").style.width = "0%";
  console.log('chiudi')
}

function openRan() {
  document.getElementById("ranking-overlay").style.left = "0px";
  console.log('non mi vedi')
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeRan() {
  document.getElementById("ranking-overlay").style.left = "100%";
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
