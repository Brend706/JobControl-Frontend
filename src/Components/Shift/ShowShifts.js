import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowShifts = () => {

    const [shifts, setShifts] = useState([])
    const [email, setEmail] = useState('')

    useEffect ( ()=> {
        getAllShifts()
    }, [])

    useEffect ( ()=> {
        const getEmail = async () => {
            const response = await axios.get(`${endpoint}/userid/${id}`)
            setEmail(response.data.email)
        }
        getEmail()
    }, [])

    const {id} = useParams() //el ID de usuario al que pertenecen los shifts

    const getAllShifts = async () => {
        const response = await axios.get(`${endpoint}/user-shifts/${id}`)
        setShifts(response.data)
    }

    const deleteShift = async (id) => {
       await axios.delete(`${endpoint}/shift/${id}`)
       getAllShifts()
       alert("Successfully Deleted !")
    }

  return (

    <div>
        
        <div className='mynavbar'>
            <Link to={`/create-shift/${id}`} className="link-btn">
                <button>Create new Shift</button>
            </Link>
            <nav className='title'>Your shifts</nav>
            <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
        </div>

        
        <div className='layout'>
        <Link to={`/home-jobcontrol/${email}`} className="back">Back</Link>
            <table className='table table-dark table-striped-columns'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    { shifts.map( (shift) => (
                        <tr key={shift.id}>
                            <td>{shift.date}</td>
                            <td>{shift.start_time}</td>
                            <td>{shift.end_time}</td>
                            <td >
                                <Link to={`/create-event/${shift.id}`} className='btn btn-info'>Create Event</Link>
                                <Link to={`/user-shift-events/${shift.id}`} className='btn btn-info'>View Events</Link>
                                <Link to={`/edit-shift/${shift.id}`} className='btn btn-info'>Edit</Link>
                                <button onClick={ ()=>deleteShift(shift.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}                
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowShifts