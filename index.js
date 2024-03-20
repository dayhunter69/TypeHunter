console.log("Hello world");

const words =
  "for if else while function return int float double char string class object array list dictionary import from def print input output true false null true false try except catch finally raise throw break continue new delete static final const let var async await promise resolve reject constructor extends implements interface public private protected static final abstract override virtual static_cast dynamic_cast typeof instanceof this super self module package require export global static inline constexpr typedef namespace using template friend struct union enum volatile register asm goto volatile".split(
    " "
  );

const wordsCount = words.length;

function addClass(el, name) {
  el.className += " " + name;
}
function removeClass(el, name) {
  el.className += el.className.replace(name, "");
}
function randomWord() {
  const randomIndex = Math.floor(Math.random() * wordsCount);
  return words[randomIndex];
}

function formatWord(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</div></span>`;
}
function newGame() {
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < 100; i++) {
    document.getElementById("words").innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
}

document.getElementById("game").addEventListener("keyup", (ev) => {
  console.log(ev.key);
});

newGame();
