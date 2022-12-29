import React,{useState,useEffect} from 'react'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function Genrewise(props) {
  let url = window.location.href
  let count=0
  let [page, setpage] = useState(1)
  const [movieList, setmovieList] = useState([])
  extractGenreId(url)
  let genreId = url.substring(url.length-count,url.length)
  const [favMovieId,setFavMovieId] = useState([])
  const host = 'http://localhost:5000'

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
      console.log(jsonData)
      setFavMovieId(jsonData)
    }
  }

  const getMoreGenreMovies = async (genreId) => {
    if (movieList.length === 0) {
        setpage(1)
    }
    else {
        setpage(++page)
    }
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_watch_monetization_types=flatrate`);
    const jsonData = await response.json();
    setmovieList(movieList.concat(jsonData.results))

};

const getGenreMovies = async (genreId) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`);
    const jsonData = await response.json();
    setmovieList(movieList.concat(jsonData.results))
};

useEffect(() => {
    getGenreMovies(genreId)
    getFavMovieId()
}, [])

// Function to extract genre id from URL 
    function extractGenreId(url) {
      for (let index = url.length-1; index>0; index--) {
        if (url[index]!=="/") {
          count++;
          continue
        }
        break  
      }
    }
    
  return (
    <div className='genreWise'>
        <h1 className='text-white'>Showing results for {props.genre}</h1>
        <hr></hr>
        <InfiniteScroll
                dataLength={movieList.length} //This is important field to render the next data
                next={getMoreGenreMovies}
                hasMore={true}
                loader={<Spinner />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className='trend-container d-flex align-items-center justify-content-center'>
                    {movieList.map((element, index) => {
                        return  <Card id={element.id} showAlert={props.showAlert} poster_path={element.poster_path} index={index} heartFill={favMovieId.includes(element.id)?"-fill":""}/>
                    })}
                </div>
            </InfiniteScroll>
    </div>
  )
}
