import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import "../App.css"
import Spinner from './Spinner';

export default function Trending() {
    const [trending, setTrending] = useState([])
    let [page, setpage] = useState(1)
    const [filter,setFilter] = useState(['all','day'])

    const getMoreTrendingMovies = async () => {
        if (trending.length === 0) {
            setpage(1)
        }
        else {
            setpage(++page)
        }
        const response = await fetch(`https://api.themoviedb.org/3/trending/${filter[0]}/${filter[1]}?api_key=b3506838d86a0332b82e597ec8d36406&page=${page}`);
        const jsonData = await response.json();
        setTrending(trending.concat(jsonData.results))

    };
    const getTrendingMovies = async () => {
        console.log("running")
        const response = await fetch(`https://api.themoviedb.org/3/trending/${filter[0]}/${filter[1]}?api_key=b3506838d86a0332b82e597ec8d36406&page=1`);
        const jsonData = await response.json();
        setTrending(trending.concat(jsonData.results))
    };
    
    useEffect(() => {
        getTrendingMovies()
    }, [filter])

    const handleTypeFilter = (e)=>{
        let initial_type = filter[0]
        let initial_time = filter[1]
        
        setFilter([e.target.value,initial_time])
        setTrending([])
        getTrendingMovies()
        
    }
    const handleTimeFilter = (e)=>{
        let initial_type = filter[0]
        let initial_time = filter[1]
        
        setFilter([initial_type,e.target.value])
        setTrending([])
        getTrendingMovies()
        
    }


    return (
        <div className='trendingMain' id='trendingMain'>
            <h1 className='text-light'>Trending</h1>
            
            <hr></hr>
            <div className='dropDowns justify-content-center d-flex'>
                <div class="dropdown show mx-4">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Type
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button class="dropdown-item" value="all" onClick={handleTypeFilter} >All</button>
                        <button class="dropdown-item" value="movie" onClick={handleTypeFilter} >Movies</button>
                        <button class="dropdown-item" value="tv" onClick={handleTypeFilter}>Series</button>
                    </div>
                </div>
                <div class="dropdown show mx-4">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Time
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <button class="dropdown-item" value="day" onClick={handleTimeFilter} >Today</button>
                        <button class="dropdown-item" value="week" onClick={handleTimeFilter} >This Week</button>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={trending.length} //This is important field to render the next data
                next={getMoreTrendingMovies}
                hasMore={true}
                loader={<Spinner />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className='overflow-hidden row d-flex align-items-center justify-content-center'>
                    {trending.map((element, index) => {
                        return <div className='Trendcard col-lg-3 col-xl-2 col-md-5' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                        </div>
                    })}
                </div>
            </InfiniteScroll>
            {/* <div className='m-4 prevNext text-light fs-4'><a href='#trendingMain'><button className='prevNextBtn mx-4' disabled={page === 1} onClick={handlePrevClick}>&larr;</button></a>   Page {page}   <a href='#trendingMain'><button className='prevNextBtn mx-4' onClick={handleNextClick}>&rarr;</button></a></div> */}
        </div>
    )

}