import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [artistData, setArtistData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
  })
  
  const changeInputHandler = (e) => {
    console.log(e);
    
    setArtistData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className="form-register">
          <p className='form-error-mgs'>Error msg</p>
          <input type='text' placeholder='Name' name='name' value={artistData.name} onChange={changeInputHandler} autoFocus/>
          <input type='text' placeholder='Surname' name='surname' value={artistData.surname} onChange={changeInputHandler} />
          <input type='text' placeholder='Email' name='email' value={artistData.email} onChange={changeInputHandler} />
          <input type='password' placeholder='Password' name='password' value={artistData.password} onChange={changeInputHandler} />
          <input type='password' placeholder='Confirm password' name='password2' value={artistData.password2} onChange={changeInputHandler} />
          <button type='submit' className='btn'>Register</button>
        </form>
        <p>Already have an account? <Link to='/login'>Sign in</Link></p>
      </div>
    </section>
  )
}

export default Register
