
import React, {useContext, useState} from 'react';
import NoteContext from '../context/note/NoteContext';

const AddNotes = () => {
const context = useContext(NoteContext);
// addNote function from stateContext js
const {addNote} = context

const [noteval, setNote] = useState({title: "", description: "", tags: ""})


const handleclick = (event) => {
    event.preventDefault(); 
    addNote(noteval.title, noteval.description, noteval.tags)
}

const onchange = (event) => {
    setNote({...noteval, [event.target.name]: event.target.value})
} 

  return (
    <div>
       <div className="container mt-4 my-4">
        <h2>Add Note</h2>
        <form>
            <div className="mb-3">
              <label htmlFor='title' className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} />
            </div>
            <div className="mb-3">
              <label htmlFor='description' className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name='description' onChange={onchange}/>
            </div>
            <div className="mb-3">
              <label htmlFor='tags' className="form-label">Tag</label>
              <input type="text" className="form-control" id="tags" name='tags' onChange={onchange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
          </form>
      </div>
    </div>
  )

}

export default AddNotes
