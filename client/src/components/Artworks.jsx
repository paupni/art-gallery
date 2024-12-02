import React, { useState } from 'react'
import Artwork from '../pages/gallery/Artwork'

import Thumb1 from '../assets/artwork-1.jpg';
import Thumb2 from '../assets/artwork-2.jpg';
import Thumb3 from '../assets/artwork-3.jpg';

const artworks = [
    {
        id: '1',
        thumb: Thumb1,
        category: 'painting',
        title: 'title1',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        artistID: 1,
    },
    {
        id: '2',
        thumb: Thumb2,
        category: 'sculpture',
        title: 'title2',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        artistID: 2,
    },
    {
        id: '3',
        thumb: Thumb3,
        category: 'video',
        title: 'title3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        artistID: 3,
    },
    {
        id: '4',
        thumb: Thumb3,
        category: 'video',
        title: 'title3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        artistID: 3,
    },
    {
        id: '5',
        thumb: Thumb1,
        category: 'video',
        title: 'title3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        artistID: 1,
    },
]


const Artworks = () => {
    const [artwork, setArtwork] = useState(artworks);

    return (
        <div className='container artworks'>
            {
                artworks.map(({id, thumb, category, title, desc, authorID}) => 
                    <Artwork key={id} artworkID={id} thumb={thumb} category={category} title={title} desc={desc} authorID={authorID} />)
            }
        </div>
    )
    }

export default Artworks
