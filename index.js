const words =
  "for if else while function return int float double char string class object array list dictionary import from def print input output true false null true false try except catch finally raise throw break continue new delete static final const let var async await promise resolve reject constructor extends implements interface public private protected static final abstract override virtual  typeof instanceof this super self module package require export global static inline constexpr typedef namespace using template friend struct union enum volatile register asm goto volatile".split(
    " "
  );

const wordsCount = words.length;

function addClass(el, name) {
  el.className += " " + name;
}
function removeClass(el, name) {
  el.className = el.className.replace(name, "");
}
function randomWord() {
  const randomIndex = Math.floor(Math.random() * wordsCount);
  return words[randomIndex];
}

function formatWord(word) {
  return `<div class="word"><span class="letter">${word
    .split("")
    .join('</span><span class="letter">')}</span></div>`;
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
  key = ev.key;
  console.log(ev.key);
  const currentLetter = document.querySelector(".letter.current");
  const currentWord = document.querySelector(".word.current");
  //and also this
  const expected = currentLetter?.innerHTML || " ";
  const isLetter = key.length === 1 && key.match(/[a-z]/i);
  const isSpace = key === " ";
  const isBackspace = key === "Backspace";
  const isFirstLetter = currentLetter === currentWord.firstChild;
  console.log({ key, expected });
  if (isLetter) {
    if (currentLetter) {
      addClass(currentLetter, key === expected ? "correct" : "incorrect");
      removeClass(currentLetter, "current");
      //need to understand this
      if (currentLetter.nextSibling) {
        addClass(currentLetter.nextSibling, "current");
      }
    } else {
      const incorrectLetter = document.createElement("span");
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = "letter incorrect extra";
      currentWord.appendChild(incorrectLetter);
    }
  }
  if (isSpace) {
    if (expected !== " ") {
      const letterToInvalidate = [
        ...document.querySelectorAll(".word.current .letter:not(.correct)"),
      ];
      letterToInvalidate.forEach((letter) => addClass(letter, "incorrect"));
    }
    removeClass(currentWord, "current");
    addClass(currentWord.nextSibling, "current");
    if (currentLetter) {
      removeClass(currentLetter, "current");
    }
    addClass(currentWord.nextSibling.firstChild, "current");
  }

  if (isBackspace) {
    if (currentLetter && isFirstLetter) {
      //make previous work current, last letter current
      removeClass(currentWord, "current");
      addClass(currentWord.previousSibling, "current");
      removeClass(currentLetter, "current");
      addClass(currentWord.previousSibling.lastChild, "current");
      removeClass(currentWord.previousSibling.lastChild, "incorrect");
      removeClass(currentWord.previousSibling.lastChild, "correct");
    }
    if (currentLetter && !isFirstLetter) {
      removeClass(currentLetter, "current");
      addClass(currentLetter.previousSibling, "current");
      removeClass(currentLetter.previousSibling, "incorrect");
      removeClass(currentLetter.previousSibling, "correct");
    }
    if (!currentLetter) {
      addClass(currentWord.lastChild, "current");
      removeClass(currentWord.lastChild, "correct");
      removeClass(currentWord.lastChild, "incorrect");
    }
  }

  //move curosr
  const nextLetter = document.querySelector(".letter.current");
  const nextWord = document.querySelector(".word.current");
  const cursor = document.getElementById("cursor");
  //refactoring the if else
  cursor.style.top =
    (nextLetter || nextWord).getBoundingClientRect().top +
    (nextLetter ? "0" : 8) +
    "px";
  cursor.style.left =
    (nextLetter || nextWord).getBoundingClientRect()[
      nextLetter ? "left" : "right"
    ] + "px";
  // if (nextLetter) {
  //   cursor.style.top = nextLetter.getBoundingClientRect().top + "px";
  //   cursor.style.left = nextLetter.getBoundingClientRect().left + "px";
  // } else {
  //   cursor.style.top = nextWord.getBoundingClientRect().top + 8 + "px";
  //   cursor.style.left = nextWord.getBoundingClientRect().right + "px";
  // }
});

newGame();
