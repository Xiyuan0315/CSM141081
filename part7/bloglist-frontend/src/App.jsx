import { useState, useEffect,useRef } from 'react'
import Togglable from './components/Togglable'
import BlogDetail from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import { useDispatch} from 'react-redux'
import { setNotification } from './reducer/notificationReducer'
import Notification from './components/Notification'
import { Table, Form, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Users from './User'
import User from './components/User'

const Home = () => {
  const dispatch = useDispatch()
  const notify = (message, type) => {
    dispatch(setNotification(message, type));
  }
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const updateBlogList = (updatedBlog) => {
  setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
}
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

const addBlog = async (blogData) => {
  try {
    const newBlog = await blogService.create(blogData, user.token)
    setBlogs(blogs.concat(newBlog))
    notify(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    // blogFormRef.current.toggleVisibility()
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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: '1px solid #ddd',
    marginBottom: 5,
    marginTop: 5,
  }
  const blogForm = () =>(

    <div>
   <p>{user.username} logged in  <button onClick={handleLogout}>logout</button></p>
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
    <NewBlogForm addBlog={addBlog} notify={notify} />
    </Togglable>
    <br />
    <Table striped>
    {sortedBlogs.map(blog => (
    <div className="blog" style={blogStyle}> 
    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div> 
      // <Blog key={blog.id} blog={blog} updateBlogList={updateBlogList} />
    ))}
    </Table>
    </div>
  )

  return (
    <div className="container">
    <h2>Blogs</h2>
    <Notification />
    {user === null ?
    loginForm():
    blogForm()}
    </div>
  )
}

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </Router>
  )
}

export default App