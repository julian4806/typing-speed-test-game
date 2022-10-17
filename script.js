const container = document.querySelector("blockquote");
const $box = document.querySelector(".box");
const $search = document.getElementById("search");
const timer = document.querySelector(".timer");
const typedWords = document.querySelector(".typed-words");
const typedWordsArray = [];

let wordCount = document.querySelector(".score span");

let blocked = false;

$search.focus();
for (let i = 0; i < 6; i++) {
  $box.innerHTML += words[Math.floor(Math.random() * (1000 - 0 + 1) + 0)] + " ";
}
$search.addEventListener("input", (e) => {
  const searchText = e.target.value;
  let i = searchText.length - 1;
  const regex = new RegExp(searchText, "g");
  let text = $box.innerText;

  if (blocked === false) {
    timer.classList.add("pulse");
    blocked = true;
    setInterval(() => {
      if (timer.innerText <= 0) {
        reset();
        return;
      } else {
        timer.innerText--;
      }
    }, 1000);
  }

  text = text.replace(/(<mark class="highlight">|<\/mark>)/gi, "");

  if (searchText.charAt(i) !== text.charAt(i)) {
    $search.style.background = "rgb(251, 165, 165)";
    return;
  } else {
    $search.style.background = "white";
  }

  let spaces = searchText.split(" ").length - 1;
  if (searchText.split(" ")[spaces] === text.split(" ")[spaces]) {
    container.classList.add("small-pulse");
    setTimeout(() => {
      container.classList.remove("small-pulse");
    }, 100);
    wordCount.innerText++;
    typedWordsArray.push(searchText.split(" ")[spaces]);

    typedWords.innerText += searchText.split(" ")[spaces] + " ";
    $search.value = "";
    $box.innerText = "";
    let res = text.replace(
      new RegExp(typedWordsArray[typedWordsArray.length - 1], "g"),
      " "
    );
    $box.innerText = res;
    if (text.split(" ").length - 1 < 6) {
      $box.innerHTML +=
        " " + words[Math.floor(Math.random() * (words.length - 0 + 1) + 0)];
    }

    return;
  }

  const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
  $box.innerHTML = newText;
});

function reset() {
  console.log("done");
  // alert(`wordcount = ${wordCount.innerText}`);
  // location.reload();
}
