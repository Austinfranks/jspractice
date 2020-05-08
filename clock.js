//CALL A FUNCTION EVERY SECOND
setInterval(setClock, 1000);

const secHand = document.querySelector("[data-sec-hand]");
const minHand = document.querySelector("[data-min-hand]");
const hourHand = document.querySelector("[data-hour-hand]");

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  //Secondsratio allows minuteds hand to move around the clock gradually same with hours
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secHand, secondsRatio);
  setRotation(minHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

//NO JUMP IMEDIATLY GOES TO THE RIGHT TIME ON PAGE OPENING NO DELAY
setClock();
