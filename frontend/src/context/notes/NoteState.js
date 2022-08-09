import React, { useState } from 'react'
import NoteContext from './NoteContext';
const NoteState = (props) => {
  const host = "http://localhost:3030"
  const notesInitial = [];
  const getNotes = async () =>{
    console.log('getNotes')
    const response = await fetch(`${host}/crud/fetchalldata`,{
        method:'GET',
        headers:{
            'Content-Type' : 'application/json',
            'auth-token':localStorage.getItem('token')
        }
    });
    const json = await response.json();
    setNotes(json);
  }
  const [notes,setNotes] = useState(notesInitial);

  const addNote = async (title,body) =>{
    const response = await fetch(`${host}/crud/add`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,body})
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  const deleteNote = async (id) =>{
    const response = await fetch(`${host}/crud/delete/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
    })
    const json = await response.json();
    const newNotes = notes.filter((note) => {return note._id!==id});
    setNotes(newNotes);
  }
  const editNote = async (id,title,body) =>{
    const response = await fetch(`${host}/crud/update/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

        },
        body:JSON.stringify({title,body})
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    for(let index=0;index<newNotes.length;index++){
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].body = body;
          break;
        }
        
      }
      setNotes(newNotes);
  }
    return (
        <NoteContext.Provider value = {{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
