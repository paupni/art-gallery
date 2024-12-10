import React, { useState, useEffect } from 'react'
import Artwork from '../gallery/Artwork'
import Loader from '../../components/Loader'
import axios from 'axios'
import { useParams } from "react-router"


const ArtistArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const {id} = useParams()

  useEffect(() => {
      const fetchArtworks = async () => {
          setIsLoading(true);
          try {
              const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/artworks/artists/${id}`);
              setArtworks(response?.data)
          } catch (err) {
              console.log(err);
              
          }

          setIsLoading(false);
      }

      fetchArtworks();
  }, [id])

  if (isLoading) {
      return <Loader/>
  }


  return (
    <div>
        {artworks.length > 0 ? <div className='container artist-artworks'>
            {
                artworks.map(({_id: id, thumb, category, title, description, creator, createdAt}) => 
                    <Artwork key={id} artworkId={id} thumb={thumb} category={category} title={title} desc={description} artistId={creator} createdAt={createdAt} />)
            }
        </div> : <h2 className='container'>No artworks found</h2>}
    </div>
  )
}

export default ArtistArtworks
