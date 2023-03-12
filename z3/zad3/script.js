var listOfThings = ["thing1"];
var number = 1;
let patchOutput = () => {
  let outPut = "";
  for (const thing of listOfThings) {
    outPut += thing + " ";
  }
  document.getElementById("listText").innerText = listOfThings;
};

let addToList = () => {
  number =
    (document.getElementById("listText").innerText.match(/,/g) || []).length +
    2;

  let thing = "thing" + number;
  listOfThings.push(thing);
  patchOutput();
};

let removeFromList = () => {
  listOfThings.shift();
  patchOutput();
};

document.getElementById("add").addEventListener("click", addToList);
document.getElementById("remove").addEventListener("click", removeFromList);
document.addEventListener("DOMContentLoaded", patchOutput());
