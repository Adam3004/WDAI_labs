const names = [];
const phones = [];
var currNumber = 0;

let addContact = () => {
  var name = document.getElementById("nameInput");
  let number = document.getElementById("numberInput");
  if (number.checkValidity() && name.checkValidity()) {
    let newNumber = repairNumber(number.value);
    createContactStructure(name, newNumber);
  }
};

let createContactStructure = (name, newNumber) => {
  let contact = document.createElement("div");
  let generatedId = generateId();
  contact.setAttribute("class", "contact");
  contact.setAttribute("id", generatedId);
  let dataContainer = document.createElement("div");
  dataContainer.setAttribute("class", "dataContainer");
  let nameP = document.createElement("p");
  nameP.setAttribute("class", "name");
  nameP.innerText = name.value;
  let numberP = document.createElement("p");
  numberP.setAttribute("class", "number");
  numberP.innerText = newNumber;
  dataContainer.appendChild(nameP);
  dataContainer.appendChild(numberP);
  let binContainer = document.createElement("div");
  binContainer.setAttribute("class", "binContainer");
  let bin = document.createElement("img");
  bin.setAttribute("class", "bin");
  bin.setAttribute("src", "https://img.icons8.com/ios/100/null/delete--v1.png");
  binContainer.addEventListener("click", () => {
    removeContact(generatedId);
  });
  binContainer.appendChild(bin);
  contact.appendChild(dataContainer);
  contact.appendChild(binContainer);
  let main = document.getElementById("main");
  main.insertBefore(contact, document.getElementById("addContactForm"));
};

let repairNumber = (number) => {
  let newNumber = "";
  number = number.replace(/\s/g, "");
  for (let i = 0; i < number.length; i++) {
    newNumber += number[i];
    if (
      (number[0] != "+" && i % 3 == 2) ||
      (number[0] == "+" && i % 3 == 0 && i > 0)
    ) {
      newNumber += " ";
    }
  }
  return newNumber;
};

let removeContact = (id) => {
  document.getElementById("main").removeChild(document.getElementById(id));
};

let generateId = () => {
  let output = "contact" + currNumber;
  currNumber += 1;
  return output;
};

var form = document.getElementById("addContactForm");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

document
  .getElementById("submitFormButton")
  .addEventListener("click", addContact);
