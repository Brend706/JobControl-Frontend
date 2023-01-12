import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowEvents = () => {

    const {id} = useParams() //el ID del turno al que pertenecen los eventos

    const [events, setEvents] = useState([])
    const [date, setDate] = useState('')
    const [user_id, setId] = useState('')

    useEffect( () => {
        const getUserId = async () => {
            const response = await axios.get(`http://localhost:8000/api/shifts/${id}`)
            setId(response.data.user_id)
        }
        getUserId()
    }, [])

    useEffect( () =>{
        const getDate = async () => {
            const response = await axios.get(`${endpoint}/shifts/${id}`)
            setDate(response.data.date)
        }
        getDate()   
    }, [])

    useEffect ( ()=> {
        getAllEvents()
    }, [])

    const getAllEvents = async () => {
        const response = await axios.get(`${endpoint}/user-shift-events/${id}`)
        setEvents(response.data)
    }

    const deleteEvent = async (id) => {
       await axios.delete(`${endpoint}/event/${id}`)
       getAllEvents()
       alert("Successfully Deleted !")
    }


  return (

    <div>

        <div className='mynavbar'>
            <Link to={`/create-event/${id}`} className="link-btn">
                <button>Create new event</button>
            </Link>
            <nav className='title'>Shift: {date}</nav>
            <Link to={'/login-jobcontrol'} className="link-btn"><button>Log Out</button></Link>
        </div>

        <div className='layout'>
            <Link to={`/user-shifts/${user_id}`} className="back">Back</Link>
            <table className='table table-dark table-striped-columns'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    { events.map( (event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.start_time}</td>
                            <td>{event.end_time}</td>
                            <td>{event.status}</td>
                            <td>
                                <Link to={`/edit-event/${event.id}`} className='btn btn-info'>Edit</Link>
                                <button onClick={ ()=>deleteEvent(event.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}                
                </tbody>
            </table>
        </div>    
    </div>
  )
}

export default ShowEvents