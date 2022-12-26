import React,{useState,useRef} from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
    const like = useRef()
    const [favourites, setfavourites] = useState([])
    const handleLike=(id)=>{
        setfavourites(favourites.push(id))
        console.log(favourites)
    }
  return (
    <div>
        <div className='Trendcard' key={props.index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.poster_path})` }}>
        <button className='likebtn' ref={like} value={props.id} onClick={()=>handleLike(props.id)}><i class="bi bi-heart fs-2 text-light"></i></button>
        <Link to={`/media/${props.id}`}><div className='click'></div></Link>
        
                        </div>
    </div>
  )
}
