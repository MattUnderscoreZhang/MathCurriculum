// default values – will be overridden by caller
const DEFAULTS = {
  totalQuestions : 30,
  targetTime : 60,
  aDigits : 2,
  bDigits : 2
};

export function start(opts = {}) {
    // merge caller options
    const cfg = { ...DEFAULTS, ...opts };

    // page elements
    const problem = document.getElementById("problem");
    const answerBox = document.getElementById("answer");
    const correctCountDisplay = document.getElementById("nCorrect");
    const startButton = document.getElementById("startButton");
    const timer = document.getElementById("timer");
    const endMessage = document.getElementById("endMessage");

    // state
    let a, b;  // numbers to add
    let correctCount = 0;
    let gameStarted = false;
    let startTime;
    let timerId;

    // start button
    startButton.addEventListener("click", startGame);
    function startGame() {
        startTime = Date.now();
        timerId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            timer.textContent = elapsed;
        }, 1000);
        document.getElementById("timerDisplay").style.display = "block";
        document.getElementById("problemCountDisplay").style.display = "block";
        answerBox.focus();
    }

    // display new problem
    function getRandInt(nDigits) {
        let result = 0;
        for (let i = 0; i < nDigits; i++) {
            result *= 10;
            if (result === 0) {
                result += Math.floor(Math.random() * 9 + 1);
            } else {
                result += Math.floor(Math.random() * 10);
            }
        }
        return result;
    }
    function displayNewProblem(nDigits1, nDigits2) {
        a = getRandInt(nDigits1);
        b = getRandInt(nDigits2);
        problem.textContent = `${a} + ${b} =`;
        answerBox.value = '';
        answerBox.focus();
    }

    // check answer
    answerBox.addEventListener(
        "keydown",
        e => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (checkAnswer()) {
                    correctCount++;
                    correctCountDisplay.textContent = correctCount;
                    if (correctCount === cfg.totalQuestions) {
                        endGame();
                    }
                    displayNewProblem(cfg.aDigits, cfg.bDigits);
                } else {
                    answerBox.value = "";
                    answerBox.focus();
                }
            }
        }
    )
    function checkAnswer() {
        const answer = Number(answerBox.value);
        return answer === a + b;
    }

    // end game
    function endGame() {
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        clearInterval(timerId);
        endMessage.style.display = "block";
        if (elapsed <= cfg.targetTime) {
            endMessage.textContent = "You Win!";
        } else {
            endMessage.textContent = "Not Fast Enough!";
        }
    }

    // initialization
    document.getElementById("totalProblems").textContent = cfg.totalQuestions;
    document.getElementById("targetTime").textContent = cfg.targetTime;
    displayNewProblem(cfg.aDigits, cfg.bDigits);
}
