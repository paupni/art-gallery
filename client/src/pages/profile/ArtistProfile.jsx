import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/1.jpg'
import { FaEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'

const ArtistProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')


  return (
    <section className='artist-profile'>
      <div>
        <Link to={`/myposts/aaa`} className='btn'>My posts</Link>
        <div className='artist-profile-details'>
          <div className='artist-profile-avatar'>
            <img src={Avatar} alt='' />
          </div>
          <form>
            <input type='file' name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
            <label htmlFor='avatar'><FaEdit/></label>
          </form>
          <button className='btn'><FaCheck/></button>
        </div>
        <h1>Jane Doe</h1>
        <form>
          <p class='form-error-mgs'>Error msg</p>
          <input type='text' placeholder='Name' name='name' value={name} onChange={e => setName(e.target.value)} autoFocus/>
          <input type='text' placeholder='Surame' name='surname' value={surname} onChange={e => setSurname(e.target.value)} />
          <input type='text' placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
          <input type='password' placeholder='Current Password' name='currentPassword' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          <input type='password' placeholder='New Password' name='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <input type='password' placeholder='Confirm New Password' name='confirmNewPassword' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
          <button type='submit' className='btn'>Update details</button>
        </form>
      </div>
    </section>
  )
}

export default ArtistProfile
