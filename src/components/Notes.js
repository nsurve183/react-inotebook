


import React, { useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/note/NoteContext';
import NotesItem from './NotesItem';
import AddNotes from './AddNotes';

const Notes = () => {
  const context = useContext(NoteContext);
  // console.log('Notes.js Comp', context)
  const { notes, getUserNotes } = context

  useEffect(() => {
    getUserNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Modal box for update
  const [noteval, setNote] = useState({etitle: "", edescription: "", etags: ""})
  // for open modal box with the help of javascript
  const ref = useRef(null);

  const updateNote = (currentNote) => {
    // understand ref hook from videoes
    ref.current.click();
    setNote({etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags})
  }

  const handleclick = (e) => {
    e.preventDefault(); 
    console.log('updated note', noteval)
}

  const onchange = (event) => {
    setNote({...noteval, [event.target.name]: event.target.value})
} 

  return (
    <div>
      <AddNotes />

      {/* model box */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {/* model body */}
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor='etitle' className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={noteval.etitle} name='etitle' onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor='edescription' className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={noteval.edescription} name='edescription' onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor='etags' className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etags" value={noteval.etags} name='etags' onChange={onchange} />
                </div>
              </form>
            </div>
             {/* model body */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
       {/* model box */}

      <div className="row">
        <h2>Your Note</h2>
        {/* Notes prop use in the NotesItem Componenet */}
        {notes.map((note) => {
          return <NotesItem key={note._id} updateNote={updateNote} NotesData={note} />
        })}
      </div>
    </div>
  )
}

export default Notes;
