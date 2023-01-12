import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/event/'

const EditEvent = () => {

    const {id} = useParams() //ID DEL Evento A MODIFICAR...

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [status, setStatus] = useState('')
    const [shift_id, setId] = useState('')

    useEffect( () => {
        const getShiftId = async () => {
            const response = await axios.get(`http://localhost:8000/api/events/${id}`)
            setId(response.data.shift_id)
        }
        getShiftId()
    }, [])

    const navigate = useNavigate()
    

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            name: name, description: description, start_time: start_time, end_time: end_time, status: status
        })
        navigate(`/user-shift-events/${shift_id}`)
    }

    useEffect( () =>{

        const getEventById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setName(response.data.name)
            setDescription(response.data.description)
            setStartTime(response.data.start_time)
            setEndTime(response.data.end_time)
            setStatus(response.data.status)
        }
        getEventById()
        
    }, [])


  return (
    <div>
        <div className='mynavbar'>
            <nav className='title'>Job Control</nav>
            <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
        </div>
        <form className='myform' onSubmit={update}>
        <div className='mb-3'>
            <h3>Edit your Event</h3>
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

            <button type='submit' className='btn btn-success'>Update</button>
            <Link to={`/user-shift-events/${shift_id}`} className="btn back">Back</Link>
        </form>
    </div>
  )
}

export default EditEvent