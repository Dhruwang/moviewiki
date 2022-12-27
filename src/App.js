import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './Components/Background';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Genres from './Components/Genres';
import Genrewise from './Components/Genrewise';
import Moviedetails from './Components/Moviedetails';
import Responsive from './Components/Responsive';
import SearchResults from './Components/SearchResults';
import NavIcon from './Components/NavIcon';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Favourites from './Components/Favourites';
import  Alert  from './Components/Alert';


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (type,message)=>{
    console.log("running")
    setAlert({
      message : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
    
  }



  return (
    <BrowserRouter>
    <div className='app'>
    <NavIcon />
      <Background />
      <Sidebar />
      <Responsive />
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        <Route exact path="/trending" element={<Trending showAlert={showAlert}/>} />
        <Route exact path="/genres" element={<Genres showAlert={showAlert}/>} />
        <Route exact path="/genres/:no" element={<Genrewise showAlert={showAlert}/>} />
        <Route exact path="/media/:no" element={<Moviedetails showAlert={showAlert}/>} />
        <Route exact path="/search" element={<SearchResults />} />
        <Route exact path="/favourites" element={<Favourites showAlert={showAlert}/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
