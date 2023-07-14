
import React, { useContext } from 'react'
import NoteContext from '../context/note/NoteContext'


const Alert = () => {
  const context = useContext(NoteContext)
  const { errorAlert } = context
  return (
    <>
    <div style={{height: '50px'}}>
    {errorAlert && <div className={`alert alert-${errorAlert.type} alert-dismissible fade show `} data-bs-dismiss="alert" role="alert">
        <strong>{errorAlert.massage}</strong> 
      </div>} 
    </div>
    </>
  )
}

export default Alert
