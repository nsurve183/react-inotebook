

import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const notesInitial = [];
  const [notes, setNotes] = useState([])

      const getUserNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchusernotes`, {
          method: "GET",
          headers: {
            "Content-Type": "aplication/json",
            "json-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhM2VhNjA3ODkwNDI2NDQ1NmVhMGIzIn0sImlhdCI6MTY4ODcyNzk2N30.tAgvP5rBCo5_lwoVxaz7g03487dM2cDfxsS9CiqJx6Y"
          }
        })
        const json = await response.json()
        console.log(json)
        setNotes(json)
      }


      // Add Notes Function
      const addNote = async (title, description, tags) => {
         // Api call
         const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "json-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhM2VhNjA3ODkwNDI2NDQ1NmVhMGIzIn0sImlhdCI6MTY4ODcyNzk2N30.tAgvP5rBCo5_lwoVxaz7g03487dM2cDfxsS9CiqJx6Y"
          },
          body: JSON.stringify({title, description, tags})
        })
        const addedNote = await response.json()
        console.log("added Note", addedNote)
      };




       //Delete Note Function
       const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "json-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhM2VhNjA3ODkwNDI2NDQ1NmVhMGIzIn0sImlhdCI6MTY4ODcyNzk2N30.tAgvP5rBCo5_lwoVxaz7g03487dM2cDfxsS9CiqJx6Y"
          }
        })
        const notedelete = await response.json()
        console.log(notedelete);
        const newNote = notes.filter((note) => {return note._id !== id})
        setNotes(newNote);
        // with the help fo filter method the match id data is deleted and not match data are still in database
       };




        // Edit Note Function
      const editNote = async (id, title, description, tags) => {
        // Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhM2VhNjA3ODkwNDI2NDQ1NmVhMGIzIn0sImlhdCI6MTY4ODcyNzk2N30.tAgvP5rBCo5_lwoVxaz7g03487dM2cDfxsS9CiqJx6Y"
          },
        })
        const json = await response.json()
        console.log(json)
        // edit note code
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tags = tags;
          }
        }
      };

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getUserNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;