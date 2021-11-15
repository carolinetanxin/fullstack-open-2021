const commentRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const Comment = require('../models/comments')

commentRouter.get('/:id/comments', async (request, response) => {
    const { id } = request.params
    const blogComments = await Blog.findById(id).populate('comments')
    response.json(blogComments)
})

commentRouter.post('/:id/comments', async (request, response) => {
    const { body } = request

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = request.params

    const blog = await Blog.findById(id)

    const comment = new Comment({
        title: body.title
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    if (savedComment._id) {
        await Blog.findByIdAndUpdate(savedComment._id, savedComment, {new: true});
    } else {
        await blog.save() // 新增博客的同时新增用户，此时会去校验用户是否已存在
    }

    response.status(201).json(savedComment.toJSON())
})

module.exports = commentRouter
