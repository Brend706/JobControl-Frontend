import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/login'

const Login= () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, { email: email, password: password})

        navigate(`/home-jobcontrol/${email}`);
        console.log("... :3 ...")
        }

    return(

        <div>
            <div className='mynavbar'>
                <nav className='title'>Welcome to Jobcontrol</nav>
                <Link to={'/register-jobcontrol'} className="link-btn"><button>Register Now</button></Link>
            </div>
                
            <form className='myform' onSubmit={login}>
                <h3>Log In Here</h3>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" placeholder="Email..."
                        value={email} 
                        onChange={ (e)=> setEmail(e.target.value)}
                        className='form-control' required></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" placeholder="Password..."
                        value={password} 
                        onChange={ (e)=> setPassword(e.target.value)}
                        className='form-control'></input>
                </div>

                <button type='submit' className='btn btn-success'>Log In</button>
            </form>

        </div>

    )
}

export default Login