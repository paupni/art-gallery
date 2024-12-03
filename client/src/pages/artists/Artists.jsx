import React, { useState } from 'react'

import Avatar1 from '../../assets/1.jpg'
import Avatar2 from '../../assets/2.jpg'
import Avatar3 from '../../assets/3.jpg'
import { Link } from 'react-router-dom'

const artistsData = [
  {
    id: 1,
    avatar: Avatar1,
    name: 'Jane Doe',
    artworks: 2.
  },
  {
    id: 2,
    avatar: Avatar2,
    name: 'Jane Doe',
    artworks: 1
  },
  {
    id: 3,
    avatar: Avatar3,
    name: 'Jane Doe',
    artworks: 1
  },
]

const Artists = () => {
const [artists, setArtists] = useState(artistsData)

  return (
    <section className='container'>
        {artists.length > 0 ? <div className='artists'>
            {
              artists.map(({id, avatar, name, artworks}) => {
                return <Link key={id} to={`/artworks/artists/${id}`}>
                  <div>
                    <img className='avatar' src={avatar} alt={`Image of ${name}`} />
                  </div>
                  <div>
                    <h4>{name}</h4>
                    <p>{artworks}</p>
                  </div>
                </Link>
              })
            }
          </div> : <h2>No artists found</h2>
        }
    </section>
  )
}

export default Artists
