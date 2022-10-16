const $box = document.getElementById("box");
const $search = document.getElementById("search");
const timer = document.querySelector(".timer");
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
    wordCount.innerText++;
    console.log(wordCount.innerText);
  }

  const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
  $box.innerHTML = newText;

  if (searchText === text) {
    $box.innerHTML = "";
    $search.value = "";
    for (let i = 0; i < 6; i++) {
      $box.innerHTML +=
        words[Math.floor(Math.random() * (1000 - 0 + 1) + 0)] + " ";
    }
  }
});

function reset() {
  alert(`wordcount = ${wordCount.innerText}`);
  location.reload();
}
