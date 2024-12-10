import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router"
import Loader from '../../components/Loader'
import axios from 'axios'

const ArtistBio = () => {
  const {id} = useParams()
  const [artist, setArtist] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getArtist = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/artists/${id}`)
        setArtist(response.data)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }

    getArtist()
  }, [id])


  if(isLoading) {
    return <Loader/>
  }

  return (
    <section className='container artwork-details'>
      {error && <p className='form-error-mgs'>{error}</p>}
      {artist && 
        <div>
          <img className='artwork-image' src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${artist.avatar}`} alt=''/>
          <h1>{artist.name} {artist.surname}</h1>
          <p>{artist.bio}</p>
          <p>{artist.artworks}</p>
          <Link to={`/artworks/artists/${id}`}>{artist.name} artworks</Link>
        </div>
      }
    </section>
  )
}

export default ArtistBio
