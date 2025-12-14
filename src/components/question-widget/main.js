export function initComponent(getNewQuestion, totalQuestions, targetTime) {
    // page elements
    const question = document.getElementById('question');
    const answerBox = document.getElementById('answer');
    const countDisplay = document.getElementById('count');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const timerBarFill = document.getElementById('timer-bar-fill');

    // state
    let gameStarted = false;
    let inputDisabled = false;
    let correctCount = 0;
    let startTime;
    let timerId;
    let currentAnswer = null;

    function resetGame() {
        gameStarted = false;
        inputDisabled = false;
        correctCount = 0;
        question.innerHTML = 'Press Enter';
        question.style.textAlign = 'center';
        answerBox.textContent = '';
        answerBox.focus();
    }

    function startGame() {
        gameStarted = true;
        inputDisabled = false;
        correctCount = 0;
        startTime = Date.now();
        const tickInterval = 100;
        timerId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed > targetTime * 1000) {  // allow one tick over as a grace period
                endGame(false);
            }
            timerBarFill.style.width = elapsed / (targetTime * 10) + '%';
        }, tickInterval);
        displayNewQuestion();
    }

    function displayNewQuestion() {
        let newQuestion = getNewQuestion();
        question.innerHTML = newQuestion['question'];
        question.style.textAlign = 'right';
        currentAnswer = newQuestion['answer'];
        answerBox.value = '';
        answerBox.focus();
    }

    function flashAnswerBox(color) {
        answerBox.animate(
            [
                { backgroundColor: color },
                { backgroundColor: 'var(--color-light)' }
            ],
            { duration: 300, fill: 'forwards' }
        );
    }

    // check answer
    answerBox.addEventListener(
        'keydown',
        e => {
            if (e.key === 'Enter' && !inputDisabled) {
                e.preventDefault();
                if (!gameStarted) {
                    startGame();
                } else if (currentAnswer === Number(answerBox.value)) {
                    flashAnswerBox('green');
                    correctCount++;
                    progressBarFill.style.width = correctCount / totalQuestions * 100 + '%';
                    countDisplay.textContent = correctCount;
                    if (correctCount === totalQuestions) {
                        endGame(true);
                    } else {
                        displayNewQuestion();
                    }
                } else {
                    flashAnswerBox('red');
                    answerBox.value = '';
                    answerBox.focus();
                }
            }
        }
    )

    function endGame(win) {
        gameStarted = false;
        inputDisabled = true;
        clearInterval(timerId);
        if (win) {
            question.textContent = 'You Did It!';
        } else {
            question.textContent = 'Too Slow!';
            setTimeout(resetGame, 3000);
        }
        question.style.textAlign = 'center';
    }

    // initialization
    document.getElementById('total-questions').textContent = totalQuestions;
    resetGame();
}
