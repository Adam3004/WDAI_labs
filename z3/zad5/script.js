const values = [1, 2, 5];
const colors = ["niebieski", "czerwony", "żółty"];
var secondAction = true;
var thirdAction = true;
var propagation = true;
var useCapture = false;
var communicates = [];

let showCommunicate = (i) => {
  let communicate = document.getElementById("communicate");
  if (communicates.length > 32) {
    communicates = [];
  }
  let newCommunicate =
    "\n" + "nacisnąłeś " + colors[i] + " o wartości " + values[i];
  communicates.push(newCommunicate);
  communicate.innerText = communicates;
};

let turnOffSquares = () => {
  let value = +document.getElementById("counter").innerText;
  if (value > 30 && secondAction) {
    turnOffSecondAction();
    secondAction = false;
  }
  if (value > 50 && thirdAction) {
    turnOffThirdAction();
    thirdAction = false;
  }
};

let action = (i) => {
  let counter = document.getElementById("counter");
  counter.innerText = +counter.innerText + values[i];
  showCommunicate(i);
  turnOffSquares();
};

let firstSquareAction = (e) => {
  stopBubble(e);
  action(0);
};

let secondSquareAction = function (e) {
  stopBubble(e);
  action(1);
};
let thirdSquareAction = function (e) {
  stopBubble(e);
  action(2);
};

function stopBubble(e) {
  if (!e) {
    let e = window.event;
    e.cancelBubble = true;
  }
  if (!propagation) e.stopPropagation();
}

let turnOffSecondAction = () => {
  let object = document.getElementById("square2");
  object.removeEventListener("click", secondSquareAction, useCapture);
  let text = document.getElementById("square2Text");
  text.style.color = "rgb(145,0,0)";
};

let turnOffThirdAction = () => {
  let object = document.getElementById("square3");
  object.removeEventListener("click", thirdSquareAction, useCapture);
  let text = document.getElementById("square3Text");
  text.style.color = "rgb(145,145, 0)";
};

let stopOrStartPropagationAction = () => {
  let square2 = document.getElementById("square2");
  let square3 = document.getElementById("square3");
  propagation = !propagation;
  square2.removeEventListener("click", secondSquareAction, useCapture);
  square3.removeEventListener("click", thirdSquareAction, useCapture);
  if (secondAction) {
    square2.addEventListener("click", secondSquareAction, useCapture);
  }
  if (thirdAction) {
    square3.addEventListener("click", thirdSquareAction, useCapture);
  }
  let spText = document.getElementById("sp");
  if (propagation) {
    spText.innerText = "Stop propagation";
  } else {
    spText.innerText = "Start propagation";
  }
};

let reset = () => {
  let square2 = document.getElementById("square2");
  let square3 = document.getElementById("square3");
  if (!secondAction) {
    square2.addEventListener("click", secondSquareAction, useCapture);
  }
  if (!thirdAction) {
    square3.addEventListener("click", thirdSquareAction, useCapture);
  }
  document.getElementById("communicate").innerText = "";
  document.getElementById("counter").innerText = 0;
  document.getElementById("square2Text").style.color = "rgb(0,0,0)";
  document.getElementById("square3Text").style.color = "rgb(0,0,0)";
  secondAction = true;
  thirdAction = true;
  communicates = [];
};

let useCaptureChange = () => {
  let square1 = document.getElementById("square1");
  let square2 = document.getElementById("square2");
  let square3 = document.getElementById("square3");
  useCapture = !useCapture;
  square1.removeEventListener("click", firstSquareAction, !useCapture);
  square1.addEventListener("click", firstSquareAction, useCapture);
  if (secondAction) {
    square2.removeEventListener("click", secondSquareAction, !useCapture);
    square2.addEventListener("click", secondSquareAction, useCapture);
  }
  if (thirdAction) {
    square3.removeEventListener("click", thirdSquareAction, !useCapture);
    square3.addEventListener("click", thirdSquareAction, useCapture);
  }
};

document
  .getElementById("square1")
  .addEventListener("click", firstSquareAction, useCapture);
document
  .getElementById("square2")
  .addEventListener("click", secondSquareAction, useCapture);
document
  .getElementById("square3")
  .addEventListener("click", thirdSquareAction, useCapture);

document
  .getElementById("sp")
  .addEventListener("click", stopOrStartPropagationAction);

document.getElementById("reset").addEventListener("click", reset);

document
  .getElementById("useCapture")
  .addEventListener("click", useCaptureChange);
