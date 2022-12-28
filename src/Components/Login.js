import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const host = 'http://localhost:5000'
    const [credentials, setcredentials] = useState({email:"",password:""})
    const Navigate = useNavigate()

    // window.location.reload()
    const goToSignup=()=>{
        Navigate("/signup")
    }

    const handleSubmit= async (e)=>{
        console.log("submitted")
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
    
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            props.showAlert("success", "Logged in")
            localStorage.setItem('token',json.token)
            Navigate("/")
          }
          else{
            props.showAlert("danger", "Invalid credentials")
          }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
      }
      useEffect(() => {
    //    window.location.reload()
      },[])
      

    return (
        <div className='loginMain'>
            <div className='loginDiv my-auto'>

                <h2><span className='colorblue'>Welcome</span> Back</h2>
                <p className='colorgrey'>Please login to continue</p>
                <form onSubmit={handleSubmit}>
                <label for="fname">Email</label><br></br>
                <input className="formInput mb-2" value={credentials.email} onChange={onChange} type="email" id="email" name="email" /><br></br>

                <label for="fname">Password</label><br></br>
                <input className="formInput" type="password"  value={credentials.password} onChange={onChange} id="password" name="password" />

                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className='checkBox'/>
                <label for="vehicle1" className='colorgrey mx-2'> Remember me</label><br></br>

                <div className='loginSignup d-flex justify-content-between mt-4'>
                    <button type="submit" className='formbtn login'>Login</button>
                    <button className='formbtn signup' onClick={goToSignup}>Signup</button>
                </div>
                </form>

            </div>
        </div>
    )
}
