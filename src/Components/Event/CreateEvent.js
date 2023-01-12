import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/event'

const CreateEvent = () => {

    const {id} = useParams() //ID del turno al que le crearemos el evento...

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [status, setStatus] = useState('')
    const [shift_id, setShiftId] = useState(id)
    const [user_id, setId] = useState('')

    useEffect( () => {
        const getUserId = async () => {
            const response = await axios.get(`http://localhost:8000/api/shifts/${id}`)
            setId(response.data.user_id)
        }
        getUserId()
    }, [])

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, {
            name: name, description: description, start_time: start_time, end_time: end_time, status: status, shift_id: shift_id
        })
        navigate(`/user-shift-events/${id}`)
    }

  return (
    <div>
        <div className='mynavbar'>
            <nav className='title'>Job Control</nav>
            <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
        </div>
        
        <form className='myform' onSubmit={store}>
            <h3>Creat a new event!</h3>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input 
                    value={name} 
                    onChange={ (e)=> setName(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input 
                    value={description} 
                    onChange={ (e)=> setDescription(e.target.value)}
                    type='text'
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
                <label className='form-label'>Status</label>
                <input 
                    value={status} 
                    onChange={ (e)=> setStatus(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>shift_id</label>
                <input disabled
                    value={shift_id} 
                    onChange={ (e)=> setShiftId(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>

            <button type='submit' className='btn btn-success'>Save</button>
            <Link to={`/user-shifts/${user_id}`} className="btn back">Back</Link>
        </form>
    </div>
  )
}

export default CreateEvent