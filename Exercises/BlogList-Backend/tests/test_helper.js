const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "test 1",
        author: "author 1",
        url: "url 1",
        likes: 1
    },
    {
        title: "test 2",
        author: "author 2",
        url: "url 2",
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}