import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Game1.css'

const emojis = ['🎂', '🎈', '🎉', '💝', '🌹', '💕', '🎁', '⭐', '🎂', '🎈', '🎉', '💝', '🌹', '💕', '🎁', '⭐']

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export default function Game1() {
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (matched.length === 16) {
      setGameWon(true)
    }
  }, [matched])

  const initializeGame = () => {
    const shuffled = [...emojis].sort(() => Math.random() - 0.5)
    const newCards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(newCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (id: number) => {
    if (matched.includes(id) || flipped.includes(id) || flipped.length >= 2) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)

      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setMatched([...matched, ...newFlipped])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="game1-container">
      <Link to="/" className="back-button">← Back</Link>
      
      <div className="game1-content">
        <h1>🧠 Memory Game 🧠</h1>
        <p className="game-description">Find all matching pairs! You've made {moves} moves.</p>

        <div className="memory-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`memory-card ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front">?</div>
                <div className="memory-card-back">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {gameWon && (
          <div className="win-modal">
            <div className="win-content">
              <h2>🎉 Congratulations! 🎉</h2>
              <p>You won in {moves} moves!</p>
              <button onClick={initializeGame} className="play-again-btn">Play Again</button>
              <Link to="/" className="home-btn">Back to Home</Link>
            </div>
          </div>
        )}

        <button onClick={initializeGame} className="reset-btn">Reset Game</button>
      </div>
    </div>
  )
}
