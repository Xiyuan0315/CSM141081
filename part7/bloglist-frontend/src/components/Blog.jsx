import React, { useState,useEffect  } from 'react'
import blogService from '../services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route, Link,useParams 
} from 'react-router-dom'
const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    blogService.get(id).then(blogData => setBlog(blogData));
  }, [id])
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes ? blog.likes + 1 : 1
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    updateBlogList(returnedBlog);
    console.log('Updating blog with:', updatedBlog);
  }
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        updateBlogList(blog.id)
        // updateBlogList(blog.id);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: '1px solid #ddd',
    marginBottom: 5,
    marginTop: 5,
  }
  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
   
    <div className="blog" style={blogStyle}>
    <div className="blogTitleAuthor">
      
    <h2>{blog.title}</h2>
    </div>
   
    <div className="blogDetails" >
      <div className="blogUrl">{blog.url}</div>
      <div className="blogLikes">{blog.likes} likes <button onClick={handleLike}>like</button></div>
      <div className="blogAuthor"> added by{blog.author}</div>
      <button onClick={handleDelete}>delete</button>
    </div>
    </div>
  )
}
export default BlogDetail