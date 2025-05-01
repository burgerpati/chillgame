let playerX = 0;
let playerY = 0;
let moves = 0;
let inventory = [];
const creepyMessages = [
  "You feel like you've been here before...",
  "A whisper says your name, but no one’s there.",
  "The air gets colder.",
  "You hear footsteps... but you're alone.",
  "The walls seem closer than before.",
  "Something is watching."
];

const maze = {
  "0,0": {
    description: "You are in a cold, damp cell. There's a key on the floor.",
    exits: ["east", "south"],
    item: "rusty key"
  },
  "1,0": {
    description: "A long hallway. The light flickers.",
    exits: ["west", "east"],
    item: null
  },
  "2,0": {
    description: "A room with red writing on the wall: 'NO ESCAPE'.",
    exits: ["west", "south"],
    item: "strange note"
  },
  "0,1": {
    description: "You enter a dusty library. Books whisper as you pass.",
    exits: ["north", "south"],
    item: null
  },
  "1,1": {
    description: "A mirror shows your reflection... but it’s smiling.",
    exits: ["north", "south", "east", "west"],
    item: null
  },
  "2,1": {
    description: "A broken door. Something banged from the other side.",
    exits: ["north", "south", "west"],
    item: "old key"
  },
  "0,2": {
    description: "The room smells like burnt hair. You feel dizzy.",
    exits: ["north", "east"],
    item: null
  },
  "1,2": {
    description: "A bloodstained floor. You feel watched.",
    exits: ["north", "west", "east"],
    item: null
  },
  "2,2": {
    description: "A dark exit... but is it real?",
    exits: ["north", "west"],
    item: null,
    ending: true
  }
};

function getRoomKey(x, y) {
  return `${x},${y}`;
}

function updateRoom() {
  const key = getRoomKey(playerX, playerY);
  const room = maze[key];
  const desc = room ? room.description : "You hit a wall. There's nothing here.";
  document.getElementById("description").textContent = desc;

  // Handle item pickup
  if (room?.item) {
    inventory.push(room.item);
    document.getElementById("inventory").textContent = inventory.join(", ");
    room.item = null;
  }

  // Creepy messages
  moves++;
  if (moves % 3 === 0) {
    const msg = creepyMessages[Math.floor(Math.random() * creepyMessages.length)];
    document.getElementById("creepy-message").textContent = msg;
  } else {
    document.getElementById("creepy-message").textContent = "";
  }

  // Endgame
  if (room?.ending && inventory.includes("rusty key") && inventory.includes("old key")) {
    document.getElementById("description").textContent =
      "You unlock the final door with both keys... and step into darkness. You escaped?";
    document.getElementById("controls").innerHTML =
      "<button onclick='location.reload()'>Play Again</button>";
  }
}

function move(dir) {
  const key = getRoomKey(playerX, playerY);
  const room = maze[key];
  if (!room || !room.exits.includes(dir)) {
    document.getElementById("creepy-message").textContent = "You can't go that way.";
    return;
  }

  switch (dir) {
    case "north":
      playerY--;
      break;
    case "south":
      playerY++;
      break;
    case "east":
      playerX++;
      break;
    case "west":
      playerX--;
      break;
  }

  updateRoom();
}

// Start game
updateRoom();
