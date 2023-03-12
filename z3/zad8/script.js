const visibility = [false, false];

let changeVisibility = (number) => {
  let button = document.getElementById("visibleImg" + number);
  let input = document.getElementById("passwordField" + number);
  if (!visibility[number - 1]) {
    button.setAttribute(
      "src",
      "https://img.icons8.com/windows/64/null/invisible.png"
    );
    input.setAttribute("type", "text");
  } else {
    button.setAttribute(
      "src",
      "https://img.icons8.com/windows/64/null/visible--v1.png"
    );
    input.setAttribute("type", "password");
  }
  visibility[number - 1] = !visibility[number - 1];
};

function containsSpecialChars(password) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(password);
}

function minLen(password) {
  return password.length >= 8;
}

function containsCapitalCharacter(password) {
  return /\p{Lu}/gu.test(password);
}

function containsDigit(password) {
  return /[0-9]/.test(password);
}

let checkPassword = () => {
  let password = document.getElementById("passwordField1").value;
  let minCharImg = document.getElementById("minChar");
  let specialCharImg = document.getElementById("specialChar");
  let capitalCharImg = document.getElementById("capitalChar");
  let digitImg = document.getElementById("digit");
  if (containsCapitalCharacter(password)) {
    capitalCharImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/checked--v1.png"
    );
  } else {
    capitalCharImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/cancel.png"
    );
  }
  if (minLen(password)) {
    minCharImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/checked--v1.png"
    );
  } else {
    minCharImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/cancel.png"
    );
  }
  if (containsSpecialChars(password)) {
    specialCharImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/checked--v1.png"
    );
  } else {
    specialCharImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/cancel.png"
    );
  }
  if (containsDigit(password)) {
    digitImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/checked--v1.png"
    );
  } else {
    digitImg.setAttribute(
      "src",
      "https://img.icons8.com/office/40/null/cancel.png"
    );
  }
};

let arePasswordsCorrect = () => {
  let password1 = document.getElementById("passwordField1").value;
  let password2Field = document.getElementById("passwordField2");
  let password2 = password2Field.value;
  // let button = document.getElementById("submitButton");
  if (password1 == password2 && password1.length > 0) {
    password2Field.style.border = "2px solid green";
    communicate.style.display = "none";
    // activateButton(password1, button);
  } else {
    password2Field.style.border = "1px solid black";
    // button.style.backgroundColor = "rgb(165, 165, 165)";
    // button.disabled = true;
  }
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let showCommunicateAboutReq = (password1) => {
  if (
    !containsCapitalCharacter(password1) ||
    !containsSpecialChars(password1) ||
    !minLen(password1) ||
    !containsDigit(password1)
  ) {
    let com2 = document.getElementById("communicate2");
    com2.style.display = "block";
    delay(3000).then(() => {
      com2.style.display = "none";
    });
    return false;
  }
  return true;
};

let showCommunicateAboutEq = (password1, password2) => {
  if (password1 != password2) {
    let communicate = document.getElementById("communicate");
    communicate.style.display = "block";
    delay(3000).then(() => {
      communicate.style.display = "none";
    });
    return false;
  }
  return true;
};

let afterSubmit = () => {
  let password1 = document.getElementById("passwordField1").value;
  let password2 = document.getElementById("passwordField2").value;
  if (
    showCommunicateAboutReq(password1) &&
    showCommunicateAboutEq(password1, password2)
  ) {
    alert("Password has been changed");
    document.getElementById("passwordForm").submit();
    // window.location.reload();
  }
};

// let checkPassword = (password1, button) => {
//   if (
//     containsCapitalCharacter(password1) &&
//     containsSpecialChars(password1) &&
//     minLen(password1) &&
//     containsDigit(password1)
//   ) {
//     button.style.backgroundColor = "yellowgreen";
//     button.disabled = false;
//   } else {
//     button.style.backgroundColor = "rgb(165, 165, 165)";
//     button.disabled = true;
//   }
// };

// document.getElementById("submitButton").disabled = true;

document.getElementById("visibleImg1").addEventListener("click", () => {
  changeVisibility(1);
});
document.getElementById("visibleImg2").addEventListener("click", () => {
  changeVisibility(2);
});

document
  .getElementById("passwordField1")
  .addEventListener("keyup", checkPassword);
document
  .getElementById("passwordField1")
  .addEventListener("keyup", arePasswordsCorrect);
document
  .getElementById("passwordField2")
  .addEventListener("keyup", arePasswordsCorrect);

// document.getElementById("submitButton").addEventListener("keypress", (e) => {
//   console.log(e)
//   // alert("Password has been changed");
//   // window.location.reload();
// });

document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    afterSubmit();
  }
});
