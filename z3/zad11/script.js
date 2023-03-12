const URL = "https://restcountries.com/v3.1/all";
const COUNTRIES = new Map();
const SHOWED = [];
const SET_OF_SUBREGIONS = new Set();
var orderList = {
  name: true,
  capital: true,
  population: true,
  area: true,
};
var recentSort;
var index = 0;

async function fetchData() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

fetchData().then((data) => {
  createTable(data);
});

let createTable = (data) => {
  createSet(data);
  createMap(data);

  let table = document.getElementById("tbody");

  let rowIndex = 1;
  for (let currData of COUNTRIES) {
    let row = document.createElement("tr");
    row.setAttribute("id", `row${rowIndex}`);
    row.setAttribute("class", `subregionRow`);
    row.appendChild(createTableRowElement(currData[0]));
    row.appendChild(createTableRowElement(""));
    row.appendChild(createTableRowElement(countPopulation(currData[1])));
    row.appendChild(createTableRowElement(countArea(currData[1])));
    rowIndex += 1;
    index = SET_OF_SUBREGIONS.size;
    for (let country of currData[1]) {
      let row2 = document.createElement("tr");
      row2.setAttribute("class", "countryRow");
      row2.setAttribute("id", `row${index}`);
      row2.appendChild(createTableRowElement(country.name));
      row2.appendChild(createTableRowElement(country.capital));
      row2.appendChild(createTableRowElement(country.population));
      row2.appendChild(createTableRowElement(country.area));
      row.appendChild(row2);
      index += 1;
    }
    row.addEventListener("click", () => {
      showOrHideChildern(row, parseInt(row.id.split("row")[1]));
    });
    table.appendChild(row);
  }
};

let createSet = (data) => {
  for (let currData of data) {
    if (
      typeof currData != "undefined" &&
      typeof currData.subregion != "undefined"
    ) {
      SET_OF_SUBREGIONS.add(currData.subregion);
    }
  }
  SET_OF_SUBREGIONS.delete("undefined");
  return SET_OF_SUBREGIONS;
};

let createMap = (data) => {
  for (let subregion of SET_OF_SUBREGIONS) {
    COUNTRIES.set(subregion, []);
    SHOWED.push(false);
  }
  for (let currData of data) {
    if (
      typeof currData != "undefined" &&
      typeof currData.subregion != "undefined"
    ) {
      COUNTRIES.get(currData.subregion).push({
        name: currData.name.official,
        capital: currData.capital,
        population: currData.population,
        area: currData.area,
      });
    }
  }
};

let countPopulation = (data) => {
  let counter = 0;
  for (let country of data) {
    counter += country.population;
  }
  return counter;
};

let countArea = (data) => {
  let counter = 0;
  for (let country of data) {
    counter += country.area;
  }
  return counter;
};

let showOrHideChildern = (row, rowIndex) => {
  let children = row.children;
  if (children.length > 4) {
    if (!SHOWED[rowIndex]) {
      for (let i = 4; i < children.length; i++) {
        children[i].style.display = "table-row";
      }
    } else {
      for (let i = 4; i < children.length; i++) {
        children[i].style.display = "none";
      }
    }
    SHOWED[rowIndex] = !SHOWED[rowIndex];
  }
};

let createTableRowElement = (data) => {
  let column = document.createElement("td");
  column.innerText = data;
  column.setAttribute("class", "tableRowElement");
  return column;
};

let rebuildTable = () => {
  let table = document.getElementById("tbody");
  let children = table.children;

  for (let i = 1; i < children.length; i++) {
    let currList = COUNTRIES.get(children[i].firstChild.innerText);
    let currCountries = filterCountries(
      findCurrVal("name"),
      findCurrVal("capital"),
      findCurrVal("population"),
      findCurrVal("area"),
      currList
    );
    sortCountries(currCountries);
    removeChildren(children, i);
    for (let country of currCountries) {
      let row2 = document.createElement("tr");
      row2.setAttribute("class", "countryRow");
      if (SHOWED[i]) {
        row2.style.display = "table-row";
      }
      row2.setAttribute("id", `row${index}`);
      row2.appendChild(createTableRowElement(country.name));
      row2.appendChild(createTableRowElement(country.capital));
      row2.appendChild(createTableRowElement(country.population));
      row2.appendChild(createTableRowElement(country.area));
      children[i].appendChild(row2);
      index += 1;
    }
  }
};

let removeChildren = (children, i) => {
  let len = children[i].children.length;
  for (let j = 4; j < len; j++) {
    children[i].removeChild(children[i].children[4]);
  }
};

let sortCountries = (currCountries) => {
  switch (recentSort) {
    case "name":
      if (orderList.name) {
        currCountries.sort((x, y) => (x.name > y.name ? 1 : -1));
      } else {
        currCountries.sort((x, y) => (x.name < y.name ? 1 : -1));
      }
      break;
    case "capital":
      if (orderList.capital) {
        currCountries.sort((x, y) => (x.capital > y.capital ? 1 : -1));
      } else {
        currCountries.sort((x, y) => (x.capital < y.capital ? 1 : -1));
      }
      break;
    case "population":
      if (orderList.population) {
        currCountries.sort((x, y) => (x.population > y.population ? 1 : -1));
      } else {
        currCountries.sort((x, y) => (x.population < y.population ? 1 : -1));
      }
      break;
    case "area":
      if (orderList.area) {
        currCountries.sort((x, y) => (x.area > y.area ? 1 : -1));
      } else {
        currCountries.sort((x, y) => (x.area < y.area ? 1 : -1));
      }
      break;
  }
};

let filterCountries = (name, capital, population, area, countries) => {
  let currCountries = [];
  for (let country of countries) {
    if (
      country.capital != undefined &&
      country.name.toLowerCase().includes(name.toLowerCase()) &&
      country.capital[0].toLowerCase().includes(capital.toLowerCase()) &&
      country.population.toString().includes(population.toString()) &&
      country.area.toString().includes(area.toString())
    ) {
      currCountries.push(country);
    }
  }
  return currCountries;
};

let findCurrVal = (val) => {
  return document.getElementById(`${val}Input`).value;
};

let addListenerToButtons = () => {
  let collection = document.getElementsByClassName("orderButton");
  for (let elem of collection) {
    elem.addEventListener("click", sortTable);
  }
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`page${i}`).addEventListener("click", () => {
      showPage(i - 1);
    });
  }
};

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let sortTable = (e) => {
  let button = e.path[0];
  let check;
  if (button.id.includes("name")) {
    check = orderList.name;
    orderList.name = !orderList.name;
    recentSort = "name";
  } else if (button.id.includes("capital")) {
    check = orderList.capital;
    orderList.capital = !orderList.capital;
    recentSort = "capital";
  } else if (button.id.includes("population")) {
    check = orderList.population;
    orderList.population = !orderList.population;
    recentSort = "population";
  } else if (button.id.includes("area")) {
    check = orderList.area;
    orderList.area = !orderList.area;
    recentSort = "area";
  }
  changeIcon(button, check);
  rebuildTable();
};

let changeIcon = (button, check) => {
  if (check) {
    button.setAttribute(
      "src",
      "https://img.icons8.com/material-rounded/96/null/up-squared.png"
    );
  } else {
    button.setAttribute(
      "src",
      "https://img.icons8.com/material-rounded/96/null/down-squared.png"
    );
  }
};

let showPage = (numberOfPage) => {
  let subregions = document.getElementsByClassName("subregionRow");
  for (let i = 0; i < subregions.length; i++) {
    if (i >= numberOfPage * 5 && i < numberOfPage * 5 + 5) {
      subregions[i].style.display = "block";
    } else {
      subregions[i].style.display = "none";
    }
  }
};

document.getElementById("nameInput").addEventListener("keyup", rebuildTable);
document.getElementById("capitalInput").addEventListener("keyup", rebuildTable);
document
  .getElementById("populationInput")
  .addEventListener("keyup", rebuildTable);
document.getElementById("areaInput").addEventListener("keyup", rebuildTable);
addListenerToButtons();
delay(50).then(() => {
  showPage(0);
});
