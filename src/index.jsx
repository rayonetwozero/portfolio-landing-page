import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Lottie  from 'lottie-react'
import loadingAnimation from './lottie-loading.json'
import Experience from './Scene3D.jsx'
import SwitchButton from './Ui.jsx'
import { useRef, useState, useEffect } from 'react'
import Clarity from '@microsoft/clarity'
Clarity.init('scn7uor6a1')

function Typewriter({ text = '', speed = 60 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <div style={{
      color: '#fff',
      fontSize: '2em',
      marginBottom: '1.5em',
      letterSpacing: '1px',
      fontFamily: 'monospace',
      textAlign: 'center'
    }}>
      {displayed}
      <span className="typewriter-cursor">|</span>
    </div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)
  const myText = "Welcome to Ray's Portfolio.."

  const handleStart = () => {
    const clickAudio = new Audio('/sound-click.mp3')
    clickAudio.play()
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  // 監聽 Canvas 載入完成
  const handleCanvasCreated = () => {
    setLoading(false)
  }

  return (
    <>
      {!started && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          flexDirection: 'column'
        }}>
          <Typewriter text={myText} speed={70} />
          <audio ref={audioRef} src="/music-landing-page-background.mp3" loop volume={0.02} />
          <button
            className="start-btn"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      )}
      {started && (
        <>
          {loading && (
            <div className="lottie-loading-overlay">
              <Lottie animationData={loadingAnimation} loop={true} style={{ width: 200, height: 200 }} />
            </div>
          )}
          <SwitchButton />
          <Canvas
            shadows
            style={{ background: '#000' }}
            onCreated={handleCanvasCreated}
          >
            <Experience />
          </Canvas>
        </>
      )}
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)

