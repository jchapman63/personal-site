// initial x position
let x = 0.1;

let contRect = document
  .getElementById("about-container")
  .getBoundingClientRect();

console.log(contRect.right);

// amplitude and perioid of wave
let amp = 5;
let period = 500;

// length of particle trail
const motionTrailLength = 20;

// parent element
const para = document.getElementById("particle-parent");

//store positions and children
let positions = [];
let children = [];

// count frames and initialize velocity
let frameCount = 0;
let velocity = 1;
function update(frameCount) {
  // initialize y as a cosine function
  var y = 0 + amp * Math.cos((Math.PI * frameCount) / period);

  // accumulate x
  x += 0.5 * velocity;

  // store postions and draw postions
  storePositions(x, y);
  for (var i = 0; i < positions.length; i++) {
    var trailBall = document.createElement("span");

    // control how many elements are displayed
    if (children.length < motionTrailLength) {
      para.appendChild(trailBall);
      children.push(trailBall);
    }

    // add class and set color
    trailBall.classList.add("ball");
    trailBall.style.backgroundColor = "#f33a12";

    // move ball
    trailBall.style.setProperty("--x", positions[i].x);
    trailBall.style.setProperty("--y", positions[i].y);
  }

  // rebound
  var ballRect = trailBall.getBoundingClientRect();
  if (x >= 90 || x <= 0) {
    console.log(x + " x postion " + contRect.x + " con position");
    velocity *= -1;
  }
  // increase frame count and loop
  frameCount++;
  window.requestAnimationFrame(update);
}

//begin loop
window.requestAnimationFrame(update);

function storePositions(xPos, yPos) {
  positions.push({ x: xPos, y: yPos });

  // remove first item
  if (positions.length > motionTrailLength) {
    positions.shift();
    var remove = children.shift();
    para.removeChild(remove);
  }
}
