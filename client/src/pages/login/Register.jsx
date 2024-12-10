import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [artistData, setArtistData] = useState({
    name: '',
    surname: '',
    email: '',
    bio: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const changeInputHandler = (e) => {
    console.log(e);
    
    setArtistData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerArtist = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/artists/register`, artistData);
      const newArtist = await response.data;
      console.log(newArtist);

      if(!newArtist){
        setError("Could not register artist. Please try again")
      }

      navigate('/login')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className="form-register" onSubmit={registerArtist}>
          {error && <p className='form-error-mgs'>{error}</p>}
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
