function addGroup(e) {
  let dotStyle = window.getComputedStyle(document.getElementById("dot"));
  if (checkIfIn(e.clientX, e.clientY)) {
    moveDot(
      e.clientX - parseInt(dotStyle.width) / 2 - parseInt(dotStyle.left),
      e.clientY - parseInt(dotStyle.height) / 2
    );
  } else {
    showCommunicate(e.clientX, e.clientY);
  }
}

let showCommunicate = (x, y) => {
  let main = document.getElementById("main");
  let communicate = document.createElement("p");
  communicate.innerText = "You clicked out of window";
  communicate.style.position = "absolute";
  communicate.style.left = x + "px";
  communicate.style.top = y - 10 + "px";
  communicate.style.color = "black";
  communicate.style.fontSize = "20px";
  communicate.style.width = "200px";
  communicate.style.height = "200px";
  main.appendChild(communicate);
  delay(3000).then(() => main.removeChild(communicate));
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let moveDot = (newX, newY) => {
  let dot = document.getElementById("dot");
  dot.style.marginLeft = newX + "px";
  dot.style.top = newY + "px";
};

let checkIfIn = (x, y) => {
  let container = window.getComputedStyle(
    document.getElementById("dotContainer")
  );
  return (
    parseInt(container.marginLeft) + parseInt(container.width) > x &&
    x > parseInt(container.marginLeft) &&
    parseInt(container.marginTop) + parseInt(container.height) > y &&
    y > parseInt(container.marginTop)
  );
};

window.addEventListener("click", addGroup);
