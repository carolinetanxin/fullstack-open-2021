const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./note_api_helper')
const app = require('../app')

const api = supertest(app)

const Note = require('../models/note')

jest.setTimeout(100000)

beforeEach(async () => {
    await Note.deleteMany({})
    console.log('cleared')

    // const noteObjects = helper.initialNotes
    //     .map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)
    for (let note of helper.initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    }

    console.log('done')

})

describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        console.log('entered test')
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')

        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
            'Browser can execute only Javascript'
        )
    })

})

describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        console.log(noteToView)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
        expect(resultNote.body).toEqual(processedNoteToView)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })

})

describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(n => n.content)

        expect(contents).toContain(
            'async/await simplifies making async calls'
        )
    }, 100000)

    test('note without content is not added', async () => {
        const newNote = {
            important: true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()

        expect(notesAtEnd).toHaveLength(
            helper.initialNotes.length - 1
        )

        const contents = notesAtEnd.map(r => r.content)

        expect(contents).not.toContain(noteToDelete.content)
    })
})

// test('there are two notes', async () => {
//     const response = await api.get('/api/notes')
//
//     expect(response.body).toHaveLength(2)
// })
//
// test('the first note is about HTTP methods', async () => {
//     const response = await api.get('/api/notes')
//
//     expect(response.body[0].content).toBe('HTML is easy')
// })


afterAll(() => {
    mongoose.connection.close()
})
