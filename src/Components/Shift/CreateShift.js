import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/shift'

const CreateShift = () => {

    const {id} = useParams() //ID de usuario al que le crearemos el turno...

    const [date, setDate] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [user_id, setUserId] = useState(id)
    const [email, setEmail] = useState('')
    
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, {
           date: date, start_time: start_time, end_time: end_time, user_id: user_id
        })
        navigate(`/user-shifts/${id}`)
    }

    useEffect ( ()=> {
        const getEmail = async () => {
            const response = await axios.get(`http://localhost:8000/api/userid/${id}`)
            setEmail(response.data.email)
        }
        getEmail()
    }, [])

  return (
    <div>

        <div className='mynavbar'>
            <nav className='title'>Job Control</nav>
            <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
        </div>
        
        <form className='myform' onSubmit={store}>
            <h2>Creat a new shift!</h2>
            <div className='mb-3'>
                <label className='form-label'>Date</label>
                <input 
                    value={date} 
                    onChange={ (e)=> setDate(e.target.value)}
                    type='date'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Start time</label>
                <input 
                    value={start_time} 
                    onChange={ (e)=> setStartTime(e.target.value)}
                    type='datetime-local'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>End time</label>
                <input 
                    value={end_time} 
                    onChange={ (e)=> setEndTime(e.target.value)}
                    type='datetime-local'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>user_id</label>
                <input disabled
                    value={user_id}
                    onChange={ (e)=> setUserId(e.target.value)}
                    type='number' 
                    className='form-control'
                />
            </div>

            <button type='submit' className='btn btn-success'>Save</button>
            <Link to={`/home-jobcontrol/${email}`} className="btn back">Back</Link>
        </form>
    </div>
  )
}

export default CreateShift