import React, { useState, useEffect } from 'react'
import Background from './Background'
import { Link } from 'react-router-dom'

export default function Moviedetails() {
    let url = window.location.href
    let count = 0
    let [movieDetails, setMovieDetails] = useState({})
    let [similarMovies, setSimilarMovies] = useState([])
    let [backgroundLink, setbackgroundLink] = useState("")
    let [Idarr, setIdarr] = useState([0])
    extractMovieId(url) // function to extract movieID from URL
    let movieId = url.substring(url.length - count, url.length)

    // function to re-render the page when a user clicks on similar movies 
    const handleReRender=()=>{
        // changing Idarr[] so that useEffect runs again
        setIdarr([Idarr[0]+1])
    }
    function extractMovieId(url) {
        for (let index = url.length - 1; index > 0; index--) {
            if (url[index] !== "/") {
                count++;
                continue
            }
            break
        }
    }

    // function to fetch movie details
    const getMovieDetails = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US`)
        const jsonData = await response.json();
        setMovieDetails({ ...movieDetails, ...jsonData })
        setbackgroundLink(movieDetails.backdrop_path)
    }
    const getSimilarMovies = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US`)
        const jsonData = await response.json();
        setSimilarMovies(jsonData.results)
    }

    useEffect(() => {
        getMovieDetails(movieId)
        getSimilarMovies(movieId)
    },Idarr)



    return (
        <>
            <Background backgroundLink={movieDetails.backdrop_path} />
            <div className='movieDetails'>

                <img src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}></img>
                <h1 className='text-white my-4'>{movieDetails.original_title}</h1>
                {(movieDetails.genres) && movieDetails.genres.map((element) => {
                    return <span className='genreTag '>{element.name}</span>
                })}
                <div className='movieDetailsInner'>
                    <div className='movieImgText d-flex'>

                        <div className='movieImageInnerLeft'>
                            <img classNme="movieImageInner" src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}></img>
                        </div>
                        <div className='movieDetailsText'>
                            <div className='details my-2'>
                                <span className='heading'>Overview :</span><span> {movieDetails.overview}</span>
                            </div>
                            <div className='details my-2'>
                                <span className='heading'>Budget :</span><span> {movieDetails.budget === 0 ? "Na" : movieDetails.budget + "USD"} </span>
                            </div>
                            <div className='details my-2'>
                                <span className='heading'>language :</span><span> {movieDetails.original_language}</span>
                            </div>
                            <div className='details my-2'>
                                <span className='heading'>Runtime :</span><span> {movieDetails.runtime} min</span>
                            </div>
                            <div className='details my-2'>
                                <span className='heading'>Release Date :</span><span> {movieDetails.release_date} </span>
                            </div>
                            <div className='details my-2'>
                                <span className='heading'>Imdb ID :</span><span> {movieDetails.imdb_id} </span>
                            </div>
                            <div className='details my-2'>
                                <span className='heading'>Status :</span><span> {movieDetails.status} </span>
                            </div>
                        </div>
                    </div>
                    <div className='similarMovies my-4'>
                        <h1 className='text-light fs-3'>Similar Movies</h1>
                        <div className='trendContainer d-flex align-items-center justify-content-between'>
                            {similarMovies && similarMovies.map((element, index) => {

                                return <Link to={`/media/${element.id}`}  onClick={handleReRender}><div className='Trendcard col-md-2' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                                </div></Link>

                            })}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
