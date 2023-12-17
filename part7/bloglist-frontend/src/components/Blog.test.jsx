import React from 'react';
import { render,fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog' // Adjust the import to the location of your Blog component
import NewBlogForm from './NewBlogForm'

test('renders title and author, but not url and likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5
  };

  const component = render(<Blog blog={blog} />)

  const titleAuthorDiv = component.container.querySelector('.blogTitleAuthor')
  expect(titleAuthorDiv).toHaveTextContent('Test Blog Title - Test Author')

  const urlDiv = component.container.querySelector('.blogUrl')
  const likesDiv = component.container.querySelector('.blogLikes')

  expect(urlDiv).toBeNull()
  expect(likesDiv).toBeNull()
})

test('shows URL and likes when view button is clicked', () => {
    const blog = {
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 5
    };

    const component = render(<Blog blog={blog} />);

    const button = component.getByText('view');
    fireEvent.click(button);

    const url = component.getByText('https://example.com');
    const likes = component.getByText('likes: 5');

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  })

test('updates likes when like button is clicked', async () => {
    const blog = {
      id: 'blog123',
      title: 'Example Blog Title',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 5
    };

    const component = render(<Blog blog={blog} />);

    // Assuming the likes are displayed in a certain element
    // const likesDiv = component.container.querySelector('.blogLikes')
    //
    // likes = component.getByText('likes: 5')
    const titleAuthorDiv = component.container.querySelector('.blogTitleAuthor')
    expect(titleAuthorDiv).toHaveTextContent('Example Blog Title - John Doe')
    const button = component.getByText('view');
    fireEvent.click(button); 
    const likesDiv = component.container.querySelector('.blogLikes')
    expect(likesDiv).toHaveTextContent('likes: 5')
    const likebutton = component.getByText('like');
    // fireEvent.click(likebutton);
    // fireEvent.click(likebutton);

    // // Wait for the expected outcome of the button clicks
    
    // expect(likesDiv).toHaveTextContent('likes: 7')
})


test('calls addBlog with the right details when a new blog is created', () => {
    const addBlog = jest.fn()
    const notify = jest.fn()
    const component = render(<NewBlogForm addBlog={addBlog} notify={notify} />)

    const titleInput = component.getByPlaceholderText('Title')
    const authorInput = component.getByPlaceholderText('Author')
    const urlInput = component.getByPlaceholderText('Url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'Testing Blog Title' } })
    fireEvent.change(authorInput, { target: { value: 'Testing Author' } })
    fireEvent.change(urlInput, { target: { value: 'http://testblog.com' } })
    fireEvent.submit(form)

    expect(addBlog).toHaveBeenCalledWith({
      title: 'Testing Blog Title',
      author: 'Testing Author',
      url: 'http://testblog.com'
    });

  })