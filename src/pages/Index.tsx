import { useState } from 'react';

import { getRandInt } from '/src/utils/math'

import { NavigationSidebar } from '/src/components/NavigationSidebar'
import { ProblemCard } from '/src/components/ProblemCard'
import type { ProblemProps } from '/src/components/ProblemCard'

function PageContent({ children }) {
    return (
        <div style={{
            position: 'relative',
            margin: '16px 16px',
            padding: '16px 16px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </div>
    )
}

const problemProps = new Map<string, ProblemProps>([
    ['Addition 1', {
        getNewProblem: () => {
            let a = getRandInt(1, 10);
            let b = getRandInt(1, 10);
            return {
                'question': <>
                    {a}
                    <br />
                    + {b}
                </>,
                'answer': a + b
            }
        },
        totalProblems: 60,
        targetTime: 60,
    }],
    ['Addition 2', {
        getNewProblem: () => {
            let a = getRandInt(10, 100);
            let b = getRandInt(10, 100);
            return {
                'question': <>
                    {a}
                    <br />
                    + {b}
                </>,
                'answer': a + b
            }
        },
        totalProblems: 30,
        targetTime: 60,
    }],
    ['Addition 3', {
        getNewProblem: () => {
            let a = getRandInt(100, 1000);
            let b = getRandInt(100, 1000);
            return {
                'question': <>
                    {a}
                    <br />
                    + {b}
                </>,
                'answer': a + b
            }
        },
        totalProblems: 15,
        targetTime: 60,
    }],
    ['Addition 4', {
        getNewProblem: () => {
            let a = getRandInt(1000000, 10000000);
            let b = getRandInt(1000000, 10000000);
            return {
                'question': <>
                    {a}
                    <br />
                    + {b}
                </>,
                'answer': a + b
            }
        },
        totalProblems: 5,
        targetTime: 60,
    }],
    ['Subtraction 1', {
        getNewProblem: () => {
            let a = getRandInt(1, 10);
            let b = getRandInt(1, 10);
            return {
                'question': <>
                    {a}
                    <br />
                    - {b}
                </>,
                'answer': a - b
            }
        },
        totalProblems: 60,
        targetTime: 60,
    }],
    ['Subtraction 2', {
        getNewProblem: () => {
            let a = getRandInt(1, 100);
            let b = getRandInt(1, 100);
            return {
                'question': <>
                    {a}
                    <br />
                    - {b}
                </>,
                'answer': a - b
            }
        },
        totalProblems: 30,
        targetTime: 60,
    }],
    ['Subtraction 3', {
        getNewProblem: () => {
            let a = getRandInt(1, 1000);
            let b = getRandInt(1, 1000);
            return {
                'question': <>
                    {a}
                    <br />
                    - {b}
                </>,
                'answer': a - b
            }
        },
        totalProblems: 15,
        targetTime: 60,
    }],
])

function QuestionPage(props: ProblemProps) {
    return (
        <PageContent>
            <ProblemCard {...props} />
        </PageContent>
    )
}

export function Index() {
    const [navigationKey, setNavigationKey] = useState('Addition 1');

    return (
        <>
            <NavigationSidebar
                navigationKeys={[...problemProps.keys()]}
                setNavigationKey={setNavigationKey}
            />
            <QuestionPage {...problemProps.get(navigationKey)} />
        </>
    )
}
