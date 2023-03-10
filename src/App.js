import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Routes, Route,ScrollRestoration } from "react-router-dom";
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
import { useState,useEffect } from 'react';
import Favourites from './Components/Favourites';
import  Alert  from './Components/Alert';
import Aisearch from "./Components/Aisearch"
import Footer from './Components/Footer';


function App() {
  let [alert, setAlert] = useState(null)
  const [username, setusername] = useState("")
    const host = 'http://localhost:5000'

  const getUserName= async ()=>{
    if(localStorage.getItem('token')){
      const response = await fetch(`${host}/api/auth/getusername`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token" :localStorage.getItem('token')
        },

      });
      const text = await response.text()
        setusername(text)
    }
           
  }

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
  useEffect(() => {
    getUserName()
  }, [])
  



  return (
    <BrowserRouter>
    <div className='app'>
    <NavIcon />
      <Background />
      <Sidebar username={username} />
      <Responsive />
      <Alert alert = {alert}  />
      <Routes>
        <Route exact path="/" element={<Home getUserName={getUserName} showAlert={showAlert}/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        <Route exact path="/trending" element={<Trending showAlert={showAlert}/>} />
        <Route exact path="/genres" element={<Genres showAlert={showAlert}/>} />
        <Route exact path="/genres/:no" element={<Genrewise showAlert={showAlert}/>} />
        <Route exact path="/media/:no" element={<Moviedetails showAlert={showAlert}/>} />
        <Route exact path="/search" element={<SearchResults showAlert={showAlert}/>} />
        <Route exact path="/favourites" element={<Favourites showAlert={showAlert}/>} />
        <Route exact path="/aisearch" element={<Aisearch showAlert={showAlert}/>} />
        
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
