import { useState, useRef, useEffect } from 'react'
import './WishesApp.css'

const remoMusicUrl = new URL('../Assets/Music/RemoMusic.mp4', import.meta.url).href


interface Wish {
  id: number
  tamil: string
  english: string
}


const wishes: Wish[] = [
  {
    id: 1,
    tamil: 'ஷாருமதி, என் வாழ்க்கையில் நீ வந்த நாள் முதல் ஒவ்வொரு நாளும் பிறந்த நாள்கள் போல் உணர்ந்துக்கொண்டிருக்கிறேன். உன் புன்னகை, உன் அன்பு, உன் பராமரிப்பு என்னை வாழச் செய்கிறது.',
    english: 'Shaarumathi, since the day you came into my life, every day feels like a birthday. Your smile, your love makes me live.'
  },
  {
    id: 2,
    tamil: 'நீ ஒரு அழகிய உயிரினம், உன் இதயம் போல் சுத்தமான எல்லோருக்கும். நீ என் வாழ்க்கையின் ஒளி. சந்தோஷமாய் இரு, வளர்ந்து வெற்றி அடைந்து வா.',
    english: 'You are a beautiful soul. You are the light of my life. Be happy and succeed always.'
  },
  {
    id: 3,
    tamil: 'ஒரு வருடம் கடந்து சென்றாலும் உன் அன்பு என்னை தாங்கி கொண்டிருக்கிறது. நீ எப்போதும் என் பக்கத்தில் இருக்கிறாய். முழுவதுமாய் சந்தோஷமாய் இரு.',
    english: 'Your love sustains me. You are always by my side. Be completely happy.'
  },
  {
    id: 4,
    tamil: 'ஷாருமதி, உன் சிரிப்பு என் சோர்வை எல்லாம் எடுத்துக்கொண்டு போய்விடுகிறது. உன் நம்பிக்கை மற்றும் அன்பு என்னை நல்ல மனிதனாக்குகிறது. உன் பிறந்த நாளில் இந்த பிரபஞ்சம் உன்னை ஆசீர்வதிக்கட்டும்.',
    english: 'Your laughter takes away all my tiredness. Your trust makes me better. May the universe bless you forever.'
  },
  {
    id: 5,
    tamil: 'என் அன்பான ஷாருமதி, உனக்கு பிறந்ததன் மூலம் இந்த உலகம் ஒரு அருமையான பெண்ணைப் பெற்றுக்கொண்டது. உன் வாழ்க்கை ஆனந்தமாய் நிறைந்திடுவதாக நான் விரும்புகிறேன். ஆயுளுக்கு நீ சந்தோஷமாய் வாழ!',
    english: 'My dear Shaarumathi, by your birth, the world received a wonderful woman. May your life be filled with joy forever!'
  }
]

export default function WishesApp() {
  const [currentWish, setCurrentWish] = useState(0)
  const [stage, setStage] = useState<'login' | 'welcome' | 'wishes' | 'cake' | 'final'>('login')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [highlightedWord, setHighlightedWord] = useState('')
  const [isCuttingCake, setIsCuttingCake] = useState(false)

  const [showCrackers, setShowCrackers] = useState(false)
  const [dob, setDob] = useState('')
  const [loginError, setLoginError] = useState('')
  const [autoPlayStarted, setAutoPlayStarted] = useState(false)
  const autoPlayRef = useRef(false)

  // Quote/music helpers (no voice)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startBackgroundMusic = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(remoMusicUrl)
        audioRef.current.loop = true
        audioRef.current.volume = 0.25
      }

      // Ensure it stops old playback first
      audioRef.current.pause()
      audioRef.current.currentTime = 0

      // User gesture will call this in Welcome button
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked; user can click again
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
    // Stop music when leaving the flow (reset)
    if (stage === 'login') stopBackgroundMusic()
  }, [stage])

  const [quoteHighlightTick, setQuoteHighlightTick] = useState(0)

  const welcomeQuoteWords = [
    'உனக்கு',
    'பல',
    'மகிழ்ச்சி',
    'நிறைந்த',
    'பிறந்த',
    'நாட்கள்',
  ]

  const finalQuoteWords = [
    'உன்',
    'பிறந்த',
    'நாளில்',
    'உன்னுடைய',
    'வாழ்க்கை',
    'வளம்,',
    'அன்பு,',
    'சந்தோஷத்தால்',
  ]

  const isWelcomeHighlight = (i: number) => stage === 'welcome' && quoteHighlightTick === i
  const isFinalHighlight = (i: number) => stage === 'final' && quoteHighlightTick === i


  useEffect(() => {
    if (stage === 'welcome') {
      setQuoteHighlightTick(0)
      const t = setInterval(() => setQuoteHighlightTick((x) => (x + 1) % welcomeQuoteWords.length), 650)
      return () => clearInterval(t)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'final') {
      setQuoteHighlightTick(0)
      const t = setInterval(() => setQuoteHighlightTick((x) => (x + 1) % finalQuoteWords.length), 650)
      return () => clearInterval(t)
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
        'Oops! இந்த தேதியோடே நம்ம celebration துவங்க முடியாது! 10/05/2002 மட்டும் தர봐.',
        'நீங்கள் சோதனை செய்யும் போது ஸ்டார் ஜாக் நுழைந்து விட்டது! சரியான தேதியை மறு முயற்சி செய்.',
        'அருமை! இது பத்தாம் முறை முயற்சி செய்தாலுமே சரியான பிறந்த தேதி வந்துவிடுமா?',
        'ஓ! இந்த தேதியோடே கேக் வராது, 10 மே 2002 வை போடுங்க.',
      ]
      const randomIndex = Math.floor(Math.random() * wrongMessages.length)
      setLoginError(wrongMessages[randomIndex])
    }
  }

  const speakWish = async () => {
    // Button is no longer needed (no voice). Keep this as a no-op to avoid changing UI structure.
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

    // Stop crackers until final stage
    setShowCrackers(false)

    playBirthdaySong()

    // Blow candles quickly, then cut
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

    notes.forEach(note => {
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

  // Login Page
  if (stage === 'login') {
    return (
      <div className="login-container">
        <div className="login-glow"></div>
        <div className="login-card">
          <div className="login-header">
            <div className="logo-circle">🎉</div>
            <div>
              <h1 className="login-title">Sarumathi Birthday</h1>
              <p className="login-subtitle">May 10, 2002</p>
            </div>
          </div>

          <p className="login-tagline">Welcome to your super birthday surprise. Enter your birth date to continue.</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="dob">உன் பிறந்த தேதி</label>
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
              enter the celebration
            </button>
          </form>

          {loginError && (
            <div className="toast-message">😅 {loginError}</div>
          )}
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

  // Welcome Page
  if (stage === 'welcome') {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">🎊 பிறந்த நாள் வாழ்த்துக்கள்! 🎊</h1>
          <h2 className="welcome-name">Sarumathi 💕</h2>

          
          <div className="welcome-message">
            <p className="main-wish">
              உனக்கு பல மகிழ்ச்சி நிறைந்த பிறந்த நாட்கள் வாழ்த்துக்கள்!
            </p>
            <p className="sub-wish">
              May you have many more happy returns of the day, dear Shaarumathi!
            </p>
          </div>

          <button
            onClick={() => {
              startBackgroundMusic()
              setStage('wishes')
            }}
            className="continue-btn"
          >
            வாழ்த்துக்களை அனுபவி 💌
          </button>

        </div>

      </div>
    )
  }

  // Wishes Page
  if (stage === 'wishes') {
    const wish = wishes[currentWish]

    return (
      <div className="wishes-container">
        <div className="wish-card">
          <h1 className="name-title">ஷாருமதி 🎂</h1>
          <p className="page-indicator">பக்கம் {currentWish + 1} / {wishes.length}</p>

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
            <button
              onClick={nextWish}
              className="next-btn"
            >
              {currentWish < wishes.length - 1 ? 'அடுத்தது →' : 'கேக்கு →'}
            </button>
          </div>

        </div>
      </div>
    )
  }

  // Cake Page with 3D Effect
  if (stage === 'cake') {
    return (
      <div className="cake-container">
        <div className="cake-3d-wrapper">
          {/* Title on top of cake */}
          <h1 className="cake-top-title">Happy Birthday Charuu..</h1>

          <div className="cake-3d">
            <div className="cake-layer layer-1"></div>
            <div className="cake-layer layer-2"></div>
            <div className="cake-layer layer-3"></div>
            <div className="cake-top-frosting"></div>

            {/* Candles (24) */}
            <div className="candles-group">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="candle-3d" style={{ '--candle-index': i } as any}>
                  <div className="candle-stick"></div>
                  <div className="candle-flame"></div>
                </div>
              ))}
            </div>

            {/* Knife (3D) */}
            <div className={`knife-3d ${isCuttingCake ? 'knife-active' : ''}`} aria-hidden="true">
              <div className="knife-blade"></div>
              <div className="knife-handle"></div>
            </div>
          </div>

          <p className="cake-subtext">🎂 Blow the candles then cut! 🎂</p>

          <button onClick={cutCake} className="cut-cake-btn">
            🔥 Blow & Cut
          </button>
        </div>
      </div>

    )
  }

  // Final Celebration Page
  return (
    <div className="final-container">
      {showCrackers && (
        <>
          <div className="crackers-container">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="cracker" style={{ '--cracker-index': i } as any}>
                {'🎆'}
              </div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div key={`star-${i}`} className="cracker star" style={{ '--cracker-index': i } as any}>
                {'✨'}
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

      <div className="final-content">
        <h1 className="sarumathi-name">ஷாருமதி 🎉</h1>

        <div className="final-message">
          <h2>பிரிய ஷாருமதி,</h2>
          <p>
            உன் பிறந்த நாளில் உன்னுடைய வாழ்க்கை வளம், அன்பு, மற்றும் சந்தோஷத்தால் 
            நிறைந்திருப்பதாக நான் பிரார்த்தனை செய்கிறேன்.
          </p>
          <p className="signature">💕 உன் மனம் நிறைந்த ஒருவனாக 💕</p>
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
          மீண்டும் தொடங்கு 🎂
        </button>
      </div>
    </div>
  )
}
