import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/Loader'

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getArtists = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/artists`)
        setArtists(response.data);
      } catch (err) {
        console.log(err);
        
      }
      setIsLoading(false)
    }
    getArtists()
  }, [])
  
  if(isLoading) {
    return <Loader/>
  }

  return (
    <section className='container'>
        {artists.length > 0 ? <div className='artists'>
            {
              artists.map(({_id: id, avatar, name, artworks}) => {
                return (
                  <div key={id}>
                    <Link to={`/artists/${id}`}>
                      <div>
                        <img className='avatar' src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`This is ${name}`} />
                      </div>
                      <div>
                        <h4>{name}</h4>
                        <p>Uploaded artworks: {artworks}</p>
                      </div>
                    </Link>
                    <Link to={`/artworks/artists/${id}`}>Artworks</Link>
                  </div>
                  )
              })
            }
          </div> : <h2>No artists found</h2>
        }
    </section>
  )
}

export default Artists
