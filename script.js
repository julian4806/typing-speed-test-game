const container = document.querySelector("blockquote");
const $box = document.querySelector(".box");
const $search = document.getElementById("search");
const timer = document.querySelector(".timer");
const typedWords = document.querySelector(".typed-words");
const typedWordsArray = [];

let wordCount = document.querySelector(".score span");

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
    return;
  } else {
    $search.style.background = "white";
  }

  // if (searchText === text.split(" ")[0] + " ") { //Extra Space
  if (searchText === text.split(" ")[0]) {
    container.classList.add("small-pulse");
    setTimeout(() => {
      container.classList.remove("small-pulse");
    }, 100);
    wordCount.innerText++;
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
  modal.classList.remove("hide-modal");

  $search.disabled = true;

  blocked = false;
  clearInterval(kaas);

  timer.innerText = 1;

  $search.value = "";
  $search.style.background = "white";
  wordCount.innerText = 0;
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
