
import React, {useContext, useState} from 'react';
import NoteContext from '../context/note/NoteContext';

const AddNotes = () => {
const context = useContext(NoteContext);
// addNote function from stateContext js
const {addNote, showAlert, username} = context

const [noteval, setNote] = useState({title: "", description: "", tags: ""})


const handleclick = (e) => {
    e.preventDefault(); 
    addNote(noteval.title, noteval.description, noteval.tags)
    setNote({title: "", description: "", tags: ""})
    showAlert('Note Added Successfully', 'success')
}

const onchange = (event) => {
    setNote({...noteval, [event.target.name]: event.target.value})
} 

  return (
    <div>
       <div className="container mt-4 my-4">
        <h2>Welcome {username.name}</h2>
        <form>
        {/* In this form value attribute added after added note the form should be blank  */}
            <div className="mb-3">
              <label htmlFor='title' className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' value={noteval.title} aria-describedby="emailHelp" onChange={onchange} minLength={3} required/>
            </div>
            <div className="mb-3">
              <label htmlFor='description' className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name='description' value={noteval.description} onChange={onchange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor='tags' className="form-label">Tag</label>
              <input type="text" className="form-control" id="tags" name='tags' value={noteval.tags} onChange={onchange}/>
            </div>
            <button disabled={noteval.title.length <= 3 || noteval.description.length < 5 } type="submit" className="btn btn-primary" onClick={handleclick}>Add Notes</button>
          </form>
      </div>
    </div>
  )

}

export default AddNotes
