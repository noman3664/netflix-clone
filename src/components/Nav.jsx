import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav () {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) handleShow(true)
      else handleShow(false)
    })

    return () => {
      window.removeEventListener('scroll')
    }
  }, [])

  return (
    <div className={`nav ${show ? 'nav_black' : ''}`}>
      <img
        className='logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Logonfx.png/1200px-Logonfx.png'
        alt='Netflix Logo'
      />
      <img
        className='avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        alt='Netflix Logo profile'
      />
    </div>
  )
}

export default Nav
