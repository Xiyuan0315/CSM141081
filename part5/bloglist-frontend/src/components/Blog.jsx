import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types';

const Blog = ({ blog ,updateBlogList}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  }
  // const handleLike = async () => {
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes ? blog.likes + 1 : 1
  //   };
  //   const returnedBlog = await blogService.update(blog.id, updatedBlog);
  //   updateBlogList(returnedBlog);
  //   console.log('Updating blog with:', updatedBlog);

  // }
    const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes ? blog.likes + 1 : 1
    };
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
        // Handle error (e.g., display an error message)
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

  return (
    <div className="blog" style={blogStyle}>
    <div className="blogTitleAuthor">
      {blog.title} - {blog.author}
      <button onClick={toggleDetails}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
    </div>
      {detailsVisible && (
        <div className="blogDetails" >
          <div className="blogUrl">{blog.url}</div>
          <div className="blogLikes">likes: {blog.likes} <button onClick={handleLike}>like</button></div>
          <div className="blogAuthor">{blog.author}</div>
          {/* <p>{blog.author}</p> */}
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired,
  updateBlogList: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    username: PropTypes.string
  })
};
export default Blog