const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')  // Import your Express app here
const api = supertest(app)
const Blog = require('../models/blog')
describe('Blog API', () => {
  test('blogs are returned as json and correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(5)
  })
}, 100000)


describe('Blog API id', () => {
  test('blogs unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
  })
})


describe('Blog API valid', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 5
    }
    const blogsAtStart = await Blog.find({})
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('Test Blog')
  })
})

describe('Blog API like', () => {

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })
})

describe('Blog API title url', () => {

  test('blog without title is not added', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      ///title is missing
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('blog without url is not added', async () => {
    const blogsAtStart = await Blog.find({})
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      /// url is missing
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

// Deleting Test

describe('Blog API - DELETE', () => {

  test('a specific blog can be deleted', async () => {
      // First, let's add a new blog post
      const newBlog = {
          title: 'Test Blog for Deletion',
          author: 'Test Author',
          url: 'http://testdeleteblog.com',
          likes: 1
      }

      const addedBlog = await new Blog(newBlog).save()

      // Ensure the blog post has been added
      const blogsAtStart = await Blog.find({})
      const blogToView = blogsAtStart.find(b => b.id === addedBlog.id)
      expect(blogToView.title).toEqual(newBlog.title)
      // Delete the recently added blog post
      await api
          .delete(`/api/blogs/${addedBlog.id}`)
          .expect(204)

      // Check the blog post is deleted
      const blogsAtEnd = await Blog.find({})
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(newBlog.title)
  })

})

/// Updating Test

describe('Blog API - PUT', () => {

    test('a specific blog can be updated', async () => {
        // Create and POST a new blog post
        const initialBlog = {
            title: 'Test Blog for Update',
            author: 'Test Author',
            url: 'http://testupdateblog.com',
            likes: 1
        }

        const postedBlog = await api
            .post('/api/blogs')
            .send(initialBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        // Update the blog post
        const updatedBlog = {
            title: 'Updated Test Blog',
            author: 'Updated Test Author',
            url: 'http://updatedtestblog.com',
            likes: 10
        }

        const result = await api
            .put(`/api/blogs/${postedBlog.body.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.title).toEqual(updatedBlog.title)
        expect(result.body.author).toEqual(updatedBlog.author)
        expect(result.body.url).toEqual(updatedBlog.url)
        expect(result.body.likes).toEqual(updatedBlog.likes)

        // Ensure the blog post has been updated in the database
        const blogAtEnd = await Blog.findById(postedBlog.body.id)
        expect(blogAtEnd.title).toEqual(updatedBlog.title)
    })

})


afterAll(async () => {
  await mongoose.connection.close()
})