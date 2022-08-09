import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import { useNavigate } from 'react-router-dom';
import NoteContext from "../context/notes/NoteContext";

const Notes = (props) => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id:"",etitle: "", ebody: "" })
    const handleClick = (e) => {
      editNote(note.id,note.etitle,note.ebody)
      refClose.current.click();
      props.showAlert("Updated Successfully","success")
    }
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();// //use navigate hook to redirect
  
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }else{
        navigate('/login');
      }
      //eslint-disable-next-line
    }, []);
    
    const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title,ebody:currentNote.body});
      console.log('updateNote',currentNote);

      // props.showAlert("Updated Successfully","success")
    };
  return (
    <>
    <AddNote showAlert={props.showAlert} />
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Note
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="my-3">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input type="text" className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  value={note.etitle}
                  onChange={onChange}
                  minLength={5}
                  required
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ebody"
                  name="ebody"
                  value={note.ebody}
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>
                Submit
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button onClick={handleClick} type="button" className="btn btn-primary">
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>


    <div className="container row my-3" style={{'marginLeft':'5vw'}}>
      <h2>Your Notes</h2>
      <div className="container">
        {notes.length ===0 && 'No notes to display'}
      </div>
      {notes.map((note) => {
        return (
          <Noteitem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert} />
        );
      })}
    </div>
  </>
  )
}

export default Notes


