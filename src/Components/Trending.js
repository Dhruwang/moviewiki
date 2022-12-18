import React, { useState, useEffect } from 'react'

export default function Hello() {
    const [trending, setTrending] = useState([])
    const imageUrl = "https://image.tmdb.org/t/p/original/94xxm5701CzOdJdUEdIuwqZaowx.jpg"

    const getTrendingMovies = async () => {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=b3506838d86a0332b82e597ec8d36406&total_results=4");
        const jsonData = await response.json();
        setTrending(jsonData.results)
        console.log(trending)
    };

    useEffect(() => {
        getTrendingMovies()
    }, [])

    return (
        <div className='trending'>
            <h2 className='mb-4'>Trending</h2>
            <div className='row d-flex align-items-center justify-content-between'>
                {trending.map((element, index) => {
                    while (index<4) {
                        return <div className='Trendcard col-md-2' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                    </div>
                    }
                    
                })}
                

                <div className='Trendcard viewAll col-md-2 '>
                    <i class="bi bi-arrow-right-circle fs-1"></i>
                    View All
                </div>
            </div>
        </div>
    )
}
