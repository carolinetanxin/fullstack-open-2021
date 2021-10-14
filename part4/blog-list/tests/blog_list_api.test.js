const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_list_api_helper')
const userHelper = require('./user_api_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(100000)

beforeEach(async () => {

    await Blog.deleteMany({})
    console.log('cleared')
    const userAtStart = await userHelper.usersInDb()
    const updateUserInfo = userAtStart[0]

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog({...blog , user: updateUserInfo.id})
        await blogObject.save()
    }

    console.log('done')

})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        console.log('entered test')
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
})

describe('viewing a specific blog', () => {
    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        const resultBlog = await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })
})

describe('addition of a new blog', () => {
    test('a new blog added in the blog list', async () => {
        const newBlog = {
            title: "Blog list tests",
            author: "mluukkai",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 666,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogAtEnd = await helper.blogsInDb()
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    }, 100000)

    test('a new blog missing like is default 0', async () => {
        const newBlog = {
            title: "a new blog without like",
            author: "hanchen.ye",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb();
        console.log(blogsAtEnd);
        expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
    }, 100000)

    test('a new blog missing title and url return 400', async () => {
        const newBlog = {
            author: "hanchen.ye",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb();
        console.log(blogsAtEnd);
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    }, 100000)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDb();
        const blogToDelete = blogAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    })
})

describe('updating likes of blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToUpdate = blogAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({likes: 9999})
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0];

        expect(updatedBlog.likes).toBe(9999)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
