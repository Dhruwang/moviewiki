import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './Components/Background';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Genres from './Components/Genres';
import Genrewise from './Components/Genrewise';
import { useState } from 'react';


function App() {
  const [genreid, setgenreid] = useState(0)
  const handleGenreSelect=(e)=>{
    console(e.target.value)
    setgenreid(e.target.value)
}
  return (
    <BrowserRouter>
      <Background />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/trending" element={<Trending />} />
        <Route exact path="/genres" element={<Genres handleGenreSelect={handleGenreSelect}/>} />
        <Route exact path="/genres/:no" element={<Genrewise genreid={genreid}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
