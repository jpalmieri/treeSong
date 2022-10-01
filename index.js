let startBtn = document.getElementById('start-btn');
let restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener("click", function () {
    restartBtn.style.opacity = 1;
})

restartBtn.addEventListener("click", function () {
    restartBtn.style.opacity = 0;
})