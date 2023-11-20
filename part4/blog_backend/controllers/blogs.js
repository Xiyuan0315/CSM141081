const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// blogsRouter.get('/', (request, response) => {
//     Blog.find({})
//       .then(blogs => {
//         response.json(blogs)
//       })
//   })
blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }) // Populate user details
  response.json(blogs)
}
)
// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)
//   blog
//       .save()
//       .then(result => {
//         response.status(201).json(result)
//       })
//   })

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.post('/', async (request, response) => {
  const decodedToken= jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blogData = request.body

  const user = await User.findById(decodedToken.id)
  // const user = await User.findById(blogData.userId)
  if (!blogData.title || !blogData.url) {
    return response.status(400).send({ error: 'title or url missing' })
  }
  const blog = new Blog(
    {
      title: blogData.title,
      author: blogData.author,
      url: blogData.url,
      likes: blogData.likes,
      user: user._id
    }
  )

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)

    } catch (error) {
      // Handle the error, for instance by sending a 400 status code for a bad request
      response.status(400).end()
    }
  })

// blogsRouter.delete('/:id', async (request, response) => {
//   try {
//       await Blog.findByIdAndDelete(request.params.id)
//       response.status(204).end()
//   } catch (error) {
//       response.status(400).send({ error: 'malformatted id' })
//   }
// })

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  // Verify token and get user id
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  // Check if the blog's user matches the token user
  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (error) {
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogsRouter