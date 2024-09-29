import { createContext, useState, useEffect } from "react";
import Post from "../Post";
import PostLayout from "../PostLayout";
import { format } from "date-fns"
import api from "../api/Posts"
import EditPost from "../EditPost"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";


const DataContext = createContext({})
export const DataProvider = ({children}) => {
    
const [posts,setPosts] = useState([])
const [search,setSearch] = useState('')
const [searchResult,setSearchResult] = useState([])
const [postTitle, setPostTitle] = useState('')
const [postBody,setPostBody] = useState('')
const [editTitle, setEditTitle] = useState('')
const [editBody,setEditBody] = useState('')
const navigate = useNavigate()
const {width} = useWindowSize()
const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');

useEffect(()=> {
  setPosts(data);
},[data])


useEffect(()=>{
  const filterResult = posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())
  ||((post.title).toLowerCase()).includes(search.toLowerCase()))
  setSearchResult(filterResult.reverse());
},[posts,search])

const handleSubmit = async (e)=> {
  e.preventDefault();
  const id = posts.length? posts[posts.length-1].id+1 :1;
  const datetime = format(new Date(),'MMM dd,yyyypp');
  const newPost = {id,title : postTitle,datetime,body:postBody};
    try{ 
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts,newPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/')
 } catch (err) {
  if(err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  }else {
    console.log(`Error: ${err.message}`);
  }
}
}

const handleEdit = async (id)=> {
  const datetime = format(new Date(),'MMM dd,yyyypp');
  const updatedPost = {id,title : editTitle,datetime,body:editBody};
  try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post =>post.id===id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/')

  }catch (err){
      console.log(`Error:${err.message}`);
  }
}

const handledelete = async(id)=>{
  try{
    await api.delete(`/posts/${id}`)
  const postList = posts.filter(post=>post.id !==id);
  setPosts(postList);
  navigate('/')
  }catch (err){
    console.log(`error: ${err.message}`)
  }
}
    return (
        <DataContext.Provider value={{
            width,search,setSearch, searchResult,fetchError, isLoading,
            handleSubmit, postTitle,setPostTitle, postBody,setPostBody,
            posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,handledelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext