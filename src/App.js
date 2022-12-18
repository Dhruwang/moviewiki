import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from './Components/Background';
import Home from './Components/Home';


function App() {
  return (
    <BrowserRouter>
    <div className='d-flex'>
      <Background />
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
