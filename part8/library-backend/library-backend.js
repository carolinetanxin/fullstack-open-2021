const config = require('./utils/config')

const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/Author')

const { v1: uuid } = require('uuid')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    }
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

// GraphQL模式
const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    authorCount: Int!,
    bookCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
    findAuthor(name:String!): Author
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
     ) : Book
    
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    
    createUser(
       username: String!
       favouriteGenre: String!
    ): User
    
    login(
        username: String!
        password: String!
    ): Token
  }
`

// 解析器：定义GraphQL的响应方式
const resolvers = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allBooks: (root, args) => {
            // filters missing
            if (!args.author && !args.genre) {
                return Book.find({})
            }
            return Book.find({
                author: { $exists: !!args.author },
                genre: { $exists: !!args.genre }
            })
        },
        allAuthors: (root, args) => {
            authors.forEach((author) => {
                const bookCount = books.filter(book => book.author === author.name)
                author.bookCount = bookCount.length
                author.born = (author.born ? author.born : null)
            })
            return authors
        },
        findAuthor: (root, args) => {
            authors.find(a => a.name === args.name)
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const book = new Book({ ...args })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            try {
                await book.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }

            return book
            // const book = { ...args, id: uuid() }
            // books = books.concat(book)
            // if (authors.findIndex(author => author.name === args.author) === -1) {
            //     authors = authors.concat({
            //         name: args.author,
            //         born: null,
            //         bookCount: 1,
            //         id: uuid()
            //     })
            // }
            // return book
        },
        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            const currentUser = context.currentUser
            console.log(context)

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            try {
                await author.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }

            return author
            // const author = authors.find(author => author.name === args.name)
            // if (!author) { return null }
            //
            // const updatedAuthor = { ...author, born: args.setBornTo }
            // authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
            // return updatedAuthor
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })

            try {
                await user.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }

            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser =  await User.findById(decodedToken.id)
                // .populate()
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
