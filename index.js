let startBtn = document.getElementById('start-btn');
let restartBtn = document.getElementById('restart-btn');

let rootsAnimating = false;

startBtn.addEventListener("click", function () {
    rootsAnimating = true;
    restartBtn.style.opacity = 1;
})

restartBtn.addEventListener("click", function () {
    restartBtn.style.opacity = 0;
})