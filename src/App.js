import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './Components/Background';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Genres from './Components/Genres';


function App() {
  return (
    <BrowserRouter>
      <Background />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/trending" element={<Trending />} />
        <Route exact path="/genres" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
