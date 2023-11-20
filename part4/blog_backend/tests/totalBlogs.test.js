const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
/// Total likes
describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]


    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

/// Favorite blog
describe('favorite blog', () => {
    const blogs = [
        {
        _id: '5a422aa71b54a676234d17f1',
        title: 'First Class Functions',
        author: 'John Doe',
        url: 'http://example.com/first-class',
        likes: 2,
        __v: 0
        },
        {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://example.com/canonical',
        likes: 12,
        __v: 0
        },
        {
        _id: '5a422aa71b54a676234d17f3',
        title: 'The Road to Learn React',
        author: 'Robin Wieruch',
        url: 'http://example.com/react-road',
        likes: 5,
        __v: 0
        }
    ]

    test('finds the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        const expected = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
        }
        expect(result).toEqual(expected)
    })
    })

/// Most blogs(implemented with lodash)


describe('author with the most blogs', () => {
    const blogs = [
        { author: 'John Doe', likes: 5 },
        { author: 'John Doe', likes: 3 },
        { author: 'Edsger W. Dijkstra', likes: 17 },
        { author: 'Robert C. Martin', likes: 2 },
        { author: 'Robert C. Martin', likes: 4 },
        { author: 'John Doe', likes: 1 },
      ]

  test('finds the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'John Doe',
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})

describe('author with the most likes', () => {
    const blogs = [
      { author: 'John Doe', likes: 5 },
      { author: 'John Doe', likes: 3 },
      { author: 'Edsger W. Dijkstra', likes: 17 },
      { author: 'Robert C. Martin', likes: 2 },
      { author: 'Robert C. Martin', likes: 4 },
      { author: 'John Doe', likes: 1 },
    ]

    test('finds the author with the most likes', () => {
      const result = listHelper.mostLikes(blogs)
      const expected = {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
      expect(result).toEqual(expected)
    })
  })
const bcrypt = require('bcrypt')
const User = require('../models/user')
describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
      await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })
//user
  describe('User API', () => {
    beforeEach(async () => {
      await User.deleteMany({})
    })
    test('creation fails with proper status code and message if username is not unique', async () => {
      const newUser = {
        username: 'root',
        password: 'secret',
        name: 'Superuser'
      }
      await api.post('/api/users').send(newUser).expect(201)
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      expect(result.body.error).toContain('username must be unique')
    })
    test('creation fails with proper status code and message if username or password is too short', async () => {
      const newUser = {
        username: 'ro',
        password: 'se',
        name: 'Superuser'
      }
    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      expect(result.body.error).toContain('username and password must be at least 3 characters long')
    })
  })