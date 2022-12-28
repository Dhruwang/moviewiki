import React,{useState,useEffect} from 'react'
import Card from './Card'

export default function SearchResults(props) {
    let [searchValue, setSearchValue] = useState("")
    let [searchValueArr, setSearchValueArr] = useState([])
    const [favMovieId,setFavMovieId] = useState([])
    const host = 'http://localhost:5000'


    const handleSearch= async ()=>{
        console.log("submitted")
        const response = await fetch(`${host}/api/auth/aisearch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({search:"suggest some movie for business"})
    
          });
          const json = await response.text()
          console.log(json)
          }
    

    const handleOnChange=(e)=>{
        setSearchValue(e.target.value)
    }
    const getFavMovieId = async () => {
        if(localStorage.getItem('token')){
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
        
      }
      useEffect(() => {
        getFavMovieId()
      handleSearch()
      },[] )
      
    
  return (
    <div className='searchResults'>
        <div className='searchBarDiv'>
                    <input type="value" className='searchBar' value={searchValue} onChange={handleOnChange} onInput={handleSearch} placeholder='Search' autoFocus/>
                </div>
                <div className='trend-container d-flex align-items-center'>
                <h1 className='my-4 text-light'>{searchValueArr && searchValueArr.length===0?"Search for movies,series ":""}</h1>
                
                    {searchValueArr && searchValueArr.filter(element => element.poster_path!==null).map((element, index) => {
                        return <Card id={element.id} showAlert={props.showAlert} poster_path={element.poster_path} index={index} heartFill={favMovieId.includes(element.id)?"-fill":""}/>
                        // return <Link to={`/media/${element.id}`}><div className='Trendcard col-lg-3 col-xl-2 col-md-5' key={index} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${element.poster_path})` }}>
                        // </div></Link>
                    })}
                </div>
    </div>
  )
}
