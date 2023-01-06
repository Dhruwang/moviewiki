import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';

export default function Signup(props) {
    const [credentials, setCredentials] = useState({username:"",email:"",password:"",cpassword:""})
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate();
    const host = 'https://moviewikiapi.onrender.com'
    const goToLogin=()=>{
        Navigate("/login")
    }
    const onChange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
    const handleSubmit= async (e)=>{
        setLoading(true)
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.username, email:credentials.email, password:credentials.password})
    
          });
          const json = await response.json()
          console.log(json.error)
          setLoading(false)
          if(json.success){
            localStorage.setItem('token',json.token)
            Navigate("/")
            props.showAlert("success","Account created")

          }
          else{
            if(json.error==="sorry user with same email already exist"){
                props.showAlert("danger","user already exist")
            }
            else{
                  props.showAlert("danger","invalid details")
            }
          
          }
    }
    return (
        <div className='loginMain'>
            <Link to="/"><h1 className='text-light'>MovieWiki</h1></Link>
            <div className='loginDiv my-auto'>
                <h2><span className='colorblue'>Create</span> Account</h2>
                <p className='colorgrey'>Please fill the details to continue</p>
                <form onSubmit={handleSubmit}>

                <label for="fname">Username</label><br></br>
                <input className="formInput mb-2" type="text" onChange={onChange} value={credentials.username} id="username" name="username" /><br></br>

                <label for="fname">Email</label><br></br>
                <input className="formInput mb-2" type="email" onChange={onChange} value={credentials.email} id="email" name="email" /><br></br>

                <label for="fname">Password</label><br></br>
                <input className="formInput" type="password" onChange={onChange} value={credentials.password} id="password" name="password" />

                <label for="fname">Confirm Password</label><br></br>
                <input className="formInput" type="password" onChange={onChange} value={credentials.cpassword} id="cpassword" name="cpassword" />

                <div className='loginSignup d-flex justify-content-between mt-4'>
                    <button className={`formbtn login`}>{loading?"please wait":"SignUp"}</button>

                    <button className='formbtn signup' onClick={goToLogin}>Login</button>
                    
                </div>
                </form>
            </div>
        </div>
    )
}
