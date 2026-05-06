import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Game2.css'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

const triviaQuestions: Question[] = [
  {
    id: 1,
    question: 'What is my favorite color?',
    options: ['Pink', 'Blue', 'Purple', 'Green'],
    correct: 2
  },
  {
    id: 2,
    question: 'What is my favorite food?',
    options: ['Pasta', 'Pizza', 'Biryani', 'Sushi'],
    correct: 2
  },
  {
    id: 3,
    question: 'What is my favorite movie genre?',
    options: ['Horror', 'Comedy', 'Romance', 'Action'],
    correct: 2
  },
  {
    id: 4,
    question: 'What is my hidden talent?',
    options: ['Singing', 'Dancing', 'Cooking', 'Magic tricks'],
    correct: 1
  },
  {
    id: 5,
    question: 'What do I love the most in the world?',
    options: ['Money', 'Fame', 'Family & Love', 'Chocolate'],
    correct: 2
  }
]

export default function Game2() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newAnswers)

    if (optionIndex === triviaQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < triviaQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 500)
    } else {
      setTimeout(() => {
        setShowResults(true)
      }, 500)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedAnswers([])
  }

  if (showResults) {
    return (
      <div className="game2-container">
        <Link to="/" className="back-button">← Back</Link>
        <div className="game2-content">
          <h1>🎉 Quiz Complete! 🎉</h1>
          <div className="results-card">
            <h2>Your Score: {score} / {triviaQuestions.length}</h2>
            <p className="score-percentage">{Math.round((score / triviaQuestions.length) * 100)}%</p>
            
            {score === triviaQuestions.length && (
              <p className="perfect-message">Perfect Score! You know me so well! 💕</p>
            )}
            {score >= 3 && score < triviaQuestions.length && (
              <p className="good-message">Great job! You know me quite well! 😊</p>
            )}
            {score < 3 && (
              <p className="okay-message">Good try! Let's spend more time together! 🥰</p>
            )}
            
            <button onClick={resetQuiz} className="retry-btn">Take Quiz Again</button>
            <Link to="/" className="home-link-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  const question = triviaQuestions[currentQuestion]

  return (
    <div className="game2-container">
      <Link to="/" className="back-button">← Back</Link>
      <div className="game2-content">
        <h1>❓ Birthday Trivia ❓</h1>
        <p className="progress">Question {currentQuestion + 1} of {triviaQuestions.length}</p>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / triviaQuestions.length) * 100}%` }}></div>
        </div>

        <div className="question-card">
          <h2>{question.question}</h2>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswers[currentQuestion] !== undefined}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <p className="score-display">Current Score: {score}</p>
      </div>
    </div>
  )
}
