import React, { useState } from 'react'
import data from '../../data'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [artworks, setArtworks] = useState(data)
  return (
    <section className='dashboard'>
      {
        artworks.length ? <div>
          {
              artworks.map(artwork => {
                return <div key={artwork.id} className='dashboard-artwork'>
                    <div>
                      <img src={artwork.thumb} alt='' />
                    </div>
                    <h5>{artwork.title}</h5>
                    <div>
                      <Link to={`/artwork/${artwork.id}`} className='btn'>View</Link>
                      <Link to={`/artwork/${artwork.id}/edit`} className='btn'>Edit</Link>
                      <Link to={`/artwork/${artwork.id}/delete`} className='btn'>Delete</Link>
                    </div>
                </div>
              })
          }
        </div> : <h2>You have no artworks yet</h2>
      }
    </section>
  )
}

export default Dashboard
