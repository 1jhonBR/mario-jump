const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameover = document.querySelector(".gameover");
const scoreDisplay = document.getElementById('score')

let isGameOver = false;

let score = 0;
let scoreInterval;

const jump = () => {
  if (!isGameOver) {
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
    }, 500);
  }
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
    isGameOver = true;
    clearInterval(scoreInterval);

    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./imagens/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    gameover.style.display = "block";

    clearInterval(loop);
    document.addEventListener("keydown", handleRestartGame);
  }
}, 10);

const increaseScore = () => {
  if (!isGameOver) {
    score += 1;
    scoreDisplay.textContent = score;
  }
};
scoreInterval = setInterval(increaseScore, 100);

const handleRestartGame = () => {
  if (isGameOver) {
    document.removeEventListener("keydown", handleRestartGame);
    location.reload();
  }
};

document.addEventListener("keydown", jump);
