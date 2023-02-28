import { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: -25, y: -25 })
  const [color, setColor] = useState('0, 0, 0, 0.5')
  const [isHovering, setIsHovering] = useState(false)
  const [decrement, setDecrement] = useState({ h: 50, w: 50 })
  const [isLeft, setIsLeft] = useState({ l: -25 })
  const [isRight, setIsRight] = useState({ r: -25 })

  useEffect(() => {
    // console.log('efecto', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      // clientX y clientY son constantes reservadas para determinar la posición del puntero
      // console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // Sirve para limpiar el evento
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    const randomColor = () => {
      const red = Math.floor(Math.random() * 256)
      const green = Math.floor(Math.random() * 256)
      const blue = Math.floor(Math.random() * 256)
      setColor({ r: red, g: green, b: blue })
    }

    if (enabled && isHovering) {
      window.addEventListener('mouseover', randomColor)
    }
    return () => {
      window.removeEventListener('mouseover', randomColor)
    }
  }, [enabled, isHovering])

  const handleClick = () => {
    setEnabled(!enabled)
  }
  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }
  const handleReset = () => {
    setColor({ r: 0, g: 0, b: 0.5 })
    setPosition({ x: -25, y: -25 })
    setEnabled(false)
    setDecrement({ h: 50, w: 50 })
    setIsLeft({ l: -25 })
    setIsRight({ r: -25 })
  }
  const handleDecrement = () => {
    const lessH = decrement.h - 10
    const lessW = decrement.w - 10
    setDecrement({ h: lessH, w: lessW })

    const addLeft = isLeft.l + 5
    const addRight = isRight.r + 5
    setIsLeft({ l: addLeft })
    setIsRight({ r: addRight })
  }
  const handleIncrement = () => {
    const moreH = decrement.h + 10
    const moreW = decrement.w + 10
    setDecrement({ h: moreH, w: moreW })

    const restLeft = isLeft.l - 5
    const restRight = isRight.r - 5
    setIsLeft({ l: restLeft })
    setIsRight({ r: restRight })
  }

  return (
    <main style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
      <div
        style={{
          position: 'absolute',
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b})`,
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: isLeft.l,
          top: isRight.r,
          width: decrement.w,
          height: decrement.h,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div className='bt-section1'>
        <button
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Cambia de color
        </button>
      </div>

      <div className='bt-section2'>
        <button onClick={handleIncrement}>
          + Tamaño
        </button>
        <button onClick={handleClick} className='btn bt-activar'>
          {enabled ? 'Desactivar' : 'Activar'}  Seguir Puntero
        </button>
        <button onClick={handleDecrement}>
          - Tamaño
        </button>
      </div>
      <div className='bt-section3'>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </main>
  )
}

export default App
