

import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000/api/"
    const getUserNotes = async () => {
      const response = await fetch(`notes/fetchusernotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application-json",
          "json-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhM2VhNjA3ODkwNDI2NDQ1NmVhMGIzIn0sImlhdCI6MTY4ODcyNzk2N30.tAgvP5rBCo5_lwoVxaz7g03487dM2cDfxsS9CiqJx6Y"
        }
      });
      const json = await response.json()
      setNotes(json);
    }

      const [notes, setNotes] = useState(getUserNotes)

      // Add Notes Function
      const addNote = (title, description, tags) => {
        console.log('adding a new note')
        const notedata =  {
          "_id": "64a5343e34533934193884f0ea5asdas",
          "user": "64a3ea6078904264456ea0a8",
          "title": title,
          "description": description,
          "tags": tags,
          "timestamp": "2023-07-05T09:56:04.146Z",
          "__v": 0
        }
        // notes use from state
        setNotes(notes.concat(notedata));
      };

       //Delete Note Function
       const deleteNote = (id) => {
        console.log("this id is deleted" + id);
        const newNote = notes.filter((note) => {return note._id !== id})
        setNotes(newNote);
        // with the help fo filter method the match id data is deleted and not match data are still in database
       };

        // Edit Note Function
      const editNote = () => {

      };

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;