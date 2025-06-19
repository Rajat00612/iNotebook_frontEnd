import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
const host = 'https://inotebook-production-2fca.up.railway.app'

  const notesIntial =
    []
  const [notes, setNotes] = useState(notesIntial)
// Get all notes
    const getNotes = async() => {
    // todo api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
       
      });
   const json = await response.json();
    console.log(json)
    setNotes(json)
 
  }

  // Add a note 
const addNote = async (title, description, tag) => {
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ title, description, tag })
  });
  const note = await response.json();  // ✅ Use API response
  setNotes(notes.concat(note));
}

  // Delete a Note
  const deleteNote = async(id) => {
    // Todo api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        
      });
    const json = await response.json();

    // Logic for deletes

    setNotes(notes.filter(note => note._id !== id));
  };


  // Edit a Note
  const EditNote = async (id, description, title, tag) => {
    // Api Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
    const json = await response.json();

let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
       newNotes[index].title = title;
        newNotes[index].description = description;
       newNotes[index].tag = tag;



        break;
      }

    }
 
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, EditNote, deleteNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
