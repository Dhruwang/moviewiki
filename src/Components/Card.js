import React,{useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
    const like = useRef()
    const host = 'http://localhost:5000'



    const handleLike= async (id,poster)=>{
      if(localStorage.getItem('token')){
        const response = await fetch(`${host}/api/auth/addFav`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          },
          body: JSON.stringify({movieId:id,poster:poster})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
          // save authToken and redirect 
          console.log("added")
          props.showAlert("success","Added to Favourites")
        }
      }
      else{
        console.log("running")
        props.showAlert("danger","Login/signup required")
      }

        
    }

 
  return (
    <div>
        <div className='Trendcard' key={props.index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.poster_path})` }}>
        <button className='likebtn' ref={like} value={props.id} onClick={()=>handleLike(props.id,props.poster_path)}><i class={`bi bi-heart${props.heartFill} fs-3 text-light`}></i></button>
        <Link to={`/media/${props.id}`}><div className='click'></div></Link>
        
                        </div>
    </div>
  )
}
