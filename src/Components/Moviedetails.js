import React, { useState, useEffect } from 'react'
import Background from './Background'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
import Card from './Card'

export default function Moviedetails(props) {
    let url = window.location.href
    let count = 0
    let [movieDetails, setMovieDetails] = useState({})
    let [similarMovies, setSimilarMovies] = useState([])
    let [movieCast, setMovieCast] = useState([])
    let [backgroundLink, setbackgroundLink] = useState("")
    let [Idarr, setIdarr] = useState([0])
    let [reviews, setReviews] = useState([])
    let [movieTrialer, setMovieTrailer] = useState("")
    let [watchProviders, setWatchProviders] = useState([])
    const [favMovieId, setFavMovieId] = useState([])

    extractMovieId(url) // function to extract movieID from URL
    let movieId = url.substring(url.length - count, url.length)

    // function to re-render the page when a user clicks on similar movies 
    const handleReRender = () => {
        // changing Idarr[] so that useEffect runs again
        console.log("running")
        setIdarr([Idarr[0] + 1])
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
    const getCastDetails = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US`)
        const jsonData = await response.json();
        setMovieCast(jsonData.cast)
    }
    const getMovieReviews = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US`)
        const jsonData = await response.json();
        setReviews(jsonData.results)
        // console.log(reviews)
    }
    const getMovieTrailer = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US`)
        const jsonData = await response.json();
        jsonData.results.forEach(element => {
            if (element.type === "Trailer") {
                setMovieTrailer(element.key)
            }
        });

    }
    const getWatchProviders = async (movieId) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=b3506838d86a0332b82e597ec8d36406`)
        const jsonData = await response.json();
        setWatchProviders(jsonData.results.IN.rent)
        // console.log(jsonData.results.IN.flatrate)
    }

    useEffect(() => {
        getMovieDetails(movieId)
        getSimilarMovies(movieId)
        getMovieReviews(movieId)
        getMovieTrailer(movieId)
        getCastDetails(movieId)
        getWatchProviders(movieId)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, Idarr)



    return (
        <>
            <Background backgroundLink={movieDetails.backdrop_path} />
            <div className='movieDetails'>

                <img className="backdrop" src={`https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`}></img>
                <h1 className=' text-white my-4 d=flex'>{movieDetails.original_title}</h1>
                <div className='genreTagDiv'>
                    {(movieDetails.genres) && movieDetails.genres.map((element) => {
                        return <span className='genreTag '>{element.name}</span>
                    })}
                </div>

                <div className='movieDetailsInner'>
                    <div className='movieImgText d-flex'>

                        <div className='movieImageInnerLeft'>
                            <img classNme="movieImageInner" src={`https://image.tmdb.org/t/p/w185${movieDetails.poster_path}`}></img>
                        </div>
                        <div className='movieDetailsText'>
                            <div className='details'>
                                <span className='heading'>Overview :</span><span> {movieDetails.overview}</span>
                            </div>
                            <div className='details'>
                                <span className='heading'>Budget :</span><span> {movieDetails.budget === 0 ? "Na" : movieDetails.budget + "USD"} </span>
                            </div>
                            <div className='details'>
                                <span className='heading'>language :</span><span> {movieDetails.original_language}</span>
                            </div>
                            <div className='details'>
                                <span className='heading'>Runtime :</span><span> {movieDetails.runtime} min</span>
                            </div>
                            <div className='details'>
                                <span className='heading'>Release Date :</span><span> {movieDetails.release_date} </span>
                            </div>
                            <div className='details'>
                                <span className='heading'>Imdb ID :</span><span> {movieDetails.imdb_id} </span>
                            </div>
                            <div className='details'>
                                <span className='heading'>Status :</span><span> {movieDetails.status} </span>
                            </div>
                        </div>
                    </div>
                    <div className='trailerDiv'>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${movieTrialer}`} />
                    </div>
                    <div className='cast my-4'>
                        <h1 className='text-light fs-3 px-4'>Cast</h1>
                        <div className='trendContainer d-flex align-items-center justify-content-between px-2'>
                            {movieCast && movieCast.map((element, index) => {

                                return <Link ><div className='Trendcard castCard col-md-2' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w185${element.profile_path})` }}>
                                    <p className="castText">{element.original_name}<br></br>{element.character}</p>
                                </div></Link>

                            })}

                        </div>

                    </div>
                    <div className='cast my-4'>
                        <h1 className='text-light fs-3 px-4'>Available on</h1>
                        <div className='trendContainer d-flex px-2'>
                            {watchProviders && watchProviders.map((element, index) => {
                                return <div className='mx-2' key={index} >
                                    <img src={`https://image.tmdb.org/t/p/original${element.logo_path}`}></img>
                                </div>

                            })}

                        </div>

                    </div>
                    <div className='similarMovies my-4'>
                        <h1 className='text-light fs-3 px-4'>Similar Movies</h1>
                        <div className='trendContainer d-flex align-items-center justify-content-between px-2'>
                            {similarMovies && similarMovies.map((element, index) => {

                                return <div onClick={handleReRender}>
                                    <Card id={element.id} poster_path={element.poster_path} index={index} showAlert={props.showAlert} heartFill={favMovieId.includes(element.id) ? "-fill" : ""} />

                                </div>



                            })}

                        </div>

                    </div>
                    <div className='movieDetailReview'>
                        <h1 className='text-light fs-3 px-4'>Reviews</h1>
                        <div className='fs-5 mx-2 text-light'>{reviews && reviews.length === 0 ? "No reviews available" : ""}</div>
                        {reviews && reviews.map((element, index) => {

                            return <div className='reviewContainer' key={index}>
                                <div className='avatarAndUsername '>
                                    <div className='avatar'>
                                        <img src={element.author_details.avatar_path === "undefined" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvector-images%2Fimage-not-available.html&psig=AOvVaw1GeejIFr2C6DQJfl-XePeb&ust=1671713262764000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjDvq7fivwCFQAAAAAdAAAAABAE" : `https://image.tmdb.org/t/p/w300${element.author_details.avatar_path}`}></img>
                                    </div>
                                    <div className='username mx-4 fw-bolder'>
                                        {element.author_details.username}
                                    </div>
                                </div>
                                <div className='review my-4 ' id='review'>
                                    {element.content}
                                </div>
                            </div>


                        })}



                    </div>
                </div>

            </div>
        </>
    )
}
