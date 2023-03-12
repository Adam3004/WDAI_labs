let countingFunction = () => {
  let counter = document.getElementById("counter");
  counter.innerText = +counter.innerText + 1;
};

let turnOnCounting = () => {
  let countingButton = document.getElementById("action");
  countingButton.addEventListener("click", countingFunction);
};

let turnOffCounting = () => {
  let countingButton = document.getElementById("action");
  countingButton.removeEventListener("click", countingFunction);
  let counter = document.getElementById("counter");
  counter.innerText = 0;
};

document.getElementById("turnOnAction").addEventListener("click", turnOnCounting);
document.getElementById("turnOffAction").addEventListener("click", turnOffCounting);
