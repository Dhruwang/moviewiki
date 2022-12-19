import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

export default function Home() {
    const [trending, setTrending] = useState([])
    const [genres, setGenres] = useState([])

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


    useEffect(() => {
        getTrendingMovies()
        getGenres()
    }, [])
    return (
        <>
            <div className='home'>
                <h1 className='text-light mt-2'>Welcome to MovieWiki</h1>
                <div className='searchBarDiv m-2'>
                    <input type="value" className='searchBar' placeholder='Search' />
                </div>

                <Carousel>
                    <Carousel.Item interval={4000}>
                        <img
                            className="d-block w-100"
                            src="https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersinfinitywar_lob_mas_hlf_01_3.jpg"
                            alt="Image One"
                        />
                        <Carousel.Caption>
                            <h3>lightyear</h3>
                            <p>Adventure</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <img
                            className="d-block w-100"
                            src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2022/06/lightyear-movie-review-out-02.jpg"
                            alt="Image Two"
                        />
                        <Carousel.Caption>
                            <h3>lightyear</h3>
                            <p>Adventure</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='trending'>
                <h2 className='mb-4'>Trending</h2>
                <div className='row d-flex align-items-center justify-content-between'>
                    {trending.map((element, index) => {
                        while (index < 4) {
                            return <div className='Trendcard col-md-2' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                            </div>
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
                <div className='row d-flex align-items-center justify-content-between'>
                     {genres.map((element, index) => {
                        while (index < 4) {
                            return <div className='col-md-2 genreCard' key={index}>
                                {element.name}
                            </div>
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
