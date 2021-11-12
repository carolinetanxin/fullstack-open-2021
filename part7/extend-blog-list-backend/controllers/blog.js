// 路由
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!body.title || !body.url) {
        response.status(400).json({ error: 'title or url missing' }).end()
    } else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id || null
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        if (user._id) {
            await User.findByIdAndUpdate(user._id, user, {new: true});
        } else {
            await user.save() // 新增博客的同时新增用户，此时会去校验用户是否已存在
        }

        response.json(savedBlog)
    }
})

blogRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId);

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const userid = user.id
    if (blog.user.toString() === userid.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: "you are not this blog's creator" })
    }

})

blogRouter.put('/:id', async (request, response, next) => {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId);

    // console.log(blogId)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userid = decodedToken.id;

    // console.log(blog, userid)

    if (blog.user.toString() === userid.toString()) {
        const updateBlogParam = {...request.body}
        console.log(updateBlogParam);
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlogParam, {new: true})

        if (updatedBlog) {
            response.status(200).json(updatedBlog.toJSON())
        } else {
            response.status(404).end()
        }
    } else {
        return response.status(401).json({ error: "you are not this blog's creator" })
    }

    // const body = request.body
    //
    // const blog = {
    //     likes: body.likes
    // }

    // const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    //
    // if (updatedBlog) {
    //     response.status(200).json(updatedBlog.toJSON())
    // } else {
    //     response.status(404).end()
    // }
    // response.json(updatedBlog)
})

module.exports = blogRouter
