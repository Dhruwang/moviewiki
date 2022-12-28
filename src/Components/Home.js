import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Card from './Card';

export default function Home(props) {
    const [trending, setTrending] = useState([])
    const [genres, setGenres] = useState([])
    const [favMovieId,setFavMovieId] = useState([])
    const host = 'http://localhost:5000'


    const getTrendingMovies = async () => {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=b3506838d86a0332b82e597ec8d36406");
        const jsonData = await response.json();
        setTrending(jsonData.results)
    };
    const getGenres = async () => {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US");
        const jsonData = await response.json();
        setGenres(jsonData.genres)
    };
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
        getTrendingMovies()
        getGenres()
        getFavMovieId()
    }, [])
    return (
        <>
            <div className='home'>
                
                <h1 className='text-light mt-4'>MovieWiki</h1>
                <div className='searchBarDiv m-2'>
                    <Link to="/search"><input type="value" className='searchBar' placeholder='Search' /></Link>
                </div>

                <Carousel>
                    <Carousel.Item interval={4000}>
                        <Link to="/media/674324"><img
                            className="d-block w-100"
                            src="https://image.tmdb.org/t/p/w780/9Md4CqzUGDtK5oEkRRvozLkGc9d.jpg"
                            alt="Image One"
                        /></Link>
                        <Carousel.Caption>
                            <h3>The Banshees of Inisherin</h3>
                            <p>Drama</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <Link to="media/715931"><img
                            className="d-block w-100"
                            src="https://image.tmdb.org/t/p/w780/ypFD4TJ3nLJesou76V59CnweaT0.jpg"
                            alt="Image Two"
                        /></Link>
                        <Carousel.Caption>
                            <h3>Emancipation</h3>
                            <p>History</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='trending'>
                <h2 className='mb-4'>Trending</h2>
                <div className='trendContainer d-flex align-items-center justify-content-between'>
                    {trending.map((element, index) => {
                        
                        while (index < 4) {
                            return  <Card id={element.id} poster_path={element.poster_path} index={index} showAlert={props.showAlert}  heartFill={favMovieId.includes(element.id)?"-fill":""}/>
                        }

                    })}


                    <div className='Trendcard viewAll col-md-2 '>
                        <Link to="/trending" className='p-0'>
                            <i class="bi bi-arrow-right-circle fs-1"></i>
                            View All</Link>
                    </div>

                </div>
            </div>
            <div className='genres'>
                <h2 className='mb-4'>Genres</h2>
                <div className='genreContainer d-flex align-items-center justify-content-between'>
                     {genres.map((element, index) => {
                        while (index < 4) {
                            return <Link to={`/genres/${element.id}`}><div className='genreCard' key={index}>
                                {element.name}
                            </div>
                            </Link>
                        }

                    })}
                    <div className='Trendcard viewAll col-md-2 '>
                        <Link to="/genres" className='p-0'>
                            <i class="bi bi-arrow-right-circle fs-1"></i>
                            View All</Link>
                    </div>

                </div>
            </div>
        </>
    )
}
