// 🔥 PART 4 COURSES -------------------
const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

// 🔥 PART 3 COURSES -------------------
// const express = require('express')
// const app = express()
// const cors = require('cors')
//
// require('dotenv').config()
// const Note = require('./models/note')
//
// app.use(express.static('build'))
// app.use(cors())
// app.use(express.json())
//
// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }
//
// app.use(requestLogger)
//
// // 定义初始化页面
// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// })
//
// app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//         res.json(notes)
//     })
// })
//
// app.post('/api/notes', (request, response, next) => {
//     const body = request.body
//
//     const note = new Note({
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//     })
//
//     note.save()
//         .then(savedNote => savedNote.toJSON())
//         .then(savedAndFormattedNote => {
//             response.json(savedAndFormattedNote)
//         })
//         .catch(error => next(error))
// })
//
// app.get('api/notes/:id', (req, res, next) => {
//     Note.findById(req.params.id).then(note => {
//         if (note) {
//             res.json(note)
//         } else {
//             res.status(404).end()
//         }
//     }).catch(error => next(error))
// })
//
// app.delete('/api/notes/:id', (request, response, next) => {
//     Note.findByIdAndRemove(request.params.id)
//         .then(result => {
//             response.status(204).end()
//         })
//         .catch(error => next(error))
// })
//
// app.put('/api/notes/:id', (request, response, next) => {
//     const body = request.body
//
//     const note = {
//         content: body.content,
//         important: body.important,
//     }
//
//     Note.findByIdAndUpdate(request.params.id, note, { new: true })
//         .then(updatedNote => {
//             response.json(updatedNote)
//         })
//         .catch(error => next(error))
// })
//
// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)
//
// // 中间件写在最后
// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)
//
//     if (error.name === 'CastError' && error.kind === 'ObjectId') {
//         return response.status(400).send({ error: 'malformatted id' })
//     } else if (error.name === 'ValidationError') {
//         return response.status(400).json({ error: error.message })
//     }
//
//     next(error)
// }
//
// // 这是最后加载的中间件
// app.use(errorHandler)
//
// // start the server listening for requests
// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
