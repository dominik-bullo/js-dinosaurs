// DOM Elements
const myForm = document.getElementById("dino-compare");
const myName = document.getElementById("name");
const myFeet = document.getElementById("feet");
const myInches = document.getElementById("inches");
const myWeight = document.getElementById("weight");
const myDiet = document.getElementById("diet");
const submitBtn = document.getElementById("btn");
submitBtn.addEventListener("click", btnClick);
const myGrid = document.getElementById("grid");
// Global variables
let _creatures = [];
let human = { height: 0, name: "Human", species: "Human", weight: 0 };
// Selection of properties which may be displayed
const keys = ["fact", "heightInfo", "weightInfo", "dietInfo", "habitat", "era"];

// Create Dino
class Dino {
  constructor(dino) {
    (this.diet = dino.diet),
      (this.fact = dino.fact),
      (this.height = parseInt(dino.height)),
      (this.species = dino.species),
      (this.weight = parseInt(dino.weight)),
      (this.when = dino.when),
      (this.where = dino.where);
  }
  get heightInfo() {
    if (this.height > human.height) {
      return `Was on average ${
        this.height - human.height
      } inches taller than you.`;
    }
    if (this.height < human.height) {
      return `Was on average ${
        (this.height - human.height) * -1
      } inches smaller than you.`;
    } else {
      return `Was just as tall as you.`;
    }
  }

  get weightInfo() {
    if (this.weight > human.weight) {
      return `Was on average ${
        this.weight - human.weight
      } lbs heavier than you.`;
    }
    if (this.weight < human.weight) {
      return `Was on average ${
        (this.weight - human.weight) * -1
      } lbs lighter than you.`;
    } else {
      return `Was just as heavy as you.`;
    }
  }

  get dietInfo() {
    let msg = "";
    switch (this.diet) {
      case "herbavor":
        msg = "Primary food source was plant-based.";
        break;
      case "carnivor":
        msg = "Has been eating other animals.";
        break;
      case "omnivor":
        msg = "Food source was plant- and animal-derived.";
        break;
      default:
        msg = "Diet unknown.";
    }
    if (this.diet === human.diet) {
      msg += " Just like you.";
    }
    return msg;
  }

  get habitat() {
    return `Has lived in ${this.where}.`;
  }

  get era() {
    return `Has lived during ${this.when}.`;
  }
}

// Create Dino and Human Objects
(async function getDinos() {
  const res = await fetch("dino.json");
  const data = await res.json();
  data.Dinos.forEach((el) => {
    if (_creatures.length === 4) {
      _creatures.push(human);
    }
    _creatures.push(new Dino(el));
  });
})();

// Create Human Object
function completeHuman() {
  if (myName.value !== "") {
    human.name = myName.value;
  }
  if (myInches.value !== "" || myFeet.value !== "") {
    human.height = parseInt(myFeet.value * 12) + parseInt(myInches.value);
  }
  if (myWeight.value !== "") {
    human.weight = parseInt(myWeight.value);
  }
  human.diet = myDiet.value.toLowerCase();
  _creatures[4] = human;
}

// Generate Tiles for each Dino in Array and add Tiles to the DOM
function makeGrid() {
  _creatures.forEach((el) => {
    const tile = document.createElement("div");
    const name = document.createElement("h3");
    const image = document.createElement("img");
    image.src = `/images/${el.species.toLowerCase()}.png`;
    tile.appendChild(name);
    tile.appendChild(image);
    tile.classList.add("grid-item");
    if (el !== human) {
      const para = document.createElement("p");
      name.innerText = el.species;
      if (el.species !== "Pigeon") {
        const prop = keys[Math.floor(Math.random() * keys.length)];
        para.innerText = el[prop];
      } else {
        para.innerText = el.fact;
      }
      tile.appendChild(para);
    } else {
      name.innerText = human.name;
    }
    myGrid.appendChild(tile);
  });
}

// Remove form from screen
function removeForm() {
  document.body.removeChild(myForm);
}

// On button click, prepare and display infographic
function btnClick() {
  removeForm();
  completeHuman();
  makeGrid();
}
