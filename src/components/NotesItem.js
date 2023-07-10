import React, { useContext } from 'react';
import NoteContext from '../context/note/NoteContext';

const NotesItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { NotesData, updateNote } = props
    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{NotesData.title}</h5>
                        <p className="card-text">{NotesData.description}</p>
                        <p className="card-text">{NotesData.tags}</p>
                        <i className="fa-solid fa-trash-can" onClick={() => deleteNote(NotesData._id)}></i>
                        <i className="fa-solid fa-pen-to-square ms-3" onClick={() => { updateNote(NotesData) }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesItem