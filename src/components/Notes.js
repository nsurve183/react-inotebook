

import React, { useContext } from 'react'
import NoteContext from '../context/note/NoteContext';
import NotesItem from './NotesItem';
import AddNotes from './AddNotes';

const Notes = () => {
    const context = useContext(NoteContext);
    // console.log('Notes.js Comp', context)
    const {notes} = context
  return (
    <div>
       <AddNotes/>
       <div className="row">
      <h2>Your Note</h2>
      {/* Notes prop use in the NotesItem Componenet */}
        {notes.map((note) => {
         return <NotesItem key={note._id} Notes={note}/>
        })}
      </div>
    </div>
  )
}

export default Notes;
