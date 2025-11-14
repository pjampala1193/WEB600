// This array holds all the PacMen we create
const pacMen = [];

console.log('pacmen.js loaded'); // debug: script loaded

// Attach button event listeners once the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const startBtn = document.getElementById('startBtn');

  if (addBtn && startBtn) {
    addBtn.addEventListener('click', () => {
      makeOne();
      console.log('Add button clicked, PacMan count:', pacMen.length);
    });

    startBtn.addEventListener('click', () => {
      console.log('Start button clicked');
      update();
    });
  } else {
    console.error('Buttons not found in DOM');
  }
});

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: ?, y: ?}
  let velocity = setToRandom(10);   // { x: ?, y: ? }
  let position = setToRandom(200);  // starting position

  // Add image to div with id="game"
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png'; // image inside images/ folder
  newimg.width = 100;

  // set starting position
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // add new child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

// This gets called in the game loop
function update() {
  // loop over pacMen array and move each one
  pacMen.forEach((item) => {
    // check for collision with window edges
    checkCollisions(item);

    // move position by velocity
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // move image in the DOM
    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });

  // keep the game running
  setTimeout(update, 20);
}

// detect collisions and make PacMan bounce
function checkCollisions(item) {
  const imgWidth = item.newimg.width;
  const imgHeight = item.newimg.height;

  // right & left walls
  if (item.position.x + imgWidth >= window.innerWidth || item.position.x <= 0) {
    item.velocity.x = -item.velocity.x;
  }

  // bottom & top walls
  if (item.position.y + imgHeight >= window.innerHeight || item.position.y <= 0) {
    item.velocity.y = -item.velocity.y;
  }
}

// Create and store a new PacMan
function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

// don't change this line (used for automated tests)
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}