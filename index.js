let startBtn = document.getElementById('start-btn');
let restartBtn = document.getElementById('restart-btn');

let rootsAnimating = false;
let restart = false;

startBtn.addEventListener("click", function () {
    rootsAnimating = true;
    restartBtn.style.opacity = 1;
})

restartBtn.addEventListener("click", function () {
    restart = true;
    rootsAnimating = false;
    restartBtn.style.opacity = 0;
})