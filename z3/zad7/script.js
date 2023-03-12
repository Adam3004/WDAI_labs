var tmpListOfCities = [];
// aby odpalić program należy wpisać w konsole: npx json-server cities.json

async function fetchCities() {
  try {
    // this response is from server
    const response = await fetch("http://localhost:3000/cities");
    // and commented one below is local but i understood that we should use serwer to get data, so i am using this which is above
    // const response = await fetch("./cities.json");
    const cities = await response.json();
    return cities;
  } catch (err) {
    console.error(err);
    console.log("Something went wrong");
  }
}

fetchCities().then((cities) => {
  const listOfCities = document.getElementById("listOfCitiesInMalopolskie");
  tmpListOfCities = cities.filter(citiesInMalopolskie);
  tmpListOfCities = tmpListOfCities.map((city) => city.name);
  listOfCities.innerText = tmpListOfCities.join(", ");
});

let citiesInMalopolskie = (city) => {
  return city.province == "małopolskie";
};

fetchCities().then((cities) => {
  const listOfCities = document.getElementById("listOfCitiesWithA");
  tmpListOfCities = cities.filter(citiesWithDoubleA);
  tmpListOfCities = tmpListOfCities.map((city) => city.name);
  listOfCities.innerText = tmpListOfCities.join(", ");
});

// I assummed that city must contains two chars 'a', not two letters "A" or "a"
let citiesWithDoubleA = (city) => {
  // second interpretation *
  //   let firstA = city.name.indexOf("A");
  //   if (firstA==-1){
  //     firstA = city.name.indexOf("a");
  //   }
  // *
  // my interpretation **
  let firstA = city.name.indexOf("a");
  // **
  // rest is the same
  if (firstA > -1) {
    if (city.name.indexOf("a", firstA + 1) > -1) {
      return true;
    }
  }
  return false;
};

fetchCities().then((cities) => {
  const textField = document.getElementById("fifthBiggestCity");
  tmpListOfCities = cities.sort(function (a, b) {
    return parseInt(b.dentensity) - parseInt(a.dentensity);
  });
  tmpListOfCities = tmpListOfCities.map((city) => city.name);
  textField.innerText = tmpListOfCities[4];
});

fetchCities().then((cities) => {
  const listOfCities = document.getElementById("biggestCities");
  tmpListOfCities = cities.filter((city) => {
    return parseInt(city.people) > 100000;
  });
  tmpListOfCities = tmpListOfCities.map((city) => {
    if (parseInt(city.people) > 100000) {
      return `${city.name} city`;
    } else {
      return city.name;
    }
  });
  listOfCities.innerText = tmpListOfCities.join(", ");
});

fetchCities().then((cities) => {
  const textField = document.getElementById("moreThanEight");
  tmpListOfCities = cities.filter((city) => {
    return parseInt(city.people) > 80000;
  });
  let moreThan = tmpListOfCities.length;
  tmpListOfCities = cities.filter((city) => {
    return parseInt(city.people) < 80000;
  });
  let lessThan = tmpListOfCities.length;
  textField.innerText = `There are ${moreThan} cities with more than 80000 people and ${lessThan} with less than that amount of people`;
});

fetchCities().then((cities) => {
  const textField = document.getElementById("avgArea");
  tmpListOfCities = cities.filter((city) => {
    return city.township[0] == "p" || city.township[0] == "P";
  });
  let sum = 0;
  for (let city of tmpListOfCities) {
    sum += parseInt(city.area);
  }
  textField.innerText = (sum / tmpListOfCities.length).toFixed(2);
});

fetchCities().then((cities) => {
  const textField = document.getElementById("citiesInPomorskie");
  tmpListOfCities = cities.filter((city) => {
    return city.province == "pomorskie";
  });
  const tmpListOfCitiesAboveFive = tmpListOfCities.filter((city) => {
    return parseInt(city.people) > 5000;
  });
  if (tmpListOfCities.length == tmpListOfCitiesAboveFive.length) {
    textField.innerText = `Whole ${tmpListOfCities.length} cities in pomorskie have more than 5000 people`;
  } else {
    textField.innerText = `${tmpListOfCitiesAboveFive.length} out of ${tmpListOfCities.length} cities in pomorskie have more than 5000 people`;
  }
});

let showAnswer = (id) => {
  let answer = document.getElementById(id);
  if (answer.style.display == "block") {
    answer.style.display = "none";
  } else {
    answer.style.display = "block";
  }
};

document.getElementById("a").addEventListener("click", () => {
  showAnswer("listOfCitiesInMalopolskie");
});
document.getElementById("b").addEventListener("click", () => {
  showAnswer("listOfCitiesWithA");
});
document.getElementById("c").addEventListener("click", () => {
  showAnswer("fifthBiggestCity");
});
document.getElementById("d").addEventListener("click", () => {
  showAnswer("biggestCities");
});
document.getElementById("e").addEventListener("click", () => {
  showAnswer("moreThanEight");
});
document.getElementById("f").addEventListener("click", () => {
  showAnswer("avgArea");
});
document.getElementById("g").addEventListener("click", () => {
  showAnswer("citiesInPomorskie");
});
