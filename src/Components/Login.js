import React from 'react'

export default function Login() {
    return (
        <div className='loginMain'>
            <div className='loginDiv my-auto'>
                <h2><span className='colorblue'>Welcome</span> Back</h2>
                <p className='colorgrey'>Please login to continue</p>
                <label for="fname">Email</label><br></br>
                <input className="formInput mb-2" type="text" id="fname" name="fname" /><br></br>
                <label for="fname">Password</label><br></br>
                <input className="formInput" type="password" id="fname" name="fname" />
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className='checkBox'/>
                <label for="vehicle1" className='colorgrey mx-2'> Remember me</label><br></br>
                <div className='loginSignup d-flex justify-content-between mt-4'>
                    <button className='formbtn login'>Login</button>
                    <button className='formbtn signup'>Signup</button>
                </div>
            </div>
        </div>
    )
}
