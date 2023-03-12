var currDataValue = 0;
var currCardValue = 1;

const dataList = [
  {
    src: "images/blue.png",
    name: "Jan Kowalski",
    role: "director",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a metus non arcu tempor ornare. Fusce vitae nisi mollis arcu fringilla aliquam. Cras volutpat lacus at ornare ultricies. Vestibulum eu augue convallis, congue justo id, mattis nisl. Integer molestie bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a metus non arcu tempor ornare. Fusce vitae nisi mollis arcu fringilla aliquam. Cras volutpat lacus at ornare ultricies. Vestibulum eu augue convallis, congue justo id, mattis nisl. Integer molestie bibendum.",
  },
  {
    src: "images/green.png",
    name: "Jakub Kowalik",
    role: "data engineer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a lacus eros. Integer nec ornare velit. Nam in dolor ac velit vulputate tincidunt a ac enim. Cras pellentesque mollis nulla, quis maximus est porta ut. Pellentesque suscipit justo quis urna.",
  },
  {
    src: "images/rudy.png",
    name: "Marcin Wrona",
    role: "translator",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum nisi et elit aliquam, sit amet commodo libero sollicitudin. Nam facilisis lacus a ipsum faucibus, eu scelerisque velit tempus. Aliquam vitae urna vel arcu tempor egestas. Phasellus tincidunt interdum velit.",
  },
  {
    src: "https://img.icons8.com/officel/80/null/guest-male.png",
    name: "Grzegorz Brzęczyszczykiewicz",
    role: "data engineer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis ante vitae lacus volutpat molestie. Donec rhoncus porttitor gravida. Proin at pretium orci. Maecenas imperdiet nec magna sed eleifend. Vivamus sed malesuada orci. Donec dapibus leo mauris, eget ornare tellus.",
  },
];

let showNext = (delay) => {
  let currCart = document.getElementById("card" + currCardValue);
  let currCart2 = document.getElementById("card" + ((currCardValue + 1) % 3));
  currCart.style.transition = `transform ${delay}s, width 0s ${delay}s, height 0s ${delay}s`;
  currCart.style.transform = "rotateY(90deg)";
  currCart.style.transformOrigin = "0%";
  currCart.style.height = "329px";
  currCart.style.width = "0px";
  currCart2.style.transition = `transform ${delay}s ${delay}s, width 0s ${delay}s, height 0s ${delay}s`;
  currCart2.style.transform = "rotateY(0deg)";
  currCart2.style.transformOrigin = "100%";
  currCart2.style.width = "60%";
  currDataValue = (currDataValue + 1) % dataList.length;
  currCardValue = (currCardValue + 1) % 3;
  changeCardData(
    (currCardValue + 1) % 3,
    (currDataValue + 1) % dataList.length
  );
};

let showPrev = () => {
  let currCart = document.getElementById("card" + currCardValue);
  let currCart2 = document.getElementById("card" + lowerVal(currCardValue, 3));
  currCart.style.transition = "transform 0.5s, width 0s 0.5s, height 0s 0.5s";
  currCart.style.transform = "rotateY(-90deg)";
  currCart.style.transformOrigin = "100%";
  currCart.style.height = "329px";
  currCart.style.width = "0px";
  currCart2.style.transition =
    "transform 0.5s 0.5s, width 0s 0.5s, height 0s 0.5s";
  currCart2.style.transform = "rotateY(0deg)";
  currCart2.style.transformOrigin = "0%";
  currCart2.style.width = "60%";
  currDataValue = lowerVal(currDataValue, dataList.length);
  currCardValue = lowerVal(currCardValue, 3);
  changeCardData(
    lowerVal(currCardValue, 3),
    lowerVal(currDataValue, dataList.length)
  );
};

let lowerVal = (currVal, modVal) => {
  if (currVal - 1 < 0) {
    return modVal - 1;
  } else {
    return (currVal - 1) % modVal;
  }
};

let changeCardData = (cardNumber, dataNumber) => {
  let img = document.getElementById("img" + cardNumber);
  let name = document.getElementById("name" + cardNumber);
  let role = document.getElementById("role" + cardNumber);
  let desc = document.getElementById("desc" + cardNumber);
  img.setAttribute("src", dataList[dataNumber].src);
  name.innerText = dataList[dataNumber].name;
  role.innerText = dataList[dataNumber].role;
  desc.innerText = dataList[dataNumber].desc;
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let chooseEmplyeeRandomely = () => {
  const randomNumber =
    Math.floor(Math.random() * dataList.length) % dataList.length;
  let i = 0;
  let intervalWorks = true;
  const interval1 = setInterval(() => {
    showNext(0.2);
  }, 400);
  while (i < dataList.length) {
    delay(i * 400).then(() => {
      if (currDataValue == randomNumber && intervalWorks) {
        clearInterval(interval1);
        intervalWorks = false;
      }
    });
    i += 1;
  }
};

changeCardData(0, 0);
changeCardData(1, 1);
changeCardData(2, 2);
document.getElementById("next").addEventListener("click", () => {
  showNext(0.5);
});
document.getElementById("prev").addEventListener("click", showPrev);
document
  .getElementById("randomButton")
  .addEventListener("click", chooseEmplyeeRandomely);
