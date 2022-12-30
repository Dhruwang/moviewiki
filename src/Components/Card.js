import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
  const like = useRef()
  const host = 'https://moviewikiapi.onrender.com'
  const [active, setactive] = useState('')
  const [favMovieId,setFavMovieId] = useState([])



  const getFavMovieId = async () => {
    if(localStorage.getItem('token')){
      const response = await fetch(`${host}/api/auth/favMovieId`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const jsonData = await response.json()
      setFavMovieId(jsonData)
    }
    
  }

  const handleLike = async (id,poster) => {
    console.log("running")
    if (localStorage.getItem('token')) {
      if (favMovieId.includes(id)) {
        props.showAlert("success", "Deleted from favourites")
        
        const response = await fetch(`${host}/api/auth/removefav`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ movieId: id, poster: poster })
        });
        setactive(" ")
        window.location.reload(false)
        
      }
      else {
        props.showAlert("success", "Added to favourites")
        console.log("adding")
        setactive("-fill")
        const response = await fetch(`${host}/api/auth/addFav`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ movieId: id, poster: poster })
        });
        const json = await response.json()
        if (json.success) {
          // save authToken and redirect 
          console.log("added")
        }
      }
      
    }
    else {
      props.showAlert("danger", "Login/signup required")
    }


  }
  useEffect(() => {
    getFavMovieId()
  }, [favMovieId])
  


  return (
    <div>
      <div className='Trendcard' key={props.index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.poster_path})` }}>
        <button className='likebtn'   onClick={() => handleLike(props.id, props.poster_path)}><i class={`bi bi-heart${props.heartFill === "-fill" ? "-fill" : active} fs-3 text-light`}></i></button>
        <Link to={`/media/${props.id}`}><div className='click'></div></Link>

      </div>
    </div>
  )
}
