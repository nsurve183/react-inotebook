

import React, {useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/note/NoteContext'

const Login = () => {
  const onChange = (e) => {
    setCredential({ ...creadential, [e.target.name]: e.target.value })
  }



  const [creadential, setCredential] = useState({ email: "", password: "" })
  const navigate = useNavigate()

    // for shown Error Massage 
    const context = useContext(NoteContext)
    const {showAlert} = context

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: creadential.email, password: creadential.password })
    })
    const json = await resp.json()
    console.log(json)

    if (json.authtoken) {
      // redirect page
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      showAlert('Login Successfully', 'success')
    } else {
      showAlert("Pls Enter Valid Credentials", 'danger')
    }

  }
  return (
    <div>
      <div className="container mt-2">
        <h2 className='mb-3'>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={creadential.email} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password" onChange={onChange} value={creadential.password} required />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login
