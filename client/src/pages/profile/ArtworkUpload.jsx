import React, { useContext, useEffect, useState } from 'react'
import { ArtistContext } from '../../context/ArtistContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ArtworkUpload = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('unclassyfied')
  const [desc, setDesc] = useState('')
  const [thumb, setThumb] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const {currentArtist} = useContext(ArtistContext);
  const token = currentArtist?.token;

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [navigate, token])

  const categories = ['unclassyfied', 'painting', 'sculpture', 'video']


  const uploadArtwork = async (e) => {
    e.preventDefault();

    const artworkData = new FormData();
    artworkData.set('title', title)
    artworkData.set('category', category)
    artworkData.set('description', desc)
    artworkData.set('thumb', thumb)
    

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/artworks`, artworkData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if (response.status === 200) {
        navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

    return (
      <section className='artwork-upload'>
        <div className='container'>
          <h2>Upload your artwork</h2>
          {error && <p className='form-error-mgs'>{error}</p>}
          <form onSubmit={uploadArtwork}>
            <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
              {
                categories.map(cat => <option key={cat}>{cat}</option>)
              }
            </select>
            <input type='file' onChange={e => setThumb(e.target.files[0])} accept="image/*" />
            <p>Description of your artwork</p>
            <textarea type='text' value={desc} onChange={e => setDesc(e.target.value)}></textarea>
            <button type='submit' className='btn'>Upload</button>
          </form>
        </div>
      </section>
    )
  }

export default ArtworkUpload
