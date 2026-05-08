import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Game3.css'

// Replaced emoji-based content with ASCII placeholders for Vercel build compatibility
interface EmojiPair {
  emoji: string
  meaning: string
  id: number
}

const emojiPairs: EmojiPair[] = [
  { emoji: '[SMILE]', meaning: 'Your Beautiful Smile', id: 1 },
  { emoji: '[STRONG]', meaning: 'Your Strong Personality', id: 2 },
  { emoji: '[CREATIVE]', meaning: 'Your Creative Mind', id: 3 },
  { emoji: '[ENERGY]', meaning: 'Your Energy', id: 4 },
  { emoji: '[GRACE]', meaning: 'Your Grace', id: 5 },
  { emoji: '[STAR]', meaning: 'You are a Star', id: 6 },
]

interface Tile {
  emoji: string
  meaning: string
  flipped: boolean
}

export default function Game3() {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffled = emojiPairs.sort(() => Math.random() - 0.5)
    setTiles(shuffled.map((pair) => ({ ...pair, flipped: false })))
    setScore(0)
    setGameComplete(false)
  }

  const handleFlip = (index: number) => {
    const newTiles = [...tiles]
    newTiles[index].flipped = !newTiles[index].flipped
    setTiles(newTiles)

    const flippedCount = newTiles.filter((t) => t.flipped).length
    if (flippedCount === newTiles.length) {
      setScore(score + 1)
      if (score + 1 === 3) {
        setGameComplete(true)
      } else {
        setTimeout(() => {
          newTiles.forEach((t) => (t.flipped = false))
          setTiles([...newTiles].sort(() => Math.random() - 0.5))
        }, 1000)
      }
    }
  }

  return (
    <div className="game3-container">
      <Link to="/" className="back-button">
        ← Back
      </Link>
      <div className="game3-content">
        <h1>Emoji Match - Your Qualities</h1>
        <p className="round-info">Round {score}/3</p>

        <div className="emoji-grid">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`emoji-tile ${tile.flipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(index)}
            >
              <div className="emoji-tile-inner">
                <div className="emoji-tile-front">?</div>
                <div className="emoji-tile-back">
                  <span className="emoji-big">{tile.emoji}</span>
                  <span className="meaning">{tile.meaning}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gameComplete && (
          <div className="complete-modal">
            <div className="complete-content">
              <h2>Amazing!</h2>
              <p>You've revealed all your beautiful qualities!</p>
              <p className="qualities-list">
                You are <br />
                Beautiful, Strong, Creative, Energetic, Graceful, and a Star!
              </p>
              <button onClick={initializeGame} className="restart-btn">
                Play Again
              </button>
              <Link to="/" className="home-btn-link">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        <button onClick={initializeGame} className="reset-game-btn">
          New Game
        </button>
      </div>
    </div>
  )
}

