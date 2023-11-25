import React, { useState } from 'react';


const NewBlogForm = ({addBlog, notify }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
    notify(`A new blog ${title} by ${author} added`);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            id="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            id='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id = 'create'type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
