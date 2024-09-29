import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './content/DataContext'

const Home = () => {
  const {searchResult, fetchError, isLoading} = useContext(DataContext)
  return (
    <main className='Home'>
        {isLoading && <p className='statusMsg'>Loading posts...</p>}
        {!isLoading && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}      
        {!isLoading &&!fetchError && (searchResult.length ? <Feed posts={searchResult}/> : <p className='ststusMsg'>No posts to Display</p>)}
    </main>
  )
}

export default Home 