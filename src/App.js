import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './Components/Background';
import Home from './Components/Home';
import Trending from './Components/Trending';


function App() {
  return (
    <BrowserRouter>
      <Background />
      <Sidebar />
      <Home />
      <Trending />
    </BrowserRouter>
  );
}

export default App;
