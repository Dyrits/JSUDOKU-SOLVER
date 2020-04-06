const area = document.body;
const circles = document.querySelectorAll(".circle");
const circleMain = document.querySelector("#circleMain")
const circleRed = document.querySelector("#circleRed")
const circleGreen = document.querySelector("#circleGreen")
const circleBlue = document.querySelector("#circleBlue")  

const variationIndex = 4;
const speedInterval = 200;

let firstRGBValue = 50;
let secondRGBValue = 125;
let thirdRGBValue = 200;
let variationRGB = [];


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function modifyRandomRGB () {
  variationRGB = [-(getRandomIntInclusive(1, variationIndex)), 0, (getRandomIntInclusive(1, variationIndex))]
  if (firstRGBValue < variationIndex) { firstRGBValue += variationRGB[2]; }
  else if (firstRGBValue > 255 - variationIndex) { firstRGBValue += variationRGB[0]; }
  else { firstRGBValue += variationRGB[Math.floor(Math.random() * variationRGB.length)]; }

  variationRGB = [-(getRandomIntInclusive(1, variationIndex)), 0, (getRandomIntInclusive(1, variationIndex))]
  if (secondRGBValue < variationIndex) { secondRGBValue += variationRGB[2]; }
  else if (secondRGBValue > 255 - variationIndex) { secondRGBValue += variationRGB[0]; }
  else { secondRGBValue += variationRGB[Math.floor(Math.random() * variationRGB.length)]; }

  variationRGB = [-(getRandomIntInclusive(1, variationIndex)), 0, (getRandomIntInclusive(1, variationIndex))]
  if (thirdRGBValue < variationIndex) { thirdRGBValue += variationRGB[2]; }
  else if (thirdRGBValue > 255 - variationIndex) { thirdRGBValue += variationRGB[0]; }
  else { thirdRGBValue += variationRGB[Math.floor(Math.random() * variationRGB.length)]; }
}

function mouseCoordinates(mouse) {
    var horizontalPosition = mouse.clientX - 25;
    var verticalPosition= mouse.clientY - 25;

    for(index = 0; index < circles.length; index ++) {
      circles[index].style.left = horizontalPosition + 'px';
      circles[index].style.top = verticalPosition + 'px';
    }
}

function modifyEnvironment() {
  modifyRandomRGB()
  area.style.backgroundColor = "rgb(" + firstRGBValue + ", " + secondRGBValue + ", " + thirdRGBValue + ")";
  circleMain.style.backgroundColor = "rgb(" + (255 - firstRGBValue) + ", " + (255 - secondRGBValue) + ", " + (255 - thirdRGBValue) + ")";
  // The width and height of each circle are proportional to the degree of red, blue, or green in the body background.
  circleRed.style.width = firstRGBValue + "px";
  circleRed.style.height = firstRGBValue + "px";
  circleRed.style.zIndex = 255 - firstRGBValue;
  circleGreen.style.width = secondRGBValue + "px";
  circleGreen.style.height = secondRGBValue + "px";
  circleGreen.style.zIndex = 255- secondRGBValue;
  circleBlue.style.width = thirdRGBValue + "px";
  circleBlue.style.height = thirdRGBValue + "px";
  circleBlue.style.zIndex = 255 - thirdRGBValue;
}

area.addEventListener('mousemove', mouseCoordinates, false);

setInterval(modifyEnvironment, speedInterval)

