let hasKey = false;

function searchRoom() {
  document.getElementById("game-text").textContent = "You found a rusty key on the floor.";
  hasKey = true;
}

function openDoor() {
  if (hasKey) {
    document.getElementById("game-text").textContent = "You unlocked the door and escaped!";
  } else {
    document.getElementById("game-text").textContent = "The door is locked. You need a key!";
  }
}
