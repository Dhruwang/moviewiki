import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div class="footer">
        <h3>Made by Dhruwang</h3>
        <p>Created using tmdb api</p>
        <p>Connect with me </p>
        <div className='socials'>

        <a href='https://twitter.com/DhruwangJariwa1' target="_blank"><i class="bi bi-twitter mx-2"></i></a>
        <a href="https://github.com/Dhruwang" target="_blank"><i class="bi bi-github mx-2"></i></a>
        <a href="https://www.linkedin.com/in/dhruwang-jariwala-068797207/" target="_blank"><i class="bi bi-linkedin mx-2 " ></i></a>
        </div>
    </div>
  )
}
