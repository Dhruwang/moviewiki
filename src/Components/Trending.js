import React,{useState,useEffect} from 'react'
import "../App.css"
export default function Trending() {
    const [trending, setTrending] = useState([])
    const [page, setpage] = useState(1)

    const handlePrevClick=()=>{
        setpage(page-1)
        getTrendingMovies()
    }
    const handleNextClick=()=>{
        setpage(page+1)
        getTrendingMovies()
    }
    

    const getTrendingMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=b3506838d86a0332b82e597ec8d36406&page=${page}`);
        const jsonData = await response.json();
        setTrending(jsonData.results)
        console.log(trending)
    };

    useEffect(() => {
        getTrendingMovies()
    },page)
    return (
        <div className='trendingMain' id='trendingMain'>
            <h1 className='text-light'>Trending</h1>
            <hr></hr>
            <div className='row d-flex align-items-center justify-content-between'>
                {trending.map((element, index) => {
                        return <div className='Trendcard col-lg-3 col-xl-2 col-md-5 mx-1' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                        </div>
                })}
            </div>
            <div className='m-4 prevNext text-light fs-4'><a href='#trendingMain'><button className='prevNextBtn mx-4' disabled={page===1} onClick={handlePrevClick}>&larr;</button></a>   Page {page}   <a href='#trendingMain'><button className='prevNextBtn mx-4' onClick={handleNextClick}>&rarr;</button></a></div>
        </div>
    )
            
            }