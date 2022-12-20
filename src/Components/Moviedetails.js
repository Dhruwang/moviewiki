import React, { useState, useEffect } from 'react'
import Background from './Background'

export default function Moviedetails() {
    let url = window.location.href
    let count = 0
    let [movieDetails, setMovieDetails] = useState({})
    let [backgroundLink, setbackgroundLink] = useState("")
    extractMovieId(url) // function to extract movieID from URL
    let movieId = url.substring(url.length - count, url.length)

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

    useEffect(() => {
        getMovieDetails(movieId)
    }, [])



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
                    <div className='movieImageInnerLeft'>
                        <img classNme="movieImageInner" src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}></img>
                    </div>
                    <div className='movieDetailsText'>
                        <div className='details my-2'>
                            <span className='heading'>Overview :</span><span> {movieDetails.overview}</span>
                        </div>
                        <div className='details my-2'>
                            <span className='heading'>Budget :</span><span> {movieDetails.budget===0? "Na":movieDetails.budget + "USD"} </span>
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

            </div>
        </>
    )
}
