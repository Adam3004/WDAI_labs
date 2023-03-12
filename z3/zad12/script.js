const zombies = [];
const jsonUrl = "";
var zombieCounter = 0;
var aliveZombieOnTheEnd = 0;
var gameInProgres = true;
var myInterval;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let mouseFollowing = (e) => {
  let gunPoint = document.getElementById("gunPoint");
  gunPoint.style.display = "flex";
  let gunPointStyle = window.getComputedStyle(
    document.getElementById("gunPoint")
  );
  gunPoint.style.left =
    e.clientX -
    (parseInt(gunPointStyle.width) / 2 + parseInt(gunPointStyle.border)) +
    "px";
  gunPoint.style.top =
    e.clientY -
    (parseInt(gunPointStyle.height) / 2 + parseInt(gunPointStyle.border)) +
    "px";
};

let checkIfGameIsEnded = (zombie) => {
  if (zombie.style.display != "none") {
    aliveZombieOnTheEnd += 1;
    if (gameInProgres && aliveZombieOnTheEnd >= 3) {
      gameInProgres = false;
      removeZombies();
      aliveZombieOnTheEnd = 0;
      window.removeEventListener("mousemove", mouseFollowing);
      window.removeEventListener("click", pointsCounter);
      updateHighScores();
      removeMouseFollowing();
      showGameEndedMenu();
    }
  }
};

let zombieAnimation = (i) => {
  let zombie = document.getElementById(`zombie${i}`);
  let time = randTime();
  zombie.style.transition = `left ${time}s linear`;
  delay(100).then(() => changeLeft(zombie, -300));
  for (let i = 0; i < 40; i++) {
    delay((time / 40) * i * 1000).then(() => changeZombie(zombie, i % 10));
  }
  delay(1000 * time).then(() => {
    checkIfGameIsEnded(zombie);
  });
};

let endFun = () => {
  clearInterval(myInterval);
};

let removeMouseFollowing = () => {
  let gunPoint = document.getElementById("gunPoint");
  gunPoint.style.display = "none";
};

let removeZombies = () => {
  let zombies = document.getElementsByClassName("zombie");
  for (let zombie of zombies) {
    zombie.style.display = "none";
  }
};

let randTime = () => {
  let number = 0;
  while (number < 1.2) {
    number = Math.random() * 4;
  }
  return number;
};

let randHeight = () => {
  let number = 0;
  while (number < 0.35) {
    number = Math.random() * 2;
  }
  return number;
};

let randBottom = () => {
  if (Math.random() > 0.5) {
    return Math.random() * 350;
  } else {
    let number = 0;
    while (number > 0.5) {
      number = Math.random() * 100;
    }
    return -1 * number;
  }
};

let changeLeft = (zombie, x) => {
  zombie.style.left = x + "px";
};

let changeZombie = (zombie, i) => {
  zombie.style.backgroundPosition = `${(10 - i) * 200}px 0%`;
};

let respawnZombie = () => {
  if (gameInProgres) {
    let newZombie = document.createElement("div");
    let board = document.getElementById("board");
    let lastZombie;
    if (zombieCounter > 0) {
      lastZombie = document.getElementById(`zombie${zombieCounter - 1}`);
    }
    newZombie.setAttribute("class", "zombie");
    newZombie.setAttribute("id", `zombie${zombieCounter}`);
    let newHeight = randHeight();
    newZombie.style.transform = `scale(${newHeight}, ${newHeight})`;
    newZombie.style.bottom = randBottom() + "px";
    if (zombieCounter > 0) {
      board.insertBefore(newZombie, lastZombie);
    } else {
      board.appendChild(newZombie);
    }
    newZombie.addEventListener("click", shootingToZombie);
    zombieAnimation(zombieCounter);
    zombieCounter += 1;
  }
};

let starterFun = () => {
  myInterval = setInterval(respawnZombie, 500);
};

let shootingToZombie = (e) => {
  let zombie = e.target;
  zombie.style.display = "none";
};

let pointsCounter = (e) => {
  let counter = document.getElementById("counter");
  let number = parseInt(counter.innerText);
  if (e.target.id == "board") {
    number -= 6;
  } else {
    number += 12;
  }
  counter.innerText = number;
};

let showGameEndedMenu = () => {
  let gameEndedMenu = document.getElementById("endingMenuContainer");
  gameEndedMenu.style.transition = "bottom 0.7s";
  gameEndedMenu.style.bottom = "0px";
};

let acceptNickAndRunGame = () => {
  let nick = document.getElementById("nick");
  if (nick.checkValidity()) {
    let nickText = document.getElementById("nickText");
    nickText.innerText = `Player: ${nick.value}`;
    let startingMenu = document.getElementById("startingMenu");
    startingMenu.style.transition = "bottom 0.7s";
    startingMenu.style.bottom = "-110%";
    window.addEventListener("mousemove", mouseFollowing);
    delay(700).then(() => {
      starterFun();
      window.addEventListener("click", pointsCounter);
    });
  }
};

async function updateHighScores() {
  try {
    var data = await fetch(jsonUrl);
  } catch (err) {
    console.error(err);
  }
  try {
    var jsonWithData = await data.json();
  } catch (err) {
    console.error(err);
  }
  prepareHighScores(jsonWithData);
}

async function prepareHighScores(jsonWithData) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //styczen = 0
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
  let name = document.getElementById("nick").value;
  let score = document.getElementById("counter").innerText;
  data = jsonWithData;
  data.push({ name: name, score: score, date: today });
  data = data.sort(comparator);
  data = updateData(data);
  delay(700).then(() => {
    updateScoreBoard(data);
    updateCurrScore(name, score);
  });
  await sendNewData(jsonUrl, data);
}

let updateData = (data) => {
  let newData = [];
  for (let i = 0; i <= 7; i++) {
    newData.push(data[i]);
  }
  return newData;
};

let updateCurrScore = (name, score) => {
  document.getElementById(
    "endingMenuTitle"
  ).innerText = `Good job ${name} you got ${score} points`;
};

let updateScoreBoard = (data) => {
  for (let i = 1; i <= 7; i++) {
    document.getElementById(`scoreBoardItem${i}`).innerText = `${
      data[i - 1].name
    }, ${data[i - 1].score} points, ${data[i - 1].date}`;
  }
};

function comparator(a, b) {
  if (parseInt(a["score"]) < parseInt(b["score"])) return 1;
  else return -1;
}

async function sendNewData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// is being done when window is being load
document.getElementById("nickForm").addEventListener("submit", (event) => {
  event.preventDefault();
});

document
  .getElementById("startButton")
  .addEventListener("click", acceptNickAndRunGame);

document.getElementById("resetGameButton").addEventListener("click", () => {
  window.location.reload();
});
