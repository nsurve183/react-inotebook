
import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext';



const Signup = () => {

   // for shown Error Massage 
   const context = useContext(NoteContext);
   const {showAlert} = context


  const onChange = (e) => {
    setCredential({ ...creadential, [e.target.name]: e.target.value })
  }
  
  const [creadential, setCredential] = useState({name: '', email: "", password: "", cpassword: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: creadential.name, email: creadential.email, password: creadential.password })
    })

    const json = await resp.json()
    console.log(json)

    if (json.authtoken) {
      // redirect page
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      showAlert('Successfully Signup', 'success')

    } else {
      showAlert('Pls Enter Valid Detailes', 'danger')
    }
  }
  return (
    <div>
      <div className="container mt-2">
      <h2 className='mb-3'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">User Name</label>
            <input type="name" className="form-control" id="name" value={creadential.name} name='name' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' id="email" value={creadential.email}  onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password"  onChange={onChange} value={creadential.password} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='cpassword' id="cpassword"  onChange={onChange} value={creadential.cpassword} />
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
