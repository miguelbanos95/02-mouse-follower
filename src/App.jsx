import { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: -25, y: -25 })
  const [color, setColor] = useState('0, 0, 0, 0.5')
  const [isHovering, setIsHovering] = useState(false)

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

  return (
    <main style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div
        style={{
          position: 'absolute',
          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b})`,
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div className='bt-section'>
        <button>
          Cambia de tamaño
        </button>
        <button onClick={handleClick} className='btn bt-activar'>
          {enabled ? 'Desactivar' : 'Activar'}  Seguir Puntero
        </button>

        <button
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Cambia de color
        </button>
      </div>
    </main>
  )
}

export default App
