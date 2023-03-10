import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import "../App.css"
import Spinner from './Spinner';
import Card from './Card';

export default function Trending(props) {
    const [trending, setTrending] = useState([])
    let [page, setpage] = useState(1)
    const [filter,setFilter] = useState(['all','day'])
    const [favMovieId,setFavMovieId] = useState([])
    const host = 'https://moviewikiapi.onrender.com'


    const getFavMovieId = async () => {
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
        const response = await fetch(`https://api.themoviedb.org/3/trending/${filter[0]}/${filter[1]}?api_key=b3506838d86a0332b82e597ec8d36406&page=1`);
        const jsonData = await response.json();
        setTrending(trending.concat(jsonData.results))
    };
    
    useEffect(() => {
        getTrendingMovies()
        getFavMovieId()
    }, [filter])

    const handleTypeFilter = (e)=>{
        let initial_time = filter[1]
        
        setFilter([e.target.value,initial_time])
        setTrending([])
        getTrendingMovies()
        
    }
    const handleTimeFilter = (e)=>{
        let initial_type = filter[0]
        
        setFilter([initial_type,e.target.value])
        setTrending([])
        getTrendingMovies()
        
    }


    return (
        <div className='trendingMain' id='trendingMain'>
            <h1 className='text-light'>Trending</h1>
            
            <hr></hr>
            <div className='dropDowns  d-flex'>
                <div class="dropdown show ">
                    <a class="btn btn-secondary dropdown-toggle"   role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {filter[0]==='tv'?'series':filter[0]}
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button class="dropdown-item" value="all" onClick={handleTypeFilter} >All</button>
                        <button class="dropdown-item" value="movie" onClick={handleTypeFilter} >Movies</button>
                        <button class="dropdown-item" value="tv" onClick={handleTypeFilter}>Series</button>
                    </div>
                </div>
                <div class="dropdown show mx-4">
                    <a class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {filter[1]}
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
                <div className='trend-container d-flex align-items-center'>
                    {trending.map((element, index) => {
                        return <Card id={element.id} showAlert={props.showAlert} poster_path={element.poster_path} index={index} heartFill={favMovieId.includes(element.id)?"-fill":""}/>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )

}