const config = require('./utils/config')

const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
// const DataLoader = require("dataloader")

const mongoose = require('mongoose')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
    });

mongoose.set('debug', true);

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

// GraphQL模式
const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type Subscription {
    bookAdded: Book!
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
        allBooks: async (root, args) => {

            // filters missing
            if (!args.author && !args.genre) {
                const books = await Book.find({}).populate("author")

                // console.log('!args.author && !args.genre')
                // console.log(books)

                return books
            }

            if (args.author && !args.genre) {
                const author = await Author.findOne({ name: args.author });

                const books = await Book.find({ author: { $in: author.id } }).populate(
                    "author"
                )

                // console.log('args.author && !args.genre')
                // console.log(books)

                return books
            }

            if (!args.author && args.genre) {
                const books = await Book.find({ genres: { $in: args.genre } }).populate(
                    "author"
                );

                // console.log('!args.author && args.genre')
                // console.log(books)

                return books;
            }

            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author });

                const books = await Book.find({
                    $and: [
                        { author: { $in: author.id } },
                        { genres: { $in: args.genre } },
                    ],
                }).populate("author");

                // console.log('args.author && args.genre')
                // console.log(books)

                return books;
            }

            // console.log('nothings')
            // console.log(books)
        },
        allAuthors: async (root, args) => {
            const authors = await Author.find({});

            const authorsObject = authors.map((author) => {
                return {
                    name: author.name,
                    born: author.born,
                    bookCount: author.books.length,
                    id: author.id,
                };
            });

            return authorsObject
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Book: {
        author: async (root, args, { loaders }) => {
            const id = root.author;

            const author = await loaders.author.load(root.author._id);

            return {
                name: author.name,
                born: author.born,
                bookCount: author.books.length,
                id: root.author._id,
            };
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            let book;
            try {
                // Check if book author is already in db:
                let author = await Author.findOne({ name: args.author });

                // const currentUser = context.currentUser;

                // if (!currentUser) {
                //     throw new AuthenticationError("not authenticated");
                // }

                if (author) {
                    book = new Book({ ...args, author: author._id });
                    author.books = author.books.concat(book._id);

                    await book.save();
                    await author.save();

                    // 返回的book中，author为对象，而非id
                    book.author = author;
                }

                if (!author) {
                    const _id = mongoose.Types.ObjectId();
                    book = new Book({ ...args, author: _id });

                    author = new Author({
                        name: args.author,
                        born: null,
                        bookCount: 1,
                        _id,
                        books: [book._id],
                    });

                    await author.save();
                    await book.save();

                    // 返回的book中，author为对象，而非id
                    book.author = author;
                }
            } catch (e) {
                console.log('bookadded error')
                console.log(e)
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }
            // console.log('BOOK_ADDED')
            // console.log(book)
            await pubsub.publish('BOOK_ADDED', { bookAdded: book })

            // console.log('BOOK_ADDED')
            // console.log(book)

            return book
        },
        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) return null

            author.born = args.setBornTo

            const currentUser = context.currentUser

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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },

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

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
