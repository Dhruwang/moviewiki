import React from 'react'
import { Link,useNavigate } from 'react-router-dom'


export default function Responsive() {
  
  const Navigate = useNavigate()
  const Logout=()=>{
    showHideNav()
    localStorage.removeItem('token')
    Navigate("/login")
    window.location.reload()
    
  }
  const showHideNav = () => {
    let responsive = document.getElementById('responsive')
    responsive.style.transform = (responsive.style.transform === "translateX(-100vw)" ? "translateX(0vw)" : "translateX(-100vw)");
  }
  return (
    <div className="responsive" id='responsive'>
      <div className='navBarContent' id='navBarContent'>
        <Link to="/" onClick={showHideNav}><h2 className='text-light'>MovieWiki</h2></Link>
        <hr></hr>
        <ul className='px-0'>
          <li><i class="bi bi-search text-light"></i><Link to="/search" onClick={showHideNav}> Search</Link></li>
          <li><i class="bi bi-house text-light " /><Link to="/" onClick={showHideNav}>  Home</Link></li>
          <li><i class="bi bi-lightning text-light"></i> <Link to="/trending" onClick={showHideNav}> Trending</Link></li>
          <li><i class="bi bi-camera-reels text-light"></i><Link to="/genres" onClick={showHideNav}> Genres</Link></li>
          <li><i class="bi bi-collection-play text-light"></i><Link onClick={showHideNav}> Series</Link></li>
          <li><i class="bi bi-heart text-light"></i><Link to="/favourites" onClick={showHideNav}> Favourites</Link></li>
          <li><button onClick={Logout}><i class="bi bi-arrow-bar-left text-light"></i> Logout</button></li>
        </ul>
      </div>
    </div>
  )
}
