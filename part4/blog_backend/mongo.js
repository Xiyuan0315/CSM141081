// const config = require('./utils/config')
const mongoose = require('mongoose')
const url = 'mongodb+srv://fullstack:315728@cluster0.nodw8hz.mongodb.net/testblogAPP?retryWrites=true&w=majority&appName=AtlasApp'
const Blog = require('./models/blog')
mongoose.set('strictQuery',false)
mongoose.connect(url)

const blog = new Blog({
  title: 'First Blog',
  author: 'Author 1',
  url: 'http:mo//firstblog.com',
  likes: 10,
})

blog.save().then(() => {
  console.log('Blog saved!')
  mongoose.connection.close()
})
