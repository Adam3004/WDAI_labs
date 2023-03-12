let button = document.getElementById("button");

let onClickAction = () => {
    let name = prompt("Enter your name: ");
    if (name != null) {
      let nameText = document.getElementById("name");
      if (name.slice(-1)=="a"){
        nameText.innerHTML = "Hello female: " + name +"!";
      }
      else{
        nameText.innerHTML = "Hello male: " + name +"!";
      }
    }
  };

button.addEventListener("click", onClickAction);
