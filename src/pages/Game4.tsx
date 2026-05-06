import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Game4.css'

export default function Game4() {
  const [yourName, setYourName] = useState('')
  const [herName, setHerName] = useState('Saru')
  const [lovePercentage, setLovePercentage] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculateLove = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!yourName.trim()) {
      alert('Please enter your name!')
      return
    }

    // Fun calculation based on character codes
    const combined = yourName.toLowerCase() + herName.toLowerCase()
    let sum = 0
    
    for (let char of combined) {
      sum += char.charCodeAt(0)
    }
    
    const percentage = (sum % 101)
    
    setLovePercentage(percentage)
    setShowResult(true)
  }

  const getLoveMessage = (percentage: number) => {
    if (percentage >= 90) {
      return { message: "This is True Love! 💕💕💕", emoji: '😍' }
    } else if (percentage >= 80) {
      return { message: "Forever Together! 💑", emoji: '😊' }
    } else if (percentage >= 70) {
      return { message: "Deep Love! 💓", emoji: '🥰' }
    } else if (percentage >= 60) {
      return { message: "Strong Connection! 💗", emoji: '😄' }
    } else if (percentage >= 50) {
      return { message: "Good Match! 💖", emoji: '😊' }
    } else {
      return { message: "You\'ll fall in love more! 💕", emoji: '😉' }
    }
  }

  const reset = () => {
    setYourName('')
    setHerName('Saru')
    setLovePercentage(null)
    setShowResult(false)
  }

  if (showResult && lovePercentage !== null) {
    const result = getLoveMessage(lovePercentage)
    
    return (
      <div className="game4-container">
        <Link to="/" className="back-button">← Back</Link>
        
        <div className="game4-content">
          <h1>💘 Love Calculator 💘</h1>
          
          <div className="result-card">
            <div className="couple-names">
              <h2>{yourName}</h2>
              <span className="love-symbol">💕</span>
              <h2>{herName}</h2>
            </div>
            
            <div className="love-percentage">
              <div className="percentage-circle">
                <span className="percentage-value">{lovePercentage}%</span>
              </div>
            </div>
            
            <div className="result-emoji">{result.emoji}</div>
            <h3>{result.message}</h3>
            
            <div className="love-bar-container">
              <div className="love-bar">
                <div 
                  className="love-bar-fill" 
                  style={{ width: `${lovePercentage}%` }}
                ></div>
              </div>
            </div>
            
            {lovePercentage >= 90 && (
              <p className="special-message">
                You two are meant to be! This is the kind of love that lasts forever. 
                So grateful to have you in my life. Happy Birthday! ❤️
              </p>
            )}
            
            {lovePercentage >= 70 && lovePercentage < 90 && (
              <p className="special-message">
                We share a beautiful bond. Every day with you is a blessing. 
                Happy Birthday to my love! 💕
              </p>
            )}
            
            {lovePercentage < 70 && (
              <p className="special-message">
                With every moment we spend together, this percentage goes higher! 
                So happy to have you in my life. Happy Birthday! 🥰
              </p>
            )}
            
            <div className="button-group">
              <button onClick={reset} className="try-again-btn">Try Again</button>
              <Link to="/" className="home-link-btn">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="game4-container">
      <Link to="/" className="back-button">← Back</Link>
      
      <div className="game4-content">
        <h1>💘 Love Calculator 💘</h1>
        
        <div className="form-card">
          <p className="form-description">
            Let's calculate how much love there is between us! 💕
          </p>
          
          <form onSubmit={calculateLove}>
            <div className="form-group">
              <label htmlFor="yourName">Your Name *</label>
              <input
                type="text"
                id="yourName"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Enter your name"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="herName">Their Name</label>
              <input
                type="text"
                id="herName"
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                placeholder="Enter their name"
                className="form-input"
              />
            </div>
            
            <button type="submit" className="calculate-btn">
              Calculate Love 💕
            </button>
          </form>
        </div>
        
        <div className="info-card">
          <h3>Fun Facts About Love 💕</h3>
          <ul>
            <li>❤️ Love makes our hearts beat faster</li>
            <li>💑 True love is unconditional</li>
            <li>💪 Love gives us strength</li>
            <li>🌟 Love makes us shine brighter</li>
            <li>🎂 Every birthday is special with someone you love</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
