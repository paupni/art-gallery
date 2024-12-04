import React, { useState } from 'react'
import Artwork from '../../pages/gallery/Artwork'
import data from '../../data'

const ArtworkCategory = () => {
  const [artworks, setArtworks] = useState(data);

  return (
          <div>
              {artworks.length > 0 ? <div className='container artworks'>
                  {
                      artworks.map(({id, thumb, category, title, desc, authorID}) => 
                          <Artwork key={id} artworkID={id} thumb={thumb} category={category} title={title} desc={desc} authorID={authorID} />)
                  }
              </div> : <h2 className='container'>No artworks found</h2>}
          </div> 
      )
  }

export default ArtworkCategory
