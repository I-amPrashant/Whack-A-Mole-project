
const difficultyRange=document.getElementById("difficultyRange");

let difficulty=750;


function handleDifficulty(valOfDifficulty){

if(valOfDifficulty>=1 && valOfDifficulty<=3){
difficulty=1000;
}
if(valOfDifficulty>=4 && valOfDifficulty<=6){
difficulty=750
}
if(valOfDifficulty>=7 && valOfDifficulty<=9){
difficulty=500
}
if(valOfDifficulty>9){
difficulty=300
}
}

document.addEventListener("DOMContentLoaded", function() {

let idArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const container=document.getElementById("container")
const currentScoreContainer =
document.getElementById("currentScore").lastElementChild;
const highScoreContainer =
document.getElementById("highScore").lastElementChild;
const timer = document.getElementById("timer").lastElementChild;
const startButton =
document.getElementById("start-restart").firstElementChild;
const resetButton =
document.getElementById("start-restart").lastElementChild;


let currentScore = 0,
highScore = 0, randomId;
let timeCounter, a;
function startGame() {
///timer
let count = 30;
startButton.classList.add("disable")
resetButton.classList.remove("disable")

 timeCounter = setInterval(() => {
  count = count - 1;
  if (count === 0) {
    clearInterval(timeCounter);
  }
  if (count < 10) {
    timer.textContent = `00:0${count}`;
  } else {
    timer.textContent = `00:${count}`;
  }
}, 1000);

currentScore = 0;
currentScoreContainer.innerHTML = currentScore;

const boxes = document.getElementsByTagName("span");

let mouse = document.createElement("img");
mouse.setAttribute("id", "mouse");
mouse.src = "./mole.png";

 a = setInterval(() => {

    if (count === 0) {
    clearInterval(a);
    container.removeEventListener("click", clickHandler)
    if (highScore < currentScore) { 
        highScore=currentScore;
      highScoreContainer.textContent = highScore;
      alert("congratulation you have a new highest record");
    }
    return;
  }

  for (const item of boxes) {
    item.innerHTML = "";
  }
   randomId = Math.floor(Math.random() * idArray.length + 1);
  for (const item of boxes) {
    if (item.id == randomId) {
      item.appendChild(mouse);
      mouse.setAttribute("class", "mouseItem")
    }
  }
  container.removeEventListener("click", clickHandler)//we use remove event listener to avoid multiple event handlers from setInterval
  container.addEventListener("click", clickHandler)
 
}, difficulty);

}
//resetting the game
function resetGame(){
  clearInterval(timeCounter);
  clearInterval(a);
  timer.textContent="00:00";
  currentScoreContainer.innerHTML="0";
  resetButton.classList.add("disable")
  startButton.classList.remove("disable")
}

//to handle the mouse click event.
function clickHandler(event) {
if (event.target.matches(".mouseItem")) {//we can also write event.target.classList.contains("..");
currentScore=currentScore+10;
currentScoreContainer.innerHTML=currentScore;
}
}

//Tips: e.target is generally used in creating a sidebar that works with outside touch event.

// startButton.addEventListener("click", timerFunction);
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

});

const cursorDot=document.getElementById("cursor-dot");
window.addEventListener("mousemove", (e)=>{
    posX=e.clientX;
    posY=e.clientY;

    cursorDot.style.left=`${posX}px`
    cursorDot.style.top=`${posY}px`
    // cursorDot.animate({
    //     left:`${posX}px`,
    //     top:`${posY}px`
    // }, {duration:100, fill:"forwards"})
})
