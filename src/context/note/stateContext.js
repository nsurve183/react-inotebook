

import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  
  const [notes, setNotes] = useState([])


  const [errorAlert, setErrorAlert] = useState({})
  const [username, setusername] = useState({})

  let showAlert = (msg, type) => {
      setErrorAlert({
        massage: msg,
        type: type
      })
  }

  const getUserNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchusernotes`, {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
        "json-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    console.log("getUserNote", json)
    setNotes(json)
  }


  const getUserData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
        "json-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setusername(json)
  }
  


  // Add Notes Function
  const addNote = async (title, description, tags) => {
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "json-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    })
    const note = await response.json()
    setNotes(notes.concat(note))
    // console.log("added Note", note)
  };




  //Delete Note Function
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "json-token": localStorage.getItem('token')
      }
    })
    const notedelete = await response.json()
    console.log(notedelete);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
    showAlert('Note deleted Successfully', 'success')
    // with the help fo filter method the match id data is deleted and not match data are still in database
  };




  // Edit Note Function
  const editNote = async (id, title, description, tags) => {
    // Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "json-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tags })
    })
    const json = await response.json()
    console.log("editNote", json)

    let newNote = JSON.parse(JSON.stringify(notes))
    // edit note code
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tags = tags;
        break;
      }
    }
    setNotes(newNote);
    console.log("editnote2", newNote)
  };



  // alert massage


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getUserNotes, errorAlert, showAlert, username, getUserData}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;