import { useState, useRef, useEffect } from 'react'
import './WishesApp.css'

const remoMusicUrl = '/RemoMusic.mp4'

interface Wish {
  id: number
  tamil: string
  english: string
}

const wishes: Wish[] = [
  {
    id: 1,
    tamil: '',
    english:
      'Sarumathi, since the day you came into my life, every day feels like a birthday. Your smile, your love makes me live.',
  },
  {
    id: 2,
    tamil: '',
    english:
      'You are a beautiful soul. You are the light of my life. Be happy and succeed always.',
  },
  {
    id: 3,
    tamil: '',
    english: 'Your love sustains me. You are always by my side. Be completely happy.',
  },
  {
    id: 4,
    tamil: '',
    english:
      'Your laughter takes away all my tiredness. Your trust makes me better. May the universe bless you forever.',
  },
  {
    id: 5,
    tamil: '',
    english:
      'My dear Sarumathi, by your birth, the world received a wonderful woman. May your life be filled with joy forever!',
  },
]

type Stage = 'login' | 'welcome' | 'wishes' | 'cake' | 'final'

export default function WishesApp() {
  const [currentWish, setCurrentWish] = useState(0)
  const [stage, setStage] = useState<Stage>('login')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [highlightedWord, setHighlightedWord] = useState('')
  const [isCuttingCake, setIsCuttingCake] = useState(false)

  const [showCrackers, setShowCrackers] = useState(false)
  const [dob, setDob] = useState('')
  const [loginError, setLoginError] = useState('')
  const [autoPlayStarted, setAutoPlayStarted] = useState(false)
  const autoPlayRef = useRef(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startBackgroundMusic = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(remoMusicUrl)
        audioRef.current.loop = true
        audioRef.current.volume = 0.25
      }

      audioRef.current.pause()
      audioRef.current.currentTime = 0

      audioRef.current.play().catch(() => {
        // ignore
      })
    } catch {
      // ignore
    }
  }

  const stopBackgroundMusic = () => {
    try {
      audioRef.current?.pause()
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (stage === 'login') stopBackgroundMusic()
  }, [stage])

  const [quoteHighlightTick, setQuoteHighlightTick] = useState(0)

  const welcomeQuoteWords = ['Saru', 'Love', 'Love', 'Mind', 'Wishes', 'Light']
  const finalQuoteWords = ['Love', 'Mind', 'Life', 'Love', 'Happiness', 'Always', 'With Us', 'Thanks']

  useEffect(() => {
    if (stage === 'welcome') {
      setQuoteHighlightTick(0)
      const t = setInterval(
        () => setQuoteHighlightTick((x) => (x + 1) % welcomeQuoteWords.length),
        650
      )
      return () => clearInterval(t)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'final') {
      setQuoteHighlightTick(0)
      const t = setInterval(
        () => setQuoteHighlightTick((x) => (x + 1) % finalQuoteWords.length),
        650
      )
      return () => clearInterval(t)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'final') {
      const timer = setTimeout(() => {
        setCurrentWish(0)
        setStage('login')
        setShowCrackers(false)
        setAutoPlayStarted(false)
        autoPlayRef.current = false
        setDob('')
      }, 30000) // 30 seconds
      return () => clearTimeout(timer)
    }
  }, [stage])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const validDob = '2002-05-10'

    if (dob === validDob) {
      setLoginError('')
      setStage('welcome')
    } else {
      const wrongMessages = [
        'Oops! Wrong birth date.',
        'Not that date. Try again!',
        'Close, but not right.',
        'Try using: 10/05/2002',
      ]
      const randomIndex = Math.floor(Math.random() * wrongMessages.length)
      setLoginError(wrongMessages[randomIndex])
    }
  }

  const speakWish = async () => {
    return
  }

  const nextWish = () => {
    setHighlightedWord('')
    setIsSpeaking(false)

    if (currentWish < wishes.length - 1) {
      setCurrentWish(currentWish + 1)
    } else {
      setStage('cake')
    }
  }

  const cutCake = () => {
    if (isCuttingCake) return
    setIsCuttingCake(true)

    setShowCrackers(false)

    playBirthdaySong()

    setTimeout(() => {
      const candles = document.querySelectorAll('.candle-flame')
      candles.forEach((c) => c.classList.add('candle-blown'))
    }, 1100)

    setTimeout(() => {
      setStage('final')
      setShowCrackers(true)
    }, 3400)
  }

  const playBirthdaySong = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const notes = [
      { freq: 261.63, duration: 0.4 },
      { freq: 261.63, duration: 0.4 },
      { freq: 293.66, duration: 0.4 },
      { freq: 261.63, duration: 0.4 },
      { freq: 349.23, duration: 0.4 },
      { freq: 329.63, duration: 0.8 },
      { freq: 261.63, duration: 0.4 },
      { freq: 261.63, duration: 0.4 },
      { freq: 293.66, duration: 0.4 },
      { freq: 261.63, duration: 0.4 },
      { freq: 392.0, duration: 0.4 },
      { freq: 349.23, duration: 0.8 },
    ]

    let currentTime = audioContext.currentTime

    notes.forEach((note) => {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()

      osc.frequency.value = note.freq
      osc.connect(gain)
      gain.connect(audioContext.destination)

      gain.gain.setValueAtTime(0.2, currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration)

      osc.start(currentTime)
      osc.stop(currentTime + note.duration)

      currentTime += note.duration
    })
  }

  if (stage === 'login') {
    return (
      <div className="login-container">
        <div className="login-glow"></div>
        <div className="login-card">
          <div className="login-header">
            <div>
              <h1 className="login-title">Sarumathi Birthday</h1>
              <p className="login-subtitle">May 10, 2002</p>
            </div>
          </div>

          <p className="login-tagline">
            Welcome to your birthday surprise. Enter your birth date to continue.
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="dob">Enter birth date</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value)
                  setLoginError('')
                }}
                className="date-input"
              />
            </div>

            <button type="submit" className="login-btn">
              Enter
            </button>
          </form>

          {loginError && <div className="toast-message">{loginError}</div>}
          <div className="login-hint">Use your special date: 10/05/2002</div>

          <div className="login-bubbles">
            <span className="bubble bubble-1"></span>
            <span className="bubble bubble-2"></span>
            <span className="bubble bubble-3"></span>
            <span className="bubble bubble-4"></span>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'welcome') {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome</h1>
          <h2 className="welcome-name">Sarumathi</h2>

          <div className="welcome-message">
            <p className="main-wish">
              Sarumathi, every day feels special from the day you entered my life.
            </p>
            <p className="sub-wish">May you have many more happy returns of the day!</p>
          </div>

          <button
            onClick={() => {
              startBackgroundMusic()
              setStage('wishes')
            }}
            className="continue-btn"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  if (stage === 'wishes') {
    const wish = wishes[currentWish]
    return (
      <div className="wishes-container">
        <div className="wish-card">
          <h1 className="name-title">Sarumathi</h1>
          <p className="page-indicator">
            Wish {currentWish + 1} / {wishes.length}
          </p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentWish + 1) / wishes.length) * 100}%` }}
            ></div>
          </div>

          <div className="wish-text-container">
            <p className="wish-tamil">
              {wish.tamil.split(' ').map((word, idx) => (
                <span
                  key={idx}
                  className={`word ${highlightedWord === word ? 'highlighted' : ''}`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            <p className="wish-english">{wish.english}</p>
          </div>

          <div className="button-group">
            <button onClick={nextWish} className="next-btn">
              {currentWish < wishes.length - 1 ? 'Next →' : 'Finish →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'cake') {
    return (
      <div className="cake-container">
        {isCuttingCake && (
          <>
            <div className="crackers-container">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="cracker" style={{ '--cracker-index': i } as any}>
                  
                </div>
              ))}
              {[...Array(40)].map((_, i) => (
                <div key={`star-${i}`} className="cracker star" style={{ '--cracker-index': i } as any}>
                  
                </div>
              ))}
            </div>

            <div className="happy-birthday-text">
              {['H', 'A', 'P', 'P', 'Y', ' ', 'B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y'].map((char, idx) => (
                <div key={idx} className="birthday-word">
                  {char}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="cake-3d-wrapper">
          <h1 className="cake-top-title">Happy Birthday Sarumathi..</h1>

          <div className="cake-3d">
            <div className="cake-layer layer-1"></div>
            <div className="cake-layer layer-2"></div>
            <div className="cake-layer layer-3"></div>
            <div className="cake-top-frosting"></div>

            <div className="candles-group">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="candle-3d" style={{ '--candle-index': i } as any}>
                  <div className="candle-stick"></div>
                  <div className="candle-flame"></div>
                </div>
              ))}
            </div>

            <div
              className={`knife-3d ${isCuttingCake ? 'knife-active' : ''}`}
              aria-hidden="true"
            >
              <div className="knife-blade"></div>
              <div className="knife-handle"></div>
            </div>
          </div>

          <p className="cake-subtext">Blow the candles then cut!</p>

          <button onClick={cutCake} className="cut-cake-btn">
            Blow & Cut
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="final-container">
      {showCrackers && (
        <>
          <div className="crackers-container">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="cracker" style={{ '--cracker-index': i } as any}>
                
              </div>
            ))}
            {[...Array(40)].map((_, i) => (
              <div key={`star-${i}`} className="cracker star" style={{ '--cracker-index': i } as any}>
                
              </div>
            ))}
          </div>

          <div className="happy-birthday-text">
            {['H', 'A', 'P', 'P', 'Y', ' ', 'B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y'].map((char, idx) => (
              <div key={idx} className="birthday-word">
                {char}
              </div>
            ))}
          </div>

          <div className="fireworks-container">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="firework" style={{ '--firework-index': i } as any}>
                
              </div>
            ))}
          </div>
        </>
      )}

      <div className="final-content">
        <h1 className="sarumathi-name">Sarumathi</h1>

        <div className="final-message">
          <h2>Happy Birthday Charuu..</h2>
          <p>
            May your life be filled with joy and happiness. Wishing you all the best always.
          </p>
          <p className="signature">Sarumathi</p>
        </div>

        <button
          onClick={() => {
            setCurrentWish(0)
            setStage('login')
            setShowCrackers(false)
            setAutoPlayStarted(false)
            autoPlayRef.current = false
            setDob('')
          }}
          className="restart-btn"
        >
          Restart
        </button>
      </div>
    </div>
  )
}

