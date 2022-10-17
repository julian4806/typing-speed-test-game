const container = document.querySelector("blockquote");
const $box = document.querySelector(".box");
const $search = document.getElementById("search");
const timer = document.querySelector(".timer");
const typedWords = document.querySelector(".typed-words");

const WPMTimer = 20;
timer.innerHTML = WPMTimer;

//results in modal
const WPM = document.querySelector(".wpm");
const finalMistakes = document.querySelector(".amount-of-mistakes");
const accuracy = document.querySelector(".accuracy");
const wordCountScoreBoard = document.querySelector(".score span");

const typedWordsArray = [];

let mistakeCount = 0;
let succesCount = 0;
let wordCount = 0;

let blocked = false;

randomWords();

$search.focus();

$search.addEventListener("input", (e) => {
  const searchText = e.target.value;
  let i = searchText.length - 1;
  // const regex = new RegExp(searchText, "g");
  if (searchText === "") return;
  const regex = new RegExp(`^${searchText}`, "g");

  let text = $box.innerText;

  // Timer
  if (blocked === false) {
    timer.classList.add("pulse");
    blocked = true;
    kaas = setInterval(setIntervalFunc, 1000);
  }

  // Marktext
  text = text.replace(/(<mark class="highlight">|<\/mark>)/gi, "");

  // Wrongletter
  if (searchText.charAt(i) !== text.charAt(i)) {
    $search.style.background = "rgb(251, 165, 165)";
    mistakeCount++;
    // console.log(`mistakeCount = ${mistakeCount}`);
    return;
  } else {
    succesCount++;
    // console.log(`succesCount = ${succesCount}`);
    $search.style.background = "white";
  }

  if (searchText === text.split(" ")[0] + " ") {
    container.classList.add("small-pulse");
    wordCount++;
    console.log(`wordCount = ${wordCount}`);
    console.log(`mistakeCount = ${mistakeCount}`);
    console.log(`succesCount = ${succesCount}`);
    setTimeout(() => {
      container.classList.remove("small-pulse");
    }, 100);
    wordCountScoreBoard.innerText = wordCount;
    typedWordsArray.push(searchText);

    typedWords.innerText += searchText + " ";
    $search.value = "";
    $box.innerText = "";
    let res = text.replace(
      new RegExp(typedWordsArray[typedWordsArray.length - 1], "g"),
      ""
    );
    $box.innerText = res;
    if (text.split(" ").length - 1 < 6) {
      $box.innerHTML +=
        " " + words[Math.floor(Math.random() * words.length + 0)];
    }

    return;
  }

  const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
  $box.innerHTML = newText;
});

function reset() {
  WPM.innerText = Math.floor(succesCount / 5 / (WPMTimer / 60)); //WPM
  finalMistakes.innerText = mistakeCount; //
  accuracy.innerText = `${Math.floor(
    100 - (mistakeCount / succesCount) * 100
  )}%`;

  modal.classList.remove("hide-modal");

  $search.disabled = true;

  blocked = false;
  clearInterval(kaas);

  timer.innerText = WPMTimer;

  $search.value = "";
  $search.style.background = "white";

  mistakeCount = 0;
  succesCount = 0;
  wordCount = 0;
  wordCountScoreBoard.innerText = 0;

  container.classList.remove("pulse");
  typedWords.innerHTML = "";

  randomWords();
}

// MODAL
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  modal.classList.toggle("hide-modal");
  $search.disabled = false;
  $search.focus();
});

function randomWords() {
  $box.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    $box.innerHTML += words[Math.floor(Math.random() * words.length + 0)] + " ";
  }
}

function setIntervalFunc() {
  if (timer.innerText <= 0) {
    reset();
    return;
  } else {
    timer.innerText--;
  }
}
