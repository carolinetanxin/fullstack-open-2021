const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url)

// options usefindandmodify, usecreateindex are not supported
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log(error);
        console.log('error connecting to MongoDB:', error.message)
    })

const PhoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        // unique: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        // unique: true
    }
})

PhoneSchema.plugin(uniqueValidator);

PhoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phone', PhoneSchema)
