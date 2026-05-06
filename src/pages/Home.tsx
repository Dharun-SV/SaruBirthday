import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="confetti"></div>
        ))}
      </div>

      <div className="home-content">
        <h1 className="main-title">🎉 Happy Birthday Saru! 🎉</h1>
        
        <div className="greeting-card">
          <p className="greeting-text">
            To the most wonderful, beautiful, and amazing person in my life...
          </p>
          <p className="greeting-subtext">
            This day is dedicated to celebrating YOU! 💕
          </p>
        </div>

        <div className="games-section">
          <h2>Let's Have Some Fun! 🎮</h2>
          <div className="games-grid">
            <Link to="/memory-game" className="game-card">
              <div className="game-icon">🧠</div>
              <h3>Memory Game</h3>
              <p>Test your memory and find the matching pairs!</p>
            </Link>

            <Link to="/trivia" className="game-card">
              <div className="game-icon">❓</div>
              <h3>Birthday Trivia</h3>
              <p>Answer fun questions about your special day!</p>
            </Link>

            <Link to="/emoji-match" className="game-card">
              <div className="game-icon">😊</div>
              <h3>Emoji Match</h3>
              <p>Match emojis that represent your qualities!</p>
            </Link>

            <Link to="/love-calculator" className="game-card">
              <div className="game-icon">💘</div>
              <h3>Love Calculator</h3>
              <p>Discover the love percentage! 💑</p>
            </Link>
          </div>
        </div>

        <div className="special-message">
          <h3>A Special Message 💌</h3>
          <p>
            You make every moment special. Your smile brightens my day, and your 
            presence makes everything better. On your birthday, I want you to feel 
            as loved and cherished as you truly are. Here's to another year of 
            laughter, adventures, and falling in love with you all over again! ❤️
          </p>
        </div>
      </div>
    </div>
  )
}
