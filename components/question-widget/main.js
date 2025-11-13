export function initComponent(getNewQuestion, totalQuestions, targetTime) {
    // page elements
    const question = document.getElementById("question");
    const answerBox = document.getElementById("answer");
    const correctCountDisplay = document.getElementById("nCorrect");
    const startButton = document.getElementById("startButton");
    const timer = document.getElementById("timer");
    const endMessage = document.getElementById("endMessage");

    // state
    let correctCount = 0;
    let startTime;
    let timerId;
    let currentAnswer = null;

    // start button
    startButton.addEventListener("click", startGame);
    function startGame() {
        startTime = Date.now();
        timerId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            timer.textContent = elapsed;
        }, 1000);
        document.getElementById("timerDisplay").style.display = "block";
        document.getElementById("questionCount").style.display = "block";
        answerBox.focus();
    }

    // display new question
    function displayNewQuestion() {
        let newQuestion = getNewQuestion();
        question.innerHTML = newQuestion["question"];
        currentAnswer = newQuestion["answer"];
        answerBox.value = '';
        answerBox.focus();
    }

    // check answer
    answerBox.addEventListener(
        "keydown",
        e => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (currentAnswer === Number(answerBox.value)) {
                    correctCount++;
                    correctCountDisplay.textContent = correctCount;
                    if (correctCount === totalQuestions) {
                        endGame();
                    }
                    displayNewQuestion();
                } else {
                    answerBox.value = "";
                    answerBox.focus();
                }
            }
        }
    )

    // end game
    function endGame() {
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        clearInterval(timerId);
        endMessage.style.display = "block";
        if (elapsed <= targetTime) {
            endMessage.textContent = "You Win!";
        } else {
            endMessage.textContent = "Not Fast Enough!";
        }
    }

    // initialization
    document.getElementById("totalQuestions").textContent = totalQuestions;
    document.getElementById("targetTime").textContent = targetTime;
    displayNewQuestion();
}
