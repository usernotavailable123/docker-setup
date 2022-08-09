import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title:'',desc:''});
    const handleClick = (e) =>{
        e.preventDefault();
        //add notes to the state and reset the state
        addNote(note.title,note.desc);
        setNote({title:' ',desc:' '});
        props.showAlert('Updated Successfully','success');
    }
    const myStyle = {
        'width': '40vw',
        'marginLeft':'5vw',
        'marginTop':'3vw'
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <form className='container' style={myStyle}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" className='form-label'>Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} minLength={5} aria-describedby="emailHelp" placeholder="Enter Title" required/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className='form-label'>Desc</label>
            <input type="text" className="form-control" id="desc" name = 'desc' onChange={onChange} value = {note.desc} minLength = {5} aria-describedby="emailHelp" placeholder="Enter Description" required/>
        </div>
        <button disabled = {note.title.length<5 || note.desc.length<5 } onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default AddNote
