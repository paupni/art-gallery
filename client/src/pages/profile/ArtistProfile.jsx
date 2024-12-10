import React, { useState, useContext, useEffect } from 'react'
import { ArtistContext } from '../../context/ArtistContext'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import axios from 'axios'

const ArtistProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const {currentArtist} = useContext(ArtistContext);
  const navigate = useNavigate()
  const token = currentArtist?.token;

  useEffect(() => {
    if(!token) {
      navigate('/')
    }
  }, [navigate, token])

  useEffect(() => {
    const getArtist = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/artists/${currentArtist.id}`);
      const {name, surname, bio, email, avatar} = response.data;
      setName(name);
      setSurname(surname);
      setBio(bio);
      setEmail(email);
      setAvatar(avatar);
      console.log(response);
    }
    
    getArtist()
  }, [currentArtist.id])


  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const artistData = new FormData();
      artistData.set('avatar', avatar);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/artists/change-avatar`, artistData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      setAvatar(response?.data.avatar);
    } catch (err) {
      console.log(err);
    }
  }
  

  const updateArtistDetails = async (e) => {
    e.preventDefault();

    try {
      const artistData = new FormData();
      artistData.set('name', name)
      artistData.set('surname', surname)
      artistData.set('bio', bio)
      artistData.set('email', email)
      artistData.set('currentPassword', currentPassword)
      artistData.set('newPassword', newPassword)
      artistData.set('confirmedNewPassword', confirmedNewPassword)
  
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/artists/edit-artist`, artistData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});

      if(response.status === 200) {
        navigate('/logout')
      }
      
    } catch (err) {
      setError(err.response.data.message);
    }

  }


  return (
    <section className='artist-profile'>
      <div>
        <Link to={`/myartworks/${currentArtist.id}`} className='btn'>My posts</Link>
        <div className='artist-profile-details'>
          <div className='artist-profile-avatar'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt='' />
          </div>
          <form>
            <input type='file' name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept="image/*"/>
            <label htmlFor='avatar' onClick={() => setIsAvatarTouched(true)}><FaEdit/></label>
          </form>
          {isAvatarTouched && <button className='btn' onClick={changeAvatarHandler}><FaCheck/></button>}
        </div>

        <h1>{currentArtist.name}</h1>

        <form onSubmit={updateArtistDetails}>
          {error && <p class='form-error-mgs'>{error}</p>}
          <input type='text' placeholder='Name' name='name' value={name} onChange={e => setName(e.target.value)} autoFocus/>
          <input type='text' placeholder='Surname' name='surname' value={surname} onChange={e => setSurname(e.target.value)} />
          <input type='text' placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
          <textarea type='text' value={bio} onChange={e => setBio(e.target.value)} />
          <input type='password' placeholder='Current Password' name='currentPassword' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          <input type='password' placeholder='New Password' name='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <input type='password' placeholder='Confirm New Password' name='confirmNewPassword' value={confirmedNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
          <button type='submit' className='btn'>Update details</button>
        </form>
      </div>
    </section>
  )
}

export default ArtistProfile
