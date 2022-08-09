import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Notes from './components/Notes';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';
import Alert from './components/Alert';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() =>{
      setAlert(null);
    },1500)
  }
  return (
    <div className="App">
      <NoteState>
        <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
            <Routes>
              {/* <Route path = "/" element = {</>} */}
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path = "/notes" element = {<Notes showAlert={showAlert}/>}/>
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
      
    </div>
  );
}

export default App;
