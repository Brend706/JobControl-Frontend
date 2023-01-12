import './App.css';
import Register from './Components/Register'
import Login from './Components/Login';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ShowShifts from './Components/Shift/ShowShifts';
import EditShift from './Components/Shift/EditShift';
import CreateShift from './Components/Shift/CreateShift';
import ShowEvents from './Components/Event/ShowEvents';
import EditEvent from './Components/Event/EditEvent';
import CreateEvent from './Components/Event/CreateEvent';

function App() {
  return (
    <div >

      <BrowserRouter>
        <Routes>
      
        <Route path="/register-jobcontrol" element={<Register/>}/>
        <Route path="/login-jobcontrol" element={<Login/>}/>
        <Route path="/home-jobcontrol/:email" element={<Home/>}/> 

        <Route path="/user-shifts/:id" element={<ShowShifts/>}/> 
        <Route path="/edit-shift/:id" element={<EditShift/>}/>
        <Route path="/create-shift/:id" element={<CreateShift/>}/>

        <Route path="/user-shift-events/:id" element={<ShowEvents/>}/> 
        <Route path="/edit-event/:id" element={<EditEvent/>}/>
        <Route path="/create-event/:id" element={<CreateEvent/>}/>        

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
