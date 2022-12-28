import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const Navigate = useNavigate()
  const Logout=()=>{
    localStorage.removeItem('token')
    Navigate("/login")
    window.location.reload()
    
  }
  const host = 'http://localhost:5000'
    const [username, setusername] = useState("")

    const getUserName= async ()=>{
      if(localStorage.getItem('token')){
        const response = await fetch(`${host}/api/auth/getusername`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token" :localStorage.getItem('token')
          },
  
        });
        const text = await response.text()
          setusername(text)
      }
             
    }
    useEffect(() => {
      getUserName()
      
    }, [])
    
  return (
    <div className='sideBar' id='sideBar'>
      <div className='darkback'></div>
      <div className='leftSpace'></div>
      <div className='sideBarMain'>

        <div className='sideBarUpper p-4'>

          <Link to="/"><h2>MovieWiki</h2></Link>
          <hr></hr>
          <ul className='px-0'>
            <li><i class="bi bi-search "></i><Link to="/search"> Search</Link></li>
            <li><i class="bi bi-house " /><Link to="/"> Home</Link></li>
            <li><i class="bi bi-lightning "></i> <Link to="/trending"> Trending</Link></li>
            <li><i class="bi bi-camera-reels "></i><Link to="/genres"> Genres</Link></li>
            <li><i class="bi bi-collection-play "></i><Link> Series</Link></li>
            <li><i class="bi bi-heart "></i><Link to="/favourites"> Favourites</Link></li>
          </ul>
          <hr></hr>
        </div>
        <div className='userandlogin'>
        <h4 className='mb-4'>{username}</h4>
        {localStorage.getItem('token')?<button onClick={Logout} className='logoutbtn'><i class="bi bi-arrow-bar-left"></i> Logout</button>:<Link to="/login"><h5 className='align-self-end'>Login / Signup</h5></Link>}
        </div>
      </div>
    </div>
  )
}
