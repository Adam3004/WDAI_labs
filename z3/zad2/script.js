var i = 0;
var links = ["images/bmw.jpg", "images/ducati.jpg", "images/r6.jpg"];
var colors = ["red", "yellow", "green"];
let nextImg = () => {
  i += 1;
  let motoImg = document.getElementById("picture");
  motoImg.setAttribute("src", links[i % 3]);
  motoImg.style.border = "5px solid " + colors[i % 3];
};
document.getElementById("button").addEventListener("click", nextImg);
