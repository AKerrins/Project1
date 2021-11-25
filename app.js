function init() {
  const grid = document.querySelector(".grid");
  const restart = document.querySelector("#restart-button");
  //const computerScoreSpan = document.querySelector("#alieninvaders-score");
  const resultsDisplay = document.querySelector("#your-score");
  let results = 0;
  const cells = [];
  const width = 10;
  const cellCount = width * width;
  let megPosition = 95;
  let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  //let displayScore = document.getElementById("display_score");
  let direction = 1;
  let movingRight = true;
  const aliensRemoved = [];
  //displayScore.innerText = 0;
  // scoreCount = 0;

  //add shooter

  function addMeg(position) {
    cells[position].classList.add("meg");
  }

  //remove shooter

  function removeMeg(position) {
    console.log("removing meg", position);
    cells[position].classList.remove("meg");
  }

  //remove laser
  function removeLaser(position) {
    console.log("remove laser", position);
    cells[position].classList.remove("laser");
  }

  //using a for loop to create the grid
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      cell.textContent = i;
      grid.appendChild(cell);
      cells.push(cell);
    }

    addMeg(startingPosition);
  }
  createGrid(megPosition);

  // this adds aliens using an eventlistener for key down, and it moves them
  // have to figure out to move without event listent for key down -- timeout?
  function addAliens() {
    for (let i = 0; i < alienInvaders.length; i++) {
      if (!aliensRemoved.includes(i)) {
        cells[alienInvaders[i]].classList.add("invader");
        // console.log("adding alien at" + alienInvaders[i]);
      }
      // cells[i].classList.add("invader");
    }
  }
  addAliens();

  function removeAliens() {
    for (let i = 0; i < alienInvaders.length; i++) {
      cells[alienInvaders[i]].classList.remove("invader");
    }
    //removeAliens();
  }
  removeAliens();

  //function to make the shooter move
  function handleMoveMeg(event) {
    // remove meg
    removeMeg(megPosition);
    const x = megPosition % width;
    const y = Math.floor(megPosition / width);
    console.log(event.keyCode);

    switch (event.keyCode) {
      case 37: //moving  left
        if (x > 0) megPosition--;
        break;
      // case 38:
      //   if (y > 0) megPosition -= width;
      //   break;
      case 39: // moving right
        if (x < width - 1) megPosition++;
        break;
      // case 40:
      //   if (y < width - 1) megPosition += width;
      //   break;
      default:
        console.log("You can not move Meg like that!");
    }
    addMeg(megPosition);
  }

  // adding a laser
  function addLaser(position) {
    console.log("add laser", position);
    cells[position].classList.add("laser");
  }

  function detectAlienLaserCollision(laserPosition) {
    // find index of laser position
    const deleteAlien = alienInvaders.indexOf(laserPosition);
    if (deleteAlien > -1) {
      /// -1 didnt find laser position,
      alienInvaders.splice(deleteAlien, 1);
    }

    function updateScore() {
      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultsDisplay.innerHTML = results;
      console.log(aliensRemoved);
    }

    updateScore();
  }

  let laserPositions = [];
  //shooting the laser.
  function shootLaser(event) {
    if (event.keyCode === 32) {
      const newLaser = megPosition - 10;
      laserPositions.push(newLaser);
      //console.log("New laser position", newLaser);
      addLaser(newLaser);
    }
    //moving the shooter
    setInterval(() => {
      // removing each laser from the grid
      laserPositions.forEach((laserPostion) =>
        cells[laserPostion].classList.remove("laser")
      );
      //for each laser map the laser to 10 squares before, filter/stopping movement at 0
      laserPositions = laserPositions
        .map((laserPostion) => laserPostion - 10)
        .filter((laserPostion) => laserPostion >= 0);
      //adding the laser to each cell.
      laserPositions.forEach((laserPostion) => {
        cells[laserPostion].classList.add("laser");
        detectAlienLaserCollision(laserPostion);
      });
      //run set interval every 500seconds
    }, 500);
  }

  function handleMoveAlienInvaders() {
    const isTouchingLeftEdge = alienInvaders[0] % width === 0;
    const isTouchingRightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;
    removeAliens();
    console.log({
      isTouchingRightEdge,
      isTouchingLeftEdge,
      width,
      alienInvaders,
    });

    if (isTouchingRightEdge && movingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width;
        direction = -1;
        movingRight = false;
      }
    } else if (isTouchingLeftEdge && !movingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width;
        direction = 1;
        movingRight = true;
      }
    } else {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
      }
    }
    addAliens();

    // if shooter cells contains alienInvader
    if (cells[megPosition].classList.contains("invader", "shooter")) {
      resultsDisplay.innerHTML = "Game Over";
      clearInterval();
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > cells.length) {
        resultsDisplay.innerHTML = "Game Over";
        clearInterval();
      }

      if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = "YOU WIN";
        clearInterval();
      }
    }
  }
  setInterval(handleMoveAlienInvaders, 600);

  document.addEventListener("keyup", handleMoveMeg);
  document.addEventListener("keydown", shootLaser);
}
document.addEventListener("DOMContentLoaded", init);
