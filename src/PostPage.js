import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './content/DataContext'
import { useContext } from 'react'

const PostPage = () => {
  const {posts,handledelete} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post =>(post.id).toString()===id);
  return (
    <main className='PostPage'>
      <article className='Post'>
        {post &&
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/edit/${post.id}`}>
          <button className='editButton'>Edit Post</button></Link>
          <button 
          className="deleteButton"
          onClick={()=>
            handledelete(post.id)}>
              Delete Post
          </button>
        </>
      }
      {!post &&
      <>
          <h2>Post not found</h2>
          <p><Link to='/'>Return to Home Page</Link></p>
      </>}
      </article>
      
    </main>
  )
}

export default PostPage