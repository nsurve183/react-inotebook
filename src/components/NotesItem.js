import React, {useContext} from 'react';
import NoteContext from '../context/note/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {Notes} = props
    return ( 
        <>
                <div className="col-md-4 mb-4">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{Notes.title}</h5>
                    <p className="card-text">{Notes.description}</p>
                    <p className="card-text">{Notes.tags}</p>
                    <i className="fa-solid fa-trash-can" onClick={() => deleteNote(Notes._id)}></i>
                    <i className="fa-solid fa-pen-to-square ms-3"></i>
                </div>
            </div>
                </div>
        </>
    )
}

export default NotesItem