import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/register'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    
    const register = async (e) => {

        let pass = document.getElementById('txtpass')
        let pass2 = document.getElementById('txtpass2')

        if(pass.value !== pass2.value){
            alert("Passwords don't match")
        }else{
            e.preventDefault();
            await axios.post(endpoint, { name: name, email: email, password: password})

            navigate(`/home-jobcontrol/${email}`);
            alert("registered user")
            console.log("... :3 ...")
        }
    }
    

    return(

        <div>
            <div className='mynavbar'>
                <nav className='title'>Welcome to Jobcontrol</nav>
                <Link to={'/login-jobcontrol'} className="link-btn"><button>Log In</button></Link>
            </div>
 
            <form onSubmit={register} className='myform'>
                <h3>Sign Up in Job Control</h3>
                <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" placeholder="Full name..."
                        value={name}
                        onChange={ (e)=> setName(e.target.value)}
                        className='form-control' required></input>
                </div>
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
                        value={password} id='txtpass'
                        onChange={ (e)=> setPassword(e.target.value)}
                        className='form-control' name='txtpass' required></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm your password</label>
                    <input type="password" placeholder="Confirm your password..."
                        className='form-control' id='txtpass2' name='txtpass2' required></input>
                </div>

                <button type='submit' className='btn btn-success'>Sign Up Now</button>
            </form>

        </div>

    )
}

export default Register