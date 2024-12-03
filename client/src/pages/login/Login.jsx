import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [artistData, setArtistData] = useState({
    email: '',
    password: '',
  })

  const changeInputHandler = (e) => {
    setArtistData(prevState => {
      return {...prevState, [e.target.name]: e.target}
    })
  }

  return (
    <section className='login'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className="form-login">
          <p className='login-error-mgs'>Error msg</p>
          <input type='text' placeholder='Email' name='email' value={artistData.email} onChange={changeInputHandler} />
          <input type='password' placeholder='Password' name='password' value={artistData.password} onChange={changeInputHandler} />
          <button type='submit' className='btn'>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
      </div>
    </section>
  )
}

export default Login
