let xp;
let health;
let gold;
let currentWeapon;
let fighting;
let monsterHealth;
let inventory;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const weaponNameText = document.querySelector("#weaponNameText");
const weaponPowerText = document.querySelector("#weaponPowerText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You entered the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["go to town square", "go to town square", "go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [initialState, initialState, initialState],
    text: "You die. 💀"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [initialState, initialState, initialState],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
  },
  {
    name: "easter egg",
    "button text": ["2?", "8?", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// intialize stats
initialState();

function initialState() {
  // initialize buttons
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;

  // initialize weapon
  weaponNameText.innerText = weapons[0].name;
  weaponPowerText.innerText = weapons[0].power;
  xp = 0
  health = 100
  gold = 50
  currentWeapon = 0;
  inventory = ["stick"];
  update_stats();
  goTown();
}

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  document.querySelector("#monsterStats").style.display = "None"
} 

function update_stats() {
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  weaponNameText.innerText = weapons[currentWeapon].name;
  weaponPowerText.innerText = weapons[currentWeapon].power;
}

function update_monster_stats() {
  monsterNameText.innerText = monsterName;
  monsterHealthText.innerText = monsterHealth;
}

function goTown() {
   update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10)
  {
    gold -= 10;
    health += 10;
    update_stats();
  }
  else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < (weapons.length - 1))
  {
    if (gold >= 30)
    {
      gold -= 30;
      currentWeapon++;
      update_stats();
      text.innerText = "You now have a " + weapons[currentWeapon].name + "."
      inventory.push(weapons[currentWeapon].name);
      text.innerText += " In your inventory you have: " + inventory;
    }
    else {
      text.innerText = "You do not have enough gold to buy weapon.";
    }
  }
  else {
    text.innerText = "You already have the best weapon.";
    button2.innerText = "Sell weapon for 15 gold."
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  console.log("wasssss");
  if (inventory.length > 1)
  {
    gold += 15;
    update_stats();
    let currentWeapon;
    currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  }
  else
  {
    text.innerText = "Dont sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterName = monsters[fighting].name;
  update_monster_stats();
  monsterStats.style.display = "block";
}

function attack() {
  text.innerText = "The " + monsterName + " attacks!";
  text.innerText += " You attack it with your " + inventory[(inventory.length - 1)] + "."
  if (isMonsterHit() || health < 20) {
    health -= getMonsterAttackDmg(monsters[fighting].level);
  } else {
    text.innerText = "The monster missed.";
  }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  update_stats();
  update_monster_stats();
  if (health <= 0) {
    lose();
  } 
  else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() > 0.85) {
    weaponBreaks();
  }
}

function getMonsterAttackDmg(level) {
  console.log("level: "+ level);
  console.log("xp: "+ xp);
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit;
}

function weaponBreaks() {
  if (currentWeapon > 0) { 
    text.innerText += "Your weapon " + inventory.pop() + " breaks.";
    currentWeapon--;
    update_stats();
  }
}

function dodge() {
  text.innerText = "You dodged the attack from " + monsterName + ".";
}

function defeatMonster() {
  text.innerText = "You smashed the monster!";
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  update_stats();
  update(locations[4]);
}

function winGame() {
  update(locations[6]);
}

function lose() {
  text.innerText = "You are dead!";
  update(locations[5]);
}

function isMonsterHit() {
  return Math.random() < 0.8;
}

function easterEgg() {
  update(locations[7]);
}

function pick(number) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + number + ".";
  text.innerText += "Here are the random numbers:\n";

  for (i = 0; i < numbers.length - 1; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.find(element => element === number) !== "undefined") {
    text.innerText += "You guessed correctly. You win the game and 20 gold!";
    gold += 20;
  }
  else {
    text.innerText += "You guessed wrong. You lose the game and 10 health.";
    health -= 10;
    if (health <= 0) {
      lose();
    } 
  }
  update_stats();
  button1.onclick = goTown;
  button2.onclick = goTown;
  button3.onclick = goTown;
  button1.innerText = "Go to town square";
  button2.innerText = "Go to town square";
  button3.innerText = "Go to town square";
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}