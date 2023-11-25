import { useState, useEffect,useRef } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import NewBlogForm from './components/NewBlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  //notification
  const [notification, setNotification] = useState(null)
// error
  const updateBlogList = (updatedBlog) => {
  setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
}
  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )  
  // }, [])

  
  // useEffect(() => {
  //   if (user) {
  //     userService.getAllUsers().then(users => {
  //       // Find the logged-in user in the list of all users
  //       const loggedInUser = users.find(u => u.username === user.username);
  //       if (loggedInUser) {
  //         // Set the blogs for the logged-in user
  //         setBlogs(loggedInUser.blogs);
  //       }
  //     });
  //   } else {
  //     setBlogs([])
  //   }
  // }, [user])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

const notify = (message, type = 'success') => {
  setNotification({ message, type })
  setTimeout(() => {
    setNotification(null)
  }, 5000) // Hide the notification after 5 seconds
}
const addBlog = async (blogData) => {
  try {
    const newBlog = await blogService.create(blogData, user.token)
    setBlogs(blogs.concat(newBlog))
    notify(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    blogFormRef.current.toggleVisibility()
  } catch (error) {

    console.error('Error adding blog:', error)
  }
}
const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    console.log('check')
    notify('wrong credentials','error')

  }
}

const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  setUser(null)
}

const blogFormRef = useRef()



const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          id='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          id='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button"type="submit">login</button>
    </form>      
  )
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
  // console.log({updateBlogList})
  const blogForm = () =>(
    
    <div>
    <p>{user.username} logged in  <button onClick={handleLogout}>logout</button></p>
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
    <NewBlogForm addBlog={addBlog} notify={notify} />
    </Togglable>
    <br />
    {sortedBlogs.map(blog => (
      <Blog key={blog.id} blog={blog} updateBlogList={updateBlogList} />
    ))}
    </div>
  )
  
  return (
    <div>
    <h2>Blogs</h2>
    {notification && (
      <div style={{ color: notification.type === 'error' ? 'red' : 'green' }}>
        {notification.message}
      </div>
)}
    {user === null ?
    loginForm():
    blogForm()}

    </div>
  )
}

export default App