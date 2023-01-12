import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/users/'

const ShowUser = () => {

    const [user_id, setId] = useState('')
    const [name, setName] = useState('')
    
    const {email} = useParams()

    useEffect( () =>{

        const getUserByEmail = async () => {
            const response = await axios.get(`${endpoint}${email}`)
            setId(response.data.id)
            setName(response.data.name)
        }
        getUserByEmail()
        
    }, [])
   
    return(

        <div>

            <div className='mynavbar'>
                <nav className='title'>{name}</nav>
                <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
            </div>

            <div className='home'>
                <div>
                    <h1>Welcome to JobControl!</h1>
                    <img src='https://static.vecteezy.com/system/resources/previews/009/797/482/non_2x/time-management-projects-and-deadlines-time-management-concept-planning-organization-working-time-time-organization-efficiency-schedule-job-project-team-flat-illustration-vector.jpg'></img>
                </div>

                <div className='form-btn'>
                <Link to={`/user-shifts/${user_id}`}>
                    <button>Show your shifts</button>
                </Link>
                <Link to={`/create-shift/${user_id}`} >
                    <button>Create new Shift</button>
                </Link>
                </div>
            </div>
            

        </div>

    )
}

export default ShowUser