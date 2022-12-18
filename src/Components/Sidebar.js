import React from 'react'
import { Link } from 'react-router-dom'
export default function Sidebar() {
  return (
    <div className='sideBar'>
        <div className='darkback'></div>
        <div className='leftSpace'></div>
        <div className='sideBarMain'>

        <div className='sideBarUpper p-4'>

        <h2>MovieWiki</h2>
        <hr></hr>
        <ul className='px-0'>
            <li><i class="bi bi-house " /><Link>  Home</Link></li>
            <li><i class="bi bi-lightning "></i> <Link> Trending</Link></li>
            <li><i class="bi bi-camera-reels "></i><Link> Movie</Link></li>
            <li><i class="bi bi-collection-play "></i><Link> Series</Link></li>
            <li><i class="bi bi-heart "></i><Link> Favourites</Link></li>
        </ul>
        <hr></hr>
        </div>
        <Link to="/logout"><h5 className='align-self-end m-4'> <i class="bi bi-box-arrow-in-left"></i> Logout</h5></Link>
        </div>
    </div>
  )
}
