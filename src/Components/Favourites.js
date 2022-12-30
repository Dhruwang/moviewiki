import React,{useEffect,useState} from 'react'
import Card from './Card'

export default function Favourites(props) {
    const [favourites, setfavourites] = useState([])
    const [favMovieId,setFavMovieId] = useState([])
    const host = 'https://moviewikiapi.onrender.com'

    const getFavourites = async () => {
      if(localStorage.getItem('token')){
        const response = await fetch(`${host}/api/auth/favourites`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const jsonData = await response.json()
        setfavourites(jsonData)
      }
        
      }

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

      useEffect(() => {
        getFavourites()
        getFavMovieId()
      }, [])

      
  return (
    <div className='favouritesMain'>
        <h1>Favourites</h1>
        <hr></hr>
        <div className='trend-container d-flex align-items-center'>
          <h3>{favourites.length === 0 ? (localStorage.getItem('token')?"No Favourites added":"Please Login/Signup to add Favourites"):""}</h3>
        {favourites.map((element, index) => {
                        return <Card id={element[0]} showAlert={props.showAlert} poster_path={element[1]} heartFill={favMovieId.includes(element[0])?"-fill":""} index={index}/>
                    })}
                </div>
    </div>
  )
}
