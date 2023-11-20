const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    const favorite = blogs.reduce((prev, current) => {
      return (prev.likes > current.likes) ? prev : current
    })

    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }


const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = lodash.countBy(blogs, 'author')
  const mostProlificAuthor = lodash.maxBy(lodash.keys(authorCount), (author) => authorCount[author])

  return {
    author: mostProlificAuthor,
    blogs: authorCount[mostProlificAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authorlikes = lodash.chain(blogs)
  .groupBy('author')
  .map((userBlogs, author) => {
    return {
      author,
      likes: lodash.sumBy(userBlogs, 'likes')
    }
  })
  .maxBy('likes')
  .value()

  return authorlikes
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }