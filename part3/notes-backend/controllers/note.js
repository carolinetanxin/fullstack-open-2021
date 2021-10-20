// 路由
const notesRouter = require('express').Router()
const Note = require('../models/note')
const jwt = require('jsonwebtoken')

const getTokenForm = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

// 🔥 在app.js中引入express-async-errors，允许我们完全消除try-catch代码块，并去除调用第三个参数next
notesRouter.get('/', async (request, response, next) => {
    try {
        // const notes = await Note.find({}).populate({ username: 1, name: 1 })
        const notes = await Note.find({})
        response.json(notes)
    } catch(e) {
        next(e)
    }
})

notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenForm(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)

})

notesRouter.get('/:id', async (request, response, next) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.delete('/:id', async (request, response, next) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter
