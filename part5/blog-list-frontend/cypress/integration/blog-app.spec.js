// blog-app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// 使用chrome90跑会报错：Failed to connect to Chrome, retry in 1 second
// 使用firefox90可以正常运行

// 建议使用function()代替箭头函数，避免报错

// 如何跑结果
// 1.part4/blog-list文件 运行指令：npm run start:test
// 2.part5/blog-list-frontend文件 运行指令：npm run start
// 3.part5/blog-list-frontend文件 运行指令：npm run cypress:open

describe('Blog app', function() {
    // 通过UI登录
    beforeEach(function () {
        // 清理掉所有的user和blog
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        // 新增测试用户
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        // 访问前端页面
        cy.visit('http://localhost:3000')
    })

    // 绕开UI登录
    // beforeEach(function () {
    //     // 在/cypress/support/commands.js里创建login指令
    //     cy.login({username: 'mluukkai', password: 'salainen'})
    // })

    it('Front page can be opened', function() {
        cy.contains('Log in to application')
        cy.contains('Blog app, Department of Computer Science, University of Helsinki 2021')
    })

    it('Login form is shown', function() {
        // contains会返回第一个匹配的元素
        cy.contains('log in').click()
        cy.contains('Login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('hello, mluukkai')
        })

        // it.only 只运行指定test。不加.only默认跑所有test
        // it.only('login fails with wrong password', function () {
        it('fails with wrong credentials', function () {
            // cy.contains('log in').click()
            cy.get('#showButton').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()

            // 以下三句语法表述一致
            // cy.contains('invalid username or password')
            // cy.get('error').contains('invalid username or password')
            cy.get('.error').should('contain', 'invalid username or password')

            // cypress需要将颜色设置成rgb
            // firefox运行cypress测试css时，boder-style/border-radius/padding需要另外设置
            // border-style设置，详情见：https://github.com/cypress-io/cypress/issues/9349
            cy.get('.error')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-top-style', 'solid')
                .and('have.css', 'border-bottom-style', 'solid')
                .and('have.css', 'border-left-style', 'solid')
                .and('have.css', 'border-right-style', 'solid')

            cy.get('html').should('not.contain', 'hello, mluukkai')
        })
    })

    describe('When logged in', function() {
        beforeEach('when logged in', function () {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('hello, mluukkai')
        })

        // 通过UI创建blog
        it('A new blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('.title').type('a new blog can be created by cypress')
            cy.get('.author').type('hanchen.ye')
            cy.get('.url').type('www.google.com')

            cy.get('#create-blog-button').click()

            cy.contains('a new blog can be created by cypress')
        });

        describe('add a note exists', function () {
            beforeEach(function () {
                // 绕开UI创建blog
                cy.createBlog({ title: 'first new blog can be created by cypress', author: 'hanchen.ye', url: 'www.google1.com', likes: 12})
                cy.createBlog({ title: 'second new blog can be created by cypress', author: 'hanchen.ye', url: 'www.google2.com', likes: 8})
                cy.createBlog({ title: 'third new blog can be created by cypress', author: 'hanchen.ye', url: 'www.google3.com', likes: 2})
            })

            // .parent().find().搜索指定元素
            // .get()会从整个页面查找出所有符合要求的元素
            it('user can like the blog', function () {
                cy.contains('view').click()
                cy.get('.handleLike').click()
                cy.get('.likesNum').should('contain', 1)

                // as命令
                // cy.contains('second new blog').parent().find('button').as('theButton')
                // cy.get('@theButton').click()
                // cy.get('@theButton').should('contain', 'hide')
            })

            it('user can remove the blog', function () {
                cy.contains('view').click()
                cy.contains('first new blog can be created by cypress')
                cy.contains('remove').click()
                cy.get('first new blog can be created by cypress').should('not.exist')
            })
            
            it('blogs are ordered by number of likes', function () {
                // 点击，将所有博客细节展开
                cy.get('.handleView').then(($views) => {
                      $views.map((i, el) => {
                          el.click()
                      })
                })

                cy.get('.likesNum').then(($blogs) => {
                    expect($blogs).to.have.length(3)
                    $blogs.map(function(i, el) {
                        // 各项检查：后一项的like比前一项低
                        if(i !== 0) {
                            expect(
                                Number(el.innerText)
                            ).to.be.most(
                                Number($blogs[i-1].innerText)
                            )
                        }
                    })
                })
            })

            // it.only('then example', function () {
                // cy.wrap声明页面元素Element
                // https://www.cnblogs.com/poloyy/p/13672255.html
                // cy.get('.blog').then(blogs => {
                    // cy.wrap(blogs[0]).contains('first new blog')
                // })
                // cy.get('button').then((buttons) => {
                    // console.log('number of buttons', buttons.length)
                    // cy.wrap(buttons[0]).click()
                // })
            // })

        })


    })


})
