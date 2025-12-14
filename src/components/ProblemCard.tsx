import { useState, useRef, useEffect, CSSProperties } from 'react';

const width: number = 84;

function Question(props: {
    question: string;
    questionAlignment: CSSProperties['textAlign'];
}) {
    return (
        <p
            style={{
                width: width,
                fontSize: 16,
                fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
                fontWeight: 'bold',
                padding: '0 2px',
                textAlign: props.questionAlignment,
            }}
        >
            {props.question}
        </p>
    );
}

export type ProblemProps = {
    getNewProblem: () => {
        question: string;
        answer: number;
    };
    totalProblems: number;
    targetTime: number;
}
export function ProblemCard(props: ProblemProps) {
    const [question, setQuestion] = useState("Push Enter");
    const [questionAlignment, setQuestionAlignment] = useState("center");

    const answerInputRef = useRef<HTMLInputElement>(null)
    const problemCountDisplayRef = useRef<HTMLDivElement>(null)

    const [gameStarted, setGameStarted] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState<null | number>(null)
    const [timerPct, setTimerPct] = useState(0)

    // helper functions
    function flash(color: string) {
        answerInputRef.current!.animate(
            [{ backgroundColor: color }, { backgroundColor: 'var(--color-light)' }],
            { duration: 300, fill: 'forwards' }
        )
    }
    function displayNewProblem() {
        const q = props.getNewProblem()
        setQuestion(q.question)
        setQuestionAlignment('right')
        setCurrentAnswer(q.answer)
        answerInputRef.current!.value = ''
        answerInputRef.current!.focus()
    }
    function startGame() {
        setGameStarted(true)
        setInputDisabled(false)
        setCorrectCount(0)
        setTimerPct(0)
        displayNewProblem()
    }
    function endGame(win: boolean) {
        setGameStarted(false)
        setInputDisabled(true)
        setQuestion(win ? 'You Did It!' : 'Too Slow!');
        setQuestionAlignment('center')
        if (!win) setTimeout(resetGame, 3000)
    }
    function resetGame() {
        setGameStarted(false)
        setInputDisabled(false)
        setCorrectCount(0)
        setTimerPct(0)
        setQuestion('Press Enter');
        setQuestionAlignment('center')
        answerInputRef.current!.value = ''
        answerInputRef.current!.focus()
    }

    // auto-focus on start
    useEffect(() => {
        answerInputRef.current?.focus()
    }, [])

    // start timer
    useEffect(() => {
        if (!gameStarted) return
        const tickInterval = 100
        const start = Date.now()
        const id = setInterval(() => {
            const elapsedMs = Date.now() - start
            const pct = Math.min(100, elapsedMs / (props.targetTime * 10))
            setTimerPct(pct)
            if (elapsedMs > props.targetTime * 1000) {
                endGame(false)
            }
        }, tickInterval)
        return () => clearInterval(id)
    }, [gameStarted, props.targetTime])

    // keyboard input handling
    useEffect(() => {
        const keyboardHandler = (e: KeyboardEvent) => {
            if (e.key !== 'Enter' || inputDisabled) return
            e.preventDefault()
            if (!gameStarted) {
                startGame()
            } else if (Number(answerInputRef.current!.value) === currentAnswer) {
                flash('green')
                const next = correctCount + 1
                setCorrectCount(next)
                if (next === props.totalProblems)
                    endGame(true)
                else
                    displayNewProblem()
            } else {
                flash('red')
                answerInputRef.current!.value = ''
            }
        }
        window.addEventListener('keydown', keyboardHandler)
        return () => window.removeEventListener('keydown', keyboardHandler)
    }, [gameStarted, inputDisabled, currentAnswer, correctCount, props.totalProblems])

    // component JSX
    return (
        <div
            style={{
                /* size and shape */
                position: 'relative',
                width: 300,
                height: 420,
                borderRadius: 12,
                /* centering */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                /* color */
                color: 'var(--color-dark)',
                background: 'var(--color-card)',
                boxShadow: '0 2px 8px var(--color-dark)',
                /* font */
                fontSize: 16,
                fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
            }}
        >
            {/* question */}
            <Question
                question={question}
                questionAlignment={questionAlignment as CSSProperties['textAlign']}
            />

            {/* answer */}
            <input
                ref={answerInputRef}
                style={{
                    width: width,
                    fontSize: 16,
                    fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
                    fontWeight: 'bold',
                    backgroundColor: 'var(--color-light)',
                    marginTop: 2,
                    marginBottom: 16,
                    textAlign: 'right',
                }}
                type="number"
                autoComplete="off"
                onInput={e => {
                    const t = e.currentTarget;
                    if (t.value.length > 8)
                        t.value = t.value.slice(0, 8)
                }}
            />

            {/* problem count */}
            <div
                ref={problemCountDisplayRef}
                style={{
                    width: width,
                    fontSize: 16,
                    fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
                    fontWeight: 'bold',
                    padding: '0 2px',
                    textAlign: 'center',
                }}
            >
                <span>{correctCount}</span>/<span>{props.totalProblems}</span>
            </div>

            {/* progress bar */}
            <div
                style={{
                    height: 4,
                    borderRadius: 4,
                    width: width,
                    position: 'relative',
                    background: 'var(--color-bg)',
                    marginBottom: 4,
                }}
            >
                <div
                    style={{
                        height: 4,
                        borderRadius: 4,
                        position: 'absolute',
                        border: '1 solid var(--color-bg)',
                        background: 'var(--color-glow)',
                        width: `${(correctCount / props.totalProblems) * 100}%`,
                    }}
                />
            </div>

            {/* timer bar */}
            <div
                style={{
                    height: 4,
                    borderRadius: 4,
                    width: width,
                    position: 'relative',
                    background: 'var(--color-dark)',
                }}
            >
                <div
                    style={{
                        height: 4,
                        borderRadius: 4,
                        position: 'absolute',
                        border: '1 solid var(--color-dark)',
                        background: 'red',
                        width: `${timerPct}%`
                    }}
                />
            </div>
        </div>
    )
}
