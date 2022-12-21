import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './Components/Background';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Genres from './Components/Genres';
import Genrewise from './Components/Genrewise';
import { useState } from 'react';
import Moviedetails from './Components/Moviedetails';
import Responsive from './Components/Responsive';
import SearchResults from './Components/SearchResults';
import NavIcon from './Components/NavIcon';


function App() {

  return (
    <BrowserRouter>
    <NavIcon />
      <Background />
      <Sidebar />
      <Responsive />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/trending" element={<Trending />} />
        <Route exact path="/genres" element={<Genres />} />
        <Route exact path="/genres/:no" element={<Genrewise />} />
        <Route exact path="/media/:no" element={<Moviedetails />} />
        <Route exact path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
