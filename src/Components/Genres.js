import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Genres(props) {
    const [genres, setGenres] = useState([])
    const [search, setSearch] = useState('')
    const getGenres = async (parameter) => {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US");
        const jsonData = await response.json();
        if (parameter==="") {
            setGenres(jsonData.genres)
        }
        else{
            setGenres(jsonData.genres.filter(checkMatch));
        }
        function checkMatch(str) {
            return str.name.toUpperCase().startsWith(parameter)
          }
        
    };
    
    const handleSearch=(e)=>{
        let check = e.target.value
        let str = check.toUpperCase()
        setSearch(e.target.value)
        getGenres(str)
        if (e.target.value==="") {
            getGenres("")
        }
    }
    useEffect(() => {
        getGenres("")
    }, [])
    return (
        <div className='genresMain'>
            <h1 className='text-light'>Genres</h1>
            <hr></hr>
            <div className='searchBarDiv m-2'>
                    <input type="value" className='searchBar genreSearch' value= {search} onChange={handleSearch} placeholder='Search' />
                </div>
            <div className='genresMainInner mt-4 d-flex align-items-center justify-content-center container '>
                {genres.map((element, index) => {
                
                        return <Link to={`/genres/${element.id}`}><div className='genresMainCard genreCard' key={index}>
                            {element.name}
                        </div>
                        </Link>
                        
                })}
            </div>
        </div>
    )
}
