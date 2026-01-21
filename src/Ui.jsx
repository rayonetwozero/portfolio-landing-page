import { useState, useRef, useEffect } from 'react'

export default function SwitchButton() {
  const [on, setOn] = useState(true) // 預設為播放
  const audioRef = useRef(null)

  useEffect(() => {
    if (on && audioRef.current) {
      audioRef.current.play()
    }
  }, [on])

  const handleClick = () => {
    setOn(v => {
      const next = !v
      if (audioRef.current) {
        if (next) {
          audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
      }
      return next
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      right: 16,
      zIndex: 1000
    }}>
      <audio ref={audioRef} src="/music-landing-page-background.mp3" loop autoPlay />
      <button
        className={`music-switch-btn${on ? '' : ' off'}`}
        onClick={handleClick}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src={on ? '/icon-music-on.svg' : '/icon-music-off.svg'}
          alt={on ? 'Music On' : 'Music Off'}
          style={{ width: 24, height: 24 }}
        />
      </button>
    </div>
  )
}

