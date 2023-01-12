import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/shift/'

const EditShift = () => {

    const {id} = useParams() //ID DEL TURNO A MODIFICAR...
    const [date, setDt] = useState('')
    const [user_id, setId] = useState('')

    useEffect( () => {
        const getFecha = async () => {
            const response = await axios.get(`http://localhost:8000/api/shifts/${id}`)
            setDt(response.data.date)
            setId(response.data.user_id)
        }
        getFecha()
    }, [])

    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')

    const navigate = useNavigate()
    
    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            date: date,
            start_time: start_time,
            end_time: end_time,
        })
        navigate(`/user-shifts/${user_id}`)
        alert("Update Shift!")
    }

    useEffect( () =>{

        const getShiftById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setDt(response.data.date)
            setStartTime(response.data.start_time)
            setEndTime(response.data.end_time)
        }
        getShiftById()
        
    }, [])

    

  return (
    <div>
        <div className='mynavbar'>
            <nav className='title'>Job Control</nav>
            <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
        </div>

        
        <form className='myform' onSubmit={update}>
            <h3>Edit your Shift</h3>
            <div className='mb-3'>
                <label className='form-label'>Date</label>
                <input 
                    value={date}
                    onChange={ (e)=> setDt(e.target.value)}
                    disabled 
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>Start Time</label>
                <input 
                    value={start_time} 
                    onChange={ (e)=> setStartTime(e.target.value)}
                    type='datetime-local'
                    className='form-control'
                />
            </div>

            <div className='mb-3'>
                <label className='form-label'>End Time</label>
                <input 
                    value={end_time} 
                    onChange={ (e)=> setEndTime(e.target.value)}
                    type='datetime-local'
                    className='form-control'
                />
            </div>

            <button type='submit' className='btn btn-success'>Update</button>
            <Link to={`/user-shifts/${user_id}`} className="btn back">Back</Link>
        </form>
    </div>
  )
}

export default EditShift