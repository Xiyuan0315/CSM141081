import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    userService.get(userId).then(userData => setUser(userData));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Blog posts:</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User
