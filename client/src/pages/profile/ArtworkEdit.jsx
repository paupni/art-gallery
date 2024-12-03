import React, { useState } from 'react'

const ArtworkEdit = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [desc, setDesc] = useState('')
  const [thumb, setThumb] = useState('')

  const categories = ['painting', 'sculpture', 'video']

    return (
      <section className='artwork-upload'>
        <div className='container'>
          <h2>Edit artwork</h2>
          <p className='form-error-msg'>Error msg</p>
          <form>
            <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
              {
                categories.map(cat => <option key={cat}>{cat}</option>)
              }
            </select>
            <input type='file' onChange={e => setThumb(e.target.value)} accept='png, jpg, jpeg' />
            <p>Description of your artwork</p>
            <textarea type='text' value={desc} onChange={setDesc} ></textarea>
            <button type='submit' className='btn'>Update</button>
          </form>
        </div>
      </section>
    )
  }

export default ArtworkEdit
