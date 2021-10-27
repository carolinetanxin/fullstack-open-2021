// blog-app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// 使用chrome90跑会报错：Failed to connect to Chrome, retry in 1 second
// 使用firefox90可以正常运行

// 建议使用function()代替箭头函数，避免报错

describe('Blog app', function() {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Log in to application')
        cy.contains('Blog app, Department of Computer Science, University of Helsinki 2021')
    })

    it('login form can be opened', function() {
        // 返回第一个匹配的元素
        cy.contains('log in').click()
    })

    it('user can login', function () {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('hello, mluukkai')
    })

    // it.only 只运行指定test。不加.only默认跑所有test
    it.only('login fails with wrong password', function () {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()

        // 以下三句语法表述一致
        cy.contains('invalid username or password')
        // cy.get('error').contains('invalid username or password')
        // cy.get('error').should('contain', 'invalid username or password')
    })

    describe('when logged in', function() {
        beforeEach('when logged in', function () {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('hello, mluukkai')
        })

        it('a new blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('.title').type('a new blog can be created by cypress')
            cy.get('.author').type('hanchen.ye')
            cy.get('.url').type('www.google.com')

            cy.get('#create-blog-button').click()

            cy.contains('a new blog can be created by cypress')
        });
    })
})
