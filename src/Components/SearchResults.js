import React,{useState} from 'react'
import { Link } from 'react-router-dom'

export default function SearchResults() {
    let [searchValue, setSearchValue] = useState("")
    let [searchValueArr, setSearchValueArr] = useState([])

    const searchMedia=async(search)=>{
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=b3506838d86a0332b82e597ec8d36406&language=en-US&query=${search}&page=1&include_adult=false`)
        const jsonData = await response.json();
        setSearchValueArr(jsonData.results)
    }

    const handleOnChange=(e)=>{
        setSearchValue(e.target.value)
        searchMedia(e.target.value)
    }
    
  return (
    <div className='searchResults'>
        <div className='searchBarDiv'>
                    <input type="value" className='searchBar' value={searchValue} onChange={handleOnChange} placeholder='Search' autoFocus/>
                </div>
                <div className='trend-container d-flex align-items-center'>
                <h1 className='my-4 text-light'>{searchValueArr && searchValueArr.length===0?"Search for movies,series ":""}</h1>
                
                    {searchValueArr && searchValueArr.filter(element => element.poster_path!==null).map((element, index) => {
                        return <Link to={`/media/${element.id}`}><div className='Trendcard col-lg-3 col-xl-2 col-md-5' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${element.poster_path})` }}>
                        </div></Link>
                    })}
                </div>
    </div>
  )
}
