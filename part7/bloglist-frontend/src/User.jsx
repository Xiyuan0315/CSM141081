import { useState, useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import userService from './services/users'
const Users = () =>{
    const [users, setUsers] = useState([]);
    
      useEffect(() => {
        userService.getAllUsers().then(users => setUsers(users));
      }, []);
    
      return (
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Blogs Posted</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

export default Users
  