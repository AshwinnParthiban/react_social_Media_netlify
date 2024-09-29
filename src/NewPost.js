import React, { useContext } from 'react'
import DataContext from './content/DataContext'

const NewPost = () => {
  const {handleSubmit, postTitle,setPostTitle, postBody,setPostBody}= useContext(DataContext)
  return (
    <main className="NewPost">
      <p>New Post</p>
      <form className='newPostForm'  onSubmit={handleSubmit}>
      <label htmlFor="postTitle">Title :</label>
      <input 
      id='postTitle'
      type="text"
      required
      value={postTitle}
      onChange={(e)=> setPostTitle(e.target.value)}
      />
      <label htmlFor="postBody">Post:</label>
      <textarea 
      required
      id="postBody"
      value={postBody}
      onChange={(e)=> setPostBody(e.target.value)}
      />
      <button type='submit'>Submit</button>
      </form>
    </main>
  )
}  

export default NewPost