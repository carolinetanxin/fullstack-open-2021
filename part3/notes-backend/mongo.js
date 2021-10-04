// node mongo.js yourpassword
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

// a.when your password has ': / ? # [ ] @', you should encode
// otherwise Mongo will alert 'UnhandledPromiseRejectionWarning: MongoAPIError: URI must include hostname, domain name, and tld'
// like '!@#' is '%21%40%23'

// b.instead of example or courses, you should let your password in without '<>'
// otherwise Mongo will alert 'UnhandledPromiseRejectionWarning: MongoServerError: bad auth : Authentication failed.'
const password = process.argv[2]

const url =
    `mongodb+srv://tanxin:${password}@cluster0.b1vid.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})

// create new note code
// const note = new Note({
//     content: 'HTML is easy.',
//     date: new Date(),
//     important: false,
// })
// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })
