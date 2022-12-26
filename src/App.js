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


function App() {

  const [favourites, setfavourites] = useState([])

  return (
    <BrowserRouter>
    <div className='app'>
    <NavIcon />
      <Background />
      <Sidebar />
      <Responsive />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/trending" element={<Trending />} />
        <Route exact path="/genres" element={<Genres />} />
        <Route exact path="/genres/:no" element={<Genrewise />} />
        <Route exact path="/media/:no" element={<Moviedetails />} />
        <Route exact path="/search" element={<SearchResults />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
